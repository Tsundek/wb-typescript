import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Cadastro from "./cadastro";

export default class CadastroProduto extends Cadastro {
    private produtos: Array<Produto>
    private entrada: Entrada
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro de um produto`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do produto: `)
        let valor = this.entrada.receberNumero(`Por favor informe o valor do produto, no padrão 0.00: R$ `)
        let produto = new Produto()
        produto.nome = nome
        produto.valor = valor

        this.produtos.push(produto)
        console.log(`\nCadastro concluído :)\n`);
    }
}