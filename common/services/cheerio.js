const cheerio = require('cheerio');

class CheerioService {
  constructor(requestService) {
    this.requestService = requestService;
  }

  fromUrl(url) {
    this.url = url;
    return this;
  }

  evaluate(evalFn) {
    if (!this.url) throw new Error('Invalid url');

    return this.requestService.get(this.url)
      .then(transfromPage)
      .then(evalFn)
  }
}


const transfromPage = (html) => cheerio.load(html);


module.exports = CheerioService;
