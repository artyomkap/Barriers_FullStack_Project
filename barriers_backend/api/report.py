# routers/report.py

from sqlalchemy import select, func
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.connect import get_db
from database.models import Client, Deal, Task
from collections import defaultdict

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/dashboard")
async def get_dashboard(db: AsyncSession = Depends(get_db)):
    # Количество клиентов
    client_count = (await db.execute(select(func.count(Client.id)))).scalar_one()

    # Количество сделок по статусам и общая сумма
    deals_stats = (await db.execute(
        select(Deal.status, func.count(Deal.id), func.sum(Deal.amount))
        .group_by(Deal.status)
    )).all()
    deals_summary = {
        "total": sum(row[1] for row in deals_stats),
        "by_status": {row[0]: row[1] for row in deals_stats},
        "sum_by_status": {row[0]: float(row[2] or 0) for row in deals_stats},
    }
    deals_amount_total = sum(float(row[2] or 0) for row in deals_stats)

    # Количество задач по статусу
    tasks_stats = (await db.execute(
        select(Task.status, func.count(Task.id))
        .group_by(Task.status)
    )).all()
    tasks_summary = {
        "total": sum(row[1] for row in tasks_stats),
        "by_status": {row[0]: row[1] for row in tasks_stats},
    }

    return {
        "clients": {"total": client_count},
        "deals": {**deals_summary, "amount_total": deals_amount_total},
        "tasks": tasks_summary
    }
