/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Cliente from "../modelos/cliente";

type props = {
    tema: string,
    clientes: Array<Cliente>
    onClienteSelect: (cliente: Cliente) => void
    selectedCliente: Cliente | undefined
}
function formatCPF(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default class ListaClientes extends Component<props> {
    componentDidMount(): void {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
    }
    render() {
        let estilo = `collection-item active ${this.props.tema}`
        return (
            <>
                <div className='truncate'>
                    {
                        this.props.clientes.map((cliente, index) => (
                            <a className={`collection-item avatar black-text ${cliente === this.props.selectedCliente ? estilo : ''}`} key={index} onClick={() => this.props.onClienteSelect(cliente)}>
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