import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import InputNote from "./InputNote";
import ClearAllButton from "./ClearAllButton";
import Footer from "./Footer";

function App() {
  //The state variable array which is updated on the screen
  //Will always have an _id property from MongoDB
  //due to useEffect refreshing displayArray with MongoDB array as the former changes
  const [displayArray, setDisplayArray] = useState([]);


  // placeholder variable that is toggled to trigger useEffect
  // For the purposes of useEffect dependency, refreshData only matters
  // for how it changes, not what the Boolean value is
  const [refreshData, setrefreshData] = useState(true);

  // indicate whether the data has loaded from initial render
  // Loading... message shows while !dataHasLoaded
  const [dataHasLoaded, setDataHasLoaded] = useState(false);


  //useEffect dependency is refreshData,
  //so it will refetch data from the database and update displayArray
  //whenever refreshData is changed
  //Thus, instead of manually changing displayArray yourself, just
  //alter refreshData whenever you want to refresh displayArray
  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        console.log("data:", data);
        setDisplayArray(data);
        setDataHasLoaded(true); //Stops "Loading..." from appearing on screen
      }
    )
  },[refreshData])


  //Toggles refreshData to trigger useEffect to update displayArray with latest
  //array from server
  function indicateRefreshData() {
    setrefreshData(!refreshData);
  }



  //The state variables of the fields in the input box
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");

  //Adds a note to the list of notes
  function handleAdd(event) {
    //Prevents on screen form refreshing
    event.preventDefault();
    async function addNote () {
      console.log("Adding Note:");
      console.log("title: ", inputTitle);
      console.log("content: ", inputContent);

      //Sends request to server to enact /addNote
      const response = await fetch("http://localhost:5000/api/addNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // converting user's input into json 
        body: JSON.stringify({
          title: inputTitle,
          content: inputContent
        })
      })
      if(response?.status === 200) {
        indicateRefreshData(); //Trigger useEvent for updating displayArray

        //Resets input fields
        setInputTitle("");
        setInputContent("");
      }
    };
    addNote(); // Trigger the function
  }



  //Function to clear all notes out
  function clearAllNotes() {
    async function clearNotes() {
      console.log("CLEARING NOTES");

      //Sends request to server to enact /clearNotes
      const response = await fetch("http://localhost:5000/api/clearNotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        //Filler body
        body: JSON.stringify({
          title: "CLEAR ALL NOTES"
        })
      })
      if(response?.status === 200) {
        indicateRefreshData();
      }
    };
    clearNotes(); // executing the function which sends the clear notes request to server
  }


  return (
    <div>
      <img
        src="https://vignette.wikia.nocookie.net/gameofthrones/images/8/85/Lannister_shield.png/revision/latest?cb=20151129115806&path-prefix=lt"
        id="backgroundImage"
      />

      <Header />
      
      <div id="inputNoteRowOuterContainer">
        <div id="inputNoteRow">
          <InputNote
            inputTitle={inputTitle}
            inputContent={inputContent}
            setInputTitle={setInputTitle}
            setInputContent={setInputContent}
            handleAdd={handleAdd}
          />
          <ClearAllButton clearFunc={clearAllNotes} />
        </div>
      </div>

      {(!dataHasLoaded) ?
        (<p style={{color: "#dc143c", fontSize:"40px"}}>Loading...</p>):
        //Rerenders notes with new key number equal to the MongoDB object's ID
        (displayArray.map((noteItem) => {
          return (
            <Note
              key={noteItem._id}
              currentNoteKey={noteItem._id} //Used to access keyvalue since key is not a prop
              title={noteItem.title}
              content={noteItem.content}
              displayArray={displayArray}
              indicateRefreshData={indicateRefreshData}
            />
          );
        }))
      }

      <Footer />
    </div>
  );
}

export default App;