import { ProdutoInterface } from "../interfaces/produto"
import { ServicoInterface } from "../interfaces/servico"

export const cadastroProduto = async (produto: any) => {
    try {
        const response = await fetch('http://localhost:8000/produto/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto)
        })
        M.toast({ html: 'Produto cadastrado com sucesso!', classes: 'rounded green' })
        return response
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao cadastrar o produto', classes: 'rounded red' })
    }
}

export const getAllProducts = async () => {
    try {
        const response = await fetch("http://localhost:8000/produtos",{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
        })
        if(response.ok){
            const data: Array<ProdutoInterface> = await response.json()
            console.log(data)
            return data
        } else {
            M.toast({ html: 'Erro inesperado ao buscar os produtos', classes: 'rounded red' })
            return Array<ProdutoInterface>()
        }
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao pegar os dados dos produtos', classes: 'rounded red' })
        return Array<ProdutoInterface>()
    }
}

export const getProductById = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:8000/produto/${id}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
        })
        if(response.ok){
            const data: ProdutoInterface = await response.json()
            return data
        } else {
            M.toast({ html: 'Erro inesperado ao buscar os produtos', classes: 'rounded red' })
        }
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao pegar os dados dos produtos', classes: 'rounded red' })
    }
}

export const getServiceById = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:8000/servico/${id}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
        })
        if(response.ok){
            const data: ServicoInterface = await response.json()
            return data
        } else {
            M.toast({ html: 'Erro inesperado ao buscar os servicos', classes: 'rounded red' })
        }
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao pegar os dados dos servicos', classes: 'rounded red' })
    }
}

export const getAllProductsConsumed = async () => {
    try {
        const response = await fetch("http://localhost:8000/produtos/consumidos",{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
        })
        if(response.ok){
            const data = await response.json()
            return data
        } else {
            M.toast({ html: 'Erro inesperado ao buscar os produtos consumidos', classes: 'rounded red' })
        }
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao pegar os dados dos produtos consumidos', classes: 'rounded red' })
    }
}

export const getAllServicesConsumed = async () => {
    try {
        const response = await fetch("http://localhost:8000/servicos/consumidos",{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
        })
        if(response.ok){
            const data = await response.json()
            return data
        } else {
            M.toast({ html: 'Erro inesperado ao buscar os produtos consumidos', classes: 'rounded red' })
        }
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao pegar os dados dos produtos consumidos', classes: 'rounded red' })
    }
}

export const deleteProductData = async (id: number) => {
    try {
        await fetch(`http://localhost:8000/produto/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        M.toast({ html: 'Produto deletado com sucesso!', classes: 'rounded green' })
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao deletar o produto', classes: 'rounded red' })
    }
}

export const atualizaProduto = async (produto: any) => {
    try {
        const response = await fetch('http://localhost:8000/produto/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(produto),
        })
        M.toast({ html: 'Produto atualizado com sucesso!', classes: 'rounded green' })
        return response
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao atualizar o produto', classes: 'rounded red' })
    }
}

export const consumirProduto = async (cliente_id: number, produto_id: number) => {
    try {
        const response = await fetch(`http://localhost:8000/produto/consumir/${cliente_id}/${produto_id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        M.toast({ html: 'Produto consumido com sucesso!', classes: 'rounded green' })
        return response
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao consumir produto', classes: 'rounded red' })
    }
}

export const cadastroServico = async (servico: any) => {
    try {
        const response = await fetch('http://localhost:8000/servico/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(servico)
        })
        M.toast({ html: 'Servico cadastrado com sucesso!', classes: 'rounded green' })
        return response
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao cadastrar o serviço', classes: 'rounded red' })
    }
}

export const getAllServices = async () => {
    try {
        const response = await fetch("http://localhost:8000/servicos",{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
        })
        if(response.ok){
            const data: Array<ServicoInterface> = await response.json()
            return data
        } else {
            M.toast({ html: 'Erro inesperado ao buscar os serviços', classes: 'rounded red' })
            return new Array<ServicoInterface>()
        }
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao pegar os dados dos serviços', classes: 'rounded red' })
        return new Array<ServicoInterface>()
    }
}

export const deleteServiceData = async (id: number) => {
    try {
        await fetch(`http://localhost:8000/servico/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        M.toast({ html: 'Serviço deletado com sucesso!', classes: 'rounded green' })
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao deletar o serviço', classes: 'rounded red' })
    }
}

export const atualizaServico = async (servico: any) => {
    try {
        const response = await fetch('http://localhost:8000/servico/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(servico),
        })
        M.toast({ html: 'Serviço atualizado com sucesso!', classes: 'rounded green' })
        return response
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao atualizar o serviço', classes: 'rounded red' })
    }
}

export const consumirServico = async (cliente_id: number, servico_id: number) => {
    try {
        const response = await fetch(`http://localhost:8000/servico/consumir/${cliente_id}/${servico_id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        M.toast({ html: 'Serviço consumido com sucesso!', classes: 'rounded green' })
        return response
    } catch (error) {
        M.toast({ html: 'Erro inesperado ao consumir serviço', classes: 'rounded red' })
    }
}