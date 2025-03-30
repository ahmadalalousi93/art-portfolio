import { Link } from 'react-router-dom'
import artworks from '../data/artworks'

export default function Shop() {
  return (
    <div>
      <h1>Art for Sale</h1>
      <div style={styles.grid}>
        {artworks.map((art) => (
          <div key={art.id} style={styles.card}>
            <img src={art.image} alt={art.title} style={styles.img} />
            <h3>{art.title}</h3>
            <p>{art.price}</p>
            <Link to={`/shop/${art.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '2rem',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    textAlign: 'center',
  },
  img: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
}
