export const truncateNumberToTwoDecimals = (number) => {
  const digits = number.split(".")[0];
  const twoDecimals = number.split(".")[1]?.substring(0, 2);
  const valueWithTwoDecimals = parseFloat(`${digits}.${twoDecimals}`);

  return valueWithTwoDecimals || number;
};
