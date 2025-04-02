import { useNavigate } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="space-y-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="block text-left hover:underline"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/admin/inquiries')}
            className="block text-left hover:underline"
          >
            Inquiries
          </button>
          <button
            onClick={() => navigate('/admin/artworks')}
            className="block text-left hover:underline"
          >
            Artworks
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}
