@echo off
SETLOCAL EnableExtensions

:: 1. Check if uv is installed
where uv >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo ⚡ 'uv' detected! Using uv for faster setup...
    
    :: Create virtual environment with uv if it doesn't exist
    if not exist ".venv" (
        uv venv
    )
    
    :: Activate virtual environment
    call .venv\Scripts\activate.bat
    
    :: Sync dependencies using uv pip
    if exist "requirements.txt" (
        echo Installing dependencies via uv...
        uv pip install -r requirements.txt
    )
) else (
    echo ⚠️ 'uv' not found. Falling back to standard python -m venv...
    
    :: Create virtual environment with python if it doesn't exist
    if not exist ".venv" (
        python -m venv .venv
    )
    
    :: Activate virtual environment
    call .venv\Scripts\activate.bat
    
    :: Install dependencies using standard pip
    if exist "requirements.txt" (
        echo Installing dependencies via pip...
        python -m pip install --upgrade pip
        python -m pip install -r requirements.txt
    )
)

:: 2. Run the application
echo 🚀 Starting main.py...
python main.py

pause
