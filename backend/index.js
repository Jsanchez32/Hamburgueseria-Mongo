import { MongoClient } from "mongodb";
import express from "express";
import { Router } from "express";

const app = express();
const router = Router()

const client = new MongoClient('mongodb+srv://sanchez:12345@hamburgueseriacluster.moowalv.mongodb.net/');
const db = client.db('hamburgueseria');
const port = 3000;

const path = {
    hamburguesas:'/hamburguesas',
    ingredientes:'/ingredientes',
    chefs:'/chefs',
    categorias:'/categorias',
}

async function conectarDB(){
    try {
        await client.connect();
        console.log('DB connect');
    } catch (error) {
        console.log(error);
    }
}

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})

conectarDB();

app.use(express.json());


//1//
app.use(path.ingredientes, router.get('/req1', async (req, res)=>{
    try {
        const collection = db.collection('Ingredientes');
        const result = await collection.find({stock: {$lt:400}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

//2//

app.use(path.hamburguesas, router.get('/req2', async (req, res)=>{
    try {
        const collection = db.collection('Hamburguesas');
        const result = await collection.find({categoria:'Vegetariana'}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

//3//

app.use(path.chefs, router.get('/req3', async (req, res)=>{
    try {
        const collection = db.collection('Chefs');
        const result = await collection.find({especialidad:'Carnes'}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

//4//

app.use(path.ingredientes, router.get('/req4', async (req, res)=>{
    try {
        const collection = db.collection('Ingredientes');
        await collection.updateMany({},{$mul:{precio:1.5}});
        const result = await collection.find().toArray()
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

//5//

app.use(path.hamburguesas, router.get('/req5', async (req, res)=>{
    try {
        const collection = db.collection('Hamburguesas');
        const result = await collection.find({chef:'ChefB'}).toArray()
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

//6//

app.use(path.categorias, router.get('/req6', async (req, res)=>{
    try {
        const collection = db.collection('Categorias');
        const result = await collection.find().toArray()
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

//7//

app.use(path.ingredientes, router.get('/req7', async (req, res)=>{
    try {
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
}));

//8//

app.use(path.hamburguesas, router.get('/req8', async (req, res)=>{
    try {
        const collection = db.collection('Hamburguesas');
        await collection.updateOne({nombre:'Clásica'},{$push: {ingredientes:'Chile'}});
        const result = await collection.find({nombre:'Clásica'}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
}));

//9//

app.use(path.hamburguesas, router.get('/req9', async (req, res)=>{
    try {
        const collection = db.collection('Hamburguesas');
        const result = await collection.find({ingredientes:'Pan integral'}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
}));

//10//

app.use(path.chefs, router.get('/req10', async (req, res)=>{
    try {
        const collection = db.collection('Chefs');
        await collection.updateOne({nombre:'ChefC'},{$set:{especialidad:'Cocina Internacional'}})
        const result = await collection.find({especialidad:'Cocina Internacional'}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
}));

//11//

app.use(path.ingredientes, router.get('/req11', async (req, res)=>{
    try {
        const collection = db.collection('Ingredientes');
        const result = await collection.find().sort({precio:-1}).limit(1).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
}));

//12/

app.use(path.hamburguesas, router.get('/req12', async (req, res)=>{
    try {
        const collection = db.collection('Hamburguesas');
        const result = await collection.find({ingredientes:{$ne:'Queso cheddar'}}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
}));


//13//

app.use(path.ingredientes, router.get('/req13', async (req, res)=>{
    try {
        const collection = db.collection('Ingredientes');
        await collection.updateOne({nombre:'Pan'},{$inc:{stock:100}});
        const result = await collection.find({nombre:'Pan'}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
}));

//14//

app.use(path.ingredientes, router.get('/req14', async (req, res)=>{
    try {
        const collection = db.collection('Ingredientes');
        const result = await collection.find({descripcion: {$regex:"clásico"}}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
}));

//15 //

app.use(path.hamburguesas, router.get('/req15', async (req, res)=>{
    try {
        const collection = db.collection('Hamburguesas');
        const result = await collection.find({precio:{$lte:9}}).toArray();
        res.send(result)
    } catch (error) {
        console.log(error);
    }
}));

//16 //

app.use(path.chefs, router.get('/req16', async (req, res)=>{
    try {
        const collection = db.collection('Chefs');
        const result = await collection.countDocuments();
        res.send(`Hay ${result} chefs en la DB`);
    } catch (error) {
        console.log(error);
    }
}));

//17//

app.use(path.categorias, router.get('/req17', async (req, res)=>{
    try {
        const collection = db.collection('Categorias');
        const result = await collection.find({descripcion: {$regex:"gourmet"}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

//18//

app.use(path.hamburguesas, router.get('/req18', async (req, res)=>{
    try {
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
}));

//19//

app.use(path.chefs, router.get('/req19', async (req, res)=>{
    try {
        const collection = db.collection('Chefs');
        const result = await collection.insertOne({'nombre':'ChefD','especialidad':'Cocina Asiática'})
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));
//20//

app.use(path.hamburguesas, router.get('/req20', async (req, res)=>{
    try {
        const collection = db.collection('Hamburguesas');
        const result = await collection.find().sort({precio:1}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));

//21//

app.use(path.ingredientes, router.get('/req21', async (req, res)=>{
    try {
        const collection = db.collection('Ingredientes');
        const result = await collection.find({precio: {$gte:2, $lt: 5}}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
}));