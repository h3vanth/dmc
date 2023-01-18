import { describe, it, expect } from "vitest";

import { getInitial, joinStringArray } from "../../src/utils";

describe("getInitial", () => {
  it("returns the first character in upper case when a valid string is passed", () => {
    expect(getInitial("string")).toBe("S");
  });
  it("returns empty string when input is invalid ('' or undefined)", () => {
    expect(getInitial(undefined)).toBe("");
    expect(getInitial("")).toBe("");
  });
});

describe("joinStringArray", () => {
  describe("when string[] is passed", () => {
    it("returns a period separated string if no delimiter is passed", () => {
      expect(joinStringArray(["string1", "string2"])).toBe("string1. string2");
    });
    it("returns given delimiter separated string if delimiter is passed", () => {
      expect(joinStringArray(["string1", "string2"], ", ")).toBe(
        "string1, string2"
      );
    });
  });
});
