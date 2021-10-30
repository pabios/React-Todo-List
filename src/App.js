import "./App.css";

import { useEffect, useState } from "react";

import List from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import TodoInput from "./components/TodoInput";

const initialTodo = {
  id: 1,
  title: "",
  isCompleted: false,
  isEditing: false,
};

function App() {
  const [newTodo, setNewTodo] = useState(initialTodo);
  const [todos, setTodos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const handleTitleChange = (title) => {
    setNewTodo((prevState) => ({
      ...prevState,
      title,
    }));
  };

  const handleKeyDownEvent = (key) => {
    if (!newTodo.title) return;
    switch (key) {
      case "Enter":
        setTodos((prevState) => [...prevState, newTodo]);
        Object.assign(initialTodo, { id: initialTodo.id + 1 });
        setNewTodo(initialTodo);
        break;
      case "Escape":
        setNewTodo(initialTodo);
        break;
      default:
        break;
    }
  };

  const changeTodoState = (id) => {
    const newList = todos.map((todo) => {
      return todo.id === id
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo;
    });
    setTodos(newList);
  };

  const deleteTodo = (id) => {
    // const newList = todos.filter((todo) => {
    // if (todo.id === id) {
    // return false;
    // } else {
    // return true;
    // }
    // });
    // setTodos(newList);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const changeFilter = (value) => {
    setCurrentFilter(value);
  };

  const updateListByFilter = () => {
    console.log(currentFilter);
    switch (currentFilter) {
      case "all":
        setFilteredTodos(todos);
        break;
      case "completed":
        // const newList = todos.filter((todo) => {
        // if (todo.isCompleted) {
        // return true;
        // } else {
        // return false;
        // }
        // });
        // setFilteredTodos(newList);

        // const newList2 = todos.filter((todo) => {
        // return todo.isCompleted;
        // });
        // setFilteredTodos(newList2);

        setFilteredTodos(todos.filter((t) => t.isCompleted));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((t) => !t.isCompleted));
        break;
      default:
        break;
    }
  };

  useEffect(updateListByFilter, [currentFilter, todos]);

  // doubleClick va changer la propiete d'un object Todo, qui lui meme se trouve dans la liste Todos
  const doubleClick = (todo) => {
    console.log("double click : ", todos);
    console.log("double click : ", todo);

    const mapped = (t) => {
      if (t.id === todo.id) {
        /* return {
          id: t.id,
          title: t.title,
          isCompleted: t.isCompleted,
          // isEditing: !t.isEditing,
          isEditing: todo.isEditing,
        }; */
        return { ...t, isEditing: todo.isEditing };
      } else {
        return t;
      }
    };
    /*
    // .reduce (à voir plus tard)
    // .map sur un array => créer un nouvel array en modifiant chacune des valeurs à l'interrieur de cet array
    // .filter sur un array => créer un nouvel array en filtrant depuis un array d'origine en fonction d'un boolean

    // Le .map prend en argument une fonction, cette meme fonction doit renvoyer une valeur.
    // Le .filter prend en argument une fonction, cette meme fonction doit renvoyer un boolean.

    const test = [1, 2, 3, 4];

    const test2 = [];
    test.forEach((valueInsideTest) => {
      test2.push(valueInsideTest.toString());
    });
    
    console.log(test); // [1, 2, 3, 4]

    const test3 = test.map((valueInsideTest) => {
      return valueInsideTest.toString();
    });

    console.log(test); // [1, 2, 3, 4]

    const test4 = test.map((v) => v.toString());

    // **************************************************************
    // afficher uniquement les chiffres supérieurs à 7
    const testFilter = [5, 6, 7, 8, 9];

    const testFilter2 = [];
    testFilter.forEach(chiffre => {
      if (chiffre > 7) {
        testFilter2.push(chiffre);
      }
    })

    const testFilter3 = testFilter.filter(chiffre => {
      if (chiffre > 7) {
        return true;
      } else {
        return false;
      }
    })

    const testFilter4 = testFilter.filter(chiffre => chiffre > 7); */

    const newList = todos.map(mapped);
    setTodos(newList);
  };

  const handleKeyDownEditInput = (key, id, oldTitle) => {
    switch (key) {
      case "Enter":
        const newList = todos.map((t) => {
          if (t.id === id) {
            return { ...t, isEditing: !t.isEditing };
          } else {
            return t;
          }
        });
        setTodos(newList);
        break;
      case "Escape":
        const newList2 = todos.map((t) => {
          if (t.id === id) {
            return { ...t, title: oldTitle, isEditing: !t.isEditing };
          } else {
            return t;
          }
        });
        setTodos(newList2);
        break;
      default:
        break;
    }
  };

  const onEditInputChange = (value, id) => {
    console.log("onEditInputChange : ", value);
    // on veut reactuliser la valeur de l'input, et donc le todo.title.
    const newList = todos.map((t) => {
      if (t.id === id) {
        // return {...t, title: value};
        return {
          id: t.id,
          title: t.title,
          isCompleted: t.isCompleted,
          isEditing: t.isEditing,
          title: value,
        };
      } else {
        return t;
      }
    });
    setTodos(newList);
  };

  const deleteCompleted = () => {
    console.log("deleteCompleted ");
    // const newList = todos.filter((todo) => {
    // if (todo.isCompleted) {
    // return false;
    // } else {
    // return true;
    // }
    // });
    const newList = todos.filter((todo) => !todo.isCompleted);
    setTodos(newList);
  };

  const deleteAll = () => {
    setTodos([]);
  };

  return (
    <div className="App">
      {/* Le composant doit afficher :
        - L'input
        - le composant qui affiche les filtres
        - La liste des todos 
      */}

      <TodoInput
        value={newTodo.title}
        handleTitleChange={handleTitleChange}
        handleKeyDownEvent={handleKeyDownEvent}
      />

      <TodoFilter changeFilter={changeFilter} currentFilter={currentFilter} />

      <List
        todos={filteredTodos}
        changeTodoState={changeTodoState}
        deleteTodo={deleteTodo}
        doubleClick={doubleClick}
        onEditInputChange={onEditInputChange}
        handleKeyDownEditInput={handleKeyDownEditInput}
        deleteCompleted={deleteCompleted}
        deleteAll={deleteAll}
      />
    </div>
  );
}

export default App;
