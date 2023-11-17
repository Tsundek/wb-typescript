import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import Empresa from '../modelos/empresa'

type props = {
    tema: string,
    onSubmit: (empresa: Empresa) => void
    empresa: Empresa
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
}

export default class DeleteServico extends React.Component<props> {
    componentDidMount() {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
    }
    state = {
        empresa: this.props.empresa,
        indice: -1
    }

    handleOpenModal = (index: number) => {
        this.setState({ indice: index })
        var elems = document.querySelectorAll('.modal')
        var instances = M.Modal.init(elems)
        instances[0].open()
    }
    handleConfirm = () => {
        if (this.state.indice !== -1) {
            this.props.empresa.deletarServicos(this.state.indice)
            this.props.onSubmit(this.state.empresa)
        }
        this.setState({
            indice: -1,
            empresa: this.state.empresa
        })
    }

    render() {
        return (
            <><div className="row container">
                <div className='row'>
                    <div className='col s12'>
                        <h4>Deletar Serviços</h4>
                        <div style={{ maxHeight: 620, overflowY: 'auto' }}>
                            <table className='highlight col s12'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.empresa.getServicos.map((servico, index) => (
                                        <tr className='' onClick={() => this.handleOpenModal(index)}>
                                            <td>{index}</td>
                                            <td className="truncate tooltipped" data-position="top" data-tooltip={servico.nome} style={{ maxWidth: "150px", display: "table-cell" }}>{servico.nome}</td>
                                            <td>R$ {servico.valor}</td>
                                            <td><button className="btn-floating red btn-small"><i className="material-icons">delete</i></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Confirmação</h4>
                        <p className="truncate tooltipped" data-position="top" data-tooltip={this.state.indice >= 0 && this.props.empresa.getServicos[this.state.indice] && this.props.empresa.getServicos[this.state.indice].nome} style={{ display: "block" }}>Você tem certeza de que deseja deletar o produto {this.state.indice} - {this.state.indice >= 0 && this.props.empresa.getServicos[this.state.indice] && this.props.empresa.getServicos[this.state.indice].nome}?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-close waves-effect waves-green btn-flat" onClick={this.handleConfirm}>Sim</button>
                        <button className="modal-close waves-effect waves-green btn-flat">Não</button>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
