"use client";

import { useState, useEffect } from "react";

interface ProductCarouselProps {
  images: string[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (!isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Clean up on unhover or unmount
  }, [isHovered, images.length]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative flex justify-center items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
          )
        }
        className="absolute left-2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
      >
        &lt;
      </button>
      <div className="w-full max-w-md">
        <img
          src={images[currentIndex]}
          alt={`Product Image ${currentIndex + 1}`}
          className="w-full h-auto rounded-md"
        />
      </div>
      <button
        onClick={() =>
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
        }
        className="absolute right-2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
      >
        &gt;
      </button>
    </div>
  );
};

export default ProductCarousel;

