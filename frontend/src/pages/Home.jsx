import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/artworks')
      .then(res => res.json())
      .then(setArtworks)
      .catch(console.error);
  }, []);

  const featured = artworks.slice(0, 2); // Show first two as featured

  return (
    <motion.div
      className="text-center px-4 py-16 sm:py-20 max-w-7xl mx-auto space-y-16 sm:space-y-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 🎨 Hero Section */}
      <section>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
          Welcome to the Gallery of Nasir Alsamarraie
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
          A curated selection of timeless, high-end digital and classic artworks designed to inspire and captivate.
        </p>
      </section>

      {/* 🖼️ Featured Art Section */}
      <section>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-10 border-b pb-2 inline-block">
          Featured Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {featured.map((art) => (
            <Link to={`/shop/${art.id}`} key={art.id} className="group block">
              <img
                src={`http://localhost:8080${art.imagePath}`}
                alt={art.title}
                className="w-full h-56 sm:h-64 object-cover rounded-lg shadow-lg group-hover:opacity-80 transition"
              />
              <h3 className="mt-4 text-lg sm:text-xl font-medium">{art.title}</h3>
              <p className="text-sm text-gray-500">{art.measurements}</p>
              <p className="text-base text-gray-800 font-semibold">${art.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔗 CTA */}
      <section>
        <Link
          to="/shop"
          className="inline-block bg-black text-white px-6 py-3 text-base sm:text-lg rounded hover:bg-gray-800 transition"
        >
          View Full Gallery
        </Link>
      </section>
    </motion.div>
  );
}
