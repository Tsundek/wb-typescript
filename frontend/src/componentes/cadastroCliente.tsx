import React, { useEffect, useState } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import { TelefoneInterface } from '../interfaces/telefone'
import { ClienteInterface } from '../interfaces/cliente'
import { RGInterface } from '../interfaces/rg'
import { cadastroCliente, getAllUsers } from '../servicos/clientes'

type props = {
    clientes: Array<ClienteInterface>
    setClientes: React.Dispatch<React.SetStateAction<ClienteInterface[]>>
    tema: string
}

type RGData = {
    valor: string
    dataEmissao: string
    cliente_id: number
}

type CPFData = {
    valor: string
    dataEmissao: string
    cliente_id: number
}

type ClienteData = {
    nome: string
    nomeSocial: string
    genero: string
}

type TelefoneData = {
    ddd: string
    numero: string
    cliente_id: number
}

export const CadastroCliente = ({ clientes, setClientes, tema }: props) => {
    const [ddd, setDdd] = useState('')
    const [numero, setNumero] = useState('')
    const [telefoneData, setTelefoneData] = useState<TelefoneInterface>({
        ddd: '',
        numero: '',
        cliente_id: 0
    })
    const [telefones, setTelefones] = useState<Array<TelefoneData>>(new Array<TelefoneData>())


    const [valor, setValor] = useState('')
    const [dataEmissao, setDataEmissao] = useState('')
    const [rgData, setRGData] = useState<RGInterface>({
        valor: '',
        dataEmissao: '',
        cliente_id: 0
    })
    const [rgs, setRgs] = useState<Array<RGData>>(new Array<RGData>())

    const [cpf, setCpf] = useState<CPFData>({
        valor: '',
        dataEmissao: '',
        cliente_id: 0
    })

    const [clienteData, setClienteData] = useState<ClienteData>({
        nome: '',
        nomeSocial: '',
        genero: '',
    })

    useEffect(() => {
        M.FormSelect.init(document.querySelectorAll('select'))
        M.CharacterCounter.init(document.querySelectorAll('input'))
        const fetchData = async () => {
            const clientes = await getAllUsers()
            if (clientes)
                setClientes(clientes)
        }
        fetchData()

    }, [setClientes])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target
        setClienteData((prevData) => ({
            ...prevData,
            [id]: value,
        }))
    }

    const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        if (id === 'valor' && value !== '') {
            setCpf((prevData) => ({
                ...prevData,
                [id]: value,
            }))
        } else if (id === 'dataEmissao' && value !== '') {
            setCpf((prevData) => ({
                ...prevData,
                [id]: value.toString(),
            }))
            console.log(cpf)
        }
    }

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        if (id === 'ddd' && value !== '') {
            setDdd(value)
        } else if (id === 'numero' && value !== '') {
            setNumero(value)
        }

        setTelefoneData({ ddd: ddd, numero: numero, cliente_id: 0 })
    }

    const addTelefone = () => {
        if (telefoneData.ddd && telefoneData.numero) {
            setTelefones((prevTelefones) => [
                ...prevTelefones,
                { ddd: telefoneData.ddd, numero: telefoneData.numero, cliente_id: 0 }
            ])
            M.toast({ html: 'Número adicionado com sucesso', classes: 'rounded green' })
            setTelefoneData({ ddd: '', numero: '', cliente_id: 0 })
            setDdd('')
            setNumero('')
        } else {
            M.toast({ html: 'Preencha DDD e Número', classes: 'rounded red' })
        }
    }

    const removeTelefone = (index: number) => {
        setTelefones((prevTelefones) =>
            prevTelefones.filter((telefone, i) =>
                i !== index
            )
        )
    }

    const handleRGChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        if (id === 'valor' && value !== '') {
            setValor(value)
        } else if (id === 'dataEmissao' && value !== '') {
            setDataEmissao(value.toString())
        }

        setRGData((prevData) => ({
            ...prevData,
            valor: id === 'valor' ? value : prevData.valor,
            dataEmissao: id === 'dataEmissao' ? value : prevData.dataEmissao,
        }))
    }

    const addRG = () => {
        if (rgData.valor && rgData.dataEmissao) {
            setRgs((prevRgs) => [
                ...prevRgs,
                { valor: rgData.valor, dataEmissao: rgData.dataEmissao, cliente_id: 0 }
            ])
            M.toast({ html: 'RG adicionado com sucesso', classes: 'rounded green' })
            setRGData({ valor: '', dataEmissao: '', cliente_id: 0 })
            setValor('')
            setDataEmissao('')
        } else {
            M.toast({ html: 'Preencha Valor e Data de Emissão', classes: 'rounded red' })
        }
    }

    const removeRG = (index: number) => {
        setRgs((prevRgs) =>
            prevRgs.filter((rg, i) =>
                i !== index
            )
        )
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        console.log(cpf.dataEmissao)
        const body = {
            nome: clienteData.nome,
            nomeSocial: clienteData.nomeSocial,
            genero: clienteData.genero,
            cpf: {
                valor: cpf.valor,
                dataEmissao: cpf.dataEmissao,
                cliente_id: 0,
            },
            rgs: rgs.map((rg) => ({
                valor: rg.valor,
                dataEmissao: rg.dataEmissao,
                cliente_id: 0,
                id: 0,
            })),
            telefones: telefones.map((telefone) => ({
                ddd: telefone.ddd,
                numero: telefone.numero,
                cliente_id: 0,
            }))
        }
        console.log(body)

        const response = await cadastroCliente(body)
        if (response) {
            const updatedClientes = await getAllUsers()
            if (updatedClientes)
                setClientes(updatedClientes)


            setClienteData({
                nome: '',
                nomeSocial: '',
                genero: '',
            })
            setDdd('')
            setNumero('')
            setTelefoneData({
                ddd: '',
                numero: '',
                cliente_id: 0
            })
            setTelefones(new Array<TelefoneData>())
            setValor('')
            setDataEmissao('')
            setRGData({
                valor: '',
                dataEmissao: '',
                cliente_id: 0,
            });
            setRgs(new Array<RGData>())
            setCpf({
                valor: '',
                dataEmissao: '',
                cliente_id: 0,
            })
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
                            <input required id="nome" type="text" className="validate" value={clienteData.nome} onChange={handleChange} />
                            <label htmlFor="nome">Nome<span className="red-text"> *</span></label>
                        </div>
                        <div className="input-field col s12">
                            <input id="nomeSocial" type="text" className="validate" value={clienteData.nomeSocial} onChange={handleChange} />
                            <label htmlFor="nomeSocial">Nome social<span className="red-text"> *</span></label>
                        </div>
                        <div className="input-field col s12">
                            <select id="genero" value={clienteData.genero || ''} onChange={handleChange}>
                                <option value="" disabled>Escolha o gênero</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select>
                            <label htmlFor="genero">Gênero<span className="red-text"> *</span></label>
                        </div>
                    </div>
                    <h5>CPF</h5>
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="valor">Valor<span className="red-text"> *</span></label>
                            <input required type="number" id="valor" className="validate" value={cpf.valor} onChange={handleCPFChange} />
                        </div>
                        <div className="input-field col s6">
                            <label htmlFor="dataEmissao" className='active'>Data de emissão<span className="red-text"> *</span></label>
                            <input required type="date" id="dataEmissao" className="validate" value={cpf.dataEmissao} onChange={handleCPFChange} />
                        </div>
                    </div>

                    <h5>RGs</h5>
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="valor">Valor<span className="red-text"> *</span></label>
                            <input type="number" id="valor" value={valor} onChange={handleRGChange} />
                        </div>
                        <div className="input-field col s6">
                            <label htmlFor="dataEmissao" className='active'>Data de emissão<span className="red-text"> *</span></label>
                            <input type="date" id="dataEmissao" value={dataEmissao} onChange={handleRGChange} />
                        </div>
                        <button type="button" className="right btn" onClick={addRG}>
                            Adicionar RG
                        </button>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            {
                                rgs.map((rg, index) => {
                                    return (
                                        <div key={rg.valor + index} className='chip blue lighten-3 btn' onClick={() => removeRG(index)}>
                                            <span className='black-text'>RG: {rg.valor} Data de Emissão: {rg.dataEmissao}</span>
                                        </div>
                                    )
                                })}
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
