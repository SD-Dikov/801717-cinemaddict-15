const getHoursMins = (mins) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

export { getHoursMins, updateItem };
