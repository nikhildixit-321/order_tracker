import Navbar from './components/Navbar'
import './App.css'
import Home from './pages/Home'
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MapView from "./components/MapView";


function App() {
 
const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
     <Router>
       <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
       <Routes>
         <Route path="/" element={<Home  searchQuery={searchQuery}/>}/>
         <Route path="/map" element={<MapView/>}/>
       </Routes>
     </Router>
    </>
  ) 
}

export default App
