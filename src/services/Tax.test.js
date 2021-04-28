import { roundTax, getTax } from "./Tax";

test("roundTax rounds up to nearest 0.05$ multiple", () => {
  expect(roundTax(4.19)).toBe(4.2);
  expect(roundTax(1.899)).toBe(1.9);
  expect(roundTax(0.5625)).toBe(0.6);
  expect(roundTax(0.5)).toBe(0.5);
  expect(roundTax(7.125)).toBe(7.15);
  expect(roundTax(4)).toBe(4);
});

test("roundTax returns null if passed a non number value", () => {
  expect(roundTax("4.45")).toBeNull();
  expect(roundTax(undefined)).toBeNull();
  expect(roundTax(NaN)).toBeNull();
  expect(roundTax(null)).toBeNull();
  expect(roundTax("lkahgsjsahgja")).toBeNull();
});

test("getTax calculates the tax for a purchase of one unit", () => {
  const taxCalculation = getTax(false, 1, "Bottle of perfume", 18.99);

  expect(taxCalculation.taxValue).toBe(1.9);
  expect(taxCalculation.addedTaxes).toIncludeSameMembers([
    { rate: 0.1, name: "base" },
  ]);
});

test("getTax calculates the tax for a purchase of one unit of an imported good", () => {
  const taxCalculation = getTax(true, 1, "Bottle of perfume", 27.99);

  expect(taxCalculation.taxValue).toBe(4.2);
  expect(taxCalculation.addedTaxes).toIncludeSameMembers([
    { rate: 0.1, name: "base" },
    { rate: 0.05, name: "import" },
  ]);
});

test("getTax calculates the tax for a purchase of one unit of a completely exempted good", () => {
  const taxCalculation = getTax(false, 1, "packet of headache pills", 9.75);

  expect(taxCalculation.taxValue).toBe(0);
  expect(taxCalculation.addedTaxes).toEqual([]);
});

test("getTax calculates the tax for a purchase of one unit of an exempted imported good", () => {
  const taxCalculation = getTax(true, 1, "box of chocolates", 10);

  expect(taxCalculation.taxValue).toBe(0.5);
  expect(taxCalculation.addedTaxes).toIncludeSameMembers([
    { rate: 0.05, name: "import" },
  ]);
});

test("getTax calculates the tax for a purchase of three units of an exempted imported good", () => {
  const taxCalculation = getTax(true, 3, "box of chocolates", 11.25);

  expect(taxCalculation.taxValue).toBe(1.8);
  expect(taxCalculation.addedTaxes).toIncludeSameMembers([
    { rate: 0.05, name: "import" },
  ]);
});
