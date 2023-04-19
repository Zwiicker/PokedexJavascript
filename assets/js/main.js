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

function goHome() {
  window.location.href = "index.html";
}
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
     fetch(pokemon.species.url)
      .then((response) => response.json())
      .then((species) => {
        fetch(species.evolution_chain.url)
          .then((response) => response.json())
           {
            const typeList = pokemon.types.map((t) => t.type.name).join(", ");
            const statList = `
              <ul>
                <li>HP: ${pokemon.stats[0].base_stat}</li>
                <li>Attack: ${pokemon.stats[1].base_stat}</li>
                <li>Defense: ${pokemon.stats[2].base_stat}</li>
                <li>Special Attack: ${pokemon.stats[3].base_stat}</li>
                <li>Special Defense: ${pokemon.stats[4].base_stat}</li>
                <li>Speed: ${pokemon.stats[5].base_stat}</li>
              </ul>
            `;
            const pokemonListHTML = `
              <div>
                <img src="${pokemon.sprites.front_default}" />
                <p>Height: ${pokemon.height}m</p>
                <p>Weight: ${pokemon.weight}kg</p>
                <p>Type(s): ${typeList}</p>
                <p>Abilities: ${pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
                <p>Base Stats:</p>
                ${statList}
                <button onclick="goHome()">Go Home</button>
              </div>
            `;
            pokemonList.innerHTML = pokemonListHTML;
          };
      })}
    
  

