/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _morgan = __webpack_require__(12);

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = __webpack_require__(9);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = __webpack_require__(8);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = __webpack_require__(10);

var _mongodb2 = _interopRequireDefault(_mongodb);

var _monk = __webpack_require__(11);

var _monk2 = _interopRequireDefault(_monk);

var _index = __webpack_require__(6);

var _index2 = _interopRequireDefault(_index);

var _users = __webpack_require__(7);

var _users2 = _interopRequireDefault(_users);

var _fileUpload = __webpack_require__(5);

var _fileUpload2 = _interopRequireDefault(_fileUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = (0, _monk2.default)('localhost:27017/testParse');

var app = (0, _express2.default)();
// view engine setup
app.set('views', 'views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: true,
    limit: '20mb'
}));
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static('public'));

app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use('/api/', _index2.default);
app.use('/api/users', _users2.default);
app.use('/api/fileUpload', _fileUpload2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

exports.default = app;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_index_js__);
// #!/usr/bin/env node

/**
 * Module dependencies.
 */


var debug = __webpack_require__(2)('sapronovkd:server');
var http = __webpack_require__(3);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
__WEBPACK_IMPORTED_MODULE_0__src_index_js___default.a.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(__WEBPACK_IMPORTED_MODULE_0__src_index_js___default.a);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
router.post('/', function (req, res) {
  var db = req.db;
  var taskCollection = db.get('taskCollection');
  // collection.find({},{},function(e,docs){
  //     res.render('userlist', {
  //         "userlist" : docs
  //     });
  // });
  // if (error) {
  //   console.log(error);
  //   res.json({ status: false });
  // } else {
  //   console.log('Message sent: ' + info.response);
  // }
  var text = req.body.text;

  console.log(text.length);
  var parse = {
    start: null,
    end: null
  };
  var splited = text.split('\n');
  console.log(splited.length);
  var allArr = [];
  var props = [];
  splited.forEach(function (item, index) {
    var row = item.split('\t');
    if (row[0] == '%T' && row[1] == 'TASK\r' && !parse.end) {
      console.log('parsing starts form ' + index);
      parse = {
        start: index,
        end: null
      };
    }
    if (row[0] == '%T' && row[1] == 'PROJCOST\r') {
      console.log('parsing ends at ' + index);
      parse.end = index;
    }
    if (parse.start && index > parse.start && (index < parse.end || parse.end == null)) {
      var obj = {};
      if (index == parse.start + 1) {
        row.forEach(function (item, i) {
          if (i >= 1) {
            props.push(item.replace('\r', ''));
          }
        });
      } else {
        props.forEach(function (prop, i) {
          obj[prop] = row[i + 1].replace('\r', '');
        });
      }
      Object.keys(obj).length != 0 && allArr.push(obj);
    }
  });
  console.log(allArr.length);
  taskCollection.insert(allArr, function (err, doc) {
    if (err) {
      console.log(error);
      res.json({ status: false });
    } else {
      res.json({ status: true, data: doc.map(function (item) {
          return { id: item.task_id, name: item.task_name, early_start_date: item.early_start_date, early_end_date: item.early_end_date };
        }) });
    }
  });
});

exports.default = router;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

exports.default = router;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(0);
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    console.log('users file loaded');
    // Comment out this line:
    //res.send('respond with a resource');

    // And insert something like this instead:
    res.json([{
        id: 1,
        username: "samsepi0l"
    }, {
        id: 2,
        username: "D0loresH4ze"
    }, {
        id: 3,
        username: "123"
    }]);
});

module.exports = router;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("monk");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ })
/******/ ]);