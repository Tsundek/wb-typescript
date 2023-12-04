import { ProdutoInterface } from "../interfaces/produto"
import { ServicoInterface } from "../interfaces/servico"


type Item = ProdutoInterface | ServicoInterface

type props = {
    item: Item
    tipo: 'produto' | 'servico'
}

export const DadosItem = ({ item, tipo }: props) => {
    return (
        <div className="container">
            <h3 className="center">Dados do {tipo === 'produto' ? 'Produto' : 'Serviço'}</h3>
            <div className="divider" />
            <h5 className="truncate">Nome do {tipo === 'produto' ? 'Produto' : 'Serviço'}: {item.nome}</h5>
            <br />
            <h5>Valor do {tipo === 'produto' ? 'Produto' : 'Serviço'}: R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h5>
        </div>
    )
}