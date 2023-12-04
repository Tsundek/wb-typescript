from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import Session

from database.database import Base


class ClientServiceAssociation(Base):
    __tablename__ = 'cliente_servico_association'

    cliente_id = Column(Integer, ForeignKey('cliente.id'), primary_key=True)
    servico_id = Column(Integer, ForeignKey('servico.id'), primary_key=True)
    quantidade = Column(Integer, default=0)
    

def get_all_servicosConsumidos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(ClientServiceAssociation).offset(skip).limit(limit).all()