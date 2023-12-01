import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import Empresa from '../modelos/empresa'
import Produto from '../modelos/produto'

type props = {
    tema: string,
    onSubmit: (empresa: Empresa) => void
    empresa: Empresa
    selecionarView: (novaTela: string, evento: React.MouseEvent) => void
}

export default class AtualizacaoProduto extends React.Component<props | Readonly<props>, { empresa: Empresa, indice: number, produtoSelecionado: Produto }> {
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
            produtoSelecionado: new Produto('', 0)
        }
    }

    handleCatchIndex = (index: number) => {
        const produto = this.props.empresa.getProdutos[index]
        this.setState({
            indice: index,
            produtoSelecionado: produto
        })
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        const id = event.target.id as 'nome' | 'valor'
        const value = event.target.value
        const produtoAtualizado = new Produto(
            this.state.produtoSelecionado.nome,
            this.state.produtoSelecionado.valor
        )

        if (id === 'nome') {
            produtoAtualizado.nome = value
        } else {
            produtoAtualizado.valor = parseFloat(value)
        }

        this.setState({
            produtoSelecionado: produtoAtualizado
        })
    }

    handleUpdate = (event: React.FormEvent) => {
        event.preventDefault()
        this.state.empresa.atualizarProdutos(this.state.indice, this.state.produtoSelecionado)
        this.props.onSubmit(this.state.empresa)
        this.setState({
            empresa: this.props.empresa,
            indice: -1,
            produtoSelecionado: new Produto('', 0)
        })
        M.toast({ html: 'Produto atualizado com sucesso!', classes: 'rounded' })
    }

    render() {
        return (
            <><div className="row container">
                <div className='row'>
                    <div className='col s12'>
                        <h4>Atualizar Produtos</h4>
                        <div style={{ maxHeight: 1080, overflowY: 'auto' }}>
                            <table className='highlight col s12'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nome</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.empresa.getProdutos.map((produto, index) => (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td className="truncate tooltipped" data-position="top" data-tooltip={produto.nome} style={{ maxWidth: "150px", display: "table-cell" }}>{produto.nome}</td>
                                            <td>R$ {produto.valor}</td>
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
                            <h5>Atualizar Produto</h5>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input placeholder="A" id="nome" type="text" className="validate" value={this.state.produtoSelecionado.nome} onChange={this.handleChange} />
                                    <label htmlFor="nome">Nome do Produto</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="valor" type="number" className="validate" value={this.state.produtoSelecionado.valor} onChange={this.handleChange} />
                                    <label htmlFor="nomeSocial">Valor</label>
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
