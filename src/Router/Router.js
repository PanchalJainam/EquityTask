import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Quiz from "../components/Quiz/Quiz";
import Course from "../components/Course/Course";
import Enroll from "../components/EnrollCourse/Enroll";
import Signup from "../components/Signup/Signup";
import Signin from "../components/Signin/Signin";
import Questions from "../components/Questions/Questions";
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Course />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/enroll-course/:id" element={<Enroll />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
