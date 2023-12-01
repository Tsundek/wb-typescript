import { useState } from "react"
import { BarraNavegacao } from "./barraNavegacao"
import { ConsumoComponent } from "./consumo"

import { DadosItem } from "./dadosItem"
import { DeleteItem } from "./deleteItem"
import { AtualizacaoItem } from "./atualizacaoItem"
import { CadastroItem } from "./cadastroItem"
import { ListagemServicos } from "./listagemServicos"
import { ListagemProdutos } from "./listagemProduto"
import { BotaoProduto } from "./btnProduto"
import { BotaoServico } from "./btnServico"

import { ListagemClientes } from "./listagemClientes"
import { CadastroCliente } from "./cadastroCliente"
import { DeleteCliente } from "./deleteCliente"
import { AtualizacaoCliente } from "./atualizacaoCliente"
import { DadosCliente } from "./dadosCliente"
import { BotaoCliente } from "./btnCliente"

import Cliente from "../modelos/cliente"
import CPF from "../modelos/cpf"
import Servico from "../modelos/servico"
import Produto from "../modelos/produto"
import RG from "../modelos/rg"
import Telefone from "../modelos/telefone"
import Empresa from "../modelos/empresa"


export const Roteador = () => {
    const createInitialObjects = () => {
        const empresa = new Empresa()

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

        return empresa
    }

    const [tela, setTela] = useState("Clientes")
    const [empresa, setEmpresa] = useState(createInitialObjects)
    const [selectedCliente, setSelectedCliente] = useState<Cliente | undefined>(undefined)
    const [selectedProduto, setSelectedProduto] = useState<Produto | undefined>(undefined)
    const [selectedServico, setSelectedServico] = useState<Servico | undefined>(undefined)

    const selecionarView = (novaTela: string, evento: React.MouseEvent) => {
        evento.preventDefault()
        setTela(novaTela)
        resetState()
    }
    const resetState = () => {
        setSelectedCliente(undefined)
        setSelectedProduto(undefined)
        setSelectedServico(undefined)
    }

    const atualizarEmpresa = (empresa: Empresa) => {
        setEmpresa(empresa)
    }
    const handleClienteSelect = (cliente: Cliente) => {
        setSelectedCliente(cliente)
        setTela("DadosCliente")
    }
    const handleProdutoSelect = (produto: Produto) => {
        setSelectedProduto(produto)
        setTela("DadosProduto")
    }
    const handleServicoSelect = (servico: Servico) => {
        setSelectedServico(servico)
        setTela("DadosServiço")
    }

    const tema = "purple lighten-4"
    const barraNavegacao = (<BarraNavegacao seletorView={selecionarView} tema={tema} botoes={['Clientes', 'Produtos', 'Serviços']} />)
    const botaoCliente = <BotaoCliente selecionarView={selecionarView} />
    const botaoProduto = <BotaoProduto selecionarView={selecionarView} />
    const botaoServico = <BotaoServico selecionarView={selecionarView} />

    if (tela === "Clientes") {
        return (
            <>
                {barraNavegacao}
                {botaoCliente}
                <ListagemClientes clientes={empresa.getClientes} onClienteSelect={handleClienteSelect} empresa={empresa} />
            </>
        )
    } else if (tela === 'DadosCliente' && selectedCliente) {
        return (
            <>
                {barraNavegacao}
                {botaoCliente}
                <DadosCliente cliente={selectedCliente} />
            </>
        )
    } else if (tela === 'DeleteCliente') {
        return (
            <>
                {barraNavegacao}
                {botaoCliente}
                <DeleteCliente onSubmit={(empresa) => atualizarEmpresa(empresa)} empresa={empresa} selecionarView={selecionarView} />
            </>
        )
    } else if (tela === 'CadastroCliente') {
        return (
            <>
                {barraNavegacao}
                {botaoCliente}
                <CadastroCliente tema={tema} onSubmit={(empresa: Empresa) => atualizarEmpresa(empresa)} empresa={empresa} />
            </>
        )
    } else if (tela === 'AtualizaCliente') {
        return (
            <>
                {botaoCliente}
                {barraNavegacao}
                <AtualizacaoCliente onSubmit={(empresa: Empresa) => atualizarEmpresa(empresa)} empresa={empresa} />
            </>
        )
    } else if (tela === 'Produtos') {
        return (
            <>
                {barraNavegacao}
                {botaoProduto}
                <ListagemProdutos produtos={empresa.getProdutos} onProdutoSelect={handleProdutoSelect} empresa={empresa} />
            </>
        )
    } else if (tela === 'DadosProduto' && selectedProduto) {
        return (
            <>
                {barraNavegacao}
                {botaoProduto}
                <DadosItem item={selectedProduto} empresa={empresa} tipo={'produto'} />
            </>
        )
    } else if (tela === 'CadastroProduto') {
        return (
            <>
                {barraNavegacao}
                {botaoProduto}
                <CadastroItem tema={tema} onSubmit={(empresa) => atualizarEmpresa(empresa)} empresa={empresa} tipo={"produto"} />
            </>
        )
    } else if (tela === 'DeleteProduto') {
        return (
            <>
                {barraNavegacao}
                {botaoProduto}
                <DeleteItem onSubmit={(empresa) => atualizarEmpresa(empresa)} empresa={empresa} items={empresa.getProdutos} tipo={"produto"} />
            </>
        )
    } else if (tela === 'AtualizacaoProduto') {
        return (
            <>
                {barraNavegacao}
                {botaoProduto}
                <AtualizacaoItem onSubmit={(empresa) => atualizarEmpresa(empresa)} empresa={empresa} items={empresa.getProdutos} tipo={"produto"} />
            </>
        )
    } else if (tela === 'Serviços') {
        return (
            <>
                {barraNavegacao}
                {botaoServico}
                <ListagemServicos servicos={empresa.getServicos} empresa={empresa} onServicoSelect={handleServicoSelect} />
            </>
        )
    } else if (tela === 'DadosServiço' && selectedServico) {
        return (
            <>
                {barraNavegacao}
                {botaoServico}
                <DadosItem item={selectedServico} tipo={"servico"} empresa={empresa} />
            </>
        )
    } else if (tela === 'CadastroServiço') {
        return (
            <>
                {barraNavegacao}
                {botaoServico}
                <CadastroItem tema={tema} onSubmit={(empresa) => atualizarEmpresa(empresa)} empresa={empresa} tipo={"servico"} />
            </>
        )
    } else if (tela === 'DeleteServiço') {
        return (
            <>
                {barraNavegacao}
                {botaoServico}
                <DeleteItem onSubmit={(empresa) => atualizarEmpresa(empresa)} empresa={empresa} items={empresa.getServicos} tipo={"servico"} />
            </>
        )
    } else if (tela === 'AtualizacaoServiço') {
        return (
            <>
                {barraNavegacao}
                {botaoServico}
                <AtualizacaoItem onSubmit={(empresa) => atualizarEmpresa(empresa)} empresa={empresa} items={empresa.getServicos} tipo={"servico"} />
            </>
        )
    } else if (tela === 'Consumo') {
        return (
            <>
                {barraNavegacao}
                {botaoCliente}
                <ConsumoComponent clientes={empresa.getClientes} produtos={empresa.getProdutos} empresa={empresa} servicos={empresa.getServicos} />
            </>
        )
    } else {
        return (
            <>
                {barraNavegacao}
                {botaoCliente}
                <ListagemClientes clientes={empresa.getClientes} onClienteSelect={handleClienteSelect} empresa={empresa} />
            </>
        )
    }


}   