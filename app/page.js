"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GlassmorphismHero() {
  const [handle, setHandle] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (handle.length > 0) {
        try {
          const res = await fetch(`/api/search-handle?query=${handle}`);
          const suggestion_handle = await res.json();
          setSuggestion(suggestion_handle);
        } catch (err) {
          console.error("Suggestion fetch error:", err);
          setSuggestion([]);
        }
      } else {
        setSuggestion([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [handle]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/50 to-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-50 h-50 bg-violet-600/8 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-8 py-6">
        <div className="flex items-center space-x-2">
          <div className="w-15 h-12 flex items-center justify-center border border-purple-400/30">
            <span className="text-purple-500 font-bold text-xl">E</span>
            <span className="text-white font-bold text-xl">cho</span>
            <span className="text-purple-500 font-bold text-xl">P</span>
            <span className="text-white font-bold text-xl">ost</span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <button className="text-gray-400 hover:text-white text-sm">
            Features
          </button>
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            Developers
          </a>
          <button className="text-gray-400 hover:text-white text-sm">
            Company
          </button>
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            About Us
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-sm">
            Contact Us
          </a>
        </div>
        <Link href="/login">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
            Login
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-between px-8 py-15 max-w-7xl mx-auto">
        <div className="flex-1 max-w-2xl">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              POST
              <br />
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                SHARING
              </span>
              <br />
              PLATFORM
            </h1>

            <p className="text-white/80 text-lg mb-8 max-w-lg leading-relaxed">
              Connect, share, and discover amazing content from creators around
              the world through our interactive platform
            </p>

            {/* Input */}
            <div className="relative max-w-md mb-8">
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="Enter Handle"
                className="w-full px-4 py-3 pr-32 bg-black/40 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 backdrop-blur-sm"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors text-sm"
              >
                Get Started
              </button>

              {/* Suggestion Dropdown */}
              {suggestion.length > 0 && (
                <div className="absolute z-20 mt-2 w-full rounded-xl bg-black/80 backdrop-blur-md border border-purple-500 shadow-lg overflow-hidden">
                  {suggestion.map((user, index) => (
                    <div
                      key={user._id}
                      onClick={() => router.push(`/handler/${user._id}`)}
                      className={`px-5 py-3 text-white hover:bg-purple-600/30 border-b border-white/10 last:border-b-0 cursor-pointer transition-all duration-200 ${
                        index === 0
                          ? "rounded-t-xl"
                          : index === suggestion.length - 1
                          ? "rounded-b-xl"
                          : ""
                      }`}
                    >
                      <span className="text-purple-400 font-medium">@</span>
                      {user.handle}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Content - Floating Post Cards */}
        <div className="flex-1 relative hidden lg:block">
          <div className="relative w-full h-96">
            {/* Main Post Card */}
            <div className="absolute top-10 right-10 w-80 h-48 bg-gradient-to-br from-slate-800/40 to-purple-800/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-500">
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
                    <div className="text-white text-sm font-medium">
                      @username
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                    <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                    <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-white/90 text-sm">
                    "Just shared my latest creative project! 🎨"
                  </div>
                  <div className="flex items-center space-x-4 text-white/60 text-xs">
                    <div className="flex items-center space-x-1">
                      <span>♥</span>
                      <span>124</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>💬</span>
                      <span>23</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>↗</span>
                      <span>12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Post Card */}
            <div className="absolute top-0 right-32 w-72 h-44 bg-gradient-to-br from-slate-700/30 to-indigo-700/30 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-500">
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                    <div className="text-white/80 text-sm">@creator</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-white/70 text-xs">
                    "Amazing sunset photography session today! 📸"
                  </div>
                  <div className="flex items-center space-x-3 text-white/50 text-xs">
                    <span>♥ 89</span>
                    <span>💬 15</span>
                    <span>↗ 8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Post Card */}
            <div className="absolute top-32 right-0 w-64 h-40 bg-gradient-to-br from-gray-800/20 to-purple-800/20 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg transform rotate-6 hover:rotate-3 transition-transform duration-500">
              <div className="p-4 h-full flex flex-col justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"></div>
                  <div className="text-white/60 text-xs">@artist</div>
                </div>
                <div className="space-y-2">
                  <div className="text-white/50 text-xs">
                    "New digital art piece completed! ✨"
                  </div>
                  <div className="flex items-center space-x-2 text-white/40 text-xs">
                    <span>♥ 45</span>
                    <span>💬 7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Social Icons */}
            <div className="absolute top-20 left-10 w-4 h-4 bg-pink-400 rounded-full animate-bounce delay-300 flex items-center justify-center text-white text-xs">
              ♥
            </div>
            <div className="absolute bottom-20 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-700 flex items-center justify-center text-white text-xs">
              💬
            </div>
            <div className="absolute top-40 left-20 w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
}
