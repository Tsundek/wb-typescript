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
        try {
            console.log(`\nInício do cadastro de um serviço`);
            let nome = this.entrada.receberTexto(`Por favor informe o nome do servico: `)
            if (this.servicos.some(servico => servico.nome === nome)) {
                throw new Error('Serviço já cadastrado.')
            }
            let valor = this.entrada.receberNumero(`Por favor informe o valor do serviço, no padrão 0.00: R$ `)
            let servico = new Servico(nome, valor)

            this.servicos.push(servico)
            console.log(`\nCadastro concluído :)\n`);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`\nErro durante o cadastro do serviço: ` + error.message + '\n')
            } else {
                console.error(`\nErro durante o cadastro do serviço.\n`)
            }
        }
    }
}