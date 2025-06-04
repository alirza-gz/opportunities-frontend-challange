import React from "react";
import OpportunitiesSection from "../components/OpportunitiesSection";

function HomePage() {
  return (
    <main className="min-h-[200vh] bg-black">
      <div className="h-screen flex items-center justify-center">
        <div className="text-white text-center px-4">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Scroll down to see the Opportunities Section
          </h1>
          <p className="text-gray-400">
            This page is tall to test viewport optimization
          </p>
        </div>
      </div>
      <OpportunitiesSection />
      <div className="h-screen flex items-center justify-center">
        <div className="text-white text-center px-4">
          <h2 className="text-xl md:text-2xl font-bold">End of page</h2>
          <p className="text-gray-400">
            Scroll back up to see the section again
          </p>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
