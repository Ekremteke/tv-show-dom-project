let url = "https://api.tvmaze.com/shows/1632/episodes";
let alShows = getAllShows();
let container = document.getElementById("main-container");
let episodesSelect = document.getElementById("episodes");
let searchInput = document.getElementById("search-input");
let resultOfSearch = document.getElementById("result");
console.log(alShows);
function forEpisodeNumber(x) {
  return x > 9 ? x : "0" + x;
}

// xx
// select episode function
// xx
function select(episodes) {
  episodesSelect.innerHTML = "";
  let firstOption = document.createElement("option");
  episodesSelect.appendChild(firstOption);
  firstOption.innerText = "Select All";
  firstOption.setAttribute("value", "0");
  episodes.forEach((episode) => {
    let episodeOptions = document.createElement("option");
    episodesSelect.appendChild(episodeOptions);
    episodeOptions.setAttribute("value", `${episode.id}`);
    let number = `S${forEpisodeNumber(episode.season)}E${forEpisodeNumber(
      episode.number
    )}`;
    episodeOptions.innerHTML = `${episode.name} - ${number}`;

    episodesSelect.addEventListener("change", (event) => {
      if (event.target.value == episode.id) {
        let selectedArr = [];
        selectedArr.push(episode);
        return setUp(selectedArr);
      } else if (event.target.value == 0) {
        return setUp(episodes);
      }
    });
  });
}
// **
// set up function
// **
setUp(alShows);
function setUp(array) {
  container.innerHTML = "";
  resultOfSearch.innerHTML =
    "Displaying " + array.length + " / " + array.length;
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
    if (x.season !== undefined) {
      let number = `S${forEpisodeNumber(x.season)}E${forEpisodeNumber(
        x.number
      )}`;
      x.id = number;
      cards.setAttribute("id", number);
      buttonForCard.appendChild(tagName);
      let episodeName = `${x.name} `;
      let title = (tagName.innerText = `${episodeName} - ${number}`);
      tagName.innerHTML = title;
    } else {
      tagName.innerText = x.name;
      cards.setAttribute("id", x.id);
    }
    paragraphForCard.className = "paragraphForCard";
    buttonForCard.className = "buttonForCard";
    imageForCard.className = "imageForCard";

    paragraphForCard.innerHTML = `${x.summary}`;

    if (x.image != null) {
      imageForCard.setAttribute("src", x.image.medium);
    }

    buttonForCard.appendChild(tagName);
  });
}
// **
// search function
// **
search(alShows);
function search(episodList) {
  searchInput.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase();
    console.log(value);

    let filterOne = episodList.filter((a) => {
      return (
        a.name.toLowerCase().includes(value) ||
        a.summary.toLowerCase().includes(value)
      );
    });
    setUp(filterOne);
    console.log(filterOne);
    resultOfSearch.innerHTML =
      "Displaying " +
      filterOne.length +
      " / " +
      episodList.length +
      " episodes";
  });
}
// **
//Button add event listeners
// **

let buttonForShow = document.querySelectorAll(".buttonForCard");
for (let j = 0; j < buttonForShow.length; j++) {
  buttonForShow[j].addEventListener("click", () => {
    url = `https://api.tvmaze.com/shows/${alShows[j].id}/episodes`;
    fetch(url)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setUp(result);
        select();
        select(result);
      })
      .catch((err) => {
        console.log(err);
      });
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
showsSelect.addEventListener("change", (event) => {
  if (event.target.value == 0) {
    setUp(alShows);
  } else {
    fetch(event.target.value)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setUp(result);
        select(result);
        search(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
//
//
//
//
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
