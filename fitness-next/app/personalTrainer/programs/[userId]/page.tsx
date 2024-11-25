"use client";
import React, { useEffect, useState } from "react";
import { fetchWorkoutPrograms } from "@/app/api/personalTrainer/route";
import { useAuth } from "@/context/authContext";
import Program from "@/components/Program";
import { WorkoutProgram } from "@/app/Types";
import { useParams } from "next/navigation";

const Page = () => {
  const { token, user } = useAuth();
  const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        if (!token || !userId) return;
        const response = await fetchWorkoutPrograms(token, userId);
        setPrograms(response);
      } catch (error) {
        console.error("Error fetching program:", error);
      }
    };

    fetchPrograms();
  }, [userId]);

  //Insert the name of the client in the h1 tag
  //make them clickalbe to redirect to specific program

  return (
      <section>
        <h1 className="text-4xl text-center leading-none font-medium pb-5">Client's Programs </h1>
        <div className="grid grid-cols-[(repeat(auto-fill, minmax(300px, 1fr)))] gap-4">
          {programs.map((program) => (
              <Program workoutProgram={program} user={user} key={program.workoutProgramId}/>
          ))}
        </div>
      </section>
  );
};

export default Page;
