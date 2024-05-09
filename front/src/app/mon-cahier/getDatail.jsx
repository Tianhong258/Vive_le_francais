export async function getDetail(id){
    try{
      let response = await fetch(`http://localhost:3001/api/${id}`);
      let data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
        console.error("Erreur lors de la récupération de les détaols du vocabulaire :", error);
    }
  }