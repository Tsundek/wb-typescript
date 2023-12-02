import { useEffect, useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { ClienteInterface } from '../interfaces/cliente'
import { atualizaCliente, fetchClientesData } from '../servicos/clientes'

type props = {
    clientes: Array<ClienteInterface>
    setClientes: React.Dispatch<React.SetStateAction<ClienteInterface[]>>
}

export const AtualizacaoCliente = ({ clientes, setClientes }: props) => {
    const [selectedCliente, setSelectedCliente] = useState<ClienteInterface | null>(null)
    const [isFormComplete, setIsFormComplete] = useState<boolean>(false)


    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
        M.FormSelect.init(document.querySelectorAll('select'))
        M.CharacterCounter.init(document.querySelectorAll('input'))
        M.updateTextFields()
        M.Modal.init(document.querySelectorAll('.modal'), {
            onCloseEnd: () => {
                setSelectedCliente(null)
                setIsFormComplete(false)
            }
        })
    }, [])

    const checkFormCompleteness = (selectedCliente: ClienteInterface) => {
        if (selectedCliente) {
            const isEnderecoComplete =
                selectedCliente.endereco.rua.trim() !== '' &&
                selectedCliente.endereco.numero.trim() !== '' &&
                selectedCliente.endereco.bairro.trim() !== '' &&
                selectedCliente.endereco.cidade.trim() !== '' &&
                selectedCliente.endereco.estado.trim() !== '' &&
                selectedCliente.endereco.codigoPostal.trim() !== '' &&
                selectedCliente.endereco.informacoesAdicionais.trim() !== ''

            const areTelefonesComplete =
                !!selectedCliente.telefones &&
                selectedCliente.telefones.every(
                    (telefone) => telefone.ddd.trim() !== '' && telefone.numero.trim() !== ''
                )

            const isEmailValid = /^[^\s@]+@[^@\s]+$/.test(selectedCliente.email.trim())

            const areFormFieldsComplete =
                selectedCliente.nome.trim() !== '' &&
                selectedCliente.sobreNome.trim() !== '' &&
                isEmailValid &&
                isEnderecoComplete &&
                areTelefonesComplete

            setIsFormComplete(areFormFieldsComplete)
        }
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index?: number) => {
        const id = event.target.id as 'ddd' | 'estado' | 'cidade' | 'bairro' | 'rua' | 'numero' | 'codigoPostal' | 'informacoesAdicionais' | 'nome' | 'email' | 'sobreNome'
        const value = event.target.value
        const title = event.target.title as 'endereco' | 'telefone'

        if (selectedCliente) {
            const clienteAtualizado: ClienteInterface = {
                ...selectedCliente,
                telefones: [...selectedCliente.telefones]
            }

            if (id === 'ddd' || (id === 'numero' && title === 'telefone')) {
                if (index !== undefined && !isNaN(index) && index >= 0 && index < clienteAtualizado.telefones.length) {
                    clienteAtualizado.telefones[index] = {
                        ...clienteAtualizado.telefones[index],
                        [id]: value,
                    }
                }
            } else if (id === 'estado' || id === 'cidade' || id === 'bairro' || id === 'rua' || (id === 'numero' && title === 'endereco') || id === 'codigoPostal' || id === 'informacoesAdicionais') {
                clienteAtualizado.endereco = {
                    ...clienteAtualizado.endereco,
                    [id]: value
                }
            } else if (id === 'nome' || id === 'sobreNome' || id === 'email') {
                clienteAtualizado[id] = value
            }
            setSelectedCliente(clienteAtualizado)
            checkFormCompleteness(clienteAtualizado)
        }
    }

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault()
        if (selectedCliente) {
            const response = await atualizaCliente(selectedCliente)
            if (response) {
                const updatedClientes = await fetchClientesData()
                setClientes(updatedClientes)
                setSelectedCliente(null)
                setIsFormComplete(false)
            }
        }
    }


    return (
        <><div className="row container">
            <div className='row'>
                <div className='col s12'>
                    <h4>Atualizar Clientes</h4>
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
                                        <td>{ }</td>
                                        <td><a href="#modal1" className="modal-trigger btn-floating yellow darken-3 btn-small" onClick={() => setSelectedCliente(cliente)}><i className="material-icons">edit</i></a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div id="modal1" className="modal modal-fixed-footer">
                <form onSubmit={handleUpdate}>
                    <div className="modal-content">
                        <h4>Atualizar Cliente</h4>
                        <div className="row">
                            <div className="input-field col s6">
                                <input required id="nome" type="text" className="validate" value={selectedCliente?.nome} onChange={handleChange} />
                                <label htmlFor="nome" className="active">Nome</label>
                            </div>
                            <div className="input-field col s6">
                                <input required id="sobreNome" type="text" className="validate" value={selectedCliente?.sobreNome} onChange={handleChange} />
                                <label htmlFor="sobreNome" className="active">Sobrenome</label>
                            </div>
                            <div className="input-field col s12">
                                <input required id="email" type="email" className="validate" value={selectedCliente?.email} onChange={handleChange} />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <h5>Endereço</h5>
                            <div className='row'>
                                <div className="input-field col s6">
                                    <input required id="rua" type="text" className="validate" value={selectedCliente?.endereco.rua} onChange={handleChange} />
                                    <label htmlFor="rua">Rua</label>
                                </div>
                                <div className="input-field col s6">
                                    <input required title='endereco' id="numero" type="text" className="validate" value={selectedCliente?.endereco.numero} onChange={handleChange} />
                                    <label htmlFor="numero">Nº</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="input-field col s6">
                                    <input required id="bairro" type="text" className="validate" value={selectedCliente?.endereco.bairro} onChange={handleChange} />
                                    <label htmlFor="bairro">Bairro</label>
                                </div>
                                <div className="input-field col s6">
                                    <input required id="cidade" type="text" className="validate" value={selectedCliente?.endereco.cidade} onChange={handleChange} />
                                    <label htmlFor="cidade">Cidade</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="input-field col s6">
                                    <input required id="estado" type="text" className="validate" value={selectedCliente?.endereco.estado} onChange={handleChange} />
                                    <label htmlFor="estado">Estado</label>
                                </div>
                                <div className="input-field col s6">
                                    <input required id="codigoPostal" type="text" className="validate" value={selectedCliente?.endereco.codigoPostal} onChange={handleChange} />
                                    <label htmlFor="codigoPostal">Código Postal</label>
                                </div>
                            </div>
                            <div className='row'>

                                <div className="input-field col s12">
                                    <input required id="informacoesAdicionais" type="text" className="validate" value={selectedCliente?.endereco.informacoesAdicionais} onChange={handleChange} />
                                    <label htmlFor="informacoesAdicionais">Informações adicionais</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col s12'>
                                <div style={{ maxHeight: 230, overflowY: 'auto' }}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>DDD</th>
                                                <th>Número</th>
                                            </tr>
                                        </thead>
                                        {
                                            selectedCliente?.telefones.map((telefone, index) => (
                                                <tbody>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td><input id='ddd' className="validate" data-length="2" type='tel' value={telefone.ddd} onChange={(event) => handleChange(event, index)}></input></td>
                                                        <td><input title='telefone' id="numero" type="tel" className="validate" value={telefone.numero} onChange={(event) => handleChange(event, index)} /></td>
                                                    </tr>
                                                </tbody>
                                            ))
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button className="modal-close waves-effect waves-red btn-flat" onClick={() => setSelectedCliente(null)}>Cancelar</button>
                        <button className="modal-close waves-effect waves-green btn-flat" type='submit' disabled={!isFormComplete}>Concluir</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
