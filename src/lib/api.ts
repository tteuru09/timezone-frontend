export async function fetchTzs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/timezone`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des timezones");
  }

  return res.json();
}
