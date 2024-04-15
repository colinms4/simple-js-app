// pokemon app
// start of IIFE
let pokemonRepository = (function() {
    let pokemonList = [];
    let pokiApi = 'https://pokeapi.co/api/v2/pokemon?limit=151';

// function to add pokemon to the array
function add(pokemon) {
    pokemonList.push(pokemon);
}

//function to get all pokemon in the array
function getAll() {
    return pokemonList;
}

function showDetails(item) {
    loadDetails(item).then(() => {
        showModal(item);
    });
}

// function to show modal on screen when clicked
function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');
    modalBody.empty();
    modalTitle.empty();
    modalHeader.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");
    let imageElement = $('<img class="modal-img" style="width:50%"></img>')
    imageElement.attr("src", item.imageUrl);
    let heightElement = $("<p>" + "Height: " + item.height + "</p>");

    let typeNames = item.types.map(type => type.type.name).join(", ");
    let typeElement = $("<p>" + "Type: " + typeNames + "</p>");

    modalHeader.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typeElement);
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
    // showModal('Modal Title', 'This is Modal Content');
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
  let listCreate = document.querySelector('.list-group');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  listItem.classList.add('list-group-item');
  button.innerText = pokemon.name;
  button.classList.add('btn-outline-primary');
  button.setAttribute('data-target', '#exampleModal');
  button.setAttribute('data-toggle', 'modal');
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


// Iterate through each Pokemon and display its details
pokemonRepository.loadList().then(function() {
    let allPokemon = pokemonRepository.getAll();
    allPokemon.forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
