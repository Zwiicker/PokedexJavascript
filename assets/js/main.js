const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const searchInput = document.getElementById("searchInput");


const maxRecords = 151
const limit = 151
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

/*loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})*/

// Detalhes

async function search() {
    const pokemonName = searchInput.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    try {
      const response = await fetch(url);
      const pokemon = await response.json();
      displayPokemon(pokemon);
    } catch (error) {
      console.log(error);
      alert("Pokemon not found");
    }
  }

  function displayPokemon(pokemon) {
    const pokemonListHTML = `
      <div>
        <img src="${pokemon.sprites.front_default}" />
        <h2>${pokemon.name}</h2>
        <p>Height: ${pokemon.height}m</p>
        <p>Weight: ${pokemon.weight}kg</p>
        <p>Abilities: ${pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
      </div>
    `;
    pokemonList.innerHTML = pokemonListHTML;
  }

  //click
  