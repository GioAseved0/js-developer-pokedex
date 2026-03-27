const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;
let pokemonsGlobais = [];

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="abrirModal(${pokemon.number})">
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
        pokemonsGlobais.push(...pokemons)
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function abrirModal(pokemonNumber) {
    const divModal = document.getElementById('modal-pokemon')
    const pokemonClicado = pokemonsGlobais.find((poke) => poke.number === pokemonNumber)
    divModal.innerHTML = `
        <div class="modal-content ${pokemonClicado.type}">
            <span class="close" onclick="fecharModal()">&times;</span>
            <div class="modal-header">
                <h2>${pokemonClicado.name}</h2>
                <span>#${pokemonClicado.number}</span>
            </div>
            <div class="modal-body">
                <img src="${pokemonClicado.photo}" alt="${pokemonClicado.name}">
                <div class="pokemon-info">
                    <p><strong>Tipo:</strong> ${pokemonClicado.types.join(', ')}</p>
                    <p><strong>HP:</strong> ${pokemonClicado.hp}</p>
                    <p><strong>Ataque:</strong> ${pokemonClicado.attack}</p>
                    <p><strong>Defesa:</strong> ${pokemonClicado.defense}</p>
                    <p><strong>Ataque Especial:</strong> ${pokemonClicado.specialAttack}</p>
                    <p><strong>Defesa Especial:</strong> ${pokemonClicado.specialDefense}</p>
                    <p><strong>Velocidade:</strong> ${pokemonClicado.speed}</p>
                </div>
            </div>
        </div>
    `
    divModal.style.display = 'block'
}

function fecharModal() {
    const divModal = document.getElementById('modal-pokemon')
    divModal.style.display = 'none'
}