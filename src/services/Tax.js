import {
  IMPORT_TAX_RATE,
  IMPORT_TAX_NAME,
  BASE_TAX_RATE,
  BASE_TAX_NAME,
  EXEMPTED_LOCAL_TAX_PRODUCTS_LIST,
} from "../config/constants";

/**
 * Round up a numeric value to increments of five hundredths.
 *
 * @param {number} value           Number to be rounded.
 * @return {float}                 Two decimals float.
 */
export const roundTax = (value) => {
  if (typeof value !== "number" || Number.isNaN(value)) return null;
  return parseFloat((Math.ceil(value / 0.05) * 0.05).toFixed(2));
};

/**
 * Calculates the total tax value applying the rounded to 0.05$
 *
 * @param {number} quantity          Number of purchased items.
 * @param {number} unitPrice         Unitary price of purchased items.
 * @param {array} addedTaxesList     List of added taxes. Ex: {rate: 0.05, name: "import"}.
 * @return {float}                   Total tax value.
 */
const calculateTax = (quantity, unitPrice, addedTaxesList) => {
  let totalTaxRate = 0;
  addedTaxesList.forEach((taxObj) => (totalTaxRate += taxObj.rate));
  const totalTax = quantity * roundTax(unitPrice * totalTaxRate);
  return parseFloat(totalTax.toFixed(2));
};

/**
 * Calculates the total tax value applying the rounded to 0.05$ and the list
 * of added taxes.
 *
 * @param {bool} isImported        Bool to add imported tax.
 * @param {number} quantity        Value of purchased items.
 * @param {string} itemName     Name of the purchased product.
 * @param {float}  unitPrice       Value of the purchased product.
 * @return {object}                Tax object, contains taxValue and addedTaxes.
 */
export const getTax = (isImported, quantity, itemName, unitPrice) => {
  if (!itemName || !quantity || !unitPrice) return null;
  const addedTaxes = [];
  if (isImported)
    addedTaxes.push({ rate: IMPORT_TAX_RATE, name: IMPORT_TAX_NAME });
  const isExempted = EXEMPTED_LOCAL_TAX_PRODUCTS_LIST.find((exemptedProduct) =>
    itemName.toLowerCase().includes(exemptedProduct)
  );

  if (!isExempted)
    addedTaxes.push({ rate: BASE_TAX_RATE, name: BASE_TAX_NAME });
  const taxValue = calculateTax(quantity, unitPrice, addedTaxes);

  return { taxValue, addedTaxes };
};
