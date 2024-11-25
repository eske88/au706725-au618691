export type validAccountTypes = "Manager" | "PersonalTrainer" | "Client";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: validAccountTypes;
  userId: string;
  personalTrainerId: string;
};

export type JWTInfo = {
  GroupId: string;
  Name: string;
  Role: validAccountTypes;
  UserId: string;
  exp: string;
  nbf: string;
};

export type Exercise = {
  description: string;
  exerciseId: number;
  groupId: string;
  name: string;
  personalTrainerId: number;
  repetitions: number;
  sets: number | null;
  time: string;
  workoutProgramId: number;
};

export type WorkoutProgram = {
  clientId: number;
  description: string;
  exercises: Exercise[];
  groupId: string;
  name: string;
  personalTrainerId: number;
  workoutProgramId: number;
};
