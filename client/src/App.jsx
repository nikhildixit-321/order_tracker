import Navbar from './components/Navbar'
import './App.css'
import Home from './pages/Home'
import "leaflet/dist/leaflet.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Tracking from "./pages/Tracking";
import MapView from "./components/MapView";

function App() {

  return (
    <>
     <Router>
       <Navbar/>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/product/:id" element={<ProductDetails/>}/>
         <Route path="/checkout" element={<Checkout/>}/>
         <Route path="/tracking/:id" element={<Tracking/>}/>
         <Route path="/map" element={<MapView/>}/>
       </Routes>
     </Router>
    </>
  ) 
}

export default App
