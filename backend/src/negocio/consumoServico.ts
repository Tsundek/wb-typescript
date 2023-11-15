import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import Servico from "../modelo/servico"
import Consumo from "./consumo"
import ListagemCliente from "./listagemCliente"

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
        try {
            console.log('\n')
            this.clientes.forEach((cliente, index) => {
                console.log(`${index + 1} - ${cliente.nome}`)
            })
            let index = this.entrada.receberNumero(`\nPor favor informe o número do cliente que deseja atualizar os dados: `) - 1
            if (index >= 0 && index < this.clientes.length) {
                let cliente = this.clientes[index]
                new ListagemCliente(cliente).listar()

                this.servicos.forEach((servico, index) => {
                    console.log(`${index + 1} - ${servico.nome} / Valor - R$${servico.valor}`)
                })
                let index2 = this.entrada.receberNumero(`\nPor favor informe o número do serviço que deseja atualizar: `) - 1
                if (index2 >= 0 && index2 < this.servicos.length) {
                    let servico = this.servicos[index]
                    let servicoConsumido = cliente.getServicosConsumidos.find(servicoConsumido => servicoConsumido.nome === servico?.nome)
                    if (servicoConsumido) {
                        servicoConsumido.quantidade += 1
                    } else {
                        let novoServico = { ...servico }
                        novoServico.quantidade = 1
                        cliente.getServicosConsumidos.push(novoServico)
                    }
                    console.log(`\nServiço consumido registrado com sucesso\n`)
                }
                else {
                    throw new Error(`Índice inválido`)
                }
            } else {
                throw new Error('Índice inválido')
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(`\nErro durante o consumo do serviço: ` + error.message + '\n')
            } else {
                console.error(`\nErro durante o consumo do serviço.\n`)
            }
        }
    }
}