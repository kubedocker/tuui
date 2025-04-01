export interface ChatbotConfig {
  name: string

  apiKey: string

  url: string
  urlList: string[]

  path: string
  pathList: string[]

  model: string
  modelList: string[]

  authPrefix: string
  authPrefixList: string[]

  maxTokensType: string
  maxTokensTypeList: string[]

  maxTokensPrefix: string
  maxTokensValue: string

  temperature: string
  topP: string
  method: string
  contentType: string
  stream: boolean
  mcp: boolean
}

export const CHATBOT_DEFAULTS = {
  name: '',
  apiKey: '',

  url: 'https://ai.aiql.com',
  urlList: ['https://ai.aiql.com'],

  path: '/v1/chat/completions',
  pathList: [
    '/chat/completions',
    '/v1/chat/completions',
    '/v1/openai/chat/completions',
    '/openai/v1/chat/completions'
  ],

  model: 'meta-llama/Llama-3.3-70B-Instruct',
  modelList: ['meta-llama/Llama-3.3-70B-Instruct'],

  authPrefix: 'Bearer',
  authPrefixList: ['Bearer', 'Base', 'Token'],

  maxTokensType: 'max_tokens',
  maxTokensTypeList: ['max_tokens', 'max_completion_tokens', 'max_new_tokens'],

  maxTokensPrefix: 'max_tokens',
  maxTokensValue: '',
  temperature: '',
  topP: '',
  method: 'POST',
  contentType: 'application/json',
  stream: true,
  mcp: true
}
