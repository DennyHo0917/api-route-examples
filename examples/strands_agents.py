import os

from strands import Agent
from strands.models.openai import OpenAIModel


def create_model() -> OpenAIModel:
    return OpenAIModel(
        client_args={
            "api_key": os.environ["API_ROUTE_API_KEY"],
            "base_url": "https://global.api-route.com/v1",
        },
        model_id=os.getenv("API_ROUTE_MODEL", "deepseek-v4-flash"),
    )


if __name__ == "__main__":
    agent = Agent(model=create_model())
    print(agent("Explain what an AI agent is in one sentence."))
