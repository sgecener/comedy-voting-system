'use client';

import { useEffect, useState } from 'react';
import { Comedian } from '@/types';
import { getComedians, toggleComedian } from '@/lib/api';

export default function ComedianList() {
  const [comedians, setComedians] = useState<Comedian[]>([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

  useEffect(() => {
    if (token) {
      loadComedians();
    }
  }, [token]);

  const loadComedians = async () => {
    if (!token) return;
    try {
      const data = await getComedians(token);
      setComedians(data);
    } catch (error) {
      alert('Failed to load comedians');
    }
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    if (!token) return;
    try {
      await toggleComedian(token, id, isActive);
      loadComedians();
    } catch (error) {
      alert('Failed to update comedian');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {comedians.map((comedian) => (
        <div key={comedian._id} className="bg-white p-4 rounded shadow">
          <h3 className="font-bold">{comedian.name}</h3>
          <label className="relative inline-flex items-center cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={comedian.isActive}
              onChange={(e) => handleToggle(comedian._id, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
          <div className="mt-2">
            {comedian.cities.map((city) => (
              <p key={city.name} className="text-sm">
                {city.name}: {city.votes} votes
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
