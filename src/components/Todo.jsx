import { useState } from "react";

function Todo({ id, name, completed, toggleTaskCompleted, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = newName.trim();

    if (!trimmedName) {
      return;
    }

    editTask(id, trimmedName);
    setIsEditing(false);
  }

  return (
    <li className="todo stack-small">
      {isEditing ? (
        <form className="stack-small" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label-wrapper" htmlFor={id}>
              <span className="label__lg">New name for {name}</span>
            </label>
            <input
              id={id}
              className="todo-text"
              type="text"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
            />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn__primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn__danger"
              onClick={() => {
                setNewName(name);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="c-cb">
            <input
              id={id}
              type="checkbox"
              checked={completed}
              onChange={() => toggleTaskCompleted(id)}
            />
            <label className="todo-label" htmlFor={id}>
              {name}
            </label>
          </div>
          <div className="btn-group">
            <button type="button" className="btn" onClick={() => setIsEditing(true)}>
              Edit <span className="visually-hidden">{name}</span>
            </button>
            <button
              type="button"
              className="btn btn__danger"
              onClick={() => deleteTask(id)}
            >
              Delete <span className="visually-hidden">{name}</span>
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default Todo;