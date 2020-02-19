import { ReactElement, HTMLTagName } from "../internal";
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
  tagName: HTMLTagName,
  props: object | null,
  ...children: (ReactElement | string)[]
): ReactElement => {
  return {
    type: tagName as any,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      )
    }
  };
};
