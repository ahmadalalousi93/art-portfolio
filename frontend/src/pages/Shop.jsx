import artworks from '../data/artworks';
import { Link } from 'react-router-dom';

export default function Shop() {
  const classicArt = artworks.filter((art) => art.category === 'classic');
  const digitalArt = artworks.filter((art) => art.category === 'digital');

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">

      {/* 🖼️ Classic Art Section */}
      <section>
        <h2 className="text-4xl font-bold mb-8 border-b pb-2">Classic Art</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {classicArt.map((art) => (
            <Link to={`/shop/${art.id}`} key={art.id} className="block group">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:opacity-80 transition"
              />
              <h3 className="mt-4 text-xl font-semibold">{art.title}</h3>
              <p className="text-sm text-gray-500">{art.dimensions}</p>
              <p className="text-lg font-medium text-gray-800">{art.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 💻 Digital Art Section */}
      <section>
        <h2 className="text-4xl font-bold mb-8 border-b pb-2">Digital Art</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {digitalArt.map((art) => (
            <Link to={`/shop/${art.id}`} key={art.id} className="block group">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:opacity-80 transition"
              />
              <h3 className="mt-4 text-xl font-semibold">{art.title}</h3>
              <p className="text-sm text-gray-500">{art.dimensions}</p>
              <p className="text-lg font-medium text-gray-800">{art.price}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
