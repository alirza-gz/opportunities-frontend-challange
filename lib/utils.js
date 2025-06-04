import React from "react";

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatSubZeroNumber(num) {
  if (num >= 1) {
    return `$${num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  const str = num.toString();
  const parts = str.split(".");

  if (parts.length === 1) {
    return `$${num.toFixed(2)}`;
  }

  const decimals = parts[1];
  let leadingZeros = 0;

  for (let i = 0; i < decimals.length; i++) {
    if (decimals[i] === "0") {
      leadingZeros++;
    } else {
      break;
    }
  }

  if (leadingZeros >= 3) {
    const significantDigits = decimals.slice(leadingZeros, leadingZeros + 3);
    return React.createElement(
      "span",
      {},
      "$0.0",
      React.createElement("sub", {}, leadingZeros),
      significantDigits
    );
  }

  return `$${num.toFixed(6)}`;
}
