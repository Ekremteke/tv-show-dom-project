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
    select(alShows);
    search(alShows);
    showNameButton();
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
// **
//Button add event listeners
// **
function showNameButton() {
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
          select(result);
          search(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
showNameButton();
