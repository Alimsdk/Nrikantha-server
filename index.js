const express=require('express');
require('dotenv').config()
const app=express();
const cors=require('cors');
const port=5000;
// 5WHtSIRaf55IHGrz
const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ofdnr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);
app.use(cors());
app.use(express());

async function run() {
    try {
      await client.connect();
      const database = client.db("nri_kantha");
      const featuredProducts = database.collection("featured_products");
   
      app.get('/featured',async(req,res)=>{
        const cursor = featuredProducts.find({});

        if ((await cursor.count()) === 0) {
          console.log("No documents found!");
        }
        const result=await cursor.toArray();
        res.json(result);
      })

      app.get('/featured/:id',async(req,res)=>{
          const keys=req.params.id;
          const productKey=keys.toString();
          
          const query={key:productKey}
            const cursor=await featuredProducts.findOne(query);
           res.send(cursor)
      })
     
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/',async(req,res)=>{
    res.send('Hello from server');
})

app.listen(port,()=>{
    console.log('listening to port',port);
})