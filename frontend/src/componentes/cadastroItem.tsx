import React, { useEffect, useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import Empresa from '../modelos/empresa'
import Produto from '../modelos/produto'
import Servico from '../modelos/servico'

type Item = Produto | Servico

type props = {
    tema: string,
    onSubmit: (empresa: Empresa) => void
    empresa: Empresa
    tipo: 'produto' | 'servico'
}

export const CadastroItem = ({ tema, onSubmit, empresa, tipo }: props) => {
    const [item, setItem] = useState<Item>(tipo === 'produto' ? new Produto('', 0) : new Servico('', 0))

    useEffect(() => {
        M.FormSelect.init(document.querySelectorAll('select'));
        M.CharacterCounter.init(document.querySelectorAll('input'));
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id as 'nome' | 'valor'
        const value = event.target.value
        setItem((prevItem) => ({
            ...prevItem,
            [id]: id === 'valor' ? parseFloat(value) : value
        }))
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        event.preventDefault();
        if (tipo === 'produto') {
            empresa.addProdutos(item as Produto);
        } else {
            empresa.addServicos(item as Servico);
        }
        onSubmit(empresa)
        setItem(tipo === 'produto' ? new Produto('', 0) : new Servico('', 0))
        M.toast({ html: `${tipo === 'produto' ? 'Produto' : 'Serviço'} cadastrado com sucesso!`, classes: 'rounded green' });
    }
    let estiloBotao = `btn waves-effect waves-light ${tema}`
    return (
        <div className="container">
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                    <h4>{`Cadastro de ${tipo === 'produto' ? 'Produtos' : 'Serviços'}`}</h4>
                    <div className="row">
                        <div className="input-field col s6">
                            <input required id="nome" type="text" className="validate" value={item.nome || ''} onChange={handleChange} />
                            <label htmlFor="nome">{`Nome do ${tipo === 'produto' ? 'produto' : 'serviço'}`}<span className="red-text"> *</span></label>
                        </div>
                        <div className="input-field col s6">
                            <input id="valor" type="number" className="validate" value={item.valor || ''} onChange={handleChange} />
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

