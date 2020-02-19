import { Fiber } from "../types";

const memory: {
  wipRoot: Fiber | null;
  wipFiber: Fiber | null;
  nextUnitOfWork: Fiber | null;
  currentRoot: Fiber | null;
} = {
  currentRoot: null,
  wipRoot: null,
  wipFiber: null,
  nextUnitOfWork: null
};

export default memory;
