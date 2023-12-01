import { Component } from "react"
import Produto from "../modelos/produto";
import Empresa from "../modelos/empresa";
import Servico from "../modelos/servico";

type Item = Produto | Servico

type props = {
    item: Item
    empresa: Empresa
    tipo: 'produto' | 'servico'
}

export default class DadosItem extends Component<props> {
    componentDidMount() {
        M.Chips.init(document.querySelectorAll('.chips'))
    }
    render() {
        const { item, empresa, tipo } = this.props
        return (
            <div className="container">
                <h3 className="center">Dados do {tipo === 'produto' ? 'Produto' : 'Serviço'}</h3>
                <div className="divider" />
                <h5 className="truncate">Nome do produto: {item.nome}</h5>
                <br />
                <h5>Valor do produto: R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h5>
                <br/>
                <h5>Total consumido: {empresa.totalConsumo(item)}</h5>
            </div>
        )
    }

}