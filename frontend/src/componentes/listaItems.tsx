/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Servico from "../modelos/servico";
import Produto from "../modelos/produto";

type Item = Produto | Servico

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
                            <span className="title tooltipped" data-position="top" data-tooltip={item.nome}>Nome do {item instanceof Produto ? 'produto' : 'serviço'}: {item.nome}</span>
                            <p>
                                Valor: R${item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </a>
                    ))
                }
            </div>
        </>
    )
}
