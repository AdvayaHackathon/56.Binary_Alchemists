import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PlaceDetails() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    axios.get(`http://192.168.207.37:5000/api/places/${id}`)
      .then(res => {
        setPlace(res.data);
      })
      .catch(err => console.error('Error loading place:', err));
  }, [id]);

  if (!place) return React.createElement('div', null, 'Loading...');

  const mediaElements = place.media && place.media.length > 0
    ? place.media.map(m => {
        if (m.type === 'video') {
          return React.createElement('video', {
            key: m.id,
            src: `http://192.168.207.37:5000/uploads/${m.filename}`,
            controls: true,
            style: { width: '100%', maxWidth: '800px', marginBottom: '20px' }
          });
        } else {
          return React.createElement('a', {
            key: m.id,
            href: `/vr-viewer/${m.filename}?title=${encodeURIComponent(place.name)}`,
            target: '_blank',
            rel: 'noopener noreferrer',
            style: { textDecoration: 'none' }
          }, React.createElement('div', {
            style: {
              width: '100%',
              height: '300px',
              backgroundImage: `url(http://192.168.207.37:5000/uploads/${m.filename})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '24px',
              backgroundColor: 'black',
              borderRadius: '8px'
            }
          }, 'Tap to View in VR'));
        }
      })
    : [React.createElement('p', null, 'No media available')];

  return React.createElement('div', { style: { padding: '20px' } },
    React.createElement('h2', null, place.name),
    React.createElement('p', null, place.description),
    ...mediaElements
  );
}

export default PlaceDetails;
