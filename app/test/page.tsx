"use client";

import { useState } from "react";
import { signup, login } from "@/lib/auth/mock-student-auth";

export default function TestPage() {
  const [message, setMessage] = useState("");

  const testSignup = async () => {
    const result = await signup({
      sic: "ADI001",
      fullName: "Aditya",
      password: "123456",
      confirmPassword: "123456",
    });

    if (result.ok) {
      setMessage("✅ Signup Success");
    } else {
      setMessage("❌ Signup Error: " + result.error);
    }
  };

  const testLogin = async () => {
    const result = await login({
      sic: "ADI001",
      password: "123456",
      rememberMe: true,
    });

    if (result.ok) {
      setMessage(
        `✅ Login Success. Welcome ${result.session.user.full_name}`
      );
    } else {
      setMessage("❌ Login Error: " + result.error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Supabase Test</h1>

      <button
        onClick={testSignup}
        style={{
          padding: "10px",
          marginRight: "10px",
        }}
      >
        Test Signup
      </button>

      <button
        onClick={testLogin}
        style={{
          padding: "10px",
        }}
      >
        Test Login
      </button>

      <p style={{ marginTop: "20px" }}>{message}</p>
    </div>
  );
}