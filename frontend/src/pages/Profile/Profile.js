import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './Profile.css';

export default function Profile() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const loggedUserId = localStorage.getItem('user');
      const response = await api.get('/profile', {
        headers: { user_id: loggedUserId }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  function renderSpots() {
    return spots.map(spot => {
      return (
        <li key={spot._id}>
          <header
            style={
              { 
                backgroundImage: `url(${spot.thumbnail_url})`,
              }
            }
          />
          <strong>{spot.company}</strong>
          <span>{
            spot.price ? `R$${spot.price}/day` : `FREE`
          }</span>
        </li>
      );
    });
  }

  return (
    <>
      <ul className="spot-list">
        {renderSpots()}
      </ul>

      <Link to="/spot">
        <button className="btn">
          Create new Spot
        </button>
      </Link>
    </>
  )
}
