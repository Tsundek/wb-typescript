/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react"
import 'materialize-css/dist/css/materialize.min.css'
import { ClienteInterface } from "../interfaces/cliente"

type props = {
    clientes: Array<ClienteInterface>
    onClienteSelect: (cliente: ClienteInterface) => void
}

export const ListaClientes = ({ clientes, onClienteSelect }: props) => {
    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
    }, [])

    return (
        <>
            <div>
                {
                    clientes.map((cliente, index) => (
                        <a className={`collection-item avatar black-text truncate`} key={index} onClick={() => onClienteSelect(cliente)}>
                            <i className="material-icons medium circle">account_circle</i>
                            <span className="title tooltipped" data-position="top" data-tooltip={cliente.nome}>Nome: {cliente.nome}</span>
                            <p>
                                Sobrenome: {cliente.sobreNome}
                                <br />
                                ID: {cliente.id}
                            </p>
                        </a>
                    ))
                }
            </div>
        </>
    )
}