import { Link, useLocation } from 'react-router-dom';
import { InstallPrompt } from './InstallPrompt';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="layout">
      <InstallPrompt />

      <header className="header">
        <h1 className="app-title">SSH Helper</h1>
      </header>

      <nav className="nav">
        <Link
          to="/"
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/hosts"
          className={`nav-link ${isActive('/hosts') ? 'active' : ''}`}
        >
          Hosts
        </Link>
        <Link
          to="/builder"
          className={`nav-link ${isActive('/builder') ? 'active' : ''}`}
        >
          Builder
        </Link>
        <Link
          to="/help"
          className={`nav-link ${isActive('/help') ? 'active' : ''}`}
        >
          Help
        </Link>
        <Link
          to="/about"
          className={`nav-link ${isActive('/about') ? 'active' : ''}`}
        >
          About
        </Link>
      </nav>

      <main className="main">
        {children}
      </main>
    </div>
  );
};
