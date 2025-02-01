import os

from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

load_dotenv()  # This will load the environment variables from the .env file


class Settings(BaseSettings):
    logging_level: str = "WARNING"
    openai_api_key: str = os.getenv("OPENAI_API_KEY")

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(__file__), "../../.env"),
        extra="allow",
    )
