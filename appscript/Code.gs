function doGet(e) {
  return ContentService.createTextOutput('GET request received');
}

function doPost(e) {
  var params = JSON.parse(e.postData.contents);
  Logger.log(params)
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log(sheet)
  sheet.getRange(params.row, 1).setValue(params.value);
  return ContentService.createTextOutput('POST request received and processed');
}

function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;

  const cellLetters = ['A', 'B', 'C', 'D', 'E'];
  const updatedCells = [];
  
  const startColumn = range.getColumn();
  const endColumn = startColumn + range.getNumColumns() - 1;
  
  if (endColumn < 1 || startColumn > 5) return;
  
  const colStart = Math.max(startColumn, 1);
  const colEnd = Math.min(endColumn, 5);
  
  const relevantRange = sheet.getRange(range.getRow(), colStart, range.getNumRows(), colEnd - colStart + 1);
  
  for (let i = 0; i < relevantRange.getNumRows(); i++) {
    for (let j = 0; j < relevantRange.getNumColumns(); j++) {
      const cellRange = relevantRange.getCell(i + 1, j + 1);
      const cellLetter = cellRange.getA1Notation().charAt(0);
      
      if (cellLetters.includes(cellLetter)) {
        const oldValue = e.oldValue ? e.oldValue[i * relevantRange.getNumColumns() + j] : '';
        const newValue = cellRange.getValue();
        
        if (oldValue || newValue !== '') {
          updatedCells.push({
            cell: cellRange.getA1Notation(),
            oldValue: oldValue,
            newValue: newValue
          });
        }
      }
    }
  }

  if (updatedCells.length > 0) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      updatedCells: updatedCells
    };
    
    Logger.log(JSON.stringify(logEntry, null, 2));
  }
}