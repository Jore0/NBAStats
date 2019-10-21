import { grabNBAPlayer } from "./nba_util";
import { findPlayerUrlHelper, getStatsUrlHelper } from "./urlHelper";

export const filterSearch = (playerName, data, year) => {
  // debugger;
  let total_pages = data.meta.total_pages;
  let playerids = [];
  let filteredResults = [];

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
    // debugger;
    playerids = playerids.concat(Object.values(data.data).map(item => item.id));
  }
  // debugger
  // console.log(playerids);
  playerids.forEach(id => {
    let url = getStatsUrlHelper(year, id);
    grabNBAPlayer(url)
      .then(data => {
        // debugger;
        if (data.data.length >= 1) {
          debugger;
          // console.log(data.data[0].player_id);
          filteredResults.push(data.data[0]);
        }
      })
      .then(() => {
        debugger;
        console.log(data.data);
        console.log(filteredResults);
      });
  });
};
