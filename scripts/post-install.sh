#!/bin/bash

init-db() {
  echo ">> init db..."

  prisma generate

  if [[ "$1" == "--local" ]]; then
    prisma migrate dev
  elif [[ "$1" == "--remote" ]]; then
    prisma migrate deploy
  else
    echo "Error: You should specify which migration to run on prisma (--local or --remote)"
    return 1
  fi

  echo "<< init db.\n"
}

init-commands() {
  echo ">> init commands..."
#  install tspc for build
  ts-patch install -s
  echo "<< init commands.\n"
}

init-wechaty()  {
  echo ">> init wechaty..."

#  wechaty-puppet
  yarn workspace wechaty-puppet dist

#  wechaty-puppet-wechat4u
  yarn workspace wechat4u compile && yarn workspace wechaty-puppet-wechat4u dist

#  wechaty-service
  yarn workspace wechaty-grpc install:protoc && PATH=$PATH:$(go env GOPATH)/bin yarn workspace wechaty-grpc dist && yarn workspace wechaty-puppet-service dist

#  wechaty
  yarn workspace wechaty dist

  echo "<< init wechaty.\n"
}

init-fullstack-packages() {
  echo ">> init fullstack packages..."

# build frontend, as well as backend
  yarn workspace @cs-magic/react build

  echo "<< init fullstack packages.\n"
}


init-db "$@"
init-commands
init-wechaty
init-fullstack-packages
