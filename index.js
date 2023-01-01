import express from "express";
import dotenv from "dotenv";
import  mongoose  from "mongoose";
import bodyParser from "body-parser";


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