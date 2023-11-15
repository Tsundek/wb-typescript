import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        console.log(`\nLista de todos os clientes:`);
        this.clientes.forEach(cliente => {
            console.log(`Data de cadastro: ` + cliente.getDataCadastro)
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`Gênero: ` + cliente.genero);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            console.log(`RGs: ` + cliente.getRgs.map((rg, index) => `RG ${index + 1}: ` + rg.getValor).join(', '))
            console.log(`Telefones: ` + cliente.getTelefones.map((telefone, index) => `Telefone ${index + 1}: (${telefone.getDdd}) ` + telefone.getNumero).join(', '))
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}