/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Produto from "../modelos/produto";

type state = {
    selectedProduto: Produto | null
}

type props = {
    tema: string,
    produtos: Array<Produto>
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
}

export default class ListagemProdutos extends Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            selectedProduto: null
        }
    }
    componentDidMount() {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'))
    }
    render() {
        let estilo = `collection-item active ${this.props.tema}`
        return (
            <div className="row container">
                <div className="col s12">
                    <ul className="collection with-header ">
                        <li className="collection-header">
                            <div className="row valign-wrapper">
                                <h4>Lista de Produtos</h4>
                            </div>
                        </li>
                        <ul className="tabs">
                            <li className="tab col s3"><a href="#test1">Test 1</a></li>
                            <li className="tab col s3"><a className="active" href="#test2">Test 2</a></li>
                            <li className="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>
                            <li className="tab col s3"><a href="#test4">Test 4</a></li>
                        </ul>
                        <div style={{maxHeight: "587px", overflowY: "auto"}}>
                            {this.props.produtos.map((produto, index) => (
                                <a href="#!" className={`collection-item avatar black-text ${produto === this.state.selectedProduto ? estilo : ''}`} key={index} onClick={() => this.setState({ selectedProduto: produto })}>
                                    <i className="material-icons medium circle">shopping_cart</i>
                                    <span className="title">{produto.nome}</span>
                                    <p>
                                        Valor: R$ {produto.valor}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
}