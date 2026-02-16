import { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ---------- LOGIN ----------
  const login = () => {
    const e = email.trim().toLowerCase();
    const p = pass.trim();

    if (e === "intern@demo.com" && p === "intern123") {
      setUser(e);
      localStorage.setItem("user", e);
    } else alert("Invalid login credentials");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ---------- TASK FUNCTIONS ----------
  const addTask = () => {
    const title = prompt("Enter task title");
    if (!title) return;
    setTasks([...tasks, { id: Date.now(), title, col: "todo" }]);
  };

  const move = (id, col) =>
    setTasks(tasks.map(t => (t.id === id ? { ...t, col } : t)));

  const del = id => setTasks(tasks.filter(t => t.id !== id));

  const cols = ["todo", "doing", "done"];

  // ---------- BUTTON STYLE ----------
  const btn = color => ({
    marginRight: 6,
    padding: "6px 10px",
    border: "none",
    borderRadius: 6,
    background: color,
    color: "white",
    cursor: "pointer",
    fontSize: 12
  });

  // ---------- LOGIN PAGE ----------
  if (!user) {
    return (
      <div style={{ padding: 50 }}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        <br /><br />

        <button onClick={login}>Login</button>
      </div>
    );
  }

  // ---------- BOARD ----------
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Task Board</h2>

      <button onClick={addTask} style={btn("#3498db")}>Add Task</button>
      <button onClick={logout} style={btn("#e74c3c")}>Logout</button>

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
              padding: 15,
              border: "2px dashed #ccc",
              borderRadius: 12,
              background: "#f9f9f9"
            }}
          >
            <h3 style={{ textAlign: "center" }}>{col.toUpperCase()}</h3>

            {tasks
              .filter(t => t.col === col)
              .map(t => (
                <div
                  key={t.id}
                  draggable
                  onDragStart={e =>
                    e.dataTransfer.setData("taskId", t.id)
                  }
                  style={{
                    border: "1px solid #ddd",
                    padding: 12,
                    marginBottom: 12,
                    borderRadius: 10,
                    background: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                  }}
                >
                  <b>{t.title}</b>

                  <div style={{ marginTop: 10 }}>
                    <button onClick={() => move(t.id,"todo")} style={btn("#3498db")}>Todo</button>
                    <button onClick={() => move(t.id,"doing")} style={btn("#f39c12")}>Doing</button>
                    <button onClick={() => move(t.id,"done")} style={btn("#2ecc71")}>Done</button>
                    <button onClick={() => del(t.id)} style={btn("#e74c3c")}>Delete</button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
