import React, { useEffect, useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { cadastroCliente, fetchClientesData } from '../servicos/clientes'
import { TelefoneInterface } from '../interfaces/telefone'
import { EnderecoInterface } from '../interfaces/endereco'
import { ClienteInterface } from '../interfaces/cliente'

type props = {
    clientes: Array<ClienteInterface>
    setClientes: React.Dispatch<React.SetStateAction<ClienteInterface[]>>
    tema: string
}

type formData = {
    nome: string
    sobrenome: string
    email: string
    endereco: EnderecoInterface
}

type TelefoneForm = {
    ddd: string
    numero: string
}

export const CadastroCliente = ({ clientes, setClientes, tema }: props) => {
    const [ddd, setDdd] = useState('')
    const [numero, setNumero] = useState('')
    const [telefoneForm, setTelefoneForm] = useState<TelefoneInterface>({
        ddd: '',
        numero: ''
    })
    const [telefones, setTelefones] = useState<Array<TelefoneForm>>(new Array<TelefoneForm>())

    const [formData, setFormData] = useState<formData>({
        nome: '',
        sobrenome: '',
        email: '',
        endereco: {
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: '',
            codigoPostal: '',
            informacoesAdicionais: '',
        }
    })

    useEffect(() => {
        M.FormSelect.init(document.querySelectorAll('select'))
        M.CharacterCounter.init(document.querySelectorAll('input'))
        M.updateTextFields()
        const fetchData = async () => {
            const clientes = await fetchClientesData()
            setClientes(clientes)
        }
        fetchData()
    }, [setClientes])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }))
    }

    const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            endereco: {
                ...prevData.endereco,
                [id]: value,
            },
        }))
    }

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        if (id === 'ddd' && value !== '') {
            setDdd(value)
        } else if (id === 'numero' && value !== '') {
            setNumero(value)
        }

        setTelefoneForm({ ddd: ddd, numero: numero })
    }


    const removeTelefone = (index: number) => {
        setTelefones((prevTelefones) =>
            prevTelefones.filter((telefone, i) =>
                i !== index
            )
        )
    }


    const addTelefone = () => {
        if (telefoneForm.ddd && telefoneForm.numero) {
            setTelefones((prevTelefones) => [
                ...prevTelefones,
                { ddd: telefoneForm.ddd, numero: telefoneForm.numero }
            ])
            M.toast({ html: 'Número adicionado com sucesso', classes: 'rounded green' })
            setTelefoneForm({ ddd: '', numero: '' })
            setDdd('')
            setNumero('')
        } else {
            M.toast({ html: 'Preencha DDD e Número', classes: 'rounded red' })
        }
    }


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const body: ClienteInterface = {
            nome: formData.nome,
            sobreNome: formData.sobrenome,
            email: formData.email,
            endereco: {
                estado: formData.endereco.estado,
                cidade: formData.endereco.cidade,
                bairro: formData.endereco.bairro,
                rua: formData.endereco.rua,
                numero: formData.endereco.numero,
                codigoPostal: formData.endereco.codigoPostal,
                informacoesAdicionais: formData.endereco.informacoesAdicionais,
            },
            telefones: telefones
        }
        
        const response = await cadastroCliente(body)
        if (response) {
            const updatedClientes = await fetchClientesData()
            setClientes(updatedClientes)
            setFormData({
                nome: '',
                sobrenome: '',
                email: '',
                endereco: {
                    estado: '',
                    cidade: '',
                    bairro: '',
                    rua: '',
                    numero: '',
                    codigoPostal: '',
                    informacoesAdicionais: '',
                }
            })
            setDdd('')
            setNumero('')
            setTelefoneForm({
                ddd: '',
                numero: ''
            })
            setTelefones(new Array<TelefoneForm>())
        }
    }


    let estiloBotao = `btn waves-effect waves-light ${tema}`
    return (
        <div className="container">
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                    <h4>Cadastro de Clientes</h4>
                    <div className="row">
                        <div className="input-field col s12">
                            <input required id="nome" type="text" className="validate" value={formData.nome} onChange={handleChange} />
                            <label htmlFor="nome">Nome<span className="red-text"> *</span></label>
                        </div>
                        <div className="input-field col s12">
                            <input required id="sobrenome" type="text" className="validate" value={formData.sobrenome} onChange={handleChange} />
                            <label htmlFor="sobrenome">Sobrenome<span className="red-text"> *</span></label>
                        </div>
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" required value={formData.email} onChange={handleChange} />
                            <label htmlFor="email">Email<span className="red-text"> *</span></label>
                        </div>
                    </div>
                    <h5>Endereço</h5>
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="bairro">Bairro<span className="red-text"> *</span></label>
                            <input required type="text" id="bairro" className="validate" value={formData.endereco.bairro} onChange={handleEnderecoChange} />
                        </div>
                        <div className="input-field col s6">
                            <label htmlFor="rua">Rua<span className="red-text"> *</span></label>
                            <input required type="text" id="rua" className="validate" value={formData.endereco.rua} onChange={handleEnderecoChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="numero">Número<span className="red-text"> *</span></label>
                            <input required type="number" id="numero" className="validate" value={formData.endereco.numero} onChange={handleEnderecoChange} />
                        </div>
                        <div className="input-field col s6">
                            <label htmlFor="codigoPostal">Código Postal<span className="red-text"> *</span></label>
                            <input required type="text" id="codigoPostal" className="validate" value={formData.endereco.codigoPostal} onChange={handleEnderecoChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input required type="text" id="estado" className="validate" value={formData.endereco.estado} onChange={handleEnderecoChange} />
                            <label htmlFor="estado">Estado<span className="red-text"> *</span></label>
                        </div>
                        <div className="input-field col s6">
                            <label htmlFor="cidade">Cidade<span className="red-text"> *</span></label>
                            <input required type="text" id="cidade" className="validate" value={formData.endereco.cidade} onChange={handleEnderecoChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <label htmlFor="informacoesAdicionais">Informações adicionais<span className="red-text"> *</span></label>
                            <input required type="text" id="informacoesAdicionais" className="validate" value={formData.endereco.informacoesAdicionais} onChange={handleEnderecoChange} />
                        </div>
                    </div>

                    <h5>Telefones</h5>
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="ddd">DDD<span className="red-text"> *</span></label>
                            <input type="tel" id="ddd" value={ddd} onChange={handleTelefoneChange} />
                        </div>
                        <div className="input-field col s6">
                            <label htmlFor="numero">Número<span className="red-text"> *</span></label>
                            <input type="tel" id="numero" value={numero} onChange={handleTelefoneChange} />
                        </div>
                        <button type="button" className="right btn" onClick={addTelefone}>
                            Adicionar Telefone
                        </button>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            {
                                telefones.map((telefone, index) => {
                                    return (
                                        <div key={telefone.ddd + telefone.numero + index} className='chip blue lighten-3 btn' onClick={() => removeTelefone(index)}>
                                            <span className='black-text'>Telefone: ({telefone.ddd}) {telefone.numero}</span>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <button className={estiloBotao} type="submit" name="action">Submit
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}
