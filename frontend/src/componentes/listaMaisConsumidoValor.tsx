/* eslint-disable jsx-a11y/anchor-is-valid */
import 'materialize-css/dist/css/materialize.min.css'

import { useEffect, useState } from 'react'
import { ClienteInterface } from '../interfaces/cliente'
import { getAllProductsConsumed, getAllServicesConsumed, getProductById, getServiceById } from '../servicos/items'
import { ProdutoConsumidoInterface } from '../interfaces/produtosConsumidos'
import { fetchClienteByID } from '../servicos/clientes'
import { ServicoConsumidoInterface } from '../interfaces/servicosConsumidos'

type props = {

    onClienteSelect: (cliente: ClienteInterface) => void
}

export const ListaTopMaisConsumidosValor = ({ onClienteSelect }: props) => {

    const [clientData, setClientData] = useState<Array<{ cliente: ClienteInterface; totalValue: number }>>([])

    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })

        const fetchData = async () => {
            const jsonData: Array<ProdutoConsumidoInterface> = await getAllProductsConsumed()
            const clientConsumptionMap = new Map<number, number>() // Update with actual types

            for (const { cliente_id, produto_id, quantidade } of jsonData) {
                const produto = await getProductById(produto_id)
                const cliente = await fetchClienteByID(cliente_id)

                if (produto && cliente) {
                    const totalValue = quantidade * produto.valor

                    if (clientConsumptionMap.has(cliente_id)) {
                        const currentValue = clientConsumptionMap.get(cliente_id)
                        if (currentValue !== undefined) {
                            clientConsumptionMap.set(cliente_id, currentValue + totalValue)
                        }
                    } else {
                        clientConsumptionMap.set(cliente_id, totalValue)
                    }
                }
            }

            const jsonData2: Array<ServicoConsumidoInterface> = await getAllServicesConsumed()
            for (const { cliente_id, servico_id, quantidade } of jsonData2) {
                const cliente = await fetchClienteByID(cliente_id)
                const servico = await getServiceById(servico_id)

                if (servico && cliente) {
                    const totalValue = quantidade * servico.valor

                    if (clientConsumptionMap.has(cliente_id)) {
                        const currentValue = clientConsumptionMap.get(cliente_id)
                        if (currentValue !== undefined) {
                            clientConsumptionMap.set(cliente_id, currentValue + totalValue)
                        }
                    } else {
                        clientConsumptionMap.set(cliente_id, totalValue)
                    }
                }
            }

            const sortedClients: number[] = []
            clientConsumptionMap.forEach((value, clientId) => {
                sortedClients.push(clientId)
            })

            sortedClients.sort((clientIdA, clientIdB) => {
                const valueA = clientConsumptionMap.get(clientIdA)
                const valueB = clientConsumptionMap.get(clientIdB)
                return (valueB || 0) - (valueA || 0)
            })

            const top5Clients = sortedClients.slice(0, 5)


            const top5ClientDetails = await Promise.all(top5Clients.map(clientId => fetchClienteByID(clientId)))


            const top5ClientsWithDetails = top5Clients.map((clientId, index) => {
                const clientDetails = top5ClientDetails[index];
                const totalValue = clientConsumptionMap.get(clientId) || 0;
                return { cliente: clientDetails, totalValue };
              });
        
              setClientData(top5ClientsWithDetails)
        }
        fetchData()
    }, [])

    return (
        <>
            <h5 className="center-align">Top 5 Clientes Que Mais Consumiram Em Valor</h5>
            <li className="divider" />
            <div className='truncate'>
                {
                    clientData.map((cliente, index) => (
                        <a className={`collection-item avatar black-text`} key={index}>
                            <i className="material-icons medium circle">shopping_cart</i>
                            <span className="title"># {index + 1}</span>
                            <p>
                                {cliente.cliente.nome}
                                <br />
                                Valor total consumido: R${cliente.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                        </a>
                    ))
                }
            </div>
        </>
    )
}