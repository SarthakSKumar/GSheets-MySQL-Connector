function clearEmptyRows(e) {
  const sheet = e.source.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  for (let row = lastRow; row >= 1; row--) {
    const rowData = sheet.getRange(row, 1, 1, lastColumn).getValues()[0];

    const isRowEmpty = rowData.every(cell => cell === '');

    if (isRowEmpty) {
      sheet.deleteRow(row);
    }
  }
}
