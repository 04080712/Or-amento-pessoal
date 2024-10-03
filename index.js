function onFormSubmit(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('EntradasESaidas'); // Nome da aba da planilha

    let tipoTransacao = e.values[1]; // Ajuste o índice conforme a ordem das respostas no formulário
    let valor = e.values[2];//Valor adicionado 
  
    //let data = e.values[3]; ainda quero colocar a data que entrou ou saior valor, no futuro

    //adicionarValorNaColuna(sheet, 8,data);

    // Garantir que não existam espaços ou diferenças de caixa
    tipoTransacao = tipoTransacao.trim().toLowerCase();

    // Converter o valor para float e tratar erros
    valor = valor.replace(".", "").replace(",", "."); // Remove separador de milhar e substitui vírgula por ponto
    valor = parseFloat(valor);


    if (isNaN(valor)) {
        Logger.log('Valor inválido: ' + valor);
        return; // Se o valor não puder ser convertido, encerra a função
    }

    if (tipoTransacao === "entrada") {
        adicionarValorNaColuna(sheet, 1, valor); // Adiciona o valor na coluna de "Entradas" (Coluna A)
    } else if (tipoTransacao === "saída" || tipoTransacao === "saida") {
        adicionarValorNaColuna(sheet, 4, valor); // Adiciona o valor na coluna de "Saidas" (Coluna D)
    } else {
        Logger.log('Tipo de transação desconhecido: ' + tipoTransacao);
    }

}

function adicionarValorNaColuna(sheet, colunaIndex, valor) {
    const lastRow = sheet.getLastRow();
    let added = false;

    // Verifica cada linha da coluna para encontrar a primeira célula vazia
    for (let i = 2; i <= lastRow; i++) {
        const currentValue = sheet.getRange(i, colunaIndex).getValue();
        if (currentValue === "") {
            sheet.getRange(i, colunaIndex).setValue(valor);
            added = true;
            break;
        }
    }

    // Se não encontrou uma célula vazia, adiciona na próxima linha
    if (!added) {
        sheet.getRange(lastRow + 1, colunaIndex).setValue(valor);
    }
}

