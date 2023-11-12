import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import Servico from "../modelo/servico"
import Consumo from "./consumo"

export default class ConsumirServicos extends Consumo {
    private clientes: Array<Cliente>
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>, servicos: Array<Servico>) {
        super()
        this.clientes = clientes
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public consumir(): void {
        let cpf = this.entrada.receberTexto(`Por favor informe o CPF do cliente: `)
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf)
        if (cliente) {
            console.log(`\nCliente: `)
            console.log(`Nome: ` + cliente.nome)
            console.log(`Nome social: ` + cliente.nomeSocial)
            console.log('\n')

            let nomeServico = this.entrada.receberTexto(`Por favor informe o nome do serviço consumido: `)
            let servico = this.servicos.find(servico => servico.nome === nomeServico)
            if (servico) {
                let servicoConsumido = cliente.getServicosConsumidos.find(servicoConsumido => servicoConsumido.nome === servico?.nome)
                if (servicoConsumido) {
                    servicoConsumido.quantidade += 1
                } else {
                    let novoServico = {...servico}
                    novoServico.quantidade = 1
                    cliente.getServicosConsumidos.push(novoServico)
                }
                console.log(`\nServiço consumido registrado com sucesso\n`)
            } else {
                console.log(`\nServiço não encontrado\n`)
            }
        } else {
            console.log(`\nCliente não encontrado\n`)
        }
    }
}