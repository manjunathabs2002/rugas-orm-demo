import mongoose from 'mongoose';
const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    address: String,
  },
  {
    timestamps: true,
  }
);
const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
