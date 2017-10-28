const path = require('path')
const Nightmare = require('nightmare')

const url = 'https://www.pccomponentes.com/placas-base'
const productSelector = '[itemtype=\"http://schema.org/Product\"]'
const delayForFetchingProducts = 2000
const delayToScroll = 1000

const scriptPage = path.resolve('page.script.js')
var nightmare = Nightmare({
  show: true,
  openDevTools: {
    mode: 'detach'
  },
  // webPreferences: {
  //   preload: scriptPage
  // }
});


const getLastProductOffsetHeight = () =>
  $(productSelector).last().offset().top

const scrollDownRecursive = (productSize) => {

}

const scrollToLastProduct = (scope, done) => {
  let { productSelector, delayToScroll } = scope
  delayToScroll = delayToScroll || 500
  let lastProduct = $(productSelector).last()
  let scrollTop = lastProduct.offset().top - (lastProduct.height()/4)

  $('html, body').animate({ scrollTop }, delayToScroll, () => done(''))
}


const fetchMoreProducts = (oldProductCounter) => {

  return nightmare.evaluate(scrollToLastProduct, { productSelector, delayToScroll })
    .wait(delayForFetchingProducts)
    .then(() =>
      nightmare.evaluate((productSelector) => $(productSelector).length, productSelector )
    ).then(newProductCounter => {
      if (oldProductCounter < newProductCounter) {
        return fetchMoreProducts(newProductCounter)
      }
      return newProductCounter
    })
}


const readPage = () => {
  return nightmare.evaluate(
    scrollToLastProduct,
    { productSelector, delayToScroll }
  ).then((productSize) => {
    return nightmare.click('#btnMore')
      .wait(delayForFetchingProducts) // improve this a chapuza but works
      .evaluate(scrollToLastProduct, { productSelector, delayToScroll })
  }).then(() =>
    nightmare.evaluate((productSelector) => $(productSelector).length, productSelector )
  ).then(productCounter => {
    return fetchMoreProducts(productCounter)
  }).then(() => {
    return nightmare.evaluate((productSelector) => {
      let products = []
      let productsNode = document.querySelectorAll(productSelector)
      for (let i = 0; i < productsNode.length; i++) {
        let productNode = productsNode[i]

        products.push({
          name: productNode.querySelector('[itemprop=name] a').innerHTML,
          price: productNode.querySelector('[itemprop=price]').getAttribute('content'),
          posterUrl: productNode.querySelector('[itemprop=image]').getAttribute('src'),
          source: `${document.location.origin}${productNode.querySelector('[itemprop=url]').getAttribute('href')}`
        })
      }
      return products
    }, productSelector)
  }).then((products) => {
    products.forEach((product) => {
      console.log(product)
    })
  })
}


nightmare.goto(url)
  .wait((productSelector) => $(productSelector).length, productSelector)
  .then(readPage)
