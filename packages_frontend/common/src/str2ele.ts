export function str2ele(str: string): HTMLElement {
  // const parser = new DOMParser();
  // const doc = parser.parseFromString(str, "text/html");
  // return doc.body.firstChild!;

  const element = document.createElement("div");
  element.innerHTML = str;
  return element.firstElementChild as HTMLElement;
}
