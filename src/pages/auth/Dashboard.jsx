import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/Config";

export default function Dashboard() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("No user authenticated, redirecting to login");
        window.location.href = "/login";
      } else if (!user.emailVerified) {
        console.log("Email not verified, redirecting to login");
        window.location.href = "/login";
      } else {
        console.log("User authenticated and verified:", user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Dashboard
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Welcome to your academic dashboard!
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <p className="text-gray-700">
            This is your secure dashboard. Only authenticated and email-verified
            users can access this page.
          </p>
          <button
            onClick={() =>
              auth.signOut().then(() => (window.location.href = "/login"))
            }
            className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Sign Out
          </button>
          <div className="mt-4 text-center">
            <a
              href="/login"
              className="text-indigo-600 font-medium hover:text-indigo-800 hover:underline"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
