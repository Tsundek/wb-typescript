import React, { useEffect, useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { deleteClienteData } from '../servicos/clientes'
import { ClienteInterface } from '../interfaces/cliente'

type props = {
    clientes: Array<ClienteInterface>
    setClientes: React.Dispatch<React.SetStateAction<ClienteInterface[]>>
}

export const DeleteCliente = ({ clientes, setClientes }: props) => {
    const [selectedCliente, setSelectedCliente] = useState<ClienteInterface | null>(null)

    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 });
        M.updateTextFields();
        M.Modal.init(document.querySelectorAll('.modal'));
    }, [])

    const handleConfirm = async () => {
        if (selectedCliente) {
            try {
                deleteClienteData(selectedCliente)
                setClientes((prevClientes) =>
                    prevClientes.filter((cliente) => cliente.id !== selectedCliente.id)
                )
            } catch (error) {
                M.toast({ html: 'Erro inesperado ao deletar cliente', classes: 'rounded red' });
            }
        }
        setSelectedCliente(null)
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
                                    <th>Sobrenome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map((cliente, index) => (
                                    <tr key={index}>
                                        <td>{cliente.id}</td>
                                        <td className="truncate tooltipped" data-position="top" data-tooltip={cliente.nome} style={{ maxWidth: "150px", display: "table-cell" }}>{cliente.nome}</td>
                                        <td>{cliente.sobreNome}</td>
                                        <td><a href='#modal1' className="modal-trigger btn-floating red btn-small" onClick={() => setSelectedCliente(cliente)}><i className="material-icons">delete</i></a></td>
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
                    <p className="truncate tooltipped" data-position="top" data-tooltip={selectedCliente?.nome} style={{ display: "block" }}>
                        Você tem certeza de que deseja deletar o cliente número {selectedCliente?.id} - {selectedCliente?.nome}?
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
