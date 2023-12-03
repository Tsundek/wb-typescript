from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import schemas
from models import rg_crud
from database.database import get_db, engine

route = APIRouter(tags=["RG"])


@route.get("/rg/{id}", response_model=schemas.Rg)
async def get_rg(
    id: int,
    db: Session = Depends(get_db)
):
    rg = rg_crud.get_rg(db=db,id=id)
    if not rg:
        raise HTTPException(status_code=404, detail="RG não encontrado")
    return rg

@route.get("/rgs", response_model=List[schemas.Rg])
async def get_all_rgs(
    db: Session = Depends(get_db),
):
    rg = rg_crud.get_all_rg(db=db)

    if not rg:
        raise HTTPException(status_code=404, detail="RG não existe")

    return rg

@route.post("/rg/", response_model=schemas.Rg)
async def create_rg(
    rg: schemas.RgCreate,
    db: Session = Depends(get_db),
):
    rg = rg_crud.create_rg(db=db, rg=rg)
    if not rg:
        raise HTTPException(status_code=404, detail="Erro ao criar RG")
    
    return rg

@route.put("/rg/", response_model=schemas.RgUpdate)
async def update_rg(
    rg: schemas.RgUpdate,
    db: Session = Depends(get_db),
):
    rg = rg_crud.update_rg(rg=rg, db=db)
    if not rg:
        raise HTTPException(status_code=404, detail="RG não encotrado")

    return rg


@route.delete("/rg/{id}")
async def delete_rg(
    id: int,
    db: Session = Depends(get_db),
):
    return rg_crud.delete_rg(id=id, db=db)