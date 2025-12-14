export function setTextById(id: string, text = "") {
  const element = document.getElementById(id);
  if (element?.children.length) {
    element.children[0].innerHTML = text;
  }
}

export function toggleDisplayById(id: string, display: boolean) {
  const element = document.getElementById(id);
  element?.toggleAttribute("hidden", !display);
}
