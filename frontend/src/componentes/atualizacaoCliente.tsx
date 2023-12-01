import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import Empresa from '../modelos/empresa'
import Cliente from '../modelos/cliente'
import CPF from '../modelos/cpf'
import RG from '../modelos/rg'
import Telefone from '../modelos/telefone'

type props = {
    tema: string,
    onSubmit: (empresa: Empresa) => void
    empresa: Empresa
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
}

export default class AtualizacaoCliente extends React.Component<props | Readonly<props>, { empresa: Empresa, indice: number, clienteSelecionado: Cliente }> {
    componentDidMount() {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
        M.FormSelect.init(document.querySelectorAll('select'))
        M.CharacterCounter.init(document.querySelectorAll('input'))
        M.updateTextFields()
        M.Modal.init(document.querySelectorAll('.modal'))
    }
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            empresa: props.empresa,
            indice: -1,
            clienteSelecionado: new Cliente('', '', '', new CPF('', new Date()))
        }
    }

    handleCatchIndex = (index: number) => {
        const cliente = this.props.empresa.getClientes[index]
        this.setState({
            indice: index,
            clienteSelecionado: cliente
        })
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index?: number) => {
        const id = event.target.id as 'nome' | 'nomeSocial' | 'genero' | 'cpf' | 'cpfDataEmissao' | 'rg' | 'rgDataEmissao' | 'ddd' | 'telefone'
        const value = event.target.value
        const clienteAtualizado = new Cliente(
            this.state.clienteSelecionado.nome,
            this.state.clienteSelecionado.nomeSocial,
            this.state.clienteSelecionado.genero,
            this.state.clienteSelecionado.cpf,
        )
        clienteAtualizado.rgs = this.state.clienteSelecionado.rgs.slice()
        clienteAtualizado.telefones = this.state.clienteSelecionado.telefones.slice()


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
        this.setState({
            clienteSelecionado: clienteAtualizado
        })
    }

    handleUpdate = (event: React.FormEvent) => {
        event.preventDefault()
        this.state.empresa.atualizarClientes(this.state.indice, this.state.clienteSelecionado)
        this.props.onSubmit(this.state.empresa)
        this.setState({
            empresa: this.props.empresa,
            indice: -1,
            clienteSelecionado: new Cliente('', '', '', new CPF('', new Date()))
        })
        M.toast({ html: 'Cliente atualizado com sucesso!', classes: 'rounded' })
    }

    render() {
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
                                    {this.props.empresa.getClientes.map((cliente, index) => (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td className="truncate tooltipped" data-position="top" data-tooltip={cliente.nome} style={{ maxWidth: "150px", display: "table-cell" }}>{cliente.nomeSocial ? `${cliente.nomeSocial}` : `${cliente.nome}`}</td>
                                            <td>{cliente.genero}</td>
                                            <td>{cliente.cpf.getValor}</td>
                                            <td><a href="#modal1" className="modal-trigger btn-floating yellow darken-3 btn-small" onClick={() => this.handleCatchIndex(index)}><i className="material-icons">edit</i></a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="modal1" className="modal modal-fixed-footer">
                    <form onSubmit={this.handleUpdate}>
                        <div className="modal-content">
                            <h5>Atualizar Cliente</h5>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="nome" type="text" className="validate" value={this.state.clienteSelecionado.nome} onChange={this.handleChange} />
                                    <label htmlFor="nome" className="active">Nome Completo</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="nomeSocial" type="text" className="validate" value={this.state.clienteSelecionado.nomeSocial} onChange={this.handleChange} />
                                    <label htmlFor="nomeSocial" className="active">Nome Social</label>
                                </div>
                                <div className="input-field col s12">
                                    <select id="genero" value={this.state.clienteSelecionado.genero} onChange={this.handleChange}>
                                        <option value="" disabled>Escolha o gênero</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                    </select>
                                    <label htmlFor="genero">Gênero</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="cpf" type="number" className="validate" data-length="11" value={this.state.clienteSelecionado.cpf ? this.state.clienteSelecionado.cpf.getValor : ''} onChange={this.handleChange} />
                                    <label htmlFor="cpf" className="active">CPF</label>
                                    <span className="helper-text" data-error="Incorreto" data-success="Correto"></span>
                                </div>
                                <div className="input-field col s6">
                                    <input id="cpfDataEmissao" type="date" className="validate" value={this.state.clienteSelecionado.cpf && this.state.clienteSelecionado.cpf.getDataEmissao ? this.state.clienteSelecionado.cpf.getDataEmissao.toISOString().split('T')[0] : ''} onChange={this.handleChange} />
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
                                                this.state.clienteSelecionado.rgs.map((rg, index) => (

                                                    <tbody>
                                                        <tr>
                                                            <td>{index}</td>
                                                            <td><input id='rg' className="validate" data-length="9" type='number' value={rg.getValor} onChange={(event) => this.handleChange(event, index)}></input></td>
                                                            <td><input id="rgDataEmissao" type="date" className="validate" value={rg && rg.getDataEmissao ? rg.getDataEmissao.toISOString().split('T')[0] : ''} onChange={(event) => this.handleChange(event, index)} /></td>
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
                                                this.state.clienteSelecionado.telefones.map((telefone, index) => (

                                                    <tbody>
                                                        <tr>
                                                            <td>{index}</td>
                                                            <td><input id='ddd' className="validate" data-length="2" type='number' value={telefone.getDdd} onChange={(event) => this.handleChange(event, index)}></input></td>
                                                            <td><input id="telefone" type="number" className="validate" value={telefone.getNumero} onChange={(event) => this.handleChange(event, index)} /></td>
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
}
