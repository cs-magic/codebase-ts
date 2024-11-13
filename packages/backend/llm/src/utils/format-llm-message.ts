import { ILlmMessage } from "packages/backend/common/src/schema/message";
import { formatString } from "packages/backend/common/src/utils/format-string";

export const formatLlmMessage = (m: ILlmMessage, maxLength = 40) =>
  // `  [${m.role[0]!.toUpperCase()}]: ${formatString(JSON.stringify(m.content), maxLength)}`
  `  [${m.role}]: ${formatString(JSON.stringify(m.content), maxLength)}`;
