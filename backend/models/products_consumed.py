from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import Session


from database.database import Base


class ClientProductAssociation(Base):
    __tablename__ = 'cliente_produto_association'

    cliente_id = Column(Integer, ForeignKey('cliente.id'), primary_key=True)
    produto_id = Column(Integer, ForeignKey('produto.id'), primary_key=True)
    quantidade = Column(Integer, default=0)
    

def get_all_produtosConsumidos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(ClientProductAssociation).offset(skip).limit(limit).all()