import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemClienteGenero extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        let clientesMasculinos = this.clientes.filter(cliente => cliente.genero === 'Masculino')
        let clientesFemininos = this.clientes.filter(cliente => cliente.genero === 'Feminino')

        console.log(`\nLista de clientes do gênero masculino:`)
        clientesMasculinos.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome)
            console.log(`Nome social: ` + cliente.nomeSocial)
            console.log(`CPF: ` + cliente.getCpf.getValor)
            console.log(`Gênero: ` + cliente.genero)
            console.log(`--------------------------------------`)
        })
        console.log(`\n`)

        console.log(`\nLista de clientes do gênero feminino:`)
        clientesFemininos.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome)
            console.log(`Nome social: ` + cliente.nomeSocial)
            console.log(`CPF: ` + cliente.getCpf.getValor)
            console.log(`Gênero: ` + cliente.genero)
            console.log(`--------------------------------------`)
        })
        console.log(`\n`)
    }
}