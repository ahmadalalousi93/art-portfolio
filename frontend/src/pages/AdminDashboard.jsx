import AdminLayout from '../components/AdminLayout';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Welcome, Admin</h1>
        <p className="text-gray-600">
          This is your secure dashboard. From here, you’ll be able to manage artworks, view inquiries, and track sales activity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Total Inquiries</h2>
            <p className="text-2xl font-bold text-blue-600">--</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Artworks Listed</h2>
            <p className="text-2xl font-bold text-green-600">--</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Sales Overview</h2>
            <p className="text-2xl font-bold text-purple-600">--</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
