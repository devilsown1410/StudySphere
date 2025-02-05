import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "./../../imgs/logo.png";


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-between bg-opacity-70 backdrop-blur-sm items-center p-4 md:z-10 z-40 fixed w-full top-0 left-0">
      <Link to="/">
        <motion.img
          src={Logo}
          className="h-16 px-4 cursor-pointer md:px-20"
          alt="StudySphere Logo"
        />
      </Link>
      
      <div className="hidden md:flex space-x-6 text-white font-semibold mr-20">
        <Link to="/">
          <motion.button
            className="px-4 py-2 rounded-md border-2 border-transparent transition-all duration-300 hover:text-indigo-400 hover:font-bold hover:bg-red-50 hover:border-indigo-400"
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
        </Link>
        <div className="border-s my-4 border-indigo-300 h-4 justify-center"></div>
        <Link to="/about">
          <motion.button
            className="px-4 py-2 rounded-md border-2 border-transparent transition-all duration-300 hover:text-indigo-400 hover:font-bold hover:bg-red-50 hover:border-indigo-400"
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.button>
        </Link>
        <div className="border-s my-4 border-indigo-300 h-4 justify-center"></div>
        <Link to="/register">
          <motion.button
            className="px-4 py-2 rounded-md border-2 border-transparent transition-all duration-300 hover:text-indigo-400 hover:font-bold hover:bg-red-50 hover:border-indigo-400"
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </Link>
        <div className="border-s my-4 border-indigo-300 h-4 justify-center"></div>
        <Link to="/login">
          <motion.button
            className="px-4 py-2 rounded-md border-2 border-transparent transition-all duration-300 hover:text-indigo-400 hover:font-bold hover:bg-red-50 hover:border-indigo-400"
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </Link>
      </div>

      <button className="md:hidden text-slate-300" onClick={toggleMenu}>
        <motion.span className="text-4xl">
          ☰
        </motion.span>
      </button>

      <motion.div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-red-400 text-slate-300 text-center space-y-4 py-4 md:hidden transition-all duration-300 ease-in-out transform`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
            backgroundColor:"rgb(145, 56, 56)",
        }}
      >
        <Link to="/">
          <motion.button
            className="w-full py-2 rounded-md border-transparent transition-all duration-300 hover:border-blue-400"
            onClick={() => setIsMenuOpen(false)}
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
        </Link>
        <Link to="/about">
          <motion.button
            className="w-full py-2 rounded-md border-transparent transition-all duration-300 hover:border-blue-400"
            onClick={() => setIsMenuOpen(false)}
            whileHover={{
              scale: 1.3,
            }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.button>
        </Link>
        <Link to="/register">
          <motion.button
            className="w-full py-2 rounded-md  border-transparent transition-all duration-300 hover:border-blue-400"
            onClick={() => setIsMenuOpen(false)}
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </Link>
        <Link to="/login">
          <motion.button
            className="w-full py-2 rounded-md border-transparent transition-all duration-300 hover:border-blue-400"
            onClick={() => setIsMenuOpen(false)}
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

export default NavBar;
