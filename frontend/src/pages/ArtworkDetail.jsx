import { useParams } from 'react-router-dom';
import { useState } from 'react';
import artworks from '../data/artworks';
import InquiryForm from '../components/InquiryForm';

export default function ArtworkDetail() {
  const { id } = useParams();
  const artwork = artworks.find((art) => art.id === id);
  const [showForm, setShowForm] = useState(false);

  if (!artwork) return <p className="p-10 text-center">Artwork not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* 🖼 Artwork Image */}
        <div className="flex justify-center">
          <div className="w-[300px] h-[200px] overflow-hidden border border-gray-300 rounded shadow">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 🎨 Artwork Details */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{artwork.title}</h1>
          <p className="text-xl text-gray-700">{artwork.price}</p>
          <p className="text-sm text-gray-500">Dimensions: {artwork.dimensions}</p>
          <p className="text-gray-600">{artwork.description}</p>

          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            {showForm ? 'Hide Inquiry Form' : 'Inquire About This Artwork'}
          </button>

          {showForm && (
            <div className="mt-6">
              <InquiryForm artwork={artwork} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
