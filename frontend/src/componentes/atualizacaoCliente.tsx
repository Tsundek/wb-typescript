import React, { useEffect, useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import Empresa from '../modelos/empresa'
import Cliente from '../modelos/cliente'
import CPF from '../modelos/cpf'
import RG from '../modelos/rg'
import Telefone from '../modelos/telefone'

type props = {
    onSubmit: (empresa: Empresa) => void
    empresa: Empresa
}

export const AtualizacaoCliente = ({ empresa, onSubmit }: props) => {
    const [indice, setIndice] = useState<number>(-1)
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente>(new Cliente('', '', '', new CPF('', new Date())))

    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
        M.FormSelect.init(document.querySelectorAll('select'))
        M.CharacterCounter.init(document.querySelectorAll('input'))
        M.updateTextFields()
        M.Modal.init(document.querySelectorAll('.modal'))
    }, [])

    const handleCatchIndex = (index: number) => {
        const cliente = empresa.getClientes[index]
        setIndice(index)
        setClienteSelecionado(cliente)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index?: number) => {
        const id = event.target.id as 'nome' | 'nomeSocial' | 'genero' | 'cpf' | 'cpfDataEmissao' | 'rg' | 'rgDataEmissao' | 'ddd' | 'telefone'
        const value = event.target.value
        const clienteAtualizado = new Cliente(
            clienteSelecionado.nome,
            clienteSelecionado.nomeSocial,
            clienteSelecionado.genero,
            clienteSelecionado.cpf,
        )
        clienteAtualizado.rgs = clienteSelecionado.rgs.slice()
        clienteAtualizado.telefones = clienteSelecionado.telefones.slice()


        if (id === 'cpf') {
            clienteAtualizado.cpf = new CPF(value, clienteAtualizado.cpf.getDataEmissao)
        } else if (id === 'cpfDataEmissao') {
            clienteAtualizado.cpf = new CPF(clienteAtualizado.cpf.getValor, new Date(value))
        } else if (id === 'rg') {
            if (index !== undefined && !isNaN(index) && index >= 0 && index < clienteAtualizado.rgs.length) {
                clienteAtualizado.rgs[index] = new RG(value, clienteAtualizado.rgs[index].getDataEmissao)
            }
        } else if (id === 'rgDataEmissao') {
            if (index !== undefined && !isNaN(index) && index >= 0 && index < clienteAtualizado.rgs.length) {
                clienteAtualizado.rgs[index] = new RG(clienteAtualizado.rgs[index].getValor, new Date(value))
            }
        } else if (id === 'ddd') {
            if (index !== undefined && !isNaN(index) && index >= 0 && index < clienteAtualizado.telefones.length) {
                clienteAtualizado.telefones[index] = new Telefone(value, clienteAtualizado.telefones[index].getNumero)
            }
        } else if (id === 'telefone') {
            if (index !== undefined && !isNaN(index) && index >= 0 && index < clienteAtualizado.telefones.length) {
                clienteAtualizado.telefones[index] = new Telefone(clienteAtualizado.telefones[index].getDdd, value)
            }
        } else {
            clienteAtualizado[id] = value
        }
        setClienteSelecionado(clienteAtualizado)
    }

    const handleUpdate = (event: React.FormEvent) => {
        event.preventDefault()
        empresa.atualizarClientes(indice, clienteSelecionado)
        onSubmit(empresa)
        setIndice(-1)
        setClienteSelecionado(new Cliente('', '', '', new CPF('', new Date())))
        M.toast({ html: 'Cliente atualizado com sucesso!', classes: 'rounded green' })
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
                                        <td><a href="#modal1" className="modal-trigger btn-floating yellow darken-3 btn-small" onClick={() => handleCatchIndex(index)}><i className="material-icons">edit</i></a></td>
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
                        <h5>Atualizar Cliente</h5>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="nome" type="text" className="validate" value={clienteSelecionado.nome} onChange={handleChange} />
                                <label htmlFor="nome" className="active">Nome Completo</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="nomeSocial" type="text" className="validate" value={clienteSelecionado.nomeSocial} onChange={handleChange} />
                                <label htmlFor="nomeSocial" className="active">Nome Social</label>
                            </div>
                            <div className="input-field col s12">
                                <select id="genero" value={clienteSelecionado.genero} onChange={handleChange}>
                                    <option value="" disabled>Escolha o gênero</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                                <label htmlFor="genero">Gênero</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="cpf" type="number" className="validate" data-length="11" value={clienteSelecionado.cpf ? clienteSelecionado.cpf.getValor : ''} onChange={handleChange} />
                                <label htmlFor="cpf" className="active">CPF</label>
                                <span className="helper-text" data-error="Incorreto" data-success="Correto"></span>
                            </div>
                            <div className="input-field col s6">
                                <input id="cpfDataEmissao" type="date" className="validate" value={clienteSelecionado.cpf && clienteSelecionado.cpf.getDataEmissao ? clienteSelecionado.cpf.getDataEmissao.toISOString().split('T')[0] : ''} onChange={handleChange} />
                                <label htmlFor="cpfDataEmissao">Data de Emissão do CPF</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col s7'>
                                <div style={{ maxHeight: 230, overflowY: 'auto' }}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>RG</th>
                                                <th>Data de Emissão</th>
                                            </tr>
                                        </thead>
                                        {
                                            clienteSelecionado.rgs.map((rg, index) => (

                                                <tbody key={index}>
                                                    <tr>
                                                        <td>{index}</td>
                                                        <td><input id='rg' className="validate" data-length="9" type='number' value={rg.getValor} onChange={(event) => handleChange(event, index)}></input></td>
                                                        <td><input id="rgDataEmissao" type="date" className="validate" value={rg && rg.getDataEmissao ? rg.getDataEmissao.toISOString().split('T')[0] : ''} onChange={(event) => handleChange(event, index)} /></td>
                                                    </tr>
                                                </tbody>

                                            ))
                                        }
                                    </table>
                                </div>
                            </div>
                            <div className='col s5'>
                                <div style={{ maxHeight: 230, overflowY: 'auto' }}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>DDD</th>
                                                <th>Telefone</th>
                                            </tr>
                                        </thead>
                                        {
                                            clienteSelecionado.telefones.map((telefone, index) => (

                                                <tbody>
                                                    <tr>
                                                        <td>{index}</td>
                                                        <td><input id='ddd' className="validate" data-length="2" type='number' value={telefone.getDdd} onChange={(event) => handleChange(event, index)}></input></td>
                                                        <td><input id="telefone" type="number" className="validate" value={telefone.getNumero} onChange={(event) => handleChange(event, index)} /></td>
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
                        <button className="modal-close waves-effect waves-red btn-flat">Cancelar</button>
                        <button className="modal-close waves-effect waves-green btn-flat" type='submit'>Concluir</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
