const { isValidAmount } = require("../src/utils/validation");

test("isValidAmount should return true for valid amounts", () => {
  expect(isValidAmount(100)).toBe(true);
});

test("isValidAmount should return false for string", () => {
  expect(isValidAmount("banana")).toBe(false);
});

test("isValidAmount should return false for 0", () => {
  expect(isValidAmount(0)).toBe(false);
});

test("isValidAmount should return false for Negative numbers", () => {
  expect(isValidAmount(-100)).toBe(false);
});
