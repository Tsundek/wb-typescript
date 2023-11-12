import Cliente from "../modelo/cliente"
import totalConsumo from "../servicos/totalServicos"
import Listagem from "./listagem"

export default class ListagemTopClienteMenosServico extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        let clientesOrdenados = this.clientes.sort((a, b) =>
            totalConsumo.totalServicosConsumidos(a) - totalConsumo.totalServicosConsumidos(b)
        )
        console.log(`\nLista dos 10 clientes que menos consumiram serviços:`)
        clientesOrdenados.slice(0, 10).forEach(cliente => {
            console.log(`Quantidade de serviços consumidos: ` + totalConsumo.totalServicosConsumidos(cliente))
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`Gênero: ` + cliente.genero);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            console.log(`--------------------------------------`);
        })
        console.log('\n')
    }
}