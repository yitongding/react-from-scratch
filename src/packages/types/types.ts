export enum EffectTag {
  UPDATE,
  PLACEMENT,
  DELETION
}

export type HTMLTagName = keyof HTMLElementTagNameMap;
type FunctionComponent = (
  props: object
) => ReactElement | ReactElement[] | null;

export interface Fiber {
  type: ReactElementType | FunctionComponent;
  props: any;
  dom: Node | null;
  parent: Fiber | null;
  alternate: Fiber | null;
  effectTag: EffectTag;
  sibling?: Fiber | null;
  child?: Fiber | null;
  hooks?: any[];
}

type ReactElementType = HTMLTagName | "TEXT_ELEMENT";
export interface ReactElement {
  type: ReactElementType;
  props: {
    children: ReactElement[];
    [key: string]: any;
  };
}

export type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};
