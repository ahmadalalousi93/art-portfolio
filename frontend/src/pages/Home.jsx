import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center px-6 py-20 space-y-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold">
        Welcome to My Art Portfolio
      </h1>
      <p className="text-lg text-gray-700 max-w-xl">
        Explore a curated collection of classic and digital artworks.
        Each piece reflects a story, a moment, and a creative journey.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          to="/shop"
          className="px-6 py-3 bg-black text-white rounded-xl text-lg hover:bg-gray-800 transition"
        >
          View Shop
        </Link>
        <Link
          to="/classic"
          className="px-6 py-3 bg-white border border-black rounded-xl text-lg hover:bg-gray-100 transition"
        >
          Classic Art
        </Link>
        <Link
          to="/digital"
          className="px-6 py-3 bg-white border border-black rounded-xl text-lg hover:bg-gray-100 transition"
        >
          Digital Art
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {/* Featured Artwork 1 */}
        <div className="shadow-md rounded-xl overflow-hidden">
          <div className="flex justify-center items-center">
            <img
              src="/artworks/cosmic.jpeg"
              alt="Cosmic"
              style={{
                width: '225px',
                height: '150px',
                objectFit: 'cover',
                border: '2px solid #ccc',
                backgroundColor: '#f0f0f0',
              }}
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">“Cosmic”</h2>
            <p className="text-gray-600">Digital Art</p>
          </div>
        </div>

        {/* Featured Artwork 2 */}
        <div className="shadow-md rounded-xl overflow-hidden">
          <div className="flex justify-center items-center">
            <img
              src="/artworks/sunset.jpeg"
              alt="Sunset"
              style={{
                width: '225px',
                height: '150px',
                objectFit: 'cover',
                border: '2px solid #ccc',
                backgroundColor: '#f0f0f0',
              }}
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">“Sunset”</h2>
            <p className="text-gray-600">Classic Oil on Canvas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
