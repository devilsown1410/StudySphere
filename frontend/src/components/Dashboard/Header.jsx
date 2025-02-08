// src/Components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "./../../imgs/logo.png";
import { motion } from "framer-motion";
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { doSignOut } from '../../firebase/auth';

const Header = () => {
  return (
    <nav className="flex justify-between max-h-[5rem] min-w-screen bg-opacity-70 backdrop-blur-sm items-center p-4 py-8">
        <Link to="/">
            <motion.img
            src={Logo}
            className="h-16 cursor-pointer md:px-20"
            alt="StudySphere Logo"
            />
        </Link>
        <div className="flex space-x-4 pr-16">
            <Link to="/" className="flex items-center space-x-1 text-slate-500 hover:text-sky-200">
            <FaHome />
            <span>Home</span>
            </Link>
            <Link to="/" onClick={doSignOut} className="flex items-center space-x-1 text-slate-500 hover:text-sky-200">
            <FaSignOutAlt />
            <span>Logout</span>
            </Link>
        </div>
    </nav>
  );
};

export default Header;
