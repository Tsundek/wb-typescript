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
        let cpf = this.entrada.receberTexto(`Por favor informe o número do cpf do cliente que deseja deletar: `)
        let index = this.clientes.findIndex(cliente => cliente.getCpf.getValor === cpf)
        if (index !== -1) {
            this.clientes.splice(index, 1)
            console.log('\nCliente deletado com sucesso\n')
        } else {
            console.log('\nCliente não encontrado\n')
        }
    }
}