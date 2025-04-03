import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>My Art</div>
      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/cart" style={styles.cart}>🛒 Cart</Link> {/* ✅ Added cart */}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#eee',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  cart: {
    fontWeight: 'bold',
    color: '#000',
    textDecoration: 'none',
  },
};
