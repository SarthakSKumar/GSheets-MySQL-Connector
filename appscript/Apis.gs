function sendEdits(payload) {
  const options = {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  const url = getConfig().web_service_url;

  try {
    const response = UrlFetchApp.fetch(url, options);
    logMessage("Updated Successfully " + error.message);
  } catch (error) {
    logMessage("Error sending updates to server: " + error.message);
  }
}

function getEdits(payload) {
  const options = {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  const url = getConfig().web_service_url;

  try {
    const response = UrlFetchApp.fetch(url, options);
    logMessage("Updated Successfully " + error.message);
  } catch (error) {
    logMessage("Error sending updates to server: " + error.message);
  }
}
