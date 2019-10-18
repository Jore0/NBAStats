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

const teams = {
  Hawks: 1,
  Celtics: 2,
  Nets: 3,
  Hornets: 4,
  Bulls: 5,
  Cavaliers: 6,
  Mavericks: 7,
  Nuggets: 8,
  Pistons: 9,
  Warriors: 10,
  Rockets: 11,
  Pacers: 12,
  Clippers: 13,
  Lakers: 14,
  Grizzlies: 15,
  Heat: 16,
  Bucks: 17,
  Timberwolves: 18,
  Pelicans: 19,
  Knicks: 20,
  Thunder: 21,
  Magic: 22,
  "76ers": 23,
  Suns: 24,
  "Trail Blazers": 25,
  Kings: 26,
  Spurs: 27,
  Raptors: 28,
  Jazz: 29,
  Wizards: 30
};
