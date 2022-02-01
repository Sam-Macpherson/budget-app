/**
 * Helper utility to round numbers to 2 decimal places, because that's how money is divided.
 * @param num {number} - The number to round.
 * @returns {number}
 */
const roundToTwoDecimals = num => {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
};

export default roundToTwoDecimals;
