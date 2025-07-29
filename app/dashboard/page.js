"use client";
import React, { useState } from "react";

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample posts data
  const posts = [
    {
      id: 1,
      title: "Latest Digital Art",
      description:
        "Just finished my latest digital art piece! Really excited to share this with everyone. 🎨✨",
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
  ];

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setEditedTitle(post.title);
    setEditedDescription(post.description);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Saving changes:", {
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleDelete = () => {
    console.log("Deleting post:", selectedPost.id);
    setSelectedPost(null);
  };

  const handleClosePopup = () => {
    setSelectedPost(null);
    setIsEditing(false);
    setIsCreatingPost(false);
    setNewPostTitle("");
    setNewPostDescription("");
  };

  const handleCreatePost = () => {
    setIsCreatingPost(true);
  };

  const handleSaveNewPost = () => {
    console.log("Creating new post:", {
      title: newPostTitle,
      description: newPostDescription,
    });
    setIsCreatingPost(false);
    setNewPostTitle("");
    setNewPostDescription("");
  };

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

      {/* Mobile Header */}
      <div className="lg:hidden relative z-20 bg-black/40 backdrop-blur-xl border-b border-white/20 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Kaushik Rajbongshi
            </span>
          </h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-white/20 p-4 space-y-2">
            <button
              onClick={() => {
                setActiveTab("profile");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeTab === "profile"
                  ? "bg-purple-600/30 text-white border-l-4 border-purple-400"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => {
                setActiveTab("posts");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeTab === "posts"
                  ? "bg-purple-600/30 text-white border-l-4 border-purple-400"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Posts
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-3 ${
          selectedPost || isCreatingPost ? "blur-sm" : ""
        } transition-all duration-300`}
      >
        <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)] lg:h-[96vh]">
            {/* Left Sidebar - Hidden on mobile, shown as header menu */}
            <div className="hidden lg:block w-64 bg-black/20 border-r border-white/10 p-6">
              <h1 className="text-2xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Kaushik Rajbongshi
                </span>
              </h1>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-purple-600/30 text-white border-l-4 border-purple-400"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("posts")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "posts"
                      ? "bg-purple-600/30 text-white border-l-4 border-purple-400"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Posts
                </button>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 p-4 md:p-8">
              {activeTab === "profile" ? (
                /* Profile Content */
                <div className="space-y-6 md:space-y-8">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl md:text-2xl">U</span>
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        @username
                      </h2>
                      <p className="text-white/70">John Doe</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 md:gap-8">
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-white">24</div>
                      <div className="text-white/60 text-xs md:text-sm">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-white">1.2K</div>
                      <div className="text-white/60 text-xs md:text-sm">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-white">856</div>
                      <div className="text-white/60 text-xs md:text-sm">Following</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
                      About
                    </h3>
                    <p className="text-white/80 leading-relaxed text-sm md:text-base">
                      Creative designer and content creator passionate about
                      digital art and storytelling. Love sharing my journey and
                      connecting with like-minded individuals.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-4">
                      Contact
                    </h3>
                    <div className="space-y-2 text-sm md:text-base">
                      <p className="text-white/70">📧 john.doe@email.com</p>
                      <p className="text-white/70">🌐 johndoe.com</p>
                      <p className="text-white/70">📍 New York, USA</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full sm:w-auto"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                /* Posts Content */
                <div className="h-full flex flex-col">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                    <h2 className="text-xl md:text-2xl font-bold text-white">My Posts</h2>
                    <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                      <button
                        onClick={handleCreatePost}
                        className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
                      >
                        <span className="text-white text-lg">+</span>
                      </button>
                      <input
                        type="text"
                        placeholder="Search Posts"
                        className="flex-1 sm:flex-none px-3 py-2 bg-transparent text-purple-400 font-medium rounded-lg transition-colors text-sm border border-purple-400 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400/70"
                      />
                      <button className="w-8 h-8 md:w-10 md:h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20">
                        <span className="text-white">🔍</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {posts.map((post, index) => (
                        <div
                          key={post.id}
                          onClick={() => handlePostClick(post)}
                          className={`${
                            index % 4 === 0
                              ? "bg-gradient-to-br from-slate-800/40 to-purple-800/40"
                              : index % 4 === 1
                              ? "bg-gradient-to-br from-slate-700/30 to-indigo-700/30"
                              : index % 4 === 2
                              ? "bg-gradient-to-br from-gray-800/20 to-purple-800/20"
                              : "bg-gradient-to-br from-purple-800/30 to-pink-800/20"
                          } backdrop-blur-xl border border-white/20 rounded-xl p-4 md:p-6 shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300`}
                        >
                          <div className="flex items-center space-x-3 mb-4">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
                            <div className="text-white text-xs md:text-sm font-medium">
                              @username
                            </div>
                            <div className="text-white/40 text-xs">
                              {post.time}
                            </div>
                          </div>
                          <div className="text-white/90 mb-4 text-sm md:text-base">
                            {post.description}
                          </div>
                          <div className="flex items-center space-x-4 text-white/60 text-xs md:text-sm">
                            <div className="flex items-center space-x-1">
                              <span>♥</span>
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>💬</span>
                              <span>{post.comments}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>↗</span>
                              <span>{post.shares}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {(selectedPost || isCreatingPost) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClosePopup}
          ></div>
          <div className="relative bg-gradient-to-br from-slate-800/90 to-purple-800/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-8 max-w-2xl w-full shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            {isCreatingPost ? (
              /* Create New Post Form */
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="text-white/80 text-lg font-semibold">
                    Share New Post
                  </div>
                  <button
                    onClick={handleClosePopup}
                    className="text-white/60 hover:text-white lg:hidden"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Post Title
                    </label>
                    <input
                      type="text"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                      placeholder="Enter post title..."
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Post Description
                    </label>
                    <textarea
                      value={newPostDescription}
                      onChange={(e) => setNewPostDescription(e.target.value)}
                      rows={6}
                      className="custom-scrollbar w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm md:text-base"
                      placeholder="Enter post description..."
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleSaveNewPost}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm md:text-base"
                  >
                    Share Post
                  </button>
                </div>
              </>
            ) : (
              /* Edit Existing Post Form */
              <>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex space-x-3">
                    <button
                      onClick={handleEdit}
                      disabled={isEditing}
                      className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                        isEditing
                          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-3 md:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                  <button
                    onClick={handleClosePopup}
                    className="text-white/60 hover:text-white lg:hidden"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Post Title
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
                        placeholder="Enter post title..."
                      />
                    ) : (
                      <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm md:text-base">
                        {selectedPost.title}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Post Description
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        rows={6}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm md:text-base"
                        placeholder="Enter post description..."
                      />
                    ) : (
                      <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white min-h-[150px] text-sm md:text-base">
                        {selectedPost.description}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/60 text-xs md:text-sm bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <span>♥</span>
                      <span>{selectedPost.likes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>💬</span>
                      <span>{selectedPost.comments}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>↗</span>
                      <span>{selectedPost.shares}</span>
                    </div>
                    <div className="ml-auto text-white/40">
                      {selectedPost.time}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm md:text-base"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
}