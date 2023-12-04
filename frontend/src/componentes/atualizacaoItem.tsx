import React, { useEffect, useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { ProdutoInterface } from '../interfaces/produto'
import { ServicoInterface } from '../interfaces/servico'
import { atualizaProduto, atualizaServico, getAllProducts, getAllServices } from '../servicos/items'

type Item = ProdutoInterface | ServicoInterface

type props = {
    items: Item[]
    tipo: 'produto' | 'servico'
    setItems: React.Dispatch<React.SetStateAction<ProdutoInterface[] | ServicoInterface[]>>
}

export const AtualizacaoItem = ({ items, tipo, setItems }: props) => {
    const [itemSelecionado, setItemSelecionado] = useState<Item>(
        tipo === 'produto'
            ? { nome: '', valor: 0 }
            : { nome: '', valor: 0 }
    )

    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
        M.FormSelect.init(document.querySelectorAll('select'))
        M.CharacterCounter.init(document.querySelectorAll('input'))
        M.updateTextFields()
        M.Modal.init(document.querySelectorAll('.modal'), {
            onOpenStart: () => {
                M.updateTextFields()
                M.FormSelect.init(document.querySelectorAll('select'))
                M.CharacterCounter.init(document.querySelectorAll('input'))
            }
        })
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id as 'nome' | 'valor'
        const value = event.target.value

        setItemSelecionado((prevItem) => ({
            ...prevItem,
            [id]: id === 'valor' ? parseFloat(value) : value,
        }))
    }

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault()
        if (tipo === 'produto') {
            await atualizaProduto(itemSelecionado)
            const produtos = await getAllProducts()
            if (produtos)
                setItems(produtos)
        } else {
            await atualizaServico(itemSelecionado)
            const servicos = await getAllServices()
            if (servicos)
                setItems(servicos)
        }
        setItemSelecionado(
            tipo === 'produto'
                ? { nome: '', valor: 0}
                : { nome: '', valor: 0})
    }

    return (
        <><div className="row container">
            <div className='row'>
                <div className='col s12'>
                    <h4>{`Atualizar ${tipo === 'produto' ? 'Produtos' : 'Serviços'}`}</h4>
                    <div style={{ maxHeight: 1080, overflowY: 'auto' }}>
                        <table className='highlight col s12'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td className="truncate tooltipped" data-position="top" data-tooltip={item.nome} style={{ maxWidth: "150px", display: "table-cell" }}>{item.nome}</td>
                                        <td>R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                        <td><a href='#modal1' className="modal-trigger btn-floating yellow darken-3 btn-small" onClick={() => setItemSelecionado(item)}><i className="material-icons">edit</i></a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id="modal1" className="modal">
                <form onSubmit={handleUpdate}>
                    <div className="modal-content">
                        <h5>{`Atualizar ${tipo === 'produto' ? 'Produto' : 'Serviço'}`}</h5>
                        <div className="row">
                            <div className="input-field col s6">
                                <input placeholder="A" id="nome" type="text" className="validate" value={itemSelecionado.nome} onChange={handleChange} />
                                <label htmlFor="nome">Nome do {tipo === 'produto' ? 'Produto' : 'Serviço'}</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="valor" type="number" className="validate" data-length="7" value={itemSelecionado.valor} onChange={handleChange} />
                                <label htmlFor="nomeSocial">Valor</label>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button className="modal-close waves-effect waves-red btn-flat">Cancelar</button>
                        <button className="modal-close waves-effect waves-green btn-flat" type='submit'>Concluir</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

