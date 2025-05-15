import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogService from './blogService';

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    blogService
      .registerUser(formData)
      .then(() => {
        alert('Registered successfully!');
        navigate('/');
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Registration failed');
        console.error(err);
      });
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 40px',
    background: '#1d3557',
    color: '#ffffff',
    fontFamily: 'Segoe UI, sans-serif',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    height: '80px',
    fontSize: '28px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  };

  const mainStyle = {
    height: 'calc(100vh - 80px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f2f6',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const formContainerStyle = {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '320px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '25px',
    backgroundColor: '#1d3557',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const navStyle = {
    position: 'absolute',
    right: '40px',
    display: 'flex',
    gap: '15px',
  };

  return (
    <div>
      <header style={headerStyle}>
        Register Page
        <nav style={navStyle}>
          <button style={buttonStyle} onClick={() => navigate('/')}>
            Home
          </button>
        </nav>
      </header>

      <main style={mainStyle}>
        <div style={formContainerStyle}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1d3557' }}>
            Create Account
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
              Register
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
