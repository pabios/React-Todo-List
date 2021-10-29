import React from "react";

export default function TodoFilter({ changeFilter, currentFilter }) {
  return (
    <div className={"filter"}>
      <span
        onClick={() => changeFilter("all")}
        className={currentFilter === "all" ? "active" : ""}
      >
        All
      </span>
      <span
        onClick={() => changeFilter("completed")}
        className={currentFilter === "completed" ? "active" : ""}
      >
        Completed
      </span>
      <span
        onClick={() => changeFilter("uncompleted")}
        className={currentFilter === "uncompleted" ? "active" : ""}
      >
        Uncompleted
      </span>
    </div>
  );
}