/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

type props = {
    tema: string;
    botoes: string[];
    seletorView: (novaTela: string, evento: React.MouseEvent) => void;
}

export const BarraNavegacao = ({ tema, botoes, seletorView }: props) => {
    useEffect(() => {
        const initSidenav = () => {
            const elems = document.querySelectorAll('.sidenav')
            M.Sidenav.init(elems)
        }
        initSidenav()
    }, [])

    const gerarListaBotoes = () => {
        if (botoes.length <= 0) {
            return <></>
        } else {
            return botoes.map((valor) => (
                <li key={valor}>
                    <a onClick={(e) => seletorView(valor, e)}>{valor}</a>
                </li>
            ))
        }
    }
    let estilo = `${tema}`
    return (
        <>
            <nav className={estilo}>
                <div className="nav-wrapper">
                    <a className="brand-logo">WB</a>
                    <a data-target="mobile-menu" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="right hide-on-med-and-down">
                        {gerarListaBotoes()}
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-menu">
                {gerarListaBotoes()}
            </ul>
        </>
    )
}