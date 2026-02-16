import { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // LOGIN
  const login = () => {
    if (
      email.trim().toLowerCase() === "intern@demo.com" &&
      pass.trim() === "intern123"
    ) {
      setUser(email);
      localStorage.setItem("user", email);
    } else alert("Invalid login");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ADD TASK
  const addTask = () => {
    const title = prompt("Title");
    if (!title) return;

    const description = prompt("Description") || "";
    const priority = prompt("Priority (low/medium/high)") || "low";
    const due = prompt("Due date (YYYY-MM-DD)") || "";
    const tags = prompt("Tags comma separated") || "";

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        description,
        priority,
        due,
        tags,
        created: new Date().toLocaleString(),
        col: "todo"
      }
    ]);
  };

  // DELETE
  const del = id => setTasks(tasks.filter(t => t.id !== id));

  // MOVE COLUMN
  const move = (id, col) =>
    setTasks(tasks.map(t => (t.id === id ? { ...t, col } : t)));

  // CHANGE PRIORITY
  const changePriority = (id, p) =>
    setTasks(tasks.map(t => (t.id === id ? { ...t, priority: p } : t)));

  // EDIT
  const edit = task => {
    const title = prompt("Edit title", task.title);
    if (!title) return;

    const description = prompt("Edit description", task.description);
    const due = prompt("Edit due", task.due);
    const tags = prompt("Edit tags", task.tags);

    setTasks(
      tasks.map(t =>
        t.id === task.id
          ? { ...t, title, description, due, tags }
          : t
      )
    );
  };

  // RESET
  const resetBoard = () => {
    if (confirm("Reset all tasks?")) {
      setTasks([]);
      localStorage.removeItem("tasks");
    }
  };

  const cols = ["todo", "doing", "done"];

  // SEARCH + FILTER + SORT
  const filteredTasks = tasks
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter(t => (filter === "all" ? true : t.priority === filter))
    .sort((a, b) => (a.due || "9999") > (b.due || "9999") ? 1 : -1);

  // LOGIN PAGE
  if (!user)
    return (
      <div style={{ padding: 50 }}>
        <h2>Login</h2>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br/><br/>
        <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} /><br/><br/>
        <button onClick={login}>Login</button>
      </div>
    );

  // BOARD
  return (
    <div style={{ padding: 20 }}>
      <h2>Task Board</h2>

      <button onClick={addTask}>Add</button>
      <button onClick={resetBoard}>Reset</button>
      <button onClick={logout}>Logout</button>

      <br /><br />

      <input
        placeholder="Search"
        onChange={e => setSearch(e.target.value)}
      />

      <select onChange={e => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {cols.map(col => (
          <div
            key={col}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              const id = Number(e.dataTransfer.getData("taskId"));
              move(id, col);
            }}
            style={{
              width: 260,
              minHeight: 350,
              border: "2px dashed gray",
              padding: 10
            }}
          >
            <h3>{col.toUpperCase()}</h3>

            {filteredTasks
              .filter(t => t.col === col)
              .map(t => (
                <div
                  key={t.id}
                  draggable
                  onDragStart={e =>
                    e.dataTransfer.setData("taskId", t.id)
                  }
                  style={{
                    border: "1px solid gray",
                    padding: 10,
                    marginBottom: 10
                  }}
                >
                  <b>{t.title}</b><br/>
                  {t.description}<br/>
                  Priority: {t.priority}<br/>
                  Due: {t.due || "none"}<br/>
                  Tags: {t.tags}<br/>
                  <small>{t.created}</small>

                  <br /><br />

                  {/* COLUMN BUTTONS */}
                  <button onClick={() => move(t.id,"todo")}>Todo</button>
                  <button onClick={() => move(t.id,"doing")}>Doing</button>
                  <button onClick={() => move(t.id,"done")}>Done</button>

                  <br/><br/>

                  {/* PRIORITY BUTTONS */}
                  <button onClick={() => changePriority(t.id,"low")}>Low</button>
                  <button onClick={() => changePriority(t.id,"medium")}>Medium</button>
                  <button onClick={() => changePriority(t.id,"high")}>High</button>

                  <br/><br/>

                  <button onClick={() => edit(t)}>Edit</button>
                  <button onClick={() => del(t.id)}>Delete</button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
