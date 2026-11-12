import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { getSpaceImageUrl, getSpaceInitials } from "../../lib/space-avatar-utils.ts";

// Read messages JSON files directly
const enMessages = JSON.parse(
  fs.readFileSync(new URL("../../../../messages/en/nitxuilib.json", import.meta.url), "utf8")
);
const arMessages = JSON.parse(
  fs.readFileSync(new URL("../../../../messages/ar/nitxuilib.json", import.meta.url), "utf8")
);

test("getSpaceImageUrl correctly extracts image URL with priority and fallbacks", () => {
  // Override takes priority
  assert.equal(
    getSpaceImageUrl({ avatar: "avatar.png" }, "override.png"),
    "override.png"
  );

  // Checks avatar
  assert.equal(
    getSpaceImageUrl({ avatar: "https://example.com/avatar.png" }),
    "https://example.com/avatar.png"
  );

  // Checks image
  assert.equal(
    getSpaceImageUrl({ image: "https://example.com/image.png" }),
    "https://example.com/image.png"
  );

  // Checks image_url
  assert.equal(
    getSpaceImageUrl({ image_url: "https://example.com/image_url.png" }),
    "https://example.com/image_url.png"
  );

  // Checks icon
  assert.equal(
    getSpaceImageUrl({ icon: "https://example.com/icon.png" }),
    "https://example.com/icon.png"
  );

  // Falls back to undefined when none provided
  assert.equal(getSpaceImageUrl(null), undefined);
  assert.equal(getSpaceImageUrl({}), undefined);
});

test("getSpaceInitials produces clean 2-character initials", () => {
  assert.equal(getSpaceInitials("Wizard's space"), "WS");
  assert.equal(getSpaceInitials("Main Headquarters"), "MH");
  assert.equal(getSpaceInitials("Studio"), "ST");
  assert.equal(getSpaceInitials("A"), "A");
  assert.equal(getSpaceInitials(""), "SP");
  assert.equal(getSpaceInitials(null), "SP");
  assert.equal(getSpaceInitials("  Riyadh Digital Boulevard  "), "RD");
});

test("UI messages contain spaceAvatar keys and zero em or en dashes", () => {
  assert.ok(enMessages.spaceAvatar, "EN messages has spaceAvatar section");
  assert.ok(arMessages.spaceAvatar, "AR messages has spaceAvatar section");

  assert.equal(
    enMessages.spaceAvatar.uploadImage,
    "Upload space image"
  );
  assert.equal(
    enMessages.spaceAvatar.changeImage,
    "Change space image"
  );
  assert.equal(
    enMessages.spaceAvatar.removeImage,
    "Remove image"
  );

  const checkNoDashes = (obj, prefix = "") => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "string") {
        assert.ok(
          !value.includes("—") && !value.includes("–"),
          `String at ${prefix}${key} must not contain em or en dashes: "${value}"`
        );
      } else if (typeof value === "object" && value !== null) {
        checkNoDashes(value, `${prefix}${key}.`);
      }
    }
  };

  checkNoDashes(enMessages.spaceAvatar, "en.spaceAvatar.");
  checkNoDashes(arMessages.spaceAvatar, "ar.spaceAvatar.");
});
