export default class Produto {
    public nome: string
    public quantidade: number
    public valor: number
    constructor(nome: string, valor: number) {
        if (valor <= 0) {
            throw new Error("\nO valor do produto deve ser maior que zero.\n")
        }
        this.quantidade = 0
        this.nome = nome
        this.valor = valor
    }
}