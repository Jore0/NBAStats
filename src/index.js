import "./styles/index.scss";
import "./styles/bubble.scss";
import { grabNBAPlayer} from "./scripts/nba_util";
import { findPlayerUrlHelper, getStatsUrlHelper} from "./scripts/urlHelper";
import {barGraph} from "./scripts/lebronBar"
document.addEventListener("DOMContentLoaded", ()=>{

    const root = document.getElementById("root");
    let chart = document.createElement("div");
    chart.className = "bar-graph";
    // debugger
    document.getElementById("btn").addEventListener("click", (e)=> {
        e.preventDefault()
        let playerName = document.getElementById("playerName").value;
        let year = document.getElementById("year").value;
        let response = document.createElement("p");

        let url = findPlayerUrlHelper(playerName)
        grabNBAPlayer(url)
        .then( data => data.data[0].id)
        .then( playerId => getStatsUrlHelper(playerId))
        .then(url => grabNBAPlayer(year, url))
        .then(data => response.innerHTML = data.data[0].min)
        root.appendChild(response)
        })
    root.appendChild(chart)
    barGraph()
})


