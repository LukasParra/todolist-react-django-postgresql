import React from "react";
import {Route, Routes, Navigate, BrowserRouter as Router} from "react-router-dom";
import { TasksPage } from "./pages/TasksPage";
import { TasksFormPage } from "./pages/TasksFormPage";
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Navigation />
        <Routes>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks-create" element={<TasksFormPage />} />
          <Route path="/tasks/:id" element={<TasksFormPage />} />
        </Routes>
      <Toaster />
      </div>
    </Router>
  );
}

export default App;

