export default function ContactForm() {
  return (
    <form className="space-y-4">
      <input type="text" placeholder="Full name" className="w-full p-2 border rounded" />
      <input type="email" placeholder="Email address" className="w-full p-2 border rounded" />
      <input type="text" placeholder="Subject" className="w-full p-2 border rounded" />
      <input type="tel" placeholder="Phone number" className="w-full p-2 border rounded" />
      <textarea placeholder="Message" className="w-full p-2 border rounded h-24"></textarea>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send Message</button>
    </form>
  );
}
