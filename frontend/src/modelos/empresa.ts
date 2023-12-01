import Cliente from "./cliente"
import Produto from "./produto"
import Servico from "./servico"

export default class Empresa {
    private _clientes: Array<Cliente>
    private _produtos: Array<Produto>
    private _servicos: Array<Servico>
    constructor() {
        this._clientes = []
        this._produtos = []
        this._servicos = []
    }
    public get getClientes() {
        return this._clientes
    }
    public addClientes(cliente: Cliente) {
        this._clientes.push(cliente)
    }
    public deletarClientes(index: number) {
        if (index >= 0 && index < this._clientes.length) {
            this._clientes.splice(index, 1)
        } else {
            M.toast({ html: 'Indice inválido!', classes: 'rounded' })
        }
    }
    public atualizarClientes(index: number, cliente: Cliente) {
        if (index >= 0 && index < this._clientes.length) {
            this._clientes[index] = cliente
        } else {
            M.toast({ html: 'Indice inválido!', classes: 'rounded' })
        }
    }
    public get getProdutos() {
        return this._produtos
    }
    public addProdutos(produto: Produto) {
        this._produtos.push(produto)
    }
    public deletarProdutos(index: number) {
        if (index >= 0 && index < this._produtos.length) {
            this._produtos.splice(index, 1)
        } else {
            M.toast({ html: 'Indice inválido!', classes: 'rounded' })
        }
    }
    public atualizarProdutos(index: number, produto: Produto) {
        if (index >= 0 && index < this._produtos.length) {
            this._produtos[index] = produto
        } else {
            M.toast({ html: 'Indice inválido!', classes: 'rounded' })
        }
    }
    public get getServicos() {
        return this._servicos
    }
    public addServicos(servico: Servico) {
        this._servicos.push(servico)
    }
    public deletarServicos(index: number) {
        if (index >= 0 && index < this._servicos.length) {
            this._servicos.splice(index, 1)
        } else {
            M.toast({ html: 'Indice inválido!', classes: 'rounded' })
        }
    }
    public atualizarServicos(index: number, servico: Servico) {
        if (index >= 0 && index < this._servicos.length) {
            this._servicos[index] = servico
        } else {
            M.toast({ html: 'Indice inválido!', classes: 'rounded' })
        }
    }

    public registrarConsumo(cliente: Cliente, produto?: Produto, servico?: Servico) {
        if (produto) {
            cliente.consumirProduto(produto)
        }
        else if (servico) {
            cliente.consumirServico(servico)
        } else {
            M.toast({ html: 'Selecione um produto ou serviço!', classes: 'rounded' })
        }
        const index = this._clientes.findIndex(c => c === cliente)
        if (index !== -1) {
            this._clientes[index] = cliente
        }
    }

    public topMenosProdutosConsumidos() {
        let consumoProdutos: Map<Produto, number> = new Map<Produto, number>()
        this._clientes.forEach(cliente => {
            cliente.produtosConsumidos.forEach(produto => {
                if (consumoProdutos.has(produto)) {
                    consumoProdutos.set(produto, consumoProdutos.get(produto)! + 1)
                } else {
                    consumoProdutos.set(produto, 1)
                }
            })
        })

        let produtosOrdenados: Array<[Produto, number]> = Array.from(consumoProdutos).sort((a, b) => a[1] - b[1])
        return produtosOrdenados.slice(0, 10)
    }

    public topMaisProdutosConsumidos() {
        let consumoProdutos: Map<Produto, number> = new Map<Produto, number>()
        this._clientes.forEach(cliente => {
            cliente.produtosConsumidos.forEach(produto => {
                if (consumoProdutos.has(produto)) {
                    consumoProdutos.set(produto, consumoProdutos.get(produto)! + 1)
                } else {
                    consumoProdutos.set(produto, 1)
                }
            })
        })

        let produtosOrdenados: Array<[Produto, number]> = Array.from(consumoProdutos).sort((a, b) => b[1] - a[1])
        return produtosOrdenados.slice(0, 10)
    }

    public topMenosServicosConsumidos() {
        let consumoServicos: Map<Servico, number> = new Map<Servico, number>()
        this._clientes.forEach(cliente => {
            cliente.servicosConsumidos.forEach(servico => {
                if (consumoServicos.has(servico)) {
                    consumoServicos.set(servico, consumoServicos.get(servico)! + 1)
                } else {
                    consumoServicos.set(servico, 1)
                }
            })
        })

        let servicosOrdenados: Array<[Produto, number]> = Array.from(consumoServicos).sort((a, b) => a[1] - b[1])
        return servicosOrdenados.slice(0, 10)
    }

    public topMaisServicosConsumidos() {
        let consumoServicos: Map<Servico, number> = new Map<Servico, number>()
        this._clientes.forEach(cliente => {
            cliente.servicosConsumidos.forEach(servico => {
                if (consumoServicos.has(servico)) {
                    consumoServicos.set(servico, consumoServicos.get(servico)! + 1)
                } else {
                    consumoServicos.set(servico, 1)
                }
            })
        })

        let servicosOrdenados: Array<[Produto, number]> = Array.from(consumoServicos).sort((a, b) => b[1] - a[1])
        return servicosOrdenados.slice(0, 10)
    }

    public topClientesPorValorConsumido() {
        let consumoClientes: Map<Cliente, number> = new Map<Cliente, number>()
        this._clientes.forEach(cliente => {
            let valorTotalConsumido = 0
            cliente.produtosConsumidos.forEach(produto => {
                valorTotalConsumido += produto.valor
            })
            cliente.servicosConsumidos.forEach(servico => {
                valorTotalConsumido += servico.valor
            })
            consumoClientes.set(cliente, valorTotalConsumido)
        })

        let clientesOrdenados: Array<[Cliente, number]> = Array.from(consumoClientes).sort((a, b) => b[1] - a[1])
        return clientesOrdenados.slice(0, 5)
    }

    public totalConsumo(item: Produto | Servico) {
        let totalConsumido = 0
        this._clientes.forEach(cliente => {
            cliente.produtosConsumidos.forEach(produtoConsumido => {
                if (produtoConsumido.nome === item.nome) {
                    totalConsumido++
                }
            })
            cliente.servicosConsumidos.forEach(servicoConsumido => {
                if (servicoConsumido.nome === item.nome) {
                    totalConsumido++;
                }
            })
        })
        return totalConsumido
    }
}