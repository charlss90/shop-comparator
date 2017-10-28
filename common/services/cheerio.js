const cheerio = require('cheerio');
const RequestService = require('./request');

class CheerioService {


  /**
   * Browser service that it given a url download 
   * page and parse page to jquery object
   * @param {RequestService} requestService 
   */
  constructor(requestService) {
    this.requestService = requestService;
  }


  /**
   * Set url that it's wants get page
   * @param {String} url 
   * @returns {CheerioService}
   */
  fromUrl(url) {
    this.url = url;
    return this;
  }


  /**
   * This function parser the page to jquery object and 
   * execute de callback that transforms to object and 
   * returns a promise object
   * @param {($: Cheerio) => {}} evalFn eval function
   */
  evaluate(evalFn) {
    if (!this.url) throw new Error('Invalid url');

    return this.requestService.get(this.url)
      .then(transfromPage)
      .then(evalFn)
  }
}


const transfromPage = (html) => cheerio.load(html,{ decodeEntities: false });


module.exports = CheerioService;
