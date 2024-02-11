import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
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
    console.log(user);
    try {
      const response = await fetch(`http://localhost:5555/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLs(res_data.token);
        setUser({ email: '', password: '' });
        toast.success('Login successful');
        navigate('/');
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
      console.log(response);
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
              <h1 className="text-3xl font-semibold mb-4 text-center">Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
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
                  <label htmlFor="password" className="block text-gray-700">
                    Password
                  </label>
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
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                  Login
                </button>
              </form>
              <div className="mt-4 text-gray-600 text-center">
                <span>Not registered yet?</span>{' '}
                <Link to="/register" className="ml-2 text-indigo-500">
                  Register here
                </Link>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
