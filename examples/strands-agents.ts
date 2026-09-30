import { Agent } from '@strands-agents/sdk'
import { OpenAIModel } from '@strands-agents/sdk/models/openai'

const apiKey = process.env.API_ROUTE_API_KEY
if (!apiKey) throw new Error('Set API_ROUTE_API_KEY before running this example.')

const model = new OpenAIModel({
  api: 'chat',
  apiKey,
  clientConfig: { baseURL: 'https://global.api-route.com/v1' },
  modelId: process.env.API_ROUTE_MODEL || 'deepseek-v4-flash',
})

const agent = new Agent({ model })
const result = await agent.invoke('Explain what an AI agent is in one sentence.')
console.log(result)
