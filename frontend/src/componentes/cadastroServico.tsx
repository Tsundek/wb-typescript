import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import Empresa from '../modelos/empresa'
import BotaoServico from './btnServico'
import Servico from '../modelos/servico'

type props = {
    tema: string,
    onSubmit: (empresa: Empresa) => void
    empresa: Empresa
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
}

export default class CadastroServico extends React.Component<props> {
    componentDidMount() {
        M.FormSelect.init(document.querySelectorAll('select'))
        M.CharacterCounter.init(document.querySelectorAll('input'))
    }
    state = {
        servico: new Servico('', 0),
        empresa: this.props.empresa

    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id as 'nome' | 'valor'
        const value = event.target.value
        if (id === 'valor') {
            this.setState({
                servico: {
                    ...this.state.servico,
                    [id]: parseFloat(value)
                }
            })
        } else {
            this.setState({
                servico: {
                    ...this.state.servico,
                    [id]: value
                }
            })
        }
    }


    handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        this.state.empresa.addServicos(this.state.servico)
        this.props.onSubmit(this.state.empresa)
        this.setState({
            servico: new Servico('', 0),
            empresa: this.state.empresa
        })
        M.toast({ html: 'Serviço cadastrado com sucesso!', classes: 'rounded' })
    }

    render() {
        let estiloBotao = `btn waves-effect waves-light ${this.props.tema}`
        return (
            <div className="container">
                <div className="row">
                    <BotaoServico selecionarView={this.props.selecionarView} />
                    <form className="col s12" onSubmit={this.handleSubmit}>
                        <h4>Cadastro de Serviços</h4>
                        <div className="row">
                            <div className="input-field col s6">
                                <input required id="nome" type="text" className="validate" value={this.state.servico.nome || ''} onChange={this.handleChange} />
                                <label htmlFor="nome">Nome do serviço<span className="red-text"> *</span></label>
                            </div>
                            <div className="input-field col s6">
                                <input id="valor" type="number" className="validate" value={this.state.servico.valor || ''} onChange={this.handleChange} />
                                <label htmlFor="valor">Valor<span className="red-text"> *</span></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button className={estiloBotao} type="submit" name="action" disabled={false}>Submit
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
