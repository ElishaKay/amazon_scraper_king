import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import '.././node_modules/nprogress/nprogress.css';
import Search from './blog/Search';
import { useRouter } from 'next/router';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <h1><NavLink className="pointer font-weight-bold">{APP_NAME}</NavLink></h1>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <React.Fragment>
               <NavItem>
                 <Link href="/">
                    <h5><NavLink className="pointer">Explore</NavLink></h5>
                  </Link>
              </NavItem>
            
              <NavItem>
                 <Link href="/getting-started">
                     <h5><NavLink className="pointer">Get Started</NavLink></h5>
                    </Link>
              </NavItem>

              <NavItem>
                 <Link href="/privacy-policy">
                     <h5><NavLink className="pointer">Privacy Policy</NavLink></h5>
                    </Link>
              </NavItem>

              <NavItem>
                <Link href="/contact">
                   <h5><NavLink className="pointer">Reach Out</NavLink></h5>
                 </Link>
              </NavItem>
            </React.Fragment>

            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                     <h5><NavLink className="pointer">Log in</NavLink></h5>
                  </Link>
                </NavItem>
                  <NavItem>
                  <h5><a href="/signup" className="btn btn-primary text-light">
                    Free Membership
                  </a></h5>
                </NavItem>
            </React.Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/user">
                  <h5><NavLink className="pointer">{`${isAuth().name}'s Dashboard`}</NavLink></h5>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <h5><NavLink className="pointer">{`${isAuth().name}'s Dashboard`}</NavLink></h5>
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <h5><NavLink className="pointer" style={{ cursor: 'pointer' }} onClick={() => signout(() => Router.replace(`/signin`))}>
                  Signout
                </NavLink></h5>
              </NavItem>
            )}

          </Nav>
        </Collapse>
      </Navbar>
      {!router.pathname.includes('signup') &&
        !router.pathname.includes('signin') && <Search />
      }
      
    </React.Fragment>
  );
};

export default Header;

