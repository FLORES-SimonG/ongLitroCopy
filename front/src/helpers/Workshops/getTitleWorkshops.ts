export async function getWorkshopsByTitle(title: string): Promise<any> {
    try {
      const response = await fetch(`https://litro-ong.onrender.com/workshop/${title}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(`Error al buscar el taller con el título: ${title}`, error);
    }
  }