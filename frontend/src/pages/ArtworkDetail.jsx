import { useParams, Link } from 'react-router-dom';
import artworks from '../data/artworks';
import { motion } from 'framer-motion';

export default function ArtworkDetail() {
  const { id } = useParams();
  const artwork = artworks.find((art) => art.id === id);

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
          src={artwork.image}
          alt={artwork.title}
          className="w-full md:w-1/2 max-h-[500px] object-cover rounded-xl shadow-lg"
        />

        <div className="flex-1 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold">{artwork.title}</h1>
          <p className="text-base sm:text-lg text-gray-600">{artwork.description}</p>

          <div className="text-sm sm:text-base text-gray-500 space-y-1">
            <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
            <p><strong>Price:</strong> {artwork.price}</p>
          </div>

          <Link
            to={`/contact?artworkId=${artwork.id}`}
            className="inline-block mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition text-sm sm:text-base"
          >
            Inquire About This Piece
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
