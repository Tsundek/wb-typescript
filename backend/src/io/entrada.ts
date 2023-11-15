import promptSync from "prompt-sync";
export default class Entrada {
    public receberNumero(mensagem: string): number {
        let valor = this.receberEntradaValida(mensagem)
        let numero  = new Number(valor)
        return numero.valueOf()
    }
    public receberTexto(mensagem: string): string {
        let texto = this.receberEntradaValida(mensagem)
        return texto
    }
    private receberEntradaValida(mensagem: string): string {
        let entrada: string
        let prompt = promptSync()
        do {
            entrada = prompt(mensagem)
            if (!entrada) {
                console.log("\nA entrada não pode estar vazia. Por favor, tente novamente.\n")
            }
        } while (!entrada)
        return entrada
    }
}