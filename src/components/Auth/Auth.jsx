import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { login } from '../../http/userAPI';
import { setUserAction, setIsAuthAction } from '../../store/actions/userActions';
import './styles.scss';

const Auth = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = name[0].toUpperCase() + name.slice(1);
    const user = await login(userName);
    dispatch(setUserAction(user));
    dispatch(setIsAuthAction(true));
    navigate('/');
  };

  return (
    <Container className="container-wrap d-flex justify-content-center align-items-center">
      <Card className="auth-card p-5">
        <h2 className="m-auto">Authorization</h2>
        <Form onSubmit={handleSubmit} className="d-flex flex-column">
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            type="text"
            placeholder="Enter your name"
            required
          />
          <Button type="submit" className="mt-3 mb-3" variant="primary">
            Log in
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
