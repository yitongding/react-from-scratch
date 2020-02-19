import { updateDom, deleteDom } from "./domUtils";
import { Fiber, EffectTag } from "../types";

export const commitWork = (fiber?: Fiber | null): void => {
  if (!fiber) {
    return;
  }

  let parentFiber = fiber.parent;
  // looking for the nearest parent dom
  // function component fiber doesn't have dom
  while (!parentFiber!.dom) {
    parentFiber = parentFiber!.parent;
  }
  const parentDom = parentFiber!.dom;

  switch (fiber.effectTag) {
    case EffectTag.PLACEMENT: {
      parentDom.appendChild(fiber.dom!);
      break;
    }
    case EffectTag.UPDATE: {
      updateDom(fiber.dom!, fiber.alternate?.props, fiber.props);
      break;
    }
    case EffectTag.DELETION: {
      deleteDom(fiber, parentDom);
      break;
    }
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
};
