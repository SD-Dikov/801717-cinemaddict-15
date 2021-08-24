import AbstractView from "../view/abstract-view.js";

const createElement = (template) => {
  const newElement = document.createElement("div");
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const RenderPosition = {
  AFTERBEGIN: "afterbegin",
  BEFOREEND: "beforeend",
};

const render = (container, element, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error("Can remove only components");
  }

  component.getElement().remove();
  component.removeElement();
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error("Can't replace unexisting elements");
  }

  parent.replaceChild(newChild, oldChild);
};

export { RenderPosition, render, remove, createElement, replace };
