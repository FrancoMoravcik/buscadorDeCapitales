const seccionBuscador = document.getElementById("seccionBuscador")

const formBuscador = document.getElementById("formBuscador")

const carrusel = document.getElementById("carrusel")

const paisesJson = "paises.json"
let paisesFetch

fetch(paisesJson)
.then(respuesta => respuesta.json())
.then(datos => {
   datos.forEach(element => {
    paisesFetch = datos.slice(0)
   const divCarrusel = document.createElement("div")
   divCarrusel.innerHTML = `
   <button id="btnPaisEnArray${element.id}" class="carousel-item btnPais">

     <img src="${element.img}" class="d-block w-100 imgBtnPais" alt="...">
  
   </button>
   `
   
   carrusel.appendChild(divCarrusel)
 
  const btn = document.getElementById(`btnPaisEnArray${element.id}`)
btn.addEventListener("click", () => {
  paisEnArray(element.id)
})
  })
})

const arrayPaises = []

const paisEnArray = (id) => {
  const pais = paisesFetch.find(e => e.id == id)
  arrayPaises.push(pais)
  mostrarPais()
}

const contenedorPais = document.getElementById("contenedorPais")

function mostrarPais () {
    arrayPaises.forEach(pais => {
    contenedorPais.innerHTML = ""
    const divInfoDePais = document.createElement("div")
    divInfoDePais.className = "divInfoDePais"
    divInfoDePais.innerHTML = `
    <div class="div1Info" id="div1Info">
    <div class="divImgInfo">
    <img src="${pais.img}" class="imgBtnPais m-4" alt="...">
    </div>  
  <h2 class="text-center mt-5 h2">${pais.pais}</h2>
    <h4 class="h4Info">${pais.capital}</h4>
    </div>
    <div class="div2Info">
    <h5 class="p-1">Continente: <span class="spanInfo"> ${pais.continente}</span></h5>
    <h5 class="p-1">Moneda: <span class="spanInfo"> ${pais.moneda}</span></h5>
    <h5 class="p-1">Idioma/s: <span class="spanInfo"> ${pais.idiomaOficial}</span></h5>
    <h5 class="p-1">Pais/es Limitrofe/s: <span class="spanInfo"> ${pais.paisesLimitrofes}</span></h5>
    <h5 class="p-1">Poblacion: <span class="spanInfo spanInfoNumero"> ${pais.poblacion}</span></h5>
    <h5 class="p-1">Superficie: <span class="spanInfo spanInfoNumero"> ${pais.superficie}</span></h5>
    </div>
`

contenedorPais.appendChild(divInfoDePais)
  })
}

const divCarruselActive = document.getElementById("divCarruselActive")

const numeroPais = (Math.round(Math.random() * 197 + 1));

fetch(paisesJson)
 .then(respuesta => respuesta.json())
 .then(datos => {
let arrayPaisImgActive = datos.filter(datos => datos.id === numeroPais)
 arrayPaisImgActive.forEach(element => {
    const divImgActive = document.createElement("div")
    divImgActive.innerHTML = `
    <button id="btnPaisEnArray${element.id}" class="btnPais">
     <img src="${element.img}" class="d-block w-100 imgActive" alt="...">
     </button>
`

divCarruselActive.appendChild(divImgActive)

const btn = document.getElementById(`btnPaisEnArray${element.id}`)
btn.addEventListener("click", () => {
  paisEnArray(element.id)
})
})
})

// Paises

function agregarAcentos (palabra, paises){
 let palabraSinAcentos = removerAcentos(palabra.toLowerCase())

  for(let i = 0; i < paises.length ; i++) {
    const pais = paises[i]
    const paisNombreSinAcentos = removerAcentos(pais.pais.toLowerCase())

    if(paisNombreSinAcentos === palabraSinAcentos){
     return pais.pais
    }
  }
}

// Funcion para agregar acentos a paises

function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

   fetch("paises.json")
   .then(response => response.json())
   .then(datos => {
     const paises = datos;
     
    formBuscador.addEventListener("submit", (e) => {
  e.preventDefault()
  const buscador = document.getElementById("buscador").value

  const palabraPaisConAcento = agregarAcentos(buscador, paises)

  const paisBuscado = paisesFetch.find(e => e.pais == palabraPaisConAcento) 
if(paisBuscado == undefined){
  arrayPaises.pop(paisBuscado)
}else {
  arrayPaises.push(paisBuscado)
  mostrarPais()
}

    })
})
.catch(error => console.log(error))

// Capitales


// Funcion para agregar acentos a capitales


function agregarAcentosCapitales (palabra, paises){
  let palabraSinAcentos = removerAcentos(palabra.toLowerCase())
 
   for(let i = 0; i < paises.length ; i++) {
     const pais = paises[i]
     const paisNombreSinAcentos = removerAcentos(pais.capital.toLowerCase())
 
     if(paisNombreSinAcentos === palabraSinAcentos){
      return pais.capital
     }
  }

 }
 function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
 
 fetch("paises.json")
 .then(response => response.json())
 .then(datos => {
   const paises = datos;
   
  formBuscador.addEventListener("submit", (e) => {
e.preventDefault()
const buscador = document.getElementById("buscador").value

const palabraPaisConAcento = agregarAcentosCapitales(buscador, paises)

const paisBuscado = paisesFetch.find(e => e.capital == palabraPaisConAcento) 
if(paisBuscado == undefined){
arrayPaises.pop(paisBuscado)
}else {
arrayPaises.push(paisBuscado)
mostrarPais()
}

  })
})
.catch(error => console.log(error))
