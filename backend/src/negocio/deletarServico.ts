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
        let nome = this.entrada.receberTexto(`Por favor informe o nome do serviço que deseja deletar: `)
        let index = this.servicos.findIndex(servico => servico.nome === nome)
        if (index !== -1) {
            this.servicos.splice(index, 1)
            console.log('\nServiço deletado com sucesso\n')
        } else {
            console.log('\nServiço não encontrado\n')
        }
    }
}