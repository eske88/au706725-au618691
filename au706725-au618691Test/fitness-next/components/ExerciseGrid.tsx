import React from "react";
import {Exercise, JWTInfo, WorkoutProgram} from "@/app/Types";
import Button from "@/components/Button";
import {router} from "next/client";

type ExerciseGridProps = {
    exercises: Exercise[];
    user: JWTInfo;
};

const ExerciseGrid = ({exercises, user }: ExerciseGridProps) => {
    return (
        <div className="mb-12">
            <div className="grid grid-cols-5 bg-slate-200 divide-amber-50 divide-x-2 divide-y-2">
                <h1 className="p-3 text-center font-bold">Exercise</h1>
                <p className="p-3 text-center font-bold">Description</p>
                <p className="p-3 text-center font-bold">Sets</p>
                <p className="p-3 text-center font-bold">Repetitions</p>
                <p className="p-3 text-center font-bold">Time</p>
            </div>
            {exercises.map((exercise) => (
                <div
                    key={exercise.exerciseId}
                    className="grid grid-cols-5 bg-slate-200 divide-amber-50 divide-x-2 divide-y-2"
                >
                    <h1 className="p-3">{exercise.name}</h1>
                    <p className="p-3">{exercise.description}</p>
                    <p className="p-3">{exercise.sets}</p>
                    <p className="p-3">{exercise.repetitions}</p>
                    <p className="p-3">{exercise.time}</p>
                </div>
            ))}
        </div>
    );
};

export default ExerciseGrid;
