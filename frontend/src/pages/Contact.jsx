import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import artworks from '../data/artworks';

export default function Contact() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const artworkId = queryParams.get('artworkId');
  const artwork = artworks.find((art) => art.id === artworkId);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: artwork ? `I'm interested in "${artwork.title}". ` : '',
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      const response = await fetch('http://localhost:8080/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      });

      if (!response.ok) throw new Error('Failed to submit');
      setStatus('✅ Message sent successfully!');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Contact Me</h1>

      {artwork && (
        <div className="mb-6 border p-4 rounded shadow-sm bg-gray-50">
          <p className="text-sm text-gray-600">
            You are inquiring about: <strong>{artwork.title}</strong>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="tel"
          placeholder="Your Phone (optional)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border p-2 rounded h-32"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

        <p className="text-sm text-gray-500">
          We may contact you by phone or email in response to your message.
        </p>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Send Message
        </button>

        {status && <p className="mt-4">{status}</p>}
      </form>
    </div>
  );
}
