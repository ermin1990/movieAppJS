let filmoviDiv=document.querySelector('.filmovi');
let listaDodanih = [];
let sviFilmovi;

let odgledaniFilmovi = document.querySelector('.odgledaniFilmovi');
let sumaCijena = document.querySelector('.price');

async function ucitajFilmove() {

    const response = await fetch('movie.json');
    const filmovi = await response.json();
    sviFilmovi = filmovi;
    console.log(filmovi); 

    filmovi.forEach(function(film){

        let index = filmovi.indexOf(film);

        let filmoviHtml = `
        
        <div class="filmCard">

                <div class="filmImg"></div>
                <div class="filmTitle">${film.title}</div>
                <p class="filmPrice">Price: <span class="price">${film.price}</span> $</p>
                <div class="ocjeneFilma">Ocjene: ***</div>
                <button onclick="gledajFilm(this)" value="${index}">Gledaj film</button>

            </div>
        
        `
        filmoviDiv.innerHTML += filmoviHtml;    
        

        

    });
    
  }

function gledajFilm(el){

    let sumPrice = 0;

    let mainEl = el.closest('.filmCard');
    mainEl.style.opacity = '0.4';
    
    let idFilma = mainEl.querySelector('button').value;
    console.log(idFilma);
    let btnFilma = mainEl.querySelector('button');

    btnFilma.setAttribute('disabled', true);
    btnFilma.style.backgroundColor = 'silver';
    btnFilma.innerText = "Odgledano";

    let listaDodanihHTML = ``;
    
    listaDodanih.push(sviFilmovi[idFilma]);
    listaDodanih.forEach(function(dodaniFilm){
        listaDodanihHTML = `
                <div class="odgledaniFilm">
                <p class="imeFilma">${dodaniFilm.title}</p>
                <p class="cijenaFilma">${dodaniFilm.price}$</p>
                </div>
        `;

        sumPrice += dodaniFilm.price;
        
    });

    
    sumaCijena.innerText = sumPrice +'$';
    odgledaniFilmovi.innerHTML += listaDodanihHTML;
}



window.addEventListener("load", ucitajFilmove);