import React, {useEffect, useState} from "react";
import Login from "./components/Login";
import Homepage from "./components/Homepage Components/Homepage";
import Download from "./components/Download";
import {BrowserRouter as Router, Routes,Navigate, Route} from 'react-router-dom';
import CSVViewPage from "./components/Homepage Components/CSVViewPage";
import Navbar from "./components/Homepage Components/Navbar";
import Datasets from "./components/Homepage Components/Datasets";
import DatasetType from "./components/Homepage Components/DatasetType";
import View from "./components/Homepage Components/View";
import SignUp from "./components/Homepage Components/SignUp";
function App() {
  return (
  <Router>
      <Routes>
      <Route exact path = "/" element = {<Navbar/>}/>
      <Route path = "/CSVViewPage" element = {<CSVViewPage/>}/>
      <Route path = "/Datasets" element={<Datasets/>}/>
      <Route path = "/DatasetType" element={<DatasetType/>}/>
      <Route path = "/View" element={<View/>}/>
      <Route path="/Login" element={<Login/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path= "/Navbar" element={<Navbar/>}/>
      </Routes>
  </Router>


  );
  // return <Homepage></Homepage>;
}

export default App;
