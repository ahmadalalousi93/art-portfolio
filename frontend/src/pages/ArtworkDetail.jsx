import { useParams, Link } from 'react-router-dom';
import artworks from '../data/artworks';

export default function ArtworkDetail() {
  const { id } = useParams();
  const artwork = artworks.find((art) => art.id === id);

  if (!artwork) return <p className="text-center py-20 text-gray-600">Artwork not found.</p>;

  return (
    <div className="px-6 py-20 max-w-6xl mx-auto">
      {/* 🔙 Back Link */}
      <Link to="/shop" className="text-sm text-gray-500 hover:text-black transition mb-6 inline-block">
        ← Back to Gallery
      </Link>

      {/* 📦 Artwork Layout */}
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* 🎨 Image */}
        <img
  src={artwork.image}
  alt={artwork.title}
  className="w-full md:w-1/2 max-h-[500px] object-cover rounded-xl shadow-lg"
/>


        {/* 📝 Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{artwork.title}</h1>
          <p className="text-gray-600 text-lg">{artwork.description}</p>

          <div className="text-sm text-gray-500">
            <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
            <p><strong>Price:</strong> {artwork.price}</p>
            {/* Optional future metadata:
            <p><strong>Medium:</strong> Oil on canvas</p>
            <p><strong>Year:</strong> 2025</p>
            */}
          </div>

          {/* 📩 Inquire Button */}
          <Link
            to="/contact"
            className="inline-block mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Inquire About This Piece
          </Link>
        </div>
      </div>
    </div>
  );
}
