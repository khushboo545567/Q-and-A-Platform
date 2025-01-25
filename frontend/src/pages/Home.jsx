import React, { useState } from "react";
import { Link } from "react-router-dom";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";

const Home = function () {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false); // Ensure only one overlay is open at a time
  };

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false); // Ensure only one overlay is open at a time
  };

  const closeOverlay = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(false);
  };
  return (
    <div className="">
      <div className="px-20 py-3 bg-[#F8F8F8] flex justify-between items-center drop-shadow-sm">
        <div>
          <span className="">Logo</span>
        </div>
        <div className="flex gap-6 items-center">
          <div className="font-semibold hover:underline">
            <Link to="/chat">Post a Problem</Link>
          </div>
          <button
            className=" transition-transform transform hover:scale-110 font-semibold"
            onClick={openSignup}
          >
            Signup
          </button>
          <button
            className="px-4 py-1 bg-black text-white rounded-md font-semibold"
            onClick={openLogin}
          >
            Login
          </button>
        </div>
      </div>
      <div className="">
        <div className="text-center py-10 pt-20 bg-[#F8F8F8] ">
          <h2 className="text-3xl font-bold mb-4">Got a Question? Ask Away.</h2>
          <p className="text-gray-600 mb-6">
            Share knowledge, solve problems, and grow together.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-lg"><Link to="/chat">
            Ask a Question</Link>
          </button>
        </div>
        <section className="p-6 py-16 px-20 bg-[#F8F8F8]">
          <h3 className="text-xl font-bold mb-4">Featured Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h4 className="font-bold">What is the difference between WHERE and HAVING clauses?</h4>
              <p className="text-gray-600">Votes: 1 | Answers: 1</p>
              <p className="text-sm text-gray-500">
              The WHERE clause filters rows before grouping and is used with individual rows in a table. The HAVING clause filters groups after aggregation and is used with grouped data, often involving aggregate functions like SUM() or COUNT(). Both can be used together for precise filtering in SQL queries.
              </p>
            </div>
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h4 className="font-bold">Explain the working of React Router.
              </h4>
              <p className="text-gray-600">Votes: 0 | Answers: 1</p>
              <p className="text-sm text-gray-500">
              React Router enables dynamic routing in React applications by mapping URLs to specific components, allowing seamless navigation without page reloads.
              </p>
            </div>
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h4 className="font-bold">What is JSX, and how does it work in React?</h4>
              <p className="text-gray-600">Votes: 1 | Answers: 1</p>
              <p className="text-sm text-gray-500">
              JSX (JavaScript XML) is a syntax extension in React that allows you to write HTML-like code within JavaScript. It works by transpiling the JSX code into standard JavaScript using React.createElement() to create React elements.
              </p>
            </div>
            {/* Add more cards */}
          </div>
        </section>
        <section className="bg-[#F8F8F8] p-6 pb-20 px-20">
          <h3 className="text-xl font-bold mb-4">Categories</h3>
          <div className="flex space-x-4">
            <button className="bg-black text-white px-4 py-2 rounded-lg">
            Programming
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-lg">
            Academics
            </button>
            
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-gray-800 text-white p-3 text-center">
          <p>© 2025 Q&A App. All rights reserved.</p>
        </footer>
      </div>
      <div className="bg-[#F8F8F8] h-full">
        <Signup
          isOverSignuplayOpen={isSignupOpen}
          closeOverlay={closeOverlay}
          openLogin={openLogin}
        />
        <Login isOverlayOpen={isLoginOpen} closeOverlay={closeOverlay} />
      </div>
    </div>
  );
};

export default Home;
