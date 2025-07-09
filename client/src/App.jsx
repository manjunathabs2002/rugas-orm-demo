import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
