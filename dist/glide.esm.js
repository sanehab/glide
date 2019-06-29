/*!
 * Glide.js v3.3.0
 * (c) 2013-2019 Jędrzej Chałubek <jedrzej.chalubek@gmail.com> (http://jedrzejchalubek.com/)
 * Released under the MIT License.
 */

var defaults = {
  /**
   * Type of the movement.
   *
   * Available types:
   * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
   * `carousel` - Changes slides without starting over when it reaches the first or last slide.
   *
   * @type {String}
   */
  type: 'slider',

  /**
   * Start at specific slide number defined with zero-based index.
   *
   * @type {Number}
   */
  startAt: 0,

  /**
   * A number of slides visible on the single viewport.
   *
   * @type {Number}
   */
  perView: 1,

  /**
   * Focus currently active slide at a specified position in the track.
   *
   * Available inputs:
   * `center` - Current slide will be always focused at the center of a track.
   * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
   *
   * @type {String|Number}
   */
  focusAt: 0,

  /**
   * A size of the gap added between slides.
   *
   * @type {Number}
   */
  gap: 10,

  /**
   * Change slides after a specified interval. Use `false` for turning off autoplay.
   *
   * @type {Number|Boolean}
   */
  autoplay: false,

  /**
   * Stop autoplay on mouseover event.
   *
   * @type {Boolean}
   */
  hoverpause: true,

  /**
   * Allow for changing slides with left and right keyboard arrows.
   *
   * @type {Boolean}
   */
  keyboard: true,

  /**
   * Stop running `perView` number of slides from the end. Use this
   * option if you don't want to have an empty space after
   * a slider. Works only with `slider` type and a
   * non-centered `focusAt` setting.
   *
   * @type {Boolean}
   */
  bound: false,

  /**
   * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
   *
   * @type {Number|Boolean}
   */
  swipeThreshold: 80,

  /**
   * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
   *
   * @type {Number|Boolean}
   */
  dragThreshold: 120,

  /**
   * A maximum number of slides to which movement will be made on swiping or dragging. Use `false` for unlimited.
   *
   * @type {Number|Boolean}
   */
  perTouch: false,

  /**
   * Moving distance ratio of the slides on a swiping and dragging.
   *
   * @type {Number}
   */
  touchRatio: 0.5,

  /**
   * Angle required to activate slides moving on swiping or dragging.
   *
   * @type {Number}
   */
  touchAngle: 45,

  /**
   * Duration of the animation in milliseconds.
   *
   * @type {Number}
   */
  animationDuration: 400,

  /**
   * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
   *
   * @type {Boolean}
   */
  rewind: true,

  /**
   * Duration of the rewinding animation of the `slider` type in milliseconds.
   *
   * @type {Number}
   */
  rewindDuration: 800,

  /**
   * Easing function for the animation.
   *
   * @type {String}
   */
  animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',

  /**
   * Wait for the animation to finish until the next user input can be processed
   *
   * @type {boolean}
   */
  waitForTransition: true,

  /**
   * Throttle costly events at most once per every wait milliseconds.
   *
   * @type {Number}
   */
  throttle: 10,

  /**
   * Moving direction mode.
   *
   * Available inputs:
   * - 'ltr' - left to right movement,
   * - 'rtl' - right to left movement.
   *
   * @type {String}
   */
  direction: 'ltr',

  /**
   * The distance value of the next and previous viewports which
   * have to peek in the current view. Accepts number and
   * pixels as a string. Left and right peeking can be
   * set up separately with a directions object.
   *
   * For example:
   * `100` - Peek 100px on the both sides.
   * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
   *
   * @type {Number|String|Object}
   */
  peek: 0,

  /**
   * Collection of options applied at specified media breakpoints.
   * For example: display two slides per view under 800px.
   * `{
   *   '800px': {
   *     perView: 2
   *   }
   * }`
   */
  breakpoints: {},

  /**
   * Collection of internally used HTML classes.
   *
   * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
   * @type {Object}
   */
  classes: {
    direction: {
      ltr: 'glide--ltr',
      rtl: 'glide--rtl'
    },
    slider: 'glide--slider',
    carousel: 'glide--carousel',
    swipeable: 'glide--swipeable',
    dragging: 'glide--dragging',
    cloneSlide: 'glide__slide--clone',
    activeNav: 'glide__bullet--active',
    activeSlide: 'glide__slide--active',
    disabledArrow: 'glide__arrow--disabled'
  }
};

/**
 * Outputs warning message to the bowser console.
 *
 * @param  {String} msg
 * @return {Void}
 */
function warn(msg) {
  console.error("[Glide warn]: " + msg);
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Converts value entered as number
 * or string to integer value.
 *
 * @param {String} value
 * @returns {Number}
 */
function toInt(value) {
  return parseInt(value);
}

/**
 * Converts value entered as number
 * or string to flat value.
 *
 * @param {String} value
 * @returns {Number}
 */
function toFloat(value) {
  return parseFloat(value);
}

/**
 * Indicates whether the specified value is a string.
 *
 * @param  {*}   value
 * @return {Boolean}
 */
function isString(value) {
  return typeof value === 'string';
}

/**
 * Indicates whether the specified value is an object.
 *
 * @param  {*} value
 * @return {Boolean}
 *
 * @see https://github.com/jashkenas/underscore
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

  return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
}

/**
 * Indicates whether the specified value is a number.
 *
 * @param  {*} value
 * @return {Boolean}
 */
function isNumber(value) {
  return typeof value === 'number';
}

/**
 * Indicates whether the specified value is a function.
 *
 * @param  {*} value
 * @return {Boolean}
 */
function isFunction(value) {
  return typeof value === 'function';
}

/**
 * Indicates whether the specified value is undefined.
 *
 * @param  {*} value
 * @return {Boolean}
 */
function isUndefined(value) {
  return typeof value === 'undefined';
}

/**
 * Indicates whether the specified value is an array.
 *
 * @param  {*} value
 * @return {Boolean}
 */
function isArray(value) {
  return value.constructor === Array;
}

/**
 * Creates and initializes specified collection of extensions.
 * Each extension receives access to instance of glide and rest of components.
 *
 * @param {Object} glide
 * @param {Object} extensions
 *
 * @returns {Object}
 */
function mount(glide, extensions, events) {
  var components = {};

  for (var name in extensions) {
    if (isFunction(extensions[name])) {
      components[name] = extensions[name](glide, components, events);
    } else {
      warn('Extension must be a function');
    }
  }

  for (var _name in components) {
    if (isFunction(components[_name].mount)) {
      components[_name].mount();
    }
  }

  return components;
}

/**
 * Defines getter and setter property on the specified object.
 *
 * @param  {Object} obj         Object where property has to be defined.
 * @param  {String} prop        Name of the defined property.
 * @param  {Object} definition  Get and set definitions for the property.
 * @return {Void}
 */
function define(obj, prop, definition) {
  Object.defineProperty(obj, prop, definition);
}

/**
 * Sorts aphabetically object keys.
 *
 * @param  {Object} obj
 * @return {Object}
 */
function sortKeys(obj) {
  return Object.keys(obj).sort().reduce(function (r, k) {
    r[k] = obj[k];

    return r[k], r;
  }, {});
}

/**
 * Merges passed settings object with default options.
 *
 * @param  {Object} defaults
 * @param  {Object} settings
 * @return {Object}
 */
function mergeOptions(defaults, settings) {
  var options = _extends({}, defaults, settings);

  // `Object.assign` do not deeply merge objects, so we
  // have to do it manually for every nested object
  // in options. Although it does not look smart,
  // it's smaller and faster than some fancy
  // merging deep-merge algorithm script.
  if (settings.hasOwnProperty('classes')) {
    options.classes = _extends({}, defaults.classes, settings.classes);

    if (settings.classes.hasOwnProperty('direction')) {
      options.classes.direction = _extends({}, defaults.classes.direction, settings.classes.direction);
    }
  }

  if (settings.hasOwnProperty('breakpoints')) {
    options.breakpoints = _extends({}, defaults.breakpoints, settings.breakpoints);
  }

  return options;
}

var EventsBus = function () {
  /**
   * Construct a EventBus instance.
   *
   * @param {Object} events
   */
  function EventsBus() {
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, EventsBus);

    this.events = events;
    this.hop = events.hasOwnProperty;
  }

  /**
   * Adds listener to the specifed event.
   *
   * @param {String|Array} event
   * @param {Function} handler
   */


  createClass(EventsBus, [{
    key: 'on',
    value: function on(event, handler) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.on(event[i], handler);
        }
      }

      // Create the event's object if not yet created
      if (!this.hop.call(this.events, event)) {
        this.events[event] = [];
      }

      // Add the handler to queue
      var index = this.events[event].push(handler) - 1;

      // Provide handle back for removal of event
      return {
        remove: function remove() {
          delete this.events[event][index];
        }
      };
    }

    /**
     * Runs registered handlers for specified event.
     *
     * @param {String|Array} event
     * @param {Object=} context
     */

  }, {
    key: 'emit',
    value: function emit(event, context) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.emit(event[i], context);
        }
      }

      // If the event doesn't exist, or there's no handlers in queue, just leave
      if (!this.hop.call(this.events, event)) {
        return;
      }

      // Cycle through events queue, fire!
      this.events[event].forEach(function (item) {
        item(context || {});
      });
    }
  }]);
  return EventsBus;
}();

console.log("glide 3");

var Glide = function () {
  /**
   * Construct glide.
   *
   * @param  {String} selector
   * @param  {Object} options
   */
  function Glide(selector) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Glide);

    this._c = {};
    this._t = [];
    this._e = new EventsBus();

    this.disabled = false;
    this.selector = selector;
    this.settings = mergeOptions(defaults, options);
    this.index = this.settings.startAt;
  }

  /**
   * Initializes glide.
   *
   * @param {Object} extensions Collection of extensions to initialize.
   * @return {Glide}
   */


  createClass(Glide, [{
    key: "mount",
    value: function mount$$1() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._e.emit("mount.before");

      if (isObject(extensions)) {
        this._c = mount(this, extensions, this._e);
      } else {
        warn("You need to provide a object on `mount()`");
      }

      this._e.emit("mount.after");

      return this;
    }

    /**
     * Collects an instance `translate` transformers.
     *
     * @param  {Array} transformers Collection of transformers.
     * @return {Void}
     */

  }, {
    key: "mutate",
    value: function mutate() {
      var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (isArray(transformers)) {
        this._t = transformers;
      } else {
        warn("You need to provide a array on `mutate()`");
      }

      return this;
    }

    /**
     * Updates glide with specified settings.
     *
     * @param {Object} settings
     * @return {Glide}
     */

  }, {
    key: "update",
    value: function update() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.settings = mergeOptions(this.settings, settings);

      if (settings.hasOwnProperty("startAt")) {
        this.index = settings.startAt;
      }

      this._e.emit("update");

      return this;
    }

    /**
     * Change slide with specified pattern. A pattern must be in the special format:
     * `>` - Move one forward
     * `<` - Move one backward
     * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
     * `>>` - Rewinds to end (last slide)
     * `<<` - Rewinds to start (first slide)
     *
     * @param {String} pattern
     * @return {Glide}
     */

  }, {
    key: "go",
    value: function go(pattern) {
      this._c.Run.make(pattern);

      return this;
    }

    /**
     * Move track by specified distance.
     *
     * @param {String} distance
     * @return {Glide}
     */

  }, {
    key: "move",
    value: function move(distance) {
      this._c.Transition.disable();
      this._c.Move.make(distance);

      return this;
    }

    /**
     * Destroy instance and revert all changes done by this._c.
     *
     * @return {Glide}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this._e.emit("destroy");

      return this;
    }

    /**
     * Start instance autoplaying.
     *
     * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Glide}
     */

  }, {
    key: "play",
    value: function play() {
      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (interval) {
        this.settings.autoplay = interval;
      }

      this._e.emit("play");

      return this;
    }

    /**
     * Stop instance autoplaying.
     *
     * @return {Glide}
     */

  }, {
    key: "pause",
    value: function pause() {
      this._e.emit("pause");

      return this;
    }

    /**
     * Sets glide into a idle status.
     *
     * @return {Glide}
     */

  }, {
    key: "disable",
    value: function disable() {
      this.disabled = true;

      return this;
    }

    /**
     * Sets glide into a active status.
     *
     * @return {Glide}
     */

  }, {
    key: "enable",
    value: function enable() {
      this.disabled = false;

      return this;
    }

    /**
     * Adds cuutom event listener with handler.
     *
     * @param  {String|Array} event
     * @param  {Function} handler
     * @return {Glide}
     */

  }, {
    key: "on",
    value: function on(event, handler) {
      this._e.on(event, handler);

      return this;
    }

    /**
     * Checks if glide is a precised type.
     *
     * @param  {String} name
     * @return {Boolean}
     */

  }, {
    key: "isType",
    value: function isType(name) {
      return this.settings.type === name;
    }

    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */

  }, {
    key: "settings",
    get: function get$$1() {
      return this._o;
    }

    /**
     * Sets value of the core options.
     *
     * @param  {Object} o
     * @return {Void}
     */
    ,
    set: function set$$1(o) {
      if (isObject(o)) {
        this._o = o;
      } else {
        warn("Options must be an `object` instance.");
      }
    }

    /**
     * Gets current index of the slider.
     *
     * @return {Object}
     */

  }, {
    key: "index",
    get: function get$$1() {
      return this._i;
    }

    /**
     * Sets current index a slider.
     *
     * @return {Object}
     */
    ,
    set: function set$$1(i) {
      this._i = toInt(i);
    }

    /**
     * Gets type name of the slider.
     *
     * @return {String}
     */

  }, {
    key: "type",
    get: function get$$1() {
      return this.settings.type;
    }

    /**
     * Gets value of the idle status.
     *
     * @return {Boolean}
     */

  }, {
    key: "disabled",
    get: function get$$1() {
      return this._d;
    }

    /**
     * Sets value of the idle status.
     *
     * @return {Boolean}
     */
    ,
    set: function set$$1(status) {
      this._d = !!status;
    }
  }]);
  return Glide;
}();

function Run (Glide, Components, Events) {
  var Run = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {Void}
     */
    mount: function mount() {
      this._o = false;
    },


    /**
     * Makes glides running based on the passed moving schema.
     *
     * @param {String} move
     */
    make: function make(move) {
      var _this = this;

      if (!Glide.disabled) {
        !Glide.settings.waitForTransition || Glide.disable();

        this.move = move;

        Events.emit('run.before', this.move);

        this.calculate();

        Events.emit('run', this.move);

        Components.Transition.after(function () {
          if (_this.isStart()) {
            Events.emit('run.start', _this.move);
          }

          if (_this.isEnd()) {
            Events.emit('run.end', _this.move);
          }

          if (_this.isOffset()) {
            _this._o = false;

            Events.emit('run.offset', _this.move);
          }

          Events.emit('run.after', _this.move);

          Glide.enable();
        });
      }
    },


    /**
     * Calculates current index based on defined move.
     *
     * @return {Number|Undefined}
     */
    calculate: function calculate() {
      var move = this.move,
          length = this.length;
      var steps = move.steps,
          direction = move.direction;

      // By default assume that size of view is equal to one slide

      var viewSize = 1;
      // Determine if steps are numeric value
      var countableSteps = isNumber(toInt(steps)) && toInt(steps) !== 0;

      // While direction is `=` we want jump to
      // a specified index described in steps.
      if (direction === '=') {
        Glide.index = steps;

        return;
      }

      // When pattern is equal to `>>` we want
      // fast forward to the last slide.
      if (direction === '>' && steps === '>') {
        Glide.index = length;

        return;
      }

      // When pattern is equal to `<<` we want
      // fast forward to the first slide.
      if (direction === '<' && steps === '<') {
        Glide.index = 0;

        return;
      }

      // While steps is a numeric value and we
      // move forward by the number of steps.
      if (direction === '>' && countableSteps) {
        viewSize = toInt(steps) * -1;
      }

      // $steps< (drag) movement
      if (direction === '<' && countableSteps) {
        viewSize = toInt(steps);
      }

      // pagination movement
      if (direction === '|') {
        viewSize = Glide.settings.perView || 1;
      }

      // we are moving forward
      if (direction === '>' || direction === '|' && steps === '>') {
        var index = calculateForwardIndex(viewSize);

        if (index > length) {
          this._o = true;
        }

        Glide.index = normalizeForwardIndex(index, viewSize);

        return;
      }

      // we are moving backward
      if (direction === '<' || direction === '|' && steps === '<') {
        var _index = calculateBackwardIndex(viewSize);

        if (_index < 0) {
          this._o = true;
        }

        Glide.index = normalizeBackwardIndex(_index, viewSize);

        return;
      }

      warn('Invalid direction pattern [' + direction + steps + '] has been used');
    },


    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart: function isStart() {
      return Glide.index <= 0;
    },


    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */
    isEnd: function isEnd() {
      return Glide.index >= this.length;
    },


    /**
     * Checks if we are making a offset run.
     *
     * @param {String} direction
     * @return {Boolean}
     */
    isOffset: function isOffset() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      if (!direction) {
        return this._o;
      }

      if (!this._o) {
        return false;
      }

      // did we view to the right?
      if (direction === '|>') {
        return this.move.direction === '|' && this.move.steps === '>';
      }

      // did we view to the left?
      if (direction === '|<') {
        return this.move.direction === '|' && this.move.steps === '<';
      }

      return this.move.direction === direction;
    },


    /**
     * Checks if bound mode is active
     *
     * @return {Boolean}
     */
    isBound: function isBound() {
      return Glide.isType('slider') && Glide.settings.focusAt !== 'center' && Glide.settings.bound;
    }
  };

  /**
   * Returns index value to move forward/to the right
   *
   * @param viewSize
   * @returns {Number}
   */
  function calculateForwardIndex(viewSize) {
    var index = Glide.index;


    if (Glide.isType('carousel')) {
      return index + viewSize;
    }

    return index + (viewSize - index % viewSize);
  }

  /**
   * Normalizes the given forward index based on glide settings, preventing it to exceed certain boundaries
   *
   * @param index
   * @param length
   * @param viewSize
   * @returns {Number}
   */
  function normalizeForwardIndex(index, viewSize) {
    var length = Run.length;


    if (index <= length) {
      return index;
    }

    if (Glide.isType('carousel')) {
      return index - (length + 1);
    }

    if (Glide.settings.rewind) {
      // bound does funny things with the length, therefor we have to be certain
      // that we are on the last possible index value given by bound
      if (Run.isBound() && !Run.isEnd()) {
        return length;
      }

      return 0;
    }

    if (Run.isBound()) {
      return length;
    }

    return Math.floor(length / viewSize) * viewSize;
  }

  /**
   * Calculates index value to move backward/to the left
   *
   * @param viewSize
   * @returns {Number}
   */
  function calculateBackwardIndex(viewSize) {
    var index = Glide.index;


    if (Glide.isType('carousel')) {
      return index - viewSize;
    }

    // ensure our back navigation results in the same index as a forward navigation
    // to experience a homogeneous paging
    var view = Math.ceil(index / viewSize);

    return (view - 1) * viewSize;
  }

  /**
   * Normalizes the given backward index based on glide settings, preventing it to exceed certain boundaries
   *
   * @param index
   * @param length
   * @param viewSize
   * @returns {*}
   */
  function normalizeBackwardIndex(index, viewSize) {
    var length = Run.length;


    if (index >= 0) {
      return index;
    }

    if (Glide.isType('carousel')) {
      return index + (length + 1);
    }

    if (Glide.settings.rewind) {
      // bound does funny things with the length, therefor we have to be certain
      // that we are on first possible index value before we to rewind to the length given by bound
      if (Run.isBound() && Run.isStart()) {
        return length;
      }

      return Math.floor(length / viewSize) * viewSize;
    }

    return 0;
  }

  define(Run, 'move', {
    /**
     * Gets value of the move schema.
     *
     * @returns {Object}
     */
    get: function get() {
      return this._m;
    },


    /**
     * Sets value of the move schema.
     *
     * @returns {Object}
     */
    set: function set(value) {
      var step = value.substr(1);

      this._m = {
        direction: value.substr(0, 1),
        steps: step ? toInt(step) ? toInt(step) : step : 0
      };
    }
  });

  define(Run, 'length', {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide.settings;
      var length = Components.Html.slides.length;

      // If the `bound` option is active, a maximum running distance should be
      // reduced by `perView` and `focusAt` settings. Running distance
      // should end before creating an empty space after instance.

      if (this.isBound()) {
        return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
      }

      return length - 1;
    }
  });

  define(Run, 'offset', {
    /**
     * Gets status of the offsetting flag.
     *
     * @return {Boolean}
     */
    get: function get() {
      return this._o;
    }
  });

  return Run;
}

/**
 * Returns a current time.
 *
 * @return {Number}
 */
function now() {
  return new Date().getTime();
}

/**
 * Returns a function, that, when invoked, will only be triggered
 * at most once during a given window of time.
 *
 * @param {Function} func
 * @param {Number} wait
 * @param {Object=} options
 * @return {Function}
 *
 * @see https://github.com/jashkenas/underscore
 */
function throttle(func, wait, options) {
  var timeout = void 0,
      context = void 0,
      args = void 0,
      result = void 0;
  var previous = 0;
  if (!options) options = {};

  var later = function later() {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function throttled() {
    var at = now();
    if (!previous && options.leading === false) previous = at;
    var remaining = wait - (at - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = at;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}

var MARGIN_TYPE = {
  ltr: ['marginLeft', 'marginRight'],
  rtl: ['marginRight', 'marginLeft']
};

function Gaps (Glide, Components, Events) {
  var Gaps = {
    /**
     * Applies gaps between slides. First and last
     * slides do not receive it's edge margins.
     *
     * @param {HTMLCollection} slides
     * @return {Void}
     */
    apply: function apply(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;
        var direction = Components.Direction.value;

        if (i !== 0) {
          style[MARGIN_TYPE[direction][0]] = this.value / 2 + 'px';
        } else {
          style[MARGIN_TYPE[direction][0]] = '';
        }

        if (i !== slides.length - 1) {
          style[MARGIN_TYPE[direction][1]] = this.value / 2 + 'px';
        } else {
          style[MARGIN_TYPE[direction][1]] = '';
        }
      }
    },


    /**
     * Removes gaps from the slides.
     *
     * @param {HTMLCollection} slides
     * @returns {Void}
    */
    remove: function remove(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style = slides[i].style;

        style.marginLeft = '';
        style.marginRight = '';
      }
    }
  };

  define(Gaps, 'value', {
    /**
     * Gets value of the gap.
     *
     * @returns {Number}
     */
    get: function get() {
      return toInt(Glide.settings.gap);
    }
  });

  define(Gaps, 'grow', {
    /**
     * Gets additional dimentions value caused by gaps.
     * Used to increase width of the slides wrapper.
     *
     * @returns {Number}
     */
    get: function get() {
      return Gaps.value * Components.Sizes.length;
    }
  });

  define(Gaps, 'reductor', {
    /**
     * Gets reduction value caused by gaps.
     * Used to subtract width of the slides.
     *
     * @returns {Number}
     */
    get: function get() {
      var perView = Glide.settings.perView;

      return Gaps.value * (perView - 1) / perView;
    }
  });

  /**
   * Apply calculated gaps:
   * - after building, so slides (including clones) will receive proper margins
   * - on updating via API, to recalculate gaps with new options
   */
  Events.on(['build.after', 'update'], throttle(function () {
    Gaps.apply(Components.Html.wrapper.children);
  }, 30));

  /**
   * Remove gaps:
   * - on destroying to bring markup to its inital state
   */
  Events.on('destroy', function () {
    Gaps.remove(Components.Html.wrapper.children);
  });

  return Gaps;
}

/**
 * Finds siblings nodes of the passed node.
 *
 * @param  {Element} node
 * @return {Array}
 */
function siblings(node) {
  if (node && node.parentNode) {
    var n = node.parentNode.firstChild;
    var matched = [];

    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== node) {
        matched.push(n);
      }
    }

    return matched;
  }

  return [];
}

/**
 * Checks if passed node exist and is a valid element.
 *
 * @param  {Element} node
 * @return {Boolean}
 */
function exist(node) {
  if (node && node instanceof window.HTMLElement) {
    return true;
  }

  return false;
}

var TRACK_SELECTOR = '[data-glide-el="track"]';

function Html (Glide, Components) {
  var Html = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    mount: function mount() {
      this.root = Glide.selector;
      this.track = this.root.querySelector(TRACK_SELECTOR);
      this.slides = Array.prototype.slice.call(this.wrapper.children).filter(function (slide) {
        return !slide.classList.contains(Glide.settings.classes.cloneSlide);
      });
    }
  };

  define(Html, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get: function get() {
      return Html._r;
    },


    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set: function set(r) {
      if (isString(r)) {
        r = document.querySelector(r);
      }

      if (exist(r)) {
        Html._r = r;
      } else {
        warn('Root element must be a existing Html node');
      }
    }
  });

  define(Html, 'track', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function get() {
      return Html._t;
    },


    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function set(t) {
      if (exist(t)) {
        Html._t = t;
      } else {
        warn('Could not find track element. Please use ' + TRACK_SELECTOR + ' attribute.');
      }
    }
  });

  define(Html, 'wrapper', {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get: function get() {
      return Html.track.children[0];
    }
  });

  return Html;
}

function Peek (Glide, Components, Events) {
  var Peek = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.value = Glide.settings.peek;
    }
  };

  define(Peek, 'value', {
    /**
     * Gets value of the peek.
     *
     * @returns {Number|Object}
     */
    get: function get() {
      return Peek._v;
    },


    /**
     * Sets value of the peek.
     *
     * @param {Number|Object} value
     * @return {Void}
     */
    set: function set(value) {
      if (isObject(value)) {
        value.before = toInt(value.before);
        value.after = toInt(value.after);
      } else {
        value = toInt(value);
      }

      Peek._v = value;
    }
  });

  define(Peek, 'reductor', {
    /**
     * Gets reduction value caused by peek.
     *
     * @returns {Number}
     */
    get: function get() {
      var value = Peek.value;
      var perView = Glide.settings.perView;

      if (isObject(value)) {
        return value.before / perView + value.after / perView;
      }

      return value * 2 / perView;
    }
  });

  /**
   * Recalculate peeking sizes on:
   * - when resizing window to update to proper percents
   */
  Events.on(['resize', 'update'], function () {
    Peek.mount();
  });

  return Peek;
}

function Move (Glide, Components, Events) {
  var Move = {
    /**
     * Constructs move component.
     *
     * @returns {Void}
     */
    mount: function mount() {
      this._o = 0;
    },


    /**
     * Calculates a movement value based on passed offset and currently active index.
     *
     * @param  {Number} offset
     * @return {Void}
     */
    make: function make() {
      var _this = this;

      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.offset = offset;

      Events.emit('move', {
        movement: this.value
      });

      Components.Transition.after(function () {
        Events.emit('move.after', {
          movement: _this.value
        });
      });
    }
  };

  define(Move, 'offset', {
    /**
     * Gets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    get: function get() {
      return Move._o;
    },


    /**
     * Sets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    set: function set(value) {
      Move._o = !isUndefined(value) ? toInt(value) : 0;
    }
  });

  define(Move, 'translate', {
    /**
     * Gets a raw movement value.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Sizes.slideWidth * Glide.index;
    }
  });

  define(Move, 'value', {
    /**
     * Gets an actual movement value corrected by offset.
     *
     * @return {Number}
     */
    get: function get() {
      var offset = this.offset;
      var translate = this.translate;

      if (Components.Direction.is('rtl')) {
        return translate + offset;
      }

      return translate - offset;
    }
  });

  /**
   * Make movement to proper slide on:
   * - before build, so glide will start at `startAt` index
   * - on each standard run to move to newly calculated index
   */
  Events.on(['build.before', 'run'], function () {
    Move.make();
  });

  return Move;
}

function Sizes (Glide, Components, Events) {
  var Sizes = {
    /**
     * Setups dimentions of slides.
     *
     * @return {Void}
     */
    setupSlides: function setupSlides() {
      var width = this.slideWidth + 'px';
      var slides = Components.Html.slides;

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = width;
      }
    },


    /**
     * Setups dimentions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper: function setupWrapper() {
      Components.Html.wrapper.style.width = this.wrapperSize + 'px';
    },


    /**
     * Removes applied styles from HTML elements.
     *
     * @returns {Void}
     */
    remove: function remove() {
      var slides = Components.Html.slides;

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = '';
      }

      Components.Html.wrapper.style.width = '';
    }
  };

  define(Sizes, 'length', {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.slides.length;
    }
  });

  define(Sizes, 'width', {
    /**
     * Gets width value of the slider (visible area).
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.root.offsetWidth;
    }
  });

  define(Sizes, 'wrapperSize', {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes.slideWidth * Sizes.length + Components.Gaps.grow + Components.Clones.grow;
    }
  });

  define(Sizes, 'slideWidth', {
    /**
     * Gets width value of a single slide.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes.width / Glide.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
    }
  });

  /**
   * Apply calculated glide's dimensions:
   * - before building, so other dimentions (e.g. translate) will be calculated propertly
   * - when resizing window to recalculate sildes dimensions
   * - on updating via API, to calculate dimensions based on new options
   */
  Events.on(['build.before', 'resize', 'update'], function () {
    Sizes.setupSlides();
    Sizes.setupWrapper();
  });

  /**
   * Remove calculated glide's dimensions:
   * - on destoting to bring markup to its inital state
   */
  Events.on('destroy', function () {
    Sizes.remove();
  });

  return Sizes;
}

function Build (Glide, Components, Events) {
  var Build = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     *
     * @return {Void}
     */
    mount: function mount() {
      Events.emit('build.before');

      this.typeClass();
      this.activeClass();

      Events.emit('build.after');
    },


    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */
    typeClass: function typeClass() {
      Components.Html.root.classList.add(Glide.settings.classes[Glide.settings.type]);
    },


    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass: function activeClass() {
      var classes = Glide.settings.classes;
      var slide = Components.Html.slides[Glide.index];

      if (slide) {
        slide.classList.add(classes.activeSlide);

        siblings(slide).forEach(function (sibling) {
          sibling.classList.remove(classes.activeSlide);
        });
      }
    },


    /**
     * Removes HTML classes applied at building.
     *
     * @return {Void}
     */
    removeClasses: function removeClasses() {
      var classes = Glide.settings.classes;

      Components.Html.root.classList.remove(classes[Glide.settings.type]);

      Components.Html.slides.forEach(function (sibling) {
        sibling.classList.remove(classes.activeSlide);
      });
    }
  };

  /**
   * Clear building classes:
   * - on destroying to bring HTML to its initial state
   * - on updating to remove classes before remounting component
   */
  Events.on(['destroy', 'update'], function () {
    Build.removeClasses();
  });

  /**
   * Remount component:
   * - on resizing of the window to calculate new dimentions
   * - on updating settings via API
   */
  Events.on(['resize', 'update'], function () {
    Build.mount();
  });

  /**
   * Swap active class of current slide:
   * - after each move to the new index
   */
  Events.on('move.after', function () {
    Build.activeClass();
  });

  return Build;
}

function Clones (Glide, Components, Events) {
  var Clones = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount: function mount() {
      this.items = [];

      if (Glide.isType('carousel')) {
        this.items = this.collect();
      }
    },


    /**
     * Collect clones with pattern.
     *
     * @return {[]}
     */
    collect: function collect() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var slides = Components.Html.slides;
      var _Glide$settings = Glide.settings,
          perView = _Glide$settings.perView,
          classes = _Glide$settings.classes;


      var peekIncrementer = +!!Glide.settings.peek;
      var cloneCount = perView + peekIncrementer + Math.round(perView / 2);
      var append = slides.slice(0, cloneCount).reverse();
      var prepend = slides.slice(cloneCount * -1);

      for (var r = 0; r < Math.max(1, Math.floor(perView / slides.length)); r++) {
        for (var i = 0; i < append.length; i++) {
          var clone = append[i].cloneNode(true);

          clone.classList.add(classes.cloneSlide);

          items.push(clone);
        }

        for (var _i = 0; _i < prepend.length; _i++) {
          var _clone = prepend[_i].cloneNode(true);

          _clone.classList.add(classes.cloneSlide);

          items.unshift(_clone);
        }
      }

      return items;
    },


    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append: function append() {
      var items = this.items;
      var _Components$Html = Components.Html,
          wrapper = _Components$Html.wrapper,
          slides = _Components$Html.slides;


      var half = Math.floor(items.length / 2);
      var prepend = items.slice(0, half).reverse();
      var append = items.slice(half * -1).reverse();
      var width = Components.Sizes.slideWidth + 'px';

      for (var i = 0; i < append.length; i++) {
        wrapper.appendChild(append[i]);
      }

      for (var _i2 = 0; _i2 < prepend.length; _i2++) {
        wrapper.insertBefore(prepend[_i2], slides[0]);
      }

      for (var _i3 = 0; _i3 < items.length; _i3++) {
        items[_i3].style.width = width;
      }
    },


    /**
     * Remove all cloned slides.
     *
     * @return {Void}
     */
    remove: function remove() {
      var items = this.items;


      for (var i = 0; i < items.length; i++) {
        Components.Html.wrapper.removeChild(items[i]);
      }
    }
  };

  define(Clones, 'grow', {
    /**
     * Gets additional dimentions value caused by clones.
     *
     * @return {Number}
     */
    get: function get() {
      return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length;
    }
  });

  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */
  Events.on('update', function () {
    Clones.remove();
    Clones.mount();
    Clones.append();
  });

  /**
   * Append additional slide's clones:
   * - while glide's type is `carousel`
   */
  Events.on('build.before', function () {
    if (Glide.isType('carousel')) {
      Clones.append();
    }
  });

  /**
   * Remove clones HTMLElements:
   * - on destroying, to bring HTML to its initial state
   */
  Events.on('destroy', function () {
    Clones.remove();
  });

  return Clones;
}

var EventsBinder = function () {
  /**
   * Construct a EventsBinder instance.
   */
  function EventsBinder() {
    var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, EventsBinder);

    this.listeners = listeners;
  }

  /**
   * Adds events listeners to arrows HTML elements.
   *
   * @param  {String|Array} events
   * @param  {Element|Window|Document} el
   * @param  {Function} closure
   * @param  {Boolean|Object} capture
   * @return {Void}
   */


  createClass(EventsBinder, [{
    key: 'on',
    value: function on(events, el, closure) {
      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (isString(events)) {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        this.listeners[events[i]] = closure;

        el.addEventListener(events[i], this.listeners[events[i]], capture);
      }
    }

    /**
     * Removes event listeners from arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Boolean|Object} capture
     * @return {Void}
     */

  }, {
    key: 'off',
    value: function off(events, el) {
      var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (isString(events)) {
        events = [events];
      }

      for (var i = 0; i < events.length; i++) {
        el.removeEventListener(events[i], this.listeners[events[i]], capture);
      }
    }

    /**
     * Destroy collected listeners.
     *
     * @returns {Void}
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      delete this.listeners;
    }
  }]);
  return EventsBinder;
}();

function Resize (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  var Resize = {
    /**
     * Initializes window bindings.
     */
    mount: function mount() {
      this.bind();
    },


    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('resize', window, throttle(function () {
        Events.emit('resize');
      }, Glide.settings.throttle));
    },


    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('resize', window);
    }
  };

  /**
   * Remove bindings from window:
   * - on destroying, to remove added EventListener
   */
  Events.on('destroy', function () {
    Resize.unbind();
    Binder.destroy();
  });

  return Resize;
}

var VALID_DIRECTIONS = ['ltr', 'rtl'];
var FLIPED_MOVEMENTS = {
  '>': '<',
  '<': '>',
  '=': '='
};

function Direction (Glide, Components, Events) {
  var Direction = {
    /**
     * Setups gap value based on settings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.value = Glide.settings.direction;
    },


    /**
     * Resolves pattern based on direction value
     *
     * @param {String} pattern
     * @returns {String}
     */
    resolve: function resolve(pattern) {
      var token = pattern.slice(0, 1);

      if (this.is('rtl')) {
        return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
      }

      return pattern;
    },


    /**
     * Checks value of direction mode.
     *
     * @param {String} direction
     * @returns {Boolean}
     */
    is: function is(direction) {
      return this.value === direction;
    },


    /**
     * Applies direction class to the root HTML element.
     *
     * @return {Void}
     */
    addClass: function addClass() {
      Components.Html.root.classList.add(Glide.settings.classes.direction[this.value]);
    },


    /**
     * Removes direction class from the root HTML element.
     *
     * @return {Void}
     */
    removeClass: function removeClass() {
      Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value]);
    }
  };

  define(Direction, 'value', {
    /**
     * Gets value of the direction.
     *
     * @returns {Number}
     */
    get: function get() {
      return Direction._v;
    },


    /**
     * Sets value of the direction.
     *
     * @param {String} value
     * @return {Void}
     */
    set: function set(value) {
      if (VALID_DIRECTIONS.indexOf(value) > -1) {
        Direction._v = value;
      } else {
        warn('Direction value must be `ltr` or `rtl`');
      }
    }
  });

  /**
   * Clear direction class:
   * - on destroy to bring HTML to its initial state
   * - on update to remove class before reappling bellow
   */
  Events.on(['destroy', 'update'], function () {
    Direction.removeClass();
  });

  /**
   * Remount component:
   * - on update to reflect changes in direction value
   */
  Events.on('update', function () {
    Direction.mount();
  });

  /**
   * Apply direction class:
   * - before building to apply class for the first time
   * - on updating to reapply direction class that may changed
   */
  Events.on(['build.before', 'update'], function () {
    Direction.addClass();
  });

  return Direction;
}

/**
 * Reflects value of glide movement.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Rtl (Glide, Components) {
  return {
    /**
     * Negates the passed translate if glide is in RTL option.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Components.Direction.is('rtl')) {
        return -translate;
      }

      return translate;
    }
  };
}

/**
 * Updates glide movement with a `gap` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Gap (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with number in the `gap` settings.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      var multiplier = Math.floor(translate / Components.Sizes.slideWidth);
      return translate + Components.Gaps.value * multiplier;
    }
  };
}

/**
 * Updates glide movement with width of additional clones width.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Grow (Glide, Components) {
  return {
    /**
     * Adds to the passed translate width of the half of clones.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      return translate + Components.Clones.grow / 2;
    }
  };
}

/**
 * Updates glide movement with a `peek` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Peeking (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with a `peek` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Glide.settings.focusAt >= 0) {
        var peek = Components.Peek.value;

        if (isObject(peek)) {
          return translate - peek.before;
        }

        return translate - peek;
      }

      return translate;
    }
  };
}

/**
 * Updates glide movement with a `focusAt` settings.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function Focusing (Glide, Components) {
  return {
    /**
     * Modifies passed translate value with index in the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      var gap = Components.Gaps.value;
      var width = Components.Sizes.width;
      var focusAt = Glide.settings.focusAt;
      var slideWidth = Components.Sizes.slideWidth;

      if (focusAt === 'center') {
        return translate - (width / 2 - slideWidth / 2);
      }

      return translate - slideWidth * focusAt - gap * focusAt;
    }
  };
}

/**
 * Applies diffrent transformers on translate value.
 *
 * @param  {Object} Glide
 * @param  {Object} Components
 * @return {Object}
 */
function mutator (Glide, Components, Events) {
  /**
   * Merge instance transformers with collection of default transformers.
   * It's important that the Rtl component be last on the list,
   * so it reflects all previous transformations.
   *
   * @type {Array}
   */
  var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);

  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    mutate: function mutate(translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        var transformer = TRANSFORMERS[i];

        if (isFunction(transformer) && isFunction(transformer().modify)) {
          translate = transformer(Glide, Components, Events).modify(translate);
        } else {
          warn('Transformer should be a function that returns an object with `modify()` method');
        }
      }

      return translate;
    }
  };
}

function Translate (Glide, Components, Events) {
  var Translate = {
    /**
     * Sets value of translate on HTML element.
     *
     * @param {Number} value
     * @return {Void}
     */
    set: function set(value) {
      var transform = mutator(Glide, Components).mutate(value);

      Components.Html.wrapper.style.transform = 'translate3d(' + -1 * transform + 'px, 0px, 0px)';
    },


    /**
     * Removes value of translate from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transform = '';
    },


    /**
     * @return {number}
     */
    getStartIndex: function getStartIndex() {
      var length = Components.Sizes.length;
      var index = Glide.index;
      var perView = Glide.settings.perView;

      if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
        return length + (index - perView);
      }

      // "modulo length" converts an index that equals length to zero
      return (index + perView) % length;
    },


    /**
     * @return {number}
     */
    getTravelDistance: function getTravelDistance() {
      var travelDistance = Components.Sizes.slideWidth * Glide.settings.perView;

      if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
        // reverse travel distance so that we don't have to change subtract operations
        return travelDistance * -1;
      }

      return travelDistance;
    }
  };

  /**
   * Set new translate value:
   * - on move to reflect index change
   * - on updating via API to reflect possible changes in options
   */
  Events.on('move', function (context) {
    if (!Glide.isType('carousel') || !Components.Run.isOffset()) {
      return Translate.set(context.movement);
    }

    Components.Transition.after(function () {
      Events.emit('translate.jump');

      Translate.set(Components.Sizes.slideWidth * Glide.index);
    });

    var startWidth = Components.Sizes.slideWidth * Components.Translate.getStartIndex();
    return Translate.set(startWidth - Components.Translate.getTravelDistance());
  });

  /**
   * Remove translate:
   * - on destroying to bring markup to its inital state
   */
  Events.on('destroy', function () {
    Translate.remove();
  });

  return Translate;
}

function Transition (Glide, Components, Events) {
  /**
   * Holds inactivity status of transition.
   * When true transition is not applied.
   *
   * @type {Boolean}
   */
  var disabled = false;

  var Transition = {
    /**
     * Composes string of the CSS transition.
     *
     * @param {String} property
     * @return {String}
     */
    compose: function compose(property) {
      var settings = Glide.settings;

      if (!disabled) {
        return property + ' ' + this.duration + 'ms ' + settings.animationTimingFunc;
      }

      return property + ' 0ms ' + settings.animationTimingFunc;
    },


    /**
     * Sets value of transition on HTML element.
     *
     * @param {String=} property
     * @return {Void}
     */
    set: function set() {
      var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';

      Components.Html.wrapper.style.transition = this.compose(property);
    },


    /**
     * Removes value of transition from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transition = '';
    },


    /**
     * Runs callback after animation.
     *
     * @param  {Function} callback
     * @return {Void}
     */
    after: function after(callback) {
      setTimeout(function () {
        callback();
      }, this.duration);
    },


    /**
     * Enable transition.
     *
     * @return {Void}
     */
    enable: function enable() {
      disabled = false;

      this.set();
    },


    /**
     * Disable transition.
     *
     * @return {Void}
     */
    disable: function disable() {
      disabled = true;

      this.set();
    }
  };

  define(Transition, 'duration', {
    /**
     * Gets duration of the transition based
     * on currently running animation type.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide.settings;

      if (Glide.isType('slider') && Components.Run.offset) {
        return settings.rewindDuration;
      }

      return settings.animationDuration;
    }
  });

  /**
   * Set transition `style` value:
   * - on each moving, because it may be cleared by offset move
   */
  Events.on('move', function () {
    Transition.set();
  });

  /**
   * Disable transition:
   * - before initial build to avoid transitioning from `0` to `startAt` index
   * - while resizing window and recalculating dimentions
   * - on jumping from offset transition at start and end edges in `carousel` type
   */
  Events.on(['build.before', 'resize', 'translate.jump'], function () {
    Transition.disable();
  });

  /**
   * Enable transition:
   * - on each running, because it may be disabled by offset move
   */
  Events.on('run', function () {
    Transition.enable();
  });

  /**
   * Remove transition:
   * - on destroying to bring markup to its inital state
   */
  Events.on('destroy', function () {
    Transition.remove();
  });

  return Transition;
}

/**
 * Test via a getter in the options object to see
 * if the passive property is accessed.
 *
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
 */

var supportsPassive = false;

try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });

  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch (e) {}

var supportsPassive$1 = supportsPassive;

var START_EVENTS = ['touchstart', 'mousedown'];
var MOVE_EVENTS = ['touchmove', 'mousemove'];
var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];

function Swipe (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  var swipeSin = 0;
  var swipeStartX = 0;
  var swipeStartY = 0;
  var disabled = false;
  var capture = supportsPassive$1 ? { passive: true } : false;

  var Swipe = {
    /**
     * Initializes swipe bindings.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.bindSwipeStart();
    },


    /**
     * Handler for `swipestart` event. Calculates entry points of the user's tap.
     *
     * @param {Object} event
     * @return {Void}
     */
    start: function start(event) {
      if (!disabled && !Glide.disabled) {
        this.disable();

        var swipe = this.touches(event);

        swipeSin = null;
        swipeStartX = toInt(swipe.pageX);
        swipeStartY = toInt(swipe.pageY);

        this.bindSwipeMove();
        this.bindSwipeEnd();

        Events.emit('swipe.start');
      }
    },


    /**
     * Handler for `swipemove` event. Calculates user's tap angle and distance.
     *
     * @param {Object} event
     */
    move: function move(event) {
      if (!Glide.disabled) {
        var _Glide$settings = Glide.settings,
            touchAngle = _Glide$settings.touchAngle,
            touchRatio = _Glide$settings.touchRatio,
            classes = _Glide$settings.classes;


        var swipe = this.touches(event);

        var subExSx = toInt(swipe.pageX) - swipeStartX;
        var subEySy = toInt(swipe.pageY) - swipeStartY;
        var powEX = Math.abs(subExSx << 2);
        var powEY = Math.abs(subEySy << 2);
        var swipeHypotenuse = Math.sqrt(powEX + powEY);
        var swipeCathetus = Math.sqrt(powEY);

        swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

        if (swipeSin * 180 / Math.PI < touchAngle) {
          event.stopPropagation();

          Components.Move.make(subExSx * toFloat(touchRatio));

          Components.Html.root.classList.add(classes.dragging);

          Events.emit('swipe.move');
        } else {
          return false;
        }
      }
    },


    /**
     * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
     *
     * @param {Object} event
     * @return {Void}
     */
    end: function end(event) {
      if (!Glide.disabled) {
        var settings = Glide.settings;

        var swipe = this.touches(event);
        var threshold = this.threshold(event);

        var swipeDistance = swipe.pageX - swipeStartX;
        var swipeDeg = swipeSin * 180 / Math.PI;
        var steps = Math.round(swipeDistance / Components.Sizes.slideWidth);

        this.enable();

        if (swipeDistance > threshold && swipeDeg < settings.touchAngle) {
          // While swipe is positive and greater than threshold move backward.
          if (settings.perTouch) {
            steps = Math.min(steps, toInt(settings.perTouch));
          }

          if (Components.Direction.is('rtl')) {
            steps = -steps;
          }

          Components.Run.make(Components.Direction.resolve('<' + steps));
        } else if (swipeDistance < -threshold && swipeDeg < settings.touchAngle) {
          // While swipe is negative and lower than negative threshold move forward.
          if (settings.perTouch) {
            steps = Math.max(steps, -toInt(settings.perTouch));
          }

          if (Components.Direction.is('rtl')) {
            steps = -steps;
          }

          Components.Run.make(Components.Direction.resolve('>' + steps));
        } else {
          // While swipe don't reach distance apply previous transform.
          Components.Move.make();
        }

        Components.Html.root.classList.remove(settings.classes.dragging);

        this.unbindSwipeMove();
        this.unbindSwipeEnd();

        Events.emit('swipe.end');
      }
    },


    /**
     * Binds swipe's starting event.
     *
     * @return {Void}
     */
    bindSwipeStart: function bindSwipeStart() {
      var _this = this;

      var settings = Glide.settings;

      if (settings.swipeThreshold) {
        Binder.on(START_EVENTS[0], Components.Html.wrapper, function (event) {
          _this.start(event);
        }, capture);
      }

      if (settings.dragThreshold) {
        Binder.on(START_EVENTS[1], Components.Html.wrapper, function (event) {
          _this.start(event);
        }, capture);
      }
    },


    /**
     * Unbinds swipe's starting event.
     *
     * @return {Void}
     */
    unbindSwipeStart: function unbindSwipeStart() {
      Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
      Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
    },


    /**
     * Binds swipe's moving event.
     *
     * @return {Void}
     */
    bindSwipeMove: function bindSwipeMove() {
      var _this2 = this;

      Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function (event) {
        _this2.move(event);
      }, Glide.settings.throttle), capture);
    },


    /**
     * Unbinds swipe's moving event.
     *
     * @return {Void}
     */
    unbindSwipeMove: function unbindSwipeMove() {
      Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
    },


    /**
     * Binds swipe's ending event.
     *
     * @return {Void}
     */
    bindSwipeEnd: function bindSwipeEnd() {
      var _this3 = this;

      Binder.on(END_EVENTS, Components.Html.wrapper, function (event) {
        _this3.end(event);
      });
    },


    /**
     * Unbinds swipe's ending event.
     *
     * @return {Void}
     */
    unbindSwipeEnd: function unbindSwipeEnd() {
      Binder.off(END_EVENTS, Components.Html.wrapper);
    },


    /**
     * Normalizes event touches points accorting to different types.
     *
     * @param {Object} event
     */
    touches: function touches(event) {
      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return event;
      }

      return event.touches[0] || event.changedTouches[0];
    },


    /**
     * Gets value of minimum swipe distance settings based on event type.
     *
     * @return {Number}
     */
    threshold: function threshold(event) {
      var settings = Glide.settings;

      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return settings.dragThreshold;
      }

      return settings.swipeThreshold;
    },


    /**
     * Enables swipe event.
     *
     * @return {self}
     */
    enable: function enable() {
      disabled = false;

      Components.Transition.enable();

      return this;
    },


    /**
     * Disables swipe event.
     *
     * @return {self}
     */
    disable: function disable() {
      disabled = true;

      Components.Transition.disable();

      return this;
    }
  };

  /**
   * Add component class:
   * - after initial building
   */
  Events.on('build.after', function () {
    Components.Html.root.classList.add(Glide.settings.classes.swipeable);
  });

  /**
   * Remove swiping bindings:
   * - on destroying, to remove added EventListeners
   */
  Events.on('destroy', function () {
    Swipe.unbindSwipeStart();
    Swipe.unbindSwipeMove();
    Swipe.unbindSwipeEnd();
    Binder.destroy();
  });

  return Swipe;
}

function Images (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  var Images = {
    /**
     * Binds listener to glide wrapper.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.bind();
    },


    /**
     * Binds `dragstart` event on wrapper to prevent dragging images.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
    },


    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('dragstart', Components.Html.wrapper);
    },


    /**
     * Event handler. Prevents dragging.
     *
     * @return {Void}
     */
    dragstart: function dragstart(event) {
      event.preventDefault();
    }
  };

  /**
   * Remove bindings from images:
   * - on destroying, to remove added EventListeners
   */
  Events.on('destroy', function () {
    Images.unbind();
    Binder.destroy();
  });

  return Images;
}

function Anchors (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  /**
   * Holds detaching status of anchors.
   * Prevents detaching of already detached anchors.
   *
   * @private
   * @type {Boolean}
   */
  var detached = false;

  /**
   * Holds preventing status of anchors.
   * If `true` redirection after click will be disabled.
   *
   * @private
   * @type {Boolean}
   */
  var prevented = false;

  var Anchors = {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    mount: function mount() {
      /**
       * Holds collection of anchors elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._a = Components.Html.wrapper.querySelectorAll('a');

      this.bind();
    },


    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('click', Components.Html.wrapper, this.click);
    },


    /**
     * Unbinds events attached to anchors inside a track.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('click', Components.Html.wrapper);
    },


    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */
    click: function click(event) {
      if (prevented) {
        event.stopPropagation();
        event.preventDefault();
      }
    },


    /**
     * Detaches anchors click event inside glide.
     *
     * @return {self}
     */
    detach: function detach() {
      prevented = true;

      if (!detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = false;

          this.items[i].setAttribute('data-href', this.items[i].getAttribute('href'));

          this.items[i].removeAttribute('href');
        }

        detached = true;
      }

      return this;
    },


    /**
     * Attaches anchors click events inside glide.
     *
     * @return {self}
     */
    attach: function attach() {
      prevented = false;

      if (detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = true;

          this.items[i].setAttribute('href', this.items[i].getAttribute('data-href'));
        }

        detached = false;
      }

      return this;
    }
  };

  define(Anchors, 'items', {
    /**
     * Gets collection of the arrows HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Anchors._a;
    }
  });

  /**
   * Detach anchors inside slides:
   * - on swiping, so they won't redirect to its `href` attributes
   */
  Events.on('swipe.move', function () {
    Anchors.detach();
  });

  /**
   * Attach anchors inside slides:
   * - after swiping and transitions ends, so they can redirect after click again
   */
  Events.on('swipe.end', function () {
    Components.Transition.after(function () {
      Anchors.attach();
    });
  });

  /**
   * Unbind anchors inside slides:
   * - on destroying, to bring anchors to its initial state
   */
  Events.on('destroy', function () {
    Anchors.attach();
    Anchors.unbind();
    Binder.destroy();
  });

  return Anchors;
}

var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';

function Controls (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  var capture = supportsPassive$1 ? { passive: true } : false;

  var Controls = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    mount: function mount() {
      /**
       * Collection of navigation HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);

      /**
       * Collection of controls HTML elements.
       *
       * @private
       * @type {HTMLCollection}
       */
      this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);

      this.addBindings();
    },


    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    setActive: function setActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.addClass(this._n[i].children);
      }
    },


    /**
     * Removes active class to current slide.
     *
     * @return {Void}
     */
    removeActive: function removeActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.removeClass(this._n[i].children);
      }
    },


    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    addClass: function addClass(controls) {
      var settings = Glide.settings;
      var item = controls[Glide.index];

      if (item) {
        item.classList.add(settings.classes.activeNav);

        siblings(item).forEach(function (sibling) {
          sibling.classList.remove(settings.classes.activeNav);
        });
      }
    },


    /**
     * Removes active class from active control.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    removeClass: function removeClass(controls) {
      var item = controls[Glide.index];

      if (item) {
        item.classList.remove(Glide.settings.classes.activeNav);
      }
    },


    /**
     * Adds handles to the each group of controls.
     *
     * @return {Void}
     */
    addBindings: function addBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.bind(this._c[i].children);
      }
    },


    /**
     * Removes handles from the each group of controls.
     *
     * @return {Void}
     */
    removeBindings: function removeBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.unbind(this._c[i].children);
      }
    },


    /**
     * Binds events to arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    bind: function bind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.on('click', elements[i], this.click);
        Binder.on('touchstart', elements[i], this.click, capture);
      }
    },


    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    unbind: function unbind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.off(['click', 'touchstart'], elements[i]);
      }
    },


    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in driection precised in
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {Void}
     */
    click: function click(event) {
      event.preventDefault();

      Components.Run.make(Components.Direction.resolve(event.currentTarget.getAttribute('data-glide-dir')));
    }
  };

  define(Controls, 'items', {
    /**
     * Gets collection of the controls HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Controls._c;
    }
  });

  /**
   * Swap active class of current navigation item:
   * - after mounting to set it to initial index
   * - after each move to the new index
   */
  Events.on(['mount.after', 'move.after'], function () {
    Controls.setActive();
  });

  /**
   * Remove bindings and HTML Classes:
   * - on destroying, to bring markup to its initial state
   */
  Events.on('destroy', function () {
    Controls.removeBindings();
    Controls.removeActive();
    Binder.destroy();
  });

  return Controls;
}

function Keyboard (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  var Keyboard = {
    /**
     * Binds keyboard events on component mount.
     *
     * @return {Void}
     */
    mount: function mount() {
      if (Glide.settings.keyboard) {
        this.bind();
      }
    },


    /**
     * Adds keyboard press events.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on('keyup', document, this.press);
    },


    /**
     * Removes keyboard press events.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off('keyup', document);
    },


    /**
     * Handles keyboard's arrows press and moving glide foward and backward.
     *
     * @param  {Object} event
     * @return {Void}
     */
    press: function press(event) {
      if (event.keyCode === 39) {
        Components.Run.make(Components.Direction.resolve('>'));
      }

      if (event.keyCode === 37) {
        Components.Run.make(Components.Direction.resolve('<'));
      }
    }
  };

  /**
   * Remove bindings from keyboard:
   * - on destroying to remove added events
   * - on updating to remove events before remounting
   */
  Events.on(['destroy', 'update'], function () {
    Keyboard.unbind();
  });

  /**
   * Remount component
   * - on updating to reflect potential changes in settings
   */
  Events.on('update', function () {
    Keyboard.mount();
  });

  /**
   * Destroy binder:
   * - on destroying to remove listeners
   */
  Events.on('destroy', function () {
    Binder.destroy();
  });

  return Keyboard;
}

function Autoplay (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  var Autoplay = {
    /**
     * Initializes autoplaying and events.
     *
     * @return {Void}
     */
    mount: function mount() {
      this.start();

      if (Glide.settings.hoverpause) {
        this.bind();
      }
    },


    /**
     * Starts autoplaying in configured interval.
     *
     * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Void}
     */
    start: function start() {
      var _this = this;

      if (Glide.settings.autoplay) {
        if (isUndefined(this._i)) {
          this._i = setInterval(function () {
            _this.stop();

            Components.Run.make('>');

            _this.start();
          }, this.time);
        }
      }
    },


    /**
     * Stops autorunning of the glide.
     *
     * @return {Void}
     */
    stop: function stop() {
      this._i = clearInterval(this._i);
    },


    /**
     * Stops autoplaying while mouse is over glide's area.
     *
     * @return {Void}
     */
    bind: function bind() {
      var _this2 = this;

      Binder.on('mouseover', Components.Html.root, function () {
        _this2.stop();
      });

      Binder.on('mouseout', Components.Html.root, function () {
        _this2.start();
      });
    },


    /**
     * Unbind mouseover events.
     *
     * @returns {Void}
     */
    unbind: function unbind() {
      Binder.off(['mouseover', 'mouseout'], Components.Html.root);
    }
  };

  define(Autoplay, 'time', {
    /**
     * Gets time period value for the autoplay interval. Prioritizes
     * times in `data-glide-autoplay` attrubutes over options.
     *
     * @return {Number}
     */
    get: function get() {
      var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');

      if (autoplay) {
        return toInt(autoplay);
      }

      return toInt(Glide.settings.autoplay);
    }
  });

  /**
   * Stop autoplaying and unbind events:
   * - on destroying, to clear defined interval
   * - on updating via API to reset interval that may changed
   */
  Events.on(['destroy', 'update'], function () {
    Autoplay.unbind();
  });

  /**
   * Stop autoplaying:
   * - before each run, to restart autoplaying
   * - on pausing via API
   * - on destroying, to clear defined interval
   * - while starting a swipe
   * - on updating via API to reset interval that may changed
   */
  Events.on(['run.before', 'pause', 'destroy', 'swipe.start', 'update'], function () {
    Autoplay.stop();
  });

  /**
   * Start autoplaying:
   * - after each run, to restart autoplaying
   * - on playing via API
   * - while ending a swipe
   */
  Events.on(['run.after', 'play', 'swipe.end'], function () {
    Autoplay.start();
  });

  /**
   * Remount autoplaying:
   * - on updating via API to reset interval that may changed
   */
  Events.on('update', function () {
    Autoplay.mount();
  });

  /**
   * Destroy a binder:
   * - on destroying glide instance to clearup listeners
   */
  Events.on('destroy', function () {
    Binder.destroy();
  });

  return Autoplay;
}

/**
 * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
 *
 * @param {Object} points
 * @returns {Object}
 */
function sortBreakpoints(points) {
  if (isObject(points)) {
    return sortKeys(points);
  } else {
    warn('Breakpoints option must be an object');
  }

  return {};
}

function Breakpoints (Glide, Components, Events) {
  /**
   * Instance of the binder for DOM Events.
   *
   * @type {EventsBinder}
   */
  var Binder = new EventsBinder();

  /**
   * Holds reference to settings.
   *
   * @type {Object}
   */
  var settings = Glide.settings;

  /**
   * Holds reference to breakpoints object in settings. Sorts breakpoints
   * from smaller to larger. It is required in order to proper
   * matching currently active breakpoint settings.
   *
   * @type {Object}
   */
  var points = sortBreakpoints(settings.breakpoints);

  /**
   * Cache initial settings before overwritting.
   *
   * @type {Object}
   */
  var defaults = _extends({}, settings);

  var Breakpoints = {
    /**
     * Matches settings for currectly matching media breakpoint.
     *
     * @param {Object} points
     * @returns {Object}
     */
    match: function match(points) {
      if (typeof window.matchMedia !== 'undefined') {
        for (var point in points) {
          if (points.hasOwnProperty(point)) {
            if (window.matchMedia('(max-width: ' + point + 'px)').matches) {
              return points[point];
            }
          }
        }
      }

      return defaults;
    }
  };

  /**
   * Overwrite instance settings with currently matching breakpoint settings.
   * This happens right after component initialization.
   */
  _extends(settings, Breakpoints.match(points));

  /**
   * Update glide with settings of matched brekpoint:
   * - window resize to update slider
   */
  Binder.on('resize', window, throttle(function () {
    Glide.settings = mergeOptions(settings, Breakpoints.match(points));
  }, Glide.settings.throttle));

  /**
   * Resort and update default settings:
   * - on reinit via API, so breakpoint matching will be performed with options
   */
  Events.on('update', function () {
    points = sortBreakpoints(points);

    defaults = _extends({}, settings);
  });

  /**
   * Unbind resize listener:
   * - on destroying, to bring markup to its initial state
   */
  Events.on('destroy', function () {
    Binder.off('resize', window);
  });

  return Breakpoints;
}

var COMPONENTS = {
  // Required
  Html: Html,
  Translate: Translate,
  Transition: Transition,
  Direction: Direction,
  Peek: Peek,
  Sizes: Sizes,
  Gaps: Gaps,
  Move: Move,
  Clones: Clones,
  Resize: Resize,
  Build: Build,
  Run: Run,

  // Optional
  Swipe: Swipe,
  Images: Images,
  Anchors: Anchors,
  Controls: Controls,
  Keyboard: Keyboard,
  Autoplay: Autoplay,
  Breakpoints: Breakpoints
};

var Glide$1 = function (_Core) {
  inherits(Glide$$1, _Core);

  function Glide$$1() {
    classCallCheck(this, Glide$$1);
    return possibleConstructorReturn(this, (Glide$$1.__proto__ || Object.getPrototypeOf(Glide$$1)).apply(this, arguments));
  }

  createClass(Glide$$1, [{
    key: 'mount',
    value: function mount() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return get(Glide$$1.prototype.__proto__ || Object.getPrototypeOf(Glide$$1.prototype), 'mount', this).call(this, _extends({}, COMPONENTS, extensions));
    }
  }]);
  return Glide$$1;
}(Glide);

export default Glide$1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xpZGUuZXNtLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZGVmYXVsdHMuanMiLCIuLi9zcmMvdXRpbHMvbG9nLmpzIiwiLi4vc3JjL3V0aWxzL3VuaXQuanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyIsIi4uL3NyYy91dGlscy9vYmplY3QuanMiLCIuLi9zcmMvY29yZS9ldmVudC9ldmVudHMtYnVzLmpzIiwiLi4vc3JjL2luZGV4LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcnVuLmpzIiwiLi4vc3JjL3V0aWxzL3RpbWUuanMiLCIuLi9zcmMvdXRpbHMvd2FpdC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2dhcHMuanMiLCIuLi9zcmMvdXRpbHMvZG9tLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvaHRtbC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3BlZWsuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tb3ZlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvc2l6ZXMuanMiLCIuLi9zcmMvY29tcG9uZW50cy9idWlsZC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2Nsb25lcy5qcyIsIi4uL3NyYy9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZXNpemUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9kaXJlY3Rpb24uanMiLCIuLi9zcmMvbXV0YXRvci90cmFuc2Zvcm1lcnMvcnRsLmpzIiwiLi4vc3JjL211dGF0b3IvdHJhbnNmb3JtZXJzL2dhcC5qcyIsIi4uL3NyYy9tdXRhdG9yL3RyYW5zZm9ybWVycy9ncm93LmpzIiwiLi4vc3JjL211dGF0b3IvdHJhbnNmb3JtZXJzL3BlZWtpbmcuanMiLCIuLi9zcmMvbXV0YXRvci90cmFuc2Zvcm1lcnMvZm9jdXNpbmcuanMiLCIuLi9zcmMvbXV0YXRvci9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3RyYW5zbGF0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3RyYW5zaXRpb24uanMiLCIuLi9zcmMvdXRpbHMvZGV0ZWN0LXBhc3NpdmUtZXZlbnQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9zd2lwZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2ltYWdlcy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2FuY2hvcnMuanMiLCIuLi9zcmMvY29tcG9uZW50cy9jb250cm9scy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2tleWJvYXJkLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvYXV0b3BsYXkuanMiLCIuLi9zcmMvY29tcG9uZW50cy9icmVha3BvaW50cy5qcyIsIi4uL2VudHJ5L2VudHJ5LWNvbXBsZXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFR5cGUgb2YgdGhlIG1vdmVtZW50LlxuICAgKlxuICAgKiBBdmFpbGFibGUgdHlwZXM6XG4gICAqIGBzbGlkZXJgIC0gUmV3aW5kcyBzbGlkZXIgdG8gdGhlIHN0YXJ0L2VuZCB3aGVuIGl0IHJlYWNoZXMgdGhlIGZpcnN0IG9yIGxhc3Qgc2xpZGUuXG4gICAqIGBjYXJvdXNlbGAgLSBDaGFuZ2VzIHNsaWRlcyB3aXRob3V0IHN0YXJ0aW5nIG92ZXIgd2hlbiBpdCByZWFjaGVzIHRoZSBmaXJzdCBvciBsYXN0IHNsaWRlLlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgdHlwZTogJ3NsaWRlcicsXG5cbiAgLyoqXG4gICAqIFN0YXJ0IGF0IHNwZWNpZmljIHNsaWRlIG51bWJlciBkZWZpbmVkIHdpdGggemVyby1iYXNlZCBpbmRleC5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHN0YXJ0QXQ6IDAsXG5cbiAgLyoqXG4gICAqIEEgbnVtYmVyIG9mIHNsaWRlcyB2aXNpYmxlIG9uIHRoZSBzaW5nbGUgdmlld3BvcnQuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBwZXJWaWV3OiAxLFxuXG4gIC8qKlxuICAgKiBGb2N1cyBjdXJyZW50bHkgYWN0aXZlIHNsaWRlIGF0IGEgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoZSB0cmFjay5cbiAgICpcbiAgICogQXZhaWxhYmxlIGlucHV0czpcbiAgICogYGNlbnRlcmAgLSBDdXJyZW50IHNsaWRlIHdpbGwgYmUgYWx3YXlzIGZvY3VzZWQgYXQgdGhlIGNlbnRlciBvZiBhIHRyYWNrLlxuICAgKiBgMCwxLDIsMy4uLmAgLSBDdXJyZW50IHNsaWRlIHdpbGwgYmUgZm9jdXNlZCBvbiB0aGUgc3BlY2lmaWVkIHplcm8tYmFzZWQgaW5kZXguXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd8TnVtYmVyfVxuICAgKi9cbiAgZm9jdXNBdDogMCxcblxuICAvKipcbiAgICogQSBzaXplIG9mIHRoZSBnYXAgYWRkZWQgYmV0d2VlbiBzbGlkZXMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnYXA6IDEwLFxuXG4gIC8qKlxuICAgKiBDaGFuZ2Ugc2xpZGVzIGFmdGVyIGEgc3BlY2lmaWVkIGludGVydmFsLiBVc2UgYGZhbHNlYCBmb3IgdHVybmluZyBvZmYgYXV0b3BsYXkuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIGF1dG9wbGF5OiBmYWxzZSxcblxuICAvKipcbiAgICogU3RvcCBhdXRvcGxheSBvbiBtb3VzZW92ZXIgZXZlbnQuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgaG92ZXJwYXVzZTogdHJ1ZSxcblxuICAvKipcbiAgICogQWxsb3cgZm9yIGNoYW5naW5nIHNsaWRlcyB3aXRoIGxlZnQgYW5kIHJpZ2h0IGtleWJvYXJkIGFycm93cy5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBrZXlib2FyZDogdHJ1ZSxcblxuICAvKipcbiAgICogU3RvcCBydW5uaW5nIGBwZXJWaWV3YCBudW1iZXIgb2Ygc2xpZGVzIGZyb20gdGhlIGVuZC4gVXNlIHRoaXNcbiAgICogb3B0aW9uIGlmIHlvdSBkb24ndCB3YW50IHRvIGhhdmUgYW4gZW1wdHkgc3BhY2UgYWZ0ZXJcbiAgICogYSBzbGlkZXIuIFdvcmtzIG9ubHkgd2l0aCBgc2xpZGVyYCB0eXBlIGFuZCBhXG4gICAqIG5vbi1jZW50ZXJlZCBgZm9jdXNBdGAgc2V0dGluZy5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBib3VuZDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIE1pbmltYWwgc3dpcGUgZGlzdGFuY2UgbmVlZGVkIHRvIGNoYW5nZSB0aGUgc2xpZGUuIFVzZSBgZmFsc2VgIGZvciB0dXJuaW5nIG9mZiBhIHN3aXBpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIHN3aXBlVGhyZXNob2xkOiA4MCxcblxuICAvKipcbiAgICogTWluaW1hbCBtb3VzZSBkcmFnIGRpc3RhbmNlIG5lZWRlZCB0byBjaGFuZ2UgdGhlIHNsaWRlLiBVc2UgYGZhbHNlYCBmb3IgdHVybmluZyBvZmYgYSBkcmFnZ2luZy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgZHJhZ1RocmVzaG9sZDogMTIwLFxuXG4gIC8qKlxuICAgKiBBIG1heGltdW0gbnVtYmVyIG9mIHNsaWRlcyB0byB3aGljaCBtb3ZlbWVudCB3aWxsIGJlIG1hZGUgb24gc3dpcGluZyBvciBkcmFnZ2luZy4gVXNlIGBmYWxzZWAgZm9yIHVubGltaXRlZC5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgcGVyVG91Y2g6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBNb3ZpbmcgZGlzdGFuY2UgcmF0aW8gb2YgdGhlIHNsaWRlcyBvbiBhIHN3aXBpbmcgYW5kIGRyYWdnaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgdG91Y2hSYXRpbzogMC41LFxuXG4gIC8qKlxuICAgKiBBbmdsZSByZXF1aXJlZCB0byBhY3RpdmF0ZSBzbGlkZXMgbW92aW5nIG9uIHN3aXBpbmcgb3IgZHJhZ2dpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICB0b3VjaEFuZ2xlOiA0NSxcblxuICAvKipcbiAgICogRHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBhbmltYXRpb25EdXJhdGlvbjogNDAwLFxuXG4gIC8qKlxuICAgKiBBbGxvd3MgbG9vcGluZyB0aGUgYHNsaWRlcmAgdHlwZS4gU2xpZGVyIHdpbGwgcmV3aW5kIHRvIHRoZSBmaXJzdC9sYXN0IHNsaWRlIHdoZW4gaXQncyBhdCB0aGUgc3RhcnQvZW5kLlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIHJld2luZDogdHJ1ZSxcblxuICAvKipcbiAgICogRHVyYXRpb24gb2YgdGhlIHJld2luZGluZyBhbmltYXRpb24gb2YgdGhlIGBzbGlkZXJgIHR5cGUgaW4gbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgcmV3aW5kRHVyYXRpb246IDgwMCxcblxuICAvKipcbiAgICogRWFzaW5nIGZ1bmN0aW9uIGZvciB0aGUgYW5pbWF0aW9uLlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgYW5pbWF0aW9uVGltaW5nRnVuYzogJ2N1YmljLWJlemllciguMTY1LCAuODQwLCAuNDQwLCAxKScsXG5cbiAgLyoqXG4gICAqIFdhaXQgZm9yIHRoZSBhbmltYXRpb24gdG8gZmluaXNoIHVudGlsIHRoZSBuZXh0IHVzZXIgaW5wdXQgY2FuIGJlIHByb2Nlc3NlZFxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHdhaXRGb3JUcmFuc2l0aW9uOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBUaHJvdHRsZSBjb3N0bHkgZXZlbnRzIGF0IG1vc3Qgb25jZSBwZXIgZXZlcnkgd2FpdCBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICB0aHJvdHRsZTogMTAsXG5cbiAgLyoqXG4gICAqIE1vdmluZyBkaXJlY3Rpb24gbW9kZS5cbiAgICpcbiAgICogQXZhaWxhYmxlIGlucHV0czpcbiAgICogLSAnbHRyJyAtIGxlZnQgdG8gcmlnaHQgbW92ZW1lbnQsXG4gICAqIC0gJ3J0bCcgLSByaWdodCB0byBsZWZ0IG1vdmVtZW50LlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZGlyZWN0aW9uOiAnbHRyJyxcblxuICAvKipcbiAgICogVGhlIGRpc3RhbmNlIHZhbHVlIG9mIHRoZSBuZXh0IGFuZCBwcmV2aW91cyB2aWV3cG9ydHMgd2hpY2hcbiAgICogaGF2ZSB0byBwZWVrIGluIHRoZSBjdXJyZW50IHZpZXcuIEFjY2VwdHMgbnVtYmVyIGFuZFxuICAgKiBwaXhlbHMgYXMgYSBzdHJpbmcuIExlZnQgYW5kIHJpZ2h0IHBlZWtpbmcgY2FuIGJlXG4gICAqIHNldCB1cCBzZXBhcmF0ZWx5IHdpdGggYSBkaXJlY3Rpb25zIG9iamVjdC5cbiAgICpcbiAgICogRm9yIGV4YW1wbGU6XG4gICAqIGAxMDBgIC0gUGVlayAxMDBweCBvbiB0aGUgYm90aCBzaWRlcy5cbiAgICogeyBiZWZvcmU6IDEwMCwgYWZ0ZXI6IDUwIH1gIC0gUGVlayAxMDBweCBvbiB0aGUgbGVmdCBzaWRlIGFuZCA1MHB4IG9uIHRoZSByaWdodCBzaWRlLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfFN0cmluZ3xPYmplY3R9XG4gICAqL1xuICBwZWVrOiAwLFxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG9wdGlvbnMgYXBwbGllZCBhdCBzcGVjaWZpZWQgbWVkaWEgYnJlYWtwb2ludHMuXG4gICAqIEZvciBleGFtcGxlOiBkaXNwbGF5IHR3byBzbGlkZXMgcGVyIHZpZXcgdW5kZXIgODAwcHguXG4gICAqIGB7XG4gICAqICAgJzgwMHB4Jzoge1xuICAgKiAgICAgcGVyVmlldzogMlxuICAgKiAgIH1cbiAgICogfWBcbiAgICovXG4gIGJyZWFrcG9pbnRzOiB7fSxcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBpbnRlcm5hbGx5IHVzZWQgSFRNTCBjbGFzc2VzLlxuICAgKlxuICAgKiBAdG9kbyBSZWZhY3RvciBgc2xpZGVyYCBhbmQgYGNhcm91c2VsYCBwcm9wZXJ0aWVzIHRvIHNpbmdsZSBgdHlwZTogeyBzbGlkZXI6ICcnLCBjYXJvdXNlbDogJycgfWAgb2JqZWN0XG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBjbGFzc2VzOiB7XG4gICAgZGlyZWN0aW9uOiB7XG4gICAgICBsdHI6ICdnbGlkZS0tbHRyJyxcbiAgICAgIHJ0bDogJ2dsaWRlLS1ydGwnXG4gICAgfSxcbiAgICBzbGlkZXI6ICdnbGlkZS0tc2xpZGVyJyxcbiAgICBjYXJvdXNlbDogJ2dsaWRlLS1jYXJvdXNlbCcsXG4gICAgc3dpcGVhYmxlOiAnZ2xpZGUtLXN3aXBlYWJsZScsXG4gICAgZHJhZ2dpbmc6ICdnbGlkZS0tZHJhZ2dpbmcnLFxuICAgIGNsb25lU2xpZGU6ICdnbGlkZV9fc2xpZGUtLWNsb25lJyxcbiAgICBhY3RpdmVOYXY6ICdnbGlkZV9fYnVsbGV0LS1hY3RpdmUnLFxuICAgIGFjdGl2ZVNsaWRlOiAnZ2xpZGVfX3NsaWRlLS1hY3RpdmUnLFxuICAgIGRpc2FibGVkQXJyb3c6ICdnbGlkZV9fYXJyb3ctLWRpc2FibGVkJ1xuICB9XG59XG4iLCIvKipcbiAqIE91dHB1dHMgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBib3dzZXIgY29uc29sZS5cbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IG1zZ1xuICogQHJldHVybiB7Vm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdhcm4gKG1zZykge1xuICBjb25zb2xlLmVycm9yKGBbR2xpZGUgd2Fybl06ICR7bXNnfWApXG59XG4iLCIvKipcbiAqIENvbnZlcnRzIHZhbHVlIGVudGVyZWQgYXMgbnVtYmVyXG4gKiBvciBzdHJpbmcgdG8gaW50ZWdlciB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0ludCAodmFsdWUpIHtcbiAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKVxufVxuXG4vKipcbiAqIENvbnZlcnRzIHZhbHVlIGVudGVyZWQgYXMgbnVtYmVyXG4gKiBvciBzdHJpbmcgdG8gZmxhdCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0Zsb2F0ICh2YWx1ZSkge1xuICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSlcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSAgeyp9ICAgdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyAodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZydcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QgKHZhbHVlKSB7XG4gIGxldCB0eXBlID0gdHlwZW9mIHZhbHVlXG5cbiAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZSA9PT0gJ29iamVjdCcgJiYgISF2YWx1ZSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW1peGVkLW9wZXJhdG9yc1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBudW1iZXIuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlciAodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGEgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCAodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCdcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGFuIGFycmF5LlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheSAodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yID09PSBBcnJheVxufVxuIiwiaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uL3V0aWxzL2xvZydcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlscy91bml0J1xuXG4vKipcbiAqIENyZWF0ZXMgYW5kIGluaXRpYWxpemVzIHNwZWNpZmllZCBjb2xsZWN0aW9uIG9mIGV4dGVuc2lvbnMuXG4gKiBFYWNoIGV4dGVuc2lvbiByZWNlaXZlcyBhY2Nlc3MgdG8gaW5zdGFuY2Ugb2YgZ2xpZGUgYW5kIHJlc3Qgb2YgY29tcG9uZW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZ2xpZGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbnNpb25zXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vdW50IChnbGlkZSwgZXh0ZW5zaW9ucywgZXZlbnRzKSB7XG4gIGxldCBjb21wb25lbnRzID0ge31cblxuICBmb3IgKGxldCBuYW1lIGluIGV4dGVuc2lvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihleHRlbnNpb25zW25hbWVdKSkge1xuICAgICAgY29tcG9uZW50c1tuYW1lXSA9IGV4dGVuc2lvbnNbbmFtZV0oZ2xpZGUsIGNvbXBvbmVudHMsIGV2ZW50cylcbiAgICB9IGVsc2Uge1xuICAgICAgd2FybignRXh0ZW5zaW9uIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgbmFtZSBpbiBjb21wb25lbnRzKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29tcG9uZW50c1tuYW1lXS5tb3VudCkpIHtcbiAgICAgIGNvbXBvbmVudHNbbmFtZV0ubW91bnQoKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb21wb25lbnRzXG59XG4iLCIvKipcbiAqIERlZmluZXMgZ2V0dGVyIGFuZCBzZXR0ZXIgcHJvcGVydHkgb24gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmogICAgICAgICBPYmplY3Qgd2hlcmUgcHJvcGVydHkgaGFzIHRvIGJlIGRlZmluZWQuXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHByb3AgICAgICAgIE5hbWUgb2YgdGhlIGRlZmluZWQgcHJvcGVydHkuXG4gKiBAcGFyYW0gIHtPYmplY3R9IGRlZmluaXRpb24gIEdldCBhbmQgc2V0IGRlZmluaXRpb25zIGZvciB0aGUgcHJvcGVydHkuXG4gKiBAcmV0dXJuIHtWb2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lIChvYmosIHByb3AsIGRlZmluaXRpb24pIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgZGVmaW5pdGlvbilcbn1cblxuLyoqXG4gKiBTb3J0cyBhcGhhYmV0aWNhbGx5IG9iamVjdCBrZXlzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0S2V5cyAob2JqKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvcnQoKS5yZWR1Y2UoKHIsIGspID0+IHtcbiAgICByW2tdID0gb2JqW2tdXG5cbiAgICByZXR1cm4gKHJba10sIHIpXG4gIH0sIHt9KVxufVxuXG4vKipcbiAqIE1lcmdlcyBwYXNzZWQgc2V0dGluZ3Mgb2JqZWN0IHdpdGggZGVmYXVsdCBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gZGVmYXVsdHNcbiAqIEBwYXJhbSAge09iamVjdH0gc2V0dGluZ3NcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyAoZGVmYXVsdHMsIHNldHRpbmdzKSB7XG4gIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIHNldHRpbmdzKVxuXG4gIC8vIGBPYmplY3QuYXNzaWduYCBkbyBub3QgZGVlcGx5IG1lcmdlIG9iamVjdHMsIHNvIHdlXG4gIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkgZm9yIGV2ZXJ5IG5lc3RlZCBvYmplY3RcbiAgLy8gaW4gb3B0aW9ucy4gQWx0aG91Z2ggaXQgZG9lcyBub3QgbG9vayBzbWFydCxcbiAgLy8gaXQncyBzbWFsbGVyIGFuZCBmYXN0ZXIgdGhhbiBzb21lIGZhbmN5XG4gIC8vIG1lcmdpbmcgZGVlcC1tZXJnZSBhbGdvcml0aG0gc2NyaXB0LlxuICBpZiAoc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ2NsYXNzZXMnKSkge1xuICAgIG9wdGlvbnMuY2xhc3NlcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLmNsYXNzZXMsIHNldHRpbmdzLmNsYXNzZXMpXG5cbiAgICBpZiAoc2V0dGluZ3MuY2xhc3Nlcy5oYXNPd25Qcm9wZXJ0eSgnZGlyZWN0aW9uJykpIHtcbiAgICAgIG9wdGlvbnMuY2xhc3Nlcy5kaXJlY3Rpb24gPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cy5jbGFzc2VzLmRpcmVjdGlvbiwgc2V0dGluZ3MuY2xhc3Nlcy5kaXJlY3Rpb24pXG4gICAgfVxuICB9XG5cbiAgaWYgKHNldHRpbmdzLmhhc093blByb3BlcnR5KCdicmVha3BvaW50cycpKSB7XG4gICAgb3B0aW9ucy5icmVha3BvaW50cyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLmJyZWFrcG9pbnRzLCBzZXR0aW5ncy5icmVha3BvaW50cylcbiAgfVxuXG4gIHJldHVybiBvcHRpb25zXG59XG4iLCJpbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vLi4vdXRpbHMvdW5pdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRzQnVzIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIEV2ZW50QnVzIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoZXZlbnRzID0ge30pIHtcbiAgICB0aGlzLmV2ZW50cyA9IGV2ZW50c1xuICAgIHRoaXMuaG9wID0gZXZlbnRzLmhhc093blByb3BlcnR5XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBsaXN0ZW5lciB0byB0aGUgc3BlY2lmZWQgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBvbiAoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICBpZiAoaXNBcnJheShldmVudCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5vbihldmVudFtpXSwgaGFuZGxlcilcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdGhlIGV2ZW50J3Mgb2JqZWN0IGlmIG5vdCB5ZXQgY3JlYXRlZFxuICAgIGlmICghdGhpcy5ob3AuY2FsbCh0aGlzLmV2ZW50cywgZXZlbnQpKSB7XG4gICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXVxuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgaGFuZGxlciB0byBxdWV1ZVxuICAgIHZhciBpbmRleCA9IHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKGhhbmRsZXIpIC0gMVxuXG4gICAgLy8gUHJvdmlkZSBoYW5kbGUgYmFjayBmb3IgcmVtb3ZhbCBvZiBldmVudFxuICAgIHJldHVybiB7XG4gICAgICByZW1vdmUgKCkge1xuICAgICAgICBkZWxldGUgdGhpcy5ldmVudHNbZXZlbnRdW2luZGV4XVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSdW5zIHJlZ2lzdGVyZWQgaGFuZGxlcnMgZm9yIHNwZWNpZmllZCBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gY29udGV4dFxuICAgKi9cbiAgZW1pdCAoZXZlbnQsIGNvbnRleHQpIHtcbiAgICBpZiAoaXNBcnJheShldmVudCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5lbWl0KGV2ZW50W2ldLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHRoZSBldmVudCBkb2Vzbid0IGV4aXN0LCBvciB0aGVyZSdzIG5vIGhhbmRsZXJzIGluIHF1ZXVlLCBqdXN0IGxlYXZlXG4gICAgaWYgKCF0aGlzLmhvcC5jYWxsKHRoaXMuZXZlbnRzLCBldmVudCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIEN5Y2xlIHRocm91Z2ggZXZlbnRzIHF1ZXVlLCBmaXJlIVxuICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtKGNvbnRleHQgfHwge30pXG4gICAgfSlcbiAgfVxufVxuIiwiaW1wb3J0IGRlZmF1bHRzIGZyb20gXCIuL2RlZmF1bHRzXCI7XHJcbmltcG9ydCB7IHdhcm4gfSBmcm9tIFwiLi91dGlscy9sb2dcIjtcclxuaW1wb3J0IHsgbW91bnQgfSBmcm9tIFwiLi9jb3JlL2luZGV4XCI7XHJcbmltcG9ydCB7IG1lcmdlT3B0aW9ucyB9IGZyb20gXCIuL3V0aWxzL29iamVjdFwiO1xyXG5pbXBvcnQgeyB0b0ludCwgaXNPYmplY3QsIGlzQXJyYXkgfSBmcm9tIFwiLi91dGlscy91bml0XCI7XHJcblxyXG5pbXBvcnQgRXZlbnRzQnVzIGZyb20gXCIuL2NvcmUvZXZlbnQvZXZlbnRzLWJ1c1wiO1xyXG5jb25zb2xlLmxvZyhcImdsaWRlIDNcIik7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdsaWRlIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgZ2xpZGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgdGhpcy5fYyA9IHt9O1xyXG4gICAgdGhpcy5fdCA9IFtdO1xyXG4gICAgdGhpcy5fZSA9IG5ldyBFdmVudHNCdXMoKTtcclxuXHJcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XHJcbiAgICB0aGlzLnNldHRpbmdzID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgIHRoaXMuaW5kZXggPSB0aGlzLnNldHRpbmdzLnN0YXJ0QXQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplcyBnbGlkZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbnNpb25zIENvbGxlY3Rpb24gb2YgZXh0ZW5zaW9ucyB0byBpbml0aWFsaXplLlxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIG1vdW50KGV4dGVuc2lvbnMgPSB7fSkge1xyXG4gICAgdGhpcy5fZS5lbWl0KFwibW91bnQuYmVmb3JlXCIpO1xyXG5cclxuICAgIGlmIChpc09iamVjdChleHRlbnNpb25zKSkge1xyXG4gICAgICB0aGlzLl9jID0gbW91bnQodGhpcywgZXh0ZW5zaW9ucywgdGhpcy5fZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3YXJuKFwiWW91IG5lZWQgdG8gcHJvdmlkZSBhIG9iamVjdCBvbiBgbW91bnQoKWBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZS5lbWl0KFwibW91bnQuYWZ0ZXJcIik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb2xsZWN0cyBhbiBpbnN0YW5jZSBgdHJhbnNsYXRlYCB0cmFuc2Zvcm1lcnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtBcnJheX0gdHJhbnNmb3JtZXJzIENvbGxlY3Rpb24gb2YgdHJhbnNmb3JtZXJzLlxyXG4gICAqIEByZXR1cm4ge1ZvaWR9XHJcbiAgICovXHJcbiAgbXV0YXRlKHRyYW5zZm9ybWVycyA9IFtdKSB7XHJcbiAgICBpZiAoaXNBcnJheSh0cmFuc2Zvcm1lcnMpKSB7XHJcbiAgICAgIHRoaXMuX3QgPSB0cmFuc2Zvcm1lcnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3YXJuKFwiWW91IG5lZWQgdG8gcHJvdmlkZSBhIGFycmF5IG9uIGBtdXRhdGUoKWBcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIGdsaWRlIHdpdGggc3BlY2lmaWVkIHNldHRpbmdzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHNldHRpbmdzXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgdXBkYXRlKHNldHRpbmdzID0ge30pIHtcclxuICAgIHRoaXMuc2V0dGluZ3MgPSBtZXJnZU9wdGlvbnModGhpcy5zZXR0aW5ncywgc2V0dGluZ3MpO1xyXG5cclxuICAgIGlmIChzZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eShcInN0YXJ0QXRcIikpIHtcclxuICAgICAgdGhpcy5pbmRleCA9IHNldHRpbmdzLnN0YXJ0QXQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZS5lbWl0KFwidXBkYXRlXCIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlIHNsaWRlIHdpdGggc3BlY2lmaWVkIHBhdHRlcm4uIEEgcGF0dGVybiBtdXN0IGJlIGluIHRoZSBzcGVjaWFsIGZvcm1hdDpcclxuICAgKiBgPmAgLSBNb3ZlIG9uZSBmb3J3YXJkXHJcbiAgICogYDxgIC0gTW92ZSBvbmUgYmFja3dhcmRcclxuICAgKiBgPXtpfWAgLSBHbyB0byB7aX0gemVyby1iYXNlZCBzbGlkZSAoZXEuICc9MScsIHdpbGwgZ28gdG8gc2Vjb25kIHNsaWRlKVxyXG4gICAqIGA+PmAgLSBSZXdpbmRzIHRvIGVuZCAobGFzdCBzbGlkZSlcclxuICAgKiBgPDxgIC0gUmV3aW5kcyB0byBzdGFydCAoZmlyc3Qgc2xpZGUpXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0dGVyblxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIGdvKHBhdHRlcm4pIHtcclxuICAgIHRoaXMuX2MuUnVuLm1ha2UocGF0dGVybik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3ZlIHRyYWNrIGJ5IHNwZWNpZmllZCBkaXN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkaXN0YW5jZVxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIG1vdmUoZGlzdGFuY2UpIHtcclxuICAgIHRoaXMuX2MuVHJhbnNpdGlvbi5kaXNhYmxlKCk7XHJcbiAgICB0aGlzLl9jLk1vdmUubWFrZShkaXN0YW5jZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95IGluc3RhbmNlIGFuZCByZXZlcnQgYWxsIGNoYW5nZXMgZG9uZSBieSB0aGlzLl9jLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2UuZW1pdChcImRlc3Ryb3lcIik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCBpbnN0YW5jZSBhdXRvcGxheWluZy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbnxOdW1iZXJ9IGludGVydmFsIFJ1biBhdXRvcGxheWluZyB3aXRoIHBhc3NlZCBpbnRlcnZhbCByZWdhcmRsZXNzIG9mIGBhdXRvcGxheWAgc2V0dGluZ3NcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBwbGF5KGludGVydmFsID0gZmFsc2UpIHtcclxuICAgIGlmIChpbnRlcnZhbCkge1xyXG4gICAgICB0aGlzLnNldHRpbmdzLmF1dG9wbGF5ID0gaW50ZXJ2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZS5lbWl0KFwicGxheVwiKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgaW5zdGFuY2UgYXV0b3BsYXlpbmcuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBwYXVzZSgpIHtcclxuICAgIHRoaXMuX2UuZW1pdChcInBhdXNlXCIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBnbGlkZSBpbnRvIGEgaWRsZSBzdGF0dXMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBkaXNhYmxlKCkge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGdsaWRlIGludG8gYSBhY3RpdmUgc3RhdHVzLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgZW5hYmxlKCkge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBjdXV0b20gZXZlbnQgbGlzdGVuZXIgd2l0aCBoYW5kbGVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfEFycmF5fSBldmVudFxyXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgb24oZXZlbnQsIGhhbmRsZXIpIHtcclxuICAgIHRoaXMuX2Uub24oZXZlbnQsIGhhbmRsZXIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIGdsaWRlIGlzIGEgcHJlY2lzZWQgdHlwZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZVxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICovXHJcbiAgaXNUeXBlKG5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnR5cGUgPT09IG5hbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBjb3JlIG9wdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICovXHJcbiAgZ2V0IHNldHRpbmdzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX287XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBjb3JlIG9wdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9cclxuICAgKiBAcmV0dXJuIHtWb2lkfVxyXG4gICAqL1xyXG4gIHNldCBzZXR0aW5ncyhvKSB7XHJcbiAgICBpZiAoaXNPYmplY3QobykpIHtcclxuICAgICAgdGhpcy5fbyA9IG87XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3YXJuKFwiT3B0aW9ucyBtdXN0IGJlIGFuIGBvYmplY3RgIGluc3RhbmNlLlwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgY3VycmVudCBpbmRleCBvZiB0aGUgc2xpZGVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAqL1xyXG4gIGdldCBpbmRleCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBjdXJyZW50IGluZGV4IGEgc2xpZGVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAqL1xyXG4gIHNldCBpbmRleChpKSB7XHJcbiAgICB0aGlzLl9pID0gdG9JbnQoaSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHR5cGUgbmFtZSBvZiB0aGUgc2xpZGVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7U3RyaW5nfVxyXG4gICAqL1xyXG4gIGdldCB0eXBlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MudHlwZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdmFsdWUgb2YgdGhlIGlkbGUgc3RhdHVzLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgKi9cclxuICBnZXQgZGlzYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdmFsdWUgb2YgdGhlIGlkbGUgc3RhdHVzLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgKi9cclxuICBzZXQgZGlzYWJsZWQoc3RhdHVzKSB7XHJcbiAgICB0aGlzLl9kID0gISFzdGF0dXM7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlscy9sb2cnXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgeyB0b0ludCwgaXNOdW1iZXIgfSBmcm9tICcuLi91dGlscy91bml0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBSdW4gPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYXV0b3J1bm5pbmcgb2YgdGhlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLl9vID0gZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWFrZXMgZ2xpZGVzIHJ1bm5pbmcgYmFzZWQgb24gdGhlIHBhc3NlZCBtb3Zpbmcgc2NoZW1hLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1vdmVcbiAgICAgKi9cbiAgICBtYWtlIChtb3ZlKSB7XG4gICAgICBpZiAoIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgICFHbGlkZS5zZXR0aW5ncy53YWl0Rm9yVHJhbnNpdGlvbiB8fCBHbGlkZS5kaXNhYmxlKClcblxuICAgICAgICB0aGlzLm1vdmUgPSBtb3ZlXG5cbiAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5iZWZvcmUnLCB0aGlzLm1vdmUpXG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGUoKVxuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdydW4nLCB0aGlzLm1vdmUpXG5cbiAgICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pc1N0YXJ0KCkpIHtcbiAgICAgICAgICAgIEV2ZW50cy5lbWl0KCdydW4uc3RhcnQnLCB0aGlzLm1vdmUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXNFbmQoKSkge1xuICAgICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5lbmQnLCB0aGlzLm1vdmUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXNPZmZzZXQoKSkge1xuICAgICAgICAgICAgdGhpcy5fbyA9IGZhbHNlXG5cbiAgICAgICAgICAgIEV2ZW50cy5lbWl0KCdydW4ub2Zmc2V0JywgdGhpcy5tb3ZlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIEV2ZW50cy5lbWl0KCdydW4uYWZ0ZXInLCB0aGlzLm1vdmUpXG5cbiAgICAgICAgICBHbGlkZS5lbmFibGUoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIGN1cnJlbnQgaW5kZXggYmFzZWQgb24gZGVmaW5lZCBtb3ZlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfFVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBjYWxjdWxhdGUgKCkge1xuICAgICAgY29uc3QgeyBtb3ZlLCBsZW5ndGggfSA9IHRoaXNcbiAgICAgIGNvbnN0IHsgc3RlcHMsIGRpcmVjdGlvbiB9ID0gbW92ZVxuXG4gICAgICAvLyBCeSBkZWZhdWx0IGFzc3VtZSB0aGF0IHNpemUgb2YgdmlldyBpcyBlcXVhbCB0byBvbmUgc2xpZGVcbiAgICAgIGxldCB2aWV3U2l6ZSA9IDFcbiAgICAgIC8vIERldGVybWluZSBpZiBzdGVwcyBhcmUgbnVtZXJpYyB2YWx1ZVxuICAgICAgbGV0IGNvdW50YWJsZVN0ZXBzID0gaXNOdW1iZXIodG9JbnQoc3RlcHMpKSAmJiB0b0ludChzdGVwcykgIT09IDBcblxuICAgICAgLy8gV2hpbGUgZGlyZWN0aW9uIGlzIGA9YCB3ZSB3YW50IGp1bXAgdG9cbiAgICAgIC8vIGEgc3BlY2lmaWVkIGluZGV4IGRlc2NyaWJlZCBpbiBzdGVwcy5cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc9Jykge1xuICAgICAgICBHbGlkZS5pbmRleCA9IHN0ZXBzXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIFdoZW4gcGF0dGVybiBpcyBlcXVhbCB0byBgPj5gIHdlIHdhbnRcbiAgICAgIC8vIGZhc3QgZm9yd2FyZCB0byB0aGUgbGFzdCBzbGlkZS5cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc+JyAmJiBzdGVwcyA9PT0gJz4nKSB7XG4gICAgICAgIEdsaWRlLmluZGV4ID0gbGVuZ3RoXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIFdoZW4gcGF0dGVybiBpcyBlcXVhbCB0byBgPDxgIHdlIHdhbnRcbiAgICAgIC8vIGZhc3QgZm9yd2FyZCB0byB0aGUgZmlyc3Qgc2xpZGUuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPCcgJiYgc3RlcHMgPT09ICc8Jykge1xuICAgICAgICBHbGlkZS5pbmRleCA9IDBcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gV2hpbGUgc3RlcHMgaXMgYSBudW1lcmljIHZhbHVlIGFuZCB3ZVxuICAgICAgLy8gbW92ZSBmb3J3YXJkIGJ5IHRoZSBudW1iZXIgb2Ygc3RlcHMuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPicgJiYgY291bnRhYmxlU3RlcHMpIHtcbiAgICAgICAgdmlld1NpemUgPSB0b0ludChzdGVwcykgKiAtMVxuICAgICAgfVxuXG4gICAgICAvLyAkc3RlcHM8IChkcmFnKSBtb3ZlbWVudFxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJzwnICYmIGNvdW50YWJsZVN0ZXBzKSB7XG4gICAgICAgIHZpZXdTaXplID0gdG9JbnQoc3RlcHMpXG4gICAgICB9XG5cbiAgICAgIC8vIHBhZ2luYXRpb24gbW92ZW1lbnRcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd8Jykge1xuICAgICAgICB2aWV3U2l6ZSA9IEdsaWRlLnNldHRpbmdzLnBlclZpZXcgfHwgMVxuICAgICAgfVxuXG4gICAgICAvLyB3ZSBhcmUgbW92aW5nIGZvcndhcmRcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc+JyB8fCAoZGlyZWN0aW9uID09PSAnfCcgJiYgc3RlcHMgPT09ICc+JykpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBjYWxjdWxhdGVGb3J3YXJkSW5kZXgodmlld1NpemUpXG5cbiAgICAgICAgaWYgKGluZGV4ID4gbGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5fbyA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIEdsaWRlLmluZGV4ID0gbm9ybWFsaXplRm9yd2FyZEluZGV4KGluZGV4LCB2aWV3U2l6ZSlcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gd2UgYXJlIG1vdmluZyBiYWNrd2FyZFxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJzwnIHx8IChkaXJlY3Rpb24gPT09ICd8JyAmJiBzdGVwcyA9PT0gJzwnKSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IGNhbGN1bGF0ZUJhY2t3YXJkSW5kZXgodmlld1NpemUpXG5cbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgIHRoaXMuX28gPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBHbGlkZS5pbmRleCA9IG5vcm1hbGl6ZUJhY2t3YXJkSW5kZXgoaW5kZXgsIHZpZXdTaXplKVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB3YXJuKGBJbnZhbGlkIGRpcmVjdGlvbiBwYXR0ZXJuIFske2RpcmVjdGlvbn0ke3N0ZXBzfV0gaGFzIGJlZW4gdXNlZGApXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB3ZSBhcmUgb24gdGhlIGZpcnN0IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1N0YXJ0ICgpIHtcbiAgICAgIHJldHVybiBHbGlkZS5pbmRleCA8PSAwXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB3ZSBhcmUgb24gdGhlIGxhc3Qgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzRW5kICgpIHtcbiAgICAgIHJldHVybiBHbGlkZS5pbmRleCA+PSB0aGlzLmxlbmd0aFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgd2UgYXJlIG1ha2luZyBhIG9mZnNldCBydW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0aW9uXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc09mZnNldCAoZGlyZWN0aW9uID0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoIWRpcmVjdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5fb1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuX28pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIC8vIGRpZCB3ZSB2aWV3IHRvIHRoZSByaWdodD9cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd8PicpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZS5kaXJlY3Rpb24gPT09ICd8JyAmJiB0aGlzLm1vdmUuc3RlcHMgPT09ICc+J1xuICAgICAgfVxuXG4gICAgICAvLyBkaWQgd2UgdmlldyB0byB0aGUgbGVmdD9cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd8PCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZS5kaXJlY3Rpb24gPT09ICd8JyAmJiB0aGlzLm1vdmUuc3RlcHMgPT09ICc8J1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5tb3ZlLmRpcmVjdGlvbiA9PT0gZGlyZWN0aW9uXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBib3VuZCBtb2RlIGlzIGFjdGl2ZVxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0JvdW5kICgpIHtcbiAgICAgIHJldHVybiBHbGlkZS5pc1R5cGUoJ3NsaWRlcicpICYmIEdsaWRlLnNldHRpbmdzLmZvY3VzQXQgIT09ICdjZW50ZXInICYmIEdsaWRlLnNldHRpbmdzLmJvdW5kXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaW5kZXggdmFsdWUgdG8gbW92ZSBmb3J3YXJkL3RvIHRoZSByaWdodFxuICAgKlxuICAgKiBAcGFyYW0gdmlld1NpemVcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZUZvcndhcmRJbmRleCAodmlld1NpemUpIHtcbiAgICBjb25zdCB7IGluZGV4IH0gPSBHbGlkZVxuXG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgcmV0dXJuIGluZGV4ICsgdmlld1NpemVcbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXggKyAodmlld1NpemUgLSAoaW5kZXggJSB2aWV3U2l6ZSkpXG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplcyB0aGUgZ2l2ZW4gZm9yd2FyZCBpbmRleCBiYXNlZCBvbiBnbGlkZSBzZXR0aW5ncywgcHJldmVudGluZyBpdCB0byBleGNlZWQgY2VydGFpbiBib3VuZGFyaWVzXG4gICAqXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKiBAcGFyYW0gbGVuZ3RoXG4gICAqIEBwYXJhbSB2aWV3U2l6ZVxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZnVuY3Rpb24gbm9ybWFsaXplRm9yd2FyZEluZGV4IChpbmRleCwgdmlld1NpemUpIHtcbiAgICBjb25zdCB7IGxlbmd0aCB9ID0gUnVuXG5cbiAgICBpZiAoaW5kZXggPD0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICByZXR1cm4gaW5kZXggLSAobGVuZ3RoICsgMSlcbiAgICB9XG5cbiAgICBpZiAoR2xpZGUuc2V0dGluZ3MucmV3aW5kKSB7XG4gICAgICAvLyBib3VuZCBkb2VzIGZ1bm55IHRoaW5ncyB3aXRoIHRoZSBsZW5ndGgsIHRoZXJlZm9yIHdlIGhhdmUgdG8gYmUgY2VydGFpblxuICAgICAgLy8gdGhhdCB3ZSBhcmUgb24gdGhlIGxhc3QgcG9zc2libGUgaW5kZXggdmFsdWUgZ2l2ZW4gYnkgYm91bmRcbiAgICAgIGlmIChSdW4uaXNCb3VuZCgpICYmICFSdW4uaXNFbmQoKSkge1xuICAgICAgICByZXR1cm4gbGVuZ3RoXG4gICAgICB9XG5cbiAgICAgIHJldHVybiAwXG4gICAgfVxuXG4gICAgaWYgKFJ1bi5pc0JvdW5kKCkpIHtcbiAgICAgIHJldHVybiBsZW5ndGhcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihsZW5ndGggLyB2aWV3U2l6ZSkgKiB2aWV3U2l6ZVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgaW5kZXggdmFsdWUgdG8gbW92ZSBiYWNrd2FyZC90byB0aGUgbGVmdFxuICAgKlxuICAgKiBAcGFyYW0gdmlld1NpemVcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZUJhY2t3YXJkSW5kZXggKHZpZXdTaXplKSB7XG4gICAgY29uc3QgeyBpbmRleCB9ID0gR2xpZGVcblxuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykpIHtcbiAgICAgIHJldHVybiBpbmRleCAtIHZpZXdTaXplXG4gICAgfVxuXG4gICAgLy8gZW5zdXJlIG91ciBiYWNrIG5hdmlnYXRpb24gcmVzdWx0cyBpbiB0aGUgc2FtZSBpbmRleCBhcyBhIGZvcndhcmQgbmF2aWdhdGlvblxuICAgIC8vIHRvIGV4cGVyaWVuY2UgYSBob21vZ2VuZW91cyBwYWdpbmdcbiAgICBjb25zdCB2aWV3ID0gTWF0aC5jZWlsKGluZGV4IC8gdmlld1NpemUpXG5cbiAgICByZXR1cm4gKHZpZXcgLSAxKSAqIHZpZXdTaXplXG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplcyB0aGUgZ2l2ZW4gYmFja3dhcmQgaW5kZXggYmFzZWQgb24gZ2xpZGUgc2V0dGluZ3MsIHByZXZlbnRpbmcgaXQgdG8gZXhjZWVkIGNlcnRhaW4gYm91bmRhcmllc1xuICAgKlxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICogQHBhcmFtIGxlbmd0aFxuICAgKiBAcGFyYW0gdmlld1NpemVcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiBub3JtYWxpemVCYWNrd2FyZEluZGV4IChpbmRleCwgdmlld1NpemUpIHtcbiAgICBjb25zdCB7IGxlbmd0aCB9ID0gUnVuXG5cbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgcmV0dXJuIGluZGV4ICsgKGxlbmd0aCArIDEpXG4gICAgfVxuXG4gICAgaWYgKEdsaWRlLnNldHRpbmdzLnJld2luZCkge1xuICAgICAgLy8gYm91bmQgZG9lcyBmdW5ueSB0aGluZ3Mgd2l0aCB0aGUgbGVuZ3RoLCB0aGVyZWZvciB3ZSBoYXZlIHRvIGJlIGNlcnRhaW5cbiAgICAgIC8vIHRoYXQgd2UgYXJlIG9uIGZpcnN0IHBvc3NpYmxlIGluZGV4IHZhbHVlIGJlZm9yZSB3ZSB0byByZXdpbmQgdG8gdGhlIGxlbmd0aCBnaXZlbiBieSBib3VuZFxuICAgICAgaWYgKFJ1bi5pc0JvdW5kKCkgJiYgUnVuLmlzU3RhcnQoKSkge1xuICAgICAgICByZXR1cm4gbGVuZ3RoXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBNYXRoLmZsb29yKGxlbmd0aCAvIHZpZXdTaXplKSAqIHZpZXdTaXplXG4gICAgfVxuXG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIGRlZmluZShSdW4sICdtb3ZlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIG1vdmUgc2NoZW1hLlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX21cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0aGUgbW92ZSBzY2hlbWEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNldCAodmFsdWUpIHtcbiAgICAgIGxldCBzdGVwID0gdmFsdWUuc3Vic3RyKDEpXG5cbiAgICAgIHRoaXMuX20gPSB7XG4gICAgICAgIGRpcmVjdGlvbjogdmFsdWUuc3Vic3RyKDAsIDEpLFxuICAgICAgICBzdGVwczogc3RlcCA/ICh0b0ludChzdGVwKSA/IHRvSW50KHN0ZXApIDogc3RlcCkgOiAwXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShSdW4sICdsZW5ndGgnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgcnVubmluZyBkaXN0YW5jZSBiYXNlZFxuICAgICAqIG9uIHplcm8taW5kZXhpbmcgbnVtYmVyIG9mIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgbGV0IHsgc2V0dGluZ3MgfSA9IEdsaWRlXG4gICAgICBsZXQgeyBsZW5ndGggfSA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXNcblxuICAgICAgLy8gSWYgdGhlIGBib3VuZGAgb3B0aW9uIGlzIGFjdGl2ZSwgYSBtYXhpbXVtIHJ1bm5pbmcgZGlzdGFuY2Ugc2hvdWxkIGJlXG4gICAgICAvLyByZWR1Y2VkIGJ5IGBwZXJWaWV3YCBhbmQgYGZvY3VzQXRgIHNldHRpbmdzLiBSdW5uaW5nIGRpc3RhbmNlXG4gICAgICAvLyBzaG91bGQgZW5kIGJlZm9yZSBjcmVhdGluZyBhbiBlbXB0eSBzcGFjZSBhZnRlciBpbnN0YW5jZS5cbiAgICAgIGlmICh0aGlzLmlzQm91bmQoKSkge1xuICAgICAgICByZXR1cm4gKGxlbmd0aCAtIDEpIC0gKHRvSW50KHNldHRpbmdzLnBlclZpZXcpIC0gMSkgKyB0b0ludChzZXR0aW5ncy5mb2N1c0F0KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbGVuZ3RoIC0gMVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoUnVuLCAnb2Zmc2V0Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgc3RhdHVzIG9mIHRoZSBvZmZzZXR0aW5nIGZsYWcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb1xuICAgIH1cbiAgfSlcblxuICByZXR1cm4gUnVuXG59XG4iLCIvKipcbiAqIFJldHVybnMgYSBjdXJyZW50IHRpbWUuXG4gKlxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbm93ICgpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpXG59XG4iLCJpbXBvcnQgeyBub3cgfSBmcm9tICcuL3RpbWUnXG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgb25seSBiZSB0cmlnZ2VyZWRcbiAqIGF0IG1vc3Qgb25jZSBkdXJpbmcgYSBnaXZlbiB3aW5kb3cgb2YgdGltZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jXG4gKiBAcGFyYW0ge051bWJlcn0gd2FpdFxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUgKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgbGV0IHRpbWVvdXQsIGNvbnRleHQsIGFyZ3MsIHJlc3VsdFxuICBsZXQgcHJldmlvdXMgPSAwXG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9XG5cbiAgbGV0IGxhdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHByZXZpb3VzID0gb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSA/IDAgOiBub3coKVxuICAgIHRpbWVvdXQgPSBudWxsXG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsXG4gIH1cblxuICBsZXQgdGhyb3R0bGVkID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhdCA9IG5vdygpXG4gICAgaWYgKCFwcmV2aW91cyAmJiBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlKSBwcmV2aW91cyA9IGF0XG4gICAgbGV0IHJlbWFpbmluZyA9IHdhaXQgLSAoYXQgLSBwcmV2aW91cylcbiAgICBjb250ZXh0ID0gdGhpc1xuICAgIGFyZ3MgPSBhcmd1bWVudHNcbiAgICBpZiAocmVtYWluaW5nIDw9IDAgfHwgcmVtYWluaW5nID4gd2FpdCkge1xuICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgICAgIHRpbWVvdXQgPSBudWxsXG4gICAgICB9XG4gICAgICBwcmV2aW91cyA9IGF0XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbFxuICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHRocm90dGxlZC5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgcHJldmlvdXMgPSAwXG4gICAgdGltZW91dCA9IGNvbnRleHQgPSBhcmdzID0gbnVsbFxuICB9XG5cbiAgcmV0dXJuIHRocm90dGxlZFxufVxuIiwiaW1wb3J0IHsgdG9JbnQgfSBmcm9tICcuLi91dGlscy91bml0J1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICcuLi91dGlscy93YWl0J1xuXG5jb25zdCBNQVJHSU5fVFlQRSA9IHtcbiAgbHRyOiBbJ21hcmdpbkxlZnQnLCAnbWFyZ2luUmlnaHQnXSxcbiAgcnRsOiBbJ21hcmdpblJpZ2h0JywgJ21hcmdpbkxlZnQnXVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBHYXBzID0ge1xuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgZ2FwcyBiZXR3ZWVuIHNsaWRlcy4gRmlyc3QgYW5kIGxhc3RcbiAgICAgKiBzbGlkZXMgZG8gbm90IHJlY2VpdmUgaXQncyBlZGdlIG1hcmdpbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBzbGlkZXNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFwcGx5IChzbGlkZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzbGlkZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbGV0IHN0eWxlID0gc2xpZGVzW2ldLnN0eWxlXG4gICAgICAgIGxldCBkaXJlY3Rpb24gPSBDb21wb25lbnRzLkRpcmVjdGlvbi52YWx1ZVxuXG4gICAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgICAgc3R5bGVbTUFSR0lOX1RZUEVbZGlyZWN0aW9uXVswXV0gPSBgJHt0aGlzLnZhbHVlIC8gMn1weGBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzBdXSA9ICcnXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSAhPT0gc2xpZGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzFdXSA9IGAke3RoaXMudmFsdWUgLyAyfXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMV1dID0gJydcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGdhcHMgZnJvbSB0aGUgc2xpZGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gc2xpZGVzXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgKi9cbiAgICByZW1vdmUgKHNsaWRlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNsaWRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBsZXQgc3R5bGUgPSBzbGlkZXNbaV0uc3R5bGVcblxuICAgICAgICBzdHlsZS5tYXJnaW5MZWZ0ID0gJydcbiAgICAgICAgc3R5bGUubWFyZ2luUmlnaHQgPSAnJ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShHYXBzLCAndmFsdWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgZ2FwLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIHRvSW50KEdsaWRlLnNldHRpbmdzLmdhcClcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKEdhcHMsICdncm93Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYWRkaXRpb25hbCBkaW1lbnRpb25zIHZhbHVlIGNhdXNlZCBieSBnYXBzLlxuICAgICAqIFVzZWQgdG8gaW5jcmVhc2Ugd2lkdGggb2YgdGhlIHNsaWRlcyB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIEdhcHMudmFsdWUgKiAoQ29tcG9uZW50cy5TaXplcy5sZW5ndGgpXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShHYXBzLCAncmVkdWN0b3InLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyByZWR1Y3Rpb24gdmFsdWUgY2F1c2VkIGJ5IGdhcHMuXG4gICAgICogVXNlZCB0byBzdWJ0cmFjdCB3aWR0aCBvZiB0aGUgc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgbGV0IHBlclZpZXcgPSBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3XG5cbiAgICAgIHJldHVybiAoR2Fwcy52YWx1ZSAqIChwZXJWaWV3IC0gMSkpIC8gcGVyVmlld1xuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogQXBwbHkgY2FsY3VsYXRlZCBnYXBzOlxuICAgKiAtIGFmdGVyIGJ1aWxkaW5nLCBzbyBzbGlkZXMgKGluY2x1ZGluZyBjbG9uZXMpIHdpbGwgcmVjZWl2ZSBwcm9wZXIgbWFyZ2luc1xuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEksIHRvIHJlY2FsY3VsYXRlIGdhcHMgd2l0aCBuZXcgb3B0aW9uc1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYWZ0ZXInLCAndXBkYXRlJ10sIHRocm90dGxlKCgpID0+IHtcbiAgICBHYXBzLmFwcGx5KENvbXBvbmVudHMuSHRtbC53cmFwcGVyLmNoaWxkcmVuKVxuICB9LCAzMCkpXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBnYXBzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBHYXBzLnJlbW92ZShDb21wb25lbnRzLkh0bWwud3JhcHBlci5jaGlsZHJlbilcbiAgfSlcblxuICByZXR1cm4gR2Fwc1xufVxuIiwiLyoqXG4gKiBGaW5kcyBzaWJsaW5ncyBub2RlcyBvZiB0aGUgcGFzc2VkIG5vZGUuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gbm9kZVxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaWJsaW5ncyAobm9kZSkge1xuICBpZiAobm9kZSAmJiBub2RlLnBhcmVudE5vZGUpIHtcbiAgICBsZXQgbiA9IG5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkXG4gICAgbGV0IG1hdGNoZWQgPSBbXVxuXG4gICAgZm9yICg7IG47IG4gPSBuLm5leHRTaWJsaW5nKSB7XG4gICAgICBpZiAobi5ub2RlVHlwZSA9PT0gMSAmJiBuICE9PSBub2RlKSB7XG4gICAgICAgIG1hdGNoZWQucHVzaChuKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXRjaGVkXG4gIH1cblxuICByZXR1cm4gW11cbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgcGFzc2VkIG5vZGUgZXhpc3QgYW5kIGlzIGEgdmFsaWQgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBub2RlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhpc3QgKG5vZGUpIHtcbiAgaWYgKG5vZGUgJiYgbm9kZSBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MRWxlbWVudCkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cbiIsImltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlscy9sb2cnXG5pbXBvcnQgeyBleGlzdCB9IGZyb20gJy4uL3V0aWxzL2RvbSdcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuY29uc3QgVFJBQ0tfU0VMRUNUT1IgPSAnW2RhdGEtZ2xpZGUtZWw9XCJ0cmFja1wiXSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIGNvbnN0IEh0bWwgPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXAgc2xpZGVyIEhUTUwgbm9kZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0dsaWRlfSBnbGlkZVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMucm9vdCA9IEdsaWRlLnNlbGVjdG9yXG4gICAgICB0aGlzLnRyYWNrID0gdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IoVFJBQ0tfU0VMRUNUT1IpXG4gICAgICB0aGlzLnNsaWRlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMud3JhcHBlci5jaGlsZHJlbikuZmlsdGVyKChzbGlkZSkgPT4ge1xuICAgICAgICByZXR1cm4gIXNsaWRlLmNsYXNzTGlzdC5jb250YWlucyhHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmNsb25lU2xpZGUpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShIdG1sLCAncm9vdCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIG5vZGUgb2YgdGhlIGdsaWRlIG1haW4gZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIEh0bWwuX3JcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyBub2RlIG9mIHRoZSBnbGlkZSBtYWluIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0IChyKSB7XG4gICAgICBpZiAoaXNTdHJpbmcocikpIHtcbiAgICAgICAgciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocilcbiAgICAgIH1cblxuICAgICAgaWYgKGV4aXN0KHIpKSB7XG4gICAgICAgIEh0bWwuX3IgPSByXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdSb290IGVsZW1lbnQgbXVzdCBiZSBhIGV4aXN0aW5nIEh0bWwgbm9kZScpXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShIdG1sLCAndHJhY2snLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBub2RlIG9mIHRoZSBnbGlkZSB0cmFjayB3aXRoIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIEh0bWwuX3RcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyBub2RlIG9mIHRoZSBnbGlkZSB0cmFjayB3aXRoIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBzZXQgKHQpIHtcbiAgICAgIGlmIChleGlzdCh0KSkge1xuICAgICAgICBIdG1sLl90ID0gdFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybihgQ291bGQgbm90IGZpbmQgdHJhY2sgZWxlbWVudC4gUGxlYXNlIHVzZSAke1RSQUNLX1NFTEVDVE9SfSBhdHRyaWJ1dGUuYClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKEh0bWwsICd3cmFwcGVyJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgbm9kZSBvZiB0aGUgc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBIdG1sLnRyYWNrLmNoaWxkcmVuWzBdXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBIdG1sXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgeyB0b0ludCwgaXNPYmplY3QgfSBmcm9tICcuLi91dGlscy91bml0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBQZWVrID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwcyBob3cgbXVjaCB0byBwZWVrIGJhc2VkIG9uIHNldHRpbmdzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLnZhbHVlID0gR2xpZGUuc2V0dGluZ3MucGVla1xuICAgIH1cbiAgfVxuXG4gIGRlZmluZShQZWVrLCAndmFsdWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgcGVlay5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ8T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gUGVlay5fdlxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBwZWVrLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0ICh2YWx1ZSkge1xuICAgICAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZS5iZWZvcmUgPSB0b0ludCh2YWx1ZS5iZWZvcmUpXG4gICAgICAgIHZhbHVlLmFmdGVyID0gdG9JbnQodmFsdWUuYWZ0ZXIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKVxuICAgICAgfVxuXG4gICAgICBQZWVrLl92ID0gdmFsdWVcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKFBlZWssICdyZWR1Y3RvcicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHJlZHVjdGlvbiB2YWx1ZSBjYXVzZWQgYnkgcGVlay5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIGxldCB2YWx1ZSA9IFBlZWsudmFsdWVcbiAgICAgIGxldCBwZXJWaWV3ID0gR2xpZGUuc2V0dGluZ3MucGVyVmlld1xuXG4gICAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiAodmFsdWUuYmVmb3JlIC8gcGVyVmlldykgKyAodmFsdWUuYWZ0ZXIgLyBwZXJWaWV3KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWUgKiAyIC8gcGVyVmlld1xuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogUmVjYWxjdWxhdGUgcGVla2luZyBzaXplcyBvbjpcbiAgICogLSB3aGVuIHJlc2l6aW5nIHdpbmRvdyB0byB1cGRhdGUgdG8gcHJvcGVyIHBlcmNlbnRzXG4gICAqL1xuICBFdmVudHMub24oWydyZXNpemUnLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBQZWVrLm1vdW50KClcbiAgfSlcblxuICByZXR1cm4gUGVla1xufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHsgdG9JbnQsIGlzVW5kZWZpbmVkIH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgTW92ZSA9IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIG1vdmUgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5fbyA9IDBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyBhIG1vdmVtZW50IHZhbHVlIGJhc2VkIG9uIHBhc3NlZCBvZmZzZXQgYW5kIGN1cnJlbnRseSBhY3RpdmUgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IG9mZnNldFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbWFrZSAob2Zmc2V0ID0gMCkge1xuICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXRcblxuICAgICAgRXZlbnRzLmVtaXQoJ21vdmUnLCB7XG4gICAgICAgIG1vdmVtZW50OiB0aGlzLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uYWZ0ZXIoKCkgPT4ge1xuICAgICAgICBFdmVudHMuZW1pdCgnbW92ZS5hZnRlcicsIHtcbiAgICAgICAgICBtb3ZlbWVudDogdGhpcy52YWx1ZVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoTW92ZSwgJ29mZnNldCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGFuIG9mZnNldCB2YWx1ZSB1c2VkIHRvIG1vZGlmeSBjdXJyZW50IHRyYW5zbGF0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIE1vdmUuX29cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhbiBvZmZzZXQgdmFsdWUgdXNlZCB0byBtb2RpZnkgY3VycmVudCB0cmFuc2xhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0ICh2YWx1ZSkge1xuICAgICAgTW92ZS5fbyA9ICFpc1VuZGVmaW5lZCh2YWx1ZSkgPyB0b0ludCh2YWx1ZSkgOiAwXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShNb3ZlLCAndHJhbnNsYXRlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYSByYXcgbW92ZW1lbnQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGggKiBHbGlkZS5pbmRleFxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoTW92ZSwgJ3ZhbHVlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYW4gYWN0dWFsIG1vdmVtZW50IHZhbHVlIGNvcnJlY3RlZCBieSBvZmZzZXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIGxldCBvZmZzZXQgPSB0aGlzLm9mZnNldFxuICAgICAgbGV0IHRyYW5zbGF0ZSA9IHRoaXMudHJhbnNsYXRlXG5cbiAgICAgIGlmIChDb21wb25lbnRzLkRpcmVjdGlvbi5pcygncnRsJykpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZSArIG9mZnNldFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlIC0gb2Zmc2V0XG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBNYWtlIG1vdmVtZW50IHRvIHByb3BlciBzbGlkZSBvbjpcbiAgICogLSBiZWZvcmUgYnVpbGQsIHNvIGdsaWRlIHdpbGwgc3RhcnQgYXQgYHN0YXJ0QXRgIGluZGV4XG4gICAqIC0gb24gZWFjaCBzdGFuZGFyZCBydW4gdG8gbW92ZSB0byBuZXdseSBjYWxjdWxhdGVkIGluZGV4XG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAncnVuJ10sICgpID0+IHtcbiAgICBNb3ZlLm1ha2UoKVxuICB9KVxuXG4gIHJldHVybiBNb3ZlXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IFNpemVzID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwcyBkaW1lbnRpb25zIG9mIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0dXBTbGlkZXMgKCkge1xuICAgICAgbGV0IHdpZHRoID0gYCR7dGhpcy5zbGlkZVdpZHRofXB4YFxuICAgICAgbGV0IHNsaWRlcyA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXNcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2xpZGVzW2ldLnN0eWxlLndpZHRoID0gd2lkdGhcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0dXBzIGRpbWVudGlvbnMgb2Ygc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldHVwV3JhcHBlciAoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS53aWR0aCA9IGAke3RoaXMud3JhcHBlclNpemV9cHhgXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYXBwbGllZCBzdHlsZXMgZnJvbSBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlICgpIHtcbiAgICAgIGxldCBzbGlkZXMgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNsaWRlc1tpXS5zdHlsZS53aWR0aCA9ICcnXG4gICAgICB9XG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLndpZHRoID0gJydcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoU2l6ZXMsICdsZW5ndGgnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBjb3VudCBudW1iZXIgb2YgdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIENvbXBvbmVudHMuSHRtbC5zbGlkZXMubGVuZ3RoXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShTaXplcywgJ3dpZHRoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgd2lkdGggdmFsdWUgb2YgdGhlIHNsaWRlciAodmlzaWJsZSBhcmVhKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIENvbXBvbmVudHMuSHRtbC5yb290Lm9mZnNldFdpZHRoXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShTaXplcywgJ3dyYXBwZXJTaXplJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgc2l6ZSBvZiB0aGUgc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBTaXplcy5zbGlkZVdpZHRoICogU2l6ZXMubGVuZ3RoICsgQ29tcG9uZW50cy5HYXBzLmdyb3cgKyBDb21wb25lbnRzLkNsb25lcy5ncm93XG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShTaXplcywgJ3NsaWRlV2lkdGgnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB3aWR0aCB2YWx1ZSBvZiBhIHNpbmdsZSBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIChTaXplcy53aWR0aCAvIEdsaWRlLnNldHRpbmdzLnBlclZpZXcpIC0gQ29tcG9uZW50cy5QZWVrLnJlZHVjdG9yIC0gQ29tcG9uZW50cy5HYXBzLnJlZHVjdG9yXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBBcHBseSBjYWxjdWxhdGVkIGdsaWRlJ3MgZGltZW5zaW9uczpcbiAgICogLSBiZWZvcmUgYnVpbGRpbmcsIHNvIG90aGVyIGRpbWVudGlvbnMgKGUuZy4gdHJhbnNsYXRlKSB3aWxsIGJlIGNhbGN1bGF0ZWQgcHJvcGVydGx5XG4gICAqIC0gd2hlbiByZXNpemluZyB3aW5kb3cgdG8gcmVjYWxjdWxhdGUgc2lsZGVzIGRpbWVuc2lvbnNcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJLCB0byBjYWxjdWxhdGUgZGltZW5zaW9ucyBiYXNlZCBvbiBuZXcgb3B0aW9uc1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYmVmb3JlJywgJ3Jlc2l6ZScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIFNpemVzLnNldHVwU2xpZGVzKClcbiAgICBTaXplcy5zZXR1cFdyYXBwZXIoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2FsY3VsYXRlZCBnbGlkZSdzIGRpbWVuc2lvbnM6XG4gICAqIC0gb24gZGVzdG90aW5nIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgU2l6ZXMucmVtb3ZlKClcbiAgfSlcblxuICByZXR1cm4gU2l6ZXNcbn1cbiIsImltcG9ydCB7IHNpYmxpbmdzIH0gZnJvbSAnLi4vdXRpbHMvZG9tJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBCdWlsZCA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0IGdsaWRlIGJ1aWxkaW5nLiBBZGRzIGNsYXNzZXMsIHNldHNcbiAgICAgKiBkaW1lbnNpb25zIGFuZCBzZXR1cHMgaW5pdGlhbCBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgRXZlbnRzLmVtaXQoJ2J1aWxkLmJlZm9yZScpXG5cbiAgICAgIHRoaXMudHlwZUNsYXNzKClcbiAgICAgIHRoaXMuYWN0aXZlQ2xhc3MoKVxuXG4gICAgICBFdmVudHMuZW1pdCgnYnVpbGQuYWZ0ZXInKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGB0eXBlYCBjbGFzcyB0byB0aGUgZ2xpZGUgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdHlwZUNsYXNzICgpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5hZGQoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlc1tHbGlkZS5zZXR0aW5ncy50eXBlXSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYWN0aXZlQ2xhc3MgKCkge1xuICAgICAgbGV0IGNsYXNzZXMgPSBHbGlkZS5zZXR0aW5ncy5jbGFzc2VzXG4gICAgICBsZXQgc2xpZGUgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzW0dsaWRlLmluZGV4XVxuXG4gICAgICBpZiAoc2xpZGUpIHtcbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChjbGFzc2VzLmFjdGl2ZVNsaWRlKVxuXG4gICAgICAgIHNpYmxpbmdzKHNsaWRlKS5mb3JFYWNoKChzaWJsaW5nKSA9PiB7XG4gICAgICAgICAgc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzZXMuYWN0aXZlU2xpZGUpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgSFRNTCBjbGFzc2VzIGFwcGxpZWQgYXQgYnVpbGRpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzZXMgKCkge1xuICAgICAgbGV0IGNsYXNzZXMgPSBHbGlkZS5zZXR0aW5ncy5jbGFzc2VzXG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlc1tHbGlkZS5zZXR0aW5ncy50eXBlXSlcblxuICAgICAgQ29tcG9uZW50cy5IdG1sLnNsaWRlcy5mb3JFYWNoKChzaWJsaW5nKSA9PiB7XG4gICAgICAgIHNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZShjbGFzc2VzLmFjdGl2ZVNsaWRlKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYnVpbGRpbmcgY2xhc3NlczpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIGJyaW5nIEhUTUwgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICogLSBvbiB1cGRhdGluZyB0byByZW1vdmUgY2xhc3NlcyBiZWZvcmUgcmVtb3VudGluZyBjb21wb25lbnRcbiAgICovXG4gIEV2ZW50cy5vbihbJ2Rlc3Ryb3knLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBCdWlsZC5yZW1vdmVDbGFzc2VzKClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnQ6XG4gICAqIC0gb24gcmVzaXppbmcgb2YgdGhlIHdpbmRvdyB0byBjYWxjdWxhdGUgbmV3IGRpbWVudGlvbnNcbiAgICogLSBvbiB1cGRhdGluZyBzZXR0aW5ncyB2aWEgQVBJXG4gICAqL1xuICBFdmVudHMub24oWydyZXNpemUnLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBCdWlsZC5tb3VudCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFN3YXAgYWN0aXZlIGNsYXNzIG9mIGN1cnJlbnQgc2xpZGU6XG4gICAqIC0gYWZ0ZXIgZWFjaCBtb3ZlIHRvIHRoZSBuZXcgaW5kZXhcbiAgICovXG4gIEV2ZW50cy5vbignbW92ZS5hZnRlcicsICgpID0+IHtcbiAgICBCdWlsZC5hY3RpdmVDbGFzcygpXG4gIH0pXG5cbiAgcmV0dXJuIEJ1aWxkXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IENsb25lcyA9IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgcGF0dGVybiBtYXAgYW5kIGNvbGxlY3Qgc2xpZGVzIHRvIGJlIGNsb25lZC5cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLml0ZW1zID0gW11cblxuICAgICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5jb2xsZWN0KClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdCBjbG9uZXMgd2l0aCBwYXR0ZXJuLlxuICAgICAqXG4gICAgICogQHJldHVybiB7W119XG4gICAgICovXG4gICAgY29sbGVjdCAoaXRlbXMgPSBbXSkge1xuICAgICAgbGV0IHsgc2xpZGVzIH0gPSBDb21wb25lbnRzLkh0bWxcbiAgICAgIGxldCB7IHBlclZpZXcsIGNsYXNzZXMgfSA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgIGNvbnN0IHBlZWtJbmNyZW1lbnRlciA9ICshIUdsaWRlLnNldHRpbmdzLnBlZWtcbiAgICAgIGNvbnN0IGNsb25lQ291bnQgPSBwZXJWaWV3ICsgcGVla0luY3JlbWVudGVyICsgTWF0aC5yb3VuZChwZXJWaWV3IC8gMilcbiAgICAgIGNvbnN0IGFwcGVuZCA9IHNsaWRlcy5zbGljZSgwLCBjbG9uZUNvdW50KS5yZXZlcnNlKClcbiAgICAgIGNvbnN0IHByZXBlbmQgPSBzbGlkZXMuc2xpY2UoY2xvbmVDb3VudCAqIC0xKVxuXG4gICAgICBmb3IgKGxldCByID0gMDsgciA8IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocGVyVmlldyAvIHNsaWRlcy5sZW5ndGgpKTsgcisrKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXBwZW5kLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbGV0IGNsb25lID0gYXBwZW5kW2ldLmNsb25lTm9kZSh0cnVlKVxuXG4gICAgICAgICAgY2xvbmUuY2xhc3NMaXN0LmFkZChjbGFzc2VzLmNsb25lU2xpZGUpXG5cbiAgICAgICAgICBpdGVtcy5wdXNoKGNsb25lKVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVwZW5kLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbGV0IGNsb25lID0gcHJlcGVuZFtpXS5jbG9uZU5vZGUodHJ1ZSlcblxuICAgICAgICAgIGNsb25lLmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5jbG9uZVNsaWRlKVxuXG4gICAgICAgICAgaXRlbXMudW5zaGlmdChjbG9uZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXRlbXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQXBwZW5kIGNsb25lZCBzbGlkZXMgd2l0aCBnZW5lcmF0ZWQgcGF0dGVybi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYXBwZW5kICgpIHtcbiAgICAgIGxldCB7IGl0ZW1zIH0gPSB0aGlzXG4gICAgICBsZXQgeyB3cmFwcGVyLCBzbGlkZXMgfSA9IENvbXBvbmVudHMuSHRtbFxuXG4gICAgICBjb25zdCBoYWxmID0gTWF0aC5mbG9vcihpdGVtcy5sZW5ndGggLyAyKVxuICAgICAgY29uc3QgcHJlcGVuZCA9IGl0ZW1zLnNsaWNlKDAsIGhhbGYpLnJldmVyc2UoKVxuICAgICAgY29uc3QgYXBwZW5kID0gaXRlbXMuc2xpY2UoaGFsZiAqIC0xKS5yZXZlcnNlKClcbiAgICAgIGNvbnN0IHdpZHRoID0gYCR7Q29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRofXB4YFxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFwcGVuZC5sZW5ndGg7IGkrKykge1xuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGFwcGVuZFtpXSlcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVwZW5kLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdyYXBwZXIuaW5zZXJ0QmVmb3JlKHByZXBlbmRbaV0sIHNsaWRlc1swXSlcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtc1tpXS5zdHlsZS53aWR0aCA9IHdpZHRoXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgY2xvbmVkIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlICgpIHtcbiAgICAgIGxldCB7IGl0ZW1zIH0gPSB0aGlzXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIucmVtb3ZlQ2hpbGQoaXRlbXNbaV0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKENsb25lcywgJ2dyb3cnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhZGRpdGlvbmFsIGRpbWVudGlvbnMgdmFsdWUgY2F1c2VkIGJ5IGNsb25lcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIChDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGggKyBDb21wb25lbnRzLkdhcHMudmFsdWUpICogQ2xvbmVzLml0ZW1zLmxlbmd0aFxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogQXBwZW5kIGFkZGl0aW9uYWwgc2xpZGUncyBjbG9uZXM6XG4gICAqIC0gd2hpbGUgZ2xpZGUncyB0eXBlIGlzIGBjYXJvdXNlbGBcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgKCkgPT4ge1xuICAgIENsb25lcy5yZW1vdmUoKVxuICAgIENsb25lcy5tb3VudCgpXG4gICAgQ2xvbmVzLmFwcGVuZCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIEFwcGVuZCBhZGRpdGlvbmFsIHNsaWRlJ3MgY2xvbmVzOlxuICAgKiAtIHdoaWxlIGdsaWRlJ3MgdHlwZSBpcyBgY2Fyb3VzZWxgXG4gICAqL1xuICBFdmVudHMub24oJ2J1aWxkLmJlZm9yZScsICgpID0+IHtcbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICBDbG9uZXMuYXBwZW5kKClcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjbG9uZXMgSFRNTEVsZW1lbnRzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGJyaW5nIEhUTUwgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBDbG9uZXMucmVtb3ZlKClcbiAgfSlcblxuICByZXR1cm4gQ2xvbmVzXG59XG4iLCJpbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uLy4uL3V0aWxzL3VuaXQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50c0JpbmRlciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBFdmVudHNCaW5kZXIgaW5zdGFuY2UuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAobGlzdGVuZXJzID0ge30pIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IGxpc3RlbmVyc1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnRzIGxpc3RlbmVycyB0byBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfEFycmF5fSBldmVudHNcbiAgICogQHBhcmFtICB7RWxlbWVudHxXaW5kb3d8RG9jdW1lbnR9IGVsXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjbG9zdXJlXG4gICAqIEBwYXJhbSAge0Jvb2xlYW58T2JqZWN0fSBjYXB0dXJlXG4gICAqIEByZXR1cm4ge1ZvaWR9XG4gICAqL1xuICBvbiAoZXZlbnRzLCBlbCwgY2xvc3VyZSwgY2FwdHVyZSA9IGZhbHNlKSB7XG4gICAgaWYgKGlzU3RyaW5nKGV2ZW50cykpIHtcbiAgICAgIGV2ZW50cyA9IFtldmVudHNdXG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50c1tpXV0gPSBjbG9zdXJlXG5cbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCB0aGlzLmxpc3RlbmVyc1tldmVudHNbaV1dLCBjYXB0dXJlKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGV2ZW50IGxpc3RlbmVycyBmcm9tIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gIHtTdHJpbmd8QXJyYXl9IGV2ZW50c1xuICAgKiBAcGFyYW0gIHtFbGVtZW50fFdpbmRvd3xEb2N1bWVudH0gZWxcbiAgICogQHBhcmFtICB7Qm9vbGVhbnxPYmplY3R9IGNhcHR1cmVcbiAgICogQHJldHVybiB7Vm9pZH1cbiAgICovXG4gIG9mZiAoZXZlbnRzLCBlbCwgY2FwdHVyZSA9IGZhbHNlKSB7XG4gICAgaWYgKGlzU3RyaW5nKGV2ZW50cykpIHtcbiAgICAgIGV2ZW50cyA9IFtldmVudHNdXG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCB0aGlzLmxpc3RlbmVyc1tldmVudHNbaV1dLCBjYXB0dXJlKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGNvbGxlY3RlZCBsaXN0ZW5lcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtWb2lkfVxuICAgKi9cbiAgZGVzdHJveSAoKSB7XG4gICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzXG4gIH1cbn1cbiIsImltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnLi4vdXRpbHMvd2FpdCdcblxuaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgY29uc3QgUmVzaXplID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHdpbmRvdyBiaW5kaW5ncy5cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLmJpbmQoKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBgcmV6c2l6ZWAgbGlzdGVuZXIgdG8gdGhlIHdpbmRvdy5cbiAgICAgKiBJdCdzIGEgY29zdGx5IGV2ZW50LCBzbyB3ZSBhcmUgZGVib3VuY2luZyBpdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZCAoKSB7XG4gICAgICBCaW5kZXIub24oJ3Jlc2l6ZScsIHdpbmRvdywgdGhyb3R0bGUoKCkgPT4ge1xuICAgICAgICBFdmVudHMuZW1pdCgncmVzaXplJylcbiAgICAgIH0sIEdsaWRlLnNldHRpbmdzLnRocm90dGxlKSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBsaXN0ZW5lcnMgZnJvbSB0aGUgd2luZG93LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQgKCkge1xuICAgICAgQmluZGVyLm9mZigncmVzaXplJywgd2luZG93KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgZnJvbSB3aW5kb3c6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gcmVtb3ZlIGFkZGVkIEV2ZW50TGlzdGVuZXJcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBSZXNpemUudW5iaW5kKClcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIFJlc2l6ZVxufVxuIiwiaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uL3V0aWxzL2xvZydcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcblxuY29uc3QgVkFMSURfRElSRUNUSU9OUyA9IFsnbHRyJywgJ3J0bCddXG5jb25zdCBGTElQRURfTU9WRU1FTlRTID0ge1xuICAnPic6ICc8JyxcbiAgJzwnOiAnPicsXG4gICc9JzogJz0nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IERpcmVjdGlvbiA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgZ2FwIHZhbHVlIGJhc2VkIG9uIHNldHRpbmdzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLnZhbHVlID0gR2xpZGUuc2V0dGluZ3MuZGlyZWN0aW9uXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc29sdmVzIHBhdHRlcm4gYmFzZWQgb24gZGlyZWN0aW9uIHZhbHVlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0dGVyblxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgcmVzb2x2ZSAocGF0dGVybikge1xuICAgICAgbGV0IHRva2VuID0gcGF0dGVybi5zbGljZSgwLCAxKVxuXG4gICAgICBpZiAodGhpcy5pcygncnRsJykpIHtcbiAgICAgICAgcmV0dXJuIHBhdHRlcm4uc3BsaXQodG9rZW4pLmpvaW4oRkxJUEVEX01PVkVNRU5UU1t0b2tlbl0pXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXR0ZXJuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB2YWx1ZSBvZiBkaXJlY3Rpb24gbW9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpcyAoZGlyZWN0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gZGlyZWN0aW9uXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgZGlyZWN0aW9uIGNsYXNzIHRvIHRoZSByb290IEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYWRkQ2xhc3MgKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LmFkZChHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvblt0aGlzLnZhbHVlXSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBkaXJlY3Rpb24gY2xhc3MgZnJvbSB0aGUgcm9vdCBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzICgpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5yZW1vdmUoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlcy5kaXJlY3Rpb25bdGhpcy52YWx1ZV0pXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKERpcmVjdGlvbiwgJ3ZhbHVlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIGRpcmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBEaXJlY3Rpb24uX3ZcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0aGUgZGlyZWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXQgKHZhbHVlKSB7XG4gICAgICBpZiAoVkFMSURfRElSRUNUSU9OUy5pbmRleE9mKHZhbHVlKSA+IC0xKSB7XG4gICAgICAgIERpcmVjdGlvbi5fdiA9IHZhbHVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdEaXJlY3Rpb24gdmFsdWUgbXVzdCBiZSBgbHRyYCBvciBgcnRsYCcpXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBDbGVhciBkaXJlY3Rpb24gY2xhc3M6XG4gICAqIC0gb24gZGVzdHJveSB0byBicmluZyBIVE1MIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqIC0gb24gdXBkYXRlIHRvIHJlbW92ZSBjbGFzcyBiZWZvcmUgcmVhcHBsaW5nIGJlbGxvd1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIERpcmVjdGlvbi5yZW1vdmVDbGFzcygpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW91bnQgY29tcG9uZW50OlxuICAgKiAtIG9uIHVwZGF0ZSB0byByZWZsZWN0IGNoYW5nZXMgaW4gZGlyZWN0aW9uIHZhbHVlXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsICgpID0+IHtcbiAgICBEaXJlY3Rpb24ubW91bnQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBBcHBseSBkaXJlY3Rpb24gY2xhc3M6XG4gICAqIC0gYmVmb3JlIGJ1aWxkaW5nIHRvIGFwcGx5IGNsYXNzIGZvciB0aGUgZmlyc3QgdGltZVxuICAgKiAtIG9uIHVwZGF0aW5nIHRvIHJlYXBwbHkgZGlyZWN0aW9uIGNsYXNzIHRoYXQgbWF5IGNoYW5nZWRcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmJlZm9yZScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIERpcmVjdGlvbi5hZGRDbGFzcygpXG4gIH0pXG5cbiAgcmV0dXJuIERpcmVjdGlvblxufVxuIiwiLyoqXG4gKiBSZWZsZWN0cyB2YWx1ZSBvZiBnbGlkZSBtb3ZlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogTmVnYXRlcyB0aGUgcGFzc2VkIHRyYW5zbGF0ZSBpZiBnbGlkZSBpcyBpbiBSVEwgb3B0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5ICh0cmFuc2xhdGUpIHtcbiAgICAgIGlmIChDb21wb25lbnRzLkRpcmVjdGlvbi5pcygncnRsJykpIHtcbiAgICAgICAgcmV0dXJuIC10cmFuc2xhdGVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZVxuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggYSBgZ2FwYCBzZXR0aW5ncy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogTW9kaWZpZXMgcGFzc2VkIHRyYW5zbGF0ZSB2YWx1ZSB3aXRoIG51bWJlciBpbiB0aGUgYGdhcGAgc2V0dGluZ3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnkgKHRyYW5zbGF0ZSkge1xuICAgICAgY29uc3QgbXVsdGlwbGllciA9IE1hdGguZmxvb3IodHJhbnNsYXRlIC8gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoKVxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSArIChDb21wb25lbnRzLkdhcHMudmFsdWUgKiBtdWx0aXBsaWVyKVxuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggd2lkdGggb2YgYWRkaXRpb25hbCBjbG9uZXMgd2lkdGguXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIEFkZHMgdG8gdGhlIHBhc3NlZCB0cmFuc2xhdGUgd2lkdGggb2YgdGhlIGhhbGYgb2YgY2xvbmVzLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5ICh0cmFuc2xhdGUpIHtcbiAgICAgIHJldHVybiB0cmFuc2xhdGUgKyAoQ29tcG9uZW50cy5DbG9uZXMuZ3JvdyAvIDIpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4uLy4uL3V0aWxzL3VuaXQnXG5cbi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIGEgYHBlZWtgIHNldHRpbmdzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBNb2RpZmllcyBwYXNzZWQgdHJhbnNsYXRlIHZhbHVlIHdpdGggYSBgcGVla2Agc2V0dGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeSAodHJhbnNsYXRlKSB7XG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3MuZm9jdXNBdCA+PSAwKSB7XG4gICAgICAgIGxldCBwZWVrID0gQ29tcG9uZW50cy5QZWVrLnZhbHVlXG5cbiAgICAgICAgaWYgKGlzT2JqZWN0KHBlZWspKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIHBlZWsuYmVmb3JlXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJhbnNsYXRlIC0gcGVla1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlXG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIFVwZGF0ZXMgZ2xpZGUgbW92ZW1lbnQgd2l0aCBhIGBmb2N1c0F0YCBzZXR0aW5ncy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogTW9kaWZpZXMgcGFzc2VkIHRyYW5zbGF0ZSB2YWx1ZSB3aXRoIGluZGV4IGluIHRoZSBgZm9jdXNBdGAgc2V0dGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeSAodHJhbnNsYXRlKSB7XG4gICAgICBsZXQgZ2FwID0gQ29tcG9uZW50cy5HYXBzLnZhbHVlXG4gICAgICBsZXQgd2lkdGggPSBDb21wb25lbnRzLlNpemVzLndpZHRoXG4gICAgICBsZXQgZm9jdXNBdCA9IEdsaWRlLnNldHRpbmdzLmZvY3VzQXRcbiAgICAgIGxldCBzbGlkZVdpZHRoID0gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoXG5cbiAgICAgIGlmIChmb2N1c0F0ID09PSAnY2VudGVyJykge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRlIC0gKHdpZHRoIC8gMiAtIHNsaWRlV2lkdGggLyAyKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlIC0gKHNsaWRlV2lkdGggKiBmb2N1c0F0KSAtIChnYXAgKiBmb2N1c0F0KVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uL3V0aWxzL2xvZydcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlscy91bml0J1xuXG5pbXBvcnQgUnRsIGZyb20gJy4vdHJhbnNmb3JtZXJzL3J0bCdcbmltcG9ydCBHYXAgZnJvbSAnLi90cmFuc2Zvcm1lcnMvZ2FwJ1xuaW1wb3J0IEdyb3cgZnJvbSAnLi90cmFuc2Zvcm1lcnMvZ3JvdydcbmltcG9ydCBQZWVraW5nIGZyb20gJy4vdHJhbnNmb3JtZXJzL3BlZWtpbmcnXG5pbXBvcnQgRm9jdXNpbmcgZnJvbSAnLi90cmFuc2Zvcm1lcnMvZm9jdXNpbmcnXG5cbi8qKlxuICogQXBwbGllcyBkaWZmcmVudCB0cmFuc2Zvcm1lcnMgb24gdHJhbnNsYXRlIHZhbHVlLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogTWVyZ2UgaW5zdGFuY2UgdHJhbnNmb3JtZXJzIHdpdGggY29sbGVjdGlvbiBvZiBkZWZhdWx0IHRyYW5zZm9ybWVycy5cbiAgICogSXQncyBpbXBvcnRhbnQgdGhhdCB0aGUgUnRsIGNvbXBvbmVudCBiZSBsYXN0IG9uIHRoZSBsaXN0LFxuICAgKiBzbyBpdCByZWZsZWN0cyBhbGwgcHJldmlvdXMgdHJhbnNmb3JtYXRpb25zLlxuICAgKlxuICAgKiBAdHlwZSB7QXJyYXl9XG4gICAqL1xuICBsZXQgVFJBTlNGT1JNRVJTID0gW1xuICAgIEdhcCxcbiAgICBHcm93LFxuICAgIFBlZWtpbmcsXG4gICAgRm9jdXNpbmdcbiAgXS5jb25jYXQoR2xpZGUuX3QsIFtSdGxdKVxuXG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogUGlwbGluZXMgdHJhbnNsYXRlIHZhbHVlIHdpdGggcmVnaXN0ZXJlZCB0cmFuc2Zvcm1lcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtdXRhdGUgKHRyYW5zbGF0ZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUUkFOU0ZPUk1FUlMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybWVyID0gVFJBTlNGT1JNRVJTW2ldXG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odHJhbnNmb3JtZXIpICYmIGlzRnVuY3Rpb24odHJhbnNmb3JtZXIoKS5tb2RpZnkpKSB7XG4gICAgICAgICAgdHJhbnNsYXRlID0gdHJhbnNmb3JtZXIoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykubW9kaWZ5KHRyYW5zbGF0ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3YXJuKCdUcmFuc2Zvcm1lciBzaG91bGQgYmUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gb2JqZWN0IHdpdGggYG1vZGlmeSgpYCBtZXRob2QnKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGVcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBtdXRhdG9yIGZyb20gJy4uL211dGF0b3IvaW5kZXgnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IFRyYW5zbGF0ZSA9IHtcbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRyYW5zbGF0ZSBvbiBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldCAodmFsdWUpIHtcbiAgICAgIGxldCB0cmFuc2Zvcm0gPSBtdXRhdG9yKEdsaWRlLCBDb21wb25lbnRzKS5tdXRhdGUodmFsdWUpXG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgkey0xICogdHJhbnNmb3JtfXB4LCAwcHgsIDBweClgXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdmFsdWUgb2YgdHJhbnNsYXRlIGZyb20gSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmUgKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJydcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldFN0YXJ0SW5kZXggKCkge1xuICAgICAgY29uc3QgbGVuZ3RoID0gQ29tcG9uZW50cy5TaXplcy5sZW5ndGhcbiAgICAgIGNvbnN0IGluZGV4ID0gR2xpZGUuaW5kZXhcbiAgICAgIGNvbnN0IHBlclZpZXcgPSBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3XG5cbiAgICAgIGlmIChDb21wb25lbnRzLlJ1bi5pc09mZnNldCgnPicpIHx8IENvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCd8PicpKSB7XG4gICAgICAgIHJldHVybiBsZW5ndGggKyAoaW5kZXggLSBwZXJWaWV3KVxuICAgICAgfVxuXG4gICAgICAvLyBcIm1vZHVsbyBsZW5ndGhcIiBjb252ZXJ0cyBhbiBpbmRleCB0aGF0IGVxdWFscyBsZW5ndGggdG8gemVyb1xuICAgICAgcmV0dXJuIChpbmRleCArIHBlclZpZXcpICUgbGVuZ3RoXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXRUcmF2ZWxEaXN0YW5jZSAoKSB7XG4gICAgICBjb25zdCB0cmF2ZWxEaXN0YW5jZSA9IENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCAqIEdsaWRlLnNldHRpbmdzLnBlclZpZXdcblxuICAgICAgaWYgKENvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCc+JykgfHwgQ29tcG9uZW50cy5SdW4uaXNPZmZzZXQoJ3w+JykpIHtcbiAgICAgICAgLy8gcmV2ZXJzZSB0cmF2ZWwgZGlzdGFuY2Ugc28gdGhhdCB3ZSBkb24ndCBoYXZlIHRvIGNoYW5nZSBzdWJ0cmFjdCBvcGVyYXRpb25zXG4gICAgICAgIHJldHVybiB0cmF2ZWxEaXN0YW5jZSAqIC0xXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmF2ZWxEaXN0YW5jZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IHRyYW5zbGF0ZSB2YWx1ZTpcbiAgICogLSBvbiBtb3ZlIHRvIHJlZmxlY3QgaW5kZXggY2hhbmdlXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZWZsZWN0IHBvc3NpYmxlIGNoYW5nZXMgaW4gb3B0aW9uc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdtb3ZlJywgKGNvbnRleHQpID0+IHtcbiAgICBpZiAoIUdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSB8fCAhQ29tcG9uZW50cy5SdW4uaXNPZmZzZXQoKSkge1xuICAgICAgcmV0dXJuIFRyYW5zbGF0ZS5zZXQoY29udGV4dC5tb3ZlbWVudClcbiAgICB9XG5cbiAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uYWZ0ZXIoKCkgPT4ge1xuICAgICAgRXZlbnRzLmVtaXQoJ3RyYW5zbGF0ZS5qdW1wJylcblxuICAgICAgVHJhbnNsYXRlLnNldChDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGggKiBHbGlkZS5pbmRleClcbiAgICB9KVxuXG4gICAgY29uc3Qgc3RhcnRXaWR0aCA9IENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCAqIENvbXBvbmVudHMuVHJhbnNsYXRlLmdldFN0YXJ0SW5kZXgoKVxuICAgIHJldHVybiBUcmFuc2xhdGUuc2V0KHN0YXJ0V2lkdGggLSBDb21wb25lbnRzLlRyYW5zbGF0ZS5nZXRUcmF2ZWxEaXN0YW5jZSgpKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdHJhbnNsYXRlOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBUcmFuc2xhdGUucmVtb3ZlKClcbiAgfSlcblxuICByZXR1cm4gVHJhbnNsYXRlXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBIb2xkcyBpbmFjdGl2aXR5IHN0YXR1cyBvZiB0cmFuc2l0aW9uLlxuICAgKiBXaGVuIHRydWUgdHJhbnNpdGlvbiBpcyBub3QgYXBwbGllZC5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBsZXQgZGlzYWJsZWQgPSBmYWxzZVxuXG4gIGNvbnN0IFRyYW5zaXRpb24gPSB7XG4gICAgLyoqXG4gICAgICogQ29tcG9zZXMgc3RyaW5nIG9mIHRoZSBDU1MgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBjb21wb3NlIChwcm9wZXJ0eSkge1xuICAgICAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgaWYgKCFkaXNhYmxlZCkge1xuICAgICAgICByZXR1cm4gYCR7cHJvcGVydHl9ICR7dGhpcy5kdXJhdGlvbn1tcyAke3NldHRpbmdzLmFuaW1hdGlvblRpbWluZ0Z1bmN9YFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYCR7cHJvcGVydHl9IDBtcyAke3NldHRpbmdzLmFuaW1hdGlvblRpbWluZ0Z1bmN9YFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRyYW5zaXRpb24gb24gSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmc9fSBwcm9wZXJ0eVxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0IChwcm9wZXJ0eSA9ICd0cmFuc2Zvcm0nKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gdGhpcy5jb21wb3NlKHByb3BlcnR5KVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHZhbHVlIG9mIHRyYW5zaXRpb24gZnJvbSBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZSAoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gJydcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUnVucyBjYWxsYmFjayBhZnRlciBhbmltYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFmdGVyIChjYWxsYmFjaykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKClcbiAgICAgIH0sIHRoaXMuZHVyYXRpb24pXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZSB0cmFuc2l0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBlbmFibGUgKCkge1xuICAgICAgZGlzYWJsZWQgPSBmYWxzZVxuXG4gICAgICB0aGlzLnNldCgpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc2FibGUgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZGlzYWJsZSAoKSB7XG4gICAgICBkaXNhYmxlZCA9IHRydWVcblxuICAgICAgdGhpcy5zZXQoKVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShUcmFuc2l0aW9uLCAnZHVyYXRpb24nLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBkdXJhdGlvbiBvZiB0aGUgdHJhbnNpdGlvbiBiYXNlZFxuICAgICAqIG9uIGN1cnJlbnRseSBydW5uaW5nIGFuaW1hdGlvbiB0eXBlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICBpZiAoR2xpZGUuaXNUeXBlKCdzbGlkZXInKSAmJiBDb21wb25lbnRzLlJ1bi5vZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzLnJld2luZER1cmF0aW9uXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZXR0aW5ncy5hbmltYXRpb25EdXJhdGlvblxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogU2V0IHRyYW5zaXRpb24gYHN0eWxlYCB2YWx1ZTpcbiAgICogLSBvbiBlYWNoIG1vdmluZywgYmVjYXVzZSBpdCBtYXkgYmUgY2xlYXJlZCBieSBvZmZzZXQgbW92ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdtb3ZlJywgKCkgPT4ge1xuICAgIFRyYW5zaXRpb24uc2V0KClcbiAgfSlcblxuICAvKipcbiAgICogRGlzYWJsZSB0cmFuc2l0aW9uOlxuICAgKiAtIGJlZm9yZSBpbml0aWFsIGJ1aWxkIHRvIGF2b2lkIHRyYW5zaXRpb25pbmcgZnJvbSBgMGAgdG8gYHN0YXJ0QXRgIGluZGV4XG4gICAqIC0gd2hpbGUgcmVzaXppbmcgd2luZG93IGFuZCByZWNhbGN1bGF0aW5nIGRpbWVudGlvbnNcbiAgICogLSBvbiBqdW1waW5nIGZyb20gb2Zmc2V0IHRyYW5zaXRpb24gYXQgc3RhcnQgYW5kIGVuZCBlZGdlcyBpbiBgY2Fyb3VzZWxgIHR5cGVcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmJlZm9yZScsICdyZXNpemUnLCAndHJhbnNsYXRlLmp1bXAnXSwgKCkgPT4ge1xuICAgIFRyYW5zaXRpb24uZGlzYWJsZSgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIEVuYWJsZSB0cmFuc2l0aW9uOlxuICAgKiAtIG9uIGVhY2ggcnVubmluZywgYmVjYXVzZSBpdCBtYXkgYmUgZGlzYWJsZWQgYnkgb2Zmc2V0IG1vdmVcbiAgICovXG4gIEV2ZW50cy5vbigncnVuJywgKCkgPT4ge1xuICAgIFRyYW5zaXRpb24uZW5hYmxlKClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3ZlIHRyYW5zaXRpb246XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIFRyYW5zaXRpb24ucmVtb3ZlKClcbiAgfSlcblxuICByZXR1cm4gVHJhbnNpdGlvblxufVxuIiwiLyoqXG4gKiBUZXN0IHZpYSBhIGdldHRlciBpbiB0aGUgb3B0aW9ucyBvYmplY3QgdG8gc2VlXG4gKiBpZiB0aGUgcGFzc2l2ZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZC5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL0V2ZW50TGlzdGVuZXJPcHRpb25zL2Jsb2IvZ2gtcGFnZXMvZXhwbGFpbmVyLm1kI2ZlYXR1cmUtZGV0ZWN0aW9uXG4gKi9cblxubGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlXG5cbnRyeSB7XG4gIGxldCBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICBnZXQgKCkge1xuICAgICAgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZVxuICAgIH1cbiAgfSlcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdFBhc3NpdmUnLCBudWxsLCBvcHRzKVxuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGVzdFBhc3NpdmUnLCBudWxsLCBvcHRzKVxufSBjYXRjaCAoZSkge31cblxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydHNQYXNzaXZlXG4iLCJpbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJy4uL3V0aWxzL3dhaXQnXG5pbXBvcnQgeyB0b0ludCwgdG9GbG9hdCB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5pbXBvcnQgc3VwcG9ydHNQYXNzaXZlIGZyb20gJy4uL3V0aWxzL2RldGVjdC1wYXNzaXZlLWV2ZW50J1xuXG5pbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuY29uc3QgU1RBUlRfRVZFTlRTID0gWyd0b3VjaHN0YXJ0JywgJ21vdXNlZG93biddXG5jb25zdCBNT1ZFX0VWRU5UUyA9IFsndG91Y2htb3ZlJywgJ21vdXNlbW92ZSddXG5jb25zdCBFTkRfRVZFTlRTID0gWyd0b3VjaGVuZCcsICd0b3VjaGNhbmNlbCcsICdtb3VzZXVwJywgJ21vdXNlbGVhdmUnXVxuY29uc3QgTU9VU0VfRVZFTlRTID0gWydtb3VzZWRvd24nLCAnbW91c2Vtb3ZlJywgJ21vdXNldXAnLCAnbW91c2VsZWF2ZSddXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgbGV0IHN3aXBlU2luID0gMFxuICBsZXQgc3dpcGVTdGFydFggPSAwXG4gIGxldCBzd2lwZVN0YXJ0WSA9IDBcbiAgbGV0IGRpc2FibGVkID0gZmFsc2VcbiAgbGV0IGNhcHR1cmUgPSAoc3VwcG9ydHNQYXNzaXZlKSA/IHsgcGFzc2l2ZTogdHJ1ZSB9IDogZmFsc2VcblxuICBjb25zdCBTd2lwZSA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBzd2lwZSBiaW5kaW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5iaW5kU3dpcGVTdGFydCgpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGBzd2lwZXN0YXJ0YCBldmVudC4gQ2FsY3VsYXRlcyBlbnRyeSBwb2ludHMgb2YgdGhlIHVzZXIncyB0YXAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHN0YXJ0IChldmVudCkge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiAhR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKClcblxuICAgICAgICBsZXQgc3dpcGUgPSB0aGlzLnRvdWNoZXMoZXZlbnQpXG5cbiAgICAgICAgc3dpcGVTaW4gPSBudWxsXG4gICAgICAgIHN3aXBlU3RhcnRYID0gdG9JbnQoc3dpcGUucGFnZVgpXG4gICAgICAgIHN3aXBlU3RhcnRZID0gdG9JbnQoc3dpcGUucGFnZVkpXG5cbiAgICAgICAgdGhpcy5iaW5kU3dpcGVNb3ZlKClcbiAgICAgICAgdGhpcy5iaW5kU3dpcGVFbmQoKVxuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdzd2lwZS5zdGFydCcpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGBzd2lwZW1vdmVgIGV2ZW50LiBDYWxjdWxhdGVzIHVzZXIncyB0YXAgYW5nbGUgYW5kIGRpc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgbW92ZSAoZXZlbnQpIHtcbiAgICAgIGlmICghR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgbGV0IHsgdG91Y2hBbmdsZSwgdG91Y2hSYXRpbywgY2xhc3NlcyB9ID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgICBsZXQgc3dpcGUgPSB0aGlzLnRvdWNoZXMoZXZlbnQpXG5cbiAgICAgICAgbGV0IHN1YkV4U3ggPSB0b0ludChzd2lwZS5wYWdlWCkgLSBzd2lwZVN0YXJ0WFxuICAgICAgICBsZXQgc3ViRXlTeSA9IHRvSW50KHN3aXBlLnBhZ2VZKSAtIHN3aXBlU3RhcnRZXG4gICAgICAgIGxldCBwb3dFWCA9IE1hdGguYWJzKHN1YkV4U3ggPDwgMilcbiAgICAgICAgbGV0IHBvd0VZID0gTWF0aC5hYnMoc3ViRXlTeSA8PCAyKVxuICAgICAgICBsZXQgc3dpcGVIeXBvdGVudXNlID0gTWF0aC5zcXJ0KHBvd0VYICsgcG93RVkpXG4gICAgICAgIGxldCBzd2lwZUNhdGhldHVzID0gTWF0aC5zcXJ0KHBvd0VZKVxuXG4gICAgICAgIHN3aXBlU2luID0gTWF0aC5hc2luKHN3aXBlQ2F0aGV0dXMgLyBzd2lwZUh5cG90ZW51c2UpXG5cbiAgICAgICAgaWYgKHN3aXBlU2luICogMTgwIC8gTWF0aC5QSSA8IHRvdWNoQW5nbGUpIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAgICAgQ29tcG9uZW50cy5Nb3ZlLm1ha2Uoc3ViRXhTeCAqIHRvRmxvYXQodG91Y2hSYXRpbykpXG5cbiAgICAgICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuZHJhZ2dpbmcpXG5cbiAgICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUubW92ZScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgYHN3aXBlZW5kYCBldmVudC4gRmluaXRpYWxpemVzIHVzZXIncyB0YXAgYW5kIGRlY2lkZXMgYWJvdXQgZ2xpZGUgbW92ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZW5kIChldmVudCkge1xuICAgICAgaWYgKCFHbGlkZS5kaXNhYmxlZCkge1xuICAgICAgICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICAgIGxldCBzd2lwZSA9IHRoaXMudG91Y2hlcyhldmVudClcbiAgICAgICAgbGV0IHRocmVzaG9sZCA9IHRoaXMudGhyZXNob2xkKGV2ZW50KVxuXG4gICAgICAgIGxldCBzd2lwZURpc3RhbmNlID0gc3dpcGUucGFnZVggLSBzd2lwZVN0YXJ0WFxuICAgICAgICBsZXQgc3dpcGVEZWcgPSBzd2lwZVNpbiAqIDE4MCAvIE1hdGguUElcbiAgICAgICAgbGV0IHN0ZXBzID0gTWF0aC5yb3VuZChzd2lwZURpc3RhbmNlIC8gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoKVxuXG4gICAgICAgIHRoaXMuZW5hYmxlKClcblxuICAgICAgICBpZiAoc3dpcGVEaXN0YW5jZSA+IHRocmVzaG9sZCAmJiBzd2lwZURlZyA8IHNldHRpbmdzLnRvdWNoQW5nbGUpIHtcbiAgICAgICAgICAvLyBXaGlsZSBzd2lwZSBpcyBwb3NpdGl2ZSBhbmQgZ3JlYXRlciB0aGFuIHRocmVzaG9sZCBtb3ZlIGJhY2t3YXJkLlxuICAgICAgICAgIGlmIChzZXR0aW5ncy5wZXJUb3VjaCkge1xuICAgICAgICAgICAgc3RlcHMgPSBNYXRoLm1pbihzdGVwcywgdG9JbnQoc2V0dGluZ3MucGVyVG91Y2gpKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChDb21wb25lbnRzLkRpcmVjdGlvbi5pcygncnRsJykpIHtcbiAgICAgICAgICAgIHN0ZXBzID0gLXN0ZXBzXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKGA8JHtzdGVwc31gKSlcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBzd2lwZURpc3RhbmNlIDwgLXRocmVzaG9sZCAmJlxuICAgICAgICAgIHN3aXBlRGVnIDwgc2V0dGluZ3MudG91Y2hBbmdsZVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBXaGlsZSBzd2lwZSBpcyBuZWdhdGl2ZSBhbmQgbG93ZXIgdGhhbiBuZWdhdGl2ZSB0aHJlc2hvbGQgbW92ZSBmb3J3YXJkLlxuICAgICAgICAgIGlmIChzZXR0aW5ncy5wZXJUb3VjaCkge1xuICAgICAgICAgICAgc3RlcHMgPSBNYXRoLm1heChzdGVwcywgLXRvSW50KHNldHRpbmdzLnBlclRvdWNoKSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoQ29tcG9uZW50cy5EaXJlY3Rpb24uaXMoJ3J0bCcpKSB7XG4gICAgICAgICAgICBzdGVwcyA9IC1zdGVwc1xuICAgICAgICAgIH1cblxuICAgICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZShgPiR7c3RlcHN9YCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gV2hpbGUgc3dpcGUgZG9uJ3QgcmVhY2ggZGlzdGFuY2UgYXBwbHkgcHJldmlvdXMgdHJhbnNmb3JtLlxuICAgICAgICAgIENvbXBvbmVudHMuTW92ZS5tYWtlKClcbiAgICAgICAgfVxuXG4gICAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5yZW1vdmUoc2V0dGluZ3MuY2xhc3Nlcy5kcmFnZ2luZylcblxuICAgICAgICB0aGlzLnVuYmluZFN3aXBlTW92ZSgpXG4gICAgICAgIHRoaXMudW5iaW5kU3dpcGVFbmQoKVxuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdzd2lwZS5lbmQnKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBzd2lwZSdzIHN0YXJ0aW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kU3dpcGVTdGFydCAoKSB7XG4gICAgICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICBpZiAoc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgQmluZGVyLm9uKFNUQVJUX0VWRU5UU1swXSwgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIChldmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhcnQoZXZlbnQpXG4gICAgICAgIH0sIGNhcHR1cmUpXG4gICAgICB9XG5cbiAgICAgIGlmIChzZXR0aW5ncy5kcmFnVGhyZXNob2xkKSB7XG4gICAgICAgIEJpbmRlci5vbihTVEFSVF9FVkVOVFNbMV0sIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXJ0KGV2ZW50KVxuICAgICAgICB9LCBjYXB0dXJlKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIHN3aXBlJ3Mgc3RhcnRpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZFN3aXBlU3RhcnQgKCkge1xuICAgICAgQmluZGVyLm9mZihTVEFSVF9FVkVOVFNbMF0sIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCBjYXB0dXJlKVxuICAgICAgQmluZGVyLm9mZihTVEFSVF9FVkVOVFNbMV0sIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCBjYXB0dXJlKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBzd2lwZSdzIG1vdmluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZFN3aXBlTW92ZSAoKSB7XG4gICAgICBCaW5kZXIub24oTU9WRV9FVkVOVFMsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCB0aHJvdHRsZSgoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5tb3ZlKGV2ZW50KVxuICAgICAgfSwgR2xpZGUuc2V0dGluZ3MudGhyb3R0bGUpLCBjYXB0dXJlKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIHN3aXBlJ3MgbW92aW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmRTd2lwZU1vdmUgKCkge1xuICAgICAgQmluZGVyLm9mZihNT1ZFX0VWRU5UUywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIGNhcHR1cmUpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIHN3aXBlJ3MgZW5kaW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kU3dpcGVFbmQgKCkge1xuICAgICAgQmluZGVyLm9uKEVORF9FVkVOVFMsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5lbmQoZXZlbnQpXG4gICAgICB9KVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIHN3aXBlJ3MgZW5kaW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmRTd2lwZUVuZCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKEVORF9FVkVOVFMsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpemVzIGV2ZW50IHRvdWNoZXMgcG9pbnRzIGFjY29ydGluZyB0byBkaWZmZXJlbnQgdHlwZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICB0b3VjaGVzIChldmVudCkge1xuICAgICAgaWYgKE1PVVNFX0VWRU5UUy5pbmRleE9mKGV2ZW50LnR5cGUpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBldmVudC50b3VjaGVzWzBdIHx8IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgbWluaW11bSBzd2lwZSBkaXN0YW5jZSBzZXR0aW5ncyBiYXNlZCBvbiBldmVudCB0eXBlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIHRocmVzaG9sZCAoZXZlbnQpIHtcbiAgICAgIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgIGlmIChNT1VTRV9FVkVOVFMuaW5kZXhPZihldmVudC50eXBlKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBzZXR0aW5ncy5kcmFnVGhyZXNob2xkXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZXR0aW5ncy5zd2lwZVRocmVzaG9sZFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGVzIHN3aXBlIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBlbmFibGUgKCkge1xuICAgICAgZGlzYWJsZWQgPSBmYWxzZVxuXG4gICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uZW5hYmxlKClcblxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgc3dpcGUgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzZWxmfVxuICAgICAqL1xuICAgIGRpc2FibGUgKCkge1xuICAgICAgZGlzYWJsZWQgPSB0cnVlXG5cbiAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5kaXNhYmxlKClcblxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIGNvbXBvbmVudCBjbGFzczpcbiAgICogLSBhZnRlciBpbml0aWFsIGJ1aWxkaW5nXG4gICAqL1xuICBFdmVudHMub24oJ2J1aWxkLmFmdGVyJywgKCkgPT4ge1xuICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5hZGQoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlcy5zd2lwZWFibGUpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzd2lwaW5nIGJpbmRpbmdzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIHJlbW92ZSBhZGRlZCBFdmVudExpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIFN3aXBlLnVuYmluZFN3aXBlU3RhcnQoKVxuICAgIFN3aXBlLnVuYmluZFN3aXBlTW92ZSgpXG4gICAgU3dpcGUudW5iaW5kU3dpcGVFbmQoKVxuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gU3dpcGVcbn1cbiIsImltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIGNvbnN0IEltYWdlcyA9IHtcbiAgICAvKipcbiAgICAgKiBCaW5kcyBsaXN0ZW5lciB0byBnbGlkZSB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLmJpbmQoKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBgZHJhZ3N0YXJ0YCBldmVudCBvbiB3cmFwcGVyIHRvIHByZXZlbnQgZHJhZ2dpbmcgaW1hZ2VzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kICgpIHtcbiAgICAgIEJpbmRlci5vbignZHJhZ3N0YXJ0JywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIHRoaXMuZHJhZ3N0YXJ0KVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIGBkcmFnc3RhcnRgIGV2ZW50IG9uIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKCdkcmFnc3RhcnQnLCBDb21wb25lbnRzLkh0bWwud3JhcHBlcilcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlci4gUHJldmVudHMgZHJhZ2dpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGRyYWdzdGFydCAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGZyb20gaW1hZ2VzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIHJlbW92ZSBhZGRlZCBFdmVudExpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIEltYWdlcy51bmJpbmQoKVxuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gSW1hZ2VzXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5cbmltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIC8qKlxuICAgKiBIb2xkcyBkZXRhY2hpbmcgc3RhdHVzIG9mIGFuY2hvcnMuXG4gICAqIFByZXZlbnRzIGRldGFjaGluZyBvZiBhbHJlYWR5IGRldGFjaGVkIGFuY2hvcnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgbGV0IGRldGFjaGVkID0gZmFsc2VcblxuICAvKipcbiAgICogSG9sZHMgcHJldmVudGluZyBzdGF0dXMgb2YgYW5jaG9ycy5cbiAgICogSWYgYHRydWVgIHJlZGlyZWN0aW9uIGFmdGVyIGNsaWNrIHdpbGwgYmUgZGlzYWJsZWQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgbGV0IHByZXZlbnRlZCA9IGZhbHNlXG5cbiAgY29uc3QgQW5jaG9ycyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgYSBpbml0aWFsIHN0YXRlIG9mIGFuY2hvcnMgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgLyoqXG4gICAgICAgKiBIb2xkcyBjb2xsZWN0aW9uIG9mIGFuY2hvcnMgZWxlbWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHtIVE1MQ29sbGVjdGlvbn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5fYSA9IENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKVxuXG4gICAgICB0aGlzLmJpbmQoKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBldmVudHMgdG8gYW5jaG9ycyBpbnNpZGUgYSB0cmFjay5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZCAoKSB7XG4gICAgICBCaW5kZXIub24oJ2NsaWNrJywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIHRoaXMuY2xpY2spXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgZXZlbnRzIGF0dGFjaGVkIHRvIGFuY2hvcnMgaW5zaWRlIGEgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKCdjbGljaycsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudC4gUHJldmVudHMgY2xpY2tzIHdoZW4gZ2xpZGUgaXMgaW4gYHByZXZlbnRgIHN0YXR1cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGNsaWNrIChldmVudCkge1xuICAgICAgaWYgKHByZXZlbnRlZCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIGFuY2hvcnMgY2xpY2sgZXZlbnQgaW5zaWRlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBkZXRhY2ggKCkge1xuICAgICAgcHJldmVudGVkID0gdHJ1ZVxuXG4gICAgICBpZiAoIWRldGFjaGVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZHJhZ2dhYmxlID0gZmFsc2VcblxuICAgICAgICAgIHRoaXMuaXRlbXNbaV0uc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgJ2RhdGEtaHJlZicsXG4gICAgICAgICAgICB0aGlzLml0ZW1zW2ldLmdldEF0dHJpYnV0ZSgnaHJlZicpXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKVxuICAgICAgICB9XG5cbiAgICAgICAgZGV0YWNoZWQgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEF0dGFjaGVzIGFuY2hvcnMgY2xpY2sgZXZlbnRzIGluc2lkZSBnbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3NlbGZ9XG4gICAgICovXG4gICAgYXR0YWNoICgpIHtcbiAgICAgIHByZXZlbnRlZCA9IGZhbHNlXG5cbiAgICAgIGlmIChkZXRhY2hlZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLml0ZW1zW2ldLmRyYWdnYWJsZSA9IHRydWVcblxuICAgICAgICAgIHRoaXMuaXRlbXNbaV0uc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgJ2hyZWYnLFxuICAgICAgICAgICAgdGhpcy5pdGVtc1tpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaHJlZicpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgZGV0YWNoZWQgPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgfVxuXG4gIGRlZmluZShBbmNob3JzLCAnaXRlbXMnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBjb2xsZWN0aW9uIG9mIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBBbmNob3JzLl9hXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBEZXRhY2ggYW5jaG9ycyBpbnNpZGUgc2xpZGVzOlxuICAgKiAtIG9uIHN3aXBpbmcsIHNvIHRoZXkgd29uJ3QgcmVkaXJlY3QgdG8gaXRzIGBocmVmYCBhdHRyaWJ1dGVzXG4gICAqL1xuICBFdmVudHMub24oJ3N3aXBlLm1vdmUnLCAoKSA9PiB7XG4gICAgQW5jaG9ycy5kZXRhY2goKVxuICB9KVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW5jaG9ycyBpbnNpZGUgc2xpZGVzOlxuICAgKiAtIGFmdGVyIHN3aXBpbmcgYW5kIHRyYW5zaXRpb25zIGVuZHMsIHNvIHRoZXkgY2FuIHJlZGlyZWN0IGFmdGVyIGNsaWNrIGFnYWluXG4gICAqL1xuICBFdmVudHMub24oJ3N3aXBlLmVuZCcsICgpID0+IHtcbiAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uYWZ0ZXIoKCkgPT4ge1xuICAgICAgQW5jaG9ycy5hdHRhY2goKVxuICAgIH0pXG4gIH0pXG5cbiAgLyoqXG4gICAqIFVuYmluZCBhbmNob3JzIGluc2lkZSBzbGlkZXM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gYnJpbmcgYW5jaG9ycyB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIEFuY2hvcnMuYXR0YWNoKClcbiAgICBBbmNob3JzLnVuYmluZCgpXG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBBbmNob3JzXG59XG4iLCJpbXBvcnQgeyBzaWJsaW5ncyB9IGZyb20gJy4uL3V0aWxzL2RvbSdcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCBzdXBwb3J0c1Bhc3NpdmUgZnJvbSAnLi4vdXRpbHMvZGV0ZWN0LXBhc3NpdmUtZXZlbnQnXG5cbmltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5jb25zdCBOQVZfU0VMRUNUT1IgPSAnW2RhdGEtZ2xpZGUtZWw9XCJjb250cm9sc1tuYXZdXCJdJ1xuY29uc3QgQ09OVFJPTFNfU0VMRUNUT1IgPSAnW2RhdGEtZ2xpZGUtZWxePVwiY29udHJvbHNcIl0nXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgbGV0IGNhcHR1cmUgPSAoc3VwcG9ydHNQYXNzaXZlKSA/IHsgcGFzc2l2ZTogdHJ1ZSB9IDogZmFsc2VcblxuICBjb25zdCBDb250cm9scyA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0cyBhcnJvd3MuIEJpbmRzIGV2ZW50cyBsaXN0ZW5lcnNcbiAgICAgKiB0byB0aGUgYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIC8qKlxuICAgICAgICogQ29sbGVjdGlvbiBvZiBuYXZpZ2F0aW9uIEhUTUwgZWxlbWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHtIVE1MQ29sbGVjdGlvbn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5fbiA9IENvbXBvbmVudHMuSHRtbC5yb290LnF1ZXJ5U2VsZWN0b3JBbGwoTkFWX1NFTEVDVE9SKVxuXG4gICAgICAvKipcbiAgICAgICAqIENvbGxlY3Rpb24gb2YgY29udHJvbHMgSFRNTCBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0hUTUxDb2xsZWN0aW9ufVxuICAgICAgICovXG4gICAgICB0aGlzLl9jID0gQ29tcG9uZW50cy5IdG1sLnJvb3QucXVlcnlTZWxlY3RvckFsbChDT05UUk9MU19TRUxFQ1RPUilcblxuICAgICAgdGhpcy5hZGRCaW5kaW5ncygpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldEFjdGl2ZSAoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyh0aGlzLl9uW2ldLmNoaWxkcmVuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVBY3RpdmUgKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3ModGhpcy5fbltpXS5jaGlsZHJlbilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBhY3RpdmUgY2xhc3Mgb24gaXRlbXMgaW5zaWRlIG5hdmlnYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gY29udHJvbHNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFkZENsYXNzIChjb250cm9scykge1xuICAgICAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcbiAgICAgIGxldCBpdGVtID0gY29udHJvbHNbR2xpZGUuaW5kZXhdXG5cbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChzZXR0aW5ncy5jbGFzc2VzLmFjdGl2ZU5hdilcblxuICAgICAgICBzaWJsaW5ncyhpdGVtKS5mb3JFYWNoKHNpYmxpbmcgPT4ge1xuICAgICAgICAgIHNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZShzZXR0aW5ncy5jbGFzc2VzLmFjdGl2ZU5hdilcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhY3RpdmUgY2xhc3MgZnJvbSBhY3RpdmUgY29udHJvbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBjb250cm9sc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3MgKGNvbnRyb2xzKSB7XG4gICAgICBsZXQgaXRlbSA9IGNvbnRyb2xzW0dsaWRlLmluZGV4XVxuXG4gICAgICBpZiAoaXRlbSkge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlcy5hY3RpdmVOYXYpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgaGFuZGxlcyB0byB0aGUgZWFjaCBncm91cCBvZiBjb250cm9scy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYWRkQmluZGluZ3MgKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYmluZCh0aGlzLl9jW2ldLmNoaWxkcmVuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGhhbmRsZXMgZnJvbSB0aGUgZWFjaCBncm91cCBvZiBjb250cm9scy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQmluZGluZ3MgKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMudW5iaW5kKHRoaXMuX2NbaV0uY2hpbGRyZW4pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIGV2ZW50cyB0byBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IGVsZW1lbnRzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kIChlbGVtZW50cykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBCaW5kZXIub24oJ2NsaWNrJywgZWxlbWVudHNbaV0sIHRoaXMuY2xpY2spXG4gICAgICAgIEJpbmRlci5vbigndG91Y2hzdGFydCcsIGVsZW1lbnRzW2ldLCB0aGlzLmNsaWNrLCBjYXB0dXJlKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIGV2ZW50cyBiaW5kZWQgdG8gdGhlIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gZWxlbWVudHNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZCAoZWxlbWVudHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQmluZGVyLm9mZihbJ2NsaWNrJywgJ3RvdWNoc3RhcnQnXSwgZWxlbWVudHNbaV0pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgYGNsaWNrYCBldmVudCBvbiB0aGUgYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICogTW92ZXMgc2xpZGVyIGluIGRyaWVjdGlvbiBwcmVjaXNlZCBpblxuICAgICAqIGBkYXRhLWdsaWRlLWRpcmAgYXR0cmlidXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBjbGljayAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWdsaWRlLWRpcicpKSlcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoQ29udHJvbHMsICdpdGVtcycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGNvbGxlY3Rpb24gb2YgdGhlIGNvbnRyb2xzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gQ29udHJvbHMuX2NcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIFN3YXAgYWN0aXZlIGNsYXNzIG9mIGN1cnJlbnQgbmF2aWdhdGlvbiBpdGVtOlxuICAgKiAtIGFmdGVyIG1vdW50aW5nIHRvIHNldCBpdCB0byBpbml0aWFsIGluZGV4XG4gICAqIC0gYWZ0ZXIgZWFjaCBtb3ZlIHRvIHRoZSBuZXcgaW5kZXhcbiAgICovXG4gIEV2ZW50cy5vbihbJ21vdW50LmFmdGVyJywgJ21vdmUuYWZ0ZXInXSwgKCkgPT4ge1xuICAgIENvbnRyb2xzLnNldEFjdGl2ZSgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBiaW5kaW5ncyBhbmQgSFRNTCBDbGFzc2VzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIENvbnRyb2xzLnJlbW92ZUJpbmRpbmdzKClcbiAgICBDb250cm9scy5yZW1vdmVBY3RpdmUoKVxuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gQ29udHJvbHNcbn1cbiIsImltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIGNvbnN0IEtleWJvYXJkID0ge1xuICAgIC8qKlxuICAgICAqIEJpbmRzIGtleWJvYXJkIGV2ZW50cyBvbiBjb21wb25lbnQgbW91bnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIGlmIChHbGlkZS5zZXR0aW5ncy5rZXlib2FyZCkge1xuICAgICAgICB0aGlzLmJpbmQoKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGtleWJvYXJkIHByZXNzIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZCAoKSB7XG4gICAgICBCaW5kZXIub24oJ2tleXVwJywgZG9jdW1lbnQsIHRoaXMucHJlc3MpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMga2V5Ym9hcmQgcHJlc3MgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQgKCkge1xuICAgICAgQmluZGVyLm9mZigna2V5dXAnLCBkb2N1bWVudClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBrZXlib2FyZCdzIGFycm93cyBwcmVzcyBhbmQgbW92aW5nIGdsaWRlIGZvd2FyZCBhbmQgYmFja3dhcmQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBwcmVzcyAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOSkge1xuICAgICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKENvbXBvbmVudHMuRGlyZWN0aW9uLnJlc29sdmUoJz4nKSlcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3KSB7XG4gICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZSgnPCcpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgZnJvbSBrZXlib2FyZDpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIHJlbW92ZSBhZGRlZCBldmVudHNcbiAgICogLSBvbiB1cGRhdGluZyB0byByZW1vdmUgZXZlbnRzIGJlZm9yZSByZW1vdW50aW5nXG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgS2V5Ym9hcmQudW5iaW5kKClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnRcbiAgICogLSBvbiB1cGRhdGluZyB0byByZWZsZWN0IHBvdGVudGlhbCBjaGFuZ2VzIGluIHNldHRpbmdzXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsICgpID0+IHtcbiAgICBLZXlib2FyZC5tb3VudCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYmluZGVyOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gcmVtb3ZlIGxpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gS2V5Ym9hcmRcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCB7IHRvSW50LCBpc1VuZGVmaW5lZCB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbmltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIGNvbnN0IEF1dG9wbGF5ID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGF1dG9wbGF5aW5nIGFuZCBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuc3RhcnQoKVxuXG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3MuaG92ZXJwYXVzZSkge1xuICAgICAgICB0aGlzLmJpbmQoKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgYXV0b3BsYXlpbmcgaW4gY29uZmlndXJlZCBpbnRlcnZhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbnxOdW1iZXJ9IGZvcmNlIFJ1biBhdXRvcGxheWluZyB3aXRoIHBhc3NlZCBpbnRlcnZhbCByZWdhcmRsZXNzIG9mIGBhdXRvcGxheWAgc2V0dGluZ3NcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHN0YXJ0ICgpIHtcbiAgICAgIGlmIChHbGlkZS5zZXR0aW5ncy5hdXRvcGxheSkge1xuICAgICAgICBpZiAoaXNVbmRlZmluZWQodGhpcy5faSkpIHtcbiAgICAgICAgICB0aGlzLl9pID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9wKClcblxuICAgICAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZSgnPicpXG5cbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKVxuICAgICAgICAgIH0sIHRoaXMudGltZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhdXRvcnVubmluZyBvZiB0aGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHN0b3AgKCkge1xuICAgICAgdGhpcy5faSA9IGNsZWFySW50ZXJ2YWwodGhpcy5faSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgYXV0b3BsYXlpbmcgd2hpbGUgbW91c2UgaXMgb3ZlciBnbGlkZSdzIGFyZWEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQgKCkge1xuICAgICAgQmluZGVyLm9uKCdtb3VzZW92ZXInLCBDb21wb25lbnRzLkh0bWwucm9vdCwgKCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3AoKVxuICAgICAgfSlcblxuICAgICAgQmluZGVyLm9uKCdtb3VzZW91dCcsIENvbXBvbmVudHMuSHRtbC5yb290LCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhcnQoKVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kIG1vdXNlb3ZlciBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQgKCkge1xuICAgICAgQmluZGVyLm9mZihbJ21vdXNlb3ZlcicsICdtb3VzZW91dCddLCBDb21wb25lbnRzLkh0bWwucm9vdClcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoQXV0b3BsYXksICd0aW1lJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdGltZSBwZXJpb2QgdmFsdWUgZm9yIHRoZSBhdXRvcGxheSBpbnRlcnZhbC4gUHJpb3JpdGl6ZXNcbiAgICAgKiB0aW1lcyBpbiBgZGF0YS1nbGlkZS1hdXRvcGxheWAgYXR0cnVidXRlcyBvdmVyIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIGxldCBhdXRvcGxheSA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXNbR2xpZGUuaW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS1nbGlkZS1hdXRvcGxheScpXG5cbiAgICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgICByZXR1cm4gdG9JbnQoYXV0b3BsYXkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0b0ludChHbGlkZS5zZXR0aW5ncy5hdXRvcGxheSlcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIFN0b3AgYXV0b3BsYXlpbmcgYW5kIHVuYmluZCBldmVudHM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gY2xlYXIgZGVmaW5lZCBpbnRlcnZhbFxuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEkgdG8gcmVzZXQgaW50ZXJ2YWwgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIEF1dG9wbGF5LnVuYmluZCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFN0b3AgYXV0b3BsYXlpbmc6XG4gICAqIC0gYmVmb3JlIGVhY2ggcnVuLCB0byByZXN0YXJ0IGF1dG9wbGF5aW5nXG4gICAqIC0gb24gcGF1c2luZyB2aWEgQVBJXG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gY2xlYXIgZGVmaW5lZCBpbnRlcnZhbFxuICAgKiAtIHdoaWxlIHN0YXJ0aW5nIGEgc3dpcGVcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJIHRvIHJlc2V0IGludGVydmFsIHRoYXQgbWF5IGNoYW5nZWRcbiAgICovXG4gIEV2ZW50cy5vbihbJ3J1bi5iZWZvcmUnLCAncGF1c2UnLCAnZGVzdHJveScsICdzd2lwZS5zdGFydCcsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIEF1dG9wbGF5LnN0b3AoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBTdGFydCBhdXRvcGxheWluZzpcbiAgICogLSBhZnRlciBlYWNoIHJ1biwgdG8gcmVzdGFydCBhdXRvcGxheWluZ1xuICAgKiAtIG9uIHBsYXlpbmcgdmlhIEFQSVxuICAgKiAtIHdoaWxlIGVuZGluZyBhIHN3aXBlXG4gICAqL1xuICBFdmVudHMub24oWydydW4uYWZ0ZXInLCAncGxheScsICdzd2lwZS5lbmQnXSwgKCkgPT4ge1xuICAgIEF1dG9wbGF5LnN0YXJ0KClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3VudCBhdXRvcGxheWluZzpcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJIHRvIHJlc2V0IGludGVydmFsIHRoYXQgbWF5IGNoYW5nZWRcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgKCkgPT4ge1xuICAgIEF1dG9wbGF5Lm1vdW50KClcbiAgfSlcblxuICAvKipcbiAgICogRGVzdHJveSBhIGJpbmRlcjpcbiAgICogLSBvbiBkZXN0cm95aW5nIGdsaWRlIGluc3RhbmNlIHRvIGNsZWFydXAgbGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBBdXRvcGxheVxufVxuIiwiaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uL3V0aWxzL2xvZydcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnLi4vdXRpbHMvd2FpdCdcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcbmltcG9ydCB7IHNvcnRLZXlzLCBtZXJnZU9wdGlvbnMgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5cbmltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG4vKipcbiAqIFNvcnRzIGtleXMgb2YgYnJlYWtwb2ludCBvYmplY3Qgc28gdGhleSB3aWxsIGJlIG9yZGVyZWQgZnJvbSBsb3dlciB0byBiaWdnZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50c1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gc29ydEJyZWFrcG9pbnRzIChwb2ludHMpIHtcbiAgaWYgKGlzT2JqZWN0KHBvaW50cykpIHtcbiAgICByZXR1cm4gc29ydEtleXMocG9pbnRzKVxuICB9IGVsc2Uge1xuICAgIHdhcm4oYEJyZWFrcG9pbnRzIG9wdGlvbiBtdXN0IGJlIGFuIG9iamVjdGApXG4gIH1cblxuICByZXR1cm4ge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICAvKipcbiAgICogSG9sZHMgcmVmZXJlbmNlIHRvIHNldHRpbmdzLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcblxuICAvKipcbiAgICogSG9sZHMgcmVmZXJlbmNlIHRvIGJyZWFrcG9pbnRzIG9iamVjdCBpbiBzZXR0aW5ncy4gU29ydHMgYnJlYWtwb2ludHNcbiAgICogZnJvbSBzbWFsbGVyIHRvIGxhcmdlci4gSXQgaXMgcmVxdWlyZWQgaW4gb3JkZXIgdG8gcHJvcGVyXG4gICAqIG1hdGNoaW5nIGN1cnJlbnRseSBhY3RpdmUgYnJlYWtwb2ludCBzZXR0aW5ncy5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIGxldCBwb2ludHMgPSBzb3J0QnJlYWtwb2ludHMoc2V0dGluZ3MuYnJlYWtwb2ludHMpXG5cbiAgLyoqXG4gICAqIENhY2hlIGluaXRpYWwgc2V0dGluZ3MgYmVmb3JlIG92ZXJ3cml0dGluZy5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIGxldCBkZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oe30sIHNldHRpbmdzKVxuXG4gIGNvbnN0IEJyZWFrcG9pbnRzID0ge1xuICAgIC8qKlxuICAgICAqIE1hdGNoZXMgc2V0dGluZ3MgZm9yIGN1cnJlY3RseSBtYXRjaGluZyBtZWRpYSBicmVha3BvaW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBvaW50c1xuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgbWF0Y2ggKHBvaW50cykge1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cubWF0Y2hNZWRpYSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZm9yIChsZXQgcG9pbnQgaW4gcG9pbnRzKSB7XG4gICAgICAgICAgaWYgKHBvaW50cy5oYXNPd25Qcm9wZXJ0eShwb2ludCkpIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShgKG1heC13aWR0aDogJHtwb2ludH1weClgKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwb2ludHNbcG9pbnRdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZhdWx0c1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVyd3JpdGUgaW5zdGFuY2Ugc2V0dGluZ3Mgd2l0aCBjdXJyZW50bHkgbWF0Y2hpbmcgYnJlYWtwb2ludCBzZXR0aW5ncy5cbiAgICogVGhpcyBoYXBwZW5zIHJpZ2h0IGFmdGVyIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbi5cbiAgICovXG4gIE9iamVjdC5hc3NpZ24oc2V0dGluZ3MsIEJyZWFrcG9pbnRzLm1hdGNoKHBvaW50cykpXG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBnbGlkZSB3aXRoIHNldHRpbmdzIG9mIG1hdGNoZWQgYnJla3BvaW50OlxuICAgKiAtIHdpbmRvdyByZXNpemUgdG8gdXBkYXRlIHNsaWRlclxuICAgKi9cbiAgQmluZGVyLm9uKCdyZXNpemUnLCB3aW5kb3csIHRocm90dGxlKCgpID0+IHtcbiAgICBHbGlkZS5zZXR0aW5ncyA9IG1lcmdlT3B0aW9ucyhzZXR0aW5ncywgQnJlYWtwb2ludHMubWF0Y2gocG9pbnRzKSlcbiAgfSwgR2xpZGUuc2V0dGluZ3MudGhyb3R0bGUpKVxuXG4gIC8qKlxuICAgKiBSZXNvcnQgYW5kIHVwZGF0ZSBkZWZhdWx0IHNldHRpbmdzOlxuICAgKiAtIG9uIHJlaW5pdCB2aWEgQVBJLCBzbyBicmVha3BvaW50IG1hdGNoaW5nIHdpbGwgYmUgcGVyZm9ybWVkIHdpdGggb3B0aW9uc1xuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgcG9pbnRzID0gc29ydEJyZWFrcG9pbnRzKHBvaW50cylcblxuICAgIGRlZmF1bHRzID0gT2JqZWN0LmFzc2lnbih7fSwgc2V0dGluZ3MpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFVuYmluZCByZXNpemUgbGlzdGVuZXI6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgQmluZGVyLm9mZigncmVzaXplJywgd2luZG93KVxuICB9KVxuXG4gIHJldHVybiBCcmVha3BvaW50c1xufVxuIiwiaW1wb3J0IENvcmUgZnJvbSAnLi4vc3JjL2luZGV4J1xuXG4vLyBSZXF1aXJlZCBjb21wb25lbnRzXG5pbXBvcnQgUnVuIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3J1bidcbmltcG9ydCBHYXBzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2dhcHMnXG5pbXBvcnQgSHRtbCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9odG1sJ1xuaW1wb3J0IFBlZWsgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvcGVlaydcbmltcG9ydCBNb3ZlIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL21vdmUnXG5pbXBvcnQgU2l6ZXMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvc2l6ZXMnXG5pbXBvcnQgQnVpbGQgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvYnVpbGQnXG5pbXBvcnQgQ2xvbmVzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2Nsb25lcydcbmltcG9ydCBSZXNpemUgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvcmVzaXplJ1xuaW1wb3J0IERpcmVjdGlvbiBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9kaXJlY3Rpb24nXG5pbXBvcnQgVHJhbnNsYXRlIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3RyYW5zbGF0ZSdcbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3RyYW5zaXRpb24nXG5cbi8vIE9wdGlvbmFsIGNvbXBvbmVudHNcbmltcG9ydCBTd2lwZSBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9zd2lwZSdcbmltcG9ydCBJbWFnZXMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvaW1hZ2VzJ1xuaW1wb3J0IEFuY2hvcnMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvYW5jaG9ycydcbmltcG9ydCBDb250cm9scyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9jb250cm9scydcbmltcG9ydCBLZXlib2FyZCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9rZXlib2FyZCdcbmltcG9ydCBBdXRvcGxheSBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9hdXRvcGxheSdcbmltcG9ydCBCcmVha3BvaW50cyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9icmVha3BvaW50cydcblxuY29uc3QgQ09NUE9ORU5UUyA9IHtcbiAgLy8gUmVxdWlyZWRcbiAgSHRtbCxcbiAgVHJhbnNsYXRlLFxuICBUcmFuc2l0aW9uLFxuICBEaXJlY3Rpb24sXG4gIFBlZWssXG4gIFNpemVzLFxuICBHYXBzLFxuICBNb3ZlLFxuICBDbG9uZXMsXG4gIFJlc2l6ZSxcbiAgQnVpbGQsXG4gIFJ1bixcblxuICAvLyBPcHRpb25hbFxuICBTd2lwZSxcbiAgSW1hZ2VzLFxuICBBbmNob3JzLFxuICBDb250cm9scyxcbiAgS2V5Ym9hcmQsXG4gIEF1dG9wbGF5LFxuICBCcmVha3BvaW50c1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHbGlkZSBleHRlbmRzIENvcmUge1xuICBtb3VudCAoZXh0ZW5zaW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIHN1cGVyLm1vdW50KE9iamVjdC5hc3NpZ24oe30sIENPTVBPTkVOVFMsIGV4dGVuc2lvbnMpKVxuICB9XG59XG4iXSwibmFtZXMiOlsid2FybiIsIm1zZyIsImVycm9yIiwidG9JbnQiLCJ2YWx1ZSIsInBhcnNlSW50IiwidG9GbG9hdCIsInBhcnNlRmxvYXQiLCJpc1N0cmluZyIsImlzT2JqZWN0IiwidHlwZSIsImlzTnVtYmVyIiwiaXNGdW5jdGlvbiIsImlzVW5kZWZpbmVkIiwiaXNBcnJheSIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJtb3VudCIsImdsaWRlIiwiZXh0ZW5zaW9ucyIsImV2ZW50cyIsImNvbXBvbmVudHMiLCJuYW1lIiwiZGVmaW5lIiwib2JqIiwicHJvcCIsImRlZmluaXRpb24iLCJkZWZpbmVQcm9wZXJ0eSIsInNvcnRLZXlzIiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJyZWR1Y2UiLCJyIiwiayIsIm1lcmdlT3B0aW9ucyIsImRlZmF1bHRzIiwic2V0dGluZ3MiLCJvcHRpb25zIiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJoYXNPd25Qcm9wZXJ0eSIsImNsYXNzZXMiLCJkaXJlY3Rpb24iLCJicmVha3BvaW50cyIsIkV2ZW50c0J1cyIsImhvcCIsImV2ZW50IiwiaGFuZGxlciIsImkiLCJsZW5ndGgiLCJvbiIsImNhbGwiLCJpbmRleCIsInB1c2giLCJjb250ZXh0IiwiZW1pdCIsImZvckVhY2giLCJpdGVtIiwiY29uc29sZSIsImxvZyIsIkdsaWRlIiwic2VsZWN0b3IiLCJfYyIsIl90IiwiX2UiLCJkaXNhYmxlZCIsInN0YXJ0QXQiLCJ0cmFuc2Zvcm1lcnMiLCJwYXR0ZXJuIiwiUnVuIiwibWFrZSIsImRpc3RhbmNlIiwiVHJhbnNpdGlvbiIsImRpc2FibGUiLCJNb3ZlIiwiaW50ZXJ2YWwiLCJhdXRvcGxheSIsIl9vIiwibyIsIl9pIiwiX2QiLCJzdGF0dXMiLCJDb21wb25lbnRzIiwiRXZlbnRzIiwibW92ZSIsIndhaXRGb3JUcmFuc2l0aW9uIiwiY2FsY3VsYXRlIiwiYWZ0ZXIiLCJpc1N0YXJ0IiwiaXNFbmQiLCJpc09mZnNldCIsImVuYWJsZSIsInN0ZXBzIiwidmlld1NpemUiLCJjb3VudGFibGVTdGVwcyIsInBlclZpZXciLCJjYWxjdWxhdGVGb3J3YXJkSW5kZXgiLCJub3JtYWxpemVGb3J3YXJkSW5kZXgiLCJjYWxjdWxhdGVCYWNrd2FyZEluZGV4Iiwibm9ybWFsaXplQmFja3dhcmRJbmRleCIsInVuZGVmaW5lZCIsImlzVHlwZSIsImZvY3VzQXQiLCJib3VuZCIsInJld2luZCIsImlzQm91bmQiLCJNYXRoIiwiZmxvb3IiLCJ2aWV3IiwiY2VpbCIsIl9tIiwic3RlcCIsInN1YnN0ciIsIkh0bWwiLCJzbGlkZXMiLCJub3ciLCJEYXRlIiwiZ2V0VGltZSIsInRocm90dGxlIiwiZnVuYyIsIndhaXQiLCJ0aW1lb3V0IiwiYXJncyIsInJlc3VsdCIsInByZXZpb3VzIiwibGF0ZXIiLCJsZWFkaW5nIiwiYXBwbHkiLCJ0aHJvdHRsZWQiLCJhdCIsInJlbWFpbmluZyIsImFyZ3VtZW50cyIsInRyYWlsaW5nIiwic2V0VGltZW91dCIsImNhbmNlbCIsIk1BUkdJTl9UWVBFIiwiR2FwcyIsImxlbiIsInN0eWxlIiwiRGlyZWN0aW9uIiwibWFyZ2luTGVmdCIsIm1hcmdpblJpZ2h0IiwiZ2FwIiwiU2l6ZXMiLCJ3cmFwcGVyIiwiY2hpbGRyZW4iLCJyZW1vdmUiLCJzaWJsaW5ncyIsIm5vZGUiLCJwYXJlbnROb2RlIiwibiIsImZpcnN0Q2hpbGQiLCJtYXRjaGVkIiwibmV4dFNpYmxpbmciLCJub2RlVHlwZSIsImV4aXN0Iiwid2luZG93IiwiSFRNTEVsZW1lbnQiLCJUUkFDS19TRUxFQ1RPUiIsInJvb3QiLCJ0cmFjayIsInF1ZXJ5U2VsZWN0b3IiLCJwcm90b3R5cGUiLCJzbGljZSIsImZpbHRlciIsInNsaWRlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjbG9uZVNsaWRlIiwiX3IiLCJkb2N1bWVudCIsInQiLCJQZWVrIiwicGVlayIsIl92IiwiYmVmb3JlIiwib2Zmc2V0Iiwic2xpZGVXaWR0aCIsInRyYW5zbGF0ZSIsImlzIiwid2lkdGgiLCJ3cmFwcGVyU2l6ZSIsIm9mZnNldFdpZHRoIiwiZ3JvdyIsIkNsb25lcyIsInJlZHVjdG9yIiwic2V0dXBTbGlkZXMiLCJzZXR1cFdyYXBwZXIiLCJCdWlsZCIsInR5cGVDbGFzcyIsImFjdGl2ZUNsYXNzIiwiYWRkIiwiYWN0aXZlU2xpZGUiLCJzaWJsaW5nIiwicmVtb3ZlQ2xhc3NlcyIsIml0ZW1zIiwiY29sbGVjdCIsInBlZWtJbmNyZW1lbnRlciIsImNsb25lQ291bnQiLCJyb3VuZCIsImFwcGVuZCIsInJldmVyc2UiLCJwcmVwZW5kIiwibWF4IiwiY2xvbmUiLCJjbG9uZU5vZGUiLCJ1bnNoaWZ0IiwiaGFsZiIsImFwcGVuZENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwicmVtb3ZlQ2hpbGQiLCJFdmVudHNCaW5kZXIiLCJsaXN0ZW5lcnMiLCJlbCIsImNsb3N1cmUiLCJjYXB0dXJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJCaW5kZXIiLCJSZXNpemUiLCJiaW5kIiwib2ZmIiwidW5iaW5kIiwiZGVzdHJveSIsIlZBTElEX0RJUkVDVElPTlMiLCJGTElQRURfTU9WRU1FTlRTIiwidG9rZW4iLCJzcGxpdCIsImpvaW4iLCJpbmRleE9mIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsIm11bHRpcGxpZXIiLCJUUkFOU0ZPUk1FUlMiLCJHYXAiLCJHcm93IiwiUGVla2luZyIsIkZvY3VzaW5nIiwiY29uY2F0IiwiUnRsIiwidHJhbnNmb3JtZXIiLCJtb2RpZnkiLCJUcmFuc2xhdGUiLCJ0cmFuc2Zvcm0iLCJtdXRhdG9yIiwibXV0YXRlIiwidHJhdmVsRGlzdGFuY2UiLCJzZXQiLCJtb3ZlbWVudCIsInN0YXJ0V2lkdGgiLCJnZXRTdGFydEluZGV4IiwiZ2V0VHJhdmVsRGlzdGFuY2UiLCJwcm9wZXJ0eSIsImR1cmF0aW9uIiwiYW5pbWF0aW9uVGltaW5nRnVuYyIsInRyYW5zaXRpb24iLCJjb21wb3NlIiwiY2FsbGJhY2siLCJyZXdpbmREdXJhdGlvbiIsImFuaW1hdGlvbkR1cmF0aW9uIiwic3VwcG9ydHNQYXNzaXZlIiwib3B0cyIsImUiLCJTVEFSVF9FVkVOVFMiLCJNT1ZFX0VWRU5UUyIsIkVORF9FVkVOVFMiLCJNT1VTRV9FVkVOVFMiLCJzd2lwZVNpbiIsInN3aXBlU3RhcnRYIiwic3dpcGVTdGFydFkiLCJwYXNzaXZlIiwiU3dpcGUiLCJiaW5kU3dpcGVTdGFydCIsInN3aXBlIiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJiaW5kU3dpcGVNb3ZlIiwiYmluZFN3aXBlRW5kIiwidG91Y2hBbmdsZSIsInRvdWNoUmF0aW8iLCJzdWJFeFN4Iiwic3ViRXlTeSIsInBvd0VYIiwiYWJzIiwicG93RVkiLCJzd2lwZUh5cG90ZW51c2UiLCJzcXJ0Iiwic3dpcGVDYXRoZXR1cyIsImFzaW4iLCJQSSIsInN0b3BQcm9wYWdhdGlvbiIsImRyYWdnaW5nIiwidGhyZXNob2xkIiwic3dpcGVEaXN0YW5jZSIsInN3aXBlRGVnIiwicGVyVG91Y2giLCJtaW4iLCJyZXNvbHZlIiwidW5iaW5kU3dpcGVNb3ZlIiwidW5iaW5kU3dpcGVFbmQiLCJzd2lwZVRocmVzaG9sZCIsInN0YXJ0IiwiZHJhZ1RocmVzaG9sZCIsImVuZCIsImNoYW5nZWRUb3VjaGVzIiwic3dpcGVhYmxlIiwidW5iaW5kU3dpcGVTdGFydCIsIkltYWdlcyIsImRyYWdzdGFydCIsInByZXZlbnREZWZhdWx0IiwiZGV0YWNoZWQiLCJwcmV2ZW50ZWQiLCJBbmNob3JzIiwiX2EiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xpY2siLCJkcmFnZ2FibGUiLCJzZXRBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkZXRhY2giLCJhdHRhY2giLCJOQVZfU0VMRUNUT1IiLCJDT05UUk9MU19TRUxFQ1RPUiIsIkNvbnRyb2xzIiwiX24iLCJhZGRCaW5kaW5ncyIsImNvbnRyb2xzIiwiYWN0aXZlTmF2IiwiZWxlbWVudHMiLCJjdXJyZW50VGFyZ2V0Iiwic2V0QWN0aXZlIiwicmVtb3ZlQmluZGluZ3MiLCJyZW1vdmVBY3RpdmUiLCJLZXlib2FyZCIsImtleWJvYXJkIiwicHJlc3MiLCJrZXlDb2RlIiwiQXV0b3BsYXkiLCJob3ZlcnBhdXNlIiwic2V0SW50ZXJ2YWwiLCJzdG9wIiwidGltZSIsImNsZWFySW50ZXJ2YWwiLCJzb3J0QnJlYWtwb2ludHMiLCJwb2ludHMiLCJCcmVha3BvaW50cyIsIm1hdGNoTWVkaWEiLCJwb2ludCIsIm1hdGNoZXMiLCJtYXRjaCIsIkNPTVBPTkVOVFMiLCJDb3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxlQUFlOzs7Ozs7Ozs7O1FBVVAsUUFWTzs7Ozs7OztXQWlCSixDQWpCSTs7Ozs7OztXQXdCSixDQXhCSTs7Ozs7Ozs7Ozs7V0FtQ0osQ0FuQ0k7Ozs7Ozs7T0EwQ1IsRUExQ1E7Ozs7Ozs7WUFpREgsS0FqREc7Ozs7Ozs7Y0F3REQsSUF4REM7Ozs7Ozs7WUErREgsSUEvREc7Ozs7Ozs7Ozs7U0F5RU4sS0F6RU07Ozs7Ozs7a0JBZ0ZHLEVBaEZIOzs7Ozs7O2lCQXVGRSxHQXZGRjs7Ozs7OztZQThGSCxLQTlGRzs7Ozs7OztjQXFHRCxHQXJHQzs7Ozs7OztjQTRHRCxFQTVHQzs7Ozs7OztxQkFtSE0sR0FuSE47Ozs7Ozs7VUEwSEwsSUExSEs7Ozs7Ozs7a0JBaUlHLEdBaklIOzs7Ozs7O3VCQXdJUSxtQ0F4SVI7Ozs7Ozs7cUJBK0lNLElBL0lOOzs7Ozs7O1lBc0pILEVBdEpHOzs7Ozs7Ozs7OzthQWlLRixLQWpLRTs7Ozs7Ozs7Ozs7Ozs7UUErS1AsQ0EvS087Ozs7Ozs7Ozs7O2VBMExBLEVBMUxBOzs7Ozs7OztXQWtNSjtlQUNJO1dBQ0osWUFESTtXQUVKO0tBSEE7WUFLQyxlQUxEO2NBTUcsaUJBTkg7ZUFPSSxrQkFQSjtjQVFHLGlCQVJIO2dCQVNLLHFCQVRMO2VBVUksdUJBVko7aUJBV00sc0JBWE47bUJBWVE7O0NBOU1uQjs7QUNBQTs7Ozs7O0FBTUEsQUFBTyxTQUFTQSxJQUFULENBQWVDLEdBQWYsRUFBb0I7VUFDakJDLEtBQVIsb0JBQStCRCxHQUEvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
