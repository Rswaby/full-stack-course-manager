import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context';

function Header() {
  const { authenticatedUser } = useContext(Context);
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/"> Courses </Link>
        </h1>
        <nav>
          {authenticatedUser ? (
            <ul className="header--signedin">
              <li><span>{`Hello ${authenticatedUser.firstName}`}</span></li>
              <li><Link to="/signout">Sign Out</Link></li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li><Link to="/signup">Sign up</Link></li>
              <li><Link to="/signin">Sign in</Link></li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
