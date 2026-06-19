import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Try to get product from state (if navigated from Home), otherwise fetch it
  const [product, setProduct] = useState(location.state?.productdetails || null);
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    if (!product) {
      // Fetch single product
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, product]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center mt-20 text-2xl font-bold">Product not found!</div>;
  }

  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { productdetails: product } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 p-8 bg-gray-50 flex items-center justify-center">
            <img 
              src={product.thumbnail || product.images?.[0] || "https://via.placeholder.com/500"} 
              alt={product.title} 
              className="w-full max-h-[500px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          {/* Details Section */}
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm text-amber-600 font-bold mb-2">
              {product.category}
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center mb-6">
              <div className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-semibold text-sm">
                ⭐ {product.rating}
              </div>
              <span className="ml-4 text-gray-500 text-sm">{product.stock} in stock</span>
            </div>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="mt-auto">
              <div className="text-5xl font-extrabold text-gray-900 mb-6">
                ${product.price.toFixed(2)}
              </div>
              
              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg flex items-center justify-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;