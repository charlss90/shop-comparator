const utf8 = require('utf8');
const cheerio = require('cheerio');
const {LogService, CheerioService} = require('../../common').Services;

class ProductService {

  /**
   * 
   * @param {CheerioService} pageService 
   * @param {LogService} logService 
   */
  constructor(pageService, logService) {
    this.pageService = pageService;
    this.logService = logService;
  }


  getProduct(url) {
    if (!url) throw new Error('Invalid Url');

    this.logService.debug(`Navigate at ${url}`);

    return this.pageService.fromUrl(url)
      .evaluate(($) => {
        let product;
        try {

          product = {
            name: utf8.encode($('[itemprop=name]').text()),
            price: parseFloat($('[itemprop=price]').attr('content')),
            description: $('#ficha-producto-caracteristicas').text(),
            brand: $('[itemprop=brand]').text(),
            posterUrl: 'http:'+$('[itemprop=image]').attr('src'),
            source: url
          };
        } catch (ex) {
          console.log(ex)
        }
        return product;
      });
  }
}


module.exports = ProductService;
