import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { customers, products, orders } = useAppContext();

  // ✅ Count orders by status
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  // ✅ Count products by category
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">📊 Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Customers</h3>
          <p className="text-3xl">{customers.length}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-3xl">{products.length}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-3xl">{orders.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border rounded p-4">
          <h3 className="text-xl font-bold mb-2">📦 Orders by Status</h3>
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="flex justify-between border-b py-1">
              <span>{status}</span>
              <span className="font-semibold">{count}</span>
            </div>
          ))}
        </div>

        <div className="bg-white border rounded p-4">
          <h3 className="text-xl font-bold mb-2">🏷️ Products by Category</h3>
          {Object.entries(categoryCounts).map(([category, count]) => (
            <div key={category} className="flex justify-between border-b py-1">
              <span>{category}</span>
              <span className="font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
