import { Link } from 'react-router-dom';
import artworks from '../data/artworks';

export default function Shop() {
  return (
    <div className="px-6 py-16 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12">Shop Artworks</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {artworks.map((art) => (
          <Link
            to={`/shop/${art.id}`}
            key={art.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition bg-white"
          >
            <div className="flex justify-center items-center bg-gray-100">
              <img
                src={art.image}
                alt={art.title}
                style={{
                  width: '225px',
                  height: '150px',
                  objectFit: 'cover',
                  border: '2px solid #ccc',
                  backgroundColor: '#f0f0f0',
                }}
              />
            </div>
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold">{art.title}</h2>
              <p className="text-gray-500">{art.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
