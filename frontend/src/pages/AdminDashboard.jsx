import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Redirect if token is missing
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome, Admin</h1>
      <p className="text-gray-700 mb-4">This is your secure admin dashboard.</p>

      <button
        onClick={handleLogout}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Logout
      </button>
    </div>
  );
}
