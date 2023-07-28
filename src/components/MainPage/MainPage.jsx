import io from 'socket.io-client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Messages from '../Messages/Messages';
import MessageForm from '../MessageForm/MessageForm';
import ToastMessage from '../ToastMessage/ToastMessage';

const socket = io.connect(process.env.REACT_APP_API_URL);

const MainPage = () => {
  const user = useSelector((state) => state.user.user);
  const [newMessage, setNewMessage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleShowModal = () => setShowModal(true);

  return (
    <Container className="container-wrap d-flex flex-column align-items-center">
      <h2 className="m-3">Your mail, {user.name}</h2>
      <Button className="align-self-start" onClick={handleShowModal}>
        <FontAwesomeIcon icon={faPen} className="me-3" />
        Write
      </Button>
      <Messages socket={socket} userName={user.name} setShowToast={setShowToast} setNewMessage={setNewMessage} />
      <MessageForm show={showModal} setShow={setShowModal} />
      <ToastMessage show={showToast} setShow={setShowToast} message={newMessage} />
    </Container>
  );
};

export default MainPage;
