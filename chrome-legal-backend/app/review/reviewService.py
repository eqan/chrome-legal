import os
import re

from openai import OpenAI

from app.review.prompts.load_prompt import load_prompt

from app.review.prompts.settings import Settings

settings = Settings()
os.environ["OPENAI_API_KEY"] = settings.openai_api_key


def generate_result(
    document_clauses: str, user_message: str, chat_history: str
):
    """
    Generate a result based on the provided document clauses, user message, and chat history.

    Args:
        document_clauses (str): The clauses of the document to be reviewed.
        user_message (str): The message from the user.
        chat_history (str): The history of the chat conversation.

    Returns:
        str: The generated response based on the provided inputs.
    """
    prompt = load_prompt()
    # Replace placeholders with actual values

    filled_prompt = prompt.replace(
        "{document_clauses}", document_clauses
    ).replace(
        "{user_message}", user_message
    ).replace(
        "{chat_history}", chat_history
    )

    # Debugging: Print the filled prompt to ensure it's correct
    print(f"Filled Prompt: {filled_prompt}")

    client = OpenAI()
    response = client.chat.completions.create(
        model="gpt-4o-2024-08-06",
        temperature=0.8,
        messages=[
            {"role": "system", "content": ""},
            {"role": "user", "content": filled_prompt},
        ],
    )

    # Extract the content and print it for debugging
    output_content = response.choices[0].message.content.strip()
    print(f"Raw Output Content: {output_content}")

    # Remove backticks if present
    if output_content.startswith("```json") and output_content.endswith("```"):
        output_content = output_content[3:-3].strip()

    match = re.search(r'"response"\s*:\s*"([^"]+)"', output_content)
    output = match.group(1) if match else None
    return output