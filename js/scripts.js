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

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 0.6) {
        document.write("Name: " + pokemonList[i].name + " ( Height: " + pokemonList[i].height + " ) - Wow, that's big! ");
    } else if (pokemonList[i].height <= 0.6) {
        document.write("Name: " + pokemonList[i].name + " ( Height: " + pokemonList[i].height + " ) ");
    }
}

// document.write(pokemonList[i].name + " (Height: " + pokemonList[i].height + ") - Wow, that's big!");