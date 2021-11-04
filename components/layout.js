import Alert from './alert';
import NavBar from './navbar';
import Footer from './footer';
import Meta from './meta';

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
