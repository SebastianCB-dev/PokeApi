'use strict';
const imgPokemon = document.querySelector('#image-pokemon');
const namePokemon = document.querySelector('#name-pokemon');
const numberExperience = document.querySelector('#number-experience-pokemon');
const infoAtaque = document.querySelector('#info-ataque');
const infoAtaqueEspecial = document.querySelector('#info-ataqueSpecial');
const infoDefensa = document.querySelector('#info-defense');
const hpPokemon = document.querySelector('#hp-pokemon');
const añadirCaracteristicasPokemon = (arr) => {
    imgPokemon.setAttribute('src', arr[6]);
    namePokemon.innerHTML = arr[0];
    numberExperience.innerHTML = arr[2];
    infoAtaque.innerHTML = arr[3] + 'k';
    infoAtaqueEspecial.innerHTML = arr[4] + 'k';
    infoDefensa.innerHTML = arr[5] + 'k';
    hpPokemon.innerHTML = arr[1] + 'hp';
}


const errorNumber = document.querySelector('#error-caracter');
const errorProcess = document.querySelector('#error-process');
const buttonConsultPokemon = document.querySelector('#buttonConsultPokemon');
const buttonRandomPokemon = document.querySelector('#buttonConsultRandom');
const inputNumber = document.querySelector('#numberPokemonConsult');
const divContainerMain = document.querySelector('#container-main');
const titleContainerMain = document.querySelector('#title-main');
const formContainerMain = document.querySelector('#form-main');
const divPokemonSelect = document.querySelector('#pokemon-select');
const showError = (divError) => {
    divError.style.display = 'block';
    setTimeout(()=> {
        divError.style.display = 'none';
    }, 2000);
}
buttonConsultPokemon.addEventListener('click', ()=> {
    if(inputNumber.value <= 0 || inputNumber.value > 898 || inputNumber == '') {
        showError(errorNumber);
    }
    else{ 
        titleContainerMain.style.display = 'none';
        formContainerMain.style.display = 'none';
        divContainerMain.style.backgroundImage = 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)';
        divPokemonSelect.style.display = 'block';
        consultarPokemon(inputNumber.value); 
    }
});
const generarNumberRandom = () => parseInt(Math.random() * (897 - 1) + 1);
buttonRandomPokemon.addEventListener('click', ()=> {
    titleContainerMain.style.display = 'none';
    formContainerMain.style.display = 'none';
    divContainerMain.style.backgroundImage = 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)';
    divPokemonSelect.style.display = 'block';
    consultarPokemon(generarNumberRandom()); 
});
function consultarPokemon (id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => {
            response.json()
            .then((params) => {
                let nombrePokemon,hpPokemon, expPokemon,attack,attackSpecial,defense,img, arrayCaracteristicas;
                nombrePokemon = params.name;
                hpPokemon = params.stats[0].base_stat;
                expPokemon = params.base_experience;
                attack = params.stats[1].base_stat;
                attackSpecial = params.stats[3].base_stat;
                defense = params.stats[2].base_stat;
                img = params.sprites.other.dream_world.front_default;
                arrayCaracteristicas = [nombrePokemon,hpPokemon,expPokemon,attack,attackSpecial,defense, img];
                añadirCaracteristicasPokemon(arrayCaracteristicas);
            })
            .catch((error)=>{
                showError(errorProcess);
            })
        })
        .catch((error)=>{
            showError(errorProcess);
        })
}