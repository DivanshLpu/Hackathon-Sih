import os
import dotenv

# Load environment variables from .env file
dotenv.load_dotenv()
def get_env_variable(var_name, default_value=None):
    """Get the value of an environment variable or return a default value."""
    return os.getenv(var_name, default_value)   

def get_direcory_path():
    """Get the absolute path of the current directory."""
    a = os.path.dirname(os.path.abspath(__file__))
    paths = a.replace("\\", "/")
    return paths