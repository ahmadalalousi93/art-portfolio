import { useState } from 'react';

export default function OrderRow({ order, onStatusUpdated }) {
  const [status, setStatus] = useState(order.status);
  const token = localStorage.getItem('adminToken');

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      await fetch(`http://localhost:8080/api/admin/secure/orders/${order.id}/status?status=${newStatus}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (onStatusUpdated) onStatusUpdated();
    } catch (err) {
      console.error('❌ Failed to update status:', err);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 border">
      <h2 className="text-lg font-semibold mb-1">Order #{order.id}</h2>

      <p>
        <strong>Status:</strong>{' '}
        <select
          value={status}
          onChange={handleStatusChange}
          className="border p-1 rounded text-sm"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </p>

      <p><strong>Customer:</strong> {order.customerName}</p>
      <p><strong>Email:</strong> {order.customerEmail}</p>
      <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
      <p><strong>Country:</strong> {order.country}</p>

      <p><strong>Subtotal:</strong> ${order.totalPrice?.toFixed(2)}</p>
      <p><strong>Shipping:</strong> ${order.shippingCost?.toFixed(2)}</p>
      <p><strong>Tax:</strong> ${order.taxAmount?.toFixed(2)}</p>
      <p><strong>Final Total:</strong> ${order.finalTotal?.toFixed(2)}</p>

      <p>
        <strong>Artworks ({order.artworkTitles?.length || 0}):</strong>{' '}
        {order.artworkTitles?.join(', ') || 'None'}
      </p>
    </div>
  );
}
