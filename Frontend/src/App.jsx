import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import About from "./components/About";
import Contact from "./components/Contact";
import AddBook from "./components/AddBook";
import Login from "./components/Login";
import BookDetail from "./components/BookDetail";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/book/:id"
            element={authUser ? <BookDetail /> : <Navigate to="/signup" />}
          />
          <Route
            path="/admin/add-book"
            element={authUser ? <AddBook /> : <Navigate to="/signup" />}
          />
        </Routes>
        <Toaster />
      </div>
      <Login />
    </>
  );
}

export default App;
