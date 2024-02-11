import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const { storeTokenInLs } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5555/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLs(res_data.token);
        setUser({ username: '', email: '', phone: '', password: '' });
        toast.success('Registration successful');
        navigate('/login');
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="flex justify-center items-center h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm">
              <h1 className="text-3xl font-semibold mb-4 text-center">Registration</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    id="username"
                    required
                    autoComplete="off"
                    value={user.username}
                    onChange={handleInput}
                    className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    id="email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                    className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700">Phone</label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Enter your phone"
                    id="phone"
                    required
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInput}
                    className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                    className="w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                  Register
                </button>
              </form>
              <p className="mt-4 text-gray-600 text-center">
                Already registered?{' '}
                <Link to="/login" className="text-indigo-500">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Register;
