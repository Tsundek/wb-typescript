/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Servico from "../modelos/servico";

type props = {
    tema: string,
    servicos: Array<Servico>
    onServicoSelect: (servico: Servico) => void
    selectedServico: Servico | undefined
}

export default class ListaServicos extends Component<props> {
    componentDidMount(): void {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
    }
    handleServicoClick = (servico: Servico) => {
        this.setState({ selectedServico: servico })
        this.props.onServicoSelect(servico)
    }
    render() {
        let estilo = `collection-item active ${this.props.tema}`
        return (
            <>
                <div className='truncate'>
                    {
                        this.props.servicos.map((servico, index) => (
                            <a className={`collection-item avatar black-text ${servico === this.props.selectedServico ? estilo : ''}`} key={index} onClick={() => this.handleServicoClick(servico)}>
                                <i className="material-icons medium circle">account_circle</i>
                                <span className="title tooltipped" data-position="top" data-tooltip={servico.nome}>Nome do servico: {servico.nome}</span>
                                <p>
                                    Valor: R${servico.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </a>
                        ))
                    }
                </div>
            </>
        )
    }
}