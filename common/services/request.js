const request = require('request');


class RequestService {
  
  get(url) {
    return new Promise((resolve, reject) => {
      if (!url)
        throw new Error('Unable to connect missing url');

      request(url, (err, response, body) =>{
        if (err) return reject(err);
        if (response.statusCode != 200) return reject(new Error(`Invalid status ${body}`));

        resolve(body);
      })
    });
  }
}


module.exports = RequestService;
