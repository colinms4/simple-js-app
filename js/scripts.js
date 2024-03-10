// pokemon app
// start of IIFE
let pokemonRepository = (function() {
    let pokemonList = [
    {
        name: 'Charmander',
        height: 0.6,
        type: ['Fire', 'Solar-Power']
    },

    {
        name: 'Bulbasaur',
        height: 0.7,
        type: ['Monster', 'Grass']
    },

    {
        name: 'Squirtle',
        height: 0.5,
        type: ['Monster','Water']
    }
];

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
    console.log(pokemon);
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
    addListItem: addListItem
};
})();

// adding a pokemon to the array
console.log(pokemonRepository.getAll());
pokemonRepository.add({name: 'Pikachu', height: 0.2, type: ['Electric'] });
console.log(pokemonRepository.getAll());


// Get the list of Pokemon
let allPokemon = pokemonRepository.getAll();

// Iterate through each Pokemon and display its details
allPokemon.forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

