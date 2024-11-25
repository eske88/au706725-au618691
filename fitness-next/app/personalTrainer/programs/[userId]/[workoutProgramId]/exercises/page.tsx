"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { WorkoutProgram } from "@/app/Types";
import { fetchWorkoutProgram } from "@/app/api/personalTrainer/route";
import ExerciseGrid from "@/components/ExerciseGrid";

const Page = () => {
  const [workoutProgram, setWorkoutProgram] = useState<WorkoutProgram | null>(
    null,
  );
  const params = useParams();
  const { token, user } = useAuth();
  const { workoutProgramId} = params;

  useEffect(() => {
    const workOutPrograms = async () => {
      try {
        const response = await fetchWorkoutProgram(token, workoutProgramId);
        setWorkoutProgram(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching program:", error);
      }
    };
    workOutPrograms();
  }, [workoutProgramId]);

  return (
      <div>
        <h1 className="text-4xl text-center leading-none font-medium">{workoutProgram?.name}</h1>
        <h2 className="text-center pb-5 pt-5">{workoutProgram?.description}</h2>
        {workoutProgram && <ExerciseGrid exercises={workoutProgram.exercises} user={user}/>}
      </div>
  );
};

export default Page;
