import dayjs from "dayjs";

const getHoursMins = (mins) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return { hours, minutes };
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getTenthsRandomInteger = (a = 0, b = 1) => {
  const num = Math.random() * (a - b) + b;
  return +num.toFixed(1);
};

const isOnline = () => window.navigator.onLine;

const getAgoTime = (date) => {
  const nowDate = dayjs();

  let agoTime;
  switch (true) {
    case nowDate.diff(date, "second") < 60:
      agoTime = "just now";
      break;
    case nowDate.diff(date, "minute") < 60:
      agoTime = "a few minutes ago";
      break;
    case nowDate.diff(date, "hour") < 24:
      agoTime = `${nowDate.diff(date, "hour")} hours ago`;
      break;
    case nowDate.diff(date, "day") < 2:
      agoTime = "yesterday";
      break;
    case nowDate.diff(date, "day") < 14:
      agoTime = `${nowDate.diff(date, "day")} days ago`;
      break;
    case nowDate.diff(date, "week") < 4:
      agoTime = `${nowDate.diff(date, "week")} weeks ago`;
      break;
    case nowDate.diff(date, "month") < 12:
      agoTime = `${nowDate.diff(date, "month")} ${
        nowDate.diff(date, "month") > 1 ? "months" : "month"
      } ago`;
      break;
    default:
      agoTime = `${nowDate.diff(date, "year")} ${
        nowDate.diff(date, "year") > 1 ? "years" : "year"
      } ago`;
      break;
  }

  return agoTime;
};

export {
  getHoursMins,
  getRandomInteger,
  getTenthsRandomInteger,
  isOnline,
  getAgoTime,
};
