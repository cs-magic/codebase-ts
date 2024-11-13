import fs from "fs";
import yaml from "js-yaml";
import path from "path";

import { assetsDir } from "packages/backend/common/src/path";

import type { IAgentReq } from "src/schema/llm.api";

import type { AgentType } from "src/utils/safe-call-agent";

export const loadAgent = async (agentType: AgentType) => {
  const yamlConfig = await fs.promises.readFile(
    path.join(assetsDir, `llm/agents/${agentType}.yml`),
    {
      encoding: "utf-8",
    },
  );
  const agent = yaml.load(yamlConfig) as IAgentReq;

  return agent;
};
