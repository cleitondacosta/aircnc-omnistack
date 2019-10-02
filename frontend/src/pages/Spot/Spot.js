import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import './Spot.css';
import camera from '../../assets/camera.svg';

export default function Spot({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    const id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spot', data, {
      headers: { user_id: id }
    });

    history.push('/profile');
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <label 
        id="thumbnail" 
        style={{backgroundImage: `url(${preview})`}}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input
          type="file" 
          onChange={e => setThumbnail(e.target.files[0])}
        />
        <img src={camera} alt="Select" />
      </label>

      <label htmlFor="company">Company</label>
      <input 
        id="company"
        placeholder="Your amazing company"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />

      <label htmlFor="techs">Technologies</label>
      <input 
        id="techs"
        placeholder="Which technologies they use"
        value={techs}
        onChange={e => setTechs(e.target.value)}
      />

      <label htmlFor="price">Dayly charges</label>
      <input 
        id="price"
        placeholder="Value charged by day"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <button className="btn" type="submit">
        Create new spot
      </button>
    </form>
  )
}
