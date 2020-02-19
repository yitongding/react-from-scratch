const createTextElement = (text: string): ReactElement => {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
};

export const createElement = (
  tagName: HTMLTagName | ((props: any) => ReactElement),
  props: object | null,
  ...children: (ReactElement | string)[]
): ReactElement => {
  if (typeof tagName === "function") {
    return tagName({ ...props, children });
  }

  return {
    type: tagName,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  };
};
