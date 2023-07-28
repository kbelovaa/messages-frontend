import React from 'react';
import parseISO from 'date-fns/parseISO';
import formatDistance from 'date-fns/formatDistance';
import { Toast } from 'react-bootstrap';
import './styles.scss';

const ToastMessage = ({ show, setShow, message }) => {
  const handleClose = () => setShow(false);

  const formatDate = (dateStr) => {
    const date = parseISO(dateStr);
    return formatDistance(date, new Date(), { addSuffix: true });
  };

  if (Object.keys(message).length !== 0) {
    return (
      <Toast onClose={handleClose} show={show} delay={5000} autohide className="toast-message">
        <Toast.Header>
          <strong className="me-auto">{message.user.name}</strong>
          <small>{formatDate(message.createdAt)}</small>
        </Toast.Header>
        <Toast.Body>New message with a subject "{message.theme}"</Toast.Body>
      </Toast>
    );
  }
};

export default ToastMessage;
