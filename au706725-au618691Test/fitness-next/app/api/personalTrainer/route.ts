import { WorkoutProgram } from "@/app/Types";

export async function GET(token: string) {
  const response = await fetch(
    "https://swafe24fitness.azurewebsites.net/api/Users/Clients",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "text/plain",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  return data;
}

export async function fetchWorkoutPrograms(
  token: string | null,
  userId: string | Array<string>,
) {
  const url =
    "https://swafe24fitness.azurewebsites.net/api/WorkoutPrograms/client/" +
    userId;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "text/plain",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching workout programs:", error);
  }
}

export const fetchWorkoutProgram = async (token: string, programId: string) => {
  const url = `https://swafe24fitness.azurewebsites.net/api/WorkoutPrograms/${programId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "text/plain",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching workout programs:", error);
  }
};
export async function addExerciseToProgram(programId, token, exercise) {
  const url = `https://swafe24fitness.azurewebsites.net/api/Exercises/Program/${programId}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(exercise),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(`Error: ${response.status} - ${errorDetails}`);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Exercise successfully added:", data);
    return data;
  } catch (error) {
    console.error("Error adding exercise to program:", error);
  }
}

export async function createWorkoutProgram(
  token: string | null,
  workoutProgram: WorkoutProgram,
) {
  const url = "https://swafe24fitness.azurewebsites.net/api/WorkoutPrograms";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Replace with your token
      },
      body: JSON.stringify(workoutProgram), // Program data
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(`Error: ${response.status} - ${errorDetails}`);
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Workout program successfully created:", data);
    return data;
  } catch (error) {
    console.error("Error creating workout program:", error);
  }
}
