import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { createUser, getUsers } from '../services/adminService';

const Admin = () => {
  const [form, setForm] = useState({
    email_id: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    const result = await createUser(form);
    setLoading(false);
    if (result.success) {
      setMessage('✅ User created successfully');
      setForm({ email_id: '', password: '', first_name: '', last_name: '' });
      fetchUsers();
    } else {
      setMessage(`❌ ${result.message}`);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    const result = await getUsers();
    setLoading(false);
    if (result.success) {
      setUsers(result.data);
    } else {
      setMessage(`❌ ${result.message}`);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <input
              type="email"
              name="email_id"
              placeholder="Email"
              value={form.email_id}
              onChange={handleChange}
              required
              className="flex-1 min-w-[200px] p-2 rounded bg-gray-800 border border-gray-600 text-white"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="flex-1 min-w-[200px] p-2 rounded bg-gray-800 border border-gray-600 text-white"
            />
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              className="flex-1 min-w-[150px] p-2 rounded bg-gray-800 border border-gray-600 text-white"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              className="flex-1 min-w-[150px] p-2 rounded bg-gray-800 border border-gray-600 text-white"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white"
              disabled={loading}
            >
              {loading ? 'Creating User...' : 'Create User'}
            </button>
          </div>
        </form>

        {message && <p className="mt-4">{message}</p>}

        <div className="mt-10">
          <h2 className="text-2xl mb-4">Users</h2>
          
          <table className="min-w-full bg-gray-800 border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 text-left text-sm text-gray-300">First Name</th>
                <th className="py-2 px-4 text-left text-sm text-gray-300">Last Name</th>
                <th className="py-2 px-4 text-left text-sm text-gray-300">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-gray-400">No users available</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-600">
                    <td className="py-2 px-4">{user.first_name}</td>
                    <td className="py-2 px-4">{user.last_name}</td>
                    <td className="py-2 px-4">{user.email_id}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Admin;
