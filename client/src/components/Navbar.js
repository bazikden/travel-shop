import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import Axios from 'axios';
import { LOGOUT } from '../redux/reducers/types';
import { upload } from '../images/images'
import {logo} from '../images/images'

const AppNavbar = (props) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const onLogout = () => {
    Axios.get('api/users/logout')
      .then(res => {
        if (res.data.success) {
          dispatch({ type: LOGOUT })
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Navbar className="fixed-top" color="light" light expand="md">
        <NavbarBrand style={{padding:0}} href="/"><img style={{width:'70px',height:'40px'}} src={logo} alt="Logo"/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="d-flex w-100" navbar>
            <NavItem className="p-2 mr-auto">
              <NavLink to="">Home</NavLink>
            </NavItem>
            {/* <NavItem className="mr-auto p-2">
              <NavLink to=""></NavLink>
            </NavItem> */}

            {
              user.loginSuccess ?
                (
                  <>
                    <NavItem style={{ width: '20px', height: '20px', margin: '8px 8px 0', cursor: 'pointer'  }}>
                      <NavLink to='/upload'>
                        <img className="w-100" alt="upload" src={upload} />
                      </NavLink>
                    </NavItem>
                    <NavItem className="p-2">
                      <NavLink to="">{user.userData && user.userData.name}</NavLink>
                    </NavItem>
                    <span className="p-2 divider">|</span>
                    <NavItem onClick={onLogout} className="p-2">
                      <NavLink to="">Log Out</NavLink>
                    </NavItem>
                  </>

                )
                :
                (
                  <>
                    <NavItem className="p-2">
                      <NavLink to="/register">Sign In</NavLink>
                    </NavItem>
                    <span className="p-2 divider">|</span>
                    <NavItem className="p-2">
                      <NavLink to="/login">Login</NavLink>
                    </NavItem>
                  </>
                )
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavbar;