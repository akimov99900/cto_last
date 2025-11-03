"use client";

import { useState, useEffect, useMemo } from "react";
import sdk from "@farcaster/frame-sdk";
import { wishes } from "@/lib/wishes";
import { getDeterministicWishIndex } from "@/lib/hash";

export default function WishDisplay() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [fid, setFid] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const context = await sdk.context;
        setFid(context.user.fid);
        setIsSDKLoaded(true);
      } catch (err) {
        console.error("SDK Error:", err);
        setError("Failed to load Farcaster context");
        setIsSDKLoaded(true);
      }
    };

    load();
  }, []);

  const wishIndex = useMemo(() => {
    if (!fid) return 0;
    return getDeterministicWishIndex(fid, currentDate, wishes.length);
  }, [fid, currentDate]);

  const handleNewWish = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!isSDKLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !fid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Authentication Required
          </h2>
          <p className="text-gray-600">
            {error || "Please open this app in a Farcaster client"}
          </p>
        </div>
      </div>
    );
  }

  const isToday =
    currentDate.toISOString().split("T")[0] ===
    new Date().toISOString().split("T")[0];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl bg-white p-8 shadow-2xl md:p-12">
          <div className="mb-8 text-center">
            <div className="mb-4 text-6xl">✨</div>
            <h1 className="mb-2 text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              nice
            </h1>
            <p className="text-sm text-gray-500">
              {isToday ? "Your wish for today" : formatDate(currentDate)}
            </p>
          </div>

          <div className="mb-8 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 p-8">
            <p className="text-center text-xl leading-relaxed text-gray-800 md:text-2xl">
              {wishes[wishIndex]}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleNewWish}
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
            >
              New Wish
            </button>
          </div>

          {!isToday && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setCurrentDate(new Date())}
                className="text-sm text-purple-600 hover:text-purple-700 underline"
              >
                Back to today
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Your wish is unique to you and changes daily.
            <br />
            FID: {fid}
          </p>
        </div>
      </div>
    </div>
  );
}
