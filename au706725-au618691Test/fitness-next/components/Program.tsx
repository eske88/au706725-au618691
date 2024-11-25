import React from "react";
import {JWTInfo, User, WorkoutProgram} from "@/app/Types";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

type ProgramProps = {
  workoutProgram: WorkoutProgram;
  user: JWTInfo;
};
const Program = ({ workoutProgram, user }: ProgramProps) => {
  const router = useRouter();
  return (
    <div className="bg-slate-200 p-4 rounded-md shadow-xl shadow-slate-200">
      <h2 className="text-2xl font-bold">{workoutProgram.name}</h2>
      <p>{workoutProgram.description}</p>
      <ul>Exercises: {workoutProgram.exercises.length}</ul>
      <section className="flex gap-2">
          {user.Role === "PersonalTrainer" && (
              <Button
                  text={"Add exercise"}
                  onClick={() =>
                      router.push(
                          `/personalTrainer/programs/${workoutProgram.clientId}/${workoutProgram.workoutProgramId}/addExercise`
                      )
                  }
              />
          )}
          <Button
              text={"View program"}
              onClick={() => {
                  if (user.Role === "PersonalTrainer") {
                      router.push(
                          `/personalTrainer/programs/${workoutProgram.clientId}/${workoutProgram.workoutProgramId}/exercises`
                      );
                  }
                  else if (user.Role === "Client") {
                      router.push(
                          `/client/programs/${workoutProgram.workoutProgramId}`
                      );
                  }
              }}
          />
      </section>
    </div>
  );
};

export default Program;
