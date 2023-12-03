from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
from database import schemas
from database.database import Base
from sqlalchemy.orm import relationship, Session

class Servico(Base):
    __tablename__ = "servico"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100))
    valor = Column(Numeric(precision=7, scale=2))
    quantidade = Column(Numeric(5,0))
    cliente_id = Column(Integer, ForeignKey("cliente.id"))
    cliente = relationship("Cliente", back_populates="servicos", lazy="select")


def get_servico(db: Session, id: int):
    return db.query(Servico).filter(Servico.id == id).first()


def get_all_servico(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Servico).offset(skip).limit(limit).all()


def create_servico(db: Session, servico: schemas.ServicoCreate):
    db_servico = Servico(
        nome=servico.nome,
        valor=servico.valor,
        quantidade=servico.quantidade,
        cliente_id=servico.cliente_id
    )
    db.add(db_servico)
    db.commit()
    db.refresh(db_servico)
    return db_servico


def update_servico(db: Session, servico: schemas.ServicoUpdate):
    db_servico = db.query(Servico).filter(Servico.id == servico.id).first()

    if db_servico:
        db_servico.nome = servico.nome
        db_servico.valor = servico.valor
        db_servico.quantidade = servico.quantidade

        db.commit()
        db.refresh(db_servico)

    return db_servico


def delete_servico(db: Session, id: int):
    db_servico = db.query(Servico).filter(Servico.id == id).first()

    if db_servico:
        db.delete(db_servico)
        db.commit()

    return db_servico
