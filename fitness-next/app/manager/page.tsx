"use client";
import React, { useEffect, useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { POST } from "@/app/api/manager/route";
import { useAuth } from "@/context/authContext";
import { GET } from "@/app/api/users/route";
import { JWTInfo, User } from "@/app/Types";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [trainers, setTrainers] = useState<User[]>([]);
  const { token } = useAuth();
  console.log(firstName + lastName + email + password);
  const router = useRouter();

  useEffect(() => {
    // if (!token) {
    //   router.push("/login");
    //   return;
    // }
    //
    // const decoded: JWTInfo = jwtDecode(token);
    // if (decoded.Role !== "Manager") {
    //   router.push("/");
    //   return;
    // }
    const fetchTrainers = async () => {
      if (!token) return; // Ensure token is available
      try {
        const users: User[] = await GET(token);
        const trainers = users.filter(
          (user) => user.accountType === "PersonalTrainer",
        );
        setTrainers(trainers); // Update state after fetching
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };
    fetchTrainers(); // Invoke the async function
  }, [token]); // Add `token` as a dependency

  const addTrainer = async () => {
    const response = await POST(
      token,
      firstName,
      lastName,
      email,
      password,
      "PersonalTrainer",
    );
    console.log(response);
  };

  return (
    <ProtectedRoute roles={["Manager"]}>
      <div className="flex flex-col gap-2 max-w-sm mx-auto py-12">
        <h2 className="text-3xl text-center"> Add personal trainer</h2>
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
        <Button text={"Add personal trainer"} onClick={addTrainer} />
      </div>
      <div className="flex flex-col gap-2 max-w-sm mx-auto py-12 outline p-4 rounded-lg outline-genericGradient-100">
        <h2 className="text-3xl text-center text-black">Personal trainers</h2>
        {trainers.map((trainer, index) => (
          <div key={index} className="flex justify-between">
            <p>
              {trainer.firstName} {trainer.lastName}
            </p>
            <p>{trainer.email}</p>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
};

export default Page;
