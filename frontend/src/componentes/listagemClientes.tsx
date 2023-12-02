import { useEffect } from "react"
import {ListaClientes} from "./listaClientes"
import 'materialize-css/dist/css/materialize.min.css'

import Empresa from "../modelos/empresa"
import { ClienteInterface } from "../interfaces/cliente"

type props = {
    clientes: Array<ClienteInterface>
    onClienteSelect: (cliente: ClienteInterface) => void
    empresa: Empresa
}

export const ListagemClientes = ({ clientes, onClienteSelect, empresa }: props) => {
    useEffect(() => {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'))
        M.Tabs.init(document.querySelectorAll('.tabs'), { swipeable: false })
    }, [])

    const divStyle: React.CSSProperties = { maxHeight: 1080, overflowY: "auto" }

    return (
        <div className="row container">
            <div className="col s12">
                <ul className="collection with-header" style={{ overflow: "hidden" }}>
                    <li className="collection-header">
                        <div className="row valign-wrapper">
                            <h4>Lista de Clientes</h4>
                        </div>
                    </li>
                    <div className="tabs-content">
                        <div id="ListaClientes" style={divStyle}>
                            <ListaClientes clientes={clientes} onClienteSelect={onClienteSelect} />
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}