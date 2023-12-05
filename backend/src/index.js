import express from 'express';

import cors from 'cors';


import dotenv from 'dotenv';
dotenv.config();

import {getNotes, getNote, createNote} from './database.js'; 

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(JSON.stringify({ message: "Home"}));
})

app.get("/notes", async (req, res) => {
    const data = await getNotes();
   res.send(data);
})

app.get("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const note = await getNote(id);
   res.send(note);
})

app.post("/notes", async (req, res) => {
    const {title, contents} = req.body;
    const note = await createNote(title, contents);
    res.status(201).send(note);
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
 })

 const PORT = process.env.PORT || 5000;

 app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
 })

