import Cliente from "../modelo/cliente"
import Listagem from "./listagem"

export default class ListagemServicosMaisConsumidos extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        let contagemServicos: { [key: string]: number } = {}
        this.clientes.forEach(cliente => {
            cliente.getServicosConsumidos.forEach(servico => {
                contagemServicos[servico.nome] = (contagemServicos[servico.nome] || 0) + servico.quantidade
            })
        })
        let servicosOrdenados = Object.entries(contagemServicos).sort((a, b) => b[1] - a[1])

        console.log(`\nLista dos serviços mais consumidos:`)
        servicosOrdenados.forEach(([nome, quantidade]) => {
            console.log(`Serviço: ` + nome)
            console.log(`Quantidade: ` + quantidade)
            console.log(`--------------------------------------`);
        })
        console.log(`\n`)
    }
}