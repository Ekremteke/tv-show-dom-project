//You can edit ALL of the code here
let body = document.querySelector("body");
let allEpisodes = getAllEpisodes();
const searchInput = document.querySelector("input");
let result = document.getElementById("result");
console.log(searchInput);
let select = document.getElementById("select");
let episodesMain = document.getElementById("episodes-main");

body.appendChild(episodesMain);

episodesMain.style.cssText =
  "background-color:silver; display:flex ; width:100% ; height: 100%; flex-wrap: wrap; padding: auto; justify-content:space-around";

function forEpisodeNumber(x) {
  return x > 9 ? x : "0" + x;
}

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  allEpisodes.map((episode) => {
    let divOfEpisodes = document.createElement("div");
    divOfEpisodes.className = "cards";
    episodesMain.appendChild(divOfEpisodes);

    let titleButOfEpisode = document.createElement("button");
    divOfEpisodes.appendChild(titleButOfEpisode);

    let tagName = document.createElement("a");
    divOfEpisodes.appendChild(tagName);
    let imgOfEpisode = document.createElement("img");
    divOfEpisodes.appendChild(imgOfEpisode);
    let paragraphOfEpisode = document.createElement("article");
    divOfEpisodes.appendChild(paragraphOfEpisode);
    divOfEpisodes.style.cssText =
      "background-color:white ; width:350px ; height: 600px; margin:8px;border-radius: 3%;";
    paragraphOfEpisode.style.cssText = "margin:20px; font-size:18px";
    titleButOfEpisode.style.cssText =
      "width:350px ; margin-top: 0px;  height: 80px ;border-radius: 3% ; font-weight: bold; font-size:20px";
    imgOfEpisode.style.cssText =
      "width:280px ; height: 150px; margin: 30px 35px Auto 35px";
    imgOfEpisode.setAttribute("src", episode.image.medium);
    let number = `S${forEpisodeNumber(episode.season)}E${forEpisodeNumber(
      episode.number
    )}`;
    divOfEpisodes.id = number;
    titleButOfEpisode.appendChild(tagName);
    let episodeName = `${episode.name} `;
    let title = (tagName.innerText = `${episodeName} - ${number}`);
    paragraphOfEpisode.innerHTML = `${episode.summary}`;
    let options = document.createElement("option");

    select.appendChild(options);

    options.setAttribute("value", `${number}`);

    let hrefName = document.createElement("a");

    options.appendChild(hrefName);

    hrefName.setAttribute("href", `#${number}`);

    hrefName.innerHTML = `${number} - ${episodeName}`;
    tagName.id = number;
    tagName.setAttribute("name", number);
  });
}

const selectElement = document.querySelector("#select");
// selectElement.addEventListener("change", (event) => {
//   console.log(event.target.value);

//   const cards = document.querySelectorAll(".cards");
//   for (let card of cards) {
//     if (card.id !== event.target.value) {
//       card.style.cssText = "display : none";
//     } else if (event.target.value == 1) {
//       card.style.cssText = "display : flex";
//     }
//   }
// });

let episodesMainNew2 = document.getElementById("episodes-filter");
body.appendChild(episodesMainNew2);
episodesMainNew2.style.cssText =
  "background-color:silver; display:flex ; width:100% ; height: 100%; flex-wrap: wrap; padding: auto; justify-content:space-around";

selectElement.addEventListener("change", (event) => {
  const value = event.target.value;
  console.log(value);
  allEpisodes.forEach((episode) => {
    if (episode.id == event.target.value) {
      makePageForEpisodes([episode]);
    }
  });
});

let episodesMainNew = document.getElementById("episodes-filter");
body.appendChild(episodesMainNew);
episodesMainNew.style.cssText =
  "background-color:silver; display:flex ; width:100% ; height: 100%; flex-wrap: wrap; padding: auto; justify-content:space-around";

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  console.log(value);
  episodesMain.style.cssText = "display:none";

  let filterOne = allEpisodes.filter((a) => {
    return (
      a.name.toLowerCase().includes(value) ||
      a.summary.toLowerCase().includes(value)
    );
  });

  console.log(filterOne);
  result.innerHTML =
    "Displaying " + filterOne.length + " / " + allEpisodes.length + " episodes";
  episodesMainNew.innerHTML = "";
  for (
    let filterEpisode = 0;
    filterEpisode < filterOne.length;
    filterEpisode++
  ) {
    let divOfEpisodesNew = document.createElement("div");
    episodesMainNew.appendChild(divOfEpisodesNew);
    let titleButOfEpisode2 = document.createElement("button");
    divOfEpisodesNew.appendChild(titleButOfEpisode2);
    let imgOfEpisode2 = document.createElement("img");
    divOfEpisodesNew.appendChild(imgOfEpisode2);
    let paragraphOfEpisode2 = document.createElement("article");
    divOfEpisodesNew.appendChild(paragraphOfEpisode2);
    divOfEpisodesNew.style.cssText =
      "background-color:white ; width:350px ; height: 600px; margin:8px;border-radius: 3%;";
    paragraphOfEpisode2.style.cssText = "margin:20px; font-size:18px";
    titleButOfEpisode2.style.cssText =
      "width:350px ; margin-top: 0px;  height: 80px ;border-radius: 3% ; font-weight: bold; font-size:20px";
    imgOfEpisode2.style.cssText =
      "width:280px ; height: 150px; margin: 30px 35px Auto 35px";
    imgOfEpisode2.setAttribute("src", filterOne[filterEpisode].image.medium);
    titleButOfEpisode2.innerText = `${
      filterOne[filterEpisode].name
    } - S${forEpisodeNumber(
      filterOne[filterEpisode].season
    )}E${forEpisodeNumber(filterOne[filterEpisode].number)}`;
    paragraphOfEpisode2.innerHTML = `${filterOne[filterEpisode].summary}`;
  }
});

window.onload = setup;
let footer = document.createElement("footer");
body.appendChild(footer);
footer.innerHTML =
  "<p> The data has (originally) came from <a href='https://www.tvmaze.com/api#licensing'> TVMaze.com</a>See <a href='https://www.tvmaze.com/api#licensing'> tvmaze.com/api#licensing</a>.</p>";
