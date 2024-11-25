export async function POST(email: string, password: string) {
  const res = await fetch(
    "https://swafe24fitness.azurewebsites.net/api/Users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    },
  );

  if (!res.ok) {
    // Handle errors if the response is not successful
    const errorData = await res.json();
    return new Response(JSON.stringify({ error: errorData }), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Parse the response data
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
