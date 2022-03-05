const endpoint = "https://pokeapi.co/api/v2/pokemon/";
let pokemonContainer = document.querySelector(".pokemon-container");
// ======================================================== Lấy database từ API

async function renderPokemon() {

    for (let id = 1; id < 1000; id++) {
        const response = await fetch(`${endpoint}${id}`);
        const data = await response.json();
        console.log(data.types[0].type.name);
        let newName = data.name[0].toUpperCase() + data.name.slice(1);
        let newId;
        if (id < 10) newId = "00" + id;
        else if (id >= 10 && id < 100) newId = "0" + id;
        else newId = id;
        let template = `<div class="pokemon-card">
            <div class="pokemon-image">
            <img src="https://img.pokemondb.net/artwork/large/${data.name}.jpg" alt="">
            <div class="circle-top"></div>
            <div class="circle-bottom"></div>
            <div class="circle-center"></div>
            </div>
            <div class="pokemon-details">
            <div class="circle"></div>
            <h2>${newId}</h2>
            <h1 class="pokemon-name">${newName}</h1>
            <div class="pokemon-type" data-num="${id}">
            </div>
            </div>
            </div>`;

        pokemonContainer.insertAdjacentHTML("beforeend", template);
        document.querySelectorAll(".pokemon-type").forEach(item => {
            if (item.dataset.num == id) {
                data.types.forEach(it => {
                    let newType = it.type.name[0].toUpperCase() + it.type.name.slice(1);
                    let typeButton = `<div class="btn"> <span>${newType}</span></div>`;
                    item.insertAdjacentHTML("beforeend", typeButton);
                })
            }
        })
    }
}

renderPokemon();