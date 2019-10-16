import "./styles/index.scss";
import "./styles/bubble.scss";
import * as d3 from "d3";
import { flare } from "./flare";
import { grabNBAPlayer} from "./scripts/nba_util";
import { findPlayerUrlHelper, getStatsUrlHelper} from "./scripts/urlHelper";

document.addEventListener("DOMContentLoaded", ()=>{

    const root = document.getElementById("root");
    // debugger
    document.getElementById("btn").addEventListener("click", (e)=> {
        e.preventDefault()
        let request = document.getElementById("request").value
        let response = document.createElement("p")

        let url = findPlayerUrlHelper(request)
        grabNBAPlayer(url)
            .then( data => data.data[0].id)
            .then( playerId => getStatsUrlHelper(playerId))
            .then(url => grabNBAPlayer(url))
            // .then(playerStats => response.innerHTML = playerStats)
            .then(data => console.log(data.data[0]))
    })

})


