require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


const user = require("./models/User");


app.get("/", (req, res) => {
    res.send("Api is running...");
});

// CREATE
app.post("/users", async(req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.send(user);
    }   catch (err) {
        res.status(500).send(err);
    }
});

// READ
app.get("/users", async(req,res) => {
    try{
        const users = await User.find();
        res.send(users);
    }   catch (err) {
        res.status(500).send(err);
    }
});

//UPDATE
app.put("/users/:id", async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

//DELETE
app.delete("/users/:id", async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.send("User deleted");
    }   catch (err){
        res.status(500).send(err);
    }
});

async function meow(kittenName){
    await mongoose.connect("mongodb+srv://effangammekom_db_user:7H4fKtrS7MB4bcZR@cluster0.fjy39uz.mongodb.net/?appName=Cluster0");
    const kittySchema = new mongoose.Schema({name:String})
    const kitty1 = new kitten({name: kittenName})
    const kitten = new mongoose.model('Kitten', kittySchema)
    kitty1.save()
    console.log(kitty1.name)
}
//SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port $(PORT)`));