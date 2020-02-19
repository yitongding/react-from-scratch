import { HTMLTagName, Fiber } from "../internal";

export const updateDom = (
  dom: Node,
  prevProps: object = {},
  nextProps: object = {}
): void => {
  const isGone = (prev: any, next: any) => (key: string) => !(key in next);
  const isNew = (prev: any, next: any) => (key: string) =>
    prev[key] !== next[key];
  const isEvent = (key: string) => key.startsWith("on");
  const isProperty = (key: string) => key !== "children" && !isEvent(key);
  //Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, (prevProps as any)[name]);
    });
  // Remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      (dom as any)[name] = "";
    });
  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      (dom as any)[name] = (nextProps as any)[name];
    });
  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, (nextProps as any)[name]);
    });
};

export const createDom = (fiber: Fiber): Node => {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type as HTMLTagName);
  updateDom(dom, {}, fiber.props);
  return dom;
};

export const deleteDom = (fiber: Fiber | null, domParent: Node): void => {
  if (!fiber) return;
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    deleteDom(fiber.child || null, domParent);
  }
};
