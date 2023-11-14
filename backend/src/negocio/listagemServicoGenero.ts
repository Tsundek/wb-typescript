import Cliente from "../modelo/cliente"
import Listagem from "./listagem"

export default class ListagemServicoGenero extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        let contagemServicosMasculino: { [key: string]: number } = {}
        let contagemServicosFeminino: { [key: string]: number } = {}

        this.clientes.forEach(cliente => {
            let contagemServicos = cliente.genero === 'Masculino' ? contagemServicosMasculino : contagemServicosFeminino
            cliente.getServicosConsumidos.forEach(servico => {
                contagemServicos[servico.nome] = (contagemServicos[servico.nome] || 0) + servico.quantidade
            })
        })
        let servicosOrdenadosMasculino = Object.entries(contagemServicosMasculino).sort((a, b) => b[1] - a[1])
        let servicosOrdenadosFeminino = Object.entries(contagemServicosFeminino).sort((a, b) => b[1] - a[1])

        console.log(`\nLista de serviços mais consumidos por clientes masculinos:`)
        servicosOrdenadosMasculino.forEach(([nome, quantidade]) => {
            console.log(`Serviço: ` + nome)
            console.log(`Quantidade: ` + quantidade)
            console.log(`--------------------------------------`);
        })
        console.log(`\nLista dos serviços mais consumidos por clientes femininos:`)
        servicosOrdenadosFeminino.forEach(([nome, quantidade]) => {
            console.log(`Serviço: ` + nome)
            console.log(`Quantidade: ` + quantidade)
            console.log(`--------------------------------------`);
        })
        console.log(`\n`)
    }
}