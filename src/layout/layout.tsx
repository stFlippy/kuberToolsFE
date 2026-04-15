import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header style={styles.header}>
        <div style={styles.logo}>QUABER</div>

        <nav style={styles.nav}>
          <Link style={styles.link} to="/pods">Pods</Link>
          <Link style={styles.link} to="/deployments">Deployments</Link>
        </nav>
      </header>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "linear-gradient(90deg, #1e3c72, #2a5298)",
    color: "white"
  },
  logo: {
    fontWeight: "bold",
    fontSize: "20px"
  },
  nav: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "white",
    textDecoration: "none"
  },
  main: {
    padding: "20px"
  }
};