import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import Empresa from "../modelos/empresa";
import BotaoCliente from "./btnCliente";
import ListagemClientes from "./listagemClientes";
import CadastroCliente from "./cadastroCliente";
import DeleteCliente from "./deleteCliente";
import AtualizacaoCliente from "./atualizacaoCliente";
import CadastroProduto from "./cadastroProduto";
import BotaoProduto from "./btnProduto";
import ListagemProdutos from "./listagemProduto";
import AtualizacaoProduto from "./atualizacaoProduto";
import DeleteProduto from "./deleteProduto";
import ListagemServicos from "./listagemServicos";
import BotaoServico from "./btnServico";
import CadastroServico from "./cadastroServico";
import AtualizacaoServico from "./atualizacaoServico";
import DeleteServico from "./deleteServico";

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
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="purple lighten-4" botoes={['Clientes', 'Produtos', 'Serviços']} />
        let botaoCliente = <BotaoCliente selecionarView={this.selecionarView} />
        let botaoProduto = <BotaoProduto selecionarView={this.selecionarView} />
        let botaoServico = <BotaoServico selecionarView={this.selecionarView} />

        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <ListagemClientes tema="purple lighten-4" clientes={this.state.empresa.getClientes} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'DeleteCliente') {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <DeleteCliente tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'CadastroCliente') {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <CadastroCliente tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'AtualizaCliente') {
            return (
                <>
                    {botaoCliente}
                    {barraNavegacao}
                    <AtualizacaoCliente tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'Produtos') {
            return (
                <>
                    {barraNavegacao}
                    {botaoProduto}
                    <ListagemProdutos tema="purple lighten-4" produtos={this.state.empresa.getProdutos} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'CadastroProduto') {
            return (
                <>
                    {barraNavegacao}
                    {botaoProduto}
                    <CadastroProduto tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'DeleteProduto') {
            return (
                <>
                    {barraNavegacao}
                    {botaoProduto}
                    <DeleteProduto tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'AtualizacaoProduto') {
            return (
                <>
                    {barraNavegacao}
                    {botaoProduto}
                    <AtualizacaoProduto tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'Serviços') {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <ListagemServicos tema="purple lighten-4" servicos={this.state.empresa.getServicos} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'CadastroServiço') {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <CadastroServico tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'DeleteServiço') {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <DeleteServico tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'AtualizacaoServiço') {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <AtualizacaoServico tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <CadastroCliente tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={this.state.empresa} selecionarView={this.selecionarView} />
                </>
            )
        }

    }
}