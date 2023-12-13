import React from "react";

//Note that key isn't passed in as a prop
//When doing props, must use the same name as the prop names you passed in (doesn't have to be in same order though)
function Note({currentNoteKey, title, content, displayArray, indicateRefreshData}) {

  //Function to delete all notes
  function deleteFunc(noteKey) {
    async function deleteNote(noteKey) {

      //Identifies the note to delete based on ID
      let noteToDelete = displayArray.filter((noteItem) => noteItem._id === noteKey);
      noteToDelete = noteToDelete[0];

      console.log("DELETING NOTE");
      console.log("title: ", noteToDelete.title);
      console.log("content: ", noteToDelete.content);

      //Calls deleteNote in server
      const response = await fetch("http://localhost:5000/api/deleteNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // converting the note key to delete into JSON
        body: JSON.stringify({
          deleteNoteID: noteKey,
        })
      })
      if(response?.status === 200) {
        indicateRefreshData();
      }
    };
    deleteNote(noteKey); // sending data about note to delete to server
  }

  //Note () => in the onClick. This is done because onClick declares a function that's passed in
  //directly right away during rendering, making deleteFunc activate as soon as a note is made
  //() => places deleteFunc within a dummy function, thus placing only a reference to deleteFunc
  //instead, preventing it from being called during rendering
  return (
    <div className="note">
      <button className="button" id="deleteButton" onClick={() => deleteFunc(currentNoteKey)}>
        X
      </button>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}

export default Note;
