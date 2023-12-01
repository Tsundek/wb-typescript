/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Empresa from "../modelos/empresa";
import Produto from "../modelos/produto";
import Servico from "../modelos/servico";

type Item = Produto | Servico

type state = {
    selectedItem: Item | undefined
}

type props = {
    tipo: 'produto' | 'servico'
    tema: string,
    empresa: Empresa
    onItemSelect: (item: Item) => void
}

export default class ListaTopMaisConsumidos extends Component<props, state> {
    constructor(props: props) {
        super(props)
        this.state = {
            selectedItem: undefined
        }
    }
    componentDidMount(): void {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
    }
    handleItemClick = (item: [Item, number]) => {
        if (this.props.tipo === 'produto') {
            this.setState({
                selectedItem: item[0] as Produto
            })
            this.props.onItemSelect(item[0] as Produto)
        } else {
            this.setState({
                selectedItem: item[0] as Servico
            })
            this.props.onItemSelect(item[0] as Servico)
        }
    }
    render() {
        const { tema, empresa, tipo } = this.props
        let estilo = `collection-item active ${tema}`
        let topMaisConsumidosValor = tipo === 'produto' ? empresa.topMaisProdutosConsumidos() : empresa.topMaisServicosConsumidos()
        return (
            <>
                <h5 className="center-align">Top 10 {tipo === 'produto' ? 'Produtos' : 'Serviços'} Mais Consumidos</h5>
                <li className="divider"/>
                <div className='truncate'>
                    {
                        topMaisConsumidosValor.map((item, index) => (
                            <a className={`collection-item avatar black-text ${item[0] === this.state.selectedItem ? estilo : ''}`} key={index} onClick={() => this.handleItemClick(item)}>
                                <i className="material-icons medium circle">shopping_cart</i>
                                <span className="title"># {index + 1}</span>
                                <p>
                                    {item[0].nome}
                                    <br />
                                    Quantidade consumida: {item[1]}
                                </p>
                            </a>
                        ))
                    }
                </div>
            </>
        )
    }
}