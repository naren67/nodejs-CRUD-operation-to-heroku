const express = require('express')
const mongodb = require('mongodb')
const dotenv = require('dotenv')

//getting client
const mongoClient = mongodb.MongoClient

//use the app from express
const app = express()

//db link
//const link = 'mongodb://127.0.0.1:27017'

//atlas link
const link = process.env.secured || 'mongodb://127.0.0.1:27017' 

//use objectID from mongodb
const objectId = mongodb.ObjectID

//use json 
app.use(express.json())

//get method
app.get('/',async (req,res)=>{
    try{
          let items = await mongoClient.connect(link)
          let db = await items.db('product')
          let data = await db.collection('product').find().toArray()
          res.status(200).json(data)
          items.close()
    }
    catch(error)
    {
              console.log(error)
    }
})
//process.env.port
//post method
app.post('/post-product',async (req,res)=>{
          try{
                  let item = await mongoClient.connect(link)
                  let db =await item.db('product')

                  //always add req to body 
                  await db.collection('product').insertOne(req.body)
                  res.status(200).json({message:'product has been added successfully'})
                  item.close()
          }
          catch(error)
          {
                    console.log(error)
          }
})

/*
// update method - put 
app.put('update-product/:id',async(req,res)=>{
    try{
     const item = await mongoClient.connect(link)
     const db =  await item.db('product')
     await db.collection('product').findOneAndUpdate({_id:objectId(req.body)},{$set:req.body})
     res.status(200).json({message:'product has been updated successfully'})
     item.close()
    }
    catch(error){
              console.log(error)
    }
})

//delete method
app.delete('delete-product/:id',async(req,res)=>{
     try{
     const item = mongoClient.connect(link)
     const db = item.db('product')
     await db.collection('product').deleteOne({_id:objectId(req.params.id)},{$set:req.body})
     res.status(200).json({message:'product deleted from db'})
     item.close()
     }
     catch(error)
     {
               console.log(error)
     }
})


*/



app.listen(3000,()=>{
          console.log('server started')
})