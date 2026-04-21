import { Link, Outlet } from "react-router-dom";
import logo from "./Logo.png"


function Layout() {
  return (
    <div>
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src={logo} alt="QUABER" style={styles.img} />
          <span>Quaber</span>
        </div>

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
  img: {
    height: "50px", 
    width: "auto",
    display: "block"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "linear-gradient(90deg, #1e3c72, #2a5298)",
    color: "white",
  },
  logo: {
    display: "flex",
    fontWeight: "bold",
    fontSize: "40px",
    alignItems: "center",
    gap: "15px"
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