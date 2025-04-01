import { useState } from 'react';

export default function InquiryForm({ artwork }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
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
    setStatus(null);

    try {
      const response = await fetch('http://localhost:8080/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          artworkId: artwork.id,
          artworkTitle: artwork.title,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setStatus('✅ Inquiry sent successfully!');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8 max-w-md mx-auto text-left">

      <div>
        <input
          type="text"
          placeholder="Your Name *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Your Email *"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <input
          type="tel"
          placeholder="Your Phone (optional)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full p-3 border rounded"
        />
      </div>

      <div>
        <textarea
          placeholder="Your Message *"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full p-3 border rounded h-28"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      <small className="text-sm text-gray-500">
        We may contact you by phone or email to follow up on your inquiry.
      </small>

      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Send Inquiry
      </button>

      {status && <p className="mt-3 text-sm">{status}</p>}
    </form>
  );
}
