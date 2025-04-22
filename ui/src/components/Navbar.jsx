import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-500 text-white p-4">
    <ul className="flex space-x-4">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/collection">Collection</Link></li>
      <li><Link to="/mock">Mock</Link></li>
    </ul>
  </nav>
);

export default Navbar;
