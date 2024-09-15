function logMessage(message) {
  Logger.log(message);
}

function getConfig() {
  const web_service_url = PropertiesService.getScriptProperties().getProperty('WEB_SERVICE_URL');
  return {
    web_service_url
  }
}
