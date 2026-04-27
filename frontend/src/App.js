import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [about, setAbout] = useState({
    company_name: '',
    description: '',
    mission: '',
    vision: '',
    image_url: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/about')
      .then(res => { if (res.data) setAbout(res.data); })
      .catch(err => console.log("Backend not connected yet."));
  }, []);

  const handleChange = (e) => {
    setAbout({ ...about, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/about', about)
      .then(() => alert('✅ Data saved to MongoDB!'))
      .catch(err => alert('❌ Error: Is your backend running?'));
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', maxWidth: '500px', margin: 'auto' }}>
        <h2>Admin Panel</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input name="company_name" placeholder="Company Name" value={about.company_name} onChange={handleChange} style={inputStyle} />
          <textarea name="description" placeholder="Description" value={about.description} onChange={handleChange} style={{...inputStyle, height: '80px'}} />
          <input name="mission" placeholder="Mission" value={about.mission} onChange={handleChange} style={inputStyle} />
          <input name="vision" placeholder="Vision" value={about.vision} onChange={handleChange} style={inputStyle} />
          <input name="image_url" placeholder="Image URL" value={about.image_url} onChange={handleChange} style={inputStyle} />
          <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>Update Database</button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' };
export default App;