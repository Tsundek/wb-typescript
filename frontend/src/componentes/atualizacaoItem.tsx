import React, { useEffect, useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import Empresa from '../modelos/empresa'
import Produto from '../modelos/produto'
import Servico from '../modelos/servico'

type Item = Produto | Servico

type props = {
    onSubmit: (empresa: Empresa) => void
    empresa: Empresa
    items: Item[]
    tipo: 'produto' | 'servico'
}

export const AtualizacaoItem = ({ onSubmit, items, empresa, tipo }: props) => {
    const [indice, setIndice] = useState<number>(-1)
    const [itemSelecionado, setItemSelecionado] = useState<Item>(tipo === 'produto' ? new Produto('', 0) : new Servico('', 0))

    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
        M.FormSelect.init(document.querySelectorAll('select'))
        M.CharacterCounter.init(document.querySelectorAll('input'))
        M.updateTextFields()
        M.Modal.init(document.querySelectorAll('.modal'))
    }, [])

    const handleCatchIndex = (index: number) => {
        const item = items[index]
        setIndice(index)
        setItemSelecionado(item)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id as 'nome' | 'valor'
        const value = event.target.value

        setItemSelecionado((prevItem) => ({
            ...prevItem,
            [id]: id === 'valor' ? parseFloat(value) : value,
        }))
    }

    const handleUpdate = (event: React.FormEvent) => {
        event.preventDefault()
        if (indice !== -1) {
            if (tipo === 'produto') {
                empresa.atualizarProdutos(indice, itemSelecionado as Produto);
            } else {
                empresa.atualizarServicos(indice, itemSelecionado as Servico);
            }
            onSubmit(empresa)
            setIndice(-1)
            setItemSelecionado(tipo === 'produto' ? new Produto('', 0) : new Servico('', 0))
            M.toast({ html: 'Item atualizado com sucesso!', classes: 'rounded green' })
        } else {
            M.toast({ html: 'Escolha um item para editar!', classes: 'rounded red' })
        }
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
                                        <td>{index}</td>
                                        <td className="truncate tooltipped" data-position="top" data-tooltip={item.nome} style={{ maxWidth: "150px", display: "table-cell" }}>{item.nome}</td>
                                        <td>R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                        <td><a href='#modal1' className="modal-trigger btn-floating yellow darken-3 btn-small" onClick={() => handleCatchIndex(index)}><i className="material-icons">edit</i></a></td>
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
                                <input id="valor" type="number" className="validate" value={itemSelecionado.valor} onChange={handleChange} />
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

