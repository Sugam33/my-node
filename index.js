import express from "express";
import dotenv from "dotenv";
import  mongoose  from "mongoose";
import bodyParser from "body-parser";
import User from "./models/users.js";
import Product from "./models/products.js";


dotenv.config();
const app = express();

app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.send("API is running...");
});
app.post("/test", (req,res) => {
    console.log(req.body, "test");
    res.status(200).send(req.body);
});

app.post("/api/users", async(req, res) => {
    console.log(req.body);
    try{
    const { fullName, email, password, ...rest } = req.body;
        const user = await User.create({ fullName, email, password, ...rest });
        console.log(user);
        res.send({ status: "User Created!", user });
    } catch(err){
      console.log(err);
      res.send({status: "Error creating user!!"});
    }
});

app.get("/api/users", async(req, res) => {
  try{
    const users = await User.find({});
    console.log(users);
    res.send({status : "Users Listed!!", users });
  } catch(err){
    console.log(err);
    res.send({status : "Error listing users"});
  }
});

app.get("/api/users/:id", async(req, res) => {
  const id = req.params.id;
  console.log(req.params, id);
  try{
    const user = await User.findById(id);
    console.log(user);
    res.send({status: "User data retrieved", user});
  } catch(err){
    console.log(err, ">>>>>>>>> error");
    res.send({status: "Error retrieving data!!"});
  }
});

app.delete("/api/users/:id", async(req,res) => {
  const id = req.params.id;
  console.log(req.params, id);
  try{
    const user = await User.findOneAndDelete({_id : id});
    console.log(user);
    res.send({status: "User Deleted", user});
  } catch(err){
    console.log(err, ">>>>>>>>>> error");
    res.send({status: "Error deleting user"});
  }
});

// products 

app.post("/api/products", async(req, res) => {
  console.log(req.body);
  try{
    // const {productName, productPrice, productQuantity, productBrand, supplierName, ...rest} = req.body;
    const product = await Product.create(req.body);
    console.log(product);
    res.send({status: "Product Created", product});
  } catch(err){
    console.log(err);
    res.send({status: "Error creating product"});
  }
});


app.get("/api/products", async(req, res) => {
  try{
  const products = await Product.find({});
  console.log(products);
  res.send({status: "All products listed", products});
  } catch(err){
    console.log(err);
    res.send({status: "Error listing product"});
  }
});

app.get("/api/products/:id", async(req, res) => {
  const id = req.params.id;
  console.log(req.params, id);
  try{
    const product = await Product.findById(id);
    console.log(product);
    res.send({status: "Product data retreived", product});
  } catch(err){
    console.log(err);
    res.send({status: "error retreiving data"})
  }
});

app.delete("/api/products/:id", async(req, res) => {
   const id = req.params.id;
   console.log(req.params, id);
   try{
    const product = await Product.findOneAndDelete({_id:id})
    console.log(product);
    res.send({status: "Product deleted", product});
   } catch(err){
      console.log(err);
      res.send({status: "Error deleting product"})
   }
});

console.log("Hello");


(async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      });
  
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  })();

app.listen(process.env.PORT, console.log("Serving..."));