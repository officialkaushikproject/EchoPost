// Here Set handle oparation performed, if handle set confirm then update the session also

"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { setHandle } from "@/lib/zodSchema";

export default function HandleSettingPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  const formMethods = useForm({
    resolver: zodResolver(setHandle),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = formMethods;

  // Watch the handle input for real-time availability checking
  const handleValue = watch("handle");

  // Check handle availability with debounce
  useEffect(() => {
    if (!handleValue || handleValue.length < 3) {
      setIsAvailable(null);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsCheckingAvailability(true);
      try {
        const response = await fetch(`/api/check-handle?handle=${handleValue}`);
        const data = await response.json();
        setIsAvailable(data.available);
      } catch (error) {
        console.error("Error checking handle availability:", error);
      } finally {
        setIsCheckingAvailability(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [handleValue]);

  const onSubmit = async (data) => {
    if (isAvailable === false) {
      setResponseMessage("Handle is already taken");
      return;
    }

    setIsLoading(true);
    setResponseMessage("");

    try {
      const res = await fetch("/api/set-handle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setResponseMessage("Handle set successfully! Redirecting...");

        // Method 1: Trigger JWT callback to refresh from database
        await update(); // This will trigger the JWT callback with trigger: "update"

        // Wait a bit for session to update
        setTimeout(async () => {
          // Method 2: Force a complete session refresh
          await update({
            ...session,
            user: {
              ...session.user,
              handle: data.handle,
              hasHandle: true,
            },
          });

          // Redirect after session is updated
          router.push("/dashboard");
        }, 1000);
      } else {
        setResponseMessage(result.error || "Failed to set handle");
      }
    } catch (error) {
      console.error("Error setting handle:", error);
      setResponseMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show toast notification
  useEffect(() => {
    if (responseMessage) {
      // You can use your Toastify here or any other notification library
      console.log(responseMessage); // Replace with your toast implementation
    }
  }, [responseMessage]);

  // Redirect if user already has handle
  useEffect(() => {
    if (session?.user?.hasHandle) {
      router.push("/dashboard");
    }
  }, [session, router]);

  // Show loading if session is loading
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/50 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/50 to-black relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-50 h-50 bg-violet-600/8 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-white">
          Claim Your Unique Handle
        </h1>

        {/* Welcome message */}
        <p className="text-gray-300 mb-8">
          Welcome {session?.user?.name}! Choose a unique handle to complete your
          profile.
        </p>

        {/* Input with Button Inside */}
        <div className="relative max-w-md w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base">
                @
              </span>
              <input
                {...register("handle")}
                type="text"
                placeholder="your_handle"
                disabled={isLoading}
                className="w-full pl-8 pr-32 py-4 bg-black/40 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 backdrop-blur-sm text-base disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !handleValue ||
                  handleValue.length < 3 ||
                  isAvailable === false
                }
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors text-sm"
              >
                {isLoading ? "Setting..." : "Claim"}
              </button>
            </div>

            {/* Handle validation feedback */}
            <div className="mt-2 text-left">
              {errors.handle && (
                <p className="text-sm text-red-400">{errors.handle.message}</p>
              )}

              {handleValue && handleValue.length >= 3 && !errors.handle && (
                <div className="text-sm">
                  {isCheckingAvailability ? (
                    <p className="text-gray-400">Checking availability...</p>
                  ) : isAvailable === true ? (
                    <p className="text-green-400">✓ Handle is available</p>
                  ) : isAvailable === false ? (
                    <p className="text-red-400">✗ Handle is already taken</p>
                  ) : null}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-1">
                Handle must be 3-20 characters long and contain only small
                letters, numbers, and underscores
              </p>
            </div>

            {/* Response message */}
            {responseMessage && (
              <div
                className={`mt-4 p-3 rounded-lg text-sm ${
                  responseMessage.includes("successfully")
                    ? "bg-green-900/30 text-green-400 border border-green-500/30"
                    : "bg-red-900/30 text-red-400 border border-red-500/30"
                }`}
              >
                {responseMessage}
              </div>
            )}
          </form>
        </div>

        {/* Help text */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Your handle will be used to identify you across the platform.</p>
          <p>Choose wisely - you can change it later in settings.</p>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
}
