import { EnderecoInterface } from "./endereco"
import { TelefoneInterface } from "./telefone"

export interface ClienteInterface {
    id?: number
    nome: string
    sobreNome: string
    email: string
    endereco: EnderecoInterface
    telefones: Array<TelefoneInterface>
}
