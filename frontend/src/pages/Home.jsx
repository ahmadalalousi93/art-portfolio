import { Link } from 'react-router-dom';
import artworks from '../data/artworks';

export default function Home() {
  const featured = artworks.slice(0, 2); // Show top 2 artworks as "featured"

  return (
    <div className="text-center px-6 py-20 max-w-7xl mx-auto space-y-16">

      {/* ✨ Hero Section */}
      <section>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          Welcome to the Gallery of Nasir Alsamarraie
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          A curated collection of classic and digital fine art — elegant, limited, and timeless.
        </p>
      </section>

      {/* 🖼️ Featured Art Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-10 border-b pb-2 inline-block">Featured Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {featured.map((art) => (
            <Link to={`/shop/${art.id}`} key={art.id} className="group block">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-72 object-cover rounded-lg shadow-lg group-hover:opacity-80 transition"
              />
              <h3 className="mt-4 text-xl font-medium">{art.title}</h3>
              <p className="text-sm text-gray-500">{art.dimensions}</p>
              <p className="text-lg text-gray-800 font-semibold">{art.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 📎 CTA Section */}
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
