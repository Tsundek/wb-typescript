import { useState } from 'react'
import { ListaClientes } from './listaClientes'
import Cliente from '../modelos/cliente'
import Produto from '../modelos/produto'
import Servico from '../modelos/servico'

import Empresa from '../modelos/empresa'
import { ListaItems } from './listaItems'

type props = {
    clientes: Array<Cliente>
    produtos: Array<Produto>
    servicos: Array<Servico>
    empresa: Empresa
}

export const ConsumoComponent = ({ clientes, produtos, servicos, empresa }: props) => {
    const [selectedCliente, setSelectedCliente] = useState<Cliente | undefined>(undefined)
    const [selectedProduto, setSelectedProduto] = useState<Produto | undefined>(undefined)
    const [selectedServico, setSelectedServico] = useState<Servico | undefined>(undefined)

    const handleClienteSelect = (cliente: Cliente) => {
        setSelectedCliente(cliente)
        const elems = document.querySelectorAll('.modal')
        const instances = M.Modal.init(elems)
        instances[0].open()
    }
    const handleProdutoSelect = (produto: Produto) => {
        setSelectedProduto(produto)
    }
    const handleServicoSelect = (servico: Servico) => {
        setSelectedServico(servico)
    }
    const resetState = () => {
        setSelectedCliente(undefined)
        setSelectedProduto(undefined)
        setSelectedServico(undefined)
    }
    const handleConsumo = () => {
        if (selectedCliente && (selectedProduto || selectedServico)) {
            empresa.registrarConsumo(selectedCliente, selectedProduto, selectedServico)
            M.toast({ html: 'O consumo foi realizado com sucesso!', classes: 'rounded green' })
            resetState()
        } else {
            M.toast({ html: 'Por favor, selecione um cliente e um produto/serviço.', classes: 'rounded red' })
            resetState()
        }
    }

    return (
        <div className="row container">
            <h3 className='center-align'>Consumir produtos ou serviços</h3>
            <ul className="collection with-header" style={{ overflow: "hidden" }}>
                <li className="collection-header">
                    <div className="row valign-wrapper">
                        <h4>Lista de Clientes</h4>
                    </div>
                </li>
                <div style={{ maxHeight: 1080, overflowY: "auto" }}>
                    {/* <ListaClientes clientes={clientes} onClienteSelect={handleClienteSelect} /> */}
                </div>
            </ul>
            <div id="choiceModal" className="modal">
                <div className="modal-content">
                    <h4>Escolha uma opção</h4>
                    <p>Deseja selecionar um produto ou um serviço?</p>
                </div>
                <div className="modal-footer">
                    <a href="#modal1" className="modal-close waves-effect waves-green btn-flat modal-trigger">Produto</a>
                    <a href="#modal2" className="modal-close waves-effect waves-teal btn-flat modal-trigger">Serviço</a>
                    <button onClick={resetState} className="modal-close waves-effect waves-red btn-flat">Fechar</button>
                </div>
            </div>
            <div id="modal1" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h4 className='center-align'>Escolha um produto</h4>
                    <ul className="collection with-header">
                        <ListaItems items={produtos} onItemSelect={handleProdutoSelect} />
                    </ul>
                </div>
                <div className="modal-footer">
                    <button onClick={handleConsumo} className='left modal-close waves-effect waves-light btn'>Consumir</button>
                    <a href="#choiceModal" className="modal-close waves-effect waves-light btn-flat modal-trigger">Voltar</a>
                    <button onClick={resetState} className="modal-close waves-effect waves-red btn-flat">Fechar</button>
                </div>
            </div>
            <div id="modal2" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h4 className='center-align'>Escolha um serviço</h4>
                    <ul className="collection with-header">
                        <div className="tabs-content">
                            <ListaItems items={servicos} onItemSelect={handleServicoSelect} />
                        </div>
                    </ul>
                </div>
                <div className="modal-footer">
                    <button onClick={handleConsumo} className='left modal-close waves-effect waves-light btn'>Consumir</button>
                    <a href="#choiceModal" className="modal-close waves-effect waves-light btn-flat modal-trigger">Voltar</a>
                    <button onClick={resetState} className="modal-close waves-effect waves-red btn-flat">Fechar</button>
                </div>
            </div>
        </div>
    )
}
