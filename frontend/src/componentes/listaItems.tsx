/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import { ProdutoInterface } from "../interfaces/produto";
import { ServicoInterface } from "../interfaces/servico";

type Item = ProdutoInterface | ServicoInterface

type props = {
    items: Array<Item>
    onItemSelect: (item: Item) => void
}

export const ListaItems = ({ items, onItemSelect }: props) => {
    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
    }, [])
    return (
        <>
            <div className='truncate'>
                {
                    items.map((item, index) => (
                        <a className={`collection-item avatar black-text truncate`} key={index} onClick={() => onItemSelect(item)}>
                            <i className="material-icons medium circle">shopping_cart</i>
                            <span className="title tooltipped" data-position="top" data-tooltip={item?.nome}>Nome: {item?.nome}</span>
                            <p>
                                Valor: {item?.valor ? `R$ ${item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'Valor indisponível'}
                            </p>
                        </a>
                    ))
                }
            </div>
        </>
    )
}
