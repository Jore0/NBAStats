import { grabNBAPlayer } from "./nba_util";
import { findPlayerUrlHelper, getStatsUrlHelper } from "./urlHelper";

export const filterSearch = (playerName, data, year) => {
  let total_pages = data.meta.total_pages;
  let playerids = [];
  if (total_pages > 1) {
    playerids = playerids.concat(Object.values(data.data).map(item => item.id));
    for (let i = 2; i <= total_pages; i++) {
      let url = findPlayerUrlHelper(playerName) + `&current_page=${i}`;
      grabNBAPlayer(url).then(data => {
        // debugger;
        console.log(Object.values(data.data).map(item => item.id));
        playerids = playerids.concat(
          Object.values(data.data).map(item => item.id)
        );
      });
    }
  } else {
    // debugger;
    playerids = playerids.concat(Object.values(data.data).map(item => item.id));
  }
  playerids.forEach(id => {});
  console.log(playerids);
};
