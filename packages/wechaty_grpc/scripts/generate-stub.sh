#!/usr/bin/env bash
set -e

# Huan(202110): enable `**/*.proto` to include all files
# https://stackoverflow.com/a/28199633/1123955
shopt -s globstar

# https://stackoverflow.com/a/4774063/1123955
WORK_DIR="$( cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 ; pwd -P )"
REPO_DIR="$( cd "$WORK_DIR/../" >/dev/null 2>&1 ; pwd -P )"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="$REPO_DIR/out/"
[ -d "$OUT_DIR" ] || mkdir -p $OUT_DIR

PROTOC_CMD="protoc \
  -I $REPO_DIR/third-party/ \
  -I $REPO_DIR/proto/ \
  $REPO_DIR/third-party/**/*.proto \
  $REPO_DIR/proto/**/*.proto \
"

function gen_js_pb () {
  #
  # 1. JS for Protocol Buffer
  #   - https://github.com/google/protobuf/releases/latest
  #
  #  Generate: wechaty-puppet_pb.js
  $PROTOC_CMD \
    --js_out="import_style=commonjs,binary:${OUT_DIR}"
}

function gen_js_stub () {
  #
  # 2. JS for gRPC Stubs
  #   - https://www.npmjs.com/package/grpc-tools
  #   - https://github.com/grpc/grpc/tree/master/examples/node/static_codegen
  #
  # Generate: wechaty-puppet_grpc_pb.js
  $PROTOC_CMD \
    --plugin="protoc-gen-grpc=../../node_modules/.bin/grpc_tools_node_protoc_plugin" \
    --grpc_out="grpc_js:${OUT_DIR}"
}

function gen_ts_typing () {
  #
  # 3. TS for Protocol Buffer & gRPC Stubs
  #   - https://github.com/agreatfool/grpc_tools_node_protoc_ts
  #
  # Generate:
  #   wechaty-puppet_grpc_pb.d.ts
  #   wechaty-puppet_pb.d.ts
  $PROTOC_CMD \
    --plugin="protoc-gen-grpc=../../node_modules/grpc_tools_node_protoc_ts/bin/protoc-gen-ts" \
    --grpc_out="grpc_js:${OUT_DIR}"
}

function gen_web_grpc () {
  #
  # 4. JS & TS for gRPC Web
  #   - https://github.com/improbable-eng/ts-protoc-gen
  #
  # Generate:
  #   wechaty-puppet_pb_service.d.ts
  #   wechaty-puppet_pb_service.js
  $PROTOC_CMD \
    --plugin="protoc-gen-ts=../../node_modules/ts-protoc-gen/bin/protoc-gen-ts" \
    --ts_out="service=grpc-web:${OUT_DIR}"
}
function gen_openapi () {
  pushd openapi
  make generate
  popd
}

#
# Huan(202108): make out/ a CJS module
#
function gen_cjs_package_json () {
  echo '{"type": "commonjs"}' > out/package.json
}

function main () {
  gen_js_pb
  gen_js_stub
  gen_ts_typing
  gen_cjs_package_json

  gen_web_grpc

  gen_openapi
}

main
