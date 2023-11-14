import Entrada from "../io/entrada";
import Servico from "../modelo/servico";
import Cadastro from "./cadastro";

export default class CadastroServico extends Cadastro {
    private servicos: Array<Servico>
    private entrada: Entrada
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro de um serviço`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do servico: `)
        let valor = this.entrada.receberNumero(`Por favor informe o valor do serviço, no padrão 0.00: R$ `)
        let servico = new Servico()
        servico.nome = nome
        servico.valor = valor

        this.servicos.push(servico)
        console.log(`\nCadastro concluído :)\n`);
    }
}