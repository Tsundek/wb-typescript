import { useEffect, useState } from "react"
import { fetchClienteByID } from "../servicos/clientes"
import { ClienteInterface } from "../interfaces/cliente"

type props = {
    clienteID: number
}

export const DadosCliente = ({ clienteID }: props) => {

    const [cliente, setCliente] = useState<ClienteInterface>()


    useEffect(() => {
        M.Chips.init(document.querySelectorAll('.chips'))
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
        const fetchData = async () => {
            const data = await fetchClienteByID(clienteID)
            setCliente(data)
        }
        fetchData()

    }, [clienteID])

    return (
        <div className="container">
            <h3 className="center">Dados do Cliente</h3>
            <div className="divider" />
            <br />
            <h5 className="truncate tooltipped" data-position="top" data-tooltip={cliente?.nome}>Nome: {cliente?.nome}</h5>
            <br />
            <h5 className="truncate tooltipped" data-position="top" data-tooltip={cliente?.sobreNome}>Sobrenome: {cliente?.sobreNome}</h5>
            <br />
            <h5>Email: {cliente?.email}</h5>
            <br />
            <h5>Endereço:</h5>
            <h6><p>
                Estado: {cliente?.endereco.estado}, Cidade: {cliente?.endereco.cidade}
                <br/>
                Rua: {cliente?.endereco.rua}, Nº{cliente?.endereco.numero} - Bairro: {cliente?.endereco.bairro}, CEP: {cliente?.endereco.codigoPostal}
            </p></h6>
            <br />
            <h5>Telefones:</h5>
            {cliente?.telefones.map((telefone, index) => (
                <div key={index} className="chip purple lighten-3">
                    Número: ({telefone.ddd}) {telefone.numero}
                </div>
            ))}
            <br />
        </div>
    )
}