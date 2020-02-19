import memory from "./memory";
import { workLoop } from "./workLoop";
import { ReactElement, EffectTag } from "../types";

declare function requestIdleCallback(func: any): void;

export const render = (element: ReactElement, container: Node) => {
  memory.wipRoot = {
    type: "a",
    parent: null,
    dom: container,
    props: {
      children: [element]
    },
    alternate: memory.currentRoot,
    effectTag: EffectTag.PLACEMENT
  };

  memory.nextUnitOfWork = memory.wipRoot;
  requestIdleCallback(workLoop);
};
