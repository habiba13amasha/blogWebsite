import React from "react";

export default function Header() {
  return (
    <header
      className="relative w-full h-60 md:h-96 bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}blog2.jpg)`,
        backgroundPosition: "center 30%",
      }}
    >
      <div className="absolute inset-0 "></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Poppins'] drop-shadow-lg">
          My Blog
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl leading-relaxed font-['Inter']">
          Discover the latest articles and innovative ideas in technology and
          development
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </header>
  );
}
