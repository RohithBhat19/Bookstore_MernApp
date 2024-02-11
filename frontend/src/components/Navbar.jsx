import React from 'react';
import { PiBookOpenTextLight } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Navbar = () => {
  const {isLoggedIn} = useAuth()
  return (
    <div className="bg-gray-800  w-full ">
      <nav className="container mx-auto px-4 py-6">
        <ul className="flex justify-between items-center text-white ">
          <li className='flex border-solid border-2 border-white-600 p-2 rounded-md shadow-inner shadow-sky-50'>
            <PiBookOpenTextLight className=" text-4xl text-yellow-300 items-center " />
             <h1 className='mt-1 m-2 font-bold hover:text-gray-300 cursor-pointer font-serif '>Book-Store</h1>
          </li>
          <div className='flex space-x-8 mr-10 gap-4'>
            <li><NavLink to = "/" className="hover:text-gray-300">Home</NavLink></li>
            {isLoggedIn?<li>
              <NavLink to = "/logout" className="hover:text-gray-300">Logout</NavLink>
            </li>
            :<>
             <li><NavLink to = "/register" className="hover:text-gray-300">Register</NavLink></li>
            <li><NavLink to = "/login" className="hover:text-gray-300">Login</NavLink></li>
            </>}
           
            
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
