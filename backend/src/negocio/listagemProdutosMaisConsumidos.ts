import Cliente from "../modelo/cliente"
import Listagem from "./listagem"

export default class ListagemProdutosMaisConsumidos extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        let contagemProdutos: { [key: string]: number } = {}
        this.clientes.forEach(cliente => {
            cliente.getProdutosConsumidos.forEach(produto => {
                contagemProdutos[produto.nome] = (contagemProdutos[produto.nome] || 0) + produto.quantidade
            })
        })
        let produtosOrdenados = Object.entries(contagemProdutos).sort((a, b) => b[1] - a[1])

        console.log(`\nLista dos produtos mais consumidos:`)
        produtosOrdenados.forEach(([nome, quantidade]) => {
            console.log(`Produto: ` + nome)
            console.log(`Quantidade: ` + quantidade)
            console.log(`--------------------------------------`);
        })
        console.log(`\n`)
    }
}