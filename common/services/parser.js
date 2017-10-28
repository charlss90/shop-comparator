const xml2js = require('xml2js')

class ParserService {

  constructor() {
    this.parser = xml2js.Parser();
  }

  fromXml(xml) {
    return new Promise((resolve, reject) => {
      if (!xml) throw new Error('Missing xml');

      this.parser.parseString(xml, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    })
  }
}


module.exports = ParserService;
