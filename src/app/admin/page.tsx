import LoginForm from '@/components/LoginForm';

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}