import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
  const [email, setEmail] = useState('');

    async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/user', { email });
    const { _id: id } = response.data;

    localStorage.setItem('user', id);
    history.push('/profile');

    console.log(id);
  }

  return (
    <>
      <p>
        Offer <strong>spots</strong> to developers
        and find <strong>talents </strong>
        for your company.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL</label>
        <input 
          type="email" 
          id="email" 
          placeholder="Your best e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </>
  );
}
