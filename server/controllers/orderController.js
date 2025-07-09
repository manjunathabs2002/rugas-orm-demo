import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Customer from '../models/Customer.js';
export const createOrder = async (req, res) => {
  try {
    const { customerId, productId } = req.body;
    const order = new Order({ customerId, productId });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};
export const getOrders = async (req, res) => {
  try {
    const { status, customer, category } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (customer) filter.customerId = customer;
    const orders = await Order.find(filter)
      .populate('customerId')
      .populate('productId')
      .sort({ createdAt: -1 });
    const filteredOrders = category
      ? orders.filter((order) => order.productId.category === category)
      : orders;
    res.status(200).json(filteredOrders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};
