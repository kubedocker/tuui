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

export const CHATBOT_QWEN = {
  url: 'https://dashscope.aliyuncs.com/compatible-mode',
  urlList: ['https://dashscope.aliyuncs.com/compatible-mode'],
  name: 'Qwen',
  model: 'qwen-turbo',
  modelList: ['qwen-turbo', 'qwen-plus', 'qwen-max']
}

export const CHATBOT_OPENAI = {
  url: 'https://api.openai.com',
  urlList: ['https://api.openai.com', 'https://api.aiql.com'],
  name: 'OpenAI & Proxy',
  model: 'gpt-4-turbo',
  modelList: ['gpt-4-turbo', 'gpt-4.1', 'gpt-4o', 'o1']
}

export const CHATBOT_DEEPINFRA = {
  url: 'https://api.deepinfra.com',
  urlList: ['https://api.deepinfra.com'],
  path: '/v1/openai/chat/completions',
  name: 'DeepInfra',
  model: 'gpt-4-turbo',
  modelList: ['gpt-4-turbo', 'gpt-4.1', 'gpt-4o', 'o1']
}
