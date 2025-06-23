from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Literal


class TaskBase(BaseModel):
    client_id: int
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    status: Literal["pending", "completed", "overdue"] = "pending"


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    due_date: Optional[datetime]
    status: Optional[Literal["pending", "completed", "overdue"]]


class TaskOut(TaskBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
