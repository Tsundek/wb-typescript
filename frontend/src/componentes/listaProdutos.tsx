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
    onProdutoSelect: (produto: Produto) => void
}

export default class ListaProdutos extends Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            selectedProduto: null
        }
    }
    componentDidMount(): void {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
    }
    handleProdutoClick = (produto: Produto) => {
        this.setState({ selectedProduto: produto })
        this.props.onProdutoSelect(produto)
    }
    render() {
        let estilo = `collection-item active ${this.props.tema}`
        return (
            <>
                <div className='truncate'>
                    {
                        this.props.produtos.map((produto, index) => (
                            <a href="#!" className={`collection-item avatar black-text ${produto === this.state.selectedProduto ? estilo : ''}`} key={index} onClick={() => this.handleProdutoClick(produto)}>
                                <i className="material-icons medium circle">shopping_cart</i>
                                <span className="title">{produto.nome}</span>
                                <p>
                                    Valor: R$ {produto.valor}
                                </p>
                            </a>
                        ))
                    }
                </div>
            </>
        )
    }
}