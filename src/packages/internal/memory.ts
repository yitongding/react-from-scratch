import { Fiber } from "./types";

const memory: {
  wipRoot: Fiber | null;
  wipFiber: Fiber | null;
  nextUnitOfWork: Fiber | null;
  currentRoot: Fiber | null;
  hookIndex: number | null;
} = {
  currentRoot: null,
  wipRoot: null,
  wipFiber: null,
  nextUnitOfWork: null,
  hookIndex: null
};

export default memory;
