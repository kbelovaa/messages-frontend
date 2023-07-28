import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { Autocomplete, TextField } from '@mui/material';
import { fetchUsers } from '../../http/userAPI';
import { createMessage } from '../../http/messageAPI';

const MessageForm = ({ show, setShow }) => {
  const user = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [theme, setTheme] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data.map((user) => user.name)));
  }, []);

  const clearFields = () => {
    setRecipient('');
    setTheme('');
    setMessage('');
  };

  const handleClose = () => {
    setShow(false);
    clearFields();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipientName = recipient[0].toUpperCase() + recipient.slice(1);
    createMessage(theme, message, recipientName, user.id);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Write a message</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Autocomplete
            freeSolo
            options={users}
            onChange={(e, value) => setRecipient(value)}
            required
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter the recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                margin="normal"
                variant="outlined"
              />
            )}
          />
          <Form.Control
            className="mb-2"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            type="text"
            placeholder="Theme"
          />
          <Form.Control
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            as="textarea"
            placeholder="Type a message"
            maxLength="1000"
            rows={3}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Send
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MessageForm;
