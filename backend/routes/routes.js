import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const client = new MongoClient(process.env.DATABASE);

const db = client.db('hamburgueseria');
const ingredientes = db.collection('Ingredientes');
const hamburguesas = db.collection('Hamburguesas');
const chefs = db.collection('Chefs');
const categorias = db.collection('Categorias');

//1//
router.get('/req1', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Ingredientes');
        const result = await collection.find({stock: {$lt:400}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//2//

router.get('/req2', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        const result = await collection.find({categoria:'Vegetariana'}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//3//

router.get('/req3', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Chefs');
        const result = await collection.find({especialidad:'Carnes'}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//4//

router.get('/req4', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Ingredientes');
        await collection.updateMany({},{$mul:{precio:1.5}});
        const result = await collection.find().toArray()
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//5//

router.get('/req5', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        const result = await collection.find({chef:'ChefB'}).toArray()
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//6//

router.get('/req6', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Categorias');
        const result = await collection.find().toArray()
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//7//

router.get('/req7', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Ingredientes');
        const result = await collection.deleteMany({stock:0});
        if(result.deletedCount > 0){
            res.send('Ingrediente eliminado');
        }
        else{
            res.send('No hay ingredientes vacios');
        }
    } catch (error) {
        console.log(error);
    }
});

//8//

router.get('/req8', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        await collection.updateOne({nombre:'Clásica'},{$push: {ingredientes:'Chile'}});
        const result = await collection.find({nombre:'Clásica'}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
});

//9//

router.get('/req9', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        const result = await collection.find({ingredientes:'Pan integral'}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
});

//10//

router.get('/req10', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Chefs');
        await collection.updateOne({nombre:'ChefC'},{$set:{especialidad:'Cocina Internacional'}})
        const result = await collection.find({especialidad:'Cocina Internacional'}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
});

//11//

router.get('/req11', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Ingredientes');
        const result = await collection.find().sort({precio:-1}).limit(1).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
});

//12/

router.get('/req12', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        const result = await collection.find({ingredientes:{$ne:'Queso cheddar'}}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
});


//13//

router.get('/req13', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Ingredientes');
        await collection.updateOne({nombre:'Pan'},{$inc:{stock:100}});
        const result = await collection.find({nombre:'Pan'}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
});

//14//

router.get('/req14', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Ingredientes');
        const result = await collection.find({descripcion: {$regex:"clásico"}}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
});

//15 //

router.get('/req15', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        const result = await collection.find({precio:{$lte:9}}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
});

//16 //

router.get('/req16', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Chefs');
        const result = await collection.countDocuments();
        res.send(`Hay ${result} chefs en la DB`);
    } catch (error) {
        console.log(error);
    }
});

//17//

router.get('/req17', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Categorias');
        const result = await collection.find({descripcion: {$regex:"gourmet"}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//18//

router.get('/req18', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        const result = await collection.deleteMany({$expr: {$lt:[{$size: "$ingredientes"},5]}})
        if(result.deletedCount>0){
            res.send(`Se elimino un elemento`);
        }
        else{
            res.send('Ninguno tiene menos de 5 ingredientes');
        }
    } catch (error) {
        console.log(error);
    }
});

//19//

router.get('/req19', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Chefs');
        const result = await collection.insertOne({'nombre':'ChefD','especialidad':'Cocina Asiática'})
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});
//20//

router.get('/req20', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        const result = await collection.find().sort({precio:1}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//21//

router.get('/req21', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Ingredientes');
        const result = await collection.find({precio: {$gte:2, $lt: 5}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//22//

router.get('/req22', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Ingredientes');
        await collection.updateOne({nombre:'Pan'},{$set:{descripcion:'Pan fresco y crujiente'}});
        const result = await collection.find({nombre:'Pan'}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//23//

router.get('/req23', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        const result = await collection.find({$or:[{ingredientes:'Tomate'},{ingredientes:'Lechuga'}]}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});


//24//

router.get('/req24', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Chefs');
        const result = await collection.find({nombre:{$ne:'ChefA'}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//25//

router.get('/req25', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        await collection.updateMany({},{$inc:{precio:2}});
        const result = await collection.find().toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//26//

router.get('/req26', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Ingredientes');
        const result = await collection.find().sort({nombre:1}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//27//

router.get('/req27', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        const result = await collection.find().sort({precio:-1}).limit(1).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});
//28//

router.get('/req28', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        await collection.updateMany({categoria:'Clásica'},{$push: {ingredientes:'Pepinillos'}})
        const result = await collection.find({categoria:'Clásica'}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//29//

router.get('/req29', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Chefs');
        const result = await collection.deleteMany({especialidad:'Cocina Vegetariana'});
        if(result.deletedCount>0){
            res.send(`Se elimaron los chefs`)
        }
        else{
            res.send(`No cumple las condiciones`)
        }
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});


//30//

router.get('/req30', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        const result = await collection.find({ingredientes:{$size:7}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//31//

router.get('/req30', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        const result = await collection.find().toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//33//

router.get('/req33', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        const result = await collection.aggregate([{ $group: { _id: '$chef', count: { $sum: 1 } } }]).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//34//
router.get('/req34', async (req, res)=>{
    try {
        await client.connect();
        const collection = db.collection('Hamburguesas');
        const result = await collection.aggregate([{ $group: { _id: '$categoria', count: { $sum: 1 } } }]).sort({count:-1}).limit(1).toArray();       
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

//36//
router.get('/req36', async (req, res)=>{
    try {
        await client.connect();
        const hamburguesas = await db.collection('Hamburguesas').distinct('Ingredientes');
        const result = await db.collection('Ingredientes').find({ nombre: { $nin: hamburguesas } }).toArray();        
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});


export default router;