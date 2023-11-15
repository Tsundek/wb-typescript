export default class Servico {
    public nome: string
    public quantidade: number
    public valor: number
    constructor(nome: string, valor: number) {
        this.quantidade = 0
        this.nome = nome
        this.valor = valor
    }
}