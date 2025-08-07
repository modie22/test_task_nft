const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
  imageUrl: String,
  description: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Nft', nftSchema);
