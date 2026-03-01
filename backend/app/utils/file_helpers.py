import os
import tempfile
from pathlib import Path

def create_temp_file(suffix: str = ".pdf") -> str:
    """Create a temporary file and return its path."""
    temp_fd, temp_path = tempfile.mkstemp(suffix=suffix)
    os.close(temp_fd)
    return temp_path

def cleanup_file(file_path: str):
    """Safely remove a file if it exists."""
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
    except Exception:
        pass

def get_file_size(file_path: str) -> int:
    """Get file size in bytes."""
    return os.path.getsize(file_path)
