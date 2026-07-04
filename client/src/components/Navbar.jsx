import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Login from "@/pages/Login";
import { SignupForm } from "@/pages/Signup";


const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
      fetch("https://dummyjson.com/products?limit=20")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          
        });
    }, []);
  const filtered = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
  return (
    <>
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
         
          <div  className="flex-shrink-0 flex items-center cursor-pointer">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 tracking-tight">
             <Link to="/"> Order Tracker</Link>
            </h2>
          </div>

          {/* Center Section: Search & Links */}
          <div className="hidden md:flex flex-1 items-center justify-center px-8 gap-6">
            <div className="relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-400 group-focus-within:text-amber-500 transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for your order..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300 sm:text-sm"
              />
            </div>
            <div className="flex items-center gap-2 text-gray-600 hover:text-amber-600 font-medium cursor-pointer transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <span><Link to="/track"> Track Order  </Link></span>
            </div>
          </div>
          
          {/* Right Section: Auth Buttons */}
          <div className="flex items-center gap-4">
            <button
                onClick={() => setIsLoginOpen(true)}
                className="hidden sm:block text-gray-600 hover:text-amber-600 font-semibold px-2 py-2 rounded-full transition-colors duration-200"
              >
                Login
              </button>
            <button
              onClick={() => setIsSignupOpen(true)}
              className="hidden sm:block text-gray-600 hover:text-amber-600 font-semibold px-2 py-2 transition-colors duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onOpenSignUp={() => setIsSignupOpen(true)} />
  <SignupForm isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} onOpenLogin={() => setIsLoginOpen(true)} />

    </>
  );
};

export default Navbar;