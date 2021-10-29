import React from "react";

export default function TodoItem(props) {
  const {
    id,
    title,
    isCompleted,
    isEditing,
    changeTodoState,
    deleteTodo,
    doubleClickFromTodoList,
    onEditInputChange,
  } = props;

  const onCheck = (e) => {
    e.preventDefault();
    changeTodoState(id);
  };

  const onDelete = (e) => {
    e.preventDefault();
    deleteTodo(id);
  };

  const doubleClickFromTodoItem = () => {
    const newTodo = {
      id,
      title,
      isCompleted,
      isEditing: !isEditing,
    };
    console.log("double click from todo item : ", newTodo);

    doubleClickFromTodoList(newTodo);
  };

  const handleKeyDownEditInput = (e) => {
    // on veut récuperer la touche entrée
    console.log(e);
  };

  const handleEditInput = (e) => {
    // e.target.value = la value de l'input = todo.title + le nouveau caractere tapé au clavier
    console.log(e.target.value);
    onEditInputChange(e.target.value, id);
  };

  return (
    <>
      <button type="button" onClick={onCheck}>
        {isCompleted ? "Uncomplete" : "Complete"}
      </button>

      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => handleEditInput(e)}
          onKeyDown={(e) => handleKeyDownEditInput(e)}
        />
      ) : (
        <span
          onDoubleClick={() => doubleClickFromTodoItem()}
          className={isCompleted ? "striked" : ""}
        >
          {title}
        </span>
      )}

      <button type="button" onClick={onDelete}>
        Delete
      </button>
    </>
  );
}