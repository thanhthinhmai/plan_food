const { db, config } = require('../pgp');
class Product {
    constructor(db) {
        this.db = db;
    }
    selectAllProduct() {
        return this.db.any('SELECT products.price, products.name as p_name, images.name as i_name, products.id_product FROM products,images WHERE products.id_product=images.id_product;')
    }
    selectDetail(id) {
        return this.db.one('SELECT products.name as p_name,products.id_product, images.name as i_name, products.rate, products.octime,products.price, type.name FROM products, images, type WHERE products.id_product = images.id_product AND products.id_type = type.id_type AND products.id_product=$1', id)
    }
    addProduct(data) {
        return this.db.oneOrNone("INSERT INTO bill(id_product,price,name,phone,addres,time,status,id_user) VALUES (${booking}, ${price}, ${name}, ${phone}, ${address}, ${time},'Dang xu li',0 ) RETURNING id_bill", data)
    }
    selectSearch(name) {
        return this.db.any('SELECT products.price, products.name as p_name, images.name as i_name, products.id_product FROM products,images WHERE products.id_product=images.id_product AND products.name iLIKE $1', ["%" + name + "%"])
    }
}
module.exports = Product;