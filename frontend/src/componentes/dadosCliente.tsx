import { useEffect } from "react"
import Cliente from "../modelos/cliente"

type props = {
    cliente: Cliente
}

function formatData(data: Date) {
    let dia = data.getDate() < 10 ? '0' + data.getDate().toString() : data.getDate();
    let mes = (data.getMonth() + 1) < 10 ? '0' + ((data.getMonth()) + 1).toString() : ((data.getMonth()) + 1).toString()
    let ano = data.getFullYear()
    return `${dia}/${mes}/${ano}`
}

export const DadosCliente = ({ cliente }: props) => {
    useEffect(() => {
        M.Chips.init(document.querySelectorAll('.chips'));
    }, [])

    return (
        <div className="container">
            <h3 className="center">Dados do Cliente</h3>
            <div className="divider" />
            <h5>Data de Cadastro: {formatData(cliente.dataCadastro)}</h5>
            <br />
            <h5 className="truncate">Nome: {cliente.nome}</h5>
            <br />
            <h5 className="truncate">Nome Social: {cliente.nomeSocial}</h5>
            <br />
            <h5>Gênero: {cliente.genero}</h5>
            <br />
            <h5>CPF: {cliente.cpf.getValor}</h5>
            <h5>Data de emissão: {formatData(cliente.cpf.getDataEmissao)}</h5>
            <br />
            <h5>RGs:</h5>
            {cliente.rgs.map((rg, index) => (
                <div className="chip blue lighten-3" key={index}>
                    Valor: {rg.getValor}   Data de Emissão: {formatData(rg.getDataEmissao)}
                </div>
            ))}
            <br />
            <h5>Telefones:</h5>
            {cliente.telefones.map((telefone, index) => (
                <div key={index} className="chip purple lighten-3">
                    Número: ({telefone.getDdd}) {telefone.getNumero}
                </div>
            ))}
            <br />
            <h5>Quantidade de produtos consumidos: {cliente.produtosConsumidos.length}</h5>
            <h5>Quantidade de serviços consumidos: {cliente.servicosConsumidos.length}</h5>
        </div>
    )
}