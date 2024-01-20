import React, { useEffect, useState } from 'react'
import './chat.css'
import {user} from '../Join/join.js';
import socketio from 'socket.io-client';
import sendlogo from '../../images/send.png'
import Message from '../Messages/message.js';
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from '../../images/closeIcon.png';

let socket;

// const ENDPOINT = "https://demo-cchat.herokuapp.com/";

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {

  const [id, setid] = useState("");
  const [messages, setMessages] = useState([])

  const send = () => {
    const message = document.getElementById('chatinput').value;
    socket?.emit('message', {message,id});
    document.getElementById('chatinput').value="";
  }
  console.log(messages);
  useEffect(() => {
    socket = socketio(ENDPOINT, {transports: ['websocket']});

    socket.on('connect', () => {
      alert('connected');
      setid(socket.id);
    })
    console.log(socket);

    socket.emit('joined', {user})

    socket.on('welcome', (data)=>{
      setMessages([...messages, data]);
      console.log(data.user,data.message);
    })

    socket.on('user joined', (data)=>{
      setMessages([...messages, data]);
      console.log(data.user,data.message);
    })

    socket.on('leave', (data)=>{
      setMessages([...messages, data]);
      console.log(data.user,data.message);
    })

    return () => {
      socket.disconnect();
    }

  }, []);

  useEffect(() => {
      socket?.on('sendMessage', (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.message, data.id);
      });
      return () => {
        socket?.off();
      };
    }, [messages]);
  

  return (
    <div className='chatpage'>

                <div className='chatcontainer'>
                  <div className="header">
                  <h1>SAY HELLO</h1>
                  <a href="/"> <img src={closeIcon} alt="Close" /></a>
                  </div>
                  
                  <ReactScrollToBottom className="chatbox">
                            {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                  </ReactScrollToBottom>
                  
                  <div className="inputbox">
                    <input onKeyDown={(event) => event.key === 'Enter' ? send() : null} type="text" id='chatinput' />
                    <button onClick={send} className="sendbtn"><img src={sendlogo} alt="Send" /></button>
                  </div>
                </div>
    </div>
  )
}

export default Chat