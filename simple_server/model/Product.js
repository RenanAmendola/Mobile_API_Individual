const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  rating: {
    type: Number
  },
  picture: {
    type: String
  }
},{
    collection: 'product'
});

module.exports = mongoose.model('Product', Product);