import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>My Art</div>
      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/classic">Classic Art</Link>
        <Link to="/digital">Digital Art</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  )
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
    gap: '1rem',
  },
}
