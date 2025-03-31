import { useState } from 'react';

const InquiryForm = ({ artwork }) => {
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
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Email format is invalid';
    }
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

    setErrors({}); // Clear errors

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
    } catch (err) {
      setStatus('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={styles.input}
      />
      {errors.name && <p style={styles.error}>{errors.name}</p>}

      <input
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={styles.input}
      />
      {errors.email && <p style={styles.error}>{errors.email}</p>}

      <input
        type="tel"
        placeholder="Your Phone (optional)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        style={styles.input}
      />

      <textarea
        placeholder="Your Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        style={styles.textarea}
      />
      {errors.message && <p style={styles.error}>{errors.message}</p>}

      <small style={styles.note}>
        We may contact you by phone or email to follow up on your inquiry.
      </small>

      <button type="submit" style={styles.submit}>Send Inquiry</button>

      {status && <p>{status}</p>}
    </form>
  );
};

const styles = {
  form: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    maxWidth: '400px',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.5rem',
    fontSize: '1rem',
    height: '100px',
  },
  submit: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  note: {
    fontSize: '0.85rem',
    color: '#666',
  },
  error: {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '-0.5rem',
    marginBottom: '0.5rem',
  },
};

export default InquiryForm;
