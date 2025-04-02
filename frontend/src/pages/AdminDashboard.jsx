import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [activeSection, setActiveSection] = useState('inquiries');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    fetch('http://localhost:8080/api/admin/secure/inquiries', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Unauthorized or failed to fetch inquiries');
        }
        return res.json();
      })
      .then(data => setInquiries(data))
      .catch(err => {
        console.error(err);
        navigate('/admin');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <button className="block w-full text-left hover:bg-gray-700 px-4 py-2 rounded" onClick={() => setActiveSection('inquiries')}>Inquiries</button>
        <button className="block w-full text-left hover:bg-gray-700 px-4 py-2 rounded" onClick={() => setActiveSection('add')}>Add Artwork</button>
        <button className="block w-full text-left hover:bg-gray-700 px-4 py-2 rounded" onClick={() => setActiveSection('edit')}>Edit/Delete Artwork</button>
        <button className="block w-full text-left hover:bg-gray-700 px-4 py-2 rounded" onClick={() => setActiveSection('sales')}>Sales/Orders</button>
        <button className="block w-full text-left hover:bg-gray-700 px-4 py-2 rounded" onClick={() => setActiveSection('settings')}>Settings</button>
        <button onClick={handleLogout} className="mt-10 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeSection === 'inquiries' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Submitted Inquiries</h1>
            {inquiries.length === 0 ? (
              <p>No inquiries found.</p>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inquiry, idx) => (
                  <div key={idx} className="border rounded-lg p-4 bg-white shadow">
                    <p><strong>Name:</strong> {inquiry.name}</p>
                    <p><strong>Email:</strong> {inquiry.email}</p>
                    <p><strong>Message:</strong> {inquiry.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'add' && <div><h1 className="text-2xl font-bold">Add Artwork</h1><p>Coming soon...</p></div>}
        {activeSection === 'edit' && <div><h1 className="text-2xl font-bold">Edit/Delete Artwork</h1><p>Coming soon...</p></div>}
        {activeSection === 'sales' && <div><h1 className="text-2xl font-bold">Sales/Orders</h1><p>Coming soon...</p></div>}
        {activeSection === 'settings' && <div><h1 className="text-2xl font-bold">Settings</h1><p>Coming soon...</p></div>}
      </main>
    </div>
  );
}
