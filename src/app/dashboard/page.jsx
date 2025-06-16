'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/me');
      const data = await res.json();

      if (data.user) {
        setUser(data.user);
      } else {
        router.push('/login');
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
      {user && <p className="mt-4 text-lg">Logged in as: {user.email}</p>}
    </div>
  );
}
