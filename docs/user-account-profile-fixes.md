# UserAccount: profile picture, name editing, iOS ad-blocker notice

Three field reports against the account selector and the settings modal, what
caused each, and what changed. Fixed on 2026-11-05 alongside nitxui 2.3.14.

## 1. Profile picture "sometimes" missing

### Cause

The API returns a user's picture as `img_path`. For some users that is an
absolute URL; for others it is a bare object key in the Nitx S3 bucket
(`profile/abc.jpg`). Studio resolved keys through its own `getAvatarUrl`
helper, which prefixes `https://nitx-v2.s3.eu-west-1.amazonaws.com/`. Every
other product, and the library itself, rendered the raw value. A bare key
resolves against the dashboard's origin, 404s, and Radix Avatar falls back to
initials. Which users were affected depended only on how their path was
stored, hence "sometimes".

Two smaller contributors: the selector passed `src={`${imageUrl}`}`, which
turns a null or undefined value into the literal string `"undefined"` and fires
a request for `/undefined` before falling back; and the sessions cookie only
carries the `img_path` captured at login, so a picture changed in one product
stays stale in the others until the next sign-in. The last point is an auth
service limitation and is not changed here.

### Change

- New `resolveAvatarUrl(path, baseUrl?)` in
  [avatar-url.ts](../src/components/user-account/avatar-url.ts), exported from
  the package. Absolute URLs, `//` URLs, `data:`/`blob:` URLs and same-origin
  `/paths` pass through; anything else is treated as a key under `baseUrl`,
  which defaults to the Nitx bucket. Empty input returns `undefined` so no
  request is made.
- `UserAccount` resolves every avatar through it and accepts an optional
  `avatarBaseUrl` prop for a product that stores pictures elsewhere.
- `AccountPreferencesModal` resolves `user.imageUrl` the same way.

## 2. "Edit" on the name only in Studio

### Cause

[account-preferences-modal.tsx](../src/components/user-account/account-preferences-modal.tsx)
showed the Edit button only when `user.firstName !== undefined`. Studio passes
`user` built from a `/api/user-info` fetch with `firstName` and `lastName`.
The selector itself passed `user` with only `name`, `email` and `imageUrl`, and
no other product supplied the split names, so the gate never opened for them.
The save path was never the problem: it already falls back to the shared API
client, then to `NEXT_PUBLIC_API_URL` with the session token.

### Change

- `UserAccount` accounts accept optional `firstName` / `lastName`. The selector
  forwards them to the modal.
- When a host passes only `name`, the modal splits it on the first space with
  `splitDisplayName` to pre-fill both fields; the user sees and can correct the
  split before saving. Editing is now available whenever a name exists.
- After a successful save the modal dispatches a `nitx-user-updated` window
  event with `{ name, last_name }` (same pattern as `nitx-language-change`) so a
  host without `onUpdateUser` can refresh its session or account list.
- Every dashboard now passes `firstName: user.name, lastName: user.last_name`
  from the session where it builds the accounts array (signage, my-nitx, ads,
  reach, publisher, studio; sidebars and topbars).

## 3. Ad-blocker notice on iPhone with no blocker

See [adblocker-detection-coverage.md](adblocker-detection-coverage.md),
"Refused ad hosts alone never produce a verdict". In short: Safari's tracking
protection refuses the two Google ad hosts the probe uses, exactly like an
extension would, so every iPhone saw the full-page lockout while Android
passed. A network-only result is now confirmed only by a cosmetic-filter hit or
by the browser being Brave; otherwise it is `inconclusive`. Verified with the
real detector under stubbed `fetch` for each scenario in that doc's table.
