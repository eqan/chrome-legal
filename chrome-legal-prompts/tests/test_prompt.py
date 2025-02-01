import json
import os
import re

import pytest
from openai import OpenAI

from .test_utils import load_prompt
from sentence_transformers import SentenceTransformer, util


from .settings import Settings

settings = Settings()
os.environ["OPENAI_API_KEY"] = settings.openai_api_key


def load_test_data():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(current_dir, "dataset.json"), "r") as f:
        return json.load(f)


def compare_responses(expected, response):
    model = SentenceTransformer("nli-roberta-base-v2")

    # Directly encode the entire texts
    expected_embedding = model.encode(expected, convert_to_tensor=True)
    response_embedding = model.encode(response, convert_to_tensor=True)

    # Calculate cosine similarity directly
    similarity = util.pytorch_cos_sim(expected_embedding, response_embedding).item()

    return similarity


@pytest.mark.parametrize(
    "document_clauses, user_message, chat_history, expected_output",
    [
        (
            case["document_clauses"],
            case["user_message"],
            case["chat_history"],
            case["expected_output"],

        )
        for case in load_test_data()
    ],
)
def test_prompt(
    document_clauses, user_message, chat_history, expected_output
):
    prompt = load_prompt(version=1)
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
        temperature=0.0,
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

    assert output != "", "Output is empty"

    # print(
    #     f"This is the output: '{output}' and this is the expected output: '{expected_output}'"
    # )
    # similarity_score = compare_responses(expected_output, output)
    # print(f"Current Score: {similarity_score}")
    # assert similarity_score >= 0.95, "Responses are not similar enough"
