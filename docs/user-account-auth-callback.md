# UserAccount: "Add another account" callback

How the account selector sends a user to the auth service to add a second
account and gets them back to the product they started from. This covers
what was wrong, the contract, the security model, the rollout per dashboard,
and how to verify it.

## What was wrong

`UserAccount` (the account selector in every dashboard sidebar and topbar)
linked "Add another account" to:

```
{NEXT_PUBLIC_AUTH_URL}?new_session=1
```

There was no `callback`. After the user signed in to the second account,
`nitx-auth` had nowhere to send them and used its default landing, which is
My Nitx. A user who started in Signage ended up on My Nitx.

Two more things on the auth side made it worse and would have broken the fix
even with a callback:

1. **The allowlist is empty in deployed builds.** `nitx-auth` only honours a
   callback whose host is in `NEXT_PUBLIC_TRUSTED_CALLBACK_HOSTS`. That value
   is read by client components, so it is inlined at `next build`. The CI
   workflow never passed it as a Docker build-arg, so every deployed build
   rejected every callback and fell back to My Nitx. The local `.env` did not
   have it either.
2. **Callbacks were re-inserted into URLs without encoding** on the way to the
   OTP page (`login-form.tsx`, `register-form.tsx`, `otp/page.tsx`). A callback
   that carries its own query string, such as `/0/screens?tab=x&y=1`, was split
   into separate params and the user lost the `y=1` part or the whole thing.

## The contract

`UserAccount` now requires `authCallbackUrl: string`.

- It must be an absolute `http` or `https` URL.
- TypeScript fails the dashboard build if the prop is missing.
- At render, the component throws if the value is empty or not an absolute
  http(s) URL. The throw happens after mount (client only), because the
  component renders nothing on the server, so dashboards can pass
  `window.location.href` behind a `typeof window` guard without crashing SSR.
- The link becomes:

```
{NEXT_PUBLIC_AUTH_URL}?new_session=1&callback={encodeURIComponent(authCallbackUrl)}
```

Two helpers are exported for tests and for other components that need the
same link:

```ts
import { assertAuthCallbackUrl, buildAddAccountHref } from "nitxui";
```

### Which URL to pass

Pass the page the user is on: `window.location.href`. The user comes back to
exactly where they were, on the same session index, and the new account is
in the selector so they can switch to it.

Do not pass the bare origin on dashboards whose `/` is a public landing page
(Signage is one). The user would land on the marketing page instead of their
dashboard.

The auth service does not append the new session index to a callback. The
new account is the last entry in the sessions cookie; the selector lists it
and links it as `{origin}/{index}/`.

## Security

- **Open-redirect protection lives in `nitx-auth`, not in the UI.** Every
  redirect to a user-supplied URL goes through `safeCallback`, which checks
  the host against `NEXT_PUBLIC_TRUSTED_CALLBACK_HOSTS` and otherwise falls
  back to My Nitx with a `console.warn`. The UI validation (absolute http(s)
  URL) is a developer guard, not a security boundary.
- **The callback is URL-encoded once by the UI** with `encodeURIComponent`
  and decoded once by `searchParams.get` on the auth side. The auth pages now
  re-encode it whenever they put it back into another URL.
- **OAuth (Google, Apple)** carries the callback in a signed HttpOnly cookie
  set by `/api/oauth/initiate`, which validates it against the allowlist
  before storing it, and re-validates it on `/api/oauth/consume`. The
  sessionStorage/localStorage mirror is a Safari fallback and is re-validated
  on read.
- `window.location.href` is only attacker-controlled if the dashboard itself
  is served from a hostile origin, and that origin would not be on the
  allowlist.
- Keep the allowlist narrow: product hosts only, per environment. Do not add
  `*.io` style wildcards.

## End-to-end flow

```
Signage /0/screens
  click "Add another account"
  -> {AUTH}/?new_session=1&callback=https%3A%2F%2Fsignage.dev.nitx.io%2F0%2Fscreens
       auth-controller: new_session=1 -> sets allow_new_session cookie, shows login
       login-form: POST /users/login
         2FA on  -> /otp?email=..&callback=<encoded>  -> otp-form verifies
         2FA off -> straight through
       POST /api/cookies appends the new session to the shared cookie (new index)
       deleteCookie("allow_new_session")
       router.replace(safeCallback(callback, fallback))
  -> https://signage.dev.nitx.io/0/screens   (callback host is on the allowlist)
  -> {MY_NITX}/{index}                        (host NOT on the allowlist: bug)
```

Google and Apple take the same entry and exit; the callback travels in the
OAuth state cookie instead of the query string.

## Rollout

Order matters. The dashboards cannot pass the prop until the library that
declares it is published, because an unknown JSX prop is a TypeScript error.

### 1. Publish `nitxui`

In `Nitx-Ui` on `dev`: commit, bump the version, publish.

```
npm version patch
npm publish
```

### 2. Fix the auth service (`nitx-auth`, branch `dev`)

Already changed in the working tree:

- `app/_components/login-form.tsx`, `app/(public)/sign-up/_components/register-form.tsx`,
  `app/(public)/otp/page.tsx`: callback and email are `encodeURIComponent`-ed
  when re-inserted into a URL.
- `.env.example`: documents the local allowlist.
- `.github/workflows/ci-gitops.yml`: passes `NEXT_PUBLIC_TRUSTED_CALLBACK_HOSTS`
  as a build-arg per environment. Note this workflow is `workflow_dispatch`
  only; its push trigger is commented out.
- Local `.env` (not committed): allowlist added so local testing works.

**Blocking, needs a human with access.** The live pipeline is
`.github/workflows/ci-composite.yml`, which runs on push to `dev`, `staging`
and `main` and delegates the Docker build to `NitxTech/nitx-actions/build-deploy@main`.
That action lives in another repo and could not be read from this machine.
Open it and confirm it passes `NEXT_PUBLIC_TRUSTED_CALLBACK_HOSTS` as a Docker
`build-arg` for every environment. A runtime-only value (the `SECRETS_JSON`
entrypoint, Helm env) does not reach the client bundle, and without it every
callback is rejected.

Expected values. Dev: `*.dev.nitx.io,dev.nitx.studio`.
Staging: `*.stag.nitx.io,stag.nitx.studio`. Prod: the real product hosts.
The `Dockerfile` already declares the `ARG` and `ENV`.

### 3. Update every dashboard

After `npm i nitxui@<new version>`, add one prop at each call site. The value
is the same everywhere:

```tsx
<UserAccount
  ...
  authCallbackUrl={typeof window !== "undefined" ? window.location.href : ""}
/>
```

Call sites found on 2026-11-04:

| Repo | Files |
|---|---|
| `nitx-signage-dash` | `components/sidebar/index.tsx`, `components/topbar/index.tsx` |
| `nitx-signage-dash-touch` | `components/sidebar/index.tsx`, `components/topbar/index.tsx` |
| `nitx-studio-dash` | `components/sidebar/index.tsx`, `components/topbar/index.tsx` |
| `my-nitx-dash` | `components/sidebar/index.tsx` |
| `nitx-ads-dash` | `components/sidebar/index.tsx`, `components/topbar/index.tsx` |
| `nitx-reach-dash` | `components/sidebar/index.tsx` |
| `nitx-publisher-dash` | `components/sidebar/index.tsx` (still on `nitxui` 1.x, needs a larger upgrade) |

A dashboard that forgets the prop fails `tsc`. A dashboard that passes an
empty or relative string throws on the client as soon as the selector mounts,
with a message that names the prop.

## Verifying

Local, with `nitx-auth` on `localhost:3000` and Signage on `localhost:3001`:

1. Confirm `nitx-auth/.env` has `NEXT_PUBLIC_TRUSTED_CALLBACK_HOSTS` including
   `localhost`, then restart the auth dev server (the value is read per call
   but the dev server still needs the env loaded).
2. Sign in to Signage, open the account selector, hover "Add another account".
   The status bar must show `?new_session=1&callback=http%3A%2F%2Flocalhost%3A3001%2F0%2F...`.
3. Click it, sign in with a second account (try both a 2FA account and a
   non-2FA account, and Google).
4. You must land back on the Signage page you left. The selector now lists
   both accounts.
5. Negative test: open the auth URL with `callback=https://evil.example`. The
   auth console logs `[nitx-auth] Rejected untrusted callback URL` and you
   land on My Nitx.

Deployed: repeat steps 2 to 4 on dev after the auth image rebuilt with the
build-arg. If you still land on My Nitx, open DevTools on the auth page and
check the `[AUTH DEBUG]` group: `isTrustedCallback(callback)` is `false`
when the allowlist did not make it into the build.

## Troubleshooting

| Symptom | Cause |
|---|---|
| Lands on My Nitx, auth console warns "Rejected untrusted callback URL" | Host not in `NEXT_PUBLIC_TRUSTED_CALLBACK_HOSTS` for that build |
| Lands on My Nitx, no warning | Callback missing from the link; check the dashboard passes `authCallbackUrl` and uses the new `nitxui` |
| Dashboard throws `[nitxui] <UserAccount /> requires the 'authCallbackUrl' prop` | Prop empty at runtime, usually an undefined env var |
| Dashboard SSR crashes with `window is not defined` | Missing `typeof window` guard in the call site |
| OTP page loses part of the callback | Old auth build without the re-encoding fix |
