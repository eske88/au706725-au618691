export async function POST(
  token: string | null,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  accountType: string,
  personalTrainerId?: number,
) {
  const response = await fetch(
    "https://swafe24fitness.azurewebsites.net/api/Users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "text/plain",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        accountType,
        personalTrainerId,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  return data;
}
