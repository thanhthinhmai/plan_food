var express = require('express');
var router = express.Router();
const { db, } = require('../pgp');
const Product = require('../model/product');
const product = new Product(db);

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        email: req.session.passport,
        title: 'Express',
    });

});

router.get('/menu', (req, res) => {
    product.selectAllProduct()
        .then(data => {
            res.render('menu', {
                email: req.session.passport,
                title: 'Menu',
                products: data
            })
        })
        .catch(err => {
            console.log(err);
        })
})

router.get('/detail/:id', (req, res) => {
    let id = req.params.id;
    product.selectDetail(id)
        .then(data => {
            res.render('detail', {
                email: req.session.passport,
                product: data,
            })
        })
})

router.post('/submit', (req, res) => {
    product.addProduct(req.body)
        .then(data => {
            res.render('submit', {
                email: req.session.passport,
            })
        })

})

router.route('/quest')
    .get((req, res) => {
        res.render('search')
    })
    .post((req, res) => {
        let search = req.body.search;
        product.selectSearch(search)
            .then(data => {
                console.log(data);
                res.render('search', {
                    products: data
                })
            })
    })

module.exports = router;