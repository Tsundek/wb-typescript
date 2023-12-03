from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import schemas
from models import telefone_crud
from database.database import get_db

route = APIRouter(tags=["Telefone"])


@route.get("/telefone/{id}", response_model=schemas.Telefone)
async def get_telefone(
    id: int,
    db: Session = Depends(get_db)
):
    telefone = telefone_crud.get_telefone(db=db,id=id)
    if not telefone:
        raise HTTPException(status_code=404, detail="Telefone não encontrado")
    return telefone

@route.get("/telefones", response_model=List[schemas.Telefone])
async def get_all_telefones(
    db: Session = Depends(get_db),
):
    telefone = telefone_crud.get_all_telefone(db=db)

    if not telefone:
        raise HTTPException(status_code=404, detail="Telefone não existe")

    return telefone

@route.post("/telefone/", response_model=schemas.Telefone)
async def create_telefone(
    telefone: schemas.TelefoneCreate,
    db: Session = Depends(get_db),
):
    telefone = telefone_crud.create_telefone(db=db, telefone=telefone)
    if not telefone:
        raise HTTPException(status_code=404, detail="Erro ao criar Telefone")
    
    return telefone

@route.put("/telefone/", response_model=schemas.TelefoneUpdate)
async def update_telefone(
    telefone: schemas.TelefoneUpdate,
    db: Session = Depends(get_db),
):
    telefone = telefone_crud.update_telefone(telefone=telefone, db=db)
    if not telefone:
        raise HTTPException(status_code=404, detail="Telefone não encotrado")

    return telefone


@route.delete("/telefone/{id}")
async def delete_telefone(
    id: int,
    db: Session = Depends(get_db),
):
    return telefone_crud.delete_telefone(id=id, db=db)