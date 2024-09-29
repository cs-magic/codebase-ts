base=codebase2

alias yarn_='NODE_JQ_SKIP_INSTALL_BINARY=true ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/" yarn'

rm -rf $base && git clone git@github.com:cs-magic/codebase.git $base
cd $base
cp ../codebase/.env . && yarn_
git submodule init && git submodule update app_assistant && yarn_
yarn workspace @cs-magic/assistant-frontend-common build
yarn workspace @cs-magic/assistant-web run-s build start
