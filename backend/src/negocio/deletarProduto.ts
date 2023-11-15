import Entrada from "../io/entrada"
import Produto from "../modelo/produto"
import Deletar from "./deletar"

export default class DeletarProduto extends Deletar {
    private produtos: Array<Produto>
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    public deletar(): void {
        console.log('\n')
        this.produtos.forEach((produto, index) => {
            console.log(`${index + 1} - ${produto.nome} / Valor - R$${produto.valor}`)
        })
        let produto = this.entrada.receberNumero(`\nPor favor informe o número do produto que deseja deletar: `)
        if (produto > 0 && produto <= this.produtos.length) {
            this.produtos.splice(produto - 1, 1)
            console.log('\nProduto deletado com sucesso\n')
        } else {
            console.log('\nNúmero de produto inválido\n')
        }
    }
}