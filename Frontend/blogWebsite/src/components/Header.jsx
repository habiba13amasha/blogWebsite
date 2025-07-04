import React from "react";

export default function Header() {
  return (
    <header className="relative w-full h-[70vh] bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-32 right-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="blog-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text">
            Creative Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl leading-relaxed font-light">
            Discover inspiring stories, innovative ideas, and creative insights that shape our digital world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105">
              Explore Articles
            </button>
            <button className="btn-secondary px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105">
              Join Community
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </header>
  );
}