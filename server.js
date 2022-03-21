//Express package
const express = require('express')
const path = require('path');
const fs = require('fs');
//Express Server
const app = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('./develop/public'));



//This is the path to the HTML data. 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/index.html'));
});
//Path to the notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/notes.html'));
});


// HTML is not the only thing the server can deliver. It also delivers JSON data
//read notes data from db.json
let notes = fs.readFileSync('./develop/db/db.json');
notes = JSON.parse(notes);

//api view of notes
app.get('/api/notes', (request, response) => response.json(notes));   //sends json data of notes upon request


//POST Data to database (db.json for this application)
app.post('/api/notes', (request, response) => {

    //add object to notes array. This is the note title and note text.
    //request.body is the note that the user is writing.
    let newNote = request.body
    
    //log data in console
    console.log("Adding Note: ", newNote);

    //adding ID to newNote
    newNote.id = Math.floor(Math.random() * 1000);
    console.log("adding id:", newNote)


    //add data to notes array
    console.log('Old notes', notes)
    notes.push(newNote);
    console.log('New Notes', notes)

    response.end();


});

//DELETE Data from database
app.delete('/api/notes/:id', (request, response) => {

    const selectedNoteID = request.params.id;
    console.log(`Removing item with id: ${selectedNoteID}`);

    // //remove item from notes array
    notes = notes.filter(note => note.id != selectedNoteID);

    response.end();
});

//Express PORT
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});