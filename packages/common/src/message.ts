import { action } from "@cs-magic/exts_chrome_claude-artifact-enhancer/src/utils/const";

export interface Message {
  type: action;
  data: any;
}
