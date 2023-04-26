
const getJugadores = async (page) => {
    const response = await fetch(`https://jugadores-back.vercel.app/jugadores?page=${page}&limit=10`);  
    const responseJson = await response.json(); 
    await pintarDatos(responseJson);
}


let cont$$ = document.querySelector('.container');
let div$$ = document.createElement('div');
div$$.className = "listado";
cont$$.appendChild(div$$);

const pintarDatos = async ({results, info}) => {
    let myDiv$$ = document.querySelector(".listado");
    myDiv$$.innerHTML = "";
    for (const player of results) {
        let divPlayer$$ = document.createElement('div');
        divPlayer$$.className = "div_jugador";
        divPlayer$$.setAttribute('filter', player.nombre);
        
        let recuadro$$ = document.createElement('div');
        recuadro$$.className = 'recuadro';

        let imagen$$ = document.createElement('img');
        imagen$$.className = 'logo';
        imagen$$.setAttribute('src', player.foto);
        
        let h4$$ = document.createElement('h4');
        h4$$.textContent = player.nombre;

        let h5$$ = document.createElement('p');
        h5$$.className = "edad";
        h5$$.textContent = "Edad: " + player.edad;

        let h6$$ = document.createElement('p');
        h6$$.className = "posicion";
        h6$$.textContent = "Posicion: " + player.posicion;

        let h7$$ = document.createElement('p');
        h7$$.className = "pierna";
        h7$$.textContent = "Pierna: " + player.pierna;
        
        let info$$ = document.createElement("div");
        info$$.className = "info";
        
        div$$.appendChild(divPlayer$$);
        divPlayer$$.appendChild(h4$$);
        divPlayer$$.appendChild(recuadro$$);
        recuadro$$.appendChild(imagen$$);
        divPlayer$$.appendChild(info$$);
        info$$.appendChild(h5$$);
        info$$.appendChild(h6$$);
        info$$.appendChild(h7$$);
    }


    if(info.page > 1){
        let buttonMenos$$ = document.createElement('button');
        buttonMenos$$.textContent = "Anterior";
        buttonMenos$$.className = 'botonmenos';
        buttonMenos$$.addEventListener('click', () => getJugadores(info.page - 1));
        myDiv$$.appendChild(buttonMenos$$);
    }

    if(info.page < info.totalPages){
        let buttonMas$$ = document.createElement('button');
        buttonMas$$.textContent = "Siguiente";
        buttonMas$$.className = 'botonmas';
        buttonMas$$.addEventListener('click', () => getJugadores(info.page + 1));
        myDiv$$.appendChild(buttonMas$$);
    }
}



const form$$ = document.querySelector('.input_type');

form$$.addEventListener('submit', async (event) => {
  event.preventDefault();
 
  let nombre = document.getElementById('Nombre').value;
  let edad = document.getElementById('Edad').value;
  let posicion = document.getElementById('Posicion').value;
  let pierna = document.getElementById('Pierna').value;
  let foto = document.getElementById('Foto').value;


  try {
    const response = await fetch('https://jugadores-back.vercel.app/jugadores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, edad, posicion, pierna, foto}),
    });


    if (!response.ok) {
      throw new Error('Error al agregar jugador a la base de datos');
    }
    
    document.getElementById('Nombre').value = '';
    document.getElementById('Edad').value = '';
    document.getElementById('Posicion').value = '';
    document.getElementById('Pierna').value = '';
    document.getElementById('Foto').value = '';

    getJugadores(1);
  } catch (error) {
    console.error(error);
  }
});

getJugadores(1);