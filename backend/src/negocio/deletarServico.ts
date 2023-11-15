import Entrada from "../io/entrada"
import Servico from "../modelo/servico"
import Deletar from "./deletar"

export default class DeletarServico extends Deletar {
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public deletar(): void {
        console.log('\n')
        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1} - ${servico.nome} / Valor - R$${servico.valor}`)
        })
        let servico = this.entrada.receberNumero(`\nPor favor informe o número do serviço que deseja deletar: `)
        if (servico > 0 && servico <= this.servicos.length) {
            this.servicos.splice(servico - 1, 1)
            console.log('\nServiço deletado com sucesso\n')
        } else {
            console.log('\nNúmero de serviço inválido\n')
        }
    }
}