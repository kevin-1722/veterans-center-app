import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import msalInstance from './msalInstance'; // Make sure the path matches the file name
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
        // Your existing login logic
    };

    const handleMsalLogin = () => {
        msalInstance.loginPopup().then(response => {
            localStorage.setItem('msalAccount', response.account.username);
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
