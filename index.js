const async = require('async');

const {Services, Sitemap} = require('./common');
const pccomponentes = require('./pccomponentes');
const products = require('./products')

let requestService = new Services.RequestService();
let logService = new Services.LogService(true);
let sitemap = new Sitemap(requestService, new Services.ParserService());
let pcComponentesProductService = new pccomponentes.Services.ProductService(new Services.CheerioService(requestService), logService);
let productService = new products.Services.ProductService(new Services.MySqlService('mysql://root:123456@localhost:3306/market'));


const url = 'https://www.pccomponentes.com/sitemap_articles.xml';

sitemap.fromUrl(url)
  .asObject({
    urlset: {
      url: ['loc', 'lastmod']
    }
  })
  .then((data) => {
    async.eachSeries(data.urlset.url, (pageSource, next) => {
      pcComponentesProductService.getProduct(pageSource.loc)
        .then((product) => {
          logService.debug(`${JSON.stringify(product)}`);
          return productService.insert(product)
        })
        .then((result) => {
          logService.debug(`${JSON.stringify(result)}`);
          next();
        })
        .catch(ex => {
          console.log(ex);
          next();
        });
    })    
  });
