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
  return {
    APIFindPlayers: (name, year) => {
      const proxyUrl = "";
      return fetch(proxyUrl + url, {
        method: "GET"
      }).then(res => res.json());
    }
  };
})();
//UI CONTROLLER
let UIController = (function() {
  let DOMStrings = {
    inputYear: ".add__year",
    inputPlayer: ".add_player",
    inputBtn: ".add__btn"
  };

  return {
    getInput: () => {
      return {
        year: document.querySelector(DOMStrings.inputYear).value,
        playerName: document.querySelector(DOMStrings.inputPlayer).value
      };
    },
    getDOMStrings: () => {
      return DOMStrings;
    }
  };
})();
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
  };

  let searchPlayer = () => {
    let input, data;
    //1. Get input field info
    input = UICtlr.getInput();
    if (input.playerName !== "") {
      //2. Fetch data from API
      data = plyCtlr.APIFindPlayers(input.playerName, input.year);
    }

    //3. Return Data
    //4. Add chart to UI
    //5. clear the input feilds
  };
  return {
    init: () => {
      console.log("Application is running");

      setupEventListeners();
    }
  };
})(playerController, UIController);

controller.init();
