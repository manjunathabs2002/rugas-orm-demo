import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import API from '../api/axiosConfig';

const Orders = () => {
  const { customers, products, orders, setOrders } = useAppContext();

  const [newOrder, setNewOrder] = useState({
    customerId: '',
    productId: '',
  });

  const [filters, setFilters] = useState({
    status: '',
    customer: '',
    category: '',
  });

  const [filteredOrders, setFilteredOrders] = useState([]);

  // 🔄 Fetch filtered orders from API
  useEffect(() => {
    fetchFilteredOrders();
  }, [filters]);

  const fetchFilteredOrders = async () => {
    try {
      const query = new URLSearchParams();

      if (filters.status) query.append('status', filters.status);
      if (filters.customer) query.append('customer', filters.customer);
      if (filters.category) query.append('category', filters.category);

      const res = await API.get(`/orders?${query.toString()}`);
      setFilteredOrders(res.data);
    } catch (err) {
      console.error('Error fetching filtered orders', err);
    }
  };

  // 🧾 Handle new order creation
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/orders', newOrder);
      setOrders((prev) => [res.data, ...prev]);
      setNewOrder({ customerId: '', productId: '' });
    } catch (err) {
      console.error('Failed to create order', err);
    }
  };

  // 🔁 Update order status
  const handleStatusUpdate = async (orderId, status) => {
    try {
      const res = await API.patch(`/orders/${orderId}`, { status });
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? res.data : order))
      );
      fetchFilteredOrders(); // refresh filtered list
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create New Order</h2>
      <form onSubmit={handleOrderSubmit} className="space-y-4 mb-6 max-w-md">
        <select
          name="customerId"
          value={newOrder.customerId}
          onChange={(e) =>
            setNewOrder({ ...newOrder, customerId: e.target.value })
          }
          className="border p-2 w-full"
          required
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          name="productId"
          value={newOrder.productId}
          onChange={(e) =>
            setNewOrder({ ...newOrder, productId: e.target.value })
          }
          className="border p-2 w-full"
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Place Order
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Filter Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
          className="border p-2"
        >
          <option value="">All Statuses</option>
          <option value="placed">Placed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={filters.customer}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, customer: e.target.value }))
          }
          className="border p-2"
        >
          <option value="">All Customers</option>
          {customers.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
          className="border p-2"
        >
          <option value="">All Categories</option>
          {Array.from(new Set(products.map((p) => p.category))).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-xl font-bold mb-4">Orders List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOrders.length === 0 && <p>No orders found.</p>}
        {filteredOrders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-1">
              Customer: {order.customerId?.name}
            </h3>
            <p className="text-sm">Product: {order.productId?.name}</p>
            <p className="text-sm text-gray-600">
              Category: {order.productId?.category}
            </p>
            <p className="text-sm">
              Status: <strong>{order.status}</strong>
            </p>
            <div className="mt-2 flex gap-2">
              {['shipped', 'delivered', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(order._id, status)}
                  className="text-sm bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                  Mark {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
