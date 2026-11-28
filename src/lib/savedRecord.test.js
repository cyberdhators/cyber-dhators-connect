import { describe, expect, test } from "bun:test";
import { requireSavedRecord } from "./savedRecord.ts";

describe("confirmed updates", () => {
  test("does not report success for an update that saved no record", () => {
    expect(() => requireSavedRecord(null)).toThrow("Your changes were not saved");
  });
  test("accepts the actual returned record", () => {
    expect(requireSavedRecord({ id: "saved-article" })).toEqual({ id: "saved-article" });
  });
});