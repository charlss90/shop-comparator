Nightmare = require 'nightmare'

module.exports = class Bot
  constructor: (@nightmare) ->

  go: (url, waitSelector, evaluate) ->
    Nightmare(@nightmare)
      .goto(url)
      .wait(waitSelector)
      .evaluate(evaluate)
      .end()
