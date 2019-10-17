import "./styles/index.scss";
import "./styles/bubble.scss";
import { grabNBAPlayer } from "./scripts/nba_util";
import { findPlayerUrlHelper, getStatsUrlHelper } from "./scripts/urlHelper";
import { bubbleChart } from "./scripts/bubbleChart";
import { statConverter } from "./scripts/convertPlayerStatsBaser100";
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let chart = document.createElement("div");
  chart.className = "bubble-graph";
  let players = document.createElement("ul");
  let year = document.getElementById("year").value;
  let listBox = document.getElementById("listbox");

  document.getElementById("playerName").addEventListener("input", () => {
    // debugger

    let playerName = document.getElementById("playerName").value;

    if (playerName.length >= 3) {
      // debugger
      let url = findPlayerUrlHelper(playerName);
      grabNBAPlayer(url).then(data => {
        // data
        listBox.appendChild(players);
        let results = data.data;
        for (let i = 0; i < results.length; i++) {
          let player = document.createElement("li");
          player.addEventListener("click", e => {
            // debugger;
            let url = findPlayerUrlHelper(e.target.innerText.split(" ")[0]);
            grabNBAPlayer(url)
              .then(data => data.data[0].id)
              .then(playerId => getStatsUrlHelper(year, playerId))
              .then(url => grabNBAPlayer(url))
              .then(data => ({ children: statConverter(data.data[0]) }))
              .then(dataset => bubbleChart(dataset));
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
  });

  root.appendChild(chart);
});
