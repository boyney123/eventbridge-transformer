import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 overflow-hidden sm:px-6 lg:px-8">
        <p className=" text-center text-base text-gray-400">
          An Open Source project made with ❤️ by{' '}
          <a className="text-underline text-blue-500 underline" href="https://twitter.com/boyney123">
            boyney123
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
