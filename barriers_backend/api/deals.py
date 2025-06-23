from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database.connect import get_db
from schemas.deal import DealCreate, DealUpdate, DealOut
from database import crud as crud_deal

router = APIRouter(prefix="/deals", tags=["Deals"])


@router.get("/", response_model=list[DealOut])
async def list_deals(db: AsyncSession = Depends(get_db)):
    return await crud_deal.get_deals(db)


@router.get("/{deal_id}", response_model=DealOut)
async def get_deal(deal_id: int, db: AsyncSession = Depends(get_db)):
    deal = await crud_deal.get_deal(db, deal_id)
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found")
    return deal


@router.post("/", response_model=DealOut)
async def create_deal(data: DealCreate, db: AsyncSession = Depends(get_db)):
    return await crud_deal.create_deal(db, data)


@router.put("/{deal_id}", response_model=DealOut)
async def update_deal(deal_id: int, data: DealUpdate, db: AsyncSession = Depends(get_db)):
    updated = await crud_deal.update_deal(db, deal_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Deal not found")
    return updated


@router.delete("/{deal_id}")
async def delete_deal(deal_id: int, db: AsyncSession = Depends(get_db)):
    success = await crud_deal.delete_deal(db, deal_id)
    if not success:
        raise HTTPException(status_code=404, detail="Deal not found")
    return {"ok": True}
