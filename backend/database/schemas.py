from pydantic import BaseModel
from datetime import date
from typing import List

class TelefoneBase(BaseModel):
    ddd: str
    numero: str
    cliente_id: int

class TelefoneCreate(TelefoneBase):
    pass

class Telefone(TelefoneBase):
    id: int

    class Config:
        from_attributes = True

class TelefoneUpdate(BaseModel):
    ddd: str
    numero: str

class ServicoBase(BaseModel):
    nome: str
    valor: float
    
class ServicoCreate(ServicoBase):
    pass

class Servico(ServicoBase):
    id: int

    class Config:
        from_attributes = True

class ServicoUpdate(BaseModel):
    id: int
    nome: str
    valor: float


class ProdutoBase(BaseModel):
    nome: str
    valor: float

class ProdutoCreate(ProdutoBase):
    pass

class Produto(ProdutoBase):
    id: int

    class Config:
        from_attributes = True

class ProdutoUpdate(BaseModel):
    id: int
    nome: str
    valor: float

class RgBase(BaseModel):
    valor: str
    dataEmissao: date
    cliente_id: int

class RgCreate(RgBase):
    pass

class Rg(RgBase):
    id: int

    class Config:
        from_attributes = True

class RgUpdate(BaseModel):
    id: int
    valor: str
    dataEmissao: date

class CpfBase(BaseModel):
    valor: str
    dataEmissao: date
    cliente_id: int

class CpfCreate(CpfBase):
    pass

class Cpf(CpfBase):
    id: int

    class Config:
        from_attributes = True

class CpfUpdate(BaseModel):
    id: int
    valor: str
    dataEmissao: date

class ClienteBase(BaseModel):
    nome: str
    nomeSocial: str | None
    genero: str

class ClienteCreate(ClienteBase):
    cpf: CpfCreate | None
    rgs: List[RgCreate] | None
    telefones: List[TelefoneCreate] | None
    pass

class Cliente(ClienteBase):
    id: int
    cpf: Cpf | None
    rgs: List[Rg] | None
    telefones: List[Telefone] | None

    class Config:
        from_attributes = True

class ClienteResponse(BaseModel):
    cliente: Cliente

class ClienteListResponse(BaseModel):
    clientes: List[Cliente]

class ClienteUpdate(BaseModel):
    id: int
    nome: str
    nomeSocial: str | None
    genero: str
    cpf: Cpf
    rgs: List[Rg]
    telefones: List[Telefone]