import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { delay, capitalizeWordsInSentence } from "../common";

describe("delay", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should resolve after the default delay of 500ms", async () => {
    const promise = delay();
    vi.advanceTimersByTime(500);
    await expect(promise).resolves.toBeUndefined();
  });

  it("should resolve after the specified delay", async () => {
    const promise = delay(1000);
    vi.advanceTimersByTime(1000);
    await expect(promise).resolves.toBeUndefined();
  });

  it("should not resolve before the specified time", async () => {
    const promise = delay(1000);
    let resolved = false;

    promise.then(() => {
      resolved = true;
    });

    vi.advanceTimersByTime(999);
    expect(resolved).toBe(false);
    vi.advanceTimersByTime(1);
    await promise;
    expect(resolved).toBe(true);
  });

  it("should handle zero delay", async () => {
    const promise = delay(0);

    vi.advanceTimersByTime(0);

    await expect(promise).resolves.toBeUndefined();
  });

  it("should return a Promise", () => {
    const result = delay(100);
    expect(result).toBeInstanceOf(Promise);
  });
});

describe("capitalizeWordsInSentence", () => {
  it("should capitalize the first letter of each word", () => {
    const input = "hello world test";
    const expected = "Hello World Test";

    expect(capitalizeWordsInSentence(input)).toBe(expected);
  });

  it("should handle single word", () => {
    const input = "hello";
    const expected = "Hello";

    expect(capitalizeWordsInSentence(input)).toBe(expected);
  });

  it("should handle empty string", () => {
    const input = "";
    const expected = "";

    expect(capitalizeWordsInSentence(input)).toBe(expected);
  });

  it("should handle string with multiple spaces", () => {
    const input = "hello  world   test";
    const expected = "Hello  World   Test";

    expect(capitalizeWordsInSentence(input)).toBe(expected);
  });

  it("should handle already capitalized words", () => {
    const input = "Hello World Test";
    const expected = "Hello World Test";

    expect(capitalizeWordsInSentence(input)).toBe(expected);
  });

  it("should handle mixed case words", () => {
    const input = "hELLO wORLD tEST";
    const expected = "HELLO WORLD TEST";

    expect(capitalizeWordsInSentence(input)).toBe(expected);
  });

  it("should handle single character words", () => {
    const input = "a b c";
    const expected = "A B C";

    expect(capitalizeWordsInSentence(input)).toBe(expected);
  });

  it("should handle words with numbers and special characters", () => {
    const input = "hello123 world! test?";
    const expected = "Hello123 World! Test?";

    expect(capitalizeWordsInSentence(input)).toBe(expected);
  });

  it("should handle leading and trailing spaces", () => {
    const input = "  hello world  ";
    const expected = "  Hello World  ";

    expect(capitalizeWordsInSentence(input)).toBe(expected);
  });

  it("should handle string with only spaces", () => {
    const input = "   ";
    const expected = "   ";

    expect(capitalizeWordsInSentence(input)).toBe(expected);
  });

  it("should handle words starting with non-alphabetic characters", () => {
    const input = "123abc !hello @world";
    const expected = "123abc !hello @world";

    expect(capitalizeWordsInSentence(input)).toBe(expected);
  });
});
