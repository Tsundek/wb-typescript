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
        try {
            console.log('\n')
            this.produtos.forEach((produto, index) => {
                console.log(`${index + 1} - ${produto.nome} / Valor - R$${produto.valor}`)
            })
            let index = this.entrada.receberNumero(`\nPor favor informe o número do produto que deseja atualizar: `) - 1
            if (index >= 0 && index < this.produtos.length) {
                let produto = this.produtos[index]
                console.log(`\nNome: ` + produto.nome)
                console.log(`Valor: ` + produto.valor + '\n')
                if (this.entrada.receberTexto(`Deseja atualizar o nome do produto? (s/n) `).toLowerCase() === 's') {
                    let nome = this.entrada.receberTexto(`Por favor informe o novo nome do produto: `)
                    if (this.produtos.some(produto => produto.nome === nome)) {
                        throw new Error('Produto já cadastrado.')
                    }
                    produto.nome = nome
                }
                if (this.entrada.receberTexto(`Deseja atualizar o valor do produto? (s/n) `).toLowerCase() === 's') {
                    let valor = this.entrada.receberNumero(`Por favor informe o novo valor do produto, no formato R$0.00: R$`)
                    produto.valor = valor
                }

                console.log(`\nProduto atualizado com sucesso\n`)
            } else {
                throw new Error('Índice inválido')
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(`\nErro durante a atualização do produto: ` + error.message + '\n')
            } else {
                console.error(`\nErro durante a atualização do produto.\n`)
            }
        }
    }
}