import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../common/Button';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-400">
                ByteBlog
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!user && (
              <Link 
                to="/" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-500/20 transition-colors duration-200"
              >
                Home
              </Link>
            )}
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-500/20 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/posts/create" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-500/20 transition-colors duration-200"
                >
                  Create Post
                </Link>
                <Link 
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-500/20 transition-colors duration-200"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-500/20 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-500/20 transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-amber-500/20 focus:outline-none"
              aria-expanded="false"
            >
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-slate-800 to-slate-900">
          {!user && (
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-500/20 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          )}
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-500/20 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/posts/create"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-500/20 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Create Post
              </Link>
              <Link
                onClick={handleLogout}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-500/20 transition-colors duration-200"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-500/20 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-amber-500/20 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;