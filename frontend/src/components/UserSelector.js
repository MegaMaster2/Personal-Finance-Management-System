import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserSelector() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/register', {
                name,
                email,
                password
            });
            const userId = response.data.user_id;
            if (userId) {
                navigate(`/dashboard/${userId}`);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed.');
        }
    };

    return (
        <div className="card">
            <h2>Create a User to Begin</h2>
            <form onSubmit={handleRegister}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
                <button type="submit">Create User & Start</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default UserSelector;