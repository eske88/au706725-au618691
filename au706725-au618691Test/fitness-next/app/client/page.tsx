"use client";
import React, {useEffect, useState} from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Program from "@/components/Program";
import {useAuth} from "@/context/authContext";
import {WorkoutProgram} from "@/app/Types";
import {useParams} from "next/navigation";
import {fetchWorkoutPrograms} from "@/app/api/personalTrainer/route";

const Page = () => {
    const { token, user } = useAuth();
    const [programs, setPrograms] = useState<WorkoutProgram[]>([]);
    const userId = user.UserId;

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
  return (
      <ProtectedRoute roles={["Client"]}>
          <section>
              <h1 className="text-2xl font-bold text-center pb-5">Your Programs</h1>
              <div className="grid grid-cols-[(repeat(auto-fill, minmax(300px, 1fr)))] gap-4">
                  {programs.map((program) => (
                      <Program user = {user} workoutProgram={program} key={program.workoutProgramId}/>
                  ))}
              </div>
          </section>
      </ProtectedRoute>
  );
};

export default Page;
