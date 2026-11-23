import React, {useState} from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

export default function App() {
    const [mode, setMode] = useState('signup');
    const [form, setForm] = useState({name: '', email: '', password: '', confirmPassword: ''});
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);

    function update(event) {
        setForm({...form, [event.target.name]: event.target.value});
    }

    async function submit(event) {
        event.preventDefault();
        setMessage('');

        if (mode === 'signup' && form.password !== form.confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        const endpoint = mode === 'signup' ? 'signup' : 'login';
        const body = mode === 'signup'
            ? {name: form.name, email: form.email, password: form.password}
            : {email: form.email, password: form.password};

        try {
            const response = await fetch(`${API}/auth/${endpoint}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || data.detail || 'Please check your details.');

            if (mode === 'signup') {
                setMode('login');
                setForm({...form, password: '', confirmPassword: ''});
                setMessage(data.message);
            } else {
                setUser(data);
            }
        } catch (error) {
            setMessage(error.message || 'Could not connect to the API.');
        }
    }

    if (user) {
        return (
            <main className="card">
                <p className="tag">SIGNED IN</p>
                <h1>Hello, {user.name}!</h1>
                <p className="muted">{user.email}</p>
                <button onClick={() => {
                    setUser(null);
                    setMessage('Signed out.');
                }}>Log out
                </button>
            </main>
        );
    }

    return (
        <main className="card">
            <p className="tag">SIMPLE AUTH DEMO</p>
            <h1>{mode === 'signup' ? 'Create account' : 'Welcome back'}</h1>
            <p className="muted">{mode === 'signup' ? 'Sign up to get started.' : 'Log in to your account.'}</p>
            <form onSubmit={submit}>
                {mode === 'signup' &&
                    <input name="name" placeholder="Full name" value={form.name} onChange={update} required
                           maxLength="80"/>}
                <input name="email" type="email" placeholder="Email address" value={form.email} onChange={update}
                       required/>
                <input name="password" type="password" placeholder="Password (8+ characters)" value={form.password}
                       onChange={update} required minLength="8"/>
                {mode === 'signup' && <input name="confirmPassword" type="password" placeholder="Confirm password"
                                             value={form.confirmPassword} onChange={update} required minLength="8"/>}
                {message && <p className="message" role="status">{message}</p>}
                <button type="submit">{mode === 'signup' ? 'Sign up' : 'Log in'}</button>
            </form>
            <p className="switch">
                {mode === 'signup' ? 'Already have an account?' : 'New here?'}{' '}
                <button className="link" onClick={() => {
                    setMode(mode === 'signup' ? 'login' : 'signup');
                    setMessage('');
                }}>
                    {mode === 'signup' ? 'Log in' : 'Sign up'}
                </button>
            </p>
        </main>
    );
}
