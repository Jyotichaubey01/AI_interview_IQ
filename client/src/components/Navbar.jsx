import React, { useState } from "react";
import { Bot, Coins } from "lucide-react";

const Navbar = () => {
  const [showCredits, setShowCredits] = useState(true);

  return (
    <header className="w-full bg-[#f5f5f5] py-4">
      <div className="max-w-[1600px] mx-auto px-6">
        <nav className="h-16 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between px-5 relative">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>

            <span className="font-semibold text-gray-900 text-lg">
              InterviewIQ.AI
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 px-10">
            <input
              type="text"
              className="w-full h-11 border border-gray-200 rounded-full bg-white outline-none px-5"
            />
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 relative">

            <button
              onClick={() => setShowCredits(!showCredits)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50"
            >
              <Coins size={16} />
              <span className="font-medium">100</span>
            </button>

            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
              A
            </div>

            {showCredits && (
              <div className="absolute top-16 right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50">
                <p className="text-sm text-gray-500">
                  Need more credits to continue interviews?
                </p>

                <button className="mt-4 w-full bg-black text-white rounded-lg py-2.5 font-medium hover:bg-gray-900">
                  Buy more credits
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;