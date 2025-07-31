"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/zodSchema";
import Toastify from "toastify-js";
import { signIn } from "next-auth/react";

const page = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const formMethods = useForm({
    resolver: zodResolver(userSchema),
  });
  const {
    register, // Function to register input fields
    handleSubmit, // Function to handle form submission
    formState: { errors }, // Object containing form state
    reset, // Function to reset the form
  } = formMethods;

  const onSubmit = async (data) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setResponseMessage(result.message || "Submitted");

    if (res.ok) {
      Toastify({
        text: result.message || "Registered successfully!",
        style: {
          background: "linear-gradient(to right, purple, black)",
          color: "white",
        },
      }).showToast();

      console.log("Register");
      reset();
    } else {
      Toastify({
        text: result.message || "Registration failed!",
        style: {
          background: "linear-gradient(to right, #8b0000, black)", // red-black for error
          color: "white",
        },
      }).showToast();

      console.log("Failed R");
    }
  };

  useEffect(() => {
    if (responseMessage) {
      Toastify({
        text: responseMessage,
        className: "info",
        style: {
          background: "linear-gradient(to right, purple, black)",
        },
      }).showToast();
    }
  }, [responseMessage]);
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
            <h1 className="text-5xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Join the Conversation
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
                <h2 className="text-2xl font-bold text-white">Register</h2>
                <div className="flex items-center space-x-3">
                  <span className="text-white/60 text-sm">OR</span>
                  <div className="flex space-x-2">
                    <button onClick={() => signIn("github")} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20">
                      <img src="./pngegg.png" />
                    </button>
                    <button onClick={() => signIn("google")} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20">
                      <span className="text-white font-bold">G</span>
                    </button>
                  </div>
                </div>
              </div>
              <form method="post">
                <div className="space-y-6">
                  <div>
                    <input
                      {...register("name")}
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-green-400 transition-colors"
                    />{" "}
                    {errors.name && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-green-400 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("handle")}
                      type="text"
                      placeholder="Handle"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-green-400 transition-colors"
                    />
                    {errors.handle && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.handle.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("password")}
                      type="password"
                      placeholder="Password"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-green-400 transition-colors"
                    />
                    {errors.password && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors mt-8"
                  >
                    Register
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <span className="text-white/60 text-sm">Already A Member?</span>
                <Link href={"/login"}>
                  <button className="text-green-400 hover:text-green-300 ml-2 text-sm font-medium transition-colors">
                    Login Here
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
