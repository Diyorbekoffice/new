import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../imges/logo-c.png';
import { CartContext } from '../App';

function MainLayout({ children }) { 
  const { cart } = useContext(CartContext);
  
  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <Link to="/">
          <img className='w-14' src={logo} alt="Logo" />
        </Link>
        <nav>
          <Link to="/products" className="mx-2 hover:underline">Products</Link>
          <Link to="/cart" className="mx-2 hover:underline">Cart ({cart.length})</Link>
          <Link to="/about" className="mx-2 hover:underline">About</Link>
          <Link to="/login" className="mx-2 hover:underline">Login</Link>
          <Link to="/register" className="mx-2 hover:underline">Register</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
