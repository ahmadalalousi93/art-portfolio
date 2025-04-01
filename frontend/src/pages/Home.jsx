import { Link } from 'react-router-dom';
import artworks from '../data/artworks';

export default function Home() {
  const featured = artworks.slice(0, 2); // Display first two artworks

  return (
    <div className="text-center px-4 py-20 max-w-7xl mx-auto space-y-20">

      {/* 🎨 Hero Section */}
      <section>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Welcome to the Gallery of Nasir Alsamarraie
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
          A curated selection of timeless, high-end digital and classic artworks designed to inspire and captivate.
        </p>
      </section>

      {/* 🖼️ Featured Art Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-10 border-b pb-2 inline-block">
          Featured Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {featured.map((art) => (
            <Link to={`/shop/${art.id}`} key={art.id} className="group block">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:opacity-80 transition"
              />
              <h3 className="mt-4 text-xl font-medium">{art.title}</h3>
              <p className="text-sm text-gray-500">{art.dimensions}</p>
              <p className="text-base text-gray-800 font-semibold">{art.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔗 Call to Action */}
      <section>
        <Link
          to="/shop"
          className="inline-block bg-black text-white px-6 py-3 text-lg rounded hover:bg-gray-800 transition"
        >
          View Full Gallery
        </Link>
      </section>
    </div>
  );
}
