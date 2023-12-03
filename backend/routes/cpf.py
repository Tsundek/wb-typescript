from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import schemas
from models import cpf_crud
from database.database import get_db, engine

route = APIRouter(tags=["CPF"])


@route.get("/cpf/{id}", response_model=schemas.Cpf)
async def get_cpf(
    id: int,
    db: Session = Depends(get_db)
):
    cpf = cpf_crud.get_cpf(db=db,id=id)
    if not cpf:
        raise HTTPException(status_code=404, detail="CPF não encontrado")
    return cpf

@route.get("/cpfs", response_model=List[schemas.Cpf])
async def get_all_cpfs(
    db: Session = Depends(get_db),
):
    cpf = cpf_crud.get_all_cpf(db=db)

    if not cpf:
        raise HTTPException(status_code=404, detail="CPF não existe")

    return cpf

@route.post("/cpf/", response_model=schemas.Cpf)
async def create_cpf(
    cpf: schemas.CpfCreate,
    db: Session = Depends(get_db),
):
    cpf = cpf_crud.create_cpf(db=db, cpf=cpf)
    if not cpf:
        raise HTTPException(status_code=404, detail="Erro ao criar CPF")
    
    return cpf

@route.put("/cpf/", response_model=schemas.CpfUpdate)
async def update_cpf(
    cpf: schemas.CpfUpdate,
    db: Session = Depends(get_db),
):
    cpf = cpf_crud.update_cpf(cpf=cpf, db=db)
    if not cpf:
        raise HTTPException(status_code=404, detail="CPF não encotrado")

    return cpf


@route.delete("/cpf/{id}")
async def delete_cpf(
    id: int,
    db: Session = Depends(get_db),
):
    return cpf_crud.delete_cpf(id=id, db=db)