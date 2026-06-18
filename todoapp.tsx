import { useState } from "react";

const FILTERS = ["All", "Active", "Done"];

const generateId = () => Math.random().toString(36).slice(2, 9);

const initialTasks = [];

export default function TodoApp() {
  const [tasks, setTasks] = useState(initialTasks);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks([...tasks, { id: generateId(), text: trimmed, done: false }]);
    setInput("");
  };

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const clearDone = () => setTasks(tasks.filter((t) => !t.done));

  const filtered = tasks.filter((t) =>
    filter === "All" ? true : filter === "Done" ? t.done : !t.done
  );

  const doneCount = tasks.filter((t) => t.done).length;
  const activeCount = tasks.length - doneCount;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>✦</div>
          <h1 style={styles.title}>My Tasks</h1>
          <p style={styles.subtitle}>
            {activeCount} remaining · {doneCount} done
          </p>
        </div>

        {/* Input */}
        <div style={styles.inputRow}>
          <input
            style={styles.input}
            type="text"
            placeholder="Add a new task…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button style={styles.addBtn} onClick={addTask} aria-label="Add task">
            <span style={styles.plus}>+</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={styles.tabs}>
          {FILTERS.map((f) => (
            <button
              key={f}
              style={{ ...styles.tab, ...(filter === f ? styles.tabActive : {}) }}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        <ul style={styles.list}>
          {filtered.length === 0 && (
            <li style={styles.empty}>
              {filter === "Done"
                ? "Nothing completed yet."
                : filter === "Active"
                ? "All caught up! 🎉"
                : "Add a task above to get started."}
            </li>
          )}
          {filtered.map((task) => (
            <li key={task.id} style={styles.item}>
              <button
                style={{ ...styles.check, ...(task.done ? styles.checkDone : {}) }}
                onClick={() => toggleTask(task.id)}
                aria-label={task.done ? "Mark as active" : "Mark as done"}
              >
                {task.done && <span style={styles.checkmark}>✓</span>}
              </button>
              <span style={{ ...styles.taskText, ...(task.done ? styles.taskDone : {}) }}>
                {task.text}
              </span>
              <button
                style={styles.deleteBtn}
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* Footer */}
        {doneCount > 0 && (
          <div style={styles.footer}>
            <button style={styles.clearBtn} onClick={clearDone}>
              Clear {doneCount} completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Styles ─────────────────────────────────────── */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    padding: "2rem 1rem",
    boxSizing: "border-box",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "480px",
    padding: "2rem",
    boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.75rem",
  },
  logo: {
    fontSize: "1.5rem",
    color: "#a78bfa",
    marginBottom: "0.4rem",
  },
  title: {
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    margin: "0.35rem 0 0",
    fontSize: "0.82rem",
    color: "rgba(255,255,255,0.45)",
    letterSpacing: "0.02em",
  },
  inputRow: {
    display: "flex",
    gap: "0.6rem",
    marginBottom: "1.1rem",
  },
  input: {
    flex: 1,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "10px",
    padding: "0.7rem 1rem",
    color: "#fff",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border 0.2s",
  },
  addBtn: {
    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    border: "none",
    borderRadius: "10px",
    width: "46px",
    height: "46px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 4px 14px rgba(124,58,237,0.5)",
    transition: "opacity 0.15s",
  },
  plus: {
    color: "#fff",
    fontSize: "1.5rem",
    lineHeight: 1,
    marginTop: "-2px",
  },
  tabs: {
    display: "flex",
    gap: "0.4rem",
    marginBottom: "1.1rem",
    background: "rgba(255,255,255,0.06)",
    borderRadius: "10px",
    padding: "0.3rem",
  },
  tab: {
    flex: 1,
    background: "transparent",
    border: "none",
    borderRadius: "7px",
    padding: "0.45rem 0",
    color: "rgba(255,255,255,0.5)",
    fontSize: "0.83rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s",
    letterSpacing: "0.02em",
  },
  tabActive: {
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    minHeight: "120px",
  },
  empty: {
    textAlign: "center",
    color: "rgba(255,255,255,0.3)",
    fontSize: "0.88rem",
    padding: "2.5rem 0",
    fontStyle: "italic",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "0.7rem 0.9rem",
    transition: "background 0.15s",
  },
  check: {
    width: "22px",
    height: "22px",
    borderRadius: "6px",
    border: "2px solid rgba(255,255,255,0.25)",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.2s",
    padding: 0,
  },
  checkDone: {
    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    borderColor: "transparent",
  },
  checkmark: {
    color: "#fff",
    fontSize: "0.7rem",
    fontWeight: 700,
  },
  taskText: {
    flex: 1,
    color: "#e9e9f0",
    fontSize: "0.93rem",
    lineHeight: 1.4,
    wordBreak: "break-word",
    transition: "all 0.2s",
  },
  taskDone: {
    color: "rgba(255,255,255,0.3)",
    textDecoration: "line-through",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.2)",
    cursor: "pointer",
    fontSize: "0.8rem",
    padding: "0.2rem 0.3rem",
    borderRadius: "4px",
    transition: "color 0.15s",
    flexShrink: 0,
  },
  footer: {
    textAlign: "center",
    marginTop: "1.1rem",
    paddingTop: "1rem",
    borderTop: "1px solid rgba(255,255,255,0.07)",
  },
  clearBtn: {
    background: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.35)",
    fontSize: "0.8rem",
    cursor: "pointer",
    padding: "0.3rem 0.6rem",
    borderRadius: "6px",
    transition: "color 0.15s",
    letterSpacing: "0.02em",
  },
};
