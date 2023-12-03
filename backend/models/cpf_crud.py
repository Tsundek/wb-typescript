from sqlalchemy import Column, Integer, String, Date, ForeignKey
from database import schemas
from database.database import Base
from sqlalchemy.orm import relationship, Session

class CPF(Base):
    __tablename__ = "cpf"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    valor = Column(String(100), unique=True)
    dataEmissao = Column(Date)
    cliente_id = Column(Integer, ForeignKey("cliente.id"), unique=True)
    cliente = relationship("Cliente", back_populates="cpf", lazy="select")



def get_cpf(db: Session, id: int):
    return db.query(CPF).filter(CPF.id == id).first()


def get_all_cpf(db: Session, skip: int = 0, limit: int = 100):
    return db.query(CPF).offset(skip).limit(limit).all()


def create_cpf(db: Session, cpf: schemas.CpfCreate):
    db_cpf = CPF(
        valor=cpf.valor,
        dataEmissao=cpf.dataEmissao,
        cliente_id=cpf.cliente_id
    )
    db.add(db_cpf)
    db.commit()
    db.refresh(db_cpf)
    return db_cpf


def update_cpf(db: Session, cpf: schemas.Cpf):
    db_cpf = db.query(CPF).filter(CPF.id == cpf.id).first()

    if db_cpf:
        db_cpf.valor = cpf.valor
        db_cpf.dataEmissao = cpf.dataEmissao

        db.commit()
        db.refresh(db_cpf)

    return db_cpf


def delete_cpf(db: Session, id: int):
    db_cpf = db.query(CPF).filter(CPF.id == id).first()

    if db_cpf:
        db.delete(db_cpf)
        db.commit()

    return db_cpf