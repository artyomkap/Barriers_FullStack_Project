from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from database.models import Client, Deal, Task, Report
from schemas.report import ReportCreate, ReportUpdate
from schemas.task import TaskUpdate, TaskCreate


async def get_clients(db: AsyncSession):
    result = await db.execute(select(Client).options(selectinload(Client.deals), selectinload(Client.tasks)))
    return result.scalars().all()


async def get_client(db: AsyncSession, client_id: int):
    result = await db.execute(select(Client).where(Client.id == client_id))
    return result.scalar_one_or_none()


async def create_client(db: AsyncSession, client_data):
    client = Client(**client_data.dict())
    db.add(client)
    await db.commit()
    await db.refresh(client)
    return client


async def update_client(db: AsyncSession, client_id: int, client_data):
    client = await get_client(db, client_id)
    if not client:
        return None
    for key, value in client_data.dict(exclude_unset=True).items():
        setattr(client, key, value)
    await db.commit()
    await db.refresh(client)
    return client


async def delete_client(db: AsyncSession, client_id: int):
    client = await get_client(db, client_id)
    if not client:
        return False
    await db.delete(client)
    await db.commit()
    return True


async def get_deals(db: AsyncSession):
    result = await db.execute(select(Deal))
    return result.scalars().all()


async def get_deal(db: AsyncSession, deal_id: int):
    result = await db.execute(select(Deal).where(Deal.id == deal_id))
    return result.scalar_one_or_none()


async def create_deal(db: AsyncSession, deal_data):
    deal = Deal(**deal_data.dict())
    db.add(deal)
    await db.commit()
    await db.refresh(deal)
    return deal


async def update_deal(db: AsyncSession, deal_id: int, deal_data):
    deal = await get_deal(db, deal_id)
    if not deal:
        return None
    for key, value in deal_data.dict(exclude_unset=True).items():
        setattr(deal, key, value)
    await db.commit()
    await db.refresh(deal)
    return deal


async def delete_deal(db: AsyncSession, deal_id: int):
    deal = await get_deal(db, deal_id)
    if not deal:
        return False
    await db.delete(deal)
    await db.commit()
    return True


async def get_tasks(db: AsyncSession):
    result = await db.execute(select(Task))
    return result.scalars().all()


async def get_task(db: AsyncSession, task_id: int):
    result = await db.execute(select(Task).where(Task.id == task_id))
    return result.scalar_one_or_none()


async def create_task(db: AsyncSession, data: TaskCreate):
    task = Task(**data.dict())
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task


async def update_task(db: AsyncSession, task_id: int, data: TaskUpdate):
    result = await db.execute(select(Task).where(Task.id == task_id))
    task = result.scalar_one_or_none()
    if not task:
        return None
    for key, value in data.dict(exclude_unset=True).items():
        setattr(task, key, value)
    await db.commit()
    await db.refresh(task)
    return task


async def delete_task(db: AsyncSession, task_id: int):
    result = await db.execute(select(Task).where(Task.id == task_id))
    task = result.scalar_one_or_none()
    if not task:
        return False
    await db.delete(task)
    await db.commit()
    return True


async def get_reports(db: AsyncSession):
    result = await db.execute(select(Report))
    return result.scalars().all()


async def get_report(db: AsyncSession, report_id: int):
    result = await db.execute(select(Report).where(Report.id == report_id))
    return result.scalar_one_or_none()


async def create_report(db: AsyncSession, data: ReportCreate):
    report = Report(**data.dict())
    db.add(report)
    await db.commit()
    await db.refresh(report)
    return report


async def update_report(db: AsyncSession, report_id: int, data: ReportUpdate):
    report = await get_report(db, report_id)
    if not report:
        return None
    for key, value in data.dict().items():
        setattr(report, key, value)
    await db.commit()
    await db.refresh(report)
    return report


async def delete_report(db: AsyncSession, report_id: int):
    report = await get_report(db, report_id)
    if not report:
        return False
    await db.delete(report)
    await db.commit()
    return True