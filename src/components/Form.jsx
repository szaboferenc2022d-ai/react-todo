import { useState } from "react";

function Form({ addTask }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("A feladat mező nem lehet üres.");
      return;
    }

    if (trimmedName.toLowerCase().includes("react")) {
      setError("A feladat nem tartalmazhatja a 'react' szót.");
      return;
    }

    setError("");
    addTask(trimmedName);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          if (error) {
            setError("");
          }
        }}
      />
      {error && (
        <p role="alert" style={{ color: "crimson", marginTop: "0.5rem" }}>
          {error}
        </p>
      )}
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;