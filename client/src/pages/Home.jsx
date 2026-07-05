import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";  



const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
    <div className="h-52 bg-gray-200" />
    <div className="p-4 flex flex-col gap-3">
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-6 bg-gray-200 rounded w-1/4 mt-1" />
      <div className="h-9 bg-gray-200 rounded-xl mt-1" />
    </div>
  </div>
);

const Home = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);
 const filteredProducts = products.filter((product)=>
product.title
.toLowerCase()
.includes(searchQuery.toLowerCase())
);
  
  const [session,setSession] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {session ? (null) : (
            <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Featured <span className="text-amber-500">Products</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto mb-6">
            Explore our latest collection of premium products, freshly updated for you.
          </p>
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 transition-all text-sm"
            />
          </div>
        </div>
        )}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : 
        filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <p className="text-lg font-medium">No products found for &quot;{searchQuery}&quot;</p>
          </div>
        ):
          (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;