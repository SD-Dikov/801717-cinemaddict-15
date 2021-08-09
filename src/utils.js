const getHoursMins = (mins) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};

const RenderPosition = {
  AFTERBEGIN: "afterbegin",
  BEFOREEND: "beforeend",
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement("div");
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export {
  getHoursMins,
  createElement,
  RenderPosition,
  renderElement,
  renderTemplate,
};
