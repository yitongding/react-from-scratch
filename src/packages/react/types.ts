enum EffectTag {
  UPDATE,
  PLACEMENT,
  DELETION
}

type HTMLTagName = keyof HTMLElementTagNameMap;

interface Fiber {
  type: ReactElementType;
  props: any;
  dom: HTMLElement | Text | null;
  parent: Fiber;
  alternate: Fiber | null;
  effectTag: EffectTag;
  sibling?: Fiber | null;
  child?: Fiber | null;
  hooks?: any[];
}

type ReactElementType = HTMLTagName | "TEXT_ELEMENT";
interface ReactElement {
  type: ReactElementType;
  props: {
    children: ReactElement[];
    [key: string]: any;
  };
}

type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};

declare function requestIdleCallback(func: any): void;
