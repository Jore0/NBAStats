import "./styles/index.scss";
import "./styles/bubble.scss";
import { grabNBAPlayer } from "./scripts/nba_util";
import { findPlayerUrlHelper, getStatsUrlHelper } from "./scripts/urlHelper";
import { bubbleChart } from "./scripts/bubbleChart";
import { statConverter } from "./scripts/convertPlayerStatsBaser100";
import filterSearch from "./scripts/filterSearch";
import { bubblePack } from "./scripts/BubblePack";

import { playerHeading2 } from "./scripts/playerHeading";
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let chart = document.createElement("div");
  chart.id = "bubble-graph";

  let typingTimer;
  let doneTypingInterval = 3000;
  document.getElementById("playerName").addEventListener("keyup", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });
  document.getElementById("playerName").addEventListener("keydown", () => {
    clearTimeout(typingTimer);
  });

  root.appendChild(chart);
});

function doneTyping() {
  let players = document.createElement("ul");
  players.id = "results";
  let listBox = document.getElementById("listbox");
  let playerName = document.getElementById("playerName").value;
  let url = findPlayerUrlHelper(playerName);
  grabNBAPlayer(url).then(data => {
    let results;

    // results = filterSearch(playerName, data, 2018);
    console.log(results);
    listBox.appendChild(players);
    results = data.data;
    for (let i = 0; i < results.length; i++) {
      let player = document.createElement("li");
      player.addEventListener("click", e => {
        let url = findPlayerUrlHelper(e.target.innerText.split(" ")[0]);
        grabNBAPlayer(url)
          .then(data => {
            return data.data[0].id;
          })
          .then(playerId => getStatsUrlHelper(2018, playerId))
          .then(url => grabNBAPlayer(url))
          .then(data => ({ children: statConverter(data.data[0]) }))
          .then(dataset => {
            playerHeading2(e, results[i], dataset.children[0].color);
            bubblePack(
              dataset,
              dataset.children[0].color,
              results[i].first_name
            );
          });
        players.parentNode.removeChild(players);
      });
      player.innerHTML =
        results[i].first_name +
        " " +
        results[i].last_name +
        " - " +
        results[i].team.abbreviation;
      players.appendChild(player);
    }
  });
}
