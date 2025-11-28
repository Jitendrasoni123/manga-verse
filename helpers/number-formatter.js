const INTENATIONAL_COUNT_ABBRS = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

function formatCount(number = 0, decimals = 2, withAbbr = true) {
  let value = 0;
  if (number !== 0 && number !== null && typeof number !== 'string' && number > 1) {
    value = Math.floor(Math.log(number) / Math.log(1000));
  }
  let result = parseFloat((number / 1000 ** value).toFixed(decimals));
  if (withAbbr) {
    result += `${INTENATIONAL_COUNT_ABBRS[value]}`;
  }
  return result || 0;
}

export default formatCount;
