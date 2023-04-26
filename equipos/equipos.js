
const getEquipos = async (page) => {
    const response = await fetch(`http://localhost:7500/equipos`);  
    const responseJson = await response.json(); 
    await pintarDatos(responseJson);
}

let ol$$ = document.querySelector('.container');
let div$$ = document.createElement('div');
div$$.className = "listado";
ol$$.appendChild(div$$);

const pintarDatos = async (allEquipos) => {
    let myDiv$$ = document.querySelector(".listado");
    myDiv$$.innerHTML = "";
    
    for (const equipos of allEquipos) {
        let divEquipo$$ = document.createElement('div');
        divEquipo$$.className = "div_equipo";
        divEquipo$$.setAttribute('alt', equipos.nombre);
        div$$.appendChild(divEquipo$$);

        let recuadro$$ = document.createElement('div');
        recuadro$$.className = 'recuadro';
        
        let logo$$ = document.createElement('img');
        logo$$.className = 'logo';
        logo$$.setAttribute('src', equipos.foto);

        let club$$ = document.createElement('p');
        club$$.textContent = equipos.nombre;
        club$$.className = "club";
       
        let ciudad$$ = document.createElement('p');
        ciudad$$.textContent = equipos.ciudad;
        ciudad$$.className = "ciudad";
        
        let liga$$ = document.createElement('p');
        liga$$.textContent = equipos.liga;
        liga$$.className = "liga";

        let info$$ = document.createElement("div");
        info$$.className = "info";

        divEquipo$$.appendChild(recuadro$$);
        divEquipo$$.appendChild(logo$$);
        divEquipo$$.appendChild(info$$);
        info$$.appendChild(club$$);
        info$$.appendChild(liga$$);
        info$$.appendChild(ciudad$$);

    }    

}


const form$$ = document.querySelector('.input_type');

form$$.addEventListener('submit', async (event) => {
  event.preventDefault();
 
  let nombre = document.getElementById('Nombre').value;
  let liga = document.getElementById('Liga').value;
  let ciudad = document.getElementById('Ciudad').value;
  let foto = document.getElementById('Logo').value;


  try {
    const response = await fetch('http://localhost:7500/equipos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, liga, ciudad, foto}),
    });


    if (!response.ok) {
      throw new Error('Error al agregar equipo a la base de datos');
    }
    document.getElementById('Nombre').value = '';
    document.getElementById('Liga').value = '';
    document.getElementById('Ciudad').value = '';
    document.getElementById('Logo').value = '';

    getEquipos(1);
  } catch (error) {
    console.error(error);
  }
});



getEquipos(1);

