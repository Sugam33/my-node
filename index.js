import express from "express";

const app = express();

app.get("/", (req,res) => {
    res.send("API is running...");
});
app.post("/test", (req,res) => {
    console.log(req.body, "test");
    res.status(200).send(req.body);
});

console.log("Hello");



app.listen(3005, console.log("Serving..."));