import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import Produto from "../modelo/produto"
import Consumo from "./consumo"
import ListagemCliente from "./listagemCliente"

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
        try {
            this.clientes.forEach((cliente, index) => {
                console.log(`${index + 1} - ${cliente.nome}`)
            })
            let index = this.entrada.receberNumero(`\nPor favor informe o número do cliente: `) - 1
            if (index >= 0 && index < this.clientes.length) {
                let cliente = this.clientes[index]
                new ListagemCliente(cliente).listar()


                console.log('\n')
                this.produtos.forEach((produto, index) => {
                    console.log(`${index + 1} - ${produto.nome} / Valor - R$${produto.valor}`)
                })
                let index2 = this.entrada.receberNumero(`\nPor favor informe o número do produto consumido: `) - 1
                if (index2 >= 0 && index2 < this.produtos.length) {
                    let produto = this.produtos[index]
                    let produtoConsumido = cliente.getProdutosConsumidos.find(produtoConsumido => produtoConsumido.nome === produto?.nome)
                    if (produtoConsumido) {
                        produtoConsumido.quantidade += 1
                    } else {
                        let novoProduto = { ...produto }
                        novoProduto.quantidade = 1
                        cliente.getProdutosConsumidos.push(novoProduto)
                    }
                    console.log(`\nProduto consumido registrado com sucesso\n`)
                } else {
                    throw new Error('Índice inválido')
                }
            } else {
                throw new Error('Índice inválido')
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(`\nErro durante o consumo do produto: ` + error.message + '\n')
            } else {
                console.error(`\nErro durante o consumo do produto.\n`)
            }
        }
    }
}