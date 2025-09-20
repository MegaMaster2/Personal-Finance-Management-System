import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // This sends the registration data to your backend
            await axios.post('http://127.0.0.1:5000/auth/register', {
                name,
                email,
                password
            });
            
            // On success, navigate to the login page
            navigate('/login');

        } catch (err) {
            // If there's an error, display it
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="card">
            <h2>Register an Account</h2>
            <form onSubmit={handleRegister}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" required />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
                <button type="submit">Register</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
}

export default Register;