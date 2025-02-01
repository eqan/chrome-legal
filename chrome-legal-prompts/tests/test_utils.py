import os


def load_prompt(version: str) -> str:
    """
    Load a prompt file from the directory relative to the calling test file.

    Args:
        version: The version number of the prompt (e.g., "1")

    Returns:
        The contents of the prompt file as a string
    """
    # Get the calling frame (test file location)
    import inspect

    calling_frame = inspect.stack()[1]
    test_file_path = calling_frame.filename

    # Get the directory containing the test file
    test_dir = os.path.dirname(os.path.abspath(test_file_path))

    # Go up one level from the 'tests' directory to find the prompt file
    prompt_dir = os.path.dirname(test_dir)
    prompt_path = os.path.join(prompt_dir, f"v{version}.prompt")

    with open(prompt_path, "r") as file:
        return file.read()