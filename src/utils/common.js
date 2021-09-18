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

export { getHoursMins, getRandomInteger, getTenthsRandomInteger };
