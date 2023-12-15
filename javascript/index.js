const nameFilterEl = document.getElementById("name-filter");
const statusFilterEl = document.getElementById("status-filter");
const pagina2El = document.getElementById("pagina-2");

// Aqui los seleccionamos y creamos una variable que sea igual a lo seleccionado




// Aqui abajo le pasamos el parametro pagina 
const apiRick = async (pagina) => {
  let url = "https://rickandmortyapi.com/api/character"

  // Todo esto es una estructura de control un poco desordenada que simplemente hice para que funcione. 
  // obviamente se podria optimizar mas pero bueno.. Simplemente cambia la url segun el parametro pagina que reciba el nombre
  // o el estado.. le dice "si esto es x haces esto, entonces cambia la url"
  if (pagina == "0") {
    url = "https://rickandmortyapi.com/api/character";

  }

  else if (isNaN(nameFilterEl.value)) {
    url += `/?name=${nameFilterEl.value}`;
    if (statusFilterEl.value) {
      url += `&status=${statusFilterEl.value}`;

    
    }

  //  if (pagina2) {
  //     url = `https://rickandmortyapi.com/api/character/?page=${pagina2}&name=${nameFilterEl.value}`;
  //   }  
  //   if (pagina2) {
  //     url = `https://rickandmortyapi.com/api/character/?page=${pagina2}&name=${nameFilterEl.value}&status=${statusFilterEl.value}`;

  //   }  

  }

  else if (statusFilterEl.value) {
    url += `/?status=${statusFilterEl.value}`;

  }

    else if (statusFilterEl.value && isNaN(nameFilterEl.value)) {
      url  += `/?name=${nameFilterEl.value}&?status=${statusFilterEl.value}`;   
    }



  else {
    url = "https://rickandmortyapi.com/api/character/?page=" + pagina;
  }

  // aqui termina la estructura de control o como se llame... jajaja de condicionales.

  fetch(url)
  .then(response => {
    // Verifica si la respuesta es exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return response.json(); // Parsea la respuesta como JSON
  })
  .then(data => {
    // Procesa los datos de la respuesta
    const pagesN = data.info.pages;
   

    divRes = document.querySelector("#resultado")
    divRes.innerHTML = "";
    data.results.map(item => {
    divItem = document.createElement("div")
    divItem.innerHTML =
      `
        <div class="card" style="width: 18rem;">
            <img src="${item.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.status} ${item.species}</p>
                <p class="card-text">${item.gender}</p>  
            </div>
        </div>              

        
      `

    divRes.appendChild(divItem); 
    })
  
  })
  .catch(error => {
    // Maneja los errores en la llamada a la API
    console.error('Error al llamar a la API:', error.message);
    console.log(fetch(url))
    
    if (error){
      divRes.innerHTML = "";
    }
  });

  
 

  

  

}
apiRick(0);


// Aqui tenemos dos eventos para que cuando usemos el buscador modifiquen el nameFilterEl y el statusFilterEl asi con 
// los condiciones podemos modificar la url

nameFilterEl.addEventListener("input", (nameFilterEl) => {
  apiRick(nameFilterEl.value);

})

statusFilterEl.addEventListener('change', (statusFilterEl) => {
  apiRick(statusFilterEl.value);
});

// pagina2El.addEventListener('change', (pagina2El) => {
//   apiRick(pagina2El.value );
// });



// Esto es para seleccionar el select pagina y que cuando le hagamos click borre los otros valores, los de status y tal...
const paginaEl = document.getElementById("pagina");
paginaEl.addEventListener("click", () => {
  nameFilterEl.value = "";
  statusFilterEl.value = "";
  pagina2El.value = "";
});



