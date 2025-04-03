import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <p className="text-gray-600">Cart functionality coming soon.</p>

      <Link
        to="/shop"
        className="inline-block mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Back to Shop
      </Link>
    </div>
  );
}
