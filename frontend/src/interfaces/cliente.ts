import { CPFInterface } from "./cpf";
import { ProdutoInterface } from "./produto";
import { RGInterface } from "./rg";
import { ServicoInterface } from "./servico";
import { TelefoneInterface } from "./telefone"

export interface ClienteInterface {
    id?: number
    nome: string;
    nomeSocial: string
    genero: string
    cpf: CPFInterface
    rgs: Array<RGInterface>
    telefones: Array<TelefoneInterface>
    servicos: Array<ServicoInterface>
    produtos: Array<ProdutoInterface>
}
