import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const serverUri = import.meta.env.VITE_JWT_TRIAL_SERVER_URI;


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Login:', { username, password });

        const response = await fetch(`${serverUri}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();
        console.log(data);

        if(response.ok) {
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        }
        else console.log('Error Occured');
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
