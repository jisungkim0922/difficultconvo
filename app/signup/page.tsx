"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password: pw });
    setMsg(error ? "Error: " + error.message : "Check your email to confirm account.");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    setMsg(error ? "Error: " + error.message : "Logged in! Refreshing...");
    if (!error) window.location.href = "/profiles";
  };

  return (
    <div className="max-w-md mx-auto pt-24 space-y-6">
      <h1 className="text-2xl font-semibold text-center">Sign Up / Log In</h1>
      <form className="space-y-3">
        <input
          className="border w-full p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="border w-full p-2 rounded"
          placeholder="Password"
          type="password"
          value={pw}
          onChange={e => setPw(e.target.value)}
        />

        <button onClick={handleSignup} className="w-full bg-black text-white py-2 rounded">
          Create Account
        </button>

        <button onClick={handleLogin} className="w-full border py-2 rounded">
          Log In
        </button>

        {msg && <p className="text-center text-sm mt-2 text-gray-600">{msg}</p>}
      </form>
    </div>
  );
}
