import { useEffect, useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { ProdutoInterface } from '../interfaces/produto'
import { ServicoInterface } from '../interfaces/servico'
import { deleteProductData, deleteServiceData, getAllProducts, getAllServices } from '../servicos/items'


type props = {
    items: { id?: number; nome: string; valor: number }[]
    tipo: 'produto' | 'servico'
    setItems: React.Dispatch<React.SetStateAction<ProdutoInterface[] | ServicoInterface[]>>
}

export const DeleteItem = ({ tipo, items, setItems }: props) => {
    const [selectedItem, setSelectedItem] = useState<ProdutoInterface | ServicoInterface>()

    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 });
        M.updateTextFields();
        M.Modal.init(document.querySelectorAll('.modal'))
    }, [])

    const handleConfirm = async () => {
        if (selectedItem?.id) {
            if (tipo === 'produto') {
                await deleteProductData(selectedItem.id)
                const produtos = await getAllProducts()
                if (produtos)
                    setItems(produtos)
            } else {
                await deleteServiceData(selectedItem.id)
                const servicos = await getAllServices()
                if (servicos)
                    setItems(servicos)
            }

        }
        setSelectedItem(undefined)
    }

    return (
        <><div className="row container">
            <div className='row'>
                <div className='col s12'>
                    <h4>{`Deletar ${tipo === 'produto' ? 'Produtos' : 'Serviços'}`}</h4>
                    <div style={{ maxHeight: 1080, overflowY: 'auto' }}>
                        <table className='highlight col s12'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            {items.map((item, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td className="truncate tooltipped" data-position="top" data-tooltip={item.nome} style={{ maxWidth: "150px", display: "table-cell" }}>{item.nome}</td>
                                        <td>R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                        <td><a href="#modal1" className="modal-trigger btn-floating red btn-small" onClick={() => setSelectedItem(item)}><i className="material-icons">delete</i></a></td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Confirmação</h4>
                    <p className="truncate tooltipped" data-position="top" data-tooltip={selectedItem?.nome} style={{ display: "block" }}>
                        {`Você tem certeza de que deseja deletar o ${tipo === 'produto' ? 'produto' : 'serviço'} ${selectedItem?.id} - ${selectedItem?.nome}?`}
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat" onClick={handleConfirm}>Sim</button>
                    <button className="modal-close waves-effect waves-green btn-flat">Não</button>
                </div>
            </div>
        </div>
        </>
    )
}

