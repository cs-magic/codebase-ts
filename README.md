[//]: # (# CS Magic Codebase)

![CS Magic Banner](assets/branding/cs-magic/cs-magic_banner_white.jpg)

[//]: # (![SWOT Logo]&#40;packages/swot-frontend/src/assets/branding/enterprise/swot.png&#41;)

## Project Overview

```mermaid
graph LR;
    subgraph general
        prisma --> common & llm & general;
        common --> llm & general;
        llm --> general;
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
    
    subgraph swot_backend_eco
        general --> swot-backend;
        wechaty_eco --> swot-backend;
    end
    
    subgraph swot_frontend_eco
        frontend_common --> swot_frontend;
        swot_backend --> swot-frontend;
        react-hooks --> react-ui & next-hooks & swot-frontend;
        react-ui --> swot-frontend;
        next-hooks --> next-auth & swot-frontend;
        next-auth --> swot-frontend;
        swot-frontend --> swot-web & swot-pc;
    end
```

## Preparation

- you should install `jq` at the system level which is required by `wechaty-puppet`
    - mac: `brew install jq`
    - ubuntu: `sudo apt install jq`
- installation: `yarn`
- configure env （refer to `env.sample`）
- db migrate: `yarn workspace @cs-magic/prisma db:migrate:dev`

## Run

```shell
# start web in dev
yarn workspace @cs-magic/swot-backend dev & yarn workspace @cs-magic/swot-web dev

# start pc in dev
yarn workspace swot-pc dev

# build backend
yarn workspace @cs-magic/swot-backend build

# build web
yarn workspace @cs-magic/swot-frontend build

# build pc
yarn workspace swot-pc build:mac

# start web after build
yarn workspace @cs-magic/swot-frontend start

# start pc after build
# double click to install: packages/swot-pc/dist/swot-pc-${version}.dmg
```

## References 

- [Tech](__docs__/tech.md)
- [Finished Todo](__docs__/finished-todo.md)

## TODO

- [ ] fix eval-ai running prisma
- [ ] server function split for swot-pc
- [ ] `react-hooks` split next/next-auth
- [ ] `NextJS`  18.3.0 --> 18.2.0, o.w. there is warning when dev running `@cs-magic/homepage

## Upstreams

We would also like to give thanks to open-source projects that make CS-Magic possible:

- ReactJS - The library for web and native user interfaces.
- NextJS - The React Framework for the Web.
- Vite - Next generation frontend tooling.
- ElectronJS - Build cross-platform desktop apps with JavaScript, HTML, and CSS.
- Jotai - Primitive and flexible state management for React.
- Other upstream dependencies.

Thanks a lot to the community for providing such powerful and simple libraries, so that we can focus more on the implementation of the product logic, and we hope that in the future our projects will also provide a more easy-to-use knowledge base for everyone.

## Authors

- [Mark](https://github.com/markshawn2020)
