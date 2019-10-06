import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import socketIOClient from 'socket.io-client';

import './Profile.css';

export default function Profile() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const loggedUserId = localStorage.getItem('user');
  const socket = useMemo(() => {
    return socketIOClient(
      'http://10.0.0.14:3333', {
        query: { user_id: loggedUserId }
      }
    );
  }, [loggedUserId]);


  useEffect(() => {
    socket.on('booking request', data => {
      setRequests([...requests, data]);
    });
  }, [requests, socket]);


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

  async function handleAccept(id) {
    await api.post(`/booking/${id}/approval`);

    setRequests(
      requests.filter(request => request._id !== id)
    );
  }

  async function handleReject(id) {
    await api.post(`/booking/${id}/rejection`);

    setRequests(
      requests.filter(request => request._id !== id)
    );
  }

  return (
    <>
      <ul className="notification">
        {requests.map(request => {
          return <li key={request._id}>
            <p>
              <strong>{request.user.email} </strong>
              is requesting a booking in
              <strong> {request.spot.company} </strong>
              , on date <strong>{request.date}</strong>
            </p>

            <button 
              className="accept" 
              onClick={() => handleAccept(request._id)}
            >
              ACCEPT
            </button>
            <button 
              className="reject" 
              onClick={() => handleReject(request._id)}
            >
              DECLINE
            </button>
          </li>
        })}
      </ul>

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
