export default class stringData {
    public static converterStringParaData(data: string): Date {
        let [dia, mes, ano] = data.split('/').map(Number)

        if ([dia, mes, ano].some(isNaN)) {
            throw new Error('Data inválida. Por favor, insira a data no formato dd/mm/yyyy.')
        }

        return new Date(ano, mes-1, dia)
    }
}