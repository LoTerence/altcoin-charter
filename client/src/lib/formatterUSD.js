const formatterUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// sub-dollar prices (ie. memecoins) need more than 2 decimal places
const formatterUSDSmall = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumSignificantDigits: 4,
});

export const formatPriceUSD = (price) =>
  Math.abs(price) >= 1
    ? formatterUSD.format(price)
    : formatterUSDSmall.format(price);

export default formatterUSD;
