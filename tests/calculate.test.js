const { calculateTotal } = require("../src/utils/calculate");

test("calculate the total amount when the expenses is empty array", () => {
  expect(calculateTotal([])).toBe(0);
});

test("calculate the total amount when the expenses is array of one object", () => {
  expect(calculateTotal([{ amount: 100 }])).toBe(100);
});

test("calculate the total amount when the expenses is array of multiple objects", () => {
  expect(
    calculateTotal([{ amount: 100 }, { amount: 200 }, { amount: 300 }])
  ).toBe(600);
});