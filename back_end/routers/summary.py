import uuid
from typing import Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Cookie, Response, BackgroundTasks
from sqlalchemy.orm import Session

from back_end.db.database import get_db, SessionLocal
from back_end.models.summary import Summary
from back_end.models.job import SummaryJob

from back_end.schemas.summary import (
    CompleteSummaryResponse, GetSummaryRequest)
#from back_end.schemas.job import SummaryJobResponse

router = APIRouter(
    prefix="/papers",
    tags=["papers"],
)

def get_session_id(session_id: Optional[str] = Cookie()):
    if session_id is None:
        raise HTTPException(status_code=401, detail="Session ID not found.")
    return session_id


def get_summary(
        request: GetSummaryRequest,
        background_tasks: BackgroundTasks,
        response: Response,
        session_id: Depends(get_session_id),
        db: SessionLocal = Depends(get_db)
):
    response.set_cookie(key="session_id", value=session_id, httponly=True)

    job_id = str(uuid.uuid4())

    job = SummaryJob(
        job_id=job_id,
        session_id=session_id,
        theme=request.theme,
        status="pending"
    )
    db.add(job)
    db.commit()

    # todo add background task, generate summary

    return job

def generate_summary_task(job_id: str, session_id: str):
    db = SessionLocal()
