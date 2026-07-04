import Navbar from './components/Navbar'
import './App.css'
import Home from './pages/Home'
import "leaflet/dist/leaflet.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MapView from "./components/MapView";


function App() {

  return (
    <>
     <Router>
       <Navbar/>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/map" element={<MapView/>}/>
       </Routes>
     </Router>
    </>
  ) 
}

export default App
