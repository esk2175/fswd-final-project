import React from "react";

function InputNote({inputTitle, inputContent, setInputTitle, setInputContent, handleAdd}) {

  //Updates computer on what's currently inside title and text
  function handleChangeTitle(event) {
    setInputTitle(event.target.value);
  }
  function handleChangeContent(event) {
    setInputContent(event.target.value);
  }

  return (
    <div id="inputNoteDiv">
      <form className="note">
        <input
          onChange={handleChangeTitle}
          type="text"
          placeholder="Add title here..."
          value={inputTitle}
          id="inputTitle"
        />
        <textarea
          onChange={handleChangeContent}
          type="text"
          placeholder="Add text here..."
          value={inputContent}
          id="inputText"
        />
        <button className="button" id="addButton" onClick={handleAdd}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default InputNote;
