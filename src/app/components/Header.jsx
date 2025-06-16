// src/app/components/Header.jsx
import Image from 'next/image';

export default function Header() {
  return (
    <header className="p-4 bg-black text-white flex items-center justify-between">
      <Image src="/image/logo.png" alt="Gosotek Logo" width={120} height={120} />
      <h1 className="text-xl font-bold">Welcome to Gosotek</h1>
    </header>
  );
}
