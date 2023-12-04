from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import schemas
from models import produto_crud, products_consumed
from database.database import get_db

route = APIRouter(tags=["Produto"])


@route.get("/produto/{id}", response_model=schemas.Produto)
async def get_produto(
    id: int,
    db: Session = Depends(get_db)
):
    produto = produto_crud.get_produto(db=db,id=id)
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return produto

@route.get("/produtos", response_model=List[schemas.Produto])
async def get_all_produtos(
    db: Session = Depends(get_db),
):
    produto = produto_crud.get_all_produto(db=db)

    if not produto:
        raise HTTPException(status_code=404, detail="Produto não existe")

    return produto

@route.post("/produto/", response_model=schemas.Produto)
async def create_produto(
    produto: schemas.ProdutoCreate,
    db: Session = Depends(get_db),
):
    produto = produto_crud.create_produto(db=db, produto=produto)
    if not produto:
        raise HTTPException(status_code=404, detail="Erro ao criar Produto")
    
    return produto

@route.put("/produto/", response_model=schemas.ProdutoUpdate)
async def update_produto(
    produto: schemas.ProdutoUpdate,
    db: Session = Depends(get_db),
):
    produto = produto_crud.update_produto(produto=produto, db=db)
    if not produto:
        raise HTTPException(status_code=404, detail="Produto não encotrado")

    return produto


@route.delete("/produto/{id}")
async def delete_produto(
    id: int,
    db: Session = Depends(get_db),
):
    return produto_crud.delete_produto(id=id, db=db)

@route.post("/produto/consumir/{cliente_id}/{produto_id}")
async def consumir_produto(
    cliente_id: int,
    produto_id: int,
    db: Session = Depends(get_db),
):
    resposta = produto_crud.consumo_produto(db=db, produto_id=produto_id, cliente_id=cliente_id)
    if (resposta == False):
        raise HTTPException(status_code=404, detail="Erro ao consumir produto")
    

@route.get("/produtos/consumidos")
async def get_all_produtos(
    db: Session = Depends(get_db),
):
    produto = products_consumed.get_all_produtosConsumidos(db=db)

    if not produto:
        raise HTTPException(status_code=404, detail="Produto não existe")

    return produto