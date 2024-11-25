"use client";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { useAuth } from "@/context/authContext";
import { POST } from "@/app/api/manager/route";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { token, user } = useAuth();
  const router = useRouter();

  const addClient = async () => {
    //add the id of the trainer currently adding
    if (!token) return;
    await POST(
      token,
      firstName,
      lastName,
      email,
      password,
      "Client",
      Number(user.UserId),
    );
  };

  return (
      <div className="flex flex-col gap-2 max-w-sm mx-auto py-12">
          <h2 className="text-3xl text-center"> Add client</h2>
          <InputField
              type="firstName"
              placeholder="FirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
              type="lastName"
              placeholder="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
          />
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
          <div className="mt-12 flex justify-center">
              <Button
                  text={"Add Client"}
                  onClick={() => {
                      addClient(); // Call the handleAddExercise function
                      router.push(`/personalTrainer`); // Then navigate to the programs page
                  }}
              />
          </div>
      </div>
  );
};

export default Page;
