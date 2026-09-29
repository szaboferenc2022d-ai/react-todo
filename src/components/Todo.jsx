import { useEffect, useRef, useState } from "react";

function Todo({ id, name, completed, value = 0, toggleTaskCompleted, deleteTask, editTask, updateTaskValue }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const editFieldRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editFieldRef.current?.focus();
    }
  }, [isEditing]);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = newName.trim();

    if (!trimmedName) {
      return;
    }

    editTask(id, trimmedName);
    setIsEditing(false);
  }

  function changeValue(amount) {
    updateTaskValue(id, Math.max(1, value + amount));
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
              ref={editFieldRef}
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
          <div className="todo-content">
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
            <div className="todo-counter">
              <label className="visually-hidden" htmlFor={`${id}-value`}>
                {name} értéke
              </label>
              <p>fonotoság jelsző</p>
              <input id={`${id}-value`} className="todo-number" type="number" min="1" max="10" value={value}
                onChange={(event) => {
                  const nextValue = event.target.valueAsNumber;
                  updateTaskValue(id, Number.isFinite(nextValue) ? Math.max(0, Math.trunc(nextValue)) : 0,);
                }}
              />
            </div>
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