/* eslint-disable jsx-a11y/anchor-is-valid */
import 'materialize-css/dist/css/materialize.min.css'
import Empresa from "../modelos/empresa";
import Cliente from "../modelos/cliente";
import { useEffect } from 'react';

type props = {
    empresa: Empresa
    onClienteSelect: (cliente: Cliente) => void
}

export const ListaTopMaisConsumidosValor = ({ empresa, onClienteSelect }: props) => {
    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 });
    }, [])

    let topMaisConsumidosValor = empresa.topClientesPorValorConsumido()
    return (
        <>
            <h5 className="center-align">Top 5 Clientes Que Mais Consumiram Em Valor</h5>
            <li className="divider" />
            <div className='truncate'>
                {
                    topMaisConsumidosValor.map((cliente, index) => (
                        <a className={`collection-item avatar black-text`} key={index} onClick={() => onClienteSelect(cliente[0])}>
                            <i className="material-icons medium circle">shopping_cart</i>
                            <span className="title"># {index + 1}</span>
                            <p>
                                {cliente[0].nome}
                                <br />
                                Valor total consumido: R${cliente[1].toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </a>
                    ))
                }
            </div>
        </>
    )
}