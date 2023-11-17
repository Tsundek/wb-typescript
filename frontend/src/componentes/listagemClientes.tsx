/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Cliente from "../modelos/cliente";
import BotaoCliente from "./btnCliente";

type state = {
    selectedCliente: Cliente | null
}

type props = {
    tema: string,
    clientes: Array<Cliente>
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
    BotaoCliente: typeof BotaoCliente
}
function formatCPF(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default class ListagemClientes extends Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            selectedCliente: null
        }
    }
    componentDidMount() {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'))
    }
    render() {
        const BotaoCliente = this.props.BotaoCliente
        console.log(this.props.clientes)
        let estilo = `collection-item active ${this.props.tema}`
        return (
            <div className="row container">
                <BotaoCliente selecionarView={this.props.selecionarView}/>
                <div className="col s12">
                    <ul className="collection with-header">
                        <li className="collection-header">
                            <div className="row valign-wrapper">
                                <h4>Lista de Clientes</h4>
                            </div>
                        </li>
                        <ul className="tabs">
                            <li className="tab col s3"><a href="#test1">Test 1</a></li>
                            <li className="tab col s3"><a className="active" href="#test2">Test 2</a></li>
                            <li className="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>
                            <li className="tab col s3"><a href="#test4">Test 4</a></li>
                        </ul>
                        {this.props.clientes.map((cliente, index) => (
                            <a href="#!" className={`collection-item avatar black-text ${cliente === this.state.selectedCliente ? estilo : ''}`} key={index} onClick={() => this.setState({ selectedCliente: cliente })}>
                                <i className="material-icons medium circle">account_circle</i>
                                <span className="title">{cliente.nomeSocial ? `Nome Social: ${cliente.nomeSocial}` : `Nome: ${cliente.nome}`}</span>
                                <p>
                                    Gênero: {cliente.genero}
                                    <br />
                                    CPF: {formatCPF(cliente.cpf.getValor)}
                                </p>
                            </a>

                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}