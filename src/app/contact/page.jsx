'use client';

import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function ContactPage() {
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

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('Message sent successfully!');
        setForm({ name: '', email: '', subject: '', phone: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('Error sending message.');
    }
  };

  return (
    <section className="bg-gray-100 text-gray-900 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg mb-8">Reach out to us directly for queries or support.</p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Address</h4>
                <p>G-111, RIICO Mansarover, Jaipur, India, 302020</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p>badebhaiyyasikar@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-blue-600 w-6 h-6 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p>+91 7740887583</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
              className="p-2 border rounded"
              required
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              className="p-2 border rounded"
              required
            />
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              type="text"
              placeholder="Subject"
              className="p-2 border rounded"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Phone Number"
              className="p-2 border rounded"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="p-2 border rounded h-28"
              required
            />
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
              Send Message
            </button>
            <p className="text-sm text-gray-600">{status}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
