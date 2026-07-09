import os
import json
from typing import List
from pathlib import Path
import re

# Requirements untuk install:
# pip install openai

def load_project_data() -> str:
    """Load semua project data dari folder projects-data"""
    data_path = Path(__file__).parent.parent / "projects-data"
    
    all_content = ""
    
    try:
        for file in sorted(data_path.glob("*.md")):
            with open(file, 'r', encoding='utf-8') as f:
                all_content += f"\n\n--- FILE: {file.name} ---\n"
                all_content += f.read()
    except Exception as e:
        print(f"Error loading files: {e}")
        all_content = "Unable to load project data"
    
    return all_content


def create_system_prompt(project_data: str) -> str:
    """Create system prompt dengan project context"""
    return f"""You are a Professional Project Management Assistant. Your role is to help IT Project Managers (PM) get quick insights about projects and tasks.

You have access to the following project database:

{project_data}

Your responsibilities:
1. Answer questions about project status, timeline, and progress
2. Provide detailed task breakdowns with assessment times
3. Help PMs understand workload and resource allocation
4. Summarize project information clearly and concisely
5. Provide accurate estimates based on the project data

Guidelines:
- Always reference specific project names and tasks
- Provide time estimates in days when asked
- Be clear about project status and progress percentage
- If asked about a project not in the database, politely inform the user
- Keep responses professional and concise for busy PMs
- Use formatted lists and tables when appropriate for clarity

Remember: Assessment times are estimates based on current project specifications."""


def chat_with_gpt4(user_message: str, project_data: str, conversation_history: List[dict]) -> str:
    """Send message to GPT-4 and get response"""
    from openai import OpenAI
    
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    
    # Build messages with system prompt
    messages = [
        {
            "role": "system",
            "content": create_system_prompt(project_data)
        }
    ]
    
    # Add conversation history
    messages.extend(conversation_history)
    
    # Add current user message
    messages.append({
        "role": "user",
        "content": user_message
    })
    
    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            temperature=0.7,
            max_tokens=2000
        )
        
        return response.choices[0].message.content
    except Exception as e:
        return f"Error communicating with OpenAI: {str(e)}"


# For testing locally
if __name__ == "__main__":
    project_data = load_project_data()
    print("Project data loaded successfully")
    print(f"Data length: {len(project_data)} characters")
