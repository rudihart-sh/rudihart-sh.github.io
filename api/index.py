from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from pathlib import Path
import sys

# Add parent directory to path untuk bisa import chat_service
sys.path.insert(0, str(Path(__file__).parent))

from chat_service import load_project_data, chat_with_gpt4

app = FastAPI()

# Enable CORS untuk frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[Message]] = []

class ChatResponse(BaseModel):
    response: str
    success: bool


# Load project data once at startup
PROJECT_DATA = load_project_data()


@app.get("/")
async def root():
    return {"message": "Project Management Chat API is running"}


@app.post("/api/chat")
async def chat(request: ChatRequest):
    """Main chat endpoint"""
    try:
        if not request.message or not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        # Convert Message objects to dict for chat function
        history = [{"role": msg.role, "content": msg.content} for msg in request.conversation_history]
        
        # Get response from GPT-4
        response = chat_with_gpt4(
            user_message=request.message,
            project_data=PROJECT_DATA,
            conversation_history=history
        )
        
        return ChatResponse(response=response, success=True)
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@app.get("/api/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "api_key_configured": bool(os.environ.get("OPENAI_API_KEY")),
        "project_data_loaded": len(PROJECT_DATA) > 0
    }


# For local testing
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
