import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () =>
  (<div>
    <ul>
      <li><Link to="signup">Signup</Link></li>
      <li><Link to="signin">Signin</Link></li>
    </ul>
  </div>
  );

export default NavBar;
