// utils/getCssModuleLocalIdent.js
const path = require("path");

exports.getLocalIdent = (context, localIdentName, localName, options) => {
  const fileNameOrFolder = context.resourcePath.match(
    /index\.module\.(css|scss|sass)$/,
  )
    ? "[folder]"
    : "[name]";

  const hash = Buffer.from(context.resourcePath + localName)
    .toString("base64")
    .slice(0, 5);

  const className = `${fileNameOrFolder}_${localName}_${hash}`
    .replace(/\./g, "_")
    .replace(/[^a-zA-Z0-9-_]/g, "_");

  return className;
};
