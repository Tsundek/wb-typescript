from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
from database import schemas
from database.database import Base
from sqlalchemy.orm import relationship, Session

from models import cliente_crud, services_consumed

class Servico(Base):
    __tablename__ = "servico"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome = Column(String(100))
    valor = Column(Numeric(precision=7, scale=2))
    consumido_por = relationship('Cliente', secondary='cliente_servico_association', back_populates='servicos_consumidos')


def get_servico(db: Session, id: int):
    return db.query(Servico).filter(Servico.id == id).first()


def get_all_servico(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Servico).offset(skip).limit(limit).all()


def create_servico(db: Session, servico: schemas.ServicoCreate):
    db_servico = Servico(
        nome=servico.nome,
        valor=servico.valor,
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

        db.commit()
        db.refresh(db_servico)

    return db_servico


def delete_servico(db: Session, id: int):
    db_servico = db.query(Servico).filter(Servico.id == id).first()

    if db_servico:
        db.delete(db_servico)
        db.commit()

    return db_servico

def consumo_servico(db: Session, servico_id: int, cliente_id: int, quantidade: int = 1):
    db_servico = db.query(Servico).get(servico_id)
    db_cliente = db.query(cliente_crud.Cliente).get(cliente_id)

    if db_servico and db_cliente:
        association = db.query(services_consumed.ClientServiceAssociation).filter_by(cliente_id=cliente_id, servico_id=servico_id).first()
        if association:
            association.quantidade += quantidade

        else:
            association = services_consumed.ClientServiceAssociation(
                cliente_id=cliente_id,
                servico_id=servico_id,
                quantidade=quantidade
            )
            db.add(association)

        db.commit()
        return True

    return False