import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Comedy Show Voting System</h1>
        <div className="space-y-4">
          <Link
            href="/vote"
            className="block w-full text-center bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          >
            Vote Now
          </Link>
          <Link
            href="/admin"
            className="block w-full text-center bg-gray-500 text-white p-3 rounded hover:bg-gray-600"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
}