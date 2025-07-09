import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import API from '../api/axiosConfig';

const Products = () => {
  const { products, setProducts } = useAppContext();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    image: '',
    price: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/products', {
        ...formData,
        price: parseFloat(formData.price),
      });

      setProducts((prev) => [res.data, ...prev]); // update product list
      setFormData({
        name: '',
        category: '',
        description: '',
        image: '',
        price: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create product');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mb-8">
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      <h2 className="text-xl font-bold mb-4">Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.length === 0 && <p>No products available.</p>}
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-semibold text-lg mt-2">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="text-sm">{product.description}</p>
            <p className="text-blue-600 font-bold mt-1">₹ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
