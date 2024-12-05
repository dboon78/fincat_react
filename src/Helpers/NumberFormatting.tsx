export const percentIncrease: any = (change: number, current: number) => {
  const prev = current - change;
  return `${Math.floor((change / prev) * 100)}%`;
};
function firstNonZeroDigit(num: number) {
  // Convert the number to a string
  const numStr = num.toString();
  // Find the position of the first non-zero digit after the decimal point
  const decimalIndex = numStr.indexOf(".");
  for (let i = decimalIndex + 1; i < numStr.length; i++) {
    if (numStr[i] !== "0") {
      return i;
    }
  }

  return 2; // All digits are zero
}
export const formatLargeMonetaryNumber: any = (number: number) => {
  if (number < 0) {
    return "-" + formatLargeMonetaryNumber(-1 * number);
  }
  if (number < 1) {
    return number.toFixed(firstNonZeroDigit(number));
  } else if (number < 1000) {
    return number.toFixed(2);
  } else if (number >= 1000 && number < 1_000_000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    return (number / 1_000_000_000_000).toFixed(1) + "T";
  }
};

export const formatLargeNonMonetaryNumber: any = (number: number) => {
  if (number < 0) {
    return "-" + formatLargeMonetaryNumber(-1 * number);
  }
  if (number < 1000) {
    return number;
  } else if (number >= 1000 && number < 1_000_000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    return (number / 1_000_000_000_000).toFixed(1) + "T";
  }
};

export const formatRatio = (ratio: number) => {
  return (Math.round(ratio * 100) / 100).toFixed(2);
};
