from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import schemas
from models import cliente_crud
from database.database import get_db, engine

route = APIRouter(tags=["Cliente"])

def create_cliente():
    with Session(engine) as session:
        db_user = cliente_crud.get_cliente(session, id=1)
        if not db_user:
            db_cliente = cliente_crud.create_user(
                db=session,
                user=schemas.ClienteCreate(
                    nome="Paysanduuuu",
                    nomeSocial="Gerson"
                )
            )
            return db_cliente


@route.get("/cliente/{id}", response_model=schemas.Cliente)
async def get_cliente(
    id: int,
    db: Session = Depends(get_db)
):
    cliente = cliente_crud.get_cliente(db=db, id=id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    
    return cliente

@route.get("/clientes", response_model=List[schemas.Cliente])
async def get_all_users(
    db: Session = Depends(get_db),
):
    user = cliente_crud.get_all_user(db=db)

    if not user:
        raise HTTPException(status_code=404, detail="Cliente não existe")

    return user

@route.post("/clientes/", response_model=schemas.ClienteBase)
async def create_user(
    user: schemas.ClienteCreate,
    db: Session = Depends(get_db),
):
    return cliente_crud.create_user(db=db, user=user)

@route.put("/clientes/", response_model=schemas.Cliente)
async def update_user(
    user: schemas.Cliente,
    db: Session = Depends(get_db),
):
    user = cliente_crud.update_user(user=user, db=db)
    if not user:
        raise HTTPException(status_code=404, detail="Cliente não encotrado")

    return user


@route.delete("/clientes/{id}")
async def delete_user(
    id: int,
    db: Session = Depends(get_db),
):
    return cliente_crud.delete_user(id=id, db=db)