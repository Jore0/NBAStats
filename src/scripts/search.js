

// document.getElementById("playerName").addEventListener("oninput", (e) => {
//     let players = document.createElement("ul");
//     let url = findPlayerUrlHelper(playerName)
//     grabNBAPlayer(url)
//     .then(data => {
//         listBox.appendChild(players)
//         let results = data.data
//         for(let i = 0; i < results.length; i ++ ){
//             let player = document.createElement("li");
//             player.innerHTML = results[i].first_name + " " + results[i].last_name + " - " + results[i].teams.abbreviation ;
//             players.appendChild(player)
//         }
//     })
// })