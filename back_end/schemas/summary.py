from typing import List, Optional, Dict
from datetime import datetime
from pydantic import BaseModel

class SummaryOptionsSchema(BaseModel):
    text: str
    node_id: Optional[int] = None

#Base: parent class for other schemas
"""
class SummaryBase(BaseModel):
    content: str
    is_ending: bool = False
    is_winning_ending: bool = False
    """

class SummaryBase(BaseModel):
    content: str
    session_id: Optional[str] = None

    class Config:
        from_attributes = True

class GetSummaryRequest(BaseModel):
    paper_title: str
    authors: List[str]

#response: schema for api response
class CompleteSummaryResponse(SummaryBase):
    id: int
    created_at: datetime
    options: List[SummaryOptionsSchema]

    class Config:
        from_attributes = True
