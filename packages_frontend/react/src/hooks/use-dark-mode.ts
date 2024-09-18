import { useMediaQuery } from "react-responsive";

export const useDarkMode = () =>
  useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });
