# build front-end
FROM node:18-bullseye AS frontend

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install yarn -g

WORKDIR /app

COPY ./package.json /app

#COPY ./pnpm-lock.yaml /app

RUN yarn config set npmRegistryServer https://registry.npm.taobao.org
RUN yarn

COPY . /app

EXPOSE 40326

RUN git submodule init &&  \
    git submodule update app_swot &&  \
    yarn &&  \
    yarn workspace @cs-magic/swot-web build &&  \
    yarn workspace @cs-magic/swot-web start
