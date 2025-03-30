export default function Footer() {
    return (
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Ahmad Al Alousi</p>
        <div style={styles.socials}>
          <a href="https://instagram.com" target="_blank">Instagram</a>
          <a href="https://facebook.com" target="_blank">Facebook</a>
        </div>
      </footer>
    )
  }
  
  const styles = {
    footer: {
      marginTop: 'auto',
      padding: '1rem',
      textAlign: 'center',
      backgroundColor: '#eee',
    },
    socials: {
      marginTop: '0.5rem',
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
    },
  }
  