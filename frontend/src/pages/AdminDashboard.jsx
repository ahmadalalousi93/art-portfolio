import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [activeSection, setActiveSection] = useState('inquiries');
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    measurements: '',
    price: '',
    category: '',
    image: null,
  });
  const [editForm, setEditForm] = useState(null);
  const editFormRef = useRef(null); // 🔍 Reference to edit form

  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }

    if (activeSection === 'inquiries') {
      fetch('http://localhost:8080/api/admin/secure/inquiries', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
        .then(res => res.json())
        .then(setInquiries)
        .catch(() => navigate('/admin'));
    }

    if (activeSection === 'edit') {
      fetch('http://localhost:8080/api/artworks')
        .then(res => res.json())
        .then(setArtworks)
        .catch(console.error);
    }
  }, [activeSection, navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleFormChange = (e, updateForm = setForm) => {
    const { name, value, files } = e.target;
    updateForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddArtwork = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    try {
      const res = await fetch('http://localhost:8080/api/admin/secure/artworks', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        setStatus('✅ Artwork added successfully!');
        setForm({ title: '', description: '', measurements: '', price: '', category: '', image: null });
      } else {
        setStatus('❌ Failed to add artwork.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Error submitting artwork.');
    }
  };

  const handleDeleteArtwork = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this artwork?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/api/admin/secure/artworks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setArtworks(prev => prev.filter((art) => art.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (art) => {
    setEditForm({ ...art });

    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100); // wait for render
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      title: editForm.title,
      description: editForm.description,
      measurements: editForm.measurements,
      price: editForm.price,
      category: editForm.category,
      imagePath: editForm.imagePath,
    };

    try {
      const res = await fetch(`http://localhost:8080/api/admin/secure/artworks/${editForm.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setEditForm(null);
        setActiveSection('edit');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <button onClick={() => setActiveSection('inquiries')} className="block w-full text-left hover:bg-gray-700 px-4 py-2 rounded">Inquiries</button>
        <button onClick={() => setActiveSection('add')} className="block w-full text-left hover:bg-gray-700 px-4 py-2 rounded">Add Artwork</button>
        <button onClick={() => setActiveSection('edit')} className="block w-full text-left hover:bg-gray-700 px-4 py-2 rounded">Edit/Delete Artwork</button>
        <button className="block w-full text-left hover:bg-gray-700 px-4 py-2 rounded">Sales/Orders</button>
        <button className="block w-full text-left hover:bg-gray-700 px-4 py-2 rounded">Settings</button>
        <button onClick={handleLogout} className="mt-10 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full">Logout</button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {activeSection === 'edit' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Edit/Delete Artworks</h1>
            {artworks.map((art) => (
              <div key={art.id} className="border rounded-lg p-4 mb-4 bg-white shadow space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{art.title}</h3>
                    <p className="text-sm text-gray-500">{art.category} — ${art.price}</p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => handleEditClick(art)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDeleteArtwork(art.id)} className="text-red-600 hover:underline">Delete</button>
                  </div>
                </div>
              </div>
            ))}

            {editForm && (
              <form
                ref={editFormRef}
                onSubmit={handleEditSubmit}
                className="mt-10 space-y-4 max-w-xl border p-4 rounded bg-gray-100"
              >
                <h2 className="text-xl font-bold mb-4">Edit Artwork: {editForm.title}</h2>
                <input type="text" name="title" value={editForm.title} onChange={(e) => handleFormChange(e, setEditForm)} required className="w-full border p-2 rounded" />
                <textarea name="description" value={editForm.description} onChange={(e) => handleFormChange(e, setEditForm)} required className="w-full border p-2 rounded" />
                <input type="text" name="measurements" value={editForm.measurements} onChange={(e) => handleFormChange(e, setEditForm)} required className="w-full border p-2 rounded" />
                <input type="number" name="price" value={editForm.price} onChange={(e) => handleFormChange(e, setEditForm)} required className="w-full border p-2 rounded" />
                <select name="category" value={editForm.category} onChange={(e) => handleFormChange(e, setEditForm)} required className="w-full border p-2 rounded">
                  <option value="classic">Classic Art</option>
                  <option value="digital">Digital Art</option>
                </select>
                <div className="flex justify-between">
                  <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">Save Changes</button>
                  <button type="button" onClick={() => setEditForm(null)} className="text-gray-600 hover:text-black">Cancel</button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
