import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    country: '',
  });

  const [status, setStatus] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const quantity = cartItems.length;
  const shippingCost = quantity * 25.0;
  const tax = subtotal * 0.06;
  const total = subtotal + shippingCost + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setStatus('❌ Your cart is empty.');
      return;
    }

    const orderData = {
      customerName: form.name,
      customerEmail: form.email,
      shippingAddress: form.address,
      country: form.country || 'US',
      artworkIds: cartItems.map((item) => item.id),
      totalPrice: subtotal,
      status: 'pending',
    };

    try {
      setStatus('Submitting order...');
      const res = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        clearCart();
        navigate('/thank-you', { state: { fromOrder: true } });
      } else {
        setStatus('❌ Failed to submit order. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Error submitting order.');
    }
  };

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
            <div>
              <p className="text-sm">Subtotal: ${subtotal.toLocaleString()}</p>
              <p className="text-sm">Shipping: ${shippingCost.toFixed(2)}</p>
              <p className="text-sm">Tax: ${tax.toFixed(2)}</p>
              <h2 className="text-xl font-bold">Total: ${total.toLocaleString()}</h2>
            </div>
            <button
              onClick={clearCart}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 text-sm"
            >
              Clear Cart
            </button>
          </div>

          <form
            onSubmit={handleOrderSubmit}
            className="mt-10 space-y-4 bg-gray-50 p-6 rounded shadow"
          >
            <h3 className="text-lg font-semibold mb-2">Checkout</h3>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full border p-2 rounded"
            />
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder="Shipping Address"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              required
              placeholder="Country"
              className="w-full border p-2 rounded"
            />

            {status && <p className="text-sm text-gray-600">{status}</p>}

            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition text-sm"
            >
              Submit Order
            </button>
          </form>
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
