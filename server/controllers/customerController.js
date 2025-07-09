import Customer from '../models/Customer.js';
export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ error: 'Customer already exists with this email or phone' });
    }
    const customer = new Customer({ name, email, phone, address });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create customer' });
  }
};
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};
