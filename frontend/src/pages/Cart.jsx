import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="max-w-5xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600 text-sm">${item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="mt-6 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-sm"
          >
            Clear Cart
          </button>
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
