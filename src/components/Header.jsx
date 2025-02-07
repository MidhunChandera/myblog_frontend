import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [active, setActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleMenu = () => {
    setActive(!active);
  };

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      navigate('/'); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); 
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    setActive(false); 
  }, [navigate]);

  return (
    <nav className="w-100">
      <div className="logo d-flex align-items-center">
        <h4 className="ms-2 mb-0 d-none d-sm-block">
          My<span className="greentxt">Blogs<span className='text-primary'> In</span></span>
        </h4>
      </div>

      <ul className={active ? 'active' : ''}>
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* Show Create Blog link only if logged in */}
        {isLoggedIn && (
          <li>
            <Link to="/create">Create Blog</Link>
          </li>
        )}

        <li>
          <Link to="/about">About</Link>
        </li>

        {/* Show My Blogs link only if logged in */}
        {isLoggedIn && (
          <li>
            <Link to="/myblogs">My Blogs</Link>
          </li>
        )}

   
        <li>
          {isLoggedIn ? (
            <button style={{textDecoration:"none", color:'black'}} onClick={handleLogout} className="btn btn-link">Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>

      <div className="menus" onClick={handleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </nav>
  );
}

export default Header;
