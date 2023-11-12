import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa"

import AtualizacaoCliente from "../negocio/atualizacaoCliente";
import AtualizacaoProduto from "../negocio/atualizacaoProduto";
import AtualizacaoServico from "../negocio/atualizacaoServico";

import CadastroCliente from "../negocio/cadastroCliente";
import CadastroProduto from "../negocio/cadastroProduto";
import CadastroServico from "../negocio/cadastroServico";

import ConsumirProdutos from "../negocio/consumoProduto";
import ConsumirServicos from "../negocio/consumoServico";

import DeletarCliente from "../negocio/deletarCliente";
import DeletarProduto from "../negocio/deletarProduto";
import DeletarServico from "../negocio/deletarServico";

import ListagemClienteGenero from "../negocio/listagemClienteGenero";
import ListagemClientes from "../negocio/listagemClientes";
import ListagemProdutoGenero from "../negocio/listagemProdutoGenero";
import ListagemProdutos from "../negocio/listagemProdutos";
import ListagemProdutosMaisConsumidos from "../negocio/listagemProdutosMaisConsumidos";
import ListagemServicoGenero from "../negocio/listagemServicoGenero";
import ListagemServicos from "../negocio/listagemServicos";
import ListagemServicosMaisConsumidos from "../negocio/listagemServicosMaisConsumidos";
import ListagemTopClienteMenosProduto from "../negocio/listagemTopClienteMenosProduto";
import ListagemTopClienteMenosServico from "../negocio/listagemTopClienteMenosServico";
import ListagemTopClienteProduto from "../negocio/listagemTopClienteProduto";
import ListagemTopClienteServico from "../negocio/listagemTopClienteServico";
import ListagemTopClientesValor from "../negocio/listagemTopClientesValor";

console.log(`Bem-vindo a agenda do Grupo World Beauty`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Opções de cliente`);
    console.log(`2 - Opções de serviços`);
    console.log(`3 - Opções de produtos`);
    console.log(`4 - Opções de listagem`);
    console.log(`0 - Sair`);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

    switch (opcao) {
        case 1:
            console.log(`\nOpções:`);
            console.log(`1 - Cadastrar cliente`);
            console.log(`2 - Listar todos os clientes`);
            console.log(`3 - Atualizar cliente`);
            console.log(`4 - Deletar cliente`);
            console.log(`5 - Consumir produto`);
            console.log(`6 - Consumir serviço`);
            console.log(`0 - Voltar`);
            entrada = new Entrada()
            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
            switch (opcao) {
                case 1:
                    let cadastro = new CadastroCliente(empresa.getClientes)
                    cadastro.cadastrar()
                    break;
                case 2:
                    let listagem = new ListagemClientes(empresa.getClientes)
                    listagem.listar()
                    break;
                case 3:
                    let atualizar = new AtualizacaoCliente(empresa.getClientes)
                    atualizar.atualizar()
                    break;
                case 4:
                    let deletar = new DeletarCliente(empresa.getClientes)
                    deletar.deletar()
                    break;
                case 5:
                    let consumirProduto = new ConsumirProdutos(empresa.getClientes, empresa.getProdutos)
                    consumirProduto.consumir()
                    break;
                case 6:
                    let consumirServico = new ConsumirServicos(empresa.getClientes, empresa.getServicos)
                    consumirServico.consumir()
                    break;
                case 0:
                    console.log('\n')
                    break;
                default:
                    console.log(`Operação não entendida :(`)
            }
            break

        case 2:
            console.log(`\nOpções:`);
            console.log(`1 - Cadastrar serviço`);
            console.log(`2 - Listar todos os serviços`);
            console.log(`3 - Atualizar serviço`);
            console.log(`4 - Deletar serviço`);
            console.log(`0 - Voltar`);
            entrada = new Entrada()
            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
            switch (opcao) {
                case 1:
                    let cadastro = new CadastroServico(empresa.getServicos)
                    cadastro.cadastrar()
                    break;
                case 2:
                    let listagem = new ListagemServicos(empresa.getServicos)
                    listagem.listar()
                    break;
                case 3:
                    let atualizar = new AtualizacaoServico(empresa.getServicos)
                    atualizar.atualizar()
                    break;
                case 4:
                    let deletar = new DeletarServico(empresa.getServicos)
                    deletar.deletar()
                    break;
                case 0:
                    console.log('\n')
                    break
                default:
                    console.log(`Operação não entendida :(`)
            }
            break

        case 3:
            console.log(`\nOpções:`);
            console.log(`1 - Cadastrar produto`);
            console.log(`2 - Listar todos os produtos`);
            console.log(`3 - Atualizar produto`);
            console.log(`4 - Deletar produto`);
            console.log(`0 - Voltar`);
            entrada = new Entrada()
            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
            switch (opcao) {
                case 1:
                    let cadastro = new CadastroProduto(empresa.getProdutos)
                    cadastro.cadastrar()
                    break;
                case 2:
                    let listagem = new ListagemProdutos(empresa.getProdutos)
                    listagem.listar()
                    break;
                case 3:
                    let atualizar = new AtualizacaoProduto(empresa.getProdutos)
                    atualizar.atualizar()
                    break;
                case 4:
                    let deletar = new DeletarProduto(empresa.getProdutos)
                    deletar.deletar()
                    break;
                case 0:
                    console.log('\n')
                    break
                default:
                    console.log(`Operação não entendida :(`)
            }
            break

        case 4:
            console.log(`\nOpções:`);
            console.log(`1 - Listar os 10 clientes que mais consumiram produtos`);
            console.log(`2 - Listar os 10 clientes que mais consumiram serviços`);
            console.log(`3 - Listar todos os clientes por gênero`);
            console.log(`4 - Listar serviços mais consumidos`);
            console.log(`5 - Listar produtos mais consumidos`);
            console.log(`6 - Listar serviços mais consumidos por gênero`);
            console.log(`7 - Listar produtos mais consumidos por gênero`);
            console.log(`8 - Listar os 10 clientes que menos consumiram produtos`);
            console.log(`9 - Listar os 10 clientes que menos consumiram serviços`);
            console.log(`10 - Listar os 5 clientes que mais consumiram em valor`);
            console.log(`0 - Voltar`);
            entrada = new Entrada()
            opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
            switch (opcao) {
                case 1:
                    let listagemClienteMaisConsumiramProdutos = new ListagemTopClienteProduto(empresa.getClientes)
                    listagemClienteMaisConsumiramProdutos.listar()
                    break;
                case 2:
                    let listagemClienteMaisConsumiramServicos = new ListagemTopClienteServico(empresa.getClientes)
                    listagemClienteMaisConsumiramServicos.listar()
                    break;
                case 3:
                    let listagemClienteGenero = new ListagemClienteGenero(empresa.getClientes)
                    listagemClienteGenero.listar()
                    break;
                case 4:
                    let listagemServicosMaisConsumidos = new ListagemServicosMaisConsumidos(empresa.getClientes)
                    listagemServicosMaisConsumidos.listar()
                    break;
                case 5:
                    let listagemProdutosMaisConsumidos = new ListagemProdutosMaisConsumidos(empresa.getClientes)
                    listagemProdutosMaisConsumidos.listar()
                    break;
                case 6:
                    let listagemServicosMaisConsumidosGenero = new ListagemServicoGenero(empresa.getClientes)
                    listagemServicosMaisConsumidosGenero.listar()
                    break;
                case 7:
                    let listagemProdutosMaisConsumidosGenero = new ListagemProdutoGenero(empresa.getClientes)
                    listagemProdutosMaisConsumidosGenero.listar()
                    break;
                case 8:
                    let listagemTopClienteMenosProduto = new ListagemTopClienteMenosProduto(empresa.getClientes)
                    listagemTopClienteMenosProduto.listar()
                    break;
                case 9:
                    let listagemTopClienteMenosServico = new ListagemTopClienteMenosServico(empresa.getClientes)
                    listagemTopClienteMenosServico.listar()
                    break;
                case 10:
                    let listagemTopClientesValor = new ListagemTopClientesValor(empresa.getClientes)
                    listagemTopClientesValor.listar()
                    break;
                case 0:
                    console.log('\n')
                    break
                default:
                    console.log(`Operação não entendida :(`)
            }
            break

        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}