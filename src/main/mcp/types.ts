import {
  // CreateMessageRequestSchema,

  // CompleteResultSchema,

  ListToolsResultSchema,
  CallToolResultSchema,
  ListPromptsResultSchema,
  GetPromptResultSchema,
  ListResourcesResultSchema,
  ReadResourceResultSchema,
  ListResourceTemplatesResultSchema
} from '@modelcontextprotocol/sdk/types.js'

export { Client } from '@modelcontextprotocol/sdk/client/index.js'
export { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

export const capabilitySchemas = {
  tools: {
    list: ListToolsResultSchema,
    call: CallToolResultSchema
  },
  prompts: {
    list: ListPromptsResultSchema,
    get: GetPromptResultSchema
  },
  resources: {
    list: ListResourcesResultSchema,
    read: ReadResourceResultSchema,
    'templates/list': ListResourceTemplatesResultSchema
  }
}

export interface ServerConfig {
  command: string
  // ---- Example ----
  // command: string;
  // args: string[];
  // env: Record<string, string> | undefined;
  [key: string]: any
}

export interface McpServersConfig {
  mcpServers: {
    [key: string]: ServerConfig
  }
}
