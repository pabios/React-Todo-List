import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList(props) {
  const {
    todos,
    changeTodoState,
    deleteTodo,
    doubleClick,
    onEditInputChange,
    handleKeyDownEditInput,
    deleteCompleted,
    deleteAll,
  } = props;

  const doubleClickFromTodoList = (todo) => {
    console.log("double click from todolist : ", todos);
    console.log("double click from todolist : ", todo);
    doubleClick(todo);
  };

  const listIsEmpty = () => {
    // const newList = todos.filter((todo) => {
    // if (todo.isCompleted) {
    // return true;
    // } else {
    // return false;
    // }
    // });

    const newList = todos.filter((t) => t.isCompleted);
    return newList.length === 0;
  };

  const listHtml = todos.map((todo) => {
    // return <li key={todo.id}>{todo.title}</li>;
    return (
      <li key={todo.id}>
        <TodoItem
          id={todo.id}
          title={todo.title}
          isCompleted={todo.isCompleted}
          isEditing={todo.isEditing}
          changeTodoState={changeTodoState}
          deleteTodo={deleteTodo}
          doubleClickFromTodoList={doubleClickFromTodoList}
          onEditInputChange={onEditInputChange}
          handleKeyDownEditInput={handleKeyDownEditInput}
        />
      </li>
    );
  });

  return (
    <>
      <button type="button" onClick={() => deleteAll()}>
        Delete all
      </button>

      {listIsEmpty() ? (
        ""
      ) : (
        <button type="button" onClick={() => deleteCompleted()}>
          Delete all completed
        </button>
      )}

      <ul className={"todo-list"}>{listHtml}</ul>
    </>
  );
}