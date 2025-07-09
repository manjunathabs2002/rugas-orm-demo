import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import API from '../api/axiosConfig';

const Customers = () => {
  const { customers, setCustomers } = useAppContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/customers', formData);
      setCustomers((prev) => [res.data, ...prev]); // update context
      setFormData({ name: '', email: '', phone: '', address: '' }); // reset form
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create customer');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Customer
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      <h2 className="text-xl font-bold mb-4">Customer List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {customers.length === 0 && <p>No customers found.</p>}
        {customers.map((customer) => (
          <div key={customer._id} className="border p-4 rounded shadow-sm">
            <h3 className="font-semibold">{customer.name}</h3>
            <p>
              <strong>Email:</strong> {customer.email || 'N/A'}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>
            <p>
              <strong>Address:</strong> {customer.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
