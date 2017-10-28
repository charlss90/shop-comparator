const {MySqlService} = require('../../common').Services;


class ProductService {

  /**
   * Service that insert the products at database
   * @param {MySqlService} mysqlService 
   */
  constructor(mysqlService) {
    this.mysqlService = mysqlService;
  }

  
  insert(product) {
    return this.mysqlService.executeStoreProcedure('crw_products_insert', [
      product.name,
      product.description || '',
      product.brand || '',
      product.posterUrl || '',
      product.source,
      product.price
    ]);
  }
}


module.exports = ProductService;
