import React, { useState } from 'react'
import './join.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'

let user;

const sendUser=()=>{

  user = document.getElementById('joininput').value;
  document.getElementById('joininput').value = '';
}

const Join = () => {

  const [name, setname] = useState('');

  return (
    <div className='joinpage'>
        <div className='joincontainer'>
          <img src={logo} alt="logo" />
            <h1>SAY HELLO</h1>
            <input onChange={(e) => setname(e.target.value)} type="text" id='joininput' placeholder='Enter Your Name' />
            <Link onClick={(e)=> !name ? e.preventDefault():null} to='/chat'><button onClick={sendUser} className='joinbtn'>Log in</button></Link> 
        </div>
    </div>
  )
}

export default Join
export {user}
