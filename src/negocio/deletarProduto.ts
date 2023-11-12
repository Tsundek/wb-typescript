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
        let nome = this.entrada.receberTexto(`Por favor informe o nome do produto que deseja deletar: `)
        let index = this.produtos.findIndex(produto => produto.nome === nome)
        if (index !== -1) {
            this.produtos.splice(index, 1)
            console.log('\nProduto deletado com sucesso\n')
        } else {
            console.log('\nProduto não encontrado\n')
        }
    }
}