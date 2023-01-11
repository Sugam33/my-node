import express from "express";
import dotenv from "dotenv";
import  mongoose  from "mongoose";
import bodyParser from "body-parser";
import User from "./models/users.js";
import Product from "./models/products.js";
import { createUser, deleteUser, findUsers, getUser } from "./controllers/usersController.js";
import { createProduct, deleteProduct, findProduct, listProducts } from "./controllers/productsController.js";
import cors from "cors";


dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:19000"],
  })
);

app.get("/", (req,res) => {
    res.send("API is running...");
});
app.post("/test", (req,res) => {
    console.log(req.body, "test");
    res.status(200).send(req.body);
});

app.post("/api/users", createUser);

app.get("/api/users", findUsers);

app.get("/api/users/:id", getUser);

app.delete("/api/users/:id", deleteUser);

// products 

app.post("/api/products", createProduct);

app.get("/api/products", listProducts);

app.get("/api/products/:id", findProduct);

app.delete("/api/products/:id", deleteProduct);



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