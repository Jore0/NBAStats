require("babel-core/register");
require("babel-polyfill");
//PLAYER DATA CONTROLLER
let playerController = (function() {
  let PlayerDataSet = function(stats, playerName, color) {
    (this.data = stats),
      (this.label = playerName),
      (this.borderColor = color),
      (this.fill = false),
      (this.pointRadius = 10),
      (thispointBackgroundColor = color);
  };
  let titleize = fullName => {
    let titleName = [];
    fullName.split(" ").forEach(name => {
      debugger;
      if (name !== "") {
        debugger;
        let capName = name[0].toUpperCase() + name.slice(1).toLowerCase();
        titleName.push(capName);
      }
    });
    return titleName.join("_");
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
    years: ["2014", "2015", "2016", "2017", "2018", "2019"],
    colors: {
      "#3e95cd": null,
      "#E7BB41": null,
      "#BB0A21": null,
      "#540D6E": null,
      "#046D0E": null
    }
  };
  let findColor = id => {
    let playerColor;
    for (let color in data.colors) {
      if (data.colors[color] === id) {
        playerColor = color;
      }
    }
    return playerColor;
  };
  return {
    playerLimit: () => {
      let limit = Object.keys(data.allPlayers).length === 5;
      debugger;
      return limit;
    },
    deleteItem: (id, name) => {
      let color;
      //1.Remove players
      delete data.allPlayers[name];
      //2.Set player color to null
      color = findColor(id);
      data.colors[color] = null;
    },
    addPlayer: (name, stats, id) => {
      let availableColors;
      data.allPlayers[name] = stats;
      availableColors = Object.keys(data.colors).filter(
        color => data.colors[color] === null
      );
      data.colors[availableColors[0]] = parseInt(id);
    },
    getColors: id => {
      return findColor(id);
    },
    getAllData: () => {
      return data.allPlayers;
    },
    getFormatedData: dataType => {
      let labels, datasets;

      datasets = [];
      labels = Object.keys(data.allPlayers);
      //arrays
      labels.forEach((player, i) => {
        let playerStats, id;
        allPlayerData = data.allPlayers[player].map(playerSeasons => {
          return Object.values(playerSeasons)[0].map(season => {
            if (dataType === "min") {
              return parseFloat(season[dataType]);
            } else {
              return season[dataType];
            }
          })[0];
        });
        id = data.allPlayers[player][0][2014][0].player_id;
        l = findColor(id);
        playerStats = new PlayerDataSet(allPlayerData, player, l);
        datasets.push(playerStats);
      });
      return { labels: data.years, datasets: datasets };
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
  let chart;
  let DOMStrings = {
    add: ".add",
    items: ".items",
    inputStat: ".add__stat",
    inputPlayer: ".add__player",
    inputBtn: ".add__btn",
    chart: "myChart",
    playerList: ".player__list",
    statsContainer: ".all__stats_container",
    allStatItem: ".all_stats_item",
    inputYear: ".add__year",
    statsList: ".stats__list"
  };

  return {
    createStatList: (color, stats) => {
      let container = document.querySelector(DOMStrings.statsContainer);
      Object.keys(stats).forEach(name => {
        let html, newHTML, statsList, pairs;
        html =
          '<div class="all_stats_item" id=stat-%id% style="color:%color%"><div class="heading"><h2>%name%</h2></div><div id="stats__list-%id%"></div></div >';
        newHTML = html.replace("%id%", stats[name].player_id);
        newHTML = newHTML.replace("%name%", name);
        newHTML = newHTML.replace("%color%", color);
        newHTML = newHTML.replace("%id%", stats[name].player_id);
        container.insertAdjacentHTML("beforeend", newHTML);
        statsList = document.getElementById(
          "stats__list-" + stats[name].player_id
        );
        pairs = Object.entries(stats[name]);
        pairs.forEach(data => {
          let html, newHTML;
          html =
            '<div class="stat__container"><h6 class="stat__type">%key%</h6><h6 class="stat">%value%</h6></div>';
          newHTML = html.replace("%key%", data[0]);
          newHTML = newHTML.replace("%value%", data[1]);
          statsList.insertAdjacentHTML("beforeend", newHTML);
        });
      });
    },
    deletePlayerBtn: id => {
      let element;
      element = document.getElementById(id);
      element.parentNode.removeChild(element);
    },
    createChart: data => {
      Chart.defaults.global.defaultFontSize = 18;
      let ctx = document.getElementById(DOMStrings.chart).getContext("2d");
      if (chart) {
        chart.destroy();
      }

      chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          responsive: true,
          // maintainAspectRatio: false,
          legend: {
            onClick: function(e) {
              e.stopPropagation();
            }
          },
          title: {
            display: true,
            text: document.querySelector(DOMStrings.inputStat).value
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
        stat: document.querySelector(DOMStrings.inputStat).value,
        playerName: document.querySelector(DOMStrings.inputPlayer).value
      };
    },
    addPlayerBtn: (fullName, id, color) => {
      let playerListDOM, html, newHTML, playerDOM;
      html =
        '<div class="player__item" id="%id%" style="color:%color%"><div class="player__Name">%fullName%</div><div class="item__delete"><button class="item__delete--btn"><i class="far fa-times-circle"></i></button></div></div>';
      newHTML = html.replace("%fullName%", fullName);
      newHTML = newHTML.replace("%id%", id);
      newHTML = newHTML.replace("%color%", color);
      playerListDOM = document.querySelector(DOMStrings.playerList);
      playerListDOM.insertAdjacentHTML("beforeend", newHTML);
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
  let DOM = UICtlr.getDOMStrings();
  let setupEventListeners = () => {
    document
      .querySelector(DOM.inputBtn)
      .addEventListener("click", searchPlayer);
    document.addEventListener("keypress", event => {
      if (event.keyCode === 13 || event.which === 13) {
        searchPlayer();
      }
    });

    document.querySelector(DOM.add).addEventListener("click", ctrlSelectPlayer);
    document.addEventListener("click", event => {
      let items = document.querySelector(DOM.items);
      console.log(event);
      if (event.parentNode !== items) {
        UICtlr.clearList();
      }
    });
    ///add if statement for click away
    document
      .querySelector(DOM.inputStat)
      .addEventListener("change", createChart);
    document
      .querySelector(DOM.playerList)
      .addEventListener("click", ctrlDeleteItem);
  };

  let searchPlayer = async () => {
    let input, possiblePlayers;
    UICtlr.clearList();
    //1. Get input field info
    input = UICtlr.getInput();
    if (input.playerName !== "" && !plyCtlr.playerLimit()) {
      //2. Fetch data from API
      possiblePlayers = await plyCtlr.APIFindPlayers(input.playerName);
      //3. Display players
      UICtlr.addListItem(possiblePlayers);
    } else {
      alert("5 players Max");
    }
  };
  let createChart = () => {
    let chartData;
    chartData = plyCtlr.getFormatedData(
      document.querySelector(DOM.inputStat).value
    );
    UICtlr.createChart(chartData);
    UICtlr.clearList();
  };
  let createList = (color, team) => {
    let year, stats, formatedStats;
    formatedStats = {};
    year = document.querySelector(DOM.inputYear).value;
    stats = plyCtlr.getAllData();
    names = Object.keys(stats);
    for (let name in stats) {
      let list = stats[name].filter(
        yearStats => typeof yearStats[year] !== "undefined"
      );
      formatedStats[name] = list[0][year][0];
    }

    UICtlr.createStatList(color, formatedStats, team);
  };
  let ctrlSelectPlayer = async (event, playerName, initID) => {
    let playerID, playerStats, fullName, color;
    if (playerName || event.target.id) {
      fullName = playerName || event.target.innerHTML.split(" -")[0];
      playerID = initID || event.target.id;
      playerStats = await plyCtlr.APIGetPlayerAvg(playerID); ///
      plyCtlr.addPlayer(fullName, playerStats, playerID);
      color = plyCtlr.getColors(parseInt(playerID));
      UICtlr.addPlayerBtn(fullName, playerID, color);
      createChart();
      document.querySelector(DOM.inputPlayer).value = "";
    }
  };
  let ctrlDeleteItem = function(event) {
    let ID, name, type;
    ID = event.target.parentNode.parentNode.parentNode.id;
    name = event.target.parentNode.parentNode.previousSibling.innerHTML;

    if (ID) {
      ID = parseInt(ID);
      //1. DELETE THE ITEM FROM THE DATA

      plyCtlr.deleteItem(ID, name);
      //2.DELETE FROM UI
      UICtlr.deletePlayerBtn(ID);
      //3. UPDATE CHART
      createChart();
    }
  };
  return {
    init: () => {
      console.log("Application is running");
      ctrlSelectPlayer(null, "Lebron James", 237);
      ctrlSelectPlayer(null, "Stephen Curry", 115);
      ctrlSelectPlayer(null, "Giannis Antetokounmpo", 15);
      setupEventListeners();
    }
  };
})(playerController, UIController);

controller.init();
