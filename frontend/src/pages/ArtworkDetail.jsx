import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function ArtworkDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:8080/api/artworks/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Artwork not found');
        return res.json();
      })
      .then((data) => {
        setArtwork(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-20 text-gray-600">Loading artwork...</p>;
  if (!artwork) return <p className="text-center py-20 text-gray-600">Artwork not found.</p>;

  return (
    <motion.div
      className="px-4 sm:px-6 py-16 sm:py-20 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Link to="/shop" className="text-sm text-gray-500 hover:text-black transition mb-6 inline-block">
        ← Back to Gallery
      </Link>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        <img
          src={`http://localhost:8080${artwork.imagePath}`}
          alt={artwork.title}
          className="w-full md:w-1/2 max-h-[500px] object-cover rounded-xl shadow-lg"
        />

        <div className="flex-1 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold">{artwork.title}</h1>
          <p className="text-base sm:text-lg text-gray-600">{artwork.description}</p>
          <div className="text-sm sm:text-base text-gray-500 space-y-1">
            <p><strong>Dimensions:</strong> {artwork.measurements}</p>
            <p><strong>Price:</strong> ${artwork.price}</p>
          </div>

          <div className="flex gap-4 flex-wrap mt-6">
            <button
              onClick={() => addToCart(artwork)}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base"
            >
              Add to Cart
            </button>
            <Link
              to={`/contact?artworkId=${artwork.id}`}
              className="bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-100 transition text-sm sm:text-base"
            >
              Inquire
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
