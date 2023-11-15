import CPF from "./cpf"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"

export default class Cliente {
    public nome: string
    public nomeSocial: string
    public genero: string
    private cpf: CPF
    private rgs: Array<RG>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<Produto>
    private servicosConsumidos: Array<Servico>
    constructor(nome: string, nomeSocial: string, genero: string, cpf: CPF) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.genero = genero
        this.cpf = cpf
        this.rgs = []
        this.dataCadastro = new Date()
        this.telefones = []
        this.produtosConsumidos = []
        this.servicosConsumidos = []
    }
    public get getCpf(): CPF {
        return this.cpf
    }
    public get getRgs(): Array<RG> {
        return this.rgs
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro
    }
    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }
    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    public set setCpf(cpf: CPF) {
        this.cpf = cpf
    }
    public adicionarTelefone(telefone: Telefone): void {
        this.telefones.push(telefone)
    }
    public adicionarRg(rg: RG): void {
        this.rgs.push(rg)
    }
    public atualizarRg(index: number, rg: RG): void {
        if (index >= 0 && index < this.rgs.length) {
            this.rgs[index] = rg
        } else {
            console.log('Índice inválido')
        }
    }
    public atualizarTelefone(index: number, telefone: Telefone): void {
        if (index >= 0 && index < this.telefones.length) {
            this.telefones[index] = telefone
        } else {
            console.log('Índice inválido')
        }
    }
}