import React from "react";
import { Route } from "react-router-dom/";

import "./App.css";
import Welcome from "./components/welcome/Welcome";
import Clock from "./components/clock/Clock";
import Contact from "./components/contact/Contact";

function App() {
  return (
    <div className="App">
      <Welcome name="Courtney" />
      <Clock />
      <Contact />
    </div>
  );
}

export default App;
