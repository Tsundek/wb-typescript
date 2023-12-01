/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import Empresa from "../modelos/empresa";
import Produto from "../modelos/produto";
import Servico from "../modelos/servico";

type Item = Produto | Servico

type props = {
    tipo: 'produto' | 'servico'
    empresa: Empresa
    onItemSelect: (item: Item) => void
}

export const ListaTopMenosConsumidos = ({ tipo, empresa, onItemSelect }: props) => {
    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 });
    }, [])
    let topMenosConsumidos = tipo === 'produto' ? empresa.topMenosProdutosConsumidos() : empresa.topMenosServicosConsumidos()
    return (
        <>
            <h5 className="center-align">Top 10 {tipo === 'produto' ? 'Produtos' : 'Serviços'} Menos Consumidos</h5>
            <li className="divider" />
            <div>
                {
                    topMenosConsumidos.map((item, index) => (
                        <a className={`collection-item avatar black-text truncate`} key={index} onClick={() => onItemSelect(item[0])}>
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
