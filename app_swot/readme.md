# CS魔法社 - 飞脑

## overview

[//]: # (```mermaid)
subgraph backend

[bot]
link2card@app_swot/backend/src/bot/handlers/handle-message/plugins/parser.plugin.ts

[simulator]
app_swot/frontend-web/src/app/(home)/card/gen/page.tsx
packages_frontend/common/src/components/card.tsx:Card (js)
packages_frontend/common/src/components/card-input-frontend.tsx:CardInputFrontend
packages_frontend/common/src/components/card-action-input.tsx:InputCardAction
packages_frontend/common/src/utils/gen-card.ts:genCardFromUrl
app_swot/backend/src/bot/utils/wxmp-fetch.ts:fetchWxmpArticle
app_swot/backend/src/bot/utils/wxmp-article/fetch/md2summary.ts:md2summary
packages/llm/src/utils/safe-call-agent.ts:safeCallAgent
packages/llm/src/utils/load-agent.ts:loadAgent

[//]: # (```)
