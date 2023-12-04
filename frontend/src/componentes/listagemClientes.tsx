import { useEffect } from "react"
import {ListaClientes} from "./listaClientes"
import 'materialize-css/dist/css/materialize.min.css'


import { ClienteInterface } from "../interfaces/cliente"
import { ListaClientesGenero } from "./listaClienteGenero"
import { ListaTopMaisConsumidosValor } from "./listaMaisConsumidoValor"

type props = {
    clientes: Array<ClienteInterface>
    onClienteSelect: (cliente: ClienteInterface) => void

}

export const ListagemClientes = ({ clientes, onClienteSelect }: props) => {
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
                            <ListaTopMaisConsumidosValor onClienteSelect={onClienteSelect} />
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}