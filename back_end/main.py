from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from back_end.core import summarize_paper
from back_end.core import query_paper

app = FastAPI(
    title="KnowledgeIDE",
    description="API to extract knowledge from Research Papers",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

class Summary(BaseModel):
    paper_id: str
    paper_title: str
    authors: List[str]

@app.get("/papers/summary/")
def get_summary(paper_title: str, authors: str):
    summary_text = summarize_paper.summarize(paper_title, authors)
    return summary_text

@app.get("/papers/query/")
def get_answer(paper_title: str, query: str):
    return query_paper.question(paper_title, query)

origins = ["http://localhost:5173",]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def main():
    print("Hello from back_end!")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)