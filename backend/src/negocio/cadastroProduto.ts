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
        try {
            console.log(`\nInício do cadastro de um produto`);
            let nome = this.entrada.receberTexto(`Por favor informe o nome do produto: `)
            if (this.produtos.some(produto => produto.nome === nome)) {
                throw new Error('Produto já cadastrado.')
            }
            let valor = this.entrada.receberNumero(`Por favor informe o valor do produto, no padrão 0.00: R$ `)
            let produto = new Produto(nome, valor)

            this.produtos.push(produto)
            console.log(`\nCadastro concluído :)\n`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`\nErro durante o cadastro do produto: ` + error.message + '\n')
            } else {
                console.error(`\nErro durante o cadastro do produto.\n`)
            }
        }
    }
}