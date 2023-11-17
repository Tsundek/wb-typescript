import React from 'react'
import Cliente from '../modelos/cliente'
import CPF from '../modelos/cpf'
import RG from '../modelos/rg'
import Telefone from '../modelos/telefone'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import Empresa from '../modelos/empresa'

type props = {
    tema: string,
    onSubmit: (empresa: Empresa) => void
    empresa: Empresa
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
}

export default class CadastroCliente extends React.Component<props> {
    componentDidMount() {
        M.FormSelect.init(document.querySelectorAll('select'))
        M.CharacterCounter.init(document.querySelectorAll('input'))
    }
    state = {
        cliente: new Cliente('', '', '', new CPF('', new Date())),
        cpfValor: '',
        cpfDataEmissao: '',
        rgs: new Array<RG>(),
        rgValor: '',
        rgDataEmissao: '',
        telefones: new Array<Telefone>(),
        ddd: '',
        telefone: '',
        empresa: this.props.empresa,

    }

    handleSubmitTelefones = (event: React.FormEvent) => {
        event.preventDefault()
        const newTelefone = new Telefone(this.state.ddd, this.state.telefone)
        this.setState(prevState => ({
            ...prevState,
            telefones: [...this.state.telefones, newTelefone],
            ddd: '',
            telefone: ''
        }))
    }

    handleSubmitRGS = (event: React.FormEvent) => {
        event.preventDefault()
        const newRG = new RG(this.state.rgValor, new Date(this.state.rgDataEmissao))
        this.setState(prevState => ({
            ...prevState,
            rgs: [...this.state.rgs, newRG],
            rgValor: '',
            rgDataEmissao: ''
        }))
    }

    handleChangeGenero = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            cliente: {
                ...this.state.cliente,
                [event.target.id]: event.target.value
            }
        })
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.id === 'cpfValor' || event.target.id === 'cpfDataEmissao') {
            const newCPF = new CPF(
                event.target.id === 'cpfValor' ? event.target.value : this.state.cpfValor,
                event.target.id === 'cpfDataEmissao' ? new Date(event.target.value) : this.state.cpfDataEmissao ? new Date(this.state.cpfDataEmissao) : new Date()
            )
            this.setState({
                cpfValor: event.target.id === 'cpfValor' ? event.target.value : this.state.cpfValor,
                cpfDataEmissao: event.target.id === 'cpfDataEmissao' ? event.target.value : this.state.cpfDataEmissao,
                cliente: {
                    ...this.state.cliente,
                    _cpf: newCPF
                }
            })
        }
        else if (event.target.id === 'rgValor' || event.target.id === 'rgDataEmissao') {
            const newRG = new RG(
                event.target.id === 'rgValor' ? event.target.value : this.state.rgValor,
                event.target.id === 'rgDataEmissao' ? new Date(event.target.value) : this.state.rgDataEmissao ? new Date(this.state.rgDataEmissao) : new Date()
            )
            this.setState({
                rgValor: event.target.id === 'rgValor' ? event.target.value : this.state.rgValor,
                rgDataEmissao: event.target.id === 'rgDataEmissao' ? event.target.value : this.state.rgDataEmissao,
                cliente: {
                    ...this.state.cliente,
                    _rgs: newRG
                }
            })
        } else if (event.target.id === 'ddd' || event.target.id === 'telefone') {
            const newTelefone = new Telefone(
                event.target.id === 'ddd' ? event.target.value : this.state.ddd,
                event.target.id === 'telefone' ? event.target.value : this.state.telefone
            )
            this.setState({
                ddd: event.target.id === 'ddd' ? event.target.value : this.state.ddd,
                telefone: event.target.id === 'telefone' ? event.target.value : this.state.telefone,
                cliente: {
                    ...this.state.cliente,
                    _telefones: newTelefone
                }
            })
        } else {
            this.setState({
                cliente: {
                    ...this.state.cliente,
                    [event.target.id]: event.target.value
                }
            })
        }
    }


    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const newCPF = new CPF(this.state.cpfValor, new Date(this.state.cpfDataEmissao))
        const newCliente = new Cliente(this.state.cliente.nome, this.state.cliente.nomeSocial, this.state.cliente.genero, newCPF)
        newCliente.rgs = newCliente.rgs.concat(this.state.rgs)
        newCliente.telefones = newCliente.telefones.concat(this.state.telefones)
        this.state.empresa.addClientes(newCliente)
        this.props.onSubmit(this.state.empresa)
        this.setState({
            cliente: new Cliente('', '', '', new CPF('', new Date())),
            cpfValor: '',
            cpfDataEmissao: '',
            rgs: new Array<RG>(),
            rgValor: '',
            rgDataEmissao: '',
            telefones: new Array<Telefone>(),
            ddd: '',
            telefone: '',
            empresa: this.state.empresa
        })
    }

    render() {
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}`
        return (
            <div className="container">
                <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <h4>Cadastro de Clientes</h4>
                        <div className="row">
                            <div className="input-field col s6">
                                <input required id="nome" type="text" className="validate" value={this.state.cliente.nome || ''} onChange={this.handleChange} />
                                <label htmlFor="nome">Nome Completo<span className="red-text"> *</span></label>
                            </div>
                            <div className="input-field col s6">
                                <input id="nomeSocial" type="text" className="validate" value={this.state.cliente.nomeSocial || ''} onChange={this.handleChange} />
                                <label htmlFor="nomeSocial">Nome Social</label>
                            </div>
                            <div className="input-field col s12">
                                <select id="genero" value={this.state.cliente.genero || ''} onChange={this.handleChangeGenero}>
                                    <option value="" disabled>Escolha o gênero</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                                <label htmlFor="genero">Gênero<span className="red-text"> *</span></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input required id="cpfValor" type="number" className="validate" data-length="11" value={this.state.cpfValor || ''} onChange={this.handleChange} />
                                <label htmlFor="cpfValor">CPF<span className="red-text"> *</span></label>
                                <span className="helper-text" data-error="Incorreto" data-success="Correto"></span>
                            </div>
                            <div className="input-field col s6">
                                <input required id="cpfDataEmissao" type="date" className="validate" value={this.state.cpfDataEmissao || ''} onChange={this.handleChange} />
                                <label htmlFor="cpfDataEmissao">Data de Emissão do CPF<span className="red-text"> *</span></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <input id="rgValor" type="number" className="validate" data-length="9" value={this.state.rgValor || ''} onChange={this.handleChange} />
                                <label htmlFor="rgValor">RG</label>
                            </div>
                            <div className="input-field col s3">
                                <input id="rgDataEmissao" type="date" className="validate" value={this.state.rgDataEmissao || ''} onChange={this.handleChange} />
                                <label htmlFor="rgDataEmissao">Data de Emissão do RG</label>
                            </div>
                            <div className="input-field col s3">
                                <input id="ddd" type="number" className="validate" data-length="2" value={this.state.ddd || ''} onChange={this.handleChange} />
                                <label htmlFor="ddd">DDD</label>
                            </div>
                            <div className="input-field col s3">
                                <input id="telefone" type="number" className="validate" data-length="10" value={this.state.telefone || ''} onChange={this.handleChange} />
                                <label htmlFor="telefone">Telefone</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col s6'>
                                <button className="btn waves-effect waves-light" type="button" onClick={this.handleSubmitRGS} disabled={!this.state.rgValor || !this.state.rgDataEmissao}>Adicionar RG</button>
                            </div>
                            <div className='col s6'>
                                <button className="btn waves-effect waves-light" type="button" onClick={this.handleSubmitTelefones} disabled={!this.state.ddd || !this.state.telefone}>Adicionar Telefone</button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col s6'>
                                <div className="card" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    <div className="card-content">
                                        <span className="card-title">RGs adicionados:</span>
                                        <ul className="collection">
                                            {this.state.rgs.map((rg, index) => (
                                                <li key={index} className="collection-item">
                                                    RG: {rg.getValor}, Emissão: {rg.getDataEmissao.toDateString()}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col s6'>
                                <div className="card" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    <div className="card-content">
                                        <span className="card-title">Telefones:</span>
                                        <ul className="collection">
                                            {this.state.telefones.map((telefone, index) => (
                                                <li key={index} className="collection-item">
                                                    Telefone: ({telefone.getDdd}) {telefone.getNumero}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button className={estiloBotao} type="submit" name="action" disabled={!this.state.cliente.nome || !this.state.cliente.genero || !this.state.cpfValor || !this.state.cpfDataEmissao}>Submit
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
