import { useLocation, Link } from 'react-router-dom';

export default function ThankYou() {
  const location = useLocation();
  const fromOrder = location.state?.fromOrder === true;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Thank You!</h1>
      {fromOrder ? (
        <p>Your order has been received. We'll be in touch shortly with confirmation details.</p>
      ) : (
        <p>Your inquiry has been received. We’ll be in touch shortly.</p>
      )}

      <Link
        to="/shop"
        style={{
          display: 'inline-block',
          marginTop: '2rem',
          backgroundColor: 'black',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '6px',
          textDecoration: 'none',
        }}
      >
        Back to Shop
      </Link>
    </div>
  );
}
