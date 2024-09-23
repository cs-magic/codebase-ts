#!/bin/bash

    # ANSI color codes
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[0;33m'
    BLUE='\033[0;34m'
    MAGENTA='\033[0;35m'
    CYAN='\033[0;36m'
    RESET='\033[0m'

    # Indent and indicators
    INDENT="  "
    START_INDICATOR="${CYAN}▶${RESET}"
    SUB_INDICATOR="${YELLOW}→${RESET}"
    END_INDICATOR="${GREEN}✔${RESET}"

    echo_start() {
        echo -e "\n${START_INDICATOR} ${BLUE}Starting:${RESET} $1"
    }

    echo_step() {
        echo -e "${INDENT}${SUB_INDICATOR} ${YELLOW}$1${RESET}"
    }

    echo_info() {
        echo -e "${INDENT}${INDENT}${MAGENTA}ℹ${RESET} $1"
    }

    echo_end() {
        echo -e "${END_INDICATOR} ${GREEN}Completed:${RESET} $1\n"
    }

    run_task() {
        local func_name="$1"
        local display_name="${func_name//_/ }"
        display_name="$(tr '[:lower:]' '[:upper:]' <<< ${display_name:0:1})${display_name:1}"
        shift
        echo_start "$display_name"
        $func_name "$@"
        echo_end "$display_name"
    }

init_env() {
  export PATH=$(pwd)/node_modules/.bin:$PATH
}

init_db() {
  echo_step "generating prisma client"
  prisma generate

  echo_step "migrating prisma client"
  if [[ "$1" == "--local" ]]; then
    prisma migrate dev
  elif [[ "$1" == "--remote" ]]; then
    prisma migrate deploy
  else
    echo "Error: You should specify which migration to run on prisma (--local or --remote)"
    return 1
  fi
}

init_commands() {
#  install tspc for build
  ts-patch install -s
}

init_wechaty()  {
#  wechaty-puppet
  echo_step "building wechaty-puppet"
  yarn workspace wechaty-puppet dist

#  wechaty-puppet-wechat4u
  echo_step "building wechaty-puppet-wechat4u"
  yarn workspace wechat4u compile && yarn workspace wechaty-puppet-wechat4u dist

#  wechaty-service
  echo_step "building wechaty-puppet-service"
  yarn workspace wechaty-grpc install:protoc && PATH=$PATH:$(go env GOPATH)/bin yarn workspace wechaty-grpc dist && yarn workspace wechaty-puppet-service dist

#  wechaty
  echo_step "building wechaty"
  yarn workspace wechaty dist
}

init_fullstack_packages() {
# build frontend, as well as backend
  yarn workspace @cs-magic/react build
}



run_task init_env "$@"
run_task init_db "$@"
run_task init_commands "$@"
run_task init_wechaty "$@"
run_task init_fullstack_packages "$@"
