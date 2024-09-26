/**
 * pm2 start --name 'reset-user-quota-daily' 'tsx __scripts__/reset-user-quota-daily.ts' -c '0 4 * * *' --no-autorestart
 */

import { prisma } from "@cs-magic/poketto/src/server/db"

import { defaultModelQuota } from "@cs-magic/poketto/src/ds"

import d from "@cs-magic/poketto/src/lib/datetime"

export const resetUserQuotaDaily = async () => {
  // 每个人都更新quota值
  await prisma.user.updateMany({
    data: {
      quota: defaultModelQuota,
    },
  })
  console.log(d(new Date()).format("hh:mm:ss"), "updated quota")
}

void resetUserQuotaDaily()
