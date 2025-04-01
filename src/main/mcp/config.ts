import { McpServersConfig } from './types'
import { readFileSync } from 'fs'

export function readConfig(configPath: string): McpServersConfig | null {
  try {
    const config = readFileSync(configPath, 'utf8')
    return JSON.parse(config)
  } catch (error) {
    console.error('Error reading config file:', error)
    return null
  }
}
