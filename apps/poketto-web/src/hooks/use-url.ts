import { useRouter } from "next/router";

import { POKETTO_APP_ID } from "@/config";
import { useUser } from "packages/common/src/hooks/use-user";
import { trpcApi } from "packages/common/src/api/trpc-api";
import { getOrigin } from "@/packages/common/src/router";
import { getConversationLink } from "@/lib/string";

export const useUrl = () => {
  const router = useRouter();

  // console.log({ router })
  const baseUrl = `${origin}${router.asPath}`;
  return { origin: getOrigin(), baseUrl };
};

export const usePokettoConversationUrl = () => {
  const { userId } = useUser();
  const { data: app } = trpcApi.app.get.useQuery(
    { platform: { platformId: POKETTO_APP_ID, platformType: "Poketto" } },
    { enabled: !!userId },
  );
  if (!userId || !app) return null;
  return getConversationLink(userId, app.id);
};
