import { Component } from "react"
import 'materialize-css/dist/css/materialize.min.css'
import Cliente from "../modelos/cliente"
import ListaClientes from "./listaClientes"
import ListaClientesGenero from "./listaClienteGenero"
import Empresa from "../modelos/empresa"
import ListaTopMaisConsumidosValor from "./listaMaisConsumidoValor"

type props = {
    tema: string,
    clientes: Array<Cliente>
    onClienteSelect: (cliente: Cliente) => void
    empresa: Empresa
    selectedCliente: Cliente | undefined
}

export default class ListagemClientes extends Component<props> {
    handleResize = () => {
        this.forceUpdate()
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
    componentDidMount() {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'))
        M.Tabs.init(document.querySelectorAll('.tabs'), { swipeable: false })
        window.addEventListener('resize', this.handleResize)
    }
    render() {
        const { clientes, empresa, onClienteSelect, tema, selectedCliente } = this.props
        let divStyle: React.CSSProperties = { maxHeight: 1080, overflowY: "auto" }
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
                                <ListaClientes tema={tema} clientes={clientes} onClienteSelect={onClienteSelect} selectedCliente={selectedCliente}/>
                            </div>
                            <div id="ListaClientesGenero" style={divStyle}>
                                <ListaClientesGenero tema={tema} clientes={clientes} onClienteSelect={onClienteSelect}/>
                            </div>
                            <div id="ListaMaisConsumidosValor" style={divStyle}>
                                <ListaTopMaisConsumidosValor tema={tema} empresa={empresa} onClienteSelect={onClienteSelect} />
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}