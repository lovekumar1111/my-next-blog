// src/app/layout.js
import { AuthProvider } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import './globals.css';

// ✅ This metadata block is used by Next.js automatically
export const metadata = {
  title: 'Gosotek Blog',
  description: 'Tech-powered blogging with PWA',
  icons: {
    icon: '/favicon-96x96.png',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Extra meta tags if needed */}
        <meta name="theme-color" content="#1d4ed8" />
      </head>
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
