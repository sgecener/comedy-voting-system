'use client';

import { useState } from 'react';
import { addComedian, startVotingSession } from '@/lib/api';
import ComedianList from '@/components/ComedianList';

export default function Dashboard() {
  const [comedianName, setComedianName] = useState('');
  const [duration, setDuration] = useState(5);
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

  const handleAddComedian = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !comedianName) return;
    
    try {
      await addComedian(token, comedianName);
      setComedianName('');
      window.location.reload();
    } catch (error) {
      alert('Failed to add comedian');
    }
  };

  const handleStartSession = async () => {
    if (!token) return;
    
    try {
      await startVotingSession(token, duration);
      alert('Voting session started!');
    } catch (error) {
      alert('Failed to start voting session');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Add New Comedian</h2>
            <form onSubmit={handleAddComedian} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Comedian Name</label>
                <input
                  type="text"
                  value={comedianName}
                  onChange={(e) => setComedianName(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Add Comedian
              </button>
            </form>
          </div>
          
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Voting Session Control</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <button
                onClick={handleStartSession}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Start New Session
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Manage Comedians</h2>
          <ComedianList />
        </div>
      </div>
    </div>
  );
}