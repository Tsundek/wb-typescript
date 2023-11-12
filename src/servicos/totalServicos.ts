import Cliente from "../modelo/cliente";

export default class totalConsumo {
    public static totalServicosConsumidos(cliente: Cliente): number {
        return cliente.getServicosConsumidos.reduce((a, b) =>
            a + b.quantidade, 0
        )
    }
    public static totalProdutosConsumidos(cliente: Cliente): number {
        return cliente.getProdutosConsumidos.reduce((a, b) =>
            a + b.quantidade, 0
        )
    }

}