import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Shop() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/artworks')
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch artworks:', err);
        setLoading(false);
      });
  }, []);

  const classicArt = artworks.filter((art) => art.category?.toLowerCase() === 'classic');
  const digitalArt = artworks.filter((art) => art.category?.toLowerCase() === 'digital');

  return (
    <div className="px-4 py-16 sm:py-20 max-w-7xl mx-auto space-y-16 sm:space-y-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Gallery Collection</h1>

      {loading ? (
        <p className="text-center">Loading artworks...</p>
      ) : (
        <>
          {/* 🖼️ Classic Art Section */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 border-b pb-2">Classic Art</h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {classicArt.map((art) => (
                <motion.div key={art.id} variants={cardVariants}>
                  <Link to={`/shop/${art.id}`} className="group block text-center">
                    <img
                      src={`http://localhost:8080${art.imagePath}`}
                      alt={art.title}
                      className="w-full h-56 sm:h-64 object-cover rounded-xl shadow-lg group-hover:opacity-80 transition"
                    />
                    <h3 className="mt-3 text-lg sm:text-xl font-semibold">{art.title}</h3>
                    <p className="text-sm text-gray-500">{art.measurements}</p>
                    <p className="text-base text-gray-800 font-medium">${art.price}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* 💻 Digital Art Section */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 border-b pb-2">Digital Art</h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {digitalArt.map((art) => (
                <motion.div key={art.id} variants={cardVariants}>
                  <Link to={`/shop/${art.id}`} className="group block text-center">
                    <img
                      src={`http://localhost:8080${art.imagePath}`}
                      alt={art.title}
                      className="w-full h-56 sm:h-64 object-cover rounded-xl shadow-lg group-hover:opacity-80 transition"
                    />
                    <h3 className="mt-3 text-lg sm:text-xl font-semibold">{art.title}</h3>
                    <p className="text-sm text-gray-500">{art.measurements}</p>
                    <p className="text-base text-gray-800 font-medium">${art.price}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </>
      )}
    </div>
  );
}
