function getEdits(e) {
  processSheetEdits(e)
  clearEmptyRows(e)
}

function doPost(e) {
  try {
    const { data, operation } = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    const itemId = data.item_id;

    if (!itemId) {
      throw new Error("item_id is required for all operations.");
    }

    const rows = sheet.getDataRange().getValues();
    
    const rowIndex = rows.findIndex(row => row[0] == itemId) + 1;

    if (operation === 'addToSheetFromDB') {
      if (rowIndex > 0) {
        throw new Error(`Row with item_id: ${itemId} already exists.`);
      }
      sheet.appendRow([data.item_id, data.item_name, data.category, data.quantity, data.price]);
      
      return ContentService.createTextOutput(JSON.stringify({ 
        status: 'success', 
        message: 'Row added successfully!', 
        data: e.postData.contents 
      })).setMimeType(ContentService.MimeType.JSON);

    } else if (operation === 'updateToSheetFromDB') {
      if (rowIndex === 0) {
        throw new Error(`Row with item_id: ${itemId} not found.`);
      }

      const rowToUpdate = sheet.getRange(rowIndex, 1, 1, sheet.getLastColumn());
      const currentData = rowToUpdate.getValues()[0];
      
      const updatedRow = [
        itemId, 
        data.item_name || currentData[1], 
        data.category || currentData[2], 
        data.quantity || currentData[3], 
        data.price || currentData[4]
      ];

      rowToUpdate.setValues([updatedRow]);
      
      return ContentService.createTextOutput(JSON.stringify({ 
        status: 'success', 
        message: 'Row updated successfully!', 
        data: e.postData.contents 
      })).setMimeType(ContentService.MimeType.JSON);

    } else if (operation === 'deleteToSheetFromDB') {
      if (rowIndex === 0) {
        throw new Error(`Row with item_id: ${itemId} not found.`);
      }

      sheet.deleteRow(rowIndex);
      clearEmptyRows(e)
      
      return ContentService.createTextOutput(JSON.stringify({ 
        status: 'success', 
        message: 'Row deleted successfully!', 
        data: e.postData.contents 
      })).setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error('Invalid operation.');
    }

  } catch (error) {
    Logger.log('Error: ' + error.message);
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: error.message 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

