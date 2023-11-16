import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaCliente";
import ClienteForm from "./clienteForm";
import Empresa from "../modelos/empresa";
import BotaoCliente from "./btnCliente";

type state = {
    tela: string,
    empresa: Empresa
}

export default class Roteador extends Component<{}, state> {

    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes',
            empresa: new Empresa()
        }
        this.selecionarView = this.selecionarView.bind(this)
        this.atualizarEmpresa = this.atualizarEmpresa.bind(this)
    }

    selecionarView(novaTela: string, evento: React.MouseEvent) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }
    atualizarEmpresa(empresa: Empresa) {
        this.setState({ empresa })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="purple lighten-4" botoes={['Clientes', 'Serviços', 'Produtos', 'Cadastro']} />
        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente tema="purple lighten-4" clientes={this.state.empresa.getClientes} selecionarView={this.selecionarView} BotaoCliente={BotaoCliente}/>
                </>
            )
        } else if (this.state.tela === 'Serviços') {

        } else if (this.state.tela === 'Produtos') {

        }
        else if (this.state.tela === 'Cadastro') {
            return (
                <>
                    {barraNavegacao}
                    <ClienteForm tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} BotaoCliente={BotaoCliente}/>
                </>
            )
        } else {
            return (
                <>
                    {barraNavegacao}
                    <ClienteForm tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} BotaoCliente={BotaoCliente}/>
                </>
            )
        }

    }
}