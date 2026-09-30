# Use API Route with Strands Agents

[API Route](https://www.api-route.com/docs/overview) provides an OpenAI-compatible endpoint. Connect Strands Agents using its existing `OpenAIModel` provider; no separate API Route SDK or Strands plugin is required.

## Configure your account

1. Create or sign in to your [API Route account](https://www.api-route.com/).
2. Create an API key in [API Keys](https://www.api-route.com/console/token), and ensure your account has balance for inference.
3. Choose an exact model ID from the [current catalog](https://www.api-route.com/pricing). The examples use `deepseek-v4-flash`. Model access depends on your key's group and allowlist.

Set these environment variables in the shell that will run the example:

```bash
export API_ROUTE_API_KEY="your-api-route-key"
export API_ROUTE_MODEL="deepseek-v4-flash"
```

In PowerShell:

```powershell
$env:API_ROUTE_API_KEY = "your-api-route-key"
$env:API_ROUTE_MODEL = "deepseek-v4-flash"
```

Running either example sends a prompt to API Route and uses your account balance. Keep keys out of source files and Git commits.

## Python

Install the OpenAI provider dependency:

```bash
python -m pip install 'strands-agents[openai]'
```

```python
import os

from strands import Agent
from strands.models.openai import OpenAIModel

model = OpenAIModel(
    client_args={
        "api_key": os.environ["API_ROUTE_API_KEY"],
        "base_url": "https://global.api-route.com/v1",
    },
    model_id=os.getenv("API_ROUTE_MODEL", "deepseek-v4-flash"),
)

agent = Agent(model=model)
print(agent("Explain what an AI agent is in one sentence."))
```

The same code is available in [examples/strands_agents.py](../examples/strands_agents.py). From the repository root, run `python examples/strands_agents.py`.

## TypeScript

From the repository root, install the example dependencies:

```bash
npm install
npm run strands:typescript
```

The configuration in [examples/strands-agents.ts](../examples/strands-agents.ts) uses Chat Completions explicitly:

```typescript
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
```

## Models and troubleshooting

- Use API Route's exact model ID. Do not automatically add `openai/`, `deepseek/`, or another vendor prefix.
- `GET https://global.api-route.com/v1/models` requires `Authorization: Bearer <API_ROUTE_API_KEY>` and lists the models available to your key.
- A 401 response indicates an authentication problem. Check that the environment variable contains a valid API Route key.
- If a model is unavailable, check the catalog and your key's model permissions.
- Streaming, tool calling, structured output and other capabilities depend on the selected model and route. This guide does not imply that every listed model supports every Strands feature.

Reference: [Strands OpenAI provider documentation](https://strandsagents.com/docs/user-guide/sdk/model-providers/openai/).
