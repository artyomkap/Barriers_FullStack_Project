from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database.connect import get_db
from schemas.client import ClientCreate, ClientUpdate, ClientOut
from database import crud as crud_client

router = APIRouter(prefix="/clients", tags=["Clients"])


@router.get("/", response_model=list[ClientOut])
async def list_clients(db: AsyncSession = Depends(get_db)):
    return await crud_client.get_clients(db)


@router.get("/{client_id}", response_model=ClientOut)
async def get_client(client_id: int, db: AsyncSession = Depends(get_db)):
    client = await crud_client.get_client(db, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client


@router.post("/", response_model=ClientOut)
async def create_client(data: ClientCreate, db: AsyncSession = Depends(get_db)):
    return await crud_client.create_client(db, data)


@router.put("/{client_id}", response_model=ClientOut)
async def update_client(client_id: int, data: ClientUpdate, db: AsyncSession = Depends(get_db)):
    updated = await crud_client.update_client(db, client_id, data)
    if not updated:
        raise HTTPException(status_code=404, detail="Client not found")
    return updated


@router.delete("/{client_id}")
async def delete_client(client_id: int, db: AsyncSession = Depends(get_db)):
    success = await crud_client.delete_client(db, client_id)
    if not success:
        raise HTTPException(status_code=404, detail="Client not found")
    return {"ok": True}
