from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
from database import schemas
from database.database import Base
from sqlalchemy.orm import relationship, Session

class Produto(Base):
    __tablename__ = "produto"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100))
    valor = Column(Numeric(precision=7, scale=2))
    quantidade = Column(Numeric(5,0))
    cliente_id = Column(Integer, ForeignKey("cliente.id"))
    cliente = relationship("Cliente", back_populates="produtos", lazy="select")


def get_produto(db: Session, id: int):
    return db.query(Produto).filter(Produto.id == id).first()


def get_all_produto(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Produto).offset(skip).limit(limit).all()


def create_produto(db: Session, produto: schemas.ProdutoCreate):
    db_produto = Produto(
        nome=produto.nome,
        valor=produto.valor,
        quantidade=produto.quantidade,
        cliente_id=produto.cliente_id
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
        db_produto.quantidade = produto.quantidade

        db.commit()
        db.refresh(db_produto)

    return db_produto


def delete_produto(db: Session, id: int):
    db_produto = db.query(Produto).filter(Produto.id == id).first()

    if db_produto:
        db.delete(db_produto)
        db.commit()

    return db_produto
