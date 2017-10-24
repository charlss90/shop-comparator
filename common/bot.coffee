Nightmare = require 'nightmare'

module.exports = class Bot
  constructor: (@nightmare) ->

  countItems: () -> document.querySelectorAll("[itemtype=\"http://schema.org/Product\"]").length

  go: (url, waitSelector, evaluate) ->
    items = 0
    nightmare = Nightmare(@nightmare)
      .goto(url)
      .wait(waitSelector)
      .evaluate(@countItems)
      .then((totalItems) -> items = totalItems)
      .click("#btnMore")
      .wait(() -> document.querySelectorAll("[itemtype=\"http://schema.org/Product\"]").length > items)
      .then(() -> @scrollDown(nightmare))
      .evaluate(evaluate)

  scrollDown: (nightmare) ->
    new Promise (resolve, reject) =>
      items = 0
      nightmare.evaluate(() => document.querySelectorAll("[itemtype=\"http://schema.org/Product\"]").length)
        .then((count) => items = count)
        .evaluate(() => document.body..offsetHeight)
        .then((offsetHeight) => nightmare.scrollTo(offsetHeight))
        .wait(() => document.querySelectorAll("[itemtype=\"http://schema.org/Product\"]").length > items)
        .then(() => @scrollDown(nightmare))
        ,catch(resolve)
