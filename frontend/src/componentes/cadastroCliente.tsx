import React, { useEffect, useState } from 'react'
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
}

export const CadastroCliente = ({ onSubmit, empresa, tema }: props) => {
    const [cliente, setCliente] = useState(new Cliente('', '', '', new CPF('', new Date())))
    const [cpfValor, setCpfValor] = useState('')
    const [cpfDataEmissao, setCpfDataEmissao] = useState('')
    const [rgs, setRgs] = useState<Array<RG>>([])
    const [rgValor, setRgValor] = useState('')
    const [rgDataEmissao, setRgDataEmissao] = useState('')
    const [telefones, setTelefones] = useState<Array<Telefone>>([])
    const [ddd, setDdd] = useState('')
    const [telefone, setTelefone] = useState('')
    const [empresaState, setEmpresaState] = useState(empresa)

    useEffect(() => {
        M.FormSelect.init(document.querySelectorAll('select'));
        M.CharacterCounter.init(document.querySelectorAll('input'));
    }, [])

    const handleSubmitTelefones = (event: React.FormEvent) => {
        event.preventDefault()
        const newTelefone = new Telefone(ddd, telefone)
        setTelefones((prevTelefones) => [...prevTelefones, newTelefone])
        setDdd('')
        setTelefone('')
    }

    const handleSubmitRGS = (event: React.FormEvent) => {
        event.preventDefault()
        const newRG = new RG(rgValor, new Date(rgDataEmissao))
        setRgs((prevRgs) => [...prevRgs, newRG])
        setRgValor('')
        setRgDataEmissao('')
    }

    const handleChangeGenero = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = event.target
        setCliente((prevCliente) => ({
            ...prevCliente,
            [id]: value
        }) as Cliente)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target
        if (id === 'cpfValor' || id === 'cpfDataEmissao') {
            const newCPF = new CPF(
                id === 'cpfValor' ? value : cpfValor,
                id === 'cpfDataEmissao' ? new Date(value) : cpfDataEmissao
                    ? new Date(cpfDataEmissao)
                    : new Date()
            )
            setCpfValor(id === 'cpfValor' ? value : cpfValor);
            setCpfDataEmissao(id === 'cpfDataEmissao' ? value : cpfDataEmissao);
            setCliente((prevCliente) => ({
                ...prevCliente,
                cpf: newCPF
            }) as Cliente)
        } else if (id === 'rgValor' || id === 'rgDataEmissao') {
            const newRG = new RG(
                id === 'rgValor' ? value : rgValor,
                id === 'rgDataEmissao' ? new Date(value) : rgDataEmissao
                    ? new Date(rgDataEmissao)
                    : new Date()
            );
            setRgValor(id === 'rgValor' ? value : rgValor);
            setRgDataEmissao(id === 'rgDataEmissao' ? value : rgDataEmissao);
            setCliente((prevCliente) => ({
                ...prevCliente,
                rgs: [newRG]
            }) as Cliente)
        } else if (id === 'ddd' || id === 'telefone') {
            const newTelefone = new Telefone(
                id === 'ddd' ? value : ddd,
                id === 'telefone' ? value : telefone
            );
            setDdd(id === 'ddd' ? value : ddd);
            setTelefone(id === 'telefone' ? value : telefone);
            setCliente((prevCliente) => ({
                ...prevCliente,
                telefones: [newTelefone]
            }) as Cliente)
        } else {
            setCliente((prevCliente) => ({
                ...prevCliente,
                [id]: value
            }) as Cliente)
        }
    }


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newCPF = new CPF(cpfValor, new Date(cpfDataEmissao));
        const newCliente = new Cliente(cliente.nome, cliente.nomeSocial, cliente.genero, newCPF);
        newCliente.rgs = newCliente.rgs.concat(rgs);
        newCliente.telefones = newCliente.telefones.concat(telefones);
        empresaState.addClientes(newCliente);
        onSubmit(empresaState);
        setCliente(new Cliente('', '', '', new CPF('', new Date())));
        setCpfValor('');
        setCpfDataEmissao('');
        setRgs([]);
        setRgValor('');
        setRgDataEmissao('');
        setTelefones([]);
        setDdd('');
        setTelefone('');
        setEmpresaState(empresaState);
        M.toast({ html: 'Cliente cadastrado com sucesso!', classes: 'rounded green' });
    }


    let estiloBotao = `btn waves-effect waves-light ${tema}`
    return (
        <div className="container">
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                    <h4>Cadastro de Clientes</h4>
                    <div className="row">
                        <div className="input-field col s6">
                            <input required id="nome" type="text" className="validate" value={cliente.nome || ''} onChange={handleChange} />
                            <label htmlFor="nome">Nome Completo<span className="red-text"> *</span></label>
                        </div>
                        <div className="input-field col s6">
                            <input id="nomeSocial" type="text" className="validate" value={cliente.nomeSocial || ''} onChange={handleChange} />
                            <label htmlFor="nomeSocial">Nome Social</label>
                        </div>
                        <div className="input-field col s12">
                            <select id="genero" value={cliente.genero || ''} onChange={handleChangeGenero}>
                                <option value="" disabled>Escolha o gênero</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select>
                            <label htmlFor="genero">Gênero<span className="red-text"> *</span></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input required id="cpfValor" type="number" className="validate" data-length="11" value={cpfValor || ''} onChange={handleChange} />
                            <label htmlFor="cpfValor">CPF<span className="red-text"> *</span></label>
                            <span className="helper-text" data-error="Incorreto" data-success="Correto"></span>
                        </div>
                        <div className="input-field col s6">
                            <input required id="cpfDataEmissao" type="date" className="validate" value={cpfDataEmissao || ''} onChange={handleChange} />
                            <label htmlFor="cpfDataEmissao">Data de Emissão do CPF<span className="red-text"> *</span></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s3">
                            <input id="rgValor" type="number" className="validate" data-length="9" value={rgValor || ''} onChange={handleChange} />
                            <label htmlFor="rgValor">RG</label>
                        </div>
                        <div className="input-field col s3">
                            <input id="rgDataEmissao" type="date" className="validate" value={rgDataEmissao || ''} onChange={handleChange} />
                            <label htmlFor="rgDataEmissao">Data de Emissão do RG</label>
                        </div>
                        <div className="input-field col s3">
                            <input id="ddd" type="number" className="validate" data-length="2" value={ddd || ''} onChange={handleChange} />
                            <label htmlFor="ddd">DDD</label>
                        </div>
                        <div className="input-field col s3">
                            <input id="telefone" type="number" className="validate" data-length="10" value={telefone || ''} onChange={handleChange} />
                            <label htmlFor="telefone">Telefone</label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s6'>
                            <button className="btn waves-effect waves-light" type="button" onClick={handleSubmitRGS} disabled={!rgValor || !rgDataEmissao}>Adicionar RG</button>
                        </div>
                        <div className='col s6'>
                            <button className="btn waves-effect waves-light" type="button" onClick={handleSubmitTelefones} disabled={!ddd || !telefone}>Adicionar Telefone</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s6'>
                            <div className="card" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                <div className="card-content">
                                    <span className="card-title">RGs adicionados:</span>
                                    <ul className="collection">
                                        {rgs.map((rg, index) => (
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
                                        {telefones.map((telefone, index) => (
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
                            <button className={estiloBotao} type="submit" name="action" disabled={!cliente.nome || !cliente.genero || !cpfValor || !cpfDataEmissao}>Submit
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}
