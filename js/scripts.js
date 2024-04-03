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

function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
        showModal(pokemon.name, `Height: ${pokemon.height}`, pokemon.imageUrl);
    });
}

// function to show modal on screen when clicked
function showModal(title, text, imageUrl) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = ' ';
    let modal = document.createElement('div');
    modal.classList.add('modal');
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
    let contentElement = document.createElement('p');
    contentElement.innerText = text;
    // Create an image element and set its source to the imageUrl
    let imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add('is-visable');
}

function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visable');
}

window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visable')) {
        hideModal();
    }
});

let modalContainer = document.querySelector('#modal-container');
modalContainer.addEventListener('click',(e)=> {
    let target = e.target;
    if (target === modalContainer) {
        hideModal();
    }
});

document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal Title', 'This is Modal Content');
});

// function to load details from pokemon api
function loadDetails(item) {
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
    loadDetails: loadDetails
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
