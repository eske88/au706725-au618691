"use client";
import {useParams, useRouter} from "next/navigation";
import { useAuth } from "@/context/authContext";
import { addExerciseToProgram } from "@/app/api/personalTrainer/route";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

const AddExercisePage = () => {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [sets, setSets] = useState(0);
  const [repetitions, setRepetitions] = useState(0);
  const [time, setTime] = useState("");
  const router = useRouter();


  const params = useParams(); // Unwrap the dynamic route parameters
  const { userId, workoutProgramId } = params;
  const { token } = useAuth();

  const handleAddExercise = async () => {
    try {
      const response = await addExerciseToProgram(workoutProgramId, token, {
        name: exerciseName,
        description: exerciseDescription,
        sets,
        repetitions,
        time,
      });
      console.log(response);
      await router.push(`/personalTrainer/programs/${userId}/${workoutProgramId}/exercises`);
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  };

  return (
      <div className="max-w-sm mx-auto">
        <h2 className="text-xl font-bold mt-6">Add Exercise to Program</h2>
        <div className="my-4">
          <label className="block font-semibold">Exercise Name</label>
          <InputField
              placeholder={"Name"}
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              type={"text"}
          />
        </div>
        <div className="my-4">
          <label className="block font-semibold">Exercise Description</label>
          <InputField
              placeholder={"Description"}
              value={exerciseDescription}
              onChange={(e) => setExerciseDescription(e.target.value)}
              type={"textField"}
          />
        </div>
        <section className="flex gap-2">
          <div>
            <label className="block font-semibold">Sets</label>
            <InputField
                placeholder={"Sets"}
                value={sets}
                onChange={(e) => setSets(parseInt(e.target.value))}
                type={"number"}
            />
          </div>
          <div>
            <label className="block font-semibold">Repetitions</label>
            <InputField
                placeholder={"Repetitions"}
                value={repetitions}
                onChange={(e) => setRepetitions(parseInt(e.target.value))}
                type={"number"}
            />
          </div>
          <div>
            <label className="block font-semibold">Time</label>
            <InputField
                placeholder={"Time"}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type={"number"}
            />
          </div>
        </section>
        <div className="mt-12 flex justify-center">
          <Button
              text={"Add Exercise"}
              onClick={() => {
                handleAddExercise();
              }}
          />
        </div>

      </div>
  );
};

export default AddExercisePage;
