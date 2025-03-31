import { useParams } from 'react-router-dom';
import { useState } from 'react';
import artworks from '../data/artworks';
import InquiryForm from '../components/InquiryForm';

export default function ArtworkDetail() {
  const { id } = useParams();
  const artwork = artworks.find((art) => art.id === id);
  const [showForm, setShowForm] = useState(false);

  if (!artwork) return <p>Artwork not found.</p>;

  return (
    <div>
      <h1>{artwork.title}</h1>
      <img
        src={artwork.image}
        alt={artwork.title}
        style={{ maxWidth: '600px', width: '100%' }}
      />
      <p>{artwork.description}</p>
      <p>
        <strong>Dimensions:</strong> {artwork.dimensions}
      </p>
      <p>
        <strong>Price:</strong> {artwork.price}
      </p>

      <button onClick={() => setShowForm(true)} style={styles.button}>
        Inquire
      </button>

      {showForm && <InquiryForm artwork={artwork} />}
    </div>
  );
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
};
