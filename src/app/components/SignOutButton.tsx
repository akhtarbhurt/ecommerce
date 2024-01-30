"use client"
import React from "react";
import { signOut } from "next-auth/react";

export default function SignOutButton({ handleBox }: any) {
  const handleSignOut = async () => {
    // Sign out the user
    await signOut({
      callbackUrl: "/login",
      redirect: false, // set to false to prevent immediate redirect
    });

    // Remove the "token" cookie
    // document.cookie = "token=; expires=Wed, 10 Jan 2024 09:48:00 UTC; path=/;";

    // Optionally, close any open modal or dropdown
    handleBox();
  };

  return (
    <div>
      <button
        className='bg-red-600 text-white w-full mt-3 p-2 rounded-md '
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
}
