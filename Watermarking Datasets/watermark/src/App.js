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
function App() {
  return (
  <Router>
      <Routes>
      <Route exact path = "/" element = {<Homepage/>}/>
      <Route path = "/CSVViewPage" element = {<CSVViewPage/>}/>
      <Route path = "/Datasets" element={<Datasets/>}/>
      <Route path = "/DatasetType" element={<DatasetType/>}/>
      <Route path = "/View" element={<View/>}/>
      </Routes>
  </Router>


  );
  // return <Homepage></Homepage>;
}

export default App;
