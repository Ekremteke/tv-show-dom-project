// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
// }
// window.onload = setup;
// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }
let url = ["https://api.tvmaze.com/shows/82/episodes"];
let alShows = getAllShows();
console.log(alShows);
function forEpisodeNumber(x) {
  return x > 9 ? x : "0" + x;
}
let container = document.getElementById("main-container");
function setUp(array) {
  array.forEach((x) => {
    container.style.cssText = "display:flex";
    let cards = document.createElement("div");

    container.appendChild(cards);
    cards.style.cssText =
      "background-color:white ; width:350px ; height: 600px; margin:8px;border-radius: 3%";

    let buttonForCard = document.createElement("button");
    let imageForCard = document.createElement("img");
    let paragraphForCard = document.createElement("p");
    buttonForCard.setAttribute("class", "buttonForCard");

    cards.setAttribute("class", "card");
    cards.appendChild(buttonForCard);
    cards.appendChild(imageForCard);
    cards.appendChild(paragraphForCard);
    let tagName = document.createElement("a");
    if (array.length < 300) {
      let number = `S${forEpisodeNumber(x.season)}E${forEpisodeNumber(
        x.number
      )}`;
      x.id = number;
      buttonForCard.appendChild(tagName);
      let episodeName = `${x.name} `;
      let title = (tagName.innerText = `${episodeName} - ${number}`);
      tagName.innerHTML = title;
    } else if (array.length > 300) {
      tagName.innerText = x.name;
    }
    paragraphForCard.style.cssText = "margin:20px; font-size:18px";
    buttonForCard.style.cssText =
      "width:350px ; margin-top: 0px;  height: 80px ;border-radius: 3% ; font-weight: bold; font-size:20px";
    imageForCard.style.cssText =
      "width:280px ; height: 150px; margin: 30px 35px Auto 35px";
    paragraphForCard.innerHTML = `${x.summary}`;

    if (x.image != null) {
      imageForCard.setAttribute("src", x.image.medium);
    }

    buttonForCard.appendChild(tagName);
    let buttonForShow = document.querySelectorAll(".buttonForCard");
    for (let j = 0; j < buttonForShow.length; j++) {
      buttonForShow[j].addEventListener("click", () => {
        url = `https://api.tvmaze.com/shows/${alShows[j].id}/episodes`;
        console.log(url);
      });
    }
  });
}

let showsSelect = document.getElementById("shows");

for (let i = 0; i < alShows.length; i++) {
  let showOptions = document.createElement("option");
  showsSelect.appendChild(showOptions);
  showOptions.setAttribute(
    "value",
    `https://api.tvmaze.com/shows/${alShows[i].id}/episodes`
  );
  showOptions.setAttribute("class", "option-show");
  showOptions.innerText = alShows[i].name;
}
let optionsOfShows = document.querySelectorAll(".option-show");

showsSelect.addEventListener("change", () => {
  container.style.cssText = "display:none";
  if (showsSelect.value == 0) {
    container.style.cssText = "display:none";
    return setUp(alShows);
  } else {
    container.style.cssText = "display:none";
    url.shift();
    url.push(showsSelect.value);

    console.log(url);
  }
  fetch(url[0])
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((result) => {
      console.log(result);
      container.style.cssText = "display:none";
      setUp(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//     function makePageForEpisodes(episodeList) {
//       const rootElem = document.getElementById("root");
//       rootElem.textContent = `Got ${episodeList.length} episode(s)`;
//     }
//     data.map((episode) => {
//       let divOfEpisodes = document.createElement("div");
//       divOfEpisodes.className = "cards";
//       episodesMain.appendChild(divOfEpisodes);

//       let titleButOfEpisode = document.createElement("button");
//       divOfEpisodes.appendChild(titleButOfEpisode);

//       let tagName = document.createElement("a");
//       divOfEpisodes.appendChild(tagName);
//       let imgOfEpisode = document.createElement("img");
//       divOfEpisodes.appendChild(imgOfEpisode);
//       let paragraphOfEpisode = document.createElement("article");
//       divOfEpisodes.appendChild(paragraphOfEpisode);
//       divOfEpisodes.style.cssText =
//         "background-color:white ; width:350px ; height: 600px; margin:8px;border-radius: 3%";
//       paragraphOfEpisode.style.cssText = "margin:20px; font-size:18px";
//       titleButOfEpisode.style.cssText =
//         "width:350px ; margin-top: 0px;  height: 80px ;border-radius: 3% ; font-weight: bold; font-size:20px";
//       imgOfEpisode.style.cssText =
//         "width:280px ; height: 150px; margin: 30px 35px Auto 35px";
//       imgOfEpisode.setAttribute("src", episode.image.medium);
//       let number = `S${forEpisodeNumber(episode.season)}E${forEpisodeNumber(
//         episode.number
//       )}`;
//
//       let options = document.createElement("option");

//       select.appendChild(options);

//       options.setAttribute("value", `${episodeName}`);

//       let hrefName = document.createElement("a");

//       options.appendChild(hrefName);

//       hrefName.setAttribute("href", `#${number}`);

//       hrefName.innerHTML = `${number} - ${episodeName}`;
//       tagName.id = number;
//       tagName.setAttribute("name", number);
//     });

//     const selectElement = document.querySelector("#select");

//     let episodesMainNew2 = document.getElementById("episodes-filter");
//     body.appendChild(episodesMainNew2);
//     episodesMainNew2.style.cssText =
//       "background-color:silver; display:flex ; width:100% ; height: 100%; flex-wrap: wrap; padding: auto; justify-content:space-around";
//     const cards = document.querySelectorAll(".cards");
//     selectElement.addEventListener("change", (event) => {
//       const value = event.target.value;
//       console.log(value);
//       episodesMain.style.cssText = "display:none";

//       let filterTwo = data.filter((i) => {
//         if (value == 1) {
//           return i;
//         } else {
//           return i.name.trim() === value.trim();
//         }
//       });
//       console.log(filterTwo);
//       for (
//         let filterEpisode2 = 0;
//         filterEpisode2 < filterTwo.length;
//         filterEpisode2++
//       ) {
//         let divOfEpisodesNew2 = document.createElement("div");
//         episodesMainNew2.appendChild(divOfEpisodesNew2);
//         let titleButOfEpisode3 = document.createElement("button");
//         divOfEpisodesNew2.appendChild(titleButOfEpisode3);
//         let imgOfEpisode3 = document.createElement("img");
//         divOfEpisodesNew2.appendChild(imgOfEpisode3);
//         let paragraphOfEpisode3 = document.createElement("article");
//         divOfEpisodesNew2.appendChild(paragraphOfEpisode3);
//         divOfEpisodesNew2.style.cssText =
//           "background-color:white ; width:350px ; height: 600px; margin:8px;border-radius: 3%;";
//         paragraphOfEpisode3.style.cssText = "margin:20px; font-size:18px";
//         titleButOfEpisode3.style.cssText =
//           "width:350px ; margin-top: 0px;  height: 80px ;border-radius: 3% ; font-weight: bold; font-size:20px";
//         imgOfEpisode3.style.cssText =
//           "width:280px ; height: 150px; margin: 30px 35px Auto 35px";
//         imgOfEpisode3.setAttribute(
//           "src",
//           filterTwo[filterEpisode2].image.medium
//         );
//         titleButOfEpisode3.innerText = `${
//           filterTwo[filterEpisode2].name
//         } - S${forEpisodeNumber(
//           filterTwo[filterEpisode2].season
//         )}E${forEpisodeNumber(filterTwo[filterEpisode2].number)}`;
//         paragraphOfEpisode3.innerHTML = `${filterTwo[filterEpisode2].summary}`;
//       }
//     });

//     let episodesMainNew = document.getElementById("episodes-filter");
//     body.appendChild(episodesMainNew);
//     episodesMainNew.style.cssText =
//       "background-color:silver; display:flex ; width:100% ; height: 100%; flex-wrap: wrap; padding: auto; justify-content:space-around";

//     searchInput.addEventListener("input", (e) => {
//       const value = e.target.value.toLowerCase();
//       console.log(value);
//       episodesMain.style.cssText = "display:none";

//       let filterOne = data.filter((a) => {
//         return (
//           a.name.toLowerCase().includes(value) ||
//           a.summary.toLowerCase().includes(value)
//         );
//       });

//       console.log(filterOne);
//       result.innerHTML =
//         "Displaying " + filterOne.length + " / " + data.length + " episodes";
//       episodesMainNew.innerHTML = "";
//       for (
//         let filterEpisode = 0;
//         filterEpisode < filterOne.length;
//         filterEpisode++
//       ) {
//         let divOfEpisodesNew = document.createElement("div");
//         episodesMainNew.appendChild(divOfEpisodesNew);
//         let titleButOfEpisode2 = document.createElement("button");
//         divOfEpisodesNew.appendChild(titleButOfEpisode2);
//         let imgOfEpisode2 = document.createElement("img");
//         divOfEpisodesNew.appendChild(imgOfEpisode2);
//         let paragraphOfEpisode2 = document.createElement("article");
//         divOfEpisodesNew.appendChild(paragraphOfEpisode2);
//         divOfEpisodesNew.style.cssText =
//           "background-color:white ; width:350px ; height: 600px; margin:8px;border-radius: 3%;";
//         paragraphOfEpisode2.style.cssText = "margin:20px; font-size:18px";
//         titleButOfEpisode2.style.cssText =
//           "width:350px ; margin-top: 0px;  height: 80px ;border-radius: 3% ; font-weight: bold; font-size:20px";
//         imgOfEpisode2.style.cssText =
//           "width:280px ; height: 150px; margin: 30px 35px Auto 35px";
//         imgOfEpisode2.setAttribute(
//           "src",
//           filterOne[filterEpisode].image.medium
//         );
//         titleButOfEpisode2.innerText = `${
//           filterOne[filterEpisode].name
//         } - S${forEpisodeNumber(
//           filterOne[filterEpisode].season
//         )}E${forEpisodeNumber(filterOne[filterEpisode].number)}`;
//         paragraphOfEpisode2.innerHTML = `${filterOne[filterEpisode].summary}`;
//       }
//     });
//     window.onload = setup;
//   });

// let footer = document.createElement("footer");
// body.appendChild(footer);
// footer.innerHTML =
//   "<p> The data has (originally) came from <a href='https://www.tvmaze.com/api#licensing'> TVMaze.com</a>See <a href='https://www.tvmaze.com/api#licensing'> tvmaze.com/api#licensing</a>.</p>";
