import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://192.168.207.37:5000/api/places')
      .then((res) => setPlaces(res.data))
      .catch((err) => console.error('Error fetching places:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 class="ud">User Dashboard</h2>

      <input class="search"
        placeholder="Search by keyword"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        style={{
          padding: '10px',
          marginBottom: '20px',
          width: '100%',
          maxWidth: '400px',
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {places
          .filter((p) => p.name.toLowerCase().includes(search))
          .map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/place/${p.id}`)}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                borderRadius: '10px',
                cursor: 'pointer',
                width: '250px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <h3>{p.name}</h3>
              <p style={{ fontSize: '0.9em' }}>{p.description.slice(0, 50)}...</p>
              {p.media[0] &&
                (p.media[0].type === 'video' ? (
                  <video
                    src={`http://192.168.207.37:5000/uploads/${p.media[0].filename}`}
                    style={{ width: '100%' }}
                    muted
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    src={`http://192.168.207.37:5000/uploads/${p.media[0].filename}`}
                    alt="preview"
                    style={{ width: '100%' }}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserDashboard;
