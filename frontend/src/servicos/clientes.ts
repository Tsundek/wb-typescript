import { ClienteInterface } from "../interfaces/cliente"

export const getAllUsers = async () => {
    try {
        const response = await fetch("http://localhost:8000/clientes",{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
        })
        if(response.ok){
            const data: Array<ClienteInterface> = await response.json()
            return data
        } else {
            M.toast({ html: 'Erro inesperado ao buscar os clientes', classes: 'rounded red' })
            return new Array<ClienteInterface>()
        }
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao pegar os dados dos clientes', classes: 'rounded red' })
        return new Array<ClienteInterface>()
    }
}

export const fetchClienteByID = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:8000/cliente/${id}`, {
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


export const deleteClienteData = async (id: number) => {
    try {
        await fetch(`http://localhost:8000/clientes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        M.toast({ html: 'Cliente deletado com sucesso!', classes: 'rounded green' })
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao deletar o cliente', classes: 'rounded red' })
    }
}

export const atualizaCliente = async (cliente: any) => {
    try {
        const response = await fetch('http://localhost:8000/clientes/', {
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

export const cadastroCliente = async (cliente: any) => {
    try {
        const response = await fetch('http://localhost:8000/clientes/', {
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
