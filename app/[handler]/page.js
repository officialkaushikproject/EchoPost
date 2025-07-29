"use client";
import React from "react";

export default function ProfileDashboard() {
  // Sample posts data
  const posts = [
    {
      id: 1,
      title: "Latest Digital Art",
      description:
        "Just finished my latest digital art piece! Really excited to share this with everyone.Just finished my latest digital art piece! Really excited to share this with everyone. 🎨✨",
      time: "2h ago",
      likes: 124,
      comments: 23,
      shares: 12,
    },
    {
      id: 2,
      title: "Sunset Photography",
      description:
        "Beautiful sunset today! Nature always inspires my creativity. 🌅📸",
      time: "1d ago",
      likes: 89,
      comments: 15,
      shares: 8,
    },
    {
      id: 3,
      title: "Secret Project",
      description:
        "Working on something special. Can't wait to reveal it soon! 🚀",
      time: "3d ago",
      likes: 156,
      comments: 34,
      shares: 19,
    },
    {
      id: 4,
      title: "Community Love",
      description:
        "Grateful for all the support from this amazing community! 🙏💜",
      time: "1w ago",
      likes: 203,
      comments: 45,
      shares: 27,
    },
    {
      id: 5,
      title: "New Adventure",
      description:
        "Starting a new creative journey today! Excited to see where this takes me. 🌟",
      time: "2d ago",
      likes: 98,
      comments: 12,
      shares: 5,
    },
    {
      id: 6,
      title: "Inspiration Monday",
      description:
        "Monday motivation: Every masterpiece starts with a single stroke. Keep creating! 💪",
      time: "1w ago",
      likes: 145,
      comments: 28,
      shares: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/50 to-black relative overflow-hidden">
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #a855f7);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #9333ea);
        }
      `}</style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 md:w-40 md:h-40 bg-purple-600/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-32 h-32 md:w-60 md:h-60 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-25 h-25 md:w-50 md:h-50 bg-violet-600/8 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
        <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] lg:h-[92vh]">
            
            {/* Left Sidebar - Desktop Only */}
            <div className="hidden lg:flex w-64 bg-black/20 border-r border-white/10 p-6 flex-col justify-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-3xl font-bold leading-tight mb-3">
                  <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Kaushik Rajbongshi
                  </span>
                </h1>
                <p className="text-white/70 text-lg xl:text-xl">@kaushikraj</p>
              </div>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden bg-black/30 border-b border-white/10 p-4">
              <div className="flex flex-col space-y-4">
                <div className="text-center">
                  <h1 className="text-xl font-bold">
                    <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                      Kaushik Rajbongshi
                    </span>
                  </h1>
                  <p className="text-white/70 text-sm">@kaushikraj</p>
                </div>
                
                {/* Mobile Search & Login */}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search Posts"
                    className="flex-1 px-3 py-2 bg-transparent text-purple-400 font-medium rounded-lg transition-colors text-sm border border-purple-400 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400/70"
                  />
                  <button className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 rounded-lg">
                    <span className="text-white">🔍</span>
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-colors text-sm">
                    Login
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 flex flex-col">
              
              {/* Desktop Top Bar */}
              <div className="hidden lg:flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">Posts</h2>
                
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    placeholder="Search Posts"
                    className="px-4 py-2 bg-transparent text-purple-400 font-medium rounded-lg transition-colors text-sm border border-purple-400 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400/70 w-64"
                  />
                  <button className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 rounded-lg">
                    <span className="text-white">🔍</span>
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-colors">
                    Login
                  </button>
                </div>
              </div>

              {/* Mobile Posts Title */}
              <div className="lg:hidden p-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">Posts</h2>
              </div>

              {/* Scrollable Posts Container */}
              <div className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto custom-scrollbar p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {posts.map((post, index) => (
                      <div
                        key={post.id}
                        className={`${
                          index % 4 === 0
                            ? "bg-gradient-to-br from-slate-800/40 to-purple-800/40"
                            : index % 4 === 1
                            ? "bg-gradient-to-br from-slate-700/30 to-indigo-700/30"
                            : index % 4 === 2
                            ? "bg-gradient-to-br from-gray-800/20 to-purple-800/20"
                            : "bg-gradient-to-br from-purple-800/30 to-pink-800/20"
                        } backdrop-blur-xl border border-white/20 rounded-xl p-4 md:p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xs md:text-sm">K</span>
                          </div>
                          <div className="text-white text-xs md:text-sm font-medium">
                            @kaushikraj
                          </div>
                          <div className="text-white/40 text-xs ml-auto">
                            {post.time}
                          </div>
                        </div>
                        
                        <div className="text-white font-semibold mb-2 text-sm md:text-base">
                          {post.title}
                        </div>
                        
                        <div className="text-white/90 mb-4 text-sm md:text-base leading-relaxed">
                          {post.description}
                        </div>
                        
                        <div className="flex items-center space-x-6 text-white/60 text-xs md:text-sm">
                          <div className="flex items-center space-x-1 hover:text-red-400 transition-colors cursor-pointer">
                            <span>♥</span>
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1 hover:text-blue-400 transition-colors cursor-pointer">
                            <span>💬</span>
                            <span>{post.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1 hover:text-green-400 transition-colors cursor-pointer">
                            <span>↗</span>
                            <span>{post.shares}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
}