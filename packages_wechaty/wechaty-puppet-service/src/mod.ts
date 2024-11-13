import {
  log,
}                 from 'packages_wechaty/wechaty-puppet/src/mods/mod'
import {
  PuppetService,
}                 from 'src/client/puppet-service'
import {
  VERSION,
}                 from 'src/config'
import {
  PuppetServer,
  PuppetServerOptions,
}                         from 'src/server/puppet-server'

export {
  log,
  PuppetServer,
  PuppetService,
  VERSION,
}
export type {
  PuppetServerOptions,
}

export default PuppetService
