'use client';
import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function FindUsSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus('✅ Message sent!');
      setForm({ name: '', email: '', subject: '', phone: '', message: '' });
    } else {
      setStatus('❌ Failed to send message.');
    }
  };

  return (
    <section className="bg-gray-100 text-gray-900 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left: Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Find Us</h2>
          <p className="text-lg mb-8">Reach out via email, phone, or visit our office.</p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Our Location</h4>
                <p className="text-gray-700">G-111, RIICO Mansarover, Jaipur, India, 302020</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Email Address</h4>
                <p className="text-gray-700">badebhaiyyasikar@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Phone Number</h4>
                <p className="text-gray-700">+91 7740887583</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Drop Your Requirements</h2>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <input name="name" onChange={handleChange} value={form.name} type="text" placeholder="Full name" className="p-2 border rounded" required />
            <input name="email" onChange={handleChange} value={form.email} type="email" placeholder="Email address" className="p-2 border rounded" required />
            <input name="subject" onChange={handleChange} value={form.subject} type="text" placeholder="Subject" className="p-2 border rounded" />
            <input name="phone" onChange={handleChange} value={form.phone} type="tel" placeholder="Phone number" className="p-2 border rounded" />
            <textarea name="message" onChange={handleChange} value={form.message} placeholder="Message" className="p-2 border rounded h-28" required />
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Send Message</button>
            <p className="text-sm text-gray-600">{status}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
