/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Cliente from "../modelos/cliente";

type state = {
    selectedCliente: Cliente | null
}

type props = {
    tema: string,
    clientes: Array<Cliente>
}
function formatCPF(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default class ListaMenosProdutosConsumidos extends Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            selectedCliente: null
        }
    }
    componentDidMount(): void {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
    }
    render() {
        let estilo = `collection-item active ${this.props.tema}`
        let clientesMasculinos = this.props.clientes.filter(cliente => cliente.genero === 'Masculino')
        let clientesFemininos = this.props.clientes.filter(cliente => cliente.genero === 'Feminino')
        return (
            <>
                <h5 className="center-align">Clientes Masculinos</h5>
                <div className='truncate' style={{ maxHeight: 275, overflowY: "auto" }}>
                    {
                        clientesMasculinos.map((cliente, index) => (
                            <a className={`collection-item avatar black-text ${cliente === this.state.selectedCliente ? estilo : ''}`} key={index} onClick={() => this.setState({ selectedCliente: cliente })}>
                                <i className="material-icons medium circle">account_circle</i>
                                <span className="title tooltipped" data-position="top" data-tooltip={cliente.nomeSocial ? cliente.nomeSocial : cliente.nome}>{cliente.nomeSocial ? `Nome Social: ${cliente.nomeSocial}` : `Nome: ${cliente.nome}`}</span>
                                <p>
                                    Gênero: {cliente.genero}
                                    <br />
                                    CPF: {formatCPF(cliente.cpf.getValor)}
                                </p>
                            </a>
                        ))
                    }
                </div>
                <h5 className="center-align" style={{ display: 'flex'}}>Clientes Femininos</h5>
                <div className='truncate' style={{ maxHeight: 275, overflowY: "auto" }}>
                    {
                        clientesFemininos.map((cliente, index) => (
                            <a className={`collection-item avatar black-text ${cliente === this.state.selectedCliente ? estilo : ''}`} key={index} onClick={() => this.setState({ selectedCliente: cliente })}>
                                <i className="material-icons medium circle">account_circle</i>
                                <span className="title tooltipped" data-position="top" data-tooltip={cliente.nomeSocial ? cliente.nomeSocial : cliente.nome}>{cliente.nomeSocial ? `Nome Social: ${cliente.nomeSocial}` : `Nome: ${cliente.nome}`}</span>
                                <p>
                                    Gênero: {cliente.genero}
                                    <br />
                                    CPF: {formatCPF(cliente.cpf.getValor)}
                                </p>
                            </a>
                        ))
                    }
                </div>
            </>
        )
    }
}