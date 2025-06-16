'use client';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="bg-white text-black font-sans">
      {/* Company Info Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <Image src="/images/logo.png" alt="Gosotek Logo" width={120} height={120} />
          <h1 className="text-4xl font-bold mt-4">About Gosotek</h1>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            Discover cutting-edge IT solutions tailored to optimize your business operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Find Us</h2>
            <p className="mb-2"><strong>Our Location:</strong><br />G-111, RIICO Mansarover, Jaipur, India, 302020</p>
            <p className="mb-2"><strong>Email Address:</strong><br />enquiry@gosotek.com</p>
            <p><strong>Phone Number:</strong><br />+91 7231955553</p>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Drop Your Requirements</h2>
            <form className="grid gap-4">
              <input type="text" placeholder="Full name" className="p-2 border rounded" required />
              <input type="email" placeholder="Email address" className="p-2 border rounded" required />
              <input type="text" placeholder="Subject" className="p-2 border rounded" />
              <input type="tel" placeholder="Phone number" className="p-2 border rounded" />
              <textarea placeholder="Message" className="p-2 border rounded h-28" required></textarea>
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-10 mt-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-semibold text-lg mb-2">Gosotek</h3>
            <p>Discover cutting-edge IT solutions tailored to optimize your business operations.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
            <ul>
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/services" className="hover:underline">Services</a></li>
              <li><a href="/careers" className="hover:underline">Careers</a></li>
              <li><a href="/support" className="hover:underline">Support</a></li>
              <li><a href="/blog" className="hover:underline">Our Blog</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Contact</h3>
            <p>Email: enquiry@gosotek.com</p>
            <p>Phone: +91 7231955553</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Legal</h3>
            <ul>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/support" className="hover:underline">Support</a></li>
            </ul>
          </div>
        </div>
        <p className="text-center text-xs mt-6">© 2025 Gosotek. All rights reserved.</p>
      </footer>
    </main>
  );
}
