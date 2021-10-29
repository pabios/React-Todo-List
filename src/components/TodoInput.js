
import React from "react";

export default function TodoInput(props) {
  const {value, handleTitleChange, handleKeyDownEvent } = props;

  const keyDownEvent = (e) => {
    handleKeyDownEvent(e.key);
  };

  return (
    <div>
      <label>  saisir Une tache  :</label><br/>
    <input
      type="text"
      value={value}
      onChange={({ target: { value }}) => handleTitleChange(value)}
      onKeyDown={keyDownEvent}
    />
    </div>
    
  );
}