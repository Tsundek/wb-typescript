import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemCliente extends Listagem {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }
    public listar(): void {
        console.log(`\nCliente`);
        console.log(`Data de cadastro: ` + this.cliente.getDataCadastro)
        console.log(`Nome: ` + this.cliente.nome);
        console.log(`Nome social: ` + this.cliente.nomeSocial);
        console.log(`Gênero: ` + this.cliente.genero);
        console.log(`CPF: ` + this.cliente.getCpf.getValor);
        console.log(`RGs: ` + this.cliente.getRgs.map((rg, index) => `RG ${index + 1}: ` + rg.getValor).join(', '))
        console.log(`Telefones: ` + this.cliente.getTelefones.map((telefone, index) => `Telefone ${index + 1}: (${telefone.getDdd}) ` + telefone.getNumero).join(', '))
        console.log(`\n`);
    }
}