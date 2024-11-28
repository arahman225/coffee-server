const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware

app.use(cors())
app.use(express.json())


// root
app.get('/', (req, res) =>{
    res.send('Coffee maker is running')
})

// user and password 

// console.log(pr.env.D)
// console.log(pr.env.P)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2cslr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("coffeeDB");
    const coffeesCollection = database.collection("coffees");



    // get or read

    app.get('/coffees', async(req, res) =>{
      const cursor = coffeesCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })


    // get details using id // specific product that's why use id

    app.get('/coffees/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await coffeesCollection.findOne(query);
      res.send(result)
    })

    // When an HTTP request is sent to the server (using POST, PUT, PATCH, etc.), have to use
    app.post('/coffees', async(req, res) =>{
      const coffee = req.body; // this is const doc
      console.log('Add coffee', coffee);
      const result = await coffeesCollection.insertOne(coffee);
      res.send(result)

    })


    // update When an HTTP request is sent to the server (using POST, PUT, PATCH, etc.)

    app.put('/coffees/:id', async(req, res) =>{
      const id = req.params.id;
      const coffee = req.body;
      console.log(coffee, id)
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true};

      const updateCoffee = {
        $set:{
          name: coffee.name,
          price: coffee.price
        }
      }



      const result = await coffeesCollection.updateOne(filter, updateCoffee );
      res.send(result)
    })


    // delete 

    app.delete('/coffees/:id', async(req, res) =>{
      const id = req.params.id;
      console.log('Dlete', id);
      const query = {_id: new ObjectId(id)};
      const result = await coffeesCollection.deleteOne(query);
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}
run().catch(console.dir);




app.listen(port, () =>{
    console.log(`Coffee server is running on the port ${port}`)
})