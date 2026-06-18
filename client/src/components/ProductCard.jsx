import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 flex flex-col h-full">
      <div className="relative pt-[100%] bg-white overflow-hidden">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-gray-600 shadow-sm border border-gray-100 uppercase tracking-wider">
            {product.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow border-t border-gray-50">
        <h3 className="font-semibold text-gray-800 text-lg line-clamp-2 mb-2" title={product.title}>
          {product.title}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-600">
            ${product.price.toFixed(2)}
          </span>
          <button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full p-2.5 transition-colors shadow-sm" title="Add to Cart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;