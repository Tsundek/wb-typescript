import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Atualizacao from "./atualizacao";

export default class AtualizacaoCliente extends Atualizacao {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public atualizar(): void {
        let cpf = this.entrada.receberTexto(`Por favor informe o número do cpf do cliente que deseja atualizar os dados: `)
        let cliente = this.clientes.find(cliente => cliente.getCpf.getValor === cpf)

        if (cliente) {
            console.log(`\nNome: ` + cliente.nome)
            console.log(`Nome Social: ` + cliente.nomeSocial)
            console.log(`Gênero: ` + cliente.genero + '\n')

            let nome = this.entrada.receberTexto(`Por favor informe o novo nome do cliente: `)
            let nomeSocial = this.entrada.receberTexto(`Por favor informe o novo nome social do cliente: `)
            let genero = this.entrada.receberTexto(`Por favor informe o novo gênero do cliente: `)
            cliente.nome = nome
            cliente.nomeSocial = nomeSocial
            cliente.genero = genero

            console.log(`\nCliente atualizado com sucesso\n`)
        }
        else {
            console.log(`\nCliente não encontrado\n`)
        }
    }
}