import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [file, setFile] = useState(null);
  const [type, setType] = useState('video');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.207.37:5000/api/places').then((res) => setPlaces(res.data));
  }, []);

  const addPlace = () => {
    axios.post('http://192.168.207.37:5000/api/places', { name, description: desc }).then(() => {
      alert('Place added');
    });
  };

  const uploadMedia = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('place_id', placeId);
    axios.post('http://192.168.207.37:5000/api/upload', formData).then(() => {
      alert('Uploaded');
    });
  };

  return (
    <div class="ad">
      <h2>Admin Dashboard</h2>
      <div class="addplace">
      <h3>Add Place</h3>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Description" onChange={(e) => setDesc(e.target.value)} />
      <button onClick={addPlace}>Add</button>
      </div><br/>
      <div class="upload">
      <h3>Upload VR Media</h3>
      <select onChange={(e) => setPlaceId(e.target.value)}>
        {places.map((p) => (
          <option value={p.id} key={p.id}>{p.name}</option>
        ))}
      </select>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="video">360 Video</option>
        <option value="photo">360 Photo</option>
      </select>
      <input  type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadMedia}>Upload</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
