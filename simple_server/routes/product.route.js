const express = require('express');
const app = express();
const productRoutes = express.Router();

let Product = require('../model/Product');

// api to add product
productRoutes.route('/add').post(function (req, res) {
  let product = new Product(req.body);
  product.save()
  .then(product => {
    res.status(200).json({'status': 'success','mssg': 'product added successfully!'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save product to database. ;-;'});
  });
});

// api to get products
productRoutes.route('/').get(function (req, res) {
  Product.find(function (err, products){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','products': products});
    }
  });
});

// api to get product
productRoutes.route('/:id').get(function (req, res) {
  let id = req.params.id;
  Product.findById(id, function (err, product){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','product': product});
    }
  });
});

// api to update route
productRoutes.route('/update/:id').put(function (req, res) {
    Product.findById(req.params.id, function(err, product) {
    if (!product){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.rating = req.body.rating;
        product.picture = req.body.picture;

        product.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Product Updated!'});
      })
    }
  });
});

// api for delete
productRoutes.route('/delete/:id').delete(function (req, res) {
  Product.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully! :D'});
    }
  });
});

module.exports = productRoutes;