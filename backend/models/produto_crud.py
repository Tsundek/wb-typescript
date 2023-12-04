from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
from database import schemas
from database.database import Base
from sqlalchemy.orm import relationship, Session

from models import cliente_crud, products_consumed

class Produto(Base):
    __tablename__ = "produto"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100))
    valor = Column(Numeric(precision=7, scale=2))
    consumido_por = relationship('Cliente', secondary='cliente_produto_association', back_populates='produtos_consumidos')



def get_produto(db: Session, id: int):
    return db.query(Produto).filter(Produto.id == id).first()


def get_all_produto(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Produto).offset(skip).limit(limit).all()


def create_produto(db: Session, produto: schemas.ProdutoCreate):
    db_produto = Produto(
        nome=produto.nome,
        valor=produto.valor,
    )
    db.add(db_produto)
    db.commit()
    db.refresh(db_produto)
    return db_produto


def update_produto(db: Session, produto: schemas.ProdutoUpdate):
    db_produto = db.query(Produto).filter(Produto.id == produto.id).first()

    if db_produto:
        db_produto.nome = produto.nome
        db_produto.valor = produto.valor

        db.commit()
        db.refresh(db_produto)

    return db_produto


def delete_produto(db: Session, id: int):
    db_produto = db.query(Produto).filter(Produto.id == id).first()

    if db_produto:
        db.delete(db_produto)
        db.commit()

    return db_produto

def consumo_produto(db: Session, produto_id: int, cliente_id: int, quantidade: int = 1):
    db_produto = db.query(Produto).get(produto_id)
    db_cliente = db.query(cliente_crud.Cliente).get(cliente_id)

    if db_produto and db_cliente:
        association = db.query(products_consumed.ClientProductAssociation).filter_by(cliente_id=cliente_id, produto_id=produto_id).first()
        if association:
            association.quantidade += quantidade

        else:
            association = products_consumed.ClientProductAssociation(
                cliente_id=cliente_id,
                produto_id=produto_id,
                quantidade=quantidade
            )
            db.add(association)

        db.commit()
        return True

    return False