import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import Empresa from '../modelos/empresa'
import Servico from '../modelos/servico'

type props = {
    tema: string,
    onSubmit: (empresa: Empresa) => void
    empresa: Empresa
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
}

export default class AtualizacaoServico extends React.Component<props | Readonly<props>, { empresa: Empresa, indice: number, servicoSelecionado: Servico }> {
    componentDidMount() {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })
        M.FormSelect.init(document.querySelectorAll('select'))
        M.CharacterCounter.init(document.querySelectorAll('input'))
        M.updateTextFields()
        M.Modal.init(document.querySelectorAll('.modal'))
    }
    constructor(props: props | Readonly<props>) {
        super(props)
        this.state = {
            empresa: props.empresa,
            indice: -1,
            servicoSelecionado: new Servico('', 0)
        }
    }

    handleCatchIndex = (index: number) => {
        const servico = this.props.empresa.getServicos[index]
        this.setState({
            indice: index,
            servicoSelecionado: servico
        })
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        const id = event.target.id as 'nome' | 'valor'
        const value = event.target.value
        const servicoAtualizado = new Servico(
            this.state.servicoSelecionado.nome,
            this.state.servicoSelecionado.valor
        )

        if (id === 'nome') {
            servicoAtualizado.nome = value
        } else {
            servicoAtualizado.valor = parseFloat(value)
        }

        this.setState({
            servicoSelecionado: servicoAtualizado
        })
    }

    handleUpdate = (event: React.FormEvent) => {
        event.preventDefault()
        this.state.empresa.atualizarServicos(this.state.indice, this.state.servicoSelecionado)
        this.props.onSubmit(this.state.empresa)
        this.setState({
            empresa: this.props.empresa,
            indice: -1,
            servicoSelecionado: new Servico('', 0)
        })
        M.toast({ html: 'Serviço atualizado com sucesso!', classes: 'rounded' })
    }

    render() {
        return (
            <><div className="row container">
                <div className='row'>
                    <div className='col s12'>
                        <h4>Atualizar Serviços</h4>
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
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td className="truncate tooltipped" data-position="top" data-tooltip={servico.nome} style={{ maxWidth: "150px", display: "table-cell" }}>{servico.nome}</td>
                                            <td>R$ {servico.valor}</td>
                                            <td><a href='#modal1' className="modal-trigger btn-floating yellow darken-3 btn-small" onClick={() => this.handleCatchIndex(index)}><i className="material-icons">edit</i></a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="modal1" className="modal">
                    <form onSubmit={this.handleUpdate}>
                        <div className="modal-content">
                            <h5>Atualizar Serviço</h5>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="nome" type="text" className="validate" value={this.state.servicoSelecionado.nome} onChange={this.handleChange} />
                                    <label htmlFor="nome" className='active'>Nome do serviço</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="valor" type="number" className="validate" value={this.state.servicoSelecionado.valor} onChange={this.handleChange} />
                                    <label htmlFor="nomeSocial" className='active'>Valor</label>
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button className="modal-close waves-effect waves-red btn-flat">Cancelar</button>
                            <button className="modal-close waves-effect waves-green btn-flat" type='submit'>Concluir</button>
                        </div>
                    </form>
                </div>
            </div>
            </>
        )
    }
}
