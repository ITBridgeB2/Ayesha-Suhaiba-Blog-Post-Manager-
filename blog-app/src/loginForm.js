import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogService from './blogService';
import { Filter } from 'bad-words'; // Correct import

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const filter = new Filter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for bad words in email or password
    if (filter.isProfane(email) || filter.isProfane(password)) {
      alert('Please avoid using inappropriate language.');
      return;
    }

    try {
      const response = await blogService.validateLogin(email, password);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('blogUser', JSON.stringify(user));

      alert(`Welcome, ${user.name}`);
      navigate('/dash');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        alert(`Server responded with ${error.response.status}: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        alert('No response from server. Please check if the backend is running.');
      } else {
        alert('Request setup error: ' + error.message);
      }
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI' }}>
      <header style={{
        background: '#1d3557', color: '#fff', padding: '20px',
        textAlign: 'center', fontSize: '24px'
      }}>
        Login Page
      </header>

      <main style={{
        display: 'flex', justifyContent: 'center',
        alignItems: 'center', height: 'calc(100vh - 80px)',
        backgroundColor: '#f1f2f6'
      }}>
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#fff', padding: '30px', borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '300px'
        }}>
          <h2 style={{ textAlign: 'center', color: '#1d3557' }}>Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '15px', width: '100%', padding: '10px' }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '15px', width: '100%', padding: '10px' }}
          />
          <button type="submit" style={{
            width: '100%', padding: '10px', background: '#1d3557',
            color: '#fff', border: 'none', borderRadius: '8px'
          }}>
            Login
          </button>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;
