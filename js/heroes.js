const listaHeroes = document.getElementById('lista-heroes');
let heroes = [];

//#region con XMLHttpRequest();
// const httpRequest = new XMLHttpRequest();
// httpRequest.addEventListener("load", getHeroes);
// httpRequest.open(
//   "GET",
//   `https://www.dota2.com/datafeed/herolist?language=spanish`
// );
// httpRequest.send();

// function getHeroes() {
//   if (httpRequest.readyState === 4 && httpRequest.status === 200) {
//     let respuesta = JSON.parse(this.responseText);
//     heroes = respuesta.result.data.heroes;
//     injectarListadoHeroes();
//   }
// }+
//#endregion

getHeroes();

//#region con metodo fetch
function getHeroes() {
  if (!listaHeroes) return;
  fetch(`https://www.dota2.com/datafeed/herolist?language=spanish`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      heroes = respuesta.result.data.heroes;
      injectarListadoHeroes();
    });
}
//#endregion

function injectarListadoHeroes() {
  for (let i = 0; i < heroes.length; i++) {
    heroes[i].name = heroes[i].name.replace('npc_dota_hero_', '');
    listaHeroes.insertAdjacentHTML('beforeend', crearPlantillaHeroe(heroes[i]));
  }
}

let crearPlantillaHeroe = (heroe) => {
  return `
  <div class="card-heroe">
    <img
      src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroe.name}.png"
      alt="${heroe.name}"
      onerror="this.onerror=null; this.src='./img/no-img.png'" />
    <div class="nombre-heroe">
      <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/${
        heroe.primary_attr === 0
          ? 'hero_strength.png'
          : heroe.primary_attr === 1
          ? 'hero_agility.png'
          : 'hero_intelligence.png'
      }" />
      <div>${heroe.name_loc.replace('_', ' ').toUpperCase()}</div>
    </div>
  </div>
  `;
};
