import { Fiber, EffectTag, ReactElement } from "../internal";

export const reconcileChildren = (
  parent: Fiber,
  children: (ReactElement | null)[]
): void => {
  // start with the first child
  let oldFiber = parent?.alternate?.child;
  let prevSibling: Fiber | null = null;

  children.forEach((element, idx) => {
    let newFiber: Fiber | null = null;

    const sameType = oldFiber && element && element.type == oldFiber.type;

    // update fiber if type is the same
    if (oldFiber && element && sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: parent,
        alternate: oldFiber,
        effectTag: EffectTag.UPDATE
      };
    }

    // place new element if type changed
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: parent,
        alternate: null,
        effectTag: EffectTag.PLACEMENT
      };
    }

    // delete element if element is null
    if (oldFiber && !sameType) {
      // newFiber = {
      //   ...oldFiber,
      //   parent: parent,
      //   alternate: oldFiber,
      //   effectTag: EffectTag.DELETION
      // }
      oldFiber.effectTag = EffectTag.DELETION;
    }

    if (idx === 0) {
      // assign first fiber to parent.child
      parent.child = newFiber;
    } else if (element) {
      // if not first child, link it to it's sibling
      prevSibling!.sibling = newFiber;
    }

    // prepare for next loop
    prevSibling = newFiber;
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
  });
};
