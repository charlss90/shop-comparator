async = require 'async'
Bot = require './common/bot'

bot = new Bot {show: true}
url = "https://www.pccomponentes.com/placas-base"
waitSelector = ".tarjeta-articulo"

evaluatePage = () ->
  products = []

  for productNode in document.querySelectorAll('.tarjeta-articulo')
    product =
      name: productNode.querySelector("[itemprop=name] a").innerHTML
      price: productNode.querySelector("[itemprop=price]").getAttribute "content"
      posterUrl: productNode.querySelector("[itemprop=image]").getAttribute "src"
      source: "#{document.location.origin}#{productNode.querySelector("[itemprop=url]").getAttribute('href')}"
    products.push product

  return products

onGetUrls = (products) ->
  products.forEach (product) -> console.log product
  # async.mapSeries urls, mapToDetail, (err, products) ->
  #   console.log(products)

mapToDetail = (url, next) ->
  console.log "Navegando: #{url}"
  bot.go url, '.slider-ficha-producto', evaluateDetailPage
    .then (page) ->
      console.log page
      next null, page
    .catch (ex) ->
      next ex

evaluateDetailPage = () ->
  return
    url: document.querySelector('[itemprop=image]').getAttribute 'src'
    name: document.querySelector('[itemprop=name] strong').innerHTML
    price: document.querySelector('[itemprop=price]').getAttribute 'content'
    source: document.location.toString()


bot.go url, waitSelector, evaluatePage
  .then onGetUrls
