const {RequestService, ParserService} = require('./services');

class Sitemap {

  /**
   * Get a sitemap.xml given a url and parser to object
   * @param {RequestService} requestService 
   * @param {ParserService} parserService 
   */
  constructor(requestService, parserService) {
    this.requestService = requestService;
    this.parserService = parserService;
  }

  /**
   * set url sitemap
   * @param {String} url 
   */
  fromUrl(url) {
    this.url = url;
    return this;
  }


  /**
   * download and parser to object the sitemap xml we can set filters to get specifics fields
   * @param {Object} filters 
   */
  asObject(filters) {
    if (!this.url)
      throw new Error('Missing Url');

    return this.requestService.get(this.url)
      .then((xml) => this.parserService.fromXml(xml))
      .then((jObject) => {
        if (!filters) return jObject;
        let result = {};
        for (var key in filters) {
          result[key] = resolveFilter(filters[key], key, jObject);
        }
        return result;
      })
  }
}

const resolveFilter = (filter, attr, jObject) => {
  if (jObject.hasOwnProperty(attr)) {
    let value = jObject[attr];
    if (Array.isArray(filter)) {
      let result;
      if (Array.isArray(value)) {
        result = []
        value.forEach((v) => {
          result.push(parseToFilters(filter, v));
        });
      } else {
        result = parseToFilters(filter, value);
      }
      return result;
    } else {
      let result = {};
      for (var key in filter) {
        result[key] = resolveFilter(filter[key], key, value);
      }
      return result;
    }
  } else {
    return {};
  }
}

const parseToFilters = (filters, object) => {
  var result = {}
  filters.forEach(f => {
    if (object[f])
      result[f] = object[f].join('').trim() 
  });
  return result;
}


module.exports = Sitemap;
