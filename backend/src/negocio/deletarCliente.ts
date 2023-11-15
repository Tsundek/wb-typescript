import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import Deletar from "./deletar"

export default class DeletarCliente extends Deletar {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public deletar(): void {
        console.log('\n')
        this.clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}`)
        })
        let cliente = this.entrada.receberNumero(`\nPor favor informe o número do cliente que deseja deletar: `)
        if (cliente > 0 && cliente <= this.clientes.length) {
            this.clientes.splice(cliente - 1, 1)
            console.log('\nCliente deletado com sucesso\n')
        } else {
            console.log('\nNúmero de cliente inválido\n')
        }
    }
}