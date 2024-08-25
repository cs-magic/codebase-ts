import fs from "fs"
import yaml from "js-yaml"
import path from "path"

import { assetsDir } from "@cs-magic/common/dist/path"

import type { IAgentReq } from "../schema/llm.api.js"

import type { AgentType } from "./safe-call-agent.js"

export const loadAgent = async (agentType: AgentType) => {
  const yamlConfig = await fs.promises.readFile(path.join(assetsDir, `llm/agents/${agentType}.yml`), {
    encoding: "utf-8",
  })
  const agent = yaml.load(yamlConfig) as IAgentReq

  return agent
}
