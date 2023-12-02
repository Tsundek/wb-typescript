import { useEffect, useState } from "react"
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

import Servico from "../modelos/servico"
import Produto from "../modelos/produto"
import Empresa from "../modelos/empresa"
import { fetchClientesData } from "../servicos/clientes"
import { ClienteInterface } from "../interfaces/cliente"


export const Roteador = () => {
    const [clientes, setClientes] = useState(Array<ClienteInterface>())
    const [tela, setTela] = useState("Clientes")
    const [selectedCliente, setSelectedCliente] = useState<ClienteInterface | undefined>(undefined)
    const [selectedProduto, setSelectedProduto] = useState<Produto | undefined>(undefined)
    const [selectedServico, setSelectedServico] = useState<Servico | undefined>(undefined)

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchClientesData()
            setClientes(data)
        }
        fetchData()
    }, [])

    const [empresa, setEmpresa] = useState(new Empresa())

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
    const handleClienteSelect = (cliente: ClienteInterface) => {
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
    const barraNavegacao = (<BarraNavegacao seletorView={selecionarView} tema={tema} botoes={['Clientes']} />)
    const botaoCliente = <BotaoCliente selecionarView={selecionarView} />
    const botaoProduto = <BotaoProduto selecionarView={selecionarView} />
    const botaoServico = <BotaoServico selecionarView={selecionarView} />

    if (tela === "Clientes") {
        return (
            <>
                {barraNavegacao}
                {botaoCliente}
                <ListagemClientes clientes={clientes} onClienteSelect={handleClienteSelect} empresa={empresa} />
            </>
        )
    } else if (tela === 'DadosCliente' && selectedCliente?.id) {
        return (
            <>
                {barraNavegacao}
                {botaoCliente}
                <DadosCliente clienteID={selectedCliente.id} />
            </>
        )
    } else if (tela === 'DeleteCliente') {
        return (
            <>
                {barraNavegacao}
                {botaoCliente}
                <DeleteCliente clientes={clientes} setClientes={setClientes} />
            </>
        )
    } else if (tela === 'CadastroCliente') {
        return (
            <>
                {barraNavegacao}
                {botaoCliente}
                <CadastroCliente tema={tema} clientes={clientes} setClientes={setClientes}/>
            </>
        )
    } else if (tela === 'AtualizaCliente') {
        return (
            <>
                {botaoCliente}
                {barraNavegacao}
                <AtualizacaoCliente clientes={clientes} setClientes={setClientes} />
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
                <ListagemClientes clientes={clientes} onClienteSelect={handleClienteSelect} empresa={empresa} />
            </>
        )
    }


}   