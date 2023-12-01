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
import DadosCliente from "./dadosCliente"
import RG from "../modelos/rg"
import Telefone from "../modelos/telefone"
import DadosItem from "./dadosItem"

type state = {
    tela: string,
    empresa: Empresa
    selectedCliente: Cliente | undefined
    selectedProduto: Produto | undefined
    selectedServico: Servico | undefined
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
        empresa.addProdutos(new Produto('Pomada', 37))
        empresa.addProdutos(new Produto('Kit de Barba', 249))
        empresa.addProdutos(new Produto('Óleo para cabelo', 20))
        empresa.addProdutos(new Produto('Perfume', 90))
        empresa.addProdutos(new Produto('Felicidade', 1))


        empresa.addServicos(new Servico('Corte de cabelo', 50))
        empresa.addServicos(new Servico('Massagem', 50))
        empresa.addServicos(new Servico('Depilação', 100))
        empresa.addServicos(new Servico('Coach', 5000))
        empresa.addServicos(new Servico('Botox', 160))
        empresa.addServicos(new Servico('Faxina na cara', 200))
        empresa.addServicos(new Servico('Pintura de cabelo', 80))
        empresa.addServicos(new Servico('Piercing', 90))
        empresa.addServicos(new Servico('Relaxamento', 40))
        empresa.addServicos(new Servico('Progressiva', 70))

        const rg = new RG("11111111111", new Date('12/09/2000'))
        const telefone = new Telefone("12", "9888888888")
        let produtos = empresa.getProdutos
        let servicos = empresa.getServicos
        let clientes = empresa.getClientes

        for (let i = 0; i < clientes.length; i++) {
            let cliente = clientes[i]
            for (let j = 0; j < produtos.length - i; j++) {
                cliente.consumirProduto(produtos[j])
            }
            for (let k = 0; k < servicos.length - i; k++) {
                cliente.consumirServico(servicos[k])
            }
            cliente.rgs.push(rg)
            cliente.telefones.push(telefone)
        }

        this.state = {
            tela: 'Clientes',
            empresa: empresa,
            selectedCliente: undefined,
            selectedProduto: undefined,
            selectedServico: undefined
        }
        this.selecionarView = this.selecionarView.bind(this)
        this.atualizarEmpresa = this.atualizarEmpresa.bind(this)
    }

    selecionarView(novaTela: string, evento: React.MouseEvent) {
        evento.preventDefault()
        this.setState({
            tela: novaTela
        })
        this.resetState()
    }
    resetState = () => {
        this.setState({
            selectedCliente: undefined,
            selectedProduto: undefined,
            selectedServico: undefined
        })
    }
    atualizarEmpresa(empresa: Empresa) {
        this.setState({ empresa })
    }
    handleClienteSelect = (cliente: Cliente) => {
        this.setState({
            selectedCliente: cliente,
            tela: 'DadosCliente'
        })
    }
    handleProdutoSelect = (produto: Produto) => {
        this.setState({
            selectedProduto: produto,
            tela: 'DadosProduto'
        })
    }
    handleServicoSelect = (servico: Servico) => {
        this.setState({
            selectedServico: servico,
            tela: 'DadosServiço'
        })
    }

    render() {
        const tema = "purple lighten-4"
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema={tema} botoes={['Clientes', 'Produtos', 'Serviços']} />
        let botaoCliente = <BotaoCliente selecionarView={this.selecionarView} />
        let botaoProduto = <BotaoProduto selecionarView={this.selecionarView} />
        let botaoServico = <BotaoServico selecionarView={this.selecionarView} />
        const { empresa, selectedCliente, selectedProduto, selectedServico } = this.state

        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <ListagemClientes tema={tema} clientes={empresa.getClientes} onClienteSelect={this.handleClienteSelect} empresa={empresa} selectedCliente={selectedCliente} />
                </>
            )
        } else if (this.state.tela === 'DadosCliente' && selectedCliente) {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <DadosCliente cliente={selectedCliente} />
                </>
            )
        } else if (this.state.tela === 'DeleteCliente') {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <DeleteCliente tema={tema} onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'CadastroCliente') {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <CadastroCliente tema={tema} onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'AtualizaCliente') {
            return (
                <>
                    {botaoCliente}
                    {barraNavegacao}
                    <AtualizacaoCliente tema={tema} onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'Produtos') {
            return (
                <>
                    {barraNavegacao}
                    {botaoProduto}
                    <ListagemProdutos tema={tema} produtos={empresa.getProdutos} empresa={empresa} selecionarView={this.selecionarView} onProdutoSelect={this.handleProdutoSelect} selectedProduto={selectedProduto} />
                </>
            )
        } else if (this.state.tela === 'DadosProduto' && selectedProduto) {
            return (
                <>
                    {barraNavegacao}
                    {botaoProduto}
                    <DadosItem item={selectedProduto} empresa={empresa} tipo={'produto'} />
                </>
            )
        } else if (this.state.tela === 'CadastroProduto') {
            return (
                <>
                    {barraNavegacao}
                    {botaoProduto}
                    <CadastroProduto tema={tema} onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'DeleteProduto') {
            return (
                <>
                    {barraNavegacao}
                    {botaoProduto}
                    <DeleteProduto tema={tema} onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'AtualizacaoProduto') {
            return (
                <>
                    {barraNavegacao}
                    {botaoProduto}
                    <AtualizacaoProduto tema={tema} onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'Serviços') {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <ListagemServicos tema={tema} servicos={empresa.getServicos} empresa={empresa} selecionarView={this.selecionarView} onServicoSelect={this.handleServicoSelect} selectedServico={selectedServico} />
                </>
            )
        } else if (this.state.tela === 'DadosServiço' && selectedServico) {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <DadosItem item={selectedServico} tipo={"servico"} empresa={empresa} />
                </>
            )
        } else if (this.state.tela === 'CadastroServiço') {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <CadastroServico tema={tema} onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'DeleteServiço') {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <DeleteServico tema={tema} onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'AtualizacaoServiço') {
            return (
                <>
                    {barraNavegacao}
                    {botaoServico}
                    <AtualizacaoServico tema={tema} onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        } else if (this.state.tela === 'Consumo') {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <ConsumoComponent tema={tema} clientes={empresa.getClientes} produtos={empresa.getProdutos} empresa={empresa} servicos={empresa.getServicos} />
                </>
            )
        } else {
            return (
                <>
                    {barraNavegacao}
                    {botaoCliente}
                    <CadastroCliente tema={tema} onSubmit={(empresa) => this.atualizarEmpresa(empresa)} empresa={empresa} selecionarView={this.selecionarView} />
                </>
            )
        }

    }
}   