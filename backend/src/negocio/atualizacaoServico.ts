import Entrada from "../io/entrada";
import Servico from "../modelo/servico";
import Atualizacao from "./atualizacao";

export default class AtualizacaoServico extends Atualizacao {
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public atualizar(): void {
        try {
            this.servicos.forEach((servico, index) => {
                console.log(`${index + 1} - ${servico.nome} / Valor - R$${servico.valor}`)
            })
            let index = this.entrada.receberNumero(`\nPor favor informe o número do serviço que deseja atualizar: `) - 1
            if (index >= 0 && index < this.servicos.length) {
                let servico = this.servicos[index]
                console.log(`\nNome: ` + servico.nome)
                console.log(`Valor: ` + servico.valor + '\n')
                if (this.entrada.receberTexto(`Deseja atualizar o nome do produto? (s/n) `).toLowerCase() === 's') {
                    let nome = this.entrada.receberTexto(`Por favor informe o novo nome do serviço: `)
                    servico.nome = nome
                }
                if (this.entrada.receberTexto(`Deseja atualizar o valor do produto? (s/n) `).toLowerCase() === 's') {
                    let valor = this.entrada.receberNumero(`Por favor informe o novo valor do serviço, no formato R$0.00: R$`)
                    servico.valor = valor
                }

                console.log(`\nServiço atualizado com sucesso\n`)
            }
            else {
                throw new Error(`Índice inválido`)
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(`\nErro durante a atualização do serviço: ` + error.message + '\n')
            } else {
                console.error(`\nErro durante a atualização do serviço.\n`)
            }
        }
    }
}