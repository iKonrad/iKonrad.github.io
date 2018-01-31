webpackJsonp([35783957827783],{

/***/ 87:
/***/ (function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';
	
	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};
	
	var KNOWN_STATICS = {
	  name: true,
	  length: true,
	  prototype: true,
	  caller: true,
	  callee: true,
	  arguments: true,
	  arity: true
	};
	
	var defineProperty = Object.defineProperty;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var getPrototypeOf = Object.getPrototypeOf;
	var objectPrototype = getPrototypeOf && getPrototypeOf(Object);
	
	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	
	        if (objectPrototype) {
	            var inheritedComponent = getPrototypeOf(sourceComponent);
	            if (inheritedComponent && inheritedComponent !== objectPrototype) {
	                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
	            }
	        }
	
	        var keys = getOwnPropertyNames(sourceComponent);
	
	        if (getOwnPropertySymbols) {
	            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
	        }
	
	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
	                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
	                try { // Avoid failures from read-only properties
	                    defineProperty(targetComponent, key, descriptor);
	                } catch (e) {}
	            }
	        }
	
	        return targetComponent;
	    }
	
	    return targetComponent;
	};


/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ConsoleScreen = __webpack_require__(184);
	
	var _ConsoleScreen2 = _interopRequireDefault(_ConsoleScreen);
	
	var _ConsoleInput = __webpack_require__(183);
	
	var _ConsoleInput2 = _interopRequireDefault(_ConsoleInput);
	
	var _consoleEngine = __webpack_require__(189);
	
	var _consoleEngine2 = _interopRequireDefault(_consoleEngine);
	
	__webpack_require__(270);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Console = function (_Component) {
	  _inherits(Console, _Component);
	
	  function Console(props) {
	    _classCallCheck(this, Console);
	
	    var _this = _possibleConstructorReturn(this, _Component.call(this, props));
	
	    _this.limit = 13;
	    _this.state = {
	      history: [{ text: 'Hi, welcome on my homepage. Type \'help\' to get a list of all available commands.' }]
	    };
	
	    _this.print = _this.print.bind(_this);
	    return _this;
	  }
	
	  Console.prototype.print = function () {
	    var _ref = _asyncToGenerator(function* (command) {
	      var state = this.state;
	
	      state.history.push({ text: [command] });
	
	      if (command === 'clear') {
	        state.history = [];
	      } else {
	        var response = (0, _consoleEngine2.default)(command);
	        yield response.text.forEach(function (text) {
	          return state.history.push({ type: response.type, text: text });
	        });
	        if (state.history.length >= this.limit) {
	          state.history = state.history.splice(state.history.length - this.limit, state.history.length - 1);
	        }
	      }
	
	      this.setState(state);
	    });
	
	    function print(_x) {
	      return _ref.apply(this, arguments);
	    }
	
	    return print;
	  }();
	
	  Console.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'console' },
	      _react2.default.createElement(
	        'div',
	        { className: 'console__bar' },
	        _react2.default.createElement('div', { className: 'console__button console__button--close' }),
	        _react2.default.createElement('div', { className: 'console__button console__button--min' }),
	        _react2.default.createElement('div', { className: 'console__button console__button--max' })
	      ),
	      _react2.default.createElement(_ConsoleScreen2.default, { history: this.state.history }),
	      _react2.default.createElement(_ConsoleInput2.default, { handle: this.print })
	    );
	  };
	
	  return Console;
	}(_react.Component);
	
	exports.default = Console;
	module.exports = exports['default'];

/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(7);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ConsoleInput = function (_Component) {
	  _inherits(ConsoleInput, _Component);
	
	  function ConsoleInput(props) {
	    _classCallCheck(this, ConsoleInput);
	
	    var _this = _possibleConstructorReturn(this, _Component.call(this, props));
	
	    _this.state = {
	      value: ""
	    };
	    _this.handleSubmit = _this.handleSubmit.bind(_this);
	    _this.handleChange = _this.handleChange.bind(_this);
	    return _this;
	  }
	
	  ConsoleInput.prototype.handleSubmit = function handleSubmit(e) {
	    e.preventDefault();
	    if (this.state.value === '') {
	      return;
	    }
	
	    this.props.handle(this.state.value);
	    var state = this.state;
	    state.value = "";
	    this.setState(state);
	  };
	
	  ConsoleInput.prototype.handleChange = function handleChange(e) {
	    this.setState({ value: e.target.value });
	  };
	
	  ConsoleInput.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'console__input' },
	      _react2.default.createElement(
	        'form',
	        { onSubmit: this.handleSubmit },
	        _react2.default.createElement('input', { className: 'console__input', onChange: this.handleChange, value: this.state.value, placeholder: 'Type here', type: 'text' })
	      )
	    );
	  };
	
	  return ConsoleInput;
	}(_react.Component);
	
	ConsoleInput.propTypes = {
	  handle: _propTypes2.default.func.isRequired
	};
	
	exports.default = ConsoleInput;
	module.exports = exports['default'];

/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(7);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ConsoleScreen = function (_React$Component) {
	  _inherits(ConsoleScreen, _React$Component);
	
	  function ConsoleScreen() {
	    _classCallCheck(this, ConsoleScreen);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  ConsoleScreen.prototype.render = function render() {
	    var history = this.props.history;
	
	
	    console.log("HIST", history);
	    return _react2.default.createElement(
	      'div',
	      { className: 'console__screen-wrapper' },
	      _react2.default.createElement(
	        'div',
	        { className: 'console__screen' },
	        history.map(function (line) {
	          return _react2.default.createElement('div', {
	            key: Math.random(),
	            className: 'console__line ' + (line.type ? 'console__line--' + line.type : ""),
	            dangerouslySetInnerHTML: { __html: line.text } });
	        })
	      )
	    );
	  };
	
	  return ConsoleScreen;
	}(_react2.default.Component);
	
	ConsoleScreen.propTypes = {
	  history: _propTypes2.default.array.isRequired
	};
	
	exports.default = ConsoleScreen;
	module.exports = exports['default'];

/***/ }),

/***/ 270:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _gatsbyLink = __webpack_require__(136);
	
	var _gatsbyLink2 = _interopRequireDefault(_gatsbyLink);
	
	var _Console = __webpack_require__(182);
	
	var _Console2 = _interopRequireDefault(_Console);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var IndexPage = function IndexPage() {
	  return _react2.default.createElement(
	    'div',
	    { className: 'page' },
	    _react2.default.createElement(
	      'h1',
	      { className: 'title' },
	      '{ konrad jarosinski }'
	    ),
	    _react2.default.createElement(
	      'p',
	      { className: 'text-muted subtitle' },
	      'Front-end/UX Developer'
	    ),
	    _react2.default.createElement(_Console2.default, null)
	  );
	};
	
	exports.default = IndexPage;
	module.exports = exports['default'];

/***/ }),

/***/ 303:
/***/ (function(module, exports) {

	module.exports = [{"cmd":"help","response":{"type":"info","text":["Welcome on my homepage.","Try one of these commands:","-------------","about - Who am I and what I do","projects - Projects that I've built","github - Find me on github","linkedin - My LinkedIn profile","source - Source code for this page","contact - Get in touch","clear - clear the window"]}},{"cmd":"test","response":{"text":["Usage: test [something]"]},"children":[{"cmd":"something","response":{"text":["this is testing something"]}}]},{"cmd":"about","response":{"text":["My name is Konrad, and I'm a passionate Front-end/UX web developer.","Mostly, I work with Node/ES6, React.js, and GraphQL, but","I also have experience with PHP (Symfony), Golang and C#.","In my free time, I spend my time with family and also building little"," projects like this one."]}},{"cmd":"welcome","response":{"text":["Hi, welcome on my homepage. Type 'help' to get a list of all available commands."]}},{"cmd":"projects","response":{"text":["Here's a list of the projects that I've built over time:","<a href='https://typitap.com' target='_blank'>typitap</a> - online type racing game","<a href='https://github.com/iKonrad/gatsby-source-directus' target='_blank'>gatsby-source-directus</a> - a source plugin for gatsby and directus","messpace - online post-it note application","mailileo - random pen-friend finding platform","<a href='https://steamcommunity.com/sharedfiles/filedetails/?id=244656044' target='_blank'>river town</a> - 3D farming role play game"]}},{"cmd":"github","response":{"text":[""]},"fn":"openGithub"},{"cmd":"linkedin","response":{"text":[""]},"fn":"openLinkedin"},{"cmd":"source","response":{"text":[""]},"fn":"openSource"},{"cmd":"contact","response":{"text":["Feel free to get in touch on e-mail address: <a href='mailto:konrad@jarosinski.uk'>konrad@jarosinski.uk</a>"]}}]

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _commands = __webpack_require__(303);
	
	var _commands2 = _interopRequireDefault(_commands);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (window !== undefined) {
	  window['openGithub'] = function () {
	    var win = window.open('https://github.com/iKonrad', '_blank');
	    win.focus();
	  };
	
	  window['openSource'] = function () {
	    var win = window.open('https://github.com/iKonrad/iKonrad.github.io', '_blank');
	    win.focus();
	  };
	
	  window['openLinkedin'] = function () {
	    var win = window.open('https://linkedin.com/in/konrad-jarosiński-2194b1a4/', '_blank');
	    win.focus();
	  };
	}
	
	var runFunction = function runFunction(name) {
	  var fn = window[name];
	  if (typeof fn === "function") fn();
	};
	
	exports.default = function (cmd) {
	  // First, let's split the commands by space to get access to sub-commands
	  var commands = cmd.split(' ');
	
	  // Iterate through commands and check if there's a corresponding command
	  var filtered = _commands2.default;
	  var level = 0;
	
	  /* Go through all the top-level commands and find either a response object or children.
	   If children is found, overwrite the filtered variable and repeat the search */
	  do {
	    filtered = filtered.filter(function (tempCommand) {
	      return tempCommand.cmd === commands[level];
	    });
	    filtered = filtered.length ? filtered[0] : undefined;
	
	    if (filtered) {
	      // Check if the command has any children
	      if (filtered.children !== undefined) {
	        /*
	          Okay, so there are some child commands in here.
	          Now, let's check if the command has any more items left and if it does,
	          we can scan through children as well
	         */
	        if (level + 1 < commands.length) {
	          filtered = filtered.children;
	        } else {
	          return filtered.response;
	        }
	      } else {
	        // If the command is found and it's the last command item, return it
	        if (filtered.cmd !== undefined && level + 1 >= commands.length) {
	          // Check if there's any function associated with it and run it.
	          if (filtered.fn !== undefined) {
	            runFunction(filtered.fn);
	          }
	          return filtered.response;
	        } else {
	          return getError(cmd);
	        }
	      }
	      level++;
	    }
	  } while (filtered);
	
	  return getError(cmd);
	};
	
	var getError = function getError(cmd) {
	  return {
	    type: 'error',
	    text: ['Command not found. Type \'help\' to get available commands']
	  };
	};
	module.exports = exports['default'];

/***/ })

});
//# sourceMappingURL=component---src-pages-index-js-3eebc21f97feb0ed4d56.js.map