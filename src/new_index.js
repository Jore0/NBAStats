//PLAYER DATA CONTROLLER
let playerController = (function() {
  let titleize = fullName => {
    let titleName = [];
    fullName.split(" ").forEach(name => {
      let capName = name[0].toUpperCase() + name.slice(1).toLowerCase();
      titleName.push(capName);
    });
    return titleName.join("");
  };

  let findPlayerUrlHelper = name => {
    let nbaURL = "https://www.balldontlie.io/api/v1/";
    let caplitalizedName = titleize(name);
    nbaURL += `players/?search=${caplitalizedName}&per_page=100`;
    return nbaURL;
  };
  let getStatsUrlHelper = (year, playerId) => {
    let nbaURL = "https://www.balldontlie.io/api/v1/season_averages";
    nbaURL += `?season=${year}&player_ids[]=${playerId}`;
    return nbaURL;
  };
  let data = {
    allPlayers: {}
  };
  return {
    addPlayer: (id, stats) => {
      data.allPlayers[id] = stats;
      console.log(data.allPlayers);
    },
    APIFindPlayers: async (type, name, year, id) => {
      let url, response, data;
      type === "search"
        ? (url = findPlayerUrlHelper(name))
        : (url = getStatsUrlHelper(id, year));
      response = await fetch(url, { method: "GET" });
      data = await response.json();
      data = data.data;
      return data;
    }
  };
})();

/* ******************************** */
//UI CONTROLLER
let UIController = (function() {
  let DOMStrings = {
    add: ".add",
    items: ".items",
    inputYear: ".add__year",
    inputPlayer: ".add__player",
    inputBtn: ".add__btn",
    chart: ".myChart"
  };

  return {
    createChart: data => {},
    clearList: () => {
      let itemsDOM;
      itemsDOM = document.querySelector(DOMStrings.items);
      itemsDOM.innerHTML = "";
      itemsDOM.style.display = "none";
    },
    getInput: () => {
      return {
        year: document.querySelector(DOMStrings.inputYear).value,
        playerName: document.querySelector(DOMStrings.inputPlayer).value
      };
    },
    addListItem: data => {
      let itemsDOM;
      data.forEach(player => {
        let html, newHTML;
        html = '<div class="item" id="%id%">%player% - %team%</div>';
        newHTML = html.replace("%id%", player.id);
        newHTML = newHTML.replace(
          "%player%",
          player.first_name + " " + player.last_name
        );
        newHTML = newHTML.replace("%team%", player.team.abbreviation);

        itemsDOM = document.querySelector(DOMStrings.items);
        itemsDOM.style.display = "block";
        itemsDOM.insertAdjacentHTML("beforeend", newHTML);
      });
    },
    getDOMStrings: () => {
      return DOMStrings;
    }
  };
})();

/* ******************************** */
//GLOBAL APP CONTROLLER
let controller = (function(plyCtlr, UICtlr) {
  let setupEventListeners = () => {
    let DOM = UICtlr.getDOMStrings();
    document
      .querySelector(DOM.inputBtn)
      .addEventListener("click", searchPlayer);
    document.addEventListener("keypress", event => {
      if (event.keyCode === 13 || event.which === 13) {
        searchPlayer();
      }
    });
    document.querySelector(DOM.add).addEventListener("click", ctrlSelectPlayer);
  };

  let searchPlayer = async () => {
    let input, possiblePlayers;
    UICtlr.clearList();
    //1. Get input field info
    input = UICtlr.getInput();
    if (input.playerName !== "") {
      //2. Fetch data from API
      possiblePlayers = await plyCtlr.APIFindPlayers(
        "search",
        input.playerName,
        input.year
      );
      // console.log(possiblePlayers);
      //3. Display players
      UICtlr.addListItem(possiblePlayers);
    }
  };

  let ctrlSelectPlayer = async event => {
    let playerID, playerStats, fullName;
    if (event.target.id) {
      fullName = event.target.innerHTML.split(" -")[0];
      playerID = event.target.id;
      playerStats = await plyCtlr.APIFindPlayers("stats", "", playerID, 2018);
      playerStats[0]["name"] = fullName;
      plyCtlr.addPlayer(playerID, playerStats[0]);
      UICtlr.clearList();
    }
  };
  return {
    init: () => {
      console.log("Application is running");

      setupEventListeners();
    }
  };
})(playerController, UIController);

controller.init();
