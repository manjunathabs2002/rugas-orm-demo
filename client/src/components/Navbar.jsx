import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const baseClasses = 'px-3 py-1 rounded hover:bg-gray-700 transition-colors';
  const activeClasses = 'bg-gray-900 text-yellow-400 font-semibold';

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5">
        <h1 className="text-xl font-bold flex items-center gap-2">
          🧾 <span>Rugas ORM</span>
        </h1>

        <div className="flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/customers"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : ''}`
            }
          >
            Customers
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : ''}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : ''}`
            }
          >
            Orders
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
