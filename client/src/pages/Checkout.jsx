import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Jo data humne pichle page se bheja tha, wo yahan receive hoga
  const product = location.state?.productDetails;

  const handlePayment = () => {
    alert("Payment Successful! Order placed.");
    // Payment hone ke baad user ko tracking page par bhej do ek random order ID ke sath
    const orderId = Math.floor(Math.random() * 1000000);
    navigate(`/tracking/${orderId}`);
  };

  // Agar bina product select kiye koi direct is page par aa jaye
  if (!product) return <div className="text-center mt-20">Koi product select nahi kiya!</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 flex gap-6 mt-10">
       {/* Left Side - Delivery Address & Map */}
       <div className="w-2/3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Select Delivery Location</h2>
          {/* Yahan hum Map lagayenge (Step 3 dekhein) */}
          <div className="h-64 bg-gray-200 rounded flex items-center justify-center mb-4">
              {/* Yahan Map aayega */}
              <p>Map will be here...</p> 
          </div>
          <input type="text" placeholder="Enter Full Address" className="w-full border p-2 rounded" />
       </div>

       {/* Right Side - Bill Details */}
       <div className="w-1/3 bg-white p-6 rounded-lg shadow-md border border-gray-200 h-fit">
          <h2 className="text-xl font-bold mb-4">Bill Details</h2>
          <div className="flex items-center gap-4 mb-4">
             <img src={product.thumbnail || product.image} alt="img" className="w-16 h-16 object-contain border rounded" />
             <p className="font-semibold line-clamp-2">{product.title}</p>
          </div>
          
          <div className="flex justify-between mb-2">
             <span>Item Total</span>
             <span>${product.price}</span>
          </div>
          <div className="flex justify-between mb-2 text-green-600">
             <span>Delivery Fee</span>
             <span>FREE</span>
          </div>
          <hr className="my-3"/>
          <div className="flex justify-between font-bold text-lg mb-6">
             <span>To Pay</span>
             <span>${product.price}</span>
          </div>

          <button onClick={handlePayment} className="w-full bg-amber-600 text-white py-3 rounded font-bold hover:bg-amber-700">
             Proceed to Pay
          </button>
       </div>
    </div>
  );
};

export default Checkout;
