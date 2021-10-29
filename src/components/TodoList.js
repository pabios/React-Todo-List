import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList(props) {
  const { todos, changeTodoState, deleteTodo, doubleClick, onEditInputChange } = props;

  const doubleClickFromTodoList = (todo) => {
    console.log("double click from todolist : ", todos);
    console.log("double click from todolist : ", todo);
    doubleClick(todo);
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
        />
      </li>
    );
  });

  return (
    <>
      <ul className={"todo-list"}>{listHtml}</ul>
    </>
  );
}