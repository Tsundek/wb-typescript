import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import Empresa from '../modelos/empresa'
import BotaoCliente from './btnCliente'

type props = {
    tema: string,
    onSubmit: (empresa: Empresa) => void
    empresa: Empresa
    BotaoCliente: typeof BotaoCliente
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
}

export default class DeleteCliente extends React.Component<props> {
    componentDidMount() {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
    }
    state = {
        empresa: this.props.empresa,
        indice: null
    }

    handleOpenModal = (index: number) => {
        this.setState({ indice: index })
        var elems = document.querySelectorAll('.modal')
        var instances = M.Modal.init(elems)
        instances[0].open()
    }
    handleConfirm = () => {
        if (this.state.indice) {
            this.props.empresa.deletarClientes(this.state.indice)
            this.props.onSubmit(this.state.empresa)
        }
        this.setState({
            indice: null,
            empresa: this.state.empresa
        })
    }

    render() {
        const BotaoCliente = this.props.BotaoCliente
        return (
            <><div className="row container">
                <div>
                    <BotaoCliente selecionarView={this.props.selecionarView} />
                </div>
                <div className='row'>
                    <div className='col s12'>
                        <h4>Deletar Clientes</h4>
                        <table className='highlight col s12'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Gênero</th>
                                    <th>CPF</th>
                                </tr>
                            </thead>
                            {this.props.empresa.getClientes.map((cliente, index) => (
                                <tbody>
                                    <tr className='' onClick={() => this.handleOpenModal(index)}>
                                        <td>{index}</td>
                                        <td className="truncate tooltipped" data-position="top" data-tooltip={cliente.nome} style={{ maxWidth: "150px", display: "table-cell" }}>{cliente.nomeSocial ? `${cliente.nomeSocial}` : `${cliente.nome}`}</td>
                                        <td>{cliente.genero}</td>
                                        <td>{cliente.cpf.getValor}</td>
                                        <td><button className="btn-floating red btn-small"><i className="material-icons">delete</i></button></td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Confirmação</h4>
                        <p>Você tem certeza de que deseja deletar o cliente número {this.state.indice}?</p>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={this.handleConfirm}>Sim</a>
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Não</a>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
