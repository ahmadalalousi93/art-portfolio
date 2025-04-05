import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-5xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 border-b pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:8080${item.imagePath}`}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600 text-sm">${item.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold">Total: ${total.toLocaleString()}</h2>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-sm"
              >
                Clear Cart
              </button>
              <button
                disabled
                className="bg-black text-white px-6 py-2 rounded text-sm opacity-60 cursor-not-allowed"
              >
                Checkout (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      )}

      <Link
        to="/shop"
        className="inline-block mt-10 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
      >
        Back to Shop
      </Link>
    </div>
  );
}
