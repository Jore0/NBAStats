export const findPlayerUrlHelper = name => {
  let nbaURL = "https://www.balldontlie.io/api/v1/";
  let caplitalizedName = titleize(name);
  nbaURL += `players/?search=${caplitalizedName}&per_page=100`;
  return nbaURL;
};

export const getStatsUrlHelper = (year, playerId) => {
  let nbaURL = "https://www.balldontlie.io/api/v1/season_averages";

  nbaURL += `?season=${year}&player_ids[]=${playerId}`;
  return nbaURL;
};
function titleize(fullName) {
  // debugger
  let titleName = [];
  fullName.split(" ").forEach(name => {
    let capName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    titleName.push(capName);
  });
  return titleName.join("");
}
