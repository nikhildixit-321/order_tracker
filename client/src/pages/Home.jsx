import React, { useState, useEffect } from "react";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">({rating})</span>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const discount = product.discountPercentage ? Math.round(product.discountPercentage) : 0;
  const originalPrice = discount > 0 ? (product.price / (1 - discount / 100)).toFixed(2) : null;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 h-52">
        {discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">{product.category}</span>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors">
          {product.title}
        </h3>

        <StarRating rating={product.rating} />

        <div className="flex items-center gap-2 mt-auto pt-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
          )}
        </div>

        <div className="flex gap-2 mt-2">
          <button className="flex-1 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-sm font-semibold py-2 rounded-xl transition-all duration-200">
            Add to Cart
          </button>
          <button className="px-3 py-2 border border-gray-200 hover:border-amber-400 hover:bg-amber-50 rounded-xl transition-all duration-200">
            <svg className="w-4 h-4 text-gray-500 hover:text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

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

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <p className="text-lg font-medium">No products found for &quot;{searchQuery}&quot;</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;