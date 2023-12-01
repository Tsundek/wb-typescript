import { useEffect, useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import Empresa from '../modelos/empresa'

type props = {
    onSubmit: (empresa: Empresa) => void
    empresa: Empresa
    items: { nome: string; valor: number }[]
    tipo: 'produto' | 'servico'
}

export const DeleteItem = ({ onSubmit, empresa, tipo, items }: props) => {
    const [indice, setIndice] = useState<number>(-1)

    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 });
        M.updateTextFields();
        M.Modal.init(document.querySelectorAll('.modal'));
    }, [])

    const handleConfirm = () => {
        if (indice !== -1) {
            if (tipo === 'produto') {
                empresa.deletarProdutos(indice)
            } else {
                empresa.deletarServicos(indice)
            }
            onSubmit(empresa)
        }
        setIndice(-1)
        M.toast({ html: `${tipo === 'produto' ? 'Produto' : 'Serviço'} deletado com sucesso!`, classes: 'rounded green' })
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
                                        <td>{index}</td>
                                        <td className="truncate tooltipped" data-position="top" data-tooltip={item.nome} style={{ maxWidth: "150px", display: "table-cell" }}>{item.nome}</td>
                                        <td>R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                        <td><a href="#modal1" className="modal-trigger btn-floating red btn-small" onClick={() => setIndice(index)}><i className="material-icons">delete</i></a></td>
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
                    <p className="truncate tooltipped" data-position="top" data-tooltip={indice >= 0 && items[indice] && items[indice].nome} style={{ display: "block" }}>
                        {`Você tem certeza de que deseja deletar o ${tipo === 'produto' ? 'produto' : 'serviço'} ${indice} - ${indice >= 0 && items[indice] && items[indice].nome}?`}
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

