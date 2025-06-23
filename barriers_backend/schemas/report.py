from pydantic import BaseModel
from datetime import datetime
from typing import Any


class ReportCreate(BaseModel):
    name: str
    content: Any  # JSON-тип


class ReportUpdate(BaseModel):
    name: str
    content: Any


class ReportOut(BaseModel):
    id: int
    name: str
    created_at: datetime
    content: Any

    class Config:
        from_attributes = True
