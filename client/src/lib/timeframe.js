const timeframes = [
  {
    id: 0,
    name: "1hour",
    text: "1Hr",
    histo: { timeUnit: "histominute", limit: 60 },
    timeStringOpts: { hour: "2-digit", minute: "2-digit" },
    toTimeString: (date, opts) => date.toLocaleTimeString([], opts),
  },
  {
    id: 1,
    name: "12hours",
    text: "12Hrs",
    histo: { timeUnit: "histominute", limit: 720 },
    timeStringOpts: { hour: "2-digit", minute: "2-digit" },
    toTimeString: (date, opts) => date.toLocaleTimeString([], opts),
  },
  {
    id: 2,
    name: "1day",
    text: "Day",
    histo: { timeUnit: "histominute", limit: 1440 },
    timeStringOpts: { hour: "2-digit", minute: "2-digit" },
    toTimeString: (date, opts) => date.toLocaleTimeString([], opts),
  },
  {
    id: 3,
    name: "1week",
    text: "Week",
    histo: { timeUnit: "histohour", limit: 168 },
    timeStringOpts: { weekday: "short", month: "2-digit", day: "2-digit" },
    toTimeString: (date, opts) => date.toLocaleTimeString([], opts),
  },
  {
    id: 4,
    name: "1month",
    text: "Month",
    histo: { timeUnit: "histoday", limit: 31 },
    timeStringOpts: { month: "short", day: "numeric" },
    toTimeString: (date, opts) => date.toLocaleDateString([], opts),
  },
  {
    id: 5,
    name: "3months",
    text: "3months",
    histo: { timeUnit: "histoday", limit: 92 },
    timeStringOpts: { month: "short", day: "numeric" },
    toTimeString: (date, opts) => date.toLocaleDateString([], opts),
  },
  {
    id: 6,
    name: "1year",
    text: "Year",
    histo: { timeUnit: "histoday", limit: 365 },
    timeStringOpts: { month: "short", year: "numeric" },
    toTimeString: (date, opts) => date.toLocaleDateString([], opts),
  },
];

export const initTimeframeBtnOptions = () => {
  return timeframes.map((tf) => {
    return {
      id: tf.id,
      value: tf.name,
      text: tf.text,
    };
  });
};

export const getHisto = (timeframe) => {
  const histo = timeframes.find((tf) => tf.name === timeframe).histo;
  if (!histo) throw new Error("error: invalid timeframe param");
  return histo;
};

export const getTickDateString = (timeframeName, date) => {
  const timeframe = timeframes.find((tf) => tf.name === timeframeName);
  const { timeStringOpts, toTimeString } = timeframe;
  return toTimeString(date, timeStringOpts);
};

export default timeframes;
