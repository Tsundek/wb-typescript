import Cliente from "../modelo/cliente"
import Listagem from "./listagem"

export default class ListagemTopClientesValor extends Listagem{
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        let clientesOrdenados = this.clientes.sort((a, b) => {
            let totalValorA = a.getProdutosConsumidos.reduce((total, produto) => total + produto.valor * produto.quantidade, 0) +
                              a.getServicosConsumidos.reduce((total, servico) => total + servico.valor * servico.quantidade, 0)
            let totalValorB = b.getProdutosConsumidos.reduce((total, produto) => total + produto.valor * produto.quantidade, 0) +
                              b.getServicosConsumidos.reduce((total, servico) => total + servico.valor * servico.quantidade, 0)
            return totalValorB - totalValorA
        })
        console.log(`\nLista dos 5 clientes que mais consumiram em valor:`)
        clientesOrdenados.slice(0, 5).forEach(cliente => {
            console.log(`Nome: ` + cliente.nome)
            console.log(`Valor total de consumo: ` + 
                (cliente.getProdutosConsumidos.reduce((total, produto) => total + produto.valor, 0) +
                 cliente.getServicosConsumidos.reduce((total, servico) => total + servico.valor, 0)))
            console.log(`--------------------------------------`)
        })
        console.log(`\n`)
    }
}
