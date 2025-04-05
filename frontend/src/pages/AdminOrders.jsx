import { useEffect, useState } from 'react';
import OrderRow from '../components/OrderRow';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem('adminToken');

  const fetchOrders = async () => {
    let url = `http://localhost:8080/api/admin/secure/orders?page=${page}&size=10`;
    if (statusFilter) url += `&status=${statusFilter}`;

    try {
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setOrders(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter]);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(0); // Reset to first page on filter change
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Submitted Orders</h1>

      <div className="mb-4 flex gap-4 items-center">
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
        <span className="text-sm text-gray-600">Page {page + 1} of {totalPages}</span>
      </div>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <OrderRow key={order.id} order={order} onStatusUpdated={fetchOrders} />
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(prev => (prev + 1 < totalPages ? prev + 1 : prev))}
          disabled={page + 1 >= totalPages}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
