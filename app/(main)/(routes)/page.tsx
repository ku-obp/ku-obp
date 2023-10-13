"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [currentUser, setCurrentUser] = useState<{ user_name: string } | null>(
    null
  );

  useEffect(() => {
    fetch("api/test")
      .then((res) => res.json())
      .then((data) => setCurrentUser(data))
      .catch((error) => console.error("Error: ", error));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full gap-4">
      <p className="text-3xl md:text-5xl font-bold text-rose-500">
        Open Boardgame Project
      </p>
      <p>Welcome, {currentUser ? currentUser?.user_name : "Loading..."}!</p>
    </div>
  );
}
