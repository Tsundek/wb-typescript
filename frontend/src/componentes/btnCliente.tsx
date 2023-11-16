import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'

type props = {
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
}

export default class BotaoCliente extends Component<props> {
    componentDidMount() {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'))
    }
    render() {
        return (
            <div className="fixed-action-btn">
                <button className="btn-floating btn-large pulse purple lighten-1">
                    WB
                </button>
                <ul>
                    <li><button className="btn-floating green" onClick={(evento) => this.props.selecionarView('Cadastro', evento)}><i className="material-icons">add</i></button></li>
                    <li><button className="btn-floating red"><i className="material-icons">delete</i></button></li>
                    <li><button className="btn-floating yellow darken-1"><i className="material-icons">edit</i></button></li>
                    <li><button className="btn-floating blue"><i className="material-icons">shopping_cart</i></button></li>
                    <li><button className="btn-floating blue-grey darken-1" onClick={(evento) => this.props.selecionarView('Clientes', evento)}><i className="material-icons">home</i></button></li>
                </ul>
            </div>
        )
    }
}