import { ClienteInterface } from "../interfaces/cliente"

export const fetchClientesData = async () => {
    try {
        const response = await fetch("http://localhost:32832/clientes")
        const data = await response.json()

        return data
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao pegar os dados dos clientes', classes: 'rounded red' })
    }
}

export const fetchClienteByID = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:32832/cliente/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()

        return data
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao pegar os dados do cliente', classes: 'rounded red' })
    }
}


export const deleteClienteData = async (cliente: ClienteInterface) => {
    const body = { id: cliente.id }
    try {
        await fetch('http://localhost:32832/cliente/excluir', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        M.toast({ html: 'Cliente deletado com sucesso!', classes: 'rounded green' })
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao deletar o cliente', classes: 'rounded red' })
    }
}

export const atualizaCliente = async (cliente: ClienteInterface) => {
    try {
        const response = await fetch('http://localhost:32832/cliente/atualizar', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(cliente),
        })
        M.toast({ html: 'Cliente atualizado com sucesso!', classes: 'rounded green' })
        return response
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao atualizar o cliente', classes: 'rounded red' })
    }
}

export const cadastroCliente = async (cliente: ClienteInterface) => {
    try {
        const response = await fetch('http://localhost:32832/cliente/cadastrar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente)
        })
        M.toast({ html: 'Cliente cadastrado com sucesso!', classes: 'rounded green' })
        return response
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao cadastrar o cliente', classes: 'rounded red' })
    }
}
