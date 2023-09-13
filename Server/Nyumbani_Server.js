const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
const cors = require('cors');
app.use(cors());


mongoose.connect('mongodb://localhost:27017/Nyumbani_Rentals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Rental = require('./rentalSchema'); // Import the schema

app.post('/api/submit/', async (req, res) => {
  try {
    const formData = req.body;
    const result = await Rental.create(formData);
    
    if (result) {
      res.json({ message: 'Form submitted successfully!' });
    } else {
      res.status(500).json({ error: 'Failed to submit form.' });
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Error submitting form.' });
  }
});

// ... Other endpoints ...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
