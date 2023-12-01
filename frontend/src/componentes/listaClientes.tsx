/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Cliente from "../modelos/cliente";

type props = {
    clientes: Array<Cliente>
    onClienteSelect: (cliente: Cliente) => void
}
function formatCPF(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export const ListaClientes = ({ clientes, onClienteSelect }: props) => {
    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 });
    }, [])

    return (
        <>
            <div className='truncate'>
                {
                    clientes.map((cliente, index) => (
                        <a className={`collection-item avatar black-text`} key={index} onClick={() => onClienteSelect(cliente)}>
                            <i className="material-icons medium circle">account_circle</i>
                            <span className="title tooltipped" data-position="top" data-tooltip={cliente.nomeSocial ? cliente.nomeSocial : cliente.nome}>{cliente.nomeSocial ? `Nome Social: ${cliente.nomeSocial}` : `Nome: ${cliente.nome}`}</span>
                            <p>
                                Gênero: {cliente.genero}
                                <br />
                                CPF: {formatCPF(cliente.cpf.getValor)}
                            </p>
                        </a>
                    ))
                }
            </div>
        </>
    )
}