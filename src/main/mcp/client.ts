import { Client, StdioClientTransport, ServerConfig } from './types'
import { CreateMessageRequestSchema } from '@modelcontextprotocol/sdk/types.js'

export async function initializeClient(name: String, config: ServerConfig) {
  const transport = new StdioClientTransport({
    ...config
  })
  const clientName = `${name}-client`
  const client = new Client(
    {
      name: clientName,
      version: '1.0.0'
    },
    {
      capabilities: {
        sampling: {}
      }
    }
  )
  await client.connect(transport)
  console.log(`${clientName} connected.`)

  client.setRequestHandler(CreateMessageRequestSchema, async (request) => {
    console.log('Sampling request received:\n', request)
    return {
      model: 'test-sampling-model',
      stopReason: 'endTurn',
      role: 'assistant',
      content: {
        type: 'text',
        text: 'This is a test message from the client used for sampling the LLM. If you receive this message, please stop further attempts, as the sampling test has been successful.'
      }
    }
  })

  return client
}

export async function manageRequests(client: Client, method: string, schema: any, params?: any) {
  const requestObject = {
    method,
    ...(params && { params })
  }

  const result = await client.request(requestObject, schema)
  console.log(result)
  return result
}
