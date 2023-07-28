import React, { useEffect, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import formatDistance from 'date-fns/formatDistance';
import { Accordion, Table } from 'react-bootstrap';
import { fetchMessages } from '../../http/messageAPI';
import './styles.scss';

const Messages = ({ socket, userName, setShowToast, setNewMessage }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (userName) {
      fetchMessages(userName).then((data) => setMessages(data));
    }
  }, [userName]);

  useEffect(() => {
    socket.on('new-message', ({ message }) => {
      if (message.recipient === userName) {
        setMessages((messages) => [message, ...messages]);
        setShowToast(true);
        setNewMessage(message);
      }
    });

    return () => {
      socket.off('new-message');
    };
  }, [setMessages, socket, userName]);

  const formatDate = (dateStr) => {
    const date = parseISO(dateStr);
    return formatDistance(date, new Date(), { addSuffix: true });
  };

  return (
    <Table className="mt-5" striped bordered hover>
      <thead>
        <tr>
          <th className="cell-sender">Sender</th>
          <th className="cell-subject">Subject</th>
          <th className="cell-date">Date</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message, index) => (
          <tr key={message.id}>
            <td>{message.user.name}</td>
            <td>
              <Accordion>
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>{message.theme}</Accordion.Header>
                  <Accordion.Body>
                    <h6>Message text:</h6>
                    {message.text}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </td>
            <td>{formatDate(message.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Messages;
