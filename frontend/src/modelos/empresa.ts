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
    public deletarClientes(index: number){
        if (index >= 0 && index < this._clientes.length) {
            this._clientes.splice(index, 1)
        } else {
            alert ("Indice inválido")
        }
    }
    public atualizarClientes(index: number, cliente: Cliente){
        if (index >= 0 && index < this._clientes.length) {
            this._clientes[index] = cliente
        } else {
            alert ("Indice inválido")
        }
    }
    public get getProdutos() {
        return this._produtos
    }
    public get getServicos() {
        return this._servicos
    }
}