import memory from "./memory";
import { performUnitOfWork } from "./performUnitOfWork";
import { commitWork } from "./commitWork";
import { RequestIdleCallbackDeadline } from "../types";

declare function requestIdleCallback(func: any): void;

export const workLoop = (deadline: RequestIdleCallbackDeadline) => {
  // reconcile phase
  let shouldYield = false;
  while (memory.nextUnitOfWork && !shouldYield) {
    memory.nextUnitOfWork = performUnitOfWork(memory.nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  // commit phase
  if (!memory.nextUnitOfWork && memory.wipRoot) {
    commitWork(memory.wipRoot.child);
    memory.currentRoot = memory.wipRoot;
    memory.wipRoot = null;
  }

  requestIdleCallback(workLoop);
};
