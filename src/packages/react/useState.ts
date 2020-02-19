import { memory, Hook } from "../internal";

export const useState = <T>(initValue: T): [T, (newState: T) => void] => {
  const oldHook = memory.wipFiber?.alternate?.hooks?.[memory.hookIndex!];
  const nothing = Symbol("__NONE__");
  const hook: Hook<T> = {
    state: oldHook ? oldHook.state : initValue,
    pendingState: nothing
  };
  if (oldHook && oldHook.pendingState !== nothing) {
    hook.state = oldHook.pendingState;
  }
  const setState = (newState: T) => {
    hook.pendingState = newState;
    memory.wipRoot = {
      ...memory.currentRoot!,
      dom: memory.currentRoot!.dom,
      props: memory.currentRoot!.props,
      alternate: memory.currentRoot
    };
    memory.nextUnitOfWork = memory.wipRoot;
  };
  memory.wipFiber!.hooks!.push(hook);
  memory.hookIndex!++;
  return [hook.state, setState];
};
