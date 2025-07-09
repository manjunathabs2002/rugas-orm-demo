import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  description: String,
  image: String,    // URL of the product image
  price: { type: Number, required: true }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
