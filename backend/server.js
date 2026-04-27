const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 1. The Schema (The rules for your data)
const aboutSchema = new mongoose.Schema({
  company_name: String,
  description: String,
  mission: String,
  vision: String,
  image_url: String
});
const About = mongoose.model('About', aboutSchema);

const app = express();
app.use(cors());
app.use(express.json());

// 2. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cms_db')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Error:", err));

// 3. The "Get" Route (To see the data)
app.get('/api/about', async (req, res) => {
  const data = await About.findOne();
  res.json(data || {});
});

// 4. The "Post" Route (To save/update the data)
app.post('/api/about', async (req, res) => {
  const updatedData = await About.findOneAndUpdate({}, req.body, { upsert: true, new: true });
  res.json(updatedData);
});

app.listen(5000, () => console.log('🚀 Server running on port 5000'));