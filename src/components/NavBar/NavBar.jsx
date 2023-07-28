import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { setUserAction, setIsAuthAction } from '../../store/actions/userActions';
import './styles.scss';

const NavBar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(setUserAction(''));
    dispatch(setIsAuthAction(false));
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar className="justify-content-between" bg="dark" variant="dark">
      <Navbar.Brand className="navbar-title ms-4" onClick={() => navigate('/')}>
        Messages
      </Navbar.Brand>
      <Nav>
        {isAuth ? (
          <Button className="m-2" variant="outline-light" onClick={logOut}>
            Log out
          </Button>
        ) : (
          <Button className="m-2" variant="outline-light" onClick={() => navigate('/login')}>
            Log in
          </Button>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
