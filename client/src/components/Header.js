import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/"> Courses </Link>
        </h1>
        <nav>
          <ul className="header--signedout">
            <li><Link to="/signup">Sign up</Link></li>
            <li><Link to="/signin">Sign in</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
