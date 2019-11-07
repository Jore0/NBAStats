export const playerHeading2 = (e, results, color) => {
  let playerInfo = document.createElement("div");
  playerInfo.classList.add(color);
  playerInfo.id = "playerInfo";
  let info = results;

  // console.log(info);
  let playerHeading = document.createElement("h2");
  playerHeading.innerText = info.first_name + " " + info.last_name;
  playerInfo.appendChild(playerHeading);
  let postion = document.createElement("h6");
  postion.innerText = `Position: ${info.position} | Team: ${info.team.full_name}`;
  playerInfo.appendChild(postion);

  const root = document.getElementById("root");
  root.insertBefore(playerInfo, document.getElementById("bubble-chart"));
  // root.appendChild(playerInfo);
};
