export function str2ele(str: string): ChildNode {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, "text/html");
  return doc.body.firstChild!;
}
