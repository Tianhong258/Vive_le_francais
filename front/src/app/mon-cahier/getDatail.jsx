export async function getDetail(id) {
  try {
    const response = await fetch(`http://localhost:3001/api/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("La requête a échoué.");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du vocabulaire :", error);
    throw error;
  }
}
