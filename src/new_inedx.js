import "./styles/index2.scss";
import "./styles/bubble.scss";
import { grabNBAPlayer } from "./scripts/nba_util";
import { findPlayerUrlHelper, getStatsUrlHelper } from "./scripts/urlHelper";
import { bubbleChart } from "./scripts/bubbleChart";
import { statConverter } from "./scripts/convertPlayerStatsBaser100";
import filterSearch from "./scripts/filterSearch";
import { bubblePack } from "./scripts/BubblePack";
import { playerHeading2 } from "./scripts/playerHeading";

//PLAYER DATA CONTROLLER
let playerController = (function() {})();
//UI CONTROLLER
let UIController = (function() {})();
//GLOBAL APP CONTROLLER
let controller = (function(plyCtlr, UICtlr) {})(playerController, UIController);
