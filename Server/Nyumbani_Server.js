const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());


const uri = "mongodb+srv://Cajetan:outspoken@nyumbani.gplqydw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB and create a connection pool
client.connect()
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

// Fetch rental data by ID
app.get('/api/rental/', async (req, res) => {
  try {
    const database = client.db("Nyumbani_Rentals");
    const collection = database.collection("Rentals");
    const query = {}; // You can customize the query if needed
    const data = await collection.find(query).toArray();
    res.send(data); // Convert data to JSON before sending
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Error fetching data from MongoDB" });
  }
});


// Fetch photos by rental ID
app.get('/api/photos/', async (req, res) => {
  const id = req.params.id;
  try {
    const database = client.db("Nyumbani_Rentals");
    const collection = database.collection("Rentals");
    const query = { _id: id };
    const projection = { _id: 0, photo: 1 };
    const data = await collection.find({}).project(projection).toArray();
    res.json(data);
  } catch (error) {
    console.error("Error fetching photos from MongoDB:", error);
    res.status(500).send("Error fetching photos from MongoDB");
  }
});


app.get('/api/reviews/', async (req, res) => {
  const id = req.params.id;
  try {
    const database = client.db("Nyumbani_Rentals");
    const collection = database.collection("Rentals");
    const query = { _id: id };
    const projection = { _id: 0, userReviews: 1 }; // Use "userReviews" instead of "UserReviews"
    const data = await collection.find({}).project(projection).toArray();
    res.json(data);
  } catch (error) {
    console.error("Error fetching reviews from MongoDB:", error);
    res.status(500).send("Error fetching reviews from MongoDB");
  }
});


app.get('/api/info/', async (req, res) => {
  const id = req.params.id;
  try {
    const database = client.db("Nyumbani_Rentals");
    const collection = database.collection("Rentals");
    const query = { _id: id };
    const projection = { _id: 0, information: 1 };
    const data = await collection.find({}).project(projection).toArray();
    res.json(data);
  } catch (error) {
    console.error("Error fetching reviews from MongoDB:", error);
    res.status(500).send("Error fetching reviews from MongoDB");
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
