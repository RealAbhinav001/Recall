import { describe, expect, it } from "vitest";
import { MAX_FILE_SIZE_BYTES, formatBytes } from "./index";

describe("formatBytes", () => {
  it("formats each unit", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(MAX_FILE_SIZE_BYTES)).toBe("20.0 MB");
  });

  it("handles invalid input safely", () => {
    expect(formatBytes(-1)).toBe("0 B");
    expect(formatBytes(Number.NaN)).toBe("0 B");
  });
});
