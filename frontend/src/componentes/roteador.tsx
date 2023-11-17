import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import Empresa from "../modelos/empresa";
import BotaoCliente from "./btnCliente";
import ListagemClientes from "./listagemClientes";
import CadastroCliente from "./cadastroCliente";
import DeleteCliente from "./deleteCliente";
import AtualizacaoCliente from "./atualizacaoCliente";

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
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="purple lighten-4" botoes={['Clientes', 'Serviços', 'Produtos']} />
        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListagemClientes tema="purple lighten-4" clientes={this.state.empresa.getClientes} selecionarView={this.selecionarView} BotaoCliente={BotaoCliente} />
                </>
            )
        } else if (this.state.tela === 'DeleteCliente') {
            return (
                <>
                    {barraNavegacao}
                    <DeleteCliente tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} BotaoCliente={BotaoCliente} />
                </>
            )
        } else if (this.state.tela === 'CadastroCliente') {
            return (
                <>
                    {barraNavegacao}
                    <CadastroCliente tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} BotaoCliente={BotaoCliente} />
                </>
            )
        } else if (this.state.tela === 'AtualizaCliente') {
            return (
                <>
                    {barraNavegacao}
                    <AtualizacaoCliente tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} BotaoCliente={BotaoCliente} />
                </>
            )
        } else if (this.state.tela === 'Produtos') {

        }
        else {
            return (
                <>
                    {barraNavegacao}
                    <CadastroCliente tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} BotaoCliente={BotaoCliente} />
                </>
            )
        }

    }
}