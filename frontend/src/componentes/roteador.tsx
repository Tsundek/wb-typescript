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

import { ClienteInterface } from "../interfaces/cliente"
import { getAllUsers } from "../servicos/clientes"
import { ProdutoInterface } from "../interfaces/produto"
import { ServicoInterface } from "../interfaces/servico"
import { getAllProducts, getAllServices } from "../servicos/items"


export const Roteador = () => {
    const [clientes, setClientes] = useState(Array<ClienteInterface>())
    const [produtos, setProdutos] = useState(Array<ProdutoInterface>())
    const [servicos, setServicos] = useState(Array<ServicoInterface>())
    const [tela, setTela] = useState("Clientes")
    const [selectedCliente, setSelectedCliente] = useState<ClienteInterface | undefined>(undefined)
    const [selectedProduto, setSelectedProduto] = useState<ProdutoInterface | undefined>(undefined)
    const [selectedServico, setSelectedServico] = useState<ServicoInterface | undefined>(undefined)

    useEffect(() => {
        const fetchData = async () => {
            const clientes = await getAllUsers()
            const produtos = await getAllProducts()
            const servicos = await getAllServices()
            if (produtos) {
                setProdutos(produtos)
            }
            if (clientes) {
                setClientes(clientes)
            }
            if (servicos) {
                setServicos(servicos)
            }
        }
        fetchData()
    }, [])

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

    const handleClienteSelect = (cliente: ClienteInterface) => {
        setSelectedCliente(cliente)
        setTela("DadosCliente")
    }
    const handleProdutoSelect = (produto: ProdutoInterface) => {
        setSelectedProduto(produto)
        setTela("DadosProduto")
    }
    const handleServicoSelect = (servico: ServicoInterface) => {
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
                <ListagemClientes clientes={clientes} onClienteSelect={handleClienteSelect} />
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
                <CadastroCliente tema={tema} clientes={clientes} setClientes={setClientes} />
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
                <ListagemProdutos produtos={produtos} onProdutoSelect={handleProdutoSelect} />
            </>
        )
    } else if (tela === 'DadosProduto' && selectedProduto) {
        return (
            <>
                {barraNavegacao}
                {botaoProduto}
                <DadosItem item={selectedProduto} tipo={'produto'} />
            </>
        )
    } else if (tela === 'CadastroProduto') {
        return (
            <>
                {barraNavegacao}
                {botaoProduto}
                <CadastroItem tema={tema} tipo={"produto"} setItems={setProdutos} />
            </>
        )
    } else if (tela === 'DeleteProduto') {
        return (
            <>
                {barraNavegacao}
                {botaoProduto}
                <DeleteItem items={produtos} tipo={"produto"} setItems={setProdutos} />
            </>
        )
    } else if (tela === 'AtualizacaoProduto') {
        return (
            <>
                {barraNavegacao}
                {botaoProduto}
                <AtualizacaoItem items={produtos} tipo={"produto"} setItems={setProdutos} />
            </>
        )
    } else if (tela === 'Serviços') {
        return (
            <>
                {barraNavegacao}
                {botaoServico}
                <ListagemServicos servicos={servicos} onServicoSelect={handleServicoSelect} />
            </>
        )
    } else if (tela === 'DadosServiço' && selectedServico) {
        return (
            <>
                {barraNavegacao}
                {botaoServico}
                <DadosItem item={selectedServico} tipo={"servico"} />
            </>
        )
    } else if (tela === 'CadastroServiço') {
        return (
            <>
                {barraNavegacao}
                {botaoServico}
                <CadastroItem tema={tema} tipo={"servico"} setItems={setServicos} />
            </>
        )
    } else if (tela === 'DeleteServiço') {
        return (
            <>
                {barraNavegacao}
                {botaoServico}
                <DeleteItem items={servicos} tipo={"servico"} setItems={setServicos} />
            </>
        )
    } else if (tela === 'AtualizacaoServiço') {
        return (
            <>
                {barraNavegacao}
                {botaoServico}
                <AtualizacaoItem items={servicos} tipo={"servico"} setItems={setServicos} />
            </>
        )
    } else if (tela === 'Consumo') {
        return (
            <>
                {barraNavegacao}
                {botaoCliente}
                <ConsumoComponent clientes={clientes} produtos={produtos} servicos={servicos} />
            </>
        )
    } else {
        return (
            <>
                {barraNavegacao}
                {botaoCliente}
                <ListagemClientes clientes={clientes} onClienteSelect={handleClienteSelect} />
            </>
        )
    }


}   