export async function GET(token: string) {
  const response = await fetch(
    "https://swafe24fitness.azurewebsites.net/api/Users",
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
