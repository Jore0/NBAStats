import { grabNBAPlayer } from "./nba_util";
import { findPlayerUrlHelper, getStatsUrlHelper } from "./urlHelper";

async function filterSearch(playerName, data, year) {
  // debugger;
  let total_pages = data.meta.total_pages;
  let playerids = [];
  let filteredResults = [];
  let players = [];

  if (total_pages > 1) {
    playerids = playerids.concat(Object.values(data.data).map(item => item.id));
    for (let i = 2; i <= total_pages; i++) {
      let url = findPlayerUrlHelper(playerName) + `&current_page=${i}`;
      grabNBAPlayer(url).then(data => {
        // debugger;
        // console.log(Object.values(data.data).map(item => item.id));
        playerids = playerids.concat(
          Object.values(data.data).map(item => item.id)
        );
      });
    }
  } else {
    playerids = playerids.concat(Object.values(data.data).map(item => item.id));
  }

  //   const fetchedData = await Promise.all(playerIds.map(id => grabNBAPlayer(getStatsUrlHelper(year, id))))
  //   //manipulate your data here
  //   console.log(fetchedData)
  // }

  const fetchedData = await Promise.all(
    playerids.map(id =>
      grabNBAPlayer(
        getStatsUrlHelper(year, id)
          .then(data => {
            if (data.data.length >= 1) {
              filteredResults.push(data.data[0]);
            }
          })
          .then(() => {
            data.data.forEach(player => {
              filteredResults.forEach(filterPlayer => {
                if (filterPlayer.player_id === player.id) {
                  players.push(player);
                }
              });
            });
          })
      )
    )
  );
  // playerids.forEach(id => {
  //   let url = getStatsUrlHelper(year, id);
  //   grabNBAPlayer(url)
  //     .then(data => {
  //       if (data.data.length >= 1) {
  //         filteredResults.push(data.data[0]);
  //       }
  //     })
  //     .then(() => {
  //       data.data.forEach(player => {
  //         filteredResults.forEach(filterPlayer => {
  //           if (filterPlayer.player_id === player.id) {
  //             players.push(player);
  //           }
  //         });
  //       });
  //     });
  // });

  return players;
}

export default filterSearch;
