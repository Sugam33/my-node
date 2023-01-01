import express from "express";
import dotenv from "dotenv";
import  mongoose  from "mongoose";
import bodyParser from "body-parser";
import User from "./models/users.js";


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
      res.send({status: "Error Creating User!!"});
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