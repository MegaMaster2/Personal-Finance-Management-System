import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Dashboard() {
    const { userId } = useParams();
    const [transactions, setTransactions] = useState([]);
    const [form, setForm] = useState({
        category: '',
        amount: '',
        txn_date: new Date().toISOString().split('T')[0],
        note: ''
    });

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/transactions/${userId}`);
            setTransactions(response.data);
        } catch (error) {
            console.error("Failed to fetch transactions", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchTransactions();
        }
    }, [userId]);

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddTransaction = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:5000/transactions/', {
                ...form,
                user_id: parseInt(userId)
            });
            fetchTransactions();
            setForm({ category: '', amount: '', txn_date: new Date().toISOString().split('T')[0], note: '' });
        } catch (error) {
            alert(error.response?.data?.error || "Could not add transaction.");
        }
    };

    return (
        <div>
            <h2>Dashboard for User #{userId}</h2>
            <div className="card">
                <h3>Add New Transaction</h3>
                <form onSubmit={handleAddTransaction}>
                    <input name="category" value={form.category} onChange={handleInputChange} placeholder="Category" required />
                    <input name="amount" type="number" value={form.amount} onChange={handleInputChange} placeholder="Amount" required />
                    <input name="txn_date" type="date" value={form.txn_date} onChange={handleInputChange} required />
                    <input name="note" value={form.note} onChange={handleInputChange} placeholder="Note (Optional)" />
                    <button type="submit">Add Transaction</button>
                </form>
            </div>
            <div className="card">
                <h3>Transactions</h3>
                <ul className="transaction-list">
                    {transactions.map(t => (
                        <li key={t.id}>
                            <span>{new Date(t.date + 'T00:00:00').toLocaleDateString()}</span>
                            <span>{t.category}</span>
                            <span>${t.amount.toFixed(2)}</span>
                            <span>{t.note}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;