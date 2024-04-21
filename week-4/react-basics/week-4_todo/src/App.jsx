import { useState } from "react";
import { v4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([
    { title: "gym jao", description: "body bnao", id: v4() },
    {
      title: "vada pao",
      description: "aalu, besan, namak, chutney butter",
      id: v4(),
    },
    {
      title: "dal makhni",
      description: "butter, daal, cream, tasty",
      id: v4(),
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: v4() }]);
    setNewTitle("");
    setNewDescription("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleUpdate = (id) => {
    setUpdateId(id);
    const todoToUpdate = todos.find((todo) => todo.id === id);
    setUpdatedTitle(todoToUpdate.title);
    setUpdatedDescription(todoToUpdate.description);
  };

  const updateTodo = (id, todo) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const todosCopy = todos;
    todosCopy.splice(index, 1, { ...todo, id: id });
    setTodos(todosCopy);
    // console.log(todos)
    setUpdateId("");
  };

  return (
    <>
      <input
        type="text"
        placeholder="Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <br />
      <button
        onClick={() =>
          addTodo({ title: newTitle, description: newDescription })
        }
      >
        Add todo
      </button>

      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{ border: "1px solid red", margin: "5px", padding: "10px" }}
        >
          {todo.id === updateId ? (
            <>
              <br />
              <input
                type="text"
                placeholder="Updated Title"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Updated Description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
              <br />
              <button
                onClick={() =>
                  updateTodo(todo.id, {
                    title: updatedTitle,
                    description: updatedDescription,
                  })
                }
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
              <button onClick={() => toggleUpdate(todo.id)}>Update todo</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete todo</button>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default App;