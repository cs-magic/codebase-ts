## Tech

### project relative instruction

- `wechaty-puppet-*` 之类的 puppet 的 dependencies 里不要加 `wechaty`，否则在 yarn monorepo 里会导致 circular dependencies error，主要是这些 puppet 的实际代码里也没有 `wechaty` （只在 tests 里有）
- `next-auth` 的 package.json 里 type 不能是 module，否则 nextjs 导入时会有 provider default 问题

## Project Overview

```mermaid
graph LR;
    subgraph general
        prisma --> common & llm;
        common --> llm;
    end
    
    subgraph wechaty_eco
        wechat4u --> wechaty-puppet-wechat4u;
        wechaty-puppet --> wechaty-puppet-wechat4u & wechaty;
        wechaty-puppet-wechat4u --> wechaty;
    end
    
    subgraph frontend_common_eco
        general --> react;
        react --> frontend_common;
        assets --> frontend_common;
    end
    
    subgraph cs-magic_frontend_eco
        frontend_common --> cs-magic_frontend;
    end
    
    subgraph assistant_backend_eco
        general --> assistant_backend;
        wechaty_eco --> assistant_backend;
    end
    
    subgraph assistant_frontend_eco
        frontend_common_eco --> assistant_frontend;
        assistant_backend_eco --> assistant_frontend;
        assistant_frontend --> assistant-web & assistant-pc;
    end
```