import CPF from "./cpf"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"

export default class Cliente {
    private _nome: string
    private _nomeSocial: string
    private _genero: string
    private _cpf: CPF
    private _rgs: Array<RG>
    private _dataCadastro: Date
    private _telefones: Array<Telefone>
    private _produtosConsumidos: Array<Produto>
    private _servicosConsumidos: Array<Servico>

    constructor(nome: string, nomeSocial: string, genero: string, cpf: CPF) {
        this._nome = nome
        this._nomeSocial = nomeSocial
        this._genero = genero
        this._cpf = cpf
        this._rgs = []
        this._dataCadastro = new Date()
        this._telefones = []
        this._produtosConsumidos = []
        this._servicosConsumidos = []
    }

    public get nome() {
        return this._nome;
    }

    public set nome(novoNome: string) {
        this._nome = novoNome;
    }

    public get nomeSocial() {
        return this._nomeSocial;
    }

    public set nomeSocial(novoNomeSocial: string) {
        this._nomeSocial = novoNomeSocial;
    }

    public get genero() {
        return this._genero;
    }

    public set genero(novoGenero: string) {
        this._genero = novoGenero;
    }
    public get cpf() {
        return this._cpf;
    }

    public set cpf(novoCPF: CPF) {
        this._cpf = novoCPF;
    }

    public get rgs() {
        return this._rgs;
    }

    public set rgs(novosRgs: Array<RG>) {
        this._rgs = novosRgs;
    }

    public get dataCadastro() {
        return this._dataCadastro;
    }

    public set dataCadastro(novaDataCadastro: Date) {
        this._dataCadastro = novaDataCadastro;
    }

    public get telefones() {
        return this._telefones;
    }

    public set telefones(novosTelefones: Array<Telefone>) {
        this._telefones = novosTelefones;
    }

    public get produtosConsumidos() {
        return this._produtosConsumidos;
    }

    public set produtosConsumidos(novosProdutosConsumidos: Array<Produto>) {
        this._produtosConsumidos = novosProdutosConsumidos;
    }

    public get servicosConsumidos() {
        return this._servicosConsumidos;
    }

    public set servicosConsumidos(novosServicosConsumidos: Array<Servico>) {
        this._servicosConsumidos = novosServicosConsumidos;
    }

    public consumirProduto(produto: Produto) {
        this._produtosConsumidos.push(produto)
    }

    public consumirServico(servico: Servico) {
        this._servicosConsumidos.push(servico)
    }

}