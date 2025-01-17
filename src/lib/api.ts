const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function getComedians(token: string) {
  const res = await fetch(`${API_URL}/active-comedians`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function addComedian(token: string, name: string) {
  const res = await fetch(`${API_URL}/comedians`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      cities: ['New York', 'Los Angeles', 'Chicago'],
    }),
  });
  return res.json();
}

export async function toggleComedian(token: string, id: string, isActive: boolean) {
  const res = await fetch(`${API_URL}/comedians/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isActive }),
  });
  return res.json();
}

export async function startVotingSession(token: string, duration: number) {
  const res = await fetch(`${API_URL}/voting-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      duration: duration * 60,
      cities: ['New York', 'Los Angeles', 'Chicago'],
    }),
  });
  return res.json();
}
