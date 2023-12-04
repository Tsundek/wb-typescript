/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react"
import { ListaItems } from "./listaItems"
import { ListaTopMenosConsumidos } from "./listaTopMenosConsumidos"
import { ListaTopMaisConsumidos } from "./listaTopMaisConsumidos"

import 'materialize-css/dist/css/materialize.min.css'
import { ProdutoInterface } from "../interfaces/produto"

type props = {
    produtos: Array<ProdutoInterface>
    onProdutoSelect: (produto: ProdutoInterface) => void
}

export const ListagemProdutos = ({ produtos, onProdutoSelect }: props) => {
    useEffect(() => {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'))
        M.Tabs.init(document.querySelectorAll('.tabs'), { swipeable: false })
    }, [])

    let divStyle: React.CSSProperties = { maxHeight: 1080, overflowY: "auto" }
    return (
        <div className="row container">
            <div className="col s12">
                <ul className="collection with-header ">
                    <li className="collection-header">
                        <div className="row valign-wrapper">
                            <h4>Lista de Produtos</h4>
                        </div>
                    </li>
                    <ul className="tabs tabs-fixed-width tab-demo">
                        <li className="tab"><a href="#ListaProdutos">Geral</a></li>
                        <li className="tab"><a href="#ListaMenosProdutosConsumidos">Menos Produtos Consumidos</a></li>
                        <li className="tab"><a href="#ListaMaisProdutosConsumidos">Mais Produtos Consumidos</a></li>
                    </ul>
                    <div className="tabs-content">
                        <div id="ListaProdutos" style={divStyle}>
                            <ListaItems items={produtos} onItemSelect={onProdutoSelect} />
                        </div>
                        <div id="ListaMenosProdutosConsumidos" style={divStyle}>
                            <ListaTopMenosConsumidos tipo={'produto'} />
                        </div>
                        <div id="ListaMaisProdutosConsumidos" style={divStyle}>
                            <ListaTopMaisConsumidos tipo={'produto'} />
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}
