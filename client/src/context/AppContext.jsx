import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch data when app loads
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const customerRes = await API.get('/customers');
      const productRes = await API.get('/products');
      const orderRes = await API.get('/orders');

      setCustomers(customerRes.data);
      setProducts(productRes.data);
      setOrders(orderRes.data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        customers,
        products,
        orders,
        setCustomers,
        setProducts,
        setOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
