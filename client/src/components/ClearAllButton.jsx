import React from "react";

function ClearAllButton({clearFunc}) {
  function handleClick() {
    clearFunc();
  }

  return (
    <div>
      <button className="button" id="clearButton" onClick={handleClick}>
        Clear Notes
      </button>
    </div>
  );
}

export default ClearAllButton;
