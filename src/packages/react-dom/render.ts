export const render = (
  element: ReactElement,
  container: HTMLElement | Text
) => {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key: string) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      (dom as any)[name] = element.props[name];
    });

  element.props.children.forEach(
    child => render(child, dom) // recursive call
  );

  container.appendChild(dom);
};
