import { Component } from 'react'
import ListaClientes from './listaClientes'
import Cliente from '../modelos/cliente'
import Produto from '../modelos/produto'
import Servico from '../modelos/servico'
import ListaProdutos from './listaProdutos'
import ListaServicos from './listaServicos'
import Empresa from '../modelos/empresa'

type state = {
    selectedCliente: Cliente | undefined,
    selectedProduto: Produto | undefined,
    selectedServico: Servico | undefined
}

type props = {
    tema: string,
    clientes: Array<Cliente>
    produtos: Array<Produto>
    servicos: Array<Servico>
    empresa: Empresa
}

export default class ConsumoComponent extends Component<props, state>{
    constructor(props: props) {
        super(props)
        this.state = {
            selectedCliente: undefined,
            selectedProduto: undefined,
            selectedServico: undefined
        }
    }

    handleClienteSelect = (cliente: Cliente) => {
        this.setState({ selectedCliente: cliente })
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
        instances[0].open();
    }

    handleProdutoSelect = (produto: Produto) => {
        this.setState({ selectedProduto: produto })
    }

    handleServicoSelect = (servico: Servico) => {
        this.setState({ selectedServico: servico })
    }

    resetState = () => {
        this.setState({
            selectedCliente: undefined,
            selectedProduto: undefined,
            selectedServico: undefined
        })
    }

    handleConsumo = () => {
        const { selectedCliente, selectedProduto, selectedServico } = this.state
        const { empresa } = this.props
        if (selectedCliente && (selectedProduto || selectedServico)) {
            empresa.registrarConsumo(selectedCliente, selectedProduto, selectedServico)
            alert('O consumo foi realizado com sucesso!')
            this.setState({
                selectedCliente: undefined,
                selectedProduto: undefined,
                selectedServico: undefined
            })
        } else {
            alert("Por favor, selecione um cliente e um produto/serviço.")
            this.setState({
                selectedCliente: undefined
            })
        }
    }

    render() {
        const { clientes, produtos, servicos, tema } = this.props
        return (
            <div className="row container">
                <ul className="collection with-header" style={{ overflow: "hidden" }}>
                    <li className="collection-header">
                        <div className="row valign-wrapper">
                            <h4>Lista de Clientes</h4>
                        </div>
                    </li>
                    <ListaClientes clientes={clientes} onClienteSelect={this.handleClienteSelect} tema={tema} />
                </ul>
                <div id="choiceModal" className="modal">
                    <div className="modal-content">
                        <h4>Escolha uma opção</h4>
                        <p>Deseja selecionar um produto ou um serviço?</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#modal1" className="modal-close waves-effect waves-green btn-flat modal-trigger">Produto</a>
                        <a href="#modal2" className="modal-close waves-effect waves-green btn-flat modal-trigger">Serviço</a>
                        <button className="modal-close waves-effect waves-red btn-flat">Fechar</button>
                    </div>
                </div>
                <div id="modal1" className="modal modal-fixed-footer">
                    <div className='center-align'>
                        <h4 className='push-s5'>Escolha um produto</h4>
                    </div>
                    <div className="modal-content">
                        <ul className="collection with-header">
                            <ListaProdutos produtos={produtos} onProdutoSelect={this.handleProdutoSelect} tema={tema} />
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.handleConsumo} className='left modal-close waves-effect waves-red btn-flat'>Consumir</button>
                        <a href="#choiceModal" className="modal-close waves-effect waves-green btn-flat modal-trigger">Voltar</a>
                        <button onClick={this.resetState} className="modal-close waves-effect waves-red btn-flat">Fechar</button>
                    </div>
                </div>
                <div id="modal2" className="modal modal-fixed-footer">
                    <div className='center-align'>
                        <h4 className='push-s5'>Escolha um serviço</h4>
                    </div>
                    <div className="modal-content">
                        <ul className="collection with-header">
                            <div className="tabs-content">
                                <ListaServicos servicos={servicos} onServicoSelect={this.handleServicoSelect} tema={tema} />
                            </div>
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.handleConsumo} className='left modal-close waves-effect waves-red btn-flat'>Consumir</button>
                        <a href="#choiceModal" className="modal-close waves-effect waves-green btn-flat modal-trigger">Voltar</a>
                        <button onClick={this.resetState} className="modal-close waves-effect waves-red btn-flat">Fechar</button>
                    </div>
                </div>
            </div>
        )
    }
}