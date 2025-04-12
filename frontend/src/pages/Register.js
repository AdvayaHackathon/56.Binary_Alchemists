import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    await axios.post('http://192.168.207.37:5000/api/register', { username, password });
    alert('Registered');
  };

  return (
    <div class="login">
      <h2>User Registration</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
