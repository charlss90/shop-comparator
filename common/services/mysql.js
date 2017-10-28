const mysql = require('mysql');

class MySqlService {

  /**
   * Service that connect and execute with database.
   * @param {String} connectionString 
   */
  constructor(connectionString) {
    this.connection = mysql.createConnection(connectionString);
  }


  executeStoreProcedure(command, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(buildCommand(command, params), params, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });

    })
  }
}

const buildCommand = (command, params) => {
  return `call ${command}(${params.map(x => '?').join(',')})`;
}

const buildParams = (params) => {
  return params.map(param => {
    if (typeof(param) === 'string') 
      return mysql.escape(param);
    return param;
  });
}

module.exports = MySqlService;

