import React, { useEffect, useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { ProdutoInterface } from '../interfaces/produto'
import { ServicoInterface } from '../interfaces/servico'
import { cadastroProduto, cadastroServico, getAllProducts, getAllServices } from '../servicos/items'

type Item = ProdutoInterface | ServicoInterface

type props = {
    tema: string,
    tipo: 'produto' | 'servico'
    setItems: React.Dispatch<React.SetStateAction<ProdutoInterface[] | ServicoInterface[]>>
}

export const CadastroItem = ({ tema, tipo, setItems }: props) => {
    const [item, setItem] = useState<Item>()

    useEffect(() => {
        M.FormSelect.init(document.querySelectorAll('select'))
        M.CharacterCounter.init(document.querySelectorAll('input'))
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id as 'nome' | 'valor'
        const value = event.target.value

        setItem((prevItem) => {
            const updatedItem: Item = !prevItem
                ? { [id]: id === 'valor' ? parseFloat(value) : value } as unknown as Item
                : {
                    ...prevItem,
                    [id]: id === 'valor' ? parseFloat(value) : value,
                } as Item

            return updatedItem
        })
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        let body = {
            nome: item?.nome,
            valor: item?.valor,
            quantidade: 0,
            cliente_id: null
        }
        if (tipo === 'produto') {
            const response = await cadastroProduto(body)
            if (response) {
                const produtos = await getAllProducts()
                if (produtos)
                    setItems(produtos)
            }
        } else {
            const response = await cadastroServico(body)
            if (response) {
                const servicos = await getAllServices()
                if (servicos)
                    setItems(servicos)
            }
        }
        setItem(undefined)
    }
    let estiloBotao = `btn waves-effect waves-light ${tema}`
    return (
        <div className="container">
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                    <h4>{`Cadastro de ${tipo === 'produto' ? 'Produtos' : 'Serviços'}`}</h4>
                    <div className="row">
                        <div className="input-field col s6">
                            <input required id="nome" type="text" className="validate" value={item?.nome} onChange={handleChange} />
                            <label htmlFor="nome">{`Nome do ${tipo === 'produto' ? 'produto' : 'serviço'}`}<span className="red-text"> *</span></label>
                        </div>
                        <div className="input-field col s6">
                            <input id="valor" type="number" className="validate" data-length="7" value={item?.valor} onChange={handleChange} />
                            <label htmlFor="valor">{`Valor do ${tipo === 'produto' ? 'produto' : 'serviço'}`}<span className="red-text"> *</span></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button className={estiloBotao} type="submit" name="action" disabled={false}>Submit
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

