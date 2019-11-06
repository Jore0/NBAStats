export const statConverter = data => {
  const formatedData = [];
  const color = Math.floor(Math.random() * 360);

  for (let stat in data) {
    let playerStats = {};
    playerStats["color"] = color;
    playerStats["id"] = data.player_id;

    if (stat === "pts") {
      // debugger
      playerStats["category"] = "Points";
      playerStats["size"] = (data[stat] / 36.1) * 10;
      playerStats["value"] = data[stat];
      formatedData.push(playerStats);
    } else if (stat === "reb") {
      playerStats["category"] = "Rebounds";
      playerStats["size"] = (data[stat] / 15.6) * 10;
      playerStats["value"] = data[stat];
      formatedData.push(playerStats);
    } else if (stat === "ast") {
      playerStats["category"] = "Assists";
      playerStats["size"] = (data[stat] / 10.7) * 10;
      playerStats["value"] = data[stat];
      formatedData.push(playerStats);
    } else if (stat === "blk") {
      playerStats["category"] = "Blocks";
      playerStats["size"] = (data[stat] / 2.69) * 10;
      playerStats["value"] = data[stat];
      formatedData.push(playerStats);
    } else if (stat === "fg3_pct") {
      playerStats["category"] = "3pt Percentage";
      playerStats["size"] = data[stat] * 10;
      playerStats["value"] = data[stat];
      formatedData.push(playerStats);
    } else if (stat === "stl") {
      playerStats["category"] = "Steals";
      playerStats["size"] = (data[stat] / 2.21) * 10;
      playerStats["value"] = data[stat];
      formatedData.push(playerStats);
    }
  }

  return formatedData;
  // console.log(formatedData)
};

// "children": [{
//     "category": "Games Played",
//     "responseCount": 2,
//     size
