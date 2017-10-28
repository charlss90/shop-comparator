const cheerio = require('cheerio')

class ProductService {

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
            name: $('[itemprop=name]').text(),
            price: $('[itemprop=price]').attr('content'),
            description: $('#ficha-producto-caracteristicas').text(),
            barnd: $('[itemprop=barnd]').text(),
            posterUrl: $('[itemprop=image]').attr('src'),
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
