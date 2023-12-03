from sqlalchemy import Column, Integer, String, Date, ForeignKey
from database import schemas
from database.database import Base
from sqlalchemy.orm import relationship, Session

class RG(Base):
    __tablename__ = "rg"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    valor = Column(String(100), unique=True)
    dataEmissao = Column(Date)
    cliente_id = Column(Integer, ForeignKey("cliente.id"))
    cliente = relationship("Cliente", back_populates="rgs", lazy="select")


def get_rg(db: Session, id: int):
    return db.query(RG).filter(RG.id == id).first()


def get_all_rg(db: Session, skip: int = 0, limit: int = 100):
    return db.query(RG).offset(skip).limit(limit).all()


def create_rg(db: Session, rg: schemas.RgCreate):
    db_rg = RG(
        valor=rg.valor,
        dataEmissao=rg.dataEmissao,
        cliente_id=rg.cliente_id
    )
    db.add(db_rg)
    db.commit()
    db.refresh(db_rg)
    return db_rg


def update_rg(db: Session, rg: schemas.RgUpdate):
    db_rg = db.query(RG).filter(RG.id == rg.id).first()

    if db_rg:
        db_rg.valor = rg.valor
        db_rg.dataEmissao = rg.dataEmissao

        db.commit()
        db.refresh(db_rg)

    return db_rg


def delete_rg(db: Session, id: int):
    db_rg = db.query(RG).filter(RG.id == id).first()

    if db_rg:
        db.delete(db_rg)
        db.commit()

    return db_rg