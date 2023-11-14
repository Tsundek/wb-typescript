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
        let cpf = this.entrada.receberTexto(`Por favor informe o nome do serviço que deseja atualizar: `)
        let servico = this.servicos.find(servico => servico.nome === cpf)

        if (servico) {
            console.log(`\nNome: ` + servico.nome)
            console.log(`Valor: ` + servico.valor + '\n')
            let nome = this.entrada.receberTexto(`Por favor informe o novo nome do serviço: `)
            let valor = this.entrada.receberNumero(`Por favor informe o novo valor do serviço: `)
            servico.nome = nome
            servico.valor = valor

            console.log(`\nServiço atualizado com sucesso\n`)
        }
        else {
            console.log(`\nServiço não encontrado\n`)
        }
    }
}