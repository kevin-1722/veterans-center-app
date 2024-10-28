import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { msalInstance, loginRequest } from './msalInstance'; // Make sure the path matches the file name
import './login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const initializeMsal = async () => {
            await msalInstance.initialize();
        };
        initializeMsal();
    }, []);

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
  
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token); // Save token
          navigate('/secure'); // Redirect to secure page
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      }
    };

    const handleMsalLogin = () => {
      msalInstance.loginPopup(loginRequest).then(async (response) => {
        localStorage.setItem('msalAccount', response.account.username);
        console.log('Login Response:', response);
        console.log('Bearer Access Token:', response.accessToken);
        navigate('/secure');
      }).catch(error => {
        console.error(error);
        setError('Microsoft login failed. Please try again.');
      });
    };
    return (
        <div className="login-container">
            <img src="https://i.imgur.com/SROEj2Q.jpeg" alt="Logo" className="logo" />
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-button">Submit</button>
            </form>
            <button onClick={handleMsalLogin} className="login-button">Login with Microsoft</button>
        </div>
    );
}

export default Login;