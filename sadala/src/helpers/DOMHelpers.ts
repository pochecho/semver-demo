export class DOMHelpers {
  removeAllChildren(parent: HTMLElement) {
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild);
    }
  }
}
