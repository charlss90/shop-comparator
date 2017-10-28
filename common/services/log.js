const moment = require('moment')

class LogService {

  constructor(isDebugMode) {
    this.isDebugMode = isDebugMode;
  }

  log(message) {
    if (message) 
      console.log(`[${getTime()}] ${message}`);
  }

  debug(message) {
    if (message && this.isDebugMode)
      console.log(`[${getTime()}] ${message}`);
  }
 }

 const getTime = () => moment().format('hh:mm:ss DD/MM/YYYY');


 module.exports = LogService;
