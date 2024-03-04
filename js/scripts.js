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

return {
    add:add,
    getAll:getAll
};
})();

// Get the list of Pokemon
let allPokemon = pokemonRepository.getAll();

// Iterate through each Pokemon and display its details
allPokemon.forEach(function(pokemon) {
  document.write(`<p>Name: ${pokemon.name}, Height: ${pokemon.height}, Type: ${pokemon.type.join(', ')}</p>`);
});

// adding a pokemon to the array
console.log(pokemonRepository.getAll());
pokemonRepository.add({name: 'Pikachu', height: 0.2, type: ['Electric'] });
console.log(pokemonRepository.getAll());
