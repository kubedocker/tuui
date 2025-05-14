import { ipcMain, shell, IpcMainEvent, dialog } from 'electron'
import Constants from './utils/Constants'
import { Client, capabilitySchemas } from './mcp/types'

import { manageRequests } from './mcp/client'

import { spawn } from 'child_process'

/*
 * IPC Communications
 * */
export default class IPCs {
  static initialize(): void {
    // Get application version
    ipcMain.handle('msgRequestGetVersion', () => {
      return Constants.APP_VERSION
    })

    // Open url via web browser
    ipcMain.on('msgOpenExternalLink', async (event: IpcMainEvent, url: string) => {
      await shell.openExternal(url)
    })

    ipcMain.handle('msgGetApiToken', async (event, cli) => {
      return new Promise((resolve, reject) => {
        const child = spawn(cli, { shell: true })
        const cleanup = () => {
          child.stdout?.destroy()
          child.stderr?.destroy()
          if (!child.killed) {
            child.kill('SIGKILL')
          }
        }
        try {
          let stdoutData = ''

          child.stdout?.on('data', (data) => {
            const output = data.toString()
            stdoutData += output
            event.sender.send('renderListenStdioProgress', output.trim()) // send real-time output
          })

          child.stderr?.on('data', (data) => {
            console.error('Error output:', data.toString())
            reject(data.toString())
          })

          child.on('close', (code) => {
            if (code === 0) {
              resolve(stdoutData.trim().split('\n').at(-1))
            } else {
              reject(new Error(`Process exited with code ${code}`))
            }
          })

          setTimeout(() => {
            cleanup()
            reject(new Error('Process timeout'))
          }, 30000)
        } catch (error) {
          console.error('Error fetching token:', error.message)
          cleanup()
          reject(error)
        }
      })
    })

    // Open file
    ipcMain.handle('msgOpenFile', async (event: IpcMainEvent, filter: string) => {
      const filters = []
      if (filter === 'text') {
        filters.push({ name: 'Text', extensions: ['txt', 'json'] })
      } else if (filter === 'zip') {
        filters.push({ name: 'Zip', extensions: ['zip'] })
      }
      const dialogResult = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters
      })
      return dialogResult
    })
  }

  static initializeMCP(features): void {
    ipcMain.handle('list-clients', () => {
      return features
    })
  }
}

export function registerIpcHandlers(
  name: string,
  client: Client,
  capabilities: Record<string, any> | undefined
) {
  const feature: { [key: string]: any } = { name }

  const registerHandler = (method: string, schema: any) => {
    const eventName = `${name}-${method}`
    console.log(`IPC Main ${eventName}`)
    ipcMain.handle(eventName, async (event, params) => {
      return await manageRequests(client, `${method}`, schema, params)
    })
    return eventName
  }

  for (const [type, actions] of Object.entries(capabilitySchemas)) {
    if (capabilities?.[type]) {
      feature[type] = {}
      for (const [action, schema] of Object.entries(actions)) {
        feature[type][action] = registerHandler(`${type}/${action}`, schema)
      }
    }
  }

  return feature
}
