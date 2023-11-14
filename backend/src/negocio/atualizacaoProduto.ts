import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Atualizacao from "./atualizacao";

export default class AtualizacaoProduto extends Atualizacao {
    private produtos: Array<Produto>
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    public atualizar(): void {
        let nome = this.entrada.receberTexto(`Por favor informe o nome do produto que deseja atualizar: `)
        let produto = this.produtos.find(produto => produto.nome === nome)

        if (produto) {
            console.log(`\nNome: ` + produto.nome)
            console.log(`Valor: ` + produto.valor + '\n')
            let nome = this.entrada.receberTexto(`Por favor informe o novo nome do produto: `)
            produto.nome = nome

            console.log(`\nProduto atualizado com sucesso\n`)
        }
        else {
            console.log(`\nProduto não encontrado\n`)
        }
    }
}