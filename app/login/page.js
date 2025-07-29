"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
// export default function Component() {
//   const { data: session } = useSession()
//   if(session) {
//     return <>
//       Signed in as {session.user.email} <br/>
//       Signed in as {session.user.id} <br/>
//       Signed in as {session.user.name} <br/>
//       Signed in as {session.user.hasHandle} <br/>
//       <button onClick={() => signOut()}>Sign out</button>
//     </>
//   }
//   return <>
//     Not signed in <br/>
//     <button onClick={() => signIn()}>Sign in</button>
//   </>
// }

const page = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/50 to-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-60 right-20 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/3 w-50 h-50 bg-violet-600/8 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-green-800/10"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 flex items-center justify-between">
          <div className="flex-1 max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-lg">
              Log in to share new posts, catch up on what others are saying, and
              continue connecting with your community.
            </p>
          </div>

          <div className="flex-1 max-w-md">
            <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Login</h2>
                <div className="flex items-center space-x-3">
                  <span className="text-white/60 text-sm">OR</span>
                  <div className="flex space-x-2">
                    <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20">
                      <img src="./pngegg.png" />
                    </button>
                    <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20">
                      <span className="text-white font-bold">G</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-green-400 transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-green-400 transition-colors"
                  />
                </div>

                <button className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors mt-8">
                  Login
                </button>
              </div>

              <div className="mt-6 text-center">
                <span className="text-white/60 text-sm">
                  Don't have an account?
                </span>
                <Link href={"/register"}>
                <button className="text-green-400 hover:text-green-300 ml-2 text-sm font-medium transition-colors">
                  Register here
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    </>
  );
};

export default page;
