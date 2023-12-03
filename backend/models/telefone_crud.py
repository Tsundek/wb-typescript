from sqlalchemy import Column, Integer, String, ForeignKey
from database import schemas
from database.database import Base
from sqlalchemy.orm import relationship, Session

class Telefone(Base):
    __tablename__ = "telefone"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ddd = Column(String(3))
    numero = Column(String(20), unique=True)
    cliente_id = Column(Integer, ForeignKey("cliente.id"))
    cliente = relationship("Cliente", back_populates="telefones", lazy="select")


def get_telefone(db: Session, id: int):
    return db.query(Telefone).filter(Telefone.id == id).first()


def get_all_telefone(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Telefone).offset(skip).limit(limit).all()


def create_telefone(db: Session, telefone: schemas.TelefoneCreate):
    db_telefone = Telefone(
        ddd=telefone.ddd,
        numero=telefone.numero,
        cliente_id=telefone.cliente_id
    )
    db.add(db_telefone)
    db.commit()
    db.refresh(db_telefone)
    return db_telefone


def update_telefone(db: Session, telefone: schemas.TelefoneUpdate):
    db_telefone = db.query(Telefone).filter(Telefone.id == telefone.id).first()

    if db_telefone:
        db_telefone.ddd = telefone.ddd
        db_telefone.numero = telefone.numero

        db.commit()
        db.refresh(db_telefone)

    return db_telefone


def delete_telefone(db: Session, id: int):
    db_telefone = db.query(Telefone).filter(Telefone.id == id).first()

    if db_telefone:
        db.delete(db_telefone)
        db.commit()

    return db_telefone

