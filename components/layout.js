import Alert from "../components/alert";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import Meta from "../components/meta";

export default function Layout({ navMenuItems, preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <NavBar menuItems={navMenuItems} />
        <main className="site-content" role="main">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
