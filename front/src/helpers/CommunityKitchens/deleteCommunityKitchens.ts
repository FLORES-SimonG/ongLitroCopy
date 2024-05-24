export async function deleteCommunityKitchens(id:any): Promise<any> {
    fetch(`https://litro-ong.onrender.com/communityKitchens/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar la merenderos');
          }
          console.log('Merenderos eliminada con éxito');

        })
        .catch(error => {
          console.error('Error al eliminar la merenderos:', error);

        });
  } 