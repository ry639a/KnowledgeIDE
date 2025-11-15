import os
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain_core.prompts import PromptTemplate
from langchain_text_splitters import CharacterTextSplitter
from langchain_core.documents import Document
import pypdf
from back_end.core.prompts import q_and_a_template

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

def question(paper_name: str, query: str):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    papers_dir = os.path.join(base_dir, "..", "papers")
    file_path = os.path.join(papers_dir, paper_name)

    print("file_path:", file_path)
    reader = pypdf.PdfReader(file_path)
    documents = [Document(page_content=page.extract_text()) for page in reader.pages]

    text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    texts = text_splitter.split_documents(documents)

    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    db = Chroma.from_documents(texts, embedding=embeddings)
    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 3})

    prompt = PromptTemplate(
        template=q_and_a_template,
        input_variables=["context", "question"]
    )

    llm = ChatOpenAI(model="gpt-4o")

    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    response = rag_chain.invoke(query)
    print("\n AI Answer:\n", response)
    return response

if __name__ == "__main__":
    paper_name = input("Enter your paper's name (e.g., mypaper.pdf): ").strip()
    query = input("Enter your query: ").strip()
    question(paper_name, query)