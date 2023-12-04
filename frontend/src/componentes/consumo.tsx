import { useEffect, useState } from 'react'
import { ListaClientes } from './listaClientes'
import { ListaItems } from './listaItems'
import { ProdutoInterface } from '../interfaces/produto'
import { ServicoInterface } from '../interfaces/servico'
import { ClienteInterface } from '../interfaces/cliente'
import { consumirProduto, consumirServico } from '../servicos/items'

type props = {
    clientes: Array<ClienteInterface>
    produtos: Array<ProdutoInterface>
    servicos: Array<ServicoInterface>
}

export const ConsumoComponent = ({ clientes, produtos, servicos }: props) => {
    const [selectedCliente, setSelectedCliente] = useState<ClienteInterface | undefined>(undefined)
    const [selectedProduto, setSelectedProduto] = useState<ProdutoInterface | undefined>(undefined)
    const [selectedServico, setSelectedServico] = useState<ServicoInterface | undefined>(undefined)

    useEffect(() => {
        M.Modal.init(document.querySelectorAll('.modal'), {
            onCloseStart: () => {
                setSelectedCliente(undefined)
                setSelectedProduto(undefined)
                setSelectedServico(undefined)
            }
        })
    }, [])

    const handleClienteSelect = (cliente: ClienteInterface) => {
        setSelectedCliente(cliente)
        const elems = document.querySelectorAll('.modal')
        const instances = M.Modal.init(elems)
        instances[0].open()
    }
    const handleProdutoSelect = (produto: ProdutoInterface) => {
        setSelectedProduto(produto)
        console.log(produto)
    }
    const handleServicoSelect = (servico: ServicoInterface) => {
        setSelectedServico(servico)
    }
    const resetState = () => {
        setSelectedCliente(undefined)
        setSelectedProduto(undefined)
        setSelectedServico(undefined)
    }
    const handleConsumo = async () => {
        if (selectedCliente && (selectedProduto || selectedServico)) {
            if(selectedCliente.id && selectedProduto?.id){
                await consumirProduto(selectedCliente.id, selectedProduto.id)
            }
            if(selectedCliente.id && selectedServico?.id){
                await consumirServico(selectedCliente.id, selectedServico.id)
            }
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
                    <ListaClientes clientes={clientes} onClienteSelect={handleClienteSelect} />
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

