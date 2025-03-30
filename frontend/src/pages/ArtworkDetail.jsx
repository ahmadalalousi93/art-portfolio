import { useParams } from 'react-router-dom'
import artworks from '../data/artworks'

export default function ArtworkDetail() {
  const { id } = useParams()
  const artwork = artworks.find((art) => art.id === id)

  if (!artwork) return <p>Artwork not found.</p>

  return (
    <div>
      <h1>{artwork.title}</h1>
      <img src={artwork.image} alt={artwork.title} style={{ width: '100%', maxWidth: '600px' }} />
      <p>{artwork.description}</p>
      <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
      <p><strong>Price:</strong> {artwork.price}</p>
      {/* You could add a "Purchase" or "Inquire" button here later */}
    </div>
  )
}
