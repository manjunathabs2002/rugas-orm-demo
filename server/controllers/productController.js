import Product from '../models/Product.js';
export const createProduct = async (req, res) => {
  try {
    const { name, category, description, image, price } = req.body;
    const existingProduct = await Product.findOne({ name, category });
    if (existingProduct) {
      return res
        .status(400)
        .json({ error: 'Product already exists in this category' });
    }
    const product = new Product({ name, category, description, image, price });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
