import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'

type props = {
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
}

export default class BotaoServico extends Component<props> {
    componentDidMount() {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {
            hoverEnabled: false
        })
    }
    render() {
        return (
            <div className="fixed-action-btn click-to-toggle">
                <button className="btn-floating btn-large pulse red">
                   <i className="material-icons">work</i>
                </button>
                <ul>
                    <li><button className="btn-floating green" onClick={(evento) => this.props.selecionarView('CadastroServiço', evento)}><i className="material-icons">add</i></button></li>
                    <li><button className="btn-floating red"><i className="material-icons" onClick={(evento) => this.props.selecionarView('DeleteServiço', evento)}>delete</i></button></li>
                    <li><button className="btn-floating yellow darken-1"><i className="material-icons" onClick={(evento) => this.props.selecionarView('AtualizacaoServiço', evento)}>edit</i></button></li>
                    <li><button className="btn-floating blue-grey darken-1" onClick={(evento) => this.props.selecionarView('Serviços', evento)}><i className="material-icons">home</i></button></li>
                </ul>
            </div>
        )
    }
}