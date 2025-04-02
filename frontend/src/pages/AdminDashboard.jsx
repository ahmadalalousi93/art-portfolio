import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin'); // Redirect back to login
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <p className="text-gray-700 mb-4">Welcome, admin! 🎉</p>

      {/* Future admin tools can go here */}
      <ul className="list-disc ml-6 text-gray-600">
        <li>✅ View submitted inquiries</li>
        <li>✅ Secure login with token</li>
        <li>🛠️ Add/remove artwork</li>
        <li>📊 View sales reports</li>
        <li>📦 Manage orders and shipments</li>
      </ul>
    </div>
  );
}
