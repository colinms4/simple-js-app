// pokemon app
// start of IIFE
let pokemonRepository = (function() {
    let pokemonList = [];
    let pokiApi = 'https://pokeapi.co/api/v2/pokemon/';

// function to add pokemon to the array
function add(pokemon) {
    pokemonList.push(pokemon);
}

//function to get all pokemon in the array
function getAll() {
    return pokemonList;
}

// function to show the details of the pokemon object
function showDetails(pokemon) {
    loadDeatils(pokemon);
}

// function to load details from pokemon api
function loadDeatils(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
        return response.json();
    }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function (e) {
        console.error(e);
    });
}

// function to load the names and url of pokemon from the api
function loadList () {
    return fetch(pokiApi).then(function (response) {
        return response.json();
    }).then(function (json) {
        json.results.forEach(function (item) {
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            add(pokemon);
        });
    }).catch(function(e) {
        console.error(e);
    })
}

// function to select and add buttons for the list of pokemon and display their details
function addListItem(pokemon) {
  let listCreate = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('button-class');
  listItem.appendChild(button);
  listCreate.appendChild(listItem);
  button.addEventListener('click', function() {
    showDetails(pokemon);
  });
}

return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDeatils: loadDeatils
};
})();

// adding a pokemon to the array
console.log(pokemonRepository.getAll());
pokemonRepository.add({name: 'Pikachu', height: 0.2, type: ['Electric'] });
console.log(pokemonRepository.getAll());


// Get the list of Pokemon
let allPokemon = pokemonRepository.getAll();

// Iterate through each Pokemon and display its details
pokemonRepository.loadList().then(function() {
    allPokemon.forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
