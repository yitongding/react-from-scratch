import React from "react";
import memory from "./memory";
import { createDom } from "./domUtils";
import { ReactElement, Fiber } from "../types";

const reconcileChildren: (
  parent: Fiber,
  children: (ReactElement | null)[]
) => void = (React as any).reconcileChildren;

export const performUnitOfWork = (fiber: Fiber): Fiber | null => {
  if (typeof fiber.type === "function") {
    // for function component
    memory.wipFiber = fiber;
    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children.flat());
  } else {
    // for tag component
    if (!fiber.dom) {
      fiber.dom = createDom(fiber);
    }
    reconcileChildren(fiber, fiber.props.children.flat());
  }

  // if has child, work on child next
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber: Fiber | null = fiber;
  while (nextFiber) {
    // work on sibling next
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }

    // otherwise, go back to parent
    nextFiber = nextFiber.parent;
  }

  return null;
};
