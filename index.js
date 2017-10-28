const {Services, Sitemap} = require('./common')

let sitemap = new Sitemap(new Services.RequestService(), new Services.ParserService());

sitemap.fromUrl('https://www.pccomponentes.com/sitemap_articles.xml')
  .asObject({
    urlset: {
      url: ['loc', 'lastmod']
    }
  })
  .then((data) => {
    console.log(data)
  });
