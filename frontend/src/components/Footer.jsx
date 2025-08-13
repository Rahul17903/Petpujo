import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#090832] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Brand */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">পেটপুজো</h2>
          <p className="mt-2 text-sm text-gray-400">
            Fresh meals delivered to your doorstep.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link to="/add-product" className="hover:text-yellow-400 transition">Add Product</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link to="#" className="text-gray-400 hover:text-yellow-400 transition">
              <FaFacebookF size={20} />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-yellow-400 transition">
              <FaTwitter size={20} />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-yellow-400 transition">
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} FoodieMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
