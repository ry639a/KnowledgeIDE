import os
from dotenv import load_dotenv
from openai import OpenAI
from langchain.agents import create_agent
from langchain.tools import tool

from back_end.core.prompts import summary_template

def summarize(paper_title, authors):
    load_dotenv()
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    @tool
    def search(query: str) -> str:
        """Search for information."""
        return f"Results for: {query}"

    #langchain agent
    agent = create_agent(
        model="openai:gpt-5",
        tools=[search],
        system_prompt=summary_template
    )
    paper_title = paper_title.lower()

    #Invoke the agent
    result = agent.invoke(
        {"messages": [{"role": "assistant", "content": paper_title + "authors:" + authors}]}
    )

    messages = result["messages"]
    summary_text = str(messages[-1].content)

    output_dir= r"output"
    output_file_name = paper_title + "_summary.txt"
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.abspath(os.path.join(current_dir, ".."))
    os.makedirs(output_dir, exist_ok=True)
    file_path = os.path.join(parent_dir, output_dir, output_file_name)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(summary_text)
        f.close()
    print("Created summary file in ", file_path)
    return summary_text