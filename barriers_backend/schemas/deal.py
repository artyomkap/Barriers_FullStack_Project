from pydantic import BaseModel
from typing import Literal
from datetime import datetime


class DealBase(BaseModel):
    client_id: int
    title: str
    address: str
    amount: float
    status: Literal["new", "in_progress", "completed", "cancelled"] = "new"


class DealCreate(DealBase):
    pass


class DealUpdate(BaseModel):
    title: str
    address: str
    amount: float
    status: Literal["new", "in_progress", "completed", "cancelled"]


class DealOut(DealBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
