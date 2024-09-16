function processEdits(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;

  const row = range.getRow();
  const startCol = 1;
  const endCol = sheet.getLastColumn();

  const id = sheet.getRange(row, startCol).getValue();

  if (!id) return;

  const rowData = sheet.getRange(row, startCol, 1, endCol).getValues()[0];

  const rowResponse = {};
  rowResponse[id] = [];

  for (let col = startCol; col <= endCol; col++) {
    const cellValue = rowData[col - 1];
    const cellName = sheet.getRange(1, col).getValue();

    rowResponse[id].push({
      cell: cellName,
      value: cellValue
    });
  }
  sendEdits(rowResponse);
}
