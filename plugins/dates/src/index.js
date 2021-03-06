const tagger = require('./01-tag')
const tags = require('./data/_tags')
const words = require('./data/words')
const methods = require('./methods')

const addMethods = function(Doc, world) {
  // our new tags
  world.addTags(tags)
  // add info for the date plugin
  world.addWords(words)
  // run our tagger
  world.postProcess(tagger)

  /**  */
  class Dates extends Doc {
    constructor(list, from, w) {
      super(list, from, w)
      this.context = {}
    }
  }
  //add-in methods
  Object.assign(Dates.prototype, methods)

  Doc.prototype.dates = function(n) {
    let context = {}
    if (n && typeof n === 'object') {
      context = n
      n = null
    }
    let r = this.clauses()
    let dates = r.match('#Date+')
    if (typeof n === 'number') {
      dates = dates.get(n)
    }
    if (typeof n === 'number') {
      dates = dates.get(n)
    }
    let d = new Dates(dates.list, this, this.world)
    d.context = context
    return d
  }
}

module.exports = addMethods
