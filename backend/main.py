from database import schemas, database
from sqlalchemy.orm import Session
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database.database import SessionLocal, engine
from routes import cliente, cpf, rg, produto, servico, telefone

database.Base.metadata.create_all(bind=engine)

app = FastAPI(version="5.0.0")

cliente.create_cliente()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ou especifique origens específicas
    allow_credentials=["*"],
    allow_methods=["*"],  # Ou especifique métodos específicos (GET, POST, etc.)
    allow_headers=["*"],  # Ou especifique cabeçalhos específicos
)

app.include_router(cliente.route)
app.include_router(cpf.route)
app.include_router(rg.route)
app.include_router(produto.route)
app.include_router(servico.route)
app.include_router(telefone.route)