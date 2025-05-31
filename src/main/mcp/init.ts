import { ClientObj, ConfigObj, ServerConfig } from './types'
// import { Notification } from 'electron'
import { initializeClient } from './client'
import { loadConfigFile } from './config'
import Constants from '../utils/Constants'

export async function loadConfig(): Promise<ClientObj[]> {
  const config = loadConfigFile(Constants.ASSETS_PATH.config)
  if (config) {
    console.log('Config loaded:', config)
    return Object.entries(config).map(([name, configJson]) => ({ name, configJson }))
  }
  // You should also handle the case when config is falsy
  return []
}

export async function initClients(allConfig: ConfigObj): Promise<ClientObj[]> {
  if (allConfig) {
    console.log('Config init:', allConfig)
    try {
      const clients = await Promise.all(
        Object.entries(allConfig).map(([name, object]) => {
          return initSingleClient(name, object)
        })
      )
      console.log('All clients initialized.')
      return clients
    } catch (error) {
      console.error('Error during client initialization:', error?.message)
      throw new Error(`${error?.message}`)
      // new Notification({
      //   title: 'Client initialization failed',
      //   body: 'Cannot start with current config file: ' + error?.message
      // }).show()
      // process.exit(1)
    }
  } else {
    console.log('NO clients initialized.')
    return []
  }
}

export async function initSingleClient(
  name: string,
  serverConfig: ServerConfig
): Promise<ClientObj> {
  console.log(`Initializing client for ${name} with config:`, serverConfig)
  const connection = await initializeClient(name, serverConfig)
  console.log(`${name} initialized.`)
  const configJson = serverConfig
  return { name, connection, configJson }
}
