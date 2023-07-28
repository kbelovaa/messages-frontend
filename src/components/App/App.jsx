import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { fetchUser } from '../../http/userAPI';
import { setUserAction, setIsAuthAction } from '../../store/actions/userActions';
import NavBar from '../NavBar/NavBar';
import MainPage from '../MainPage/MainPage';
import Auth from '../Auth/Auth';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const [defaultRoute, setDefaultRoute] = useState('');

  const userName = localStorage.getItem('user') ?? null;

  useEffect(() => {
    if (userName) {
      fetchUser(userName).then((data) => dispatch(setUserAction(data)));
      dispatch(setIsAuthAction(true));
      setDefaultRoute('/');
    } else {
      setDefaultRoute('/login');
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          {isAuth && <Route path="/" element={<MainPage />} />}
          <Route path="/login" element={<Auth />} />
          <Route path="/*" element={<Navigate to={defaultRoute} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
