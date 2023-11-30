import { Component } from "react"
import BarraNavegacao from "./barraNavegacao"
import Empresa from "../modelos/empresa"
import BotaoCliente from "./btnCliente"
import ListagemClientes from "./listagemClientes"
import CadastroCliente from "./cadastroCliente"
import DeleteCliente from "./deleteCliente"
import AtualizacaoCliente from "./atualizacaoCliente"
import CadastroProduto from "./cadastroProduto"
import BotaoProduto from "./btnProduto"
import ListagemProdutos from "./listagemProduto"
import AtualizacaoProduto from "./atualizacaoProduto"
import DeleteProduto from "./deleteProduto"
import ListagemServicos from "./listagemServicos"
import BotaoServico from "./btnServico"
import CadastroServico from "./cadastroServico"
import AtualizacaoServico from "./atualizacaoServico"
import DeleteServico from "./deleteServico"
import Cliente from "../modelos/cliente"
import ConsumoComponent from "./consumo"
import CPF from "../modelos/cpf"
import Servico from "../modelos/servico"
import Produto from "../modelos/produto"

type state = {
    tela: string,
    empresa: Empresa
    selectedCliente: Cliente | null
}

export default class Roteador extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        let empresa = new Empresa()
        empresa.addClientes(new Cliente('João', '', 'Masculino', new CPF('12345678900', new Date('10/09/2000'))))
        empresa.addClientes(new Cliente('Julio', 'Jul', 'Masculino', new CPF('12345678100', new Date('10/09/2000'))))
        empresa.addClientes(new Cliente('Matheus', '', 'Masculino', new CPF('12345678200', new Date('10/09/2000'))))
        empresa.addClientes(new Cliente('Caue', 'euaC', 'Masculino', new CPF('12345678300', new Date('10/09/2000'))))
        empresa.addClientes(new Cliente('Gerson', 'Paysanduuuuu', 'Masculino', new CPF('12345678400', new Date('10/09/2000'))))
        empresa.addClientes(new Cliente('Maria', 'Mah', 'Feminino', new CPF('98765432100', new Date('10/09/2000'))))
        empresa.addClientes(new Cliente('Julia', '', 'Feminino', new CPF('98765432200', new Date('10/09/2000'))))
        empresa.addClientes(new Cliente('Simone', '', 'Feminino', new CPF('98765432300', new Date('10/09/2000'))))
        empresa.addClientes(new Cliente('Emily', 'Emy', 'Feminino', new CPF('98765432400', new Date('10/09/2000'))))
        empresa.addClientes(new Cliente('Gorlock', 'The destroyer', 'Feminino', new CPF('98765432500', new Date('10/09/2000'))))

        empresa.addProdutos(new Produto('Shampoo', 20))
        empresa.addProdutos(new Produto('Creme de barbear', 50))
        empresa.addProdutos(new Produto('Condicionador', 20))
        empresa.addProdutos(new Produto('Maquina de cortar cabelo', 200))
        empresa.addProdutos(new Produto('Batom', 10))

        empresa.addServicos(new Servico('Corte de cabelo', 50))
        empresa.addServicos(new Servico('Massagem', 50))
        empresa.addServicos(new Servico('Depilação', 100))
        empresa.addServicos(new Servico('Coach', 5000))
        empresa.addServicos(new Servico('Botox', 160))

        this.state = {
            tela: 'Consumo',
            empresa: empresa,
            selectedCliente: null
        }
        this.selecionarView = this.selecionarView.bind(this)
        this.atualizarEmpresa = this.atualizarEmpresa.bind(this)
    }

    selecionarView(novaTela: string, evento: React.MouseEvent) {
        evento.preventDefault()
        console.log(novaTela)
        this.setState({
            tela: novaTela
        })
    }
    atualizarEmpresa(empresa: Empresa) {
        this.setState({ empresa })
    }
    handleClienteSelect = (cliente: Cliente) => {
        this.setState({ selectedCliente: cliente })
    }
    
    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="purple lighten-4" botoes={['Clientes', 'Produtos', 'Serviços']} />
        let botaoCliente = <BotaoCliente selecionarView={this.selecionarView} />
        let botaoProduto = <BotaoProduto selecionarView={this.selecionarView} />
        let botaoServico = <BotaoServico selecionarView={this.selecionarView} />
        const { empresa } = this.state

        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <ListagemClientes tema="purple lighten-4" clientes={empresa.getClientes} selecionarView={this.selecionarView} onClienteSelect={this.handleClienteSelect} />
                </>
            )
        } else if (this.state.tela === 'DeleteCliente') {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <DeleteCliente tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'CadastroCliente') {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <CadastroCliente tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'AtualizaCliente') {
            return (
                <>
                    {botaoCliente}
                    {barraNavegacao}
                    <AtualizacaoCliente tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'Produtos') {
            return (
                <>
                    {barraNavegacao}
                    {botaoProduto}
                    <ListagemProdutos tema="purple lighten-4" produtos={empresa.getProdutos} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'CadastroProduto') {
            return (
                <>
                    {barraNavegacao}
                    {botaoProduto}
                    <CadastroProduto tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'DeleteProduto') {
            return (
                <>
                    {barraNavegacao}
                    {botaoProduto}
                    <DeleteProduto tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'AtualizacaoProduto') {
            return (
                <>
                    {barraNavegacao}
                    {botaoProduto}
                    <AtualizacaoProduto tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'Serviços') {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <ListagemServicos tema="purple lighten-4" servicos={empresa.getServicos} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'CadastroServiço') {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <CadastroServico tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'DeleteServiço') {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <DeleteServico tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'AtualizacaoServiço') {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <AtualizacaoServico tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'Consumo') {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <ConsumoComponent tema="purple lighten-4" clientes={empresa.getClientes} produtos={empresa.getProdutos} empresa={empresa} servicos={empresa.getServicos}/>
                </>
            )
        } else {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <CadastroCliente tema="purple lighten-4" onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        }

    }
}   