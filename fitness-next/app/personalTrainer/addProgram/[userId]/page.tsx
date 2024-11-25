"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/authContext";
import { createWorkoutProgram } from "@/app/api/personalTrainer/route";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const [programName, setProgramName] = useState("");
  const [programDescription, setProgramDescription] = useState("");
  const params = useParams();
  const { userId } = params;
  const { token } = useAuth();
  const router = useRouter();

  const handleCreateProgram = async () => {
    const workoutProgram = {
      name: programName,
      description: programDescription,
      exercises: [],
      clientId: userId,
    };

    try {
      const programData = await createWorkoutProgram(token, workoutProgram as any);
      console.log("Created Program:", programData);
      await router.push(`/personalTrainer/programs/${userId}`);
    } catch (error) {
      console.error("Error creating program:", error);
    }
  };
  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold  text-center">Add Workout Program</h1>
      <div className="my-4">
        <label className="block font-semibold">Program Name</label>
        <InputField
          placeholder={"Name"}
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          type={"text"}
        />
      </div>
      <div className="my-4">
        <label className="block font-semibold">Program Description</label>
        <InputField
          placeholder={"Description"}
          value={programDescription}
          onChange={(e) => setProgramDescription(e.target.value)}
          type={"textField"}
        />
      </div>
      <Button text={" Create Program"} onClick={() => {
        handleCreateProgram();
      }} />
      {/*<h2 className="text-xl font-bold mt-6">Add Exercise to Program</h2>*/}
      {/*<div className="my-4">*/}
      {/*  <label className="block font-semibold">Exercise Name</label>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    value={exerciseName}*/}
      {/*    onChange={(e) => setExerciseName(e.target.value)}*/}
      {/*    className="w-full border rounded p-2"*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className="my-4">*/}
      {/*  <label className="block font-semibold">Exercise Description</label>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    value={exerciseDescription}*/}
      {/*    onChange={(e) => setExerciseDescription(e.target.value)}*/}
      {/*    className="w-full border rounded p-2"*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className="my-4">*/}
      {/*  <label className="block font-semibold">Sets</label>*/}
      {/*  <input*/}
      {/*    type="number"*/}
      {/*    value={sets}*/}
      {/*    onChange={(e) => setSets(parseInt(e.target.value))}*/}
      {/*    className="w-full border rounded p-2"*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className="my-4">*/}
      {/*  <label className="block font-semibold">Repetitions</label>*/}
      {/*  <input*/}
      {/*    type="number"*/}
      {/*    value={repetitions}*/}
      {/*    onChange={(e) => setRepetitions(parseInt(e.target.value))}*/}
      {/*    className="w-full border rounded p-2"*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className="my-4">*/}
      {/*  <label className="block font-semibold">Time</label>*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    value={time}*/}
      {/*    onChange={(e) => setTime(e.target.value)}*/}
      {/*    className="w-full border rounded p-2"*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<button*/}
      {/*  onClick={handleAddExercise}*/}
      {/*  className="bg-green-500 text-white px-4 py-2 rounded"*/}
      {/*>*/}
      {/*  Add Exercise*/}
      {/*</button>*/}
    </div>
  );
};

export default Page;
