import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-neutral-100 border-t py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        
        <p>© {new Date().getFullYear()} Nasir Alsamarraie. All rights reserved.</p>

        <nav className="flex gap-4">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <Link to="/shop" className="hover:text-black transition">Shop</Link>
          <Link to="/contact" className="hover:text-black transition">Contact</Link>
        </nav>

        <div className="flex gap-3">
          <a href="https://www.instagram.com/nasirthamir/" target="_blank" rel="noreferrer" className="hover:text-black transition">
            Instagram
          </a>
          <a href="https://www.facebook.com/people/Nasir-Thamir-Art/100062342963502/" target="_blank" rel="noreferrer" className="hover:text-black transition">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
