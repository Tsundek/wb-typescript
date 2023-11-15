import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import RG from "../modelo/rg";
import Telefone from "../modelo/telefone";
import stringData from "../servicos/stringData";
import Atualizacao from "./atualizacao";
import ListagemCliente from "./listagemCliente";

export default class AtualizacaoCliente extends Atualizacao {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public atualizar(): void {
        try {
            console.log('\n')
            this.clientes.forEach((cliente, index) => {
                console.log(`${index + 1} - ${cliente.nome}`)
            })
            let index = this.entrada.receberNumero(`\nPor favor informe o número do cliente que deseja atualizar os dados: `) - 1
            if (index >= 0 && index < this.clientes.length) {
                let cliente = this.clientes[index]
                new ListagemCliente(cliente).listar()
                this.atualizarNome(cliente)
                this.atualizarNomeSocial(cliente)
                this.atualizarGenero(cliente)
                this.atualizarCPF(cliente)
                this.atualizarRG(cliente)
                this.atualizarTelefone(cliente)

                console.log(`\nCliente atualizado com sucesso\n`)
            } else {
                throw new Error('Índice inválido')
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(`\nErro durante a atualização do cliente: ` + error.message + '\n')
            } else {
                console.error(`\nErro durante a atualização do cliente.\n`)
            }
        }
    }

    private atualizarNome(cliente: Cliente): void {
        if (this.entrada.receberTexto(`Deseja atualizar o nome do cliente? (s/n) `).toLowerCase() === 's') {
            let nome = this.entrada.receberTexto(`Por favor informe o novo nome do cliente: `)
            cliente.nome = nome
        }
    }
    private atualizarNomeSocial(cliente: Cliente): void {
        if (this.entrada.receberTexto(`Deseja atualizar o nome social do cliente? (s/n) `).toLowerCase() === 's') {
            let nomeSocial = this.entrada.receberTexto(`Por favor informe o novo nome social do cliente: `)
            cliente.nomeSocial = nomeSocial
        }
    }
    private atualizarGenero(cliente: Cliente): void {
        if (this.entrada.receberTexto(`Deseja atualizar o gênero do cliente? (s/n) `).toLowerCase() === 's') {
            let genero = this.entrada.receberTexto(`Por favor informe o novo gênero do cliente ( Masculino ou Feminino ): `)
            if (genero !== "Masculino" && genero !== "Feminino") {
                throw new Error('Gênero inválido. Por favor, informe "Masculino" ou "Feminino".')
            }
            cliente.genero = genero
        }
    }
    private atualizarCPF(cliente: Cliente): void {
        if (this.entrada.receberTexto(`Deseja atualizar o cpf do cliente? (s/n) `).toLowerCase() === 's') {
            let valor = this.entrada.receberTexto(`Por favor informe o novo cpf do cliente: `)
            if (this.clientes.some(cliente => cliente.getCpf.getValor === valor)) {
                throw new Error('CPF já cadastrado.')
            }
            let data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `)
            let dataEmissao = stringData.converterStringParaData(data)
            let cpf = new CPF(valor, dataEmissao)
            cliente.setCpf = cpf
        }
    }
    private atualizarRG(cliente: Cliente): void {
        if (this.entrada.receberTexto(`Deseja atualizar o rg do cliente? (s/n) `).toLowerCase() === 's') {
            let index = this.entrada.receberNumero(`Informe qual RG você quer atualizar (Digite 0 para continuar): `)
            if (index !== 0) {
                let valor = this.entrada.receberTexto(`Por favor informe o novo RG: `)
                let data = this.entrada.receberTexto(`Por favor informe a data de emissão do RG, no padrão dd/mm/yyyy: `)
                let dataEmissao = stringData.converterStringParaData(data)
                let rg = new RG(valor, dataEmissao)
                if (this.clientes.some(client => client.getRgs.some(rg => rg.getValor === valor))) {
                    throw new Error('RG já cadastrado.')
                }
                if (cliente.getRgs.some(rg => rg.getValor === valor)) {
                    throw new Error('RG já adicionado a este cliente.')
                }
                cliente.atualizarRg(index, rg)
            }
        }
    }
    private atualizarTelefone(cliente: Cliente): void {
        if (this.entrada.receberTexto(`Deseja atualizar o telefone do cliente? (s/n) `).toLowerCase() === 's') {
            let index = this.entrada.receberNumero(`Informe qual telefone você quer atualizar (Digite 0 para continuar): `)
            if (index !== 0) {
                let ddd = this.entrada.receberTexto(`Por favor informe o ddd do telefone do cliente: `)
                let numero = this.entrada.receberTexto(`Por favor informe o número do telefone do cliente: (${ddd})`)
                let telefone = new Telefone(ddd, numero)
                cliente.atualizarTelefone(index, telefone)
            }
        }
    }
}