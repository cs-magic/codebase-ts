const maskName = (name: string) => {
  return name[0] + name.slice(1).replace(/\w/g, "*");
};
