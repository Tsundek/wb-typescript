/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Produto from "../modelos/produto";
import ListaProdutos from "./listaProdutos";
import ListaTopMenosConsumidos from "./listaTopMenosConsumidos";
import Empresa from "../modelos/empresa";
import ListaTopMaisConsumidos from "./listaTopMaisConsumidos";

type props = {
    tema: string,
    produtos: Array<Produto>
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
    onProdutoSelect: (produto: Produto) => void
    empresa: Empresa
    selectedProduto: Produto | undefined
}

export default class ListagemProdutos extends Component<props> {
    handleResize = () => {
        this.forceUpdate();
    }
    componentDidMount() {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'))
        M.Tabs.init(document.querySelectorAll('.tabs'), { swipeable: false })
        window.addEventListener('resize', this.handleResize)
    }
    render() {
        const { tema, produtos, onProdutoSelect, empresa, selectedProduto } = this.props
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
                                <ListaProdutos tema={tema} produtos={produtos} onProdutoSelect={onProdutoSelect} selectedProduto={selectedProduto} />
                            </div>
                            <div id="ListaMenosProdutosConsumidos" style={divStyle}>
                                <ListaTopMenosConsumidos tema={tema} empresa={empresa} onItemSelect={onProdutoSelect} tipo={'produto'} />
                            </div>
                            <div id="ListaMaisProdutosConsumidos" style={divStyle}>
                                <ListaTopMaisConsumidos tema={tema} empresa={empresa} onItemSelect={onProdutoSelect} tipo={'produto'} />
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}