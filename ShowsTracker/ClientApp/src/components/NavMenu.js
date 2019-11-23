import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Login';
import './NavMenu.css';

const NavMenu = props => {
  const { isLoggedIn } = props;
  const { logout } = props;

  return (
    <Navbar inverse fixedTop fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={'/'}>ShowsTracker</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
         
          {!isLoggedIn && 
            <LinkContainer to={'/login'}>
              <NavItem>
                <Glyphicon glyph='user' /> Login
              </NavItem>
            </LinkContainer>
          }
          {isLoggedIn && 
             <LinkContainer to={'/searchshows'}>
                <NavItem>
                  <Glyphicon glyph='film' /> Search shows
                </NavItem>
              </LinkContainer>
          }
          {isLoggedIn &&
            <NavItem onClick={logout} > 
              <Glyphicon glyph='user' /> Logout
            </NavItem>
          }

        </Nav>
      </Navbar.Collapse>
    </Navbar>    
  )
};

export default connect(
  state => state.user,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(NavMenu);

