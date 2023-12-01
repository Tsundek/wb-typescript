import React, { useEffect, useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import Empresa from '../modelos/empresa'

type props = {
    onSubmit: (empresa: Empresa) => void
    empresa: Empresa
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
}

export const DeleteCliente = ({ onSubmit, empresa, selecionarView }: props) => {
    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 });
        M.updateTextFields();
        M.Modal.init(document.querySelectorAll('.modal'));
    }, [])

    const [indice, setIndice] = useState<number>(-1);

    const handleCatchIndex = (index: number) => {
        setIndice(index)
    }
    const handleConfirm = () => {
        if (indice !== -1) {
            empresa.deletarClientes(indice)
            onSubmit(empresa)
        }
        setIndice(-1)
        M.toast({ html: 'Cliente deletado com sucesso!', classes: 'rounded' })
    }

    return (
        <><div className="row container">
            <div className='row'>
                <div className='col s12'>
                    <h4>Deletar Clientes</h4>
                    <div style={{ maxHeight: 1080, overflowY: 'auto' }}>
                        <table className='highlight col s12'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Gênero</th>
                                    <th>CPF</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empresa.getClientes.map((cliente, index) => (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td className="truncate tooltipped" data-position="top" data-tooltip={cliente.nome} style={{ maxWidth: "150px", display: "table-cell" }}>{cliente.nomeSocial ? `${cliente.nomeSocial}` : `${cliente.nome}`}</td>
                                        <td>{cliente.genero}</td>
                                        <td>{cliente.cpf.getValor}</td>
                                        <td><a href='#modal1' className="modal-trigger btn-floating red btn-small" onClick={() => handleCatchIndex(index)}><i className="material-icons">delete</i></a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Confirmação</h4>
                    <p className="truncate tooltipped" data-position="top" data-tooltip={indice >= 0 && empresa.getClientes[indice] && (empresa.getClientes[indice].nomeSocial || empresa.getClientes[indice].nome)} style={{ display: "block" }}>
                        Você tem certeza de que deseja deletar o cliente número {indice} - {indice >= 0 && empresa.getClientes[indice] && (empresa.getClientes[indice].nomeSocial || empresa.getClientes[indice].nome)}?
                    </p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={handleConfirm}>Sim</a>
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Não</a>
                </div>
            </div>
        </div>
        </>
    )
}
