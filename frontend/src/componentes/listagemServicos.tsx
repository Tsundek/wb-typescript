/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Servico from "../modelos/servico";
import Empresa from "../modelos/empresa";
import ListaServicos from "./listaServicos";
import ListaTopMenosConsumidos from "./listaTopMenosConsumidos";
import ListaTopMaisConsumidos from "./listaTopMaisConsumidos";

type props = {
    tema: string,
    servicos: Array<Servico>
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
    empresa: Empresa
    onServicoSelect: (servico: Servico) => void
    selectedServico: Servico | undefined
}

export default class ListagemServicos extends Component<props> {
    componentDidMount() {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'))
        M.Tabs.init(document.querySelectorAll('.tabs'), { swipeable: false })
        window.addEventListener('resize', this.handleResize)
    }
    handleResize = () => {
        this.forceUpdate();
    }
    render() {
        let divStyle: React.CSSProperties = { maxHeight: 1080, overflowY: "auto" }
        const { empresa, onServicoSelect, tema, servicos, selectedServico } = this.props
        return (
            <div className="row container">
                <div className="col s12">
                    <ul className="collection with-header ">
                        <li className="collection-header">
                            <div className="row valign-wrapper">
                                <h4>Lista de Serviços</h4>
                            </div>
                        </li>
                        <ul className="tabs tabs-fixed-width tab-demo">
                            <li className="tab"><a href="#ListaServicos">Geral</a></li>
                            <li className="tab"><a href="#ListaMenosServicosConsumidos">Menos Serviços Consumidos</a></li>
                            <li className="tab"><a href="#ListaMaisServicosConsumidos">Mais Serviços Consumidos</a></li>
                        </ul>
                        <div className="tabs-content">
                            <div id="ListaServicos">
                                <ListaServicos tema={tema} servicos={servicos} onServicoSelect={onServicoSelect} selectedServico={selectedServico}/>
                            </div>
                            <div id="ListaMenosServicosConsumidos" style={divStyle}>
                                <ListaTopMenosConsumidos tema={tema} empresa={empresa} onItemSelect={onServicoSelect} tipo={'servico'} />
                            </div>
                            <div id="ListaMaisServicosConsumidos" style={divStyle}>
                                <ListaTopMaisConsumidos tema={tema} empresa={empresa} onItemSelect={onServicoSelect} tipo={'servico'} />
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}