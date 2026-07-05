
import React from "react";
import { useEffect } from "react";

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

export default ProductCard;