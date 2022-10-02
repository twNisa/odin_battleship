/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factory/Gameboard.js":
/*!**********************************!*\
  !*** ./src/factory/Gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/factory/Ship.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var SIZE = 10;

var Gameboard = /*#__PURE__*/function () {
  function Gameboard() {
    _classCallCheck(this, Gameboard);

    this.board = [];

    for (var i = 0; i < SIZE; i++) {
      this.board[i] = [];

      for (var j = 0; j < SIZE; j++) {
        this.board[i][j] = {
          hasShip: false,
          isShot: false
        };
      }
    }

    this.missedAttacks = [];
    this.ships = [];
  }

  _createClass(Gameboard, [{
    key: "receiveAttack",
    value: function receiveAttack(row, col) {
      if (row < 0 || col < 0 || row > SIZE || col > SIZE) {
        // pos is outside board 
        return false;
      }

      this.board[row][col].isShot = true;

      if (this.board[row][col].hasShip) {
        this.board[row][col].hasShip.hit([row, col]);
        return true;
      } else {
        this.missedAttacks.push([row, col]);
        return true;
      }
    }
  }, {
    key: "isAllSunk",
    value: function isAllSunk() {
      return this.ships.every(function (ship) {
        return ship.isSunk();
      });
    }
  }, {
    key: "placeShip",
    value: function placeShip(ship, row, col, isVertical) {
      if (!this.isPlacementPossible(ship, row, col, isVertical)) {
        return false;
      } // placement possible. we place ships on board


      if (isVertical) {
        for (var i = row; i < row + ship.length; i++) {
          this.board[i][col].hasShip = ship;
        }
      } else {
        for (var _i = col; _i < col + ship.length; _i++) {
          this.board[row][_i].hasShip = ship;
        }
      }

      this.ships.push(ship);
      return true;
    }
  }, {
    key: "isPlacementPossible",
    value: function isPlacementPossible(ship, row, col, isVertical) {
      // if placement is outside the grid
      if (row < 0 || row > SIZE - 1 || col < 0 || col > SIZE - 1) {
        return false;
      } // if vertical, y + length should be inside board


      if (isVertical && row + ship.length > SIZE - 1) {
        return false;
      } // if not vertical, x + length should be inside board
      else if (!isVertical && col + ship.length > SIZE - 1) {
        return false;
      } // if there is a cell in the ship's path that is already taken


      if (isVertical) {
        for (var i = row; i < row + ship.length; i++) {
          if (this.board[i][col].hasShip) {
            return false;
          }
        }
      } else {
        for (var _i2 = col; _i2 < col + ship.length; _i2++) {
          if (this.board[row][_i2].hasShip) {
            return false;
          }
        }
      }

      return true;
    }
  }]);

  return Gameboard;
}();



/***/ }),

/***/ "./src/factory/Player.js":
/*!*******************************!*\
  !*** ./src/factory/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/factory/Gameboard.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Player = /*#__PURE__*/function () {
  function Player(name, isAI) {
    _classCallCheck(this, Player);

    this.name = name;
    this.isAI = isAI;
    this.gameBoard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.alreadyHit = false;
    this.shipHit = [];
  }

  _createClass(Player, [{
    key: "attack",
    value: function attack(row, col, gameBoard) {
      if (!gameBoard.board[row][col].isShot) {
        gameBoard.receiveAttack(row, col);
      } else {
        return;
      }

      !this.alreadyHit;
    }
  }, {
    key: "randomAttack",
    value: function randomAttack(gameBoard) {
      console.log("making random attack");
      var row = Math.floor(Math.random() * 10);
      var col = Math.floor(Math.random() * 10);

      while (gameBoard.board[row][col].isShot) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      }

      gameBoard.receiveAttack(row, col);

      if (gameBoard.board[row][col].hasShip) {
        console.log("ai attacked a ship");
        this.shipHit.push({
          "coord": [row, col],
          ship: gameBoard.board[row][col].hasShip
        });
      }

      return {
        "row": row,
        "col": col
      };
      !this.alreadyHit;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.gameBoard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
      this.alreadyHit = false;
      this.shipHit = [];
    }
  }]);

  return Player;
}();



/***/ }),

/***/ "./src/factory/Ship.js":
/*!*****************************!*\
  !*** ./src/factory/Ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Ship = /*#__PURE__*/function () {
  function Ship(type, length) {
    _classCallCheck(this, Ship);

    this.type = type;
    this.length = length;
    this.hits = [];
  }

  _createClass(Ship, [{
    key: "hit",
    value: function hit(pos) {
      this.hits.push(pos);
    }
  }, {
    key: "isSunk",
    value: function isSunk() {
      return this.hits.length === this.length;
    }
  }]);

  return Ship;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/dot.svg */ "./src/assets/dot.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/x-mark.svg */ "./src/assets/x-mark.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Inter&family=Karla:wght@700&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*{\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody{\n  font-family: \"Inter\", sans-serif;\n  font-size: 18px;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.container{\n  padding: 2rem; \n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n}\n\n.container .status{\n  margin-top: 5rem;\n}\n\n.reset-btn{\n  margin-top: 1rem;\n  background-color: rgb(50, 78, 78);\n  color: white;\n  font-size: 1rem;\n}\n.boards{\n  width: 100%;\n  display: flex;\n  gap: 2rem;\n}\n\n.board{\n  border: 1px solid black;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n.cell{\n  border: 1px solid black;\n  padding: 1rem;\n  cursor: pointer;\n  transition: background-color .15s linear;\n}\n\n.cell:hover{\n  background-color: rgba(0,0,0,.2);\n}\n\n.ship{\n  background-color: #aaa;\n}\n\n.is-shot{\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat center;\n  background-size: .6rem;\n}\n.ship-shot{\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") no-repeat center;\n}\n\n.has-ship{\n  background-color: darkcyan;\n}\n\n.planning{\n  position: absolute;\n  top: 10%;\n  background-color: darkcyan;\n  z-index: 100; \n}\n\n.end-game{\n  z-index: 100;\n  position: absolute;\n  top: 20%;\n  width: 100%;\n  padding: 2rem;\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  color: white;\n  background-color: darkcyan;\n  gap: .5rem;\n}\n.end-game button{\n  padding: 1rem;\n  font-size: 1rem;\n  font-weight: bold;\n  cursor: pointer;\n}\n\n.overlay{\n  display: none;\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background-color: rgba(0, 0, 0, .25);\n  z-index: 1;\n}\n.active{\n  display: flex;\n}\n\n.hovering{\n  background-color:darkcyan ;\n}\n.planning-board{\n  background-color: white;\n}\n.planning{\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: .5rem;\n  padding: 2rem 0;\n  width: 100vw;\n  color: white;\n}\n.planning-btn {\n  display: block;\n  padding: .8rem 1rem;\n  width: 8rem;\n  cursor: pointer;\n  border-radius: 8px;\n  border: none;\n  box-shadow: inset 0 -4px 2px rgba(0, 0, 0, .25);\n}\n.planning-btn:hover{\n  box-shadow: inset 0 0px 2px rgba(0, 0, 0, .25);\n  transition: all .15s linear;\n}\n.bottom-btns{\n  display: flex;\n  gap: 1rem;\n  margin-top: 1rem;\n}\n\nfooter{\n  position:absolute;\n  bottom: 1rem;\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAEA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;;AAEA;EACE,gCAAgC;EAChC,eAAe;EACf,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;AACA;EACE,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;EAChB,iCAAiC;EACjC,YAAY;EACZ,eAAe;AACjB;AACA;EACE,WAAW;EACX,aAAa;EACb,SAAS;AACX;;AAEA;EACE,uBAAuB;EACvB,aAAa;EACb,sCAAsC;AACxC;AACA;EACE,uBAAuB;EACvB,aAAa;EACb,eAAe;EACf,wCAAwC;AAC1C;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,oEAAkD;EAClD,sBAAsB;AACxB;AACA;EACE,oEAAqD;AACvD;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,0BAA0B;EAC1B,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,0BAA0B;EAC1B,UAAU;AACZ;AACA;EACE,aAAa;EACb,eAAe;EACf,iBAAiB;EACjB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,YAAY;EACZ,WAAW;EACX,oCAAoC;EACpC,UAAU;AACZ;AACA;EACE,aAAa;AACf;;AAEA;EACE,0BAA0B;AAC5B;AACA;EACE,uBAAuB;AACzB;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;EACV,eAAe;EACf,YAAY;EACZ,YAAY;AACd;AACA;EACE,cAAc;EACd,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,kBAAkB;EAClB,YAAY;EACZ,+CAA+C;AACjD;AACA;EACE,8CAA8C;EAC9C,2BAA2B;AAC7B;AACA;EACE,aAAa;EACb,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;EACjB,YAAY;AACd","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Inter&family=Karla:wght@700&display=swap');\n\n*{\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n\nbody{\n  font-family: \"Inter\", sans-serif;\n  font-size: 18px;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.container{\n  padding: 2rem; \n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n}\n\n.container .status{\n  margin-top: 5rem;\n}\n\n.reset-btn{\n  margin-top: 1rem;\n  background-color: rgb(50, 78, 78);\n  color: white;\n  font-size: 1rem;\n}\n.boards{\n  width: 100%;\n  display: flex;\n  gap: 2rem;\n}\n\n.board{\n  border: 1px solid black;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n}\n.cell{\n  border: 1px solid black;\n  padding: 1rem;\n  cursor: pointer;\n  transition: background-color .15s linear;\n}\n\n.cell:hover{\n  background-color: rgba(0,0,0,.2);\n}\n\n.ship{\n  background-color: #aaa;\n}\n\n.is-shot{\n  background: url(./assets/dot.svg) no-repeat center;\n  background-size: .6rem;\n}\n.ship-shot{\n  background: url(./assets/x-mark.svg) no-repeat center;\n}\n\n.has-ship{\n  background-color: darkcyan;\n}\n\n.planning{\n  position: absolute;\n  top: 10%;\n  background-color: darkcyan;\n  z-index: 100; \n}\n\n.end-game{\n  z-index: 100;\n  position: absolute;\n  top: 20%;\n  width: 100%;\n  padding: 2rem;\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  color: white;\n  background-color: darkcyan;\n  gap: .5rem;\n}\n.end-game button{\n  padding: 1rem;\n  font-size: 1rem;\n  font-weight: bold;\n  cursor: pointer;\n}\n\n.overlay{\n  display: none;\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background-color: rgba(0, 0, 0, .25);\n  z-index: 1;\n}\n.active{\n  display: flex;\n}\n\n.hovering{\n  background-color:darkcyan ;\n}\n.planning-board{\n  background-color: white;\n}\n.planning{\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  gap: .5rem;\n  padding: 2rem 0;\n  width: 100vw;\n  color: white;\n}\n.planning-btn {\n  display: block;\n  padding: .8rem 1rem;\n  width: 8rem;\n  cursor: pointer;\n  border-radius: 8px;\n  border: none;\n  box-shadow: inset 0 -4px 2px rgba(0, 0, 0, .25);\n}\n.planning-btn:hover{\n  box-shadow: inset 0 0px 2px rgba(0, 0, 0, .25);\n  transition: all .15s linear;\n}\n.bottom-btns{\n  display: flex;\n  gap: 1rem;\n  margin-top: 1rem;\n}\n\nfooter{\n  position:absolute;\n  bottom: 1rem;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/dot.svg":
/*!****************************!*\
  !*** ./src/assets/dot.svg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0f95986ebe241c6c2cc0.svg";

/***/ }),

/***/ "./src/assets/x-mark.svg":
/*!*******************************!*\
  !*** ./src/assets/x-mark.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7e2a977d507c0074275f.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"bundle": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factory_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory/Ship */ "./src/factory/Ship.js");
/* harmony import */ var _factory_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factory/Player */ "./src/factory/Player.js");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var planning = document.querySelector(".planning");
var planningBoard = document.querySelector(".planning-board");
var planningRotateBtn = document.querySelector(".planning-rotate-btn");
var planningText = document.querySelector(".planning > p");
var planningStartGameBtn = document.querySelector(".planning-start-btn");
var planningResetBtn = document.querySelector(".planning-reset-btn");
var planningRandomBtn = document.querySelector(".planning-random-btn");
var playerBoard = document.querySelector(".player-board");
var aiBoard = document.querySelector(".enemy-board");
var boards = document.querySelector(".boards");
var resetGameBtn = document.querySelector(".reset-btn");
var endGameDiv = document.querySelector(".end-game");
var overlay = document.querySelector(".overlay");
var newGameBtn = document.querySelector(".end-game button");
var carrierPlayer, destroyerPlayer, submarinePlayer, submarine2Player;
var carrierAI, destroyerAI, submarineAI, submarine2AI;
var player = new _factory_Player__WEBPACK_IMPORTED_MODULE_1__["default"]("player one", false);
var ai = new _factory_Player__WEBPACK_IMPORTED_MODULE_1__["default"]("AI", true);
var playerShipsArr;
var current = 0;
var isVerticalSelection = true;
var isPlanningDone = false;
initPlanning();

function initPlanning() {
  planning.style.display = "flex";
  planningBoard.textContent = "";
  overlay.classList.add("active");
  planningRotateBtn.addEventListener("click", handleRotateBtnClick);
  carrierPlayer = new _factory_Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("carrier", 4);
  destroyerPlayer = new _factory_Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("destroyer", 3);
  submarinePlayer = new _factory_Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("submarine", 2);
  submarine2Player = new _factory_Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("submarine", 2);
  playerShipsArr = [carrierPlayer, destroyerPlayer, submarinePlayer, submarine2Player];
  planningText.textContent = "Place your ".concat(playerShipsArr[current].type);

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.col = j;
      planningBoard.append(cell);
      cell.addEventListener("mouseover", function (e) {
        return handleShipPlacementMouseOver(planningBoard, e);
      });
      cell.addEventListener("click", handleShipPlacementClick);
    }
  }

  planningBoard.addEventListener("mouseleave", function () {
    var _iterator = _createForOfIteratorHelper(planningBoard.children),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _cell = _step.value;

        if (_cell.classList.contains("hovering")) {
          _cell.classList.remove("hovering");
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
  planningStartGameBtn.addEventListener("click", handleGameStartClick);
  planningResetBtn.addEventListener("click", handleResetClick); // planningRandomBtn.addEventListener("click", handleRandomClick)
}

function stopPlanning() {
  current = 0;
  isPlanningDone = false;
  overlay.classList.toggle("active");
  planning.style.display = "none";
}

function handleRotateBtnClick() {
  isVerticalSelection = !isVerticalSelection;
}

function handleShipPlacementMouseOver(planningBoard, e) {
  var row = Number(e.target.dataset.row);
  var col = Number(e.target.dataset.col);

  var _iterator2 = _createForOfIteratorHelper(planningBoard.children),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var cell = _step2.value;

      if (cell.classList.contains("hovering")) {
        cell.classList.remove("hovering");
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  if (!player.gameBoard.isPlacementPossible(playerShipsArr[current], row, col, isVerticalSelection)) {
    e.target.style.cursor = "not-allowed";
  } else {
    if (isVerticalSelection) {
      for (var i = 0; i < playerShipsArr[current].length; i++) {
        planningBoard.children[row * 10 + col + i * 10].classList.toggle("hovering");
      }
    } else {
      for (var _i = 0; _i < playerShipsArr[current].length; _i++) {
        planningBoard.children[row * 10 + col + _i * 1].classList.toggle("hovering");
      }
    }
  }
}

function handleShipPlacementClick(e) {
  var row = Number(e.target.dataset.row);
  var col = Number(e.target.dataset.col);

  if (player.gameBoard.isPlacementPossible(playerShipsArr[current], row, col, isVerticalSelection)) {
    player.gameBoard.placeShip(playerShipsArr[current], row, col, isVerticalSelection);

    if (isVerticalSelection) {
      for (var i = 0; i < playerShipsArr[current].length; i++) {
        planningBoard.children[row * 10 + col + i * 10].classList.toggle("has-ship");
      }
    } else {
      for (var _i2 = 0; _i2 < playerShipsArr[current].length; _i2++) {
        planningBoard.children[row * 10 + col + _i2 * 1].classList.toggle("has-ship");
      }
    }

    if (current < playerShipsArr.length - 1) {
      current++;
      planningText.textContent = "Place your ".concat(playerShipsArr[current].type);
    } else {
      //finished placing all ships
      console.log("finished placing all ships");
      planningText.textContent = "Placement done."; // Array.from(planningBoard.children).map((cell) => cell.removeEventListener("mouseover", handleShipPlacementMouseOver))

      togglePlanningActive();
    }
  }
}

function togglePlanningActive() {
  isPlanningDone = !isPlanningDone;

  var _iterator3 = _createForOfIteratorHelper(planningBoard.children),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var cell = _step3.value;

      if (isPlanningDone) {
        cell.style.cursor = "not-allowed";
        cell.removeEventListener("click", handleShipPlacementClick); // cell.removeEventListener("mouseover", handleShipPlacementMouseOver)
      } else {
        cell.style.cursor = "crosshair";
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
}

function handleGameStartClick() {
  if (isPlanningDone) {
    stopPlanning();
    createRandomAIFleet();
    resetGameBtn.addEventListener("click", resetGame);
    renderBoard(boards, player, ai);
  } else {
    console.log("not going to start");
  }
}

function handleResetClick() {
  current = 0;
  player.reset();
  isPlanningDone = false;
  initPlanning();
} // function handleRandomClick(){
// }


var isPlayerTurn = true;
var gameInProgress = false;

function renderBoard(div, player, ai) {
  clearBoard(); //for player board

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.col = j;
      playerBoard.append(cell);
      cell.style.cursor = "not-allowed";
      player.gameBoard.board[i][j].isShot && cell.classList.toggle("is-shot");
      player.gameBoard.board[i][j].hasShip && cell.classList.toggle("has-ship");
    }
  } //for ai board


  for (var _i3 = 0; _i3 < 10; _i3++) {
    for (var _j = 0; _j < 10; _j++) {
      var _cell2 = document.createElement("div");

      _cell2.className = "cell";
      _cell2.dataset.row = _i3;
      _cell2.dataset.col = _j;
      aiBoard.append(_cell2);
      _cell2.style.cursor = "crosshair";

      _cell2.addEventListener("click", handleClick); // ai.gameBoard.board[i][j].isShot && cell.classList.toggle("is-shot") 
      // ai.gameBoard.board[i][j].hasShip && cell.classList.toggle("has-ship")

    }
  }
}

function createRandomAIFleet() {
  carrierAI = new _factory_Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("carrier", 4);
  destroyerAI = new _factory_Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("destroyer", 3);
  submarineAI = new _factory_Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("submarine", 2);
  submarine2AI = new _factory_Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("submarine", 2);
  randomiseShip(carrierAI, ai);
  randomiseShip(destroyerAI, ai);
  randomiseShip(submarineAI, ai);
  randomiseShip(submarine2AI, ai);
}

function randomiseShip(ship, owner) {
  var row = Math.floor(Math.random() * 10);
  var col = Math.floor(Math.random() * 10);
  var ver = Math.floor(Math.random() * 2);

  while (!owner.gameBoard.isPlacementPossible(ship, row, col, ver)) {
    row = Math.floor(Math.random() * 10);
    col = Math.floor(Math.random() * 10);
    ver = Math.floor(Math.random() * 2);
  }

  owner.gameBoard.placeShip(ship, row, col, ver);
}

function handleClick(e) {
  var row = e.target.dataset.row;
  var col = e.target.dataset.col;

  if (ai.gameBoard.receiveAttack(row, col) && !e.target.classList.contains("is-shot")) {
    // ai.gameBoard.receiveAttack(row, col);
    e.target.dataset.isShot = true;
    e.target.classList.toggle("is-shot");
    e.target.style.cursor = "not-allowed";

    if (ai.gameBoard.board[row][col].hasShip) {
      e.target.classList.toggle("ship-shot");
      e.target.classList.toggle("has-ship");
    }

    if (ai.gameBoard.isAllSunk()) {
      console.log("player won");
      endGame(player.name);
    }

    ai.randomAttack(player.gameBoard);

    if (player.gameBoard.isAllSunk()) {
      console.log("ai won");
      endGame(ai.name);
    }

    updatePlayerBoard(player.gameBoard.board);
  }

  e.target.removeEventListener("click", handleClick);
}

function updatePlayerBoard(board) {
  playerBoard.textContent = "";

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.col = j;
      playerBoard.append(cell);
      cell.style.cursor = "not-allowed";
      player.gameBoard.board[i][j].isShot && cell.classList.toggle("is-shot");
      player.gameBoard.board[i][j].hasShip && cell.classList.toggle("has-ship");
    }
  }
}

function endGame(name) {
  console.log("End Game ".concat(name));
  document.querySelector(".game-over-text").textContent = "".concat(name, " won!");
  endGameDiv.classList.toggle("active");
  overlay.classList.toggle("active");
  newGameBtn.addEventListener("click", resetGame);
}

function clearBoard() {
  console.log("clear board");
  playerBoard.textContent = "";
  aiBoard.textContent = "";
}

function resetGame() {
  console.log("reset");
  player.reset();
  ai.reset();
  renderBoard(boards, player, ai);
  endGameDiv.classList.remove("active");
  overlay.classList.remove("active");
  initPlanning();
}
})();

/******/ })()
;
//# sourceMappingURL=bundle705d430559b64e129c60.js.map