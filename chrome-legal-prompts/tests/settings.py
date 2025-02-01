import os

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    logging_level: str = "WARNING"
    openai_api_key: str = ""

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(__file__), "../../.env"),
        extra="allow",
    )
