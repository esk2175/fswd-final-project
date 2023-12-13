//NotesKeeper server
//EK
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const uri = "mongodb+srv://test_user:cg5UcKWb1T1cSDvl@cluster0.xhvrqlk.mongodb.net/?retryWrites=true&w=majority"

const cors = require("cors");
const bodyParser = require('body-parser'); // middleware making object 
app.use(cors()); // middleware 
app.use(bodyParser.json());
const {MongoClient, ObjectId} = require('mongodb');
const client = new MongoClient(uri); // creating instance 
const db = client.db("test"); // referrencing db

let serverPortNum = process.env.PORT || 5000;

async function main() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
        app.listen(serverPortNum, () => {console.log(`Server started on port ${serverPortNum}`)})
    } catch (error) {
        console.error(error);
    }
}


//Fetching of data from database
app.get("/api", async (req, res) =>{
    const data = await db.collection("notes").find().toArray();
    res.json(data);
});


//Called when a note must be added
app.post("/api/addNote", async (req, res) => {
    console.log("addNote req received");

    //Finds the note in body of req and adds it to the database
    const data = req?.body;
    const result = await db.collection("notes").insertOne(data);
    res.send(result);
})

//Called when a note must be deleted
app.post("/api/deleteNote", async (req, res) => {
    console.log("deleteNote received");

    //Finds the note in body of req and deletes it from the database
    const deleteID = (req?.body).deleteNoteID;
    const result = await db.collection("notes").deleteOne({_id: new ObjectId(deleteID)});

    //Error check if the deletion didn't work
    if (result.deletedCount == 0) {
        console.error(`ERROR: Note ${deleteID} was not deleted`);
    }
    res.send(result);
})

app.post("/api/clearNotes", async (req, res) => {
    console.log("clearNotes req received");
    // Remove all items from the collection
    const result = await db.collection("notes").deleteMany({});
    res.send(result);
})

main().catch(console.error);