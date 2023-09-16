import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 absolute bottom-0 left-0 w-full ">
      <div className="container mx-auto flex flex-wrap justify-between">
        {/* Column 1 */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Column 1</h2>
          <ul className="list-none">
            <li className="mb-2">Item 1</li>
            <li className="mb-2">Item 2</li>
            <li className="mb-2">Item 3</li>
            <li className="mb-2">Item 4</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Column 2</h2>
          <ul className="list-none">
            <li className="mb-2">Item 1</li>
            <li className="mb-2">Item 2</li>
            <li className="mb-2">Item 3</li>
            <li className="mb-2">Item 4</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Column 3</h2>
          <ul className="list-none">
            <li className="mb-2">Item 1</li>
            <li className="mb-2">Item 2</li>
            <li className="mb-2">Item 3</li>
            <li className="mb-2">Item 4</li>
          </ul>
        </div>

        {/* Column 4 (Newsletter) */}
        <div className="w-full md:w-1/4">
          <h2 className="text-xl font-bold mb-4">Newsletter</h2>
          <p className="mb-4">Subscribe to our newsletter for updates:</p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className="w-full md:w-64 bg-gray-800 text-white rounded-l-md py-2 px-3 focus:outline-none"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md py-2 px-4 focus:outline-none">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
