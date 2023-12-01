import { useEffect } from "react"
import {ListaClientes} from "./listaClientes"
import {ListaClientesGenero} from "./listaClienteGenero"
import {ListaTopMaisConsumidosValor} from "./listaMaisConsumidoValor"
import 'materialize-css/dist/css/materialize.min.css'

import Cliente from "../modelos/cliente"
import Empresa from "../modelos/empresa"

type props = {
    clientes: Array<Cliente>
    onClienteSelect: (cliente: Cliente) => void
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
                    <ul className="tabs tabs-fixed-width tab-demo">
                        <li className="tab"><a href="#ListaClientes">Geral</a></li>
                        <li className="tab"><a href="#ListaClientesGenero">Gênero</a></li>
                        <li className="tab"><a href="#ListaMaisConsumidosValor">Maior Valor Consumido</a></li>
                    </ul>
                    <div className="tabs-content">
                        <div id="ListaClientes" style={divStyle}>
                            <ListaClientes clientes={clientes} onClienteSelect={onClienteSelect} />
                        </div>
                        <div id="ListaClientesGenero" style={divStyle}>
                            <ListaClientesGenero clientes={clientes} onClienteSelect={onClienteSelect} />
                        </div>
                        <div id="ListaMaisConsumidosValor" style={divStyle}>
                            <ListaTopMaisConsumidosValor empresa={empresa} onClienteSelect={onClienteSelect} />
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}