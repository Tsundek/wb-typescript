import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import RG from "../modelo/rg"
import Telefone from "../modelo/telefone"
import stringData from "../servicos/stringData"
import Cadastro from "./cadastro"

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        try {
            console.log(`\nInício do cadastro do cliente`)
            let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
            let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
            let genero = this.entrada.receberTexto(`Por favor informe o gênero do cliente, no padrão "Masculino" ou "Feminino": `)
            if (genero !== "Masculino" && genero !== "Feminino") {
                throw new Error('Gênero inválido. Por favor, informe "Masculino" ou "Feminino".')
            }
            let valor = this.entrada.receberTexto(`Por favor informe o número do cpf: `)
            if (this.clientes.some(cliente => cliente.getCpf.getValor === valor)) {
                throw new Error('CPF já cadastrado.')
            }
            let data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `)
            let dataEmissao = stringData.converterStringParaData(data)
            let cpf = new CPF(valor, dataEmissao)
            let cliente = new Cliente(nome, nomeSocial, genero, cpf)
            this.adicionarRGS(cliente)
            this.adicionarTelefones(cliente)
            this.clientes.push(cliente)
            console.log(`\nCadastro concluído :)\n`)
        } catch (error) {
            if (error instanceof Error) {
                console.error(`\nErro durante o cadastro do cliente: ` + error.message + '\n')
            } else {
                console.error(`\nErro durante o cadastro do cliente.\n`)
            }
        }
    }

    private adicionarTelefones(cliente: Cliente): void {
        let ddd: string
        let numero: string
        do {
            ddd = this.entrada.receberTexto(`Por favor informe o ddd do telefone do cliente (digite 0 para concluir o cadastro): `)
            if (ddd !== '0') {
                numero = this.entrada.receberTexto(`Por favor informe o número do telefone do cliente: (${ddd}) `)
                let telefone = new Telefone(ddd, numero)
                cliente.adicionarTelefone(telefone)
            }
        } while (ddd !== '0')
    }

    private adicionarRGS(cliente: Cliente): void {
        let valor: string
        let data: string
        do {
            valor = this.entrada.receberTexto(`Por favor informe o número do RG (digite 0 para continuar o cadastro): `)
            if (valor !== '0') {
                if (this.clientes.some(client => client.getRgs.some(rg => rg.getValor === valor))) {
                    console.log('\nRG já cadastrado.\n')
                    continue
                }
                if (cliente.getRgs.some(rg => rg.getValor === valor)) {
                    console.log('\nRG já adicionado a este cliente.\n')
                    continue
                }
                data = this.entrada.receberTexto(`Por favor informe a data de emissão do RG, no padrão dd/mm/yyyy: `)
                let dataEmissao = stringData.converterStringParaData(data)
                let rg = new RG(valor, dataEmissao)
                cliente.adicionarRg(rg)
            }
        } while (valor !== '0')
    }
}