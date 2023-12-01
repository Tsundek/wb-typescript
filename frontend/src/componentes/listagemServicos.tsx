/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react"
import { ListaTopMenosConsumidos } from "./listaTopMenosConsumidos"
import { ListaTopMaisConsumidos } from "./listaTopMaisConsumidos"
import { ListaItems } from "./listaItems"

import 'materialize-css/dist/css/materialize.min.css'
import Servico from "../modelos/servico"
import Empresa from "../modelos/empresa"

type props = {
    servicos: Array<Servico>
    empresa: Empresa
    onServicoSelect: (servico: Servico) => void
}

export const ListagemServicos = ({ servicos, empresa, onServicoSelect }: props) => {
    useEffect(() => {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'))
        M.Tabs.init(document.querySelectorAll('.tabs'), { swipeable: false })
    }, [])

    const divStyle: React.CSSProperties = { maxHeight: 1080, overflowY: "auto" }
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
                            <ListaItems items={servicos} onItemSelect={onServicoSelect} />
                        </div>
                        <div id="ListaMenosServicosConsumidos" style={divStyle}>
                            <ListaTopMenosConsumidos empresa={empresa} onItemSelect={onServicoSelect} tipo={'servico'} />
                        </div>
                        <div id="ListaMaisServicosConsumidos" style={divStyle}>
                            <ListaTopMaisConsumidos empresa={empresa} onItemSelect={onServicoSelect} tipo={'servico'} />
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}