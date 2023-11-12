import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import Produto from "../modelo/produto"
import Consumo from "./consumo"

export default class ConsumirProdutos extends Consumo {
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>, produtos: Array<Produto>) {
        super()
        this.clientes = clientes
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    public consumir(): void {
        let cpf = this.entrada.receberTexto(`Por favor informe o CPF do cliente: `)
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf)
        if (cliente) {
            console.log(`\nCliente: `)
            console.log(`Nome: ` + cliente.nome)
            console.log(`Nome social: ` + cliente.nomeSocial)
            console.log('\n')

            let nomeProduto = this.entrada.receberTexto(`Por favor informe o nome do produto consumido: `)
            let produto = this.produtos.find(produto => produto.nome === nomeProduto)
            if (produto) {
                let produtoConsumido = cliente.getProdutosConsumidos.find(produtoConsumido => produtoConsumido.nome === produto?.nome)
                if (produtoConsumido) {
                    produtoConsumido.quantidade += 1
                } else {
                    let novoProduto = {...produto}
                    novoProduto.quantidade = 1
                    cliente.getProdutosConsumidos.push(novoProduto)
                }
                console.log(`\nProduto consumido registrado com sucesso\n`)
            } else {
                console.log(`\nProduto não encontrado\n`)
            }
        } else {
            console.log(`\nCliente não encontrado\n`)
        }
    }
}