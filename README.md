# NoteTaker: Option 2 of the Final Project
### Edward Kim

## To Run:
1. [Start running the server](#running-the-server)
2. [Start running the client](#running-the-client)

### Running the Server
1. Open a terminal inside the `server` directory
2. Install node dependencies with `npm install`
    - If asked, install the following dependencies with the command `npm i <dependency>`: `body-parser`, `cors`, `express`, `mongodb`, `mongoose`
3. In the same directory, now boot up the server with `node server.js`
4. The terminal should print `Connected to MongoDB` and `Server started on port 5000` upon success
5. The terminal will print an error if Step 4 failed
6. Keep this server terminal running

### Running the client
1. Open a terminal separate from the server terminal. Make this terminal inside the `client` directory
2. Install node dependencies with `npm install`
3. In the same directory, now boot up the client with `npm start`
4. Node should load the webpage at http://localhost:3000/

## Explanation of Code
The application has the ability to add notes, delete notes, and clear all notes. The backend remembers notes inputted from previous sessions by connecting to a database stored by MongoDB. useEffect was used to automatically refresh a state variable within App.jsx with the most recent list of notes stored in the MongoDB database. As a result, the webpage automatically refreshes with the latest updated notes whenever the client alters the list of notes.
The front end is run with Node and React. The backend is run with Node and Express connected to a MongoDB database.