from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import schemas
from models import servico_crud
from database.database import get_db

route = APIRouter(tags=["Serviço"])


@route.get("/servico/{id}", response_model=schemas.Servico)
async def get_servico(
    id: int,
    db: Session = Depends(get_db)
):
    servico = servico_crud.get_servico(db=db,id=id)
    if not servico:
        raise HTTPException(status_code=404, detail="Servico não encontrado")
    return servico

@route.get("/servicos", response_model=List[schemas.Servico])
async def get_all_servicos(
    db: Session = Depends(get_db),
):
    servico = servico_crud.get_all_servico(db=db)

    if not servico:
        raise HTTPException(status_code=404, detail="Servico não existe")

    return servico

@route.post("/servico/", response_model=schemas.Servico)
async def create_servico(
    servico: schemas.ServicoCreate,
    db: Session = Depends(get_db),
):
    servico = servico_crud.create_servico(db=db, servico=servico)
    if not servico:
        raise HTTPException(status_code=404, detail="Erro ao criar Servico")
    
    return servico

@route.put("/servico/", response_model=schemas.ServicoUpdate)
async def update_servico(
    servico: schemas.ServicoUpdate,
    db: Session = Depends(get_db),
):
    servico = servico_crud.update_servico(servico=servico, db=db)
    if not servico:
        raise HTTPException(status_code=404, detail="Servico não encotrado")

    return servico


@route.delete("/servico/{id}")
async def delete_servico(
    id: int,
    db: Session = Depends(get_db),
):
    return servico_crud.delete_servico(id=id, db=db)