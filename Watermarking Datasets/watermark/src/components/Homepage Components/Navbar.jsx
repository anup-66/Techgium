import React, { useState, useEffect } from "react";
import { elastic as Menu } from "react-burger-menu";
import "../Homepage Components/Sidebar.css";
import { FaUser } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

function Navbar() {
  const sentences = [
    "Explore Datasets",
    "Exclusive Datasets Just For You",
    "Track Your Datasets",
  ];
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTyping) {
        // Typing animation
        setDisplayedText((prevText) => {
          const nextChar = sentences[currentSentenceIndex][prevText.length];
          if (nextChar) {
            return prevText + nextChar;
          } else {
            setIsTyping(false); // Finish typing
            setTimeout(() => setIsTyping(true), 5000); // Wait for 1 second before erasing
            return prevText;
          }
        });
      } else {
        // Erasing animation
        setDisplayedText((prevText) => {
          if (prevText.length > 0) {
            return prevText.slice(0, -1);
          } else {
            setCurrentSentenceIndex(
              (prevIndex) => (prevIndex + 1) % sentences.length
            ); // Move to the next sentence
            setIsTyping(true); // Start typing the next sentence
            return "";
          }
        });
      }
    }, 150); // Adjust the typing speed as needed

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentSentenceIndex, isTyping, sentences]);

  return (
    <div>
      <div className="h-[100px] border-b-2 bg-teal-800 opacity-90 flex items-center justify-center shadow-2xl">
        <ul className="text-[22px] font-mono font-semibold flex text-white">
          <li className="p-8 hover:underline hover:cursor-pointer">Home</li>
          <li className="p-8 hover:underline hover:cursor-pointer">
            Dashboard
          </li>
          <li className="p-8 hover:underline hover:cursor-pointer">Datasets</li>
        </ul>
        <Menu className="bg-[#373a47] p-3">
          <a className="menu-item mt-[40px] text-[20px] font-mono" href="/">
            Your Profile
          </a>
          <a
            className="menu-item mt-[20px] text-[20px] font-mono"
            href="/salads"
          >
            Dashboard
          </a>
          <a
            className="menu-item mt-[20px] text-[20px] font-mono"
            href="/pizzas"
          >
            Your Datasets
          </a>
          <a
            className="menu-item mt-[20px] text-[20px] font-mono"
            href="/desserts"
          >
            Get Verified!
          </a>
          <button className="menu-item p-4 border mt-[40px] text-[20px] rounded ml-[20px] font-mono bg-teal-800">
            Sign Out
          </button>
        </Menu>
      </div>
      <div className="flex items-center justify-center p-4">
        <input
          type="text"
          placeholder="Search Datasets..."
          className="border-2 p-2 rounded-full w-[600px]"
        />
      </div>
      <div>
        <div className="ml-[80px] h-[50px]">
          <h2 className="text-[48px] font-mono font-semibold">
            {displayedText}
          </h2>
        </div>
        <div className="absolute ml-[80px] mt-[20px]">
          <p className="w-[700px]">
            "Embark on a journey of data exploration with our platform, where a
            wealth of datasets awaits. From specialized collections tailored to
            your needs to comprehensive datasets spanning various domains, our
            platform is your gateway to valuable insights. Uncover the power of
            data-driven decision-making and elevate your projects with ease.
            Join us on a data discovery adventure and unlock the potential of
            informed and impactful analyses."
          </p>
        </div>
        <div>
          <img
            src="/assets/dataset.png"
            className="w-[200px] absolute right-[80px]"
          />
        </div>
      </div>
      <div className="ml-[80px] absolute mt-[220px] border-2 w-[1350px] h-[400px]">
        <div className="flex">
          <h3 className="text-[20px] font-mono underline mt-[10px] ml-[20px]">
            Textual Datasets
          </h3>
          <h3 className="text-[20px] font-mono underline mt-[10px] ml-[1000px]">
            View All-
          </h3>
        </div>
        <div className="grid grid-cols-4 grid-row-1 gap-3 ml-[15px] mt-[20px]">
          <div className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                View
              </button>
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                Download
              </button>
            </div>
          </div>
          <div className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                View
              </button>
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                Download
              </button>
            </div>
          </div>
          <div className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                View
              </button>
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                Download
              </button>
            </div>
          </div>
          <div className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                View
              </button>
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-[80px] absolute mt-[640px] border-2 w-[1350px] h-[400px]">
        <div className="flex">
          <h3 className="text-[20px] font-mono underline mt-[10px] ml-[20px]">
            Image Datasets
          </h3>
          <h3 className="text-[20px] font-mono underline mt-[10px] ml-[1000px]">
            View All-
          </h3>
        </div>
        <div className="grid grid-cols-4 grid-row-1 gap-3 ml-[15px] mt-[20px]">
          <div className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                View
              </button>
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                Download
              </button>
            </div>
          </div>
          <div className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                View
              </button>
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                Download
              </button>
            </div>
          </div>
          <div className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                View
              </button>
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                Download
              </button>
            </div>
          </div>
          <div className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                View
              </button>
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-[80px] absolute mt-[1060px] border-2 w-[1350px] h-[400px]">
        <div className="flex">
          <h3 className="text-[20px] font-mono underline mt-[10px] ml-[20px]">
            Audio Datasets
          </h3>
          <h3 className="text-[20px] font-mono underline mt-[10px] ml-[1000px]">
            View All-
          </h3>
        </div>
        <div className="grid grid-cols-4 grid-row-1 gap-3 ml-[15px] mt-[20px]">
          <div className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                View
              </button>
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                Download
              </button>
            </div>
          </div>
          <div className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                View
              </button>
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                Download
              </button>
            </div>
          </div>
          <div className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                View
              </button>
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                Download
              </button>
            </div>
          </div>
          <div className="border-2 w-[300px] h-[300px]">
            <div className="h-[60px] w-full border-t-2 mt-[240px] flex">
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                View
              </button>
              <button className="w-[150px] bg-teal-800 h-full flex text-center items-center justify-center text-[22px] text-white border">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
