import { useParams } from 'react-router-dom'
import { useState } from 'react'
import artworks from '../data/artworks'

export default function ArtworkDetail() {
  const { id } = useParams()
  const artwork = artworks.find((art) => art.id === id)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  
  const [status, setStatus] = useState(null)
  

  if (!artwork) return <p>Artwork not found.</p>

  return (
    <div>
      <h1>{artwork.title}</h1>
      <img src={artwork.image} alt={artwork.title} style={{ maxWidth: '600px', width: '100%' }} />
      <p>{artwork.description}</p>
      <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
      <p><strong>Price:</strong> {artwork.price}</p>

      <button onClick={() => setShowForm(true)} style={styles.button}>Inquire</button>

      {showForm && (
  <form
    style={styles.form}
    onSubmit={(e) => {
      e.preventDefault()

      // Simple required field check
      if (!form.name || !form.email || !form.message) {
        setStatus('Please fill in all required fields.')
        return
      }

      fetch('http://localhost:8080/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          artworkId: artwork.id,
          artworkTitle: artwork.title,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Failed to submit')
          return res.text()
        })
        .then(() => {
          setStatus('✅ Inquiry sent successfully!')
          setForm({ name: '', email: '', phone: '', message: '' })
        })
        .catch(() => setStatus('❌ Something went wrong. Please try again.'))
    }}
  >
    <input
      type="text"
      placeholder="Your Name"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
      style={styles.input}
      required
    />
    <input
      type="email"
      placeholder="Your Email"
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
      style={styles.input}
      required
    />
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
      required
    />
    <small style={styles.note}>
      We may contact you by phone or email to follow up on your inquiry.
    </small>

    <button type="submit" style={styles.submit}>Send Inquiry</button>

    {status && <p>{status}</p>}
  </form>
)}

    </div>
  )
}

const styles = {
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
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
}
