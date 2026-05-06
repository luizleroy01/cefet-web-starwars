// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.info/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

import { play } from "./music.js";
import { restartAnimation } from "./restart-animation.js";

const ul = document.querySelector("#filmes ul");
const intro = document.querySelector(".introducao");

const romanos = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
};
function toRoman(num) {
  if (num <= 0 || num >= 10) {
    return "Número fora do intervalo (1-9)";
  }
  return romanos[num];
}

const API_ENDPOINT = "https://swapi.info/api";

let filmes = [];

play(
  {
    audioUrl: "audio/tema-sw.mp3",
    coverImageUrl: "imgs/logo.svg",
    title: "Intro",
    artist: "John Williams",
  },
  document.body,
);

async function carregarFilmes() {
  filmes = await fetchAndStoreData();

  filmes.sort((a, b) => a.episode_id - b.episode_id);

  preencherLista();
}

function preencherLista() {
  ul.innerHTML = "";

  filmes.forEach((filme) => {
    const li = document.createElement("li");

    const romano = toRoman(filme.episode_id);

    li.textContent = `Episode ${romano.padEnd(4, " ")} - ${filme.title}`;

    li.addEventListener("click", () => {
      mostrarIntro(filme);
    });

    ul.appendChild(li);
  });
}

function mostrarIntro(filme) {
  const romano = toRoman(filme.episode_id);

  intro.textContent = `Episode ${romano}
${filme.title}

${filme.opening_crawl}`;

  restartAnimation(intro);
}

export async function fetchAndStoreData() {
  const cache = localStorage.getItem("starWarsFilms");

  if (cache) {
    return JSON.parse(cache);
  }

  const resposta = await fetch(API_ENDPOINT + "/films/");
  const data = await resposta.json();

  localStorage.setItem("starWarsFilms", JSON.stringify(data));

  return data;
}

carregarFilmes();
