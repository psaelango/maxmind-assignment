import React from "react";

function TitleBar() {
  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-600 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-center mx-auto">
        <a href="https://www.maxmind.com/en/home" className="flex items-center">
          <img
            src="https://static.maxmind.com/dcdb86f34b586781f64a/images/maxmind-header-logo-compact-alt.svg"
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          />
        </a>
        <div className="pl-11 text-lg text-gray-300">
          Senior Web Developer / Software Engineer Homework Assignment
        </div>
      </div>
    </nav>
  );
}

export default TitleBar;
