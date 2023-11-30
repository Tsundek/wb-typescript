/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Servico from "../modelos/servico";

type state = {
    selectedServico: Servico | null
}

type props = {
    tema: string,
    servicos: Array<Servico>
    onServicoSelect: (servico: Servico) => void
}

export default class ListaServicos extends Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            selectedServico: null
        }
    }
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
                            <a className={`collection-item avatar black-text ${servico === this.state.selectedServico ? estilo : ''}`} key={index} onClick={() => this.handleServicoClick(servico)}>
                                <i className="material-icons medium circle">account_circle</i>
                                <span className="title tooltipped" data-position="top" data-tooltip={servico.nome}>Nome do servico: {servico.nome}</span>
                                <p>
                                    Valor: {servico.valor}
                                </p>
                            </a>
                        ))
                    }
                </div>
            </>
        )
    }
}