import Cliente from "../modelo/cliente"
import Listagem from "./listagem"

export default class ListagemProdutoGenero extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        let contagemProdutosMasculino: { [key: string]: number } = {}
        let contagemProdutosFeminino: { [key: string]: number } = {}

        this.clientes.forEach(cliente => {
            let contagemProdutos = cliente.genero === 'Masculino' ? contagemProdutosMasculino : contagemProdutosFeminino
            cliente.getProdutosConsumidos.forEach(produto => {
                contagemProdutos[produto.nome] = (contagemProdutos[produto.nome] || 0) + produto.quantidade
            })
        })
        let produtosOrdenadosMasculino = Object.entries(contagemProdutosMasculino).sort((a, b) => b[1] - a[1])
        let produtosOrdenadosFeminino = Object.entries(contagemProdutosFeminino).sort((a, b) => b[1] - a[1])

        console.log(`\nLista de produtos mais consumidos por clientes masculinos:`)
        produtosOrdenadosMasculino.forEach(([nome, quantidade]) => {
            console.log(`Produto: ` + nome)
            console.log(`Quantidade: ` + quantidade)
            console.log(`--------------------------------------`)
        })
        console.log(`\nLista dos produtos mais consumidos por clientes femininos:`)
        produtosOrdenadosFeminino.forEach(([nome, quantidade]) => {
            console.log(`Produto: ` + nome)
            console.log(`Quantidade: ` + quantidade)
            console.log(`--------------------------------------`)
        })
        console.log(`\n`)
    }
}