import { useEffect, useState } from "react"
import { fetchClienteByID } from "../servicos/clientes"
import { ClienteInterface } from "../interfaces/cliente"

type props = {
    clienteID: number
}

export const DadosCliente = ({ clienteID }: props) => {

    const [cliente, setCliente] = useState<ClienteInterface>()

    function formatCPF(cpf: any) {
        return cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"): ""
    }

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
            <h5 className="truncate tooltipped" data-position="top" data-tooltip={cliente?.nomeSocial}>Nome Social: {cliente?.nomeSocial}</h5>
            <br />
            <h5>Gênero: {cliente?.genero}</h5>
            <br />
            <h5>CPF: {formatCPF(cliente?.cpf.valor)}</h5>
            <br />
            <h5>RGs:</h5>
            {cliente?.rgs.map((rg, index) => (
                <div key={index} className="chip green lighten-3">
                    RG: {rg.valor} Data de Emissão: {rg.dataEmissao}
                </div>
            ))}
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