from typing import List
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship, Session, Mapped
from database import schemas
from database.database import Base
from models import cpf_crud, servico_crud, rg_crud, produto_crud, telefone_crud


class Cliente(Base):
    __tablename__ = "cliente"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100))
    nomeSocial = Column(String(100))
    cpf:  Mapped[List[cpf_crud.CPF]] = relationship("CPF", uselist=False, back_populates="cliente", lazy="select")
    rgs: Mapped[List[rg_crud.RG]] = relationship("RG", back_populates="cliente", cascade="all, delete-orphan")
    telefones: Mapped[List[telefone_crud.Telefone]] = relationship("Telefone", back_populates="cliente", cascade="all, delete-orphan")
    servicos: Mapped[List[servico_crud.Servico]] = relationship("Servico", back_populates="cliente", cascade="all, delete-orphan")
    produtos: Mapped[List[produto_crud.Produto]] = relationship("Produto", back_populates="cliente", cascade="all, delete-orphan")

def get_cliente(db: Session, id: int):
    return db.query(Cliente).filter(Cliente.id == id).first()

def get_all_user(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Cliente).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.ClienteCreate):
    db_user = Cliente(
        nome=user.nome,
        nomeSocial=user.nomeSocial,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user: schemas.Cliente):
    db_user = db.query(Cliente).filter(Cliente.id == user.id).first()

    if db_user:
        db_user.nome = user.nome
        db_user.nomeSocial = user.nomeSocial
        db.commit()
        db.refresh(db_user)

    return db_user


def delete_user(db: Session, id: int):
    db_user = db.query(Cliente).filter(Cliente.id == id).first()

    if db_user:
        db.delete(db_user)
        db.commit()

    return db_user