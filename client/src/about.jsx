import React from "react";




const LightPage = () => {
  return (
    <>
   
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img
          src="/your-photo.jpg" // Replace with your photo URL or import it
          alt="Your Photo"
          className="w-32 h-32 mx-auto rounded-full"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">Heading</h1>
        <h2 className="text-lg text-gray-600 mt-2">Subtitle</h2>
        <p className="text-gray-700 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus
          dolor non massa luctus, at luctus tellus auctor. Nullam eget velit
          eget tortor aliquam ultricies.
        </p>
      </div>
    </div>
    
    </>
  );
};

export default LightPage;
