import { useUserInDb } from "@/hooks/use-user-in-db";
import Mustache from "mustache";

export const useMustache = () => {
  const { user } = useUserInDb();
  return (s: string, dict?: Record<string, string | number | boolean>) => {
    const d = { ...{ userName: user?.name }, ...(dict ?? {}) };
    try {
      return Mustache.render(s.replace(/\n+/g, "\n\n"), d);
    } catch (e) {
      // Error: Unclosed tag at xxxx
      return s;
    }
  };
};
