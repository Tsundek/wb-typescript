/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react"
import 'materialize-css/dist/css/materialize.min.css'
import { ProdutoInterface } from "../interfaces/produto"
import { ServicoInterface } from "../interfaces/servico"
import { getAllProductsConsumed, getAllServicesConsumed, getProductById, getServiceById } from "../servicos/items"

type Item = ProdutoInterface | ServicoInterface

type props = {
    tipo: 'produto' | 'servico'
}

type ConsumoItem = {
    cliente_id: number
    produto_id?: number
    servico_id?: number
    quantidade: number
}

export const ListaTopMaisConsumidos = ({ tipo }: props) => {
    const [topMaisConsumidos, setTopMaisConsumidos] = useState<Array<[Item, number]>>([])

    useEffect(() => {
        M.Tooltip.init(document.querySelectorAll('.tooltipped'), { enterDelay: 250 })

        const fetchData = async () => {
            try {
                // Fetch consumption data based on the item type
                const jsonData: Array<ConsumoItem> =
                    tipo === 'produto' ? await getAllProductsConsumed() : await getAllServicesConsumed()

                const consumptionMap = new Map<number, number>()

                jsonData.forEach(({ produto_id, servico_id, quantidade }) => {
                    const itemId = tipo === 'produto' ? produto_id : servico_id
                    if (itemId !== undefined) {
                        if (consumptionMap.has(itemId)) {
                            consumptionMap.set(itemId, consumptionMap.get(itemId)! + quantidade)
                        } else {
                            consumptionMap.set(itemId, quantidade)
                        }
                    }
                })

                const sortedItems = Array.from(consumptionMap.entries(), ([itemId, quantidade]): { itemId: number; quantidade: number } => ({ itemId, quantidade }))
                    .sort((a, b) => b.quantidade - a.quantidade)
                    .slice(0, 10)

                const itemsWithDetails = await Promise.all(
                    sortedItems.map(async ({ itemId, quantidade }) => {
                        const itemDetails = tipo === 'produto' ? await getProductById(itemId) : await getServiceById(itemId)
                        return [itemDetails, quantidade] as [Item, number]
                    })
                )

                setTopMaisConsumidos(itemsWithDetails)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [tipo])

    return (
        <>
            <h5 className="center-align">Top 10 {tipo === 'produto' ? 'Produtos' : 'Serviços'} Mais Consumidos</h5>
            <li className="divider" />
            <div>
                {topMaisConsumidos.map((item, index) => (
                    <a className={`collection-item avatar black-text truncate`} key={index}>
                        <i className="material-icons medium circle">shopping_cart</i>
                        <span className="title"># {index + 1}</span>
                        <p>
                            {item[0].nome}
                            <br />
                            Quantidade consumida: {item[1]}
                        </p>
                    </a>
                ))}
            </div>
        </>
    )
}
