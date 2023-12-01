import { useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css'

type props = {
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
}

export const BotaoProduto = ({ selecionarView }: props) => {
    useEffect(() => {
        M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {
            hoverEnabled: false,
        })
    }, [])

    return (
        <div className="fixed-action-btn click-to-toggle">
            <button className="btn-floating btn-large pulse green">
                <i className="material-icons">shopping_cart</i>
            </button>
            <ul>
                <li><button className="btn-floating green" onClick={(evento) => selecionarView('CadastroProduto', evento)}><i className="material-icons">add</i></button></li>
                <li><button className="btn-floating red"><i className="material-icons" onClick={(evento) => selecionarView('DeleteProduto', evento)}>delete</i></button></li>
                <li><button className="btn-floating yellow darken-1"><i className="material-icons" onClick={(evento) => selecionarView('AtualizacaoProduto', evento)}>edit</i></button></li>
                <li><button className="btn-floating blue-grey darken-1" onClick={(evento) => selecionarView('Produtos', evento)}><i className="material-icons">home</i></button></li>
            </ul>
        </div>
    )
}