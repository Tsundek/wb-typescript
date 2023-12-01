import Produto from "../modelos/produto";
import Empresa from "../modelos/empresa";
import Servico from "../modelos/servico";

type Item = Produto | Servico

type props = {
    item: Item
    empresa: Empresa
    tipo: 'produto' | 'servico'
}

export const DadosItem = ({ item, empresa, tipo }: props) => {
    return (
        <div className="container">
            <h3 className="center">Dados do {tipo === 'produto' ? 'Produto' : 'Serviço'}</h3>
            <div className="divider" />
            <h5 className="truncate">Nome do {tipo === 'produto' ? 'Produto' : 'Serviço'}: {item.nome}</h5>
            <br />
            <h5>Valor do {tipo === 'produto' ? 'Produto' : 'Serviço'}: R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h5>
            <br />
            <h5>Total consumido: {empresa.totalConsumo(item)}</h5>
        </div>
    )
}