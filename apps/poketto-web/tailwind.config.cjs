const { mauve, violet } = require("@radix-ui/colors");

import tailwindConfig from "../../tailwind.config";

tailwindConfig.content.push("./src/**/*.{ts,tsx}");
tailwindConfig.theme.extend.colors = {
  ...mauve,
  ...violet,
  ...tailwindConfig.theme.extend.colors,
};

export default tailwindConfig;
