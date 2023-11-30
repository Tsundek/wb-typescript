import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Cliente from "../modelos/cliente";
import ListaClientes from "./listaClientes";
import ListaClientesGenero from "./listaClienteGenero";
import ListaMenosProdutosConsumidos from "./listaMenosProdutosConsumidos";

type state = {
    selectedCliente: Cliente | null
}

type props = {
    tema: string,
    clientes: Array<Cliente>
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
    onClienteSelect: (cliente: Cliente) => void
}

export default class ListagemClientes extends Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            selectedCliente: null
        }
    }
    handleResize = () => {
        this.forceUpdate();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
    componentDidMount() {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'))
        M.Tabs.init(document.querySelectorAll('.tabs'), { swipeable: false })
        window.addEventListener('resize', this.handleResize)
    }
    render() {
        return (
            <div className="row container">
                <ul className="collection with-header" style={{ overflow: "hidden" }}>
                    <li className="collection-header">
                        <div className="row valign-wrapper">
                            <h4>Lista de Clientes</h4>
                        </div>
                    </li>
                    <ul className="tabs" style={{ paddingBottom: '5rem' }}>
                        <li className="tab"><a href="#ListaClientes">Geral</a></li>
                        <li className="tab"><a href="#ListaClientesGenero">Gênero</a></li>
                        <li className="tab"><a href="#ListaMenosProdutosConsumidos">Menos Produtos Consumidos</a></li>
                        <li className="tab"><a href="#test4">Menos Serviços Consumidos</a></li>
                        <li className="tab"><a href="#test5">Mais Produtos Consumidos</a></li>
                        <li className="tab"><a href="#test6">Mais Serviços Consumidos</a></li>
                        <li className="tab"><a href="#test7">Maior Valor Consumido</a></li>
                    </ul>
                    <div className="tabs-content">
                        <div id="ListaClientes" style={{ maxHeight: 660, overflowY: "auto" }}>
                            <ListaClientes tema={"purple lighten-4"} clientes={this.props.clientes} onClienteSelect={this.props.onClienteSelect} />
                        </div>
                        <div id="ListaClientesGenero" style={{ maxHeight: 660, overflowY: "auto" }}>
                            <ListaClientesGenero tema={"purple lighten-4"} clientes={this.props.clientes} />
                        </div>
                        <div id="ListaMenosProdutosConsumidos" style={{ maxHeight: 660, overflowY: "auto" }}>
                            <ListaMenosProdutosConsumidos tema={"purple lighten-4"} clientes={this.props.clientes}/>
                        </div>
                    </div>
                </ul>
            </div>
        )
    }
}