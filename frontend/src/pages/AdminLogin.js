import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      await axios.post('http://192.168.207.37:5000/api/admin/login', { username, password });
      navigate('/admin-dashboard');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div class="login">
      <h2>Admin Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default AdminLogin;
