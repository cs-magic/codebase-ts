/**
 * Huan(202108)
 *
 *  Re-exporting namespace declarations in ES6 ambient declaration #4336
 *    https://github.com/microsoft/TypeScript/issues/4336
 */

/**
 * Huan(202108): I want to `declare namespace puppet {...}`
 *  but it seemss the `export * from '../out/...js` is not working
 *
 * So I export them on the top level,
 *  then import them in another `puppet.js` file
 *  with the `puppet` namespace
 *
 * This is because the ESM module system need to do the following things
 *  when import a CJS module:
 *
 *  ```ts
 *  import pkg from './cjs-pkg'
 *  const puppet = pkg['puppet']
 *  ```
 */
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/deprecated/file-box_pb'

export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/base_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/contact_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/download-upload_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/event_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/friendship_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/location_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/message_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/mini-program_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/referrer_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/room_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/room-invitation_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/room-member_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/tag_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet/url-link_pb'

export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet_grpc_pb'
export * from 'packages_wechaty/wechaty_grpc/out/wechaty/puppet_pb'
