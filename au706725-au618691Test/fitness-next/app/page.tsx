"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { POST } from "@/app/api/route";
import { GET } from "@/app/api/users/route";
import { useAuth } from "@/context/authContext";
import { JWTInfo, validAccountTypes } from "@/app/Types";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const router = useRouter();

  const login = async (email, password) => {
    const response = await POST(email, password);
    const responseData = await response.json();

    const userData: JWTInfo = jwtDecode(responseData.jwt);

    if (userData) {
      // Store the user data and token in global state and localStorage
      setUser(userData, responseData.jwt);
      const accountType = userData.Role;
      if (accountType === "Manager") {
        router.push("/manager");
      } else if (accountType === "PersonalTrainer") {
        router.push("/personalTrainer");
      } else if (accountType === "Client") {
        router.push("/client");
      } else {
        router.push("/");
      }
    } else {
      console.error("User not found in the system.");
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center h-full justify-center w-full max-w-sm mx-auto">
      <h1 className="text-4xl">Login</h1>
      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={() => login(email, password)} text="login" />
    </div>
  );
};

export default Page;
