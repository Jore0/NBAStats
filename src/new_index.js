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
  let getStatsUrlHelper = (playerId, year) => {
    let nbaURL = "https://www.balldontlie.io/api/v1/season_averages";
    nbaURL += `?season=${year}&player_ids[]=${playerId}`;
    return nbaURL;
  };
  let data = {
    allPlayers: {},
    years: ["2019", "2018", "2017", "2016", "2015", "2014"]
  };
  //www.balldontlie.io/api/v1/stats?seasons[]=2019,2018,2017,2016,2015,2014&player_ids[]=237,236
  return {
    addPlayer: (id, stats) => {
      data.allPlayers[id] = stats;
      console.log(data.allPlayers);
    },
    getFormatedData: dataType => {
      let labels, allPlayerData, formattedData;
      labels = Object.keys(data.allPlayers);
      //arrays
      allPlayerData = Object.values(data.allPlayers).map(playerSeasons => {
        debugger;
        return playerSeasons.map(season => {
          debugger;
          return Object.values(season).map(stats => {
            debugger;
            return stats[0][dataType];
          })[0];
        });
      });
      console.log(allPlayerData);
      formattedData = {
        labels: data.years,
        datasets: [
          {
            data: allPlayerData[0],
            label: labels[0],
            borderColor: "#3e95cd",
            fill: false
          }
        ]
      };
      console.log(formattedData);
      return formattedData;
    },
    APIFindPlayers: async name => {
      let url, response, data;
      url = findPlayerUrlHelper(name);
      response = await fetch(url, { method: "GET" });
      data = await response.json();
      data = data.data;
      return data;
    },
    APIGetPlayerAvg: async (id, years) => {
      let url, playerData;
      years ? years : (years = data.years);

      playerData = await Promise.all(
        years.map(async year => {
          let response, obj;
          obj = {};
          url = getStatsUrlHelper(id, year);
          response = await fetch(url, { method: "GET" });
          response = await response.json();
          response = response.data;
          obj[year] = response;
          return obj;
        })
      );

      return playerData;
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
    chart: "myChart"
  };

  return {
    createChart: data => {
      let ctx = document.getElementById(DOMStrings.chart).getContext("2d");
      let chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          title: {
            display: true,
            text: "Points"
          }
        }
      });
    },
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
      possiblePlayers = await plyCtlr.APIFindPlayers(input.playerName);
      //3. Display players
      UICtlr.addListItem(possiblePlayers);
    }
  };

  let ctrlSelectPlayer = async event => {
    let playerID, playerStats, fullName, chartData;
    if (event.target.id) {
      fullName = event.target.innerHTML.split(" -")[0];
      playerID = event.target.id;
      playerStats = await plyCtlr.APIGetPlayerAvg(playerID); ///
      plyCtlr.addPlayer(fullName, playerStats);
      chartData = plyCtlr.getFormatedData("pts");
      UICtlr.createChart(chartData);
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
