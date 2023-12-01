/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Empresa from "../modelos/empresa";
import Cliente from "../modelos/cliente";

type state = {
    selectedCliente: Cliente | undefined
}

type props = {
    tema: string,
    empresa: Empresa
    onClienteSelect: (cliente: Cliente) => void
}

export default class ListaTopMaisConsumidosValor extends Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            selectedCliente: undefined
        }
    }
    componentDidMount(): void {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
    }
    handleClienteClick = (cliente: [Cliente, number]) => {
        this.setState({ 
            selectedCliente: cliente[0]
        })
        this.props.onClienteSelect(cliente[0])
    }
    render() {
        const { tema, empresa } = this.props
        let estilo = `collection-item active ${tema}`
        let topMaisConsumidosValor = empresa.topClientesPorValorConsumido()
        return (
            <>
                <h5 className="center-align">Top 5 Clientes Que Mais Consumiram Em Valor</h5>
                <li className="divider"/>
                <div className='truncate'>
                    {
                        topMaisConsumidosValor.map((cliente, index) => (
                            <a className={`collection-item avatar black-text ${cliente[0] === this.state.selectedCliente ? estilo : ''}`} key={index} onClick={() => this.handleClienteClick(cliente)}>
                                <i className="material-icons medium circle">shopping_cart</i>
                                <span className="title"># {index + 1}</span>
                                <p>
                                    {cliente[0].nome}
                                    <br />
                                    Valor total consumido: R${cliente[1].toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </a>
                        ))
                    }
                </div>
            </>
        )
    }
}