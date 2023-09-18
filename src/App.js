import { Fragment, useEffect, useState } from "react";
import NavBar from "./components/nav/NavBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Addstudent from "./components/student/Addstudent";
import AllStudents from "./components/student/AllStudents";

function App() {
  return (
    <Fragment>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" Component={Home}></Route>
          <Route exact path="/addstudent" Component={Addstudent} />
          <Route exact path="/students" Component={AllStudents} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
