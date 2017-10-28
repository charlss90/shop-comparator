const async = require('async');

const {Services, Sitemap} = require('./common');
const pccomponentes = require('./pccomponentes');

let requestService = new Services.RequestService();
let logService = new Services.LogService(true);
let sitemap = new Sitemap(requestService, new Services.ParserService());
let productService = new pccomponentes.Services.ProductService(new Services.CheerioService(requestService), logService);


const url = 'https://www.pccomponentes.com/sitemap_articles.xml';

sitemap.fromUrl(url)
  .asObject({
    urlset: {
      url: ['loc', 'lastmod']
    }
  })
  .then((data) => {
    async.eachSeries(data.urlset.url, (pageSource, next) => {
      productService.getProduct(pageSource.loc)
        .then((product) => {
          logService.debug(`${JSON.stringify(product)}`);
          next();
        })
        .catch(ex => {
          console.log(ex);
          next();
        });
    })    
  });
