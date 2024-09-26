import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const IssueForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState(null); // User's detected location
  const [manualAddress, setManualAddress] = useState('');
  const [useManualAddress, setUseManualAddress] = useState(false);

  // Function to detect the current location
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error detecting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    if (useManualAddress) {
      formData.append('address', manualAddress);
    } else {
      formData.append('location', position);
    }

    // Send issue data to server
    await axios.post('/api/issues/report', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Report a New Issue</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border mb-4"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border mb-4"
        />
        <input type="file" onChange={handleImageChange} className="mb-4" />
        
        <label className="block mb-4">
          <input
            type="checkbox"
            checked={useManualAddress}
            onChange={() => setUseManualAddress(!useManualAddress)}
            className="mr-2"
          />
          Use manual address
        </label>

        {useManualAddress ? (
          <input
            type="text"
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            placeholder="Enter address manually"
            className="w-full p-2 border mb-4"
          />
        ) : (
          position && (
            <MapContainer center={position} zoom={13} className="h-64 w-full mb-4">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position}></Marker>
            </MapContainer>
          )
        )}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Submit Issue
        </button>
      </form>
    </div>
  );
};

export default IssueForm;
