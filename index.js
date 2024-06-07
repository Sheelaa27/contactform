const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const mongoUri = 'mongodb+srv://Sheelaa_27:sheelaa27@cluster0.fhpigwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for the contact form
const contactSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  feedback: { type: String, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

// Define routes
app.post('/api/contact', async (req, res) => {
  const { username, email, feedback } = req.body;

  try {
    const newContact = new Contact({ username, email, feedback });
    await newContact.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
