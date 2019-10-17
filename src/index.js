import "./styles/index.scss";
import "./styles/bubble.scss";
import { grabNBAPlayer} from "./scripts/nba_util";
import { findPlayerUrlHelper, getStatsUrlHelper} from "./scripts/urlHelper";
import { bubbleChart } from "./scripts/bubbleChart"
import { statConverter } from "./scripts/convertPlayerStatsBaser100"
document.addEventListener("DOMContentLoaded", ()=>{

    const root = document.getElementById("root");
    let chart = document.createElement("div");
    chart.className = "bubble-graph";
    // debugger
    document.getElementById("btn").addEventListener("click", (e)=> {
        e.preventDefault()
        let playerName = document.getElementById("playerName").value;
        let year = document.getElementById("year").value;
        let response = document.createElement("p");

        let url = findPlayerUrlHelper(playerName)
        grabNBAPlayer(url)
        .then( data => {
            console.log(data.data)
            return data.data[0].id
        })
        .then( playerId => getStatsUrlHelper(year, playerId))
        .then(url => grabNBAPlayer(url))
        .then(data => ( { "children": statConverter(data.data[0]) } ) )
        .then(dataset => bubbleChart(dataset))
    })
    root.appendChild(chart)

})


