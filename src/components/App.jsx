import React, { useState, useEffect } from "react";

const App = () => {
  const defaultWorkout = {
    pushups: 10,
    pullups: 10,
    squats: 10,
    running: 1, // in km
  };

  const [workout, setWorkout] = useState(() => {
    const saved = localStorage.getItem("workoutProgress");
    return saved ? JSON.parse(saved) : defaultWorkout;
  });

  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("workoutProgress", JSON.stringify(workout));
  }, [workout]);

  const handleComplete = () => {
    setWorkout((prev) => ({
      pushups: Math.min(prev.pushups + 2, 100),
      pullups: Math.min(prev.pullups + 2, 100),
      squats: Math.min(prev.squats + 2, 100),
      running: Math.min(prev.running + 0.2, 10),
    }));
    setStatusMessage("✅ Workout Complete! Next round is tougher!");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handleReset = () => {
    setWorkout(defaultWorkout);
    localStorage.removeItem("workoutProgress");
    setStatusMessage("");
  };

  const handleFail = () => {
    handleReset();
    setStatusMessage(
      "😂 That was embarrassing… Let’s pretend it never happened. Start over."
    );
    setTimeout(() => setStatusMessage(""), 4000);
  };

  return (
    <div style={styles.container}>
      <h1>🏋️ Adaptive Workout Tracker</h1>
      <p>Complete your set and the next one gets harder!</p>

      <div style={styles.card}>
        <h3>Today's Workout</h3>
        <ul style={styles.list}>
          <li>Push-Ups: {workout.pushups}</li>
          <li>Pull-Ups: {workout.pullups}</li>
          <li>Squats: {workout.squats}</li>
          <li>Run: {workout.running.toFixed(1)} km</li>
        </ul>
      </div>

      {statusMessage && <p style={styles.status}>{statusMessage}</p>}

      <div style={styles.buttons}>
        <button onClick={handleComplete}>I Did It!</button>
        <button onClick={handleFail}>I Failed 😞</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: 400,
    margin: "40px auto",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#fefefe",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: "15px",
    borderRadius: "8px",
    margin: "20px 0",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    textAlign: "left",
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "20px",
  },
  button: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  status: {
    color: "#333",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default App;
