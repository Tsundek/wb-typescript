import { useEffect, useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { ClienteInterface } from '../interfaces/cliente'
import { atualizaCliente, getAllUsers } from '../servicos/clientes'

type props = {
    clientes: Array<ClienteInterface>
    setClientes: React.Dispatch<React.SetStateAction<ClienteInterface[]>>
}

function formatCPF(cpf: string) {
    return cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : ""
}

export const AtualizacaoCliente = ({ clientes, setClientes }: props) => {
    const [selectedCliente, setSelectedCliente] = useState<ClienteInterface | null>(null)
    const [isFormComplete, setIsFormComplete] = useState<boolean>(false)


    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
        M.FormSelect.init(document.querySelectorAll('select'))
        M.CharacterCounter.init(document.querySelectorAll('input'))
        M.Modal.init(document.querySelectorAll('.modal'), {
            onCloseEnd: () => {
                setSelectedCliente(null)
                setIsFormComplete(false)
            },
            onOpenStart: () => {
                M.updateTextFields()
                M.FormSelect.init(document.querySelectorAll('select'))
                M.CharacterCounter.init(document.querySelectorAll('input'))
            }
        })
    }, [])

    const checkFormCompleteness = (selectedCliente: ClienteInterface) => {
        if (selectedCliente) {
            const isCPFComplete =
                selectedCliente.cpf.valor.trim() !== '' &&
                selectedCliente.cpf.dataEmissao.trim() !== '' &&
                selectedCliente.cpf.valor.trim().length <= 11


            const areTelefonesComplete =
                !!selectedCliente.telefones &&
                selectedCliente.telefones.every(
                    (telefone) => telefone.ddd.trim().length >= 2 && telefone.ddd.trim() !== '' && telefone.numero.trim() !== '' && telefone.numero.trim().length <= 12
                )


            const areRgsComplete =
                !!selectedCliente.rgs &&
                selectedCliente.rgs.every(
                    (rg) => rg.valor.trim() !== '' && rg.dataEmissao.trim() !== '' && rg.valor.trim().length <= 9
                )

            const areFormFieldsComplete =
                selectedCliente.nome.trim() !== '' &&
                selectedCliente.genero.trim() !== '' &&
                areRgsComplete &&
                isCPFComplete &&
                areTelefonesComplete

            setIsFormComplete(areFormFieldsComplete)
        }
    }
    const handleListChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const id = event.target.id as 'RgValor' | 'RgDataEmissao' | 'ddd' | 'numero'
        const value = event.target.value

        if (selectedCliente) {
            let clienteAtualizado: ClienteInterface = {
                ...selectedCliente,
                cpf: { ...selectedCliente.cpf },
                rgs: [...selectedCliente.rgs],
                telefones: [...selectedCliente.telefones],

            }

            if (id === 'ddd' || id === 'numero') {
                const rgIndex = index
                if (index !== undefined && !isNaN(index) && index >= 0 && index < clienteAtualizado.telefones.length) {
                    clienteAtualizado.telefones[rgIndex] = {
                        ...clienteAtualizado.telefones[rgIndex],
                        [id]: value,
                    }
                }
            } else if (id === 'RgValor') {
                const chaveData = 'valor'
                clienteAtualizado.rgs[index] = {
                    ...clienteAtualizado.rgs[index],
                    [chaveData]: value,
                }

            } else if (id === 'RgDataEmissao') {
                const chaveData = 'dataEmissao'
                clienteAtualizado.rgs[index] = {
                    ...clienteAtualizado.rgs[index],
                    [chaveData]: value,
                }
            }
            setSelectedCliente(clienteAtualizado)
            checkFormCompleteness(clienteAtualizado)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index?: number) => {
        const id = event.target.id as 'nome' | 'nomeSocial' | 'cidade' | 'genero' | 'valor' | 'dataEmissao' | 'ddd' | 'numero' | 'nome' | 'email' | 'sobreNome'
        const value = event.target.value

        if (selectedCliente) {
            const clienteAtualizado: ClienteInterface = {
                ...selectedCliente,
                cpf: { ...selectedCliente.cpf },
                rgs: [...selectedCliente.rgs],
                telefones: [...selectedCliente.telefones],

            }
            if (id === 'valor' || id === 'dataEmissao') {
                clienteAtualizado.cpf = {
                    ...clienteAtualizado.cpf,
                    [id]: value
                }
            } else if (id === 'nome' || id === 'nomeSocial' || id === 'genero') {
                clienteAtualizado[id] = value
            }
            setSelectedCliente(clienteAtualizado)
            checkFormCompleteness(clienteAtualizado)
        }
    }

    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault()
        if (selectedCliente) {
            console.log(selectedCliente)
            const response = await atualizaCliente(selectedCliente)
            if (response) {
                const updatedClientes = await getAllUsers()
                if (updatedClientes)
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
                                    <th>Nome social</th>
                                    <th>CPF</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map((cliente, index) => (
                                    <tr key={index}>
                                        <td>{cliente.id}</td>
                                        <td className="truncate tooltipped" data-position="top" data-tooltip={cliente.nome} style={{ maxWidth: "150px", display: "table-cell" }}>{cliente.nome}</td>
                                        <td>{cliente.nomeSocial}</td>
                                        <td>{formatCPF(cliente.cpf.valor)}</td>
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
                                <input required id="nome" type="text" className="validate" value={selectedCliente?.nome || ''} onChange={handleChange} />
                                <label htmlFor="nome" className="active">Nome</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="nomeSocial" type="text" className="validate" value={selectedCliente?.nomeSocial || ''} onChange={handleChange} />
                                <label htmlFor="nomeSocial" className="active">Nome Social</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="input-field col s12">
                                <select id="genero" value={selectedCliente?.genero || ''} onChange={handleChange}>
                                    <option value="" disabled>Escolha o gênero</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="input-field col s6">
                                <input required id="valor" type="text" data-length="11" className="validate" value={selectedCliente?.cpf.valor || ''} onChange={handleChange} />
                                <label htmlFor="valor" className="active">CPF</label>
                            </div>
                            <div className="input-field col s6">
                                <label htmlFor="dataEmissao" className='active'>Data de emissão<span className="red-text"> *</span></label>
                                <input required type="date" id="dataEmissao" className="validate" value={selectedCliente?.cpf.dataEmissao || ''} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className='col s12'>
                                <div style={{ maxHeight: 230, overflowY: 'auto' }}>
                                    <h6>RGs</h6>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Valor</th>
                                                <th>Data de Emissão</th>
                                            </tr>
                                        </thead>
                                        {
                                            selectedCliente?.rgs.map((rg, index) => (
                                                <tbody key={index}>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td><input id='RgValor' data-length="9" className="validate" type='number' value={rg.valor} onChange={(event) => handleListChange(event, index)}></input></td>
                                                        <td><input id="RgDataEmissao" type="date" className="validate" value={rg.dataEmissao} onChange={(event) => handleListChange(event, index)} /></td>
                                                    </tr>
                                                </tbody>
                                            ))
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col s12'>
                                <div style={{ maxHeight: 230, overflowY: 'auto' }}>
                                    <h6>Telefones</h6>
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
                                                <tbody key={index}>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td><input id="ddd" className="validate" data-length="2" type='tel' value={telefone.ddd} onChange={(event) => handleListChange(event, index)}></input></td>
                                                        <td><input id="numero" type="tel" className="validate" data-length="12" value={telefone.numero} onChange={(event) => handleListChange(event, index)} /></td>
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
