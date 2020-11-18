import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import {Col, Row, Container, Card, CardHeader, CardBody, Button, Badge} from 'reactstrap'
import NavBarLog from './../../NavBarLog'
import {Link} from 'react-router-dom'

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';


let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const ENDPOINT = 'https://project-chat-application.herokuapp.com/';
  const ENDPOINT = `http://${window.location.hostname}:5005/`;
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)
    
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }


  return (
    <>
    <Container fluid>
      <Row>
        <Col md={6}>
          <div className="outerContainer">
            <div className="inner-container">
              {console.log(room)}
              {console.log(users)}
              <InfoBar room={room} users={users}/>
              <Messages messages={messages} name={name} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
          </div>
        </Col>
        <Col md={6}>
          <Card style={{marginTop:"100px"}}>
            <CardHeader>Other Public Rooms: <p className="bg-success text-white small font-weight-bold px-2 py-1 rounded d-inline-block" >(Discussion rooms are completely active from 9PM-11AM)</p></CardHeader>
            <hr />
            <CardBody>
              <Col md={12}>
                <a style={{textDecoration:"none"}} href={`/chat?name=${JSON.parse(localStorage.getItem('user')).firstName+JSON.parse(localStorage.getItem('user')).lastName}&room=General`}>
                  <Button style={{margin:"10px"}} block color="success" outline>General</Button>
                </a>
              </Col>
              <Col md={12}>
                <a style={{textDecoration:"none"}} href={`/chat?name=${JSON.parse(localStorage.getItem('user')).firstName+JSON.parse(localStorage.getItem('user')).lastName}&room=Physics`}>
                  <Button style={{margin:"10px"}} block color="primary" outline>Physics</Button>
                </a>
              </Col>
              <Col md={12}>
                <a style={{textDecoration:"none"}} href={`/chat?name=${JSON.parse(localStorage.getItem('user')).firstName+JSON.parse(localStorage.getItem('user')).lastName}&room=Chemistry`}>
                  <Button style={{margin:"10px"}} block color="info" outline>Chemistry</Button>
                </a>
              </Col>
              <Col md={12}>
                <a style={{textDecoration:"none"}} href={`/chat?name=${JSON.parse(localStorage.getItem('user')).firstName+JSON.parse(localStorage.getItem('user')).lastName}&room=Biology`}>
                  <Button style={{margin:"10px"}} block color="warning" outline>Biology</Button>
                </a>
              </Col>
              <Col md={12}>
                <a style={{textDecoration:"none"}} href={`/chat?name=${JSON.parse(localStorage.getItem('user')).firstName+JSON.parse(localStorage.getItem('user')).lastName}&room=Maths`}>
                  <Button style={{margin:"10px"}} block color="danger" outline>Maths</Button>
                </a>
              </Col>
              <hr /><br />
              <p className="bg-danger text-white small font-weight-bold px-2 py-1 rounded d-inline-block" >Any kind of nuisance or foul language will lead to termination of your Mentomeet account... </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Chat;
