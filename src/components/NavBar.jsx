import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button'
import { logo } from '../assets'
import { navItems } from '../constants';

const NavBar = ({isAuth, onSetAuth}) => {

  return (
    <nav className="nav-bar shadow-8">
      <Link to="/" className='site-title'>
        <Image src={logo} ></Image>
      </Link>
      <ul className='nav-items'>
        {navItems.map((navi, index) => (
          <CustomLink key={navi.id} to={navi.path}>{navi.title}<span></span></CustomLink>
        ))}
      </ul>
      <div className="auth-button">
        {
          isAuth? (
            <>
              <Button label="Sign out" rounded onClick={onSetAuth}/>
            </>
          ) : (
            <>
              <Link className='user-login' to='/login' >
                <Button className='login-btn' label="Sign in" rounded />
              </Link>
              <Link className='user-register' to='/register' >
                Sign up
              </Link>
            </>
          )
        }
      </div>
      
    </nav>
  );
};

function CustomLink({key, to, children, ...props}) {
  const resolvePath = useResolvedPath(to);
  const isActive = useMatch({path: resolvePath.pathname, end:true});
  return (
    <li key={key} className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default NavBar;