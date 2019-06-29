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

function swipe (Glide, Components, Events) {
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

function images (Glide, Components, Events) {
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

function anchors (Glide, Components, Events) {
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

function controls (Glide, Components, Events) {
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

function keyboard (Glide, Components, Events) {
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

function autoplay (Glide, Components, Events) {
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

function breakpoints (Glide, Components, Events) {
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
  Run: Run
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
export { swipe as Swipe, images as Images, anchors as Anchors, controls as Controls, keyboard as Keyboard, autoplay as Autoplay, breakpoints as Breakpoints };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xpZGUubW9kdWxhci5lc20uanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0cy5qcyIsIi4uL3NyYy91dGlscy9sb2cuanMiLCIuLi9zcmMvdXRpbHMvdW5pdC5qcyIsIi4uL3NyYy9jb3JlL2luZGV4LmpzIiwiLi4vc3JjL3V0aWxzL29iamVjdC5qcyIsIi4uL3NyYy9jb3JlL2V2ZW50L2V2ZW50cy1idXMuanMiLCIuLi9zcmMvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9ydW4uanMiLCIuLi9zcmMvdXRpbHMvdGltZS5qcyIsIi4uL3NyYy91dGlscy93YWl0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZ2Fwcy5qcyIsIi4uL3NyYy91dGlscy9kb20uanMiLCIuLi9zcmMvY29tcG9uZW50cy9odG1sLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcGVlay5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21vdmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9zaXplcy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2J1aWxkLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2xvbmVzLmpzIiwiLi4vc3JjL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3Jlc2l6ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2RpcmVjdGlvbi5qcyIsIi4uL3NyYy9tdXRhdG9yL3RyYW5zZm9ybWVycy9ydGwuanMiLCIuLi9zcmMvbXV0YXRvci90cmFuc2Zvcm1lcnMvZ2FwLmpzIiwiLi4vc3JjL211dGF0b3IvdHJhbnNmb3JtZXJzL2dyb3cuanMiLCIuLi9zcmMvbXV0YXRvci90cmFuc2Zvcm1lcnMvcGVla2luZy5qcyIsIi4uL3NyYy9tdXRhdG9yL3RyYW5zZm9ybWVycy9mb2N1c2luZy5qcyIsIi4uL3NyYy9tdXRhdG9yL2luZGV4LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvdHJhbnNsYXRlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvdHJhbnNpdGlvbi5qcyIsIi4uL3NyYy91dGlscy9kZXRlY3QtcGFzc2l2ZS1ldmVudC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3N3aXBlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW1hZ2VzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvYW5jaG9ycy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NvbnRyb2xzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMva2V5Ym9hcmQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9hdXRvcGxheS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2JyZWFrcG9pbnRzLmpzIiwiLi4vZW50cnkvZW50cnktbW9kdWxhci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBUeXBlIG9mIHRoZSBtb3ZlbWVudC5cbiAgICpcbiAgICogQXZhaWxhYmxlIHR5cGVzOlxuICAgKiBgc2xpZGVyYCAtIFJld2luZHMgc2xpZGVyIHRvIHRoZSBzdGFydC9lbmQgd2hlbiBpdCByZWFjaGVzIHRoZSBmaXJzdCBvciBsYXN0IHNsaWRlLlxuICAgKiBgY2Fyb3VzZWxgIC0gQ2hhbmdlcyBzbGlkZXMgd2l0aG91dCBzdGFydGluZyBvdmVyIHdoZW4gaXQgcmVhY2hlcyB0aGUgZmlyc3Qgb3IgbGFzdCBzbGlkZS5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIHR5cGU6ICdzbGlkZXInLFxuXG4gIC8qKlxuICAgKiBTdGFydCBhdCBzcGVjaWZpYyBzbGlkZSBudW1iZXIgZGVmaW5lZCB3aXRoIHplcm8tYmFzZWQgaW5kZXguXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBzdGFydEF0OiAwLFxuXG4gIC8qKlxuICAgKiBBIG51bWJlciBvZiBzbGlkZXMgdmlzaWJsZSBvbiB0aGUgc2luZ2xlIHZpZXdwb3J0LlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgcGVyVmlldzogMSxcblxuICAvKipcbiAgICogRm9jdXMgY3VycmVudGx5IGFjdGl2ZSBzbGlkZSBhdCBhIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGUgdHJhY2suXG4gICAqXG4gICAqIEF2YWlsYWJsZSBpbnB1dHM6XG4gICAqIGBjZW50ZXJgIC0gQ3VycmVudCBzbGlkZSB3aWxsIGJlIGFsd2F5cyBmb2N1c2VkIGF0IHRoZSBjZW50ZXIgb2YgYSB0cmFjay5cbiAgICogYDAsMSwyLDMuLi5gIC0gQ3VycmVudCBzbGlkZSB3aWxsIGJlIGZvY3VzZWQgb24gdGhlIHNwZWNpZmllZCB6ZXJvLWJhc2VkIGluZGV4LlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfE51bWJlcn1cbiAgICovXG4gIGZvY3VzQXQ6IDAsXG5cbiAgLyoqXG4gICAqIEEgc2l6ZSBvZiB0aGUgZ2FwIGFkZGVkIGJldHdlZW4gc2xpZGVzLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgZ2FwOiAxMCxcblxuICAvKipcbiAgICogQ2hhbmdlIHNsaWRlcyBhZnRlciBhIHNwZWNpZmllZCBpbnRlcnZhbC4gVXNlIGBmYWxzZWAgZm9yIHR1cm5pbmcgb2ZmIGF1dG9wbGF5LlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfEJvb2xlYW59XG4gICAqL1xuICBhdXRvcGxheTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIFN0b3AgYXV0b3BsYXkgb24gbW91c2VvdmVyIGV2ZW50LlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGhvdmVycGF1c2U6IHRydWUsXG5cbiAgLyoqXG4gICAqIEFsbG93IGZvciBjaGFuZ2luZyBzbGlkZXMgd2l0aCBsZWZ0IGFuZCByaWdodCBrZXlib2FyZCBhcnJvd3MuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAga2V5Ym9hcmQ6IHRydWUsXG5cbiAgLyoqXG4gICAqIFN0b3AgcnVubmluZyBgcGVyVmlld2AgbnVtYmVyIG9mIHNsaWRlcyBmcm9tIHRoZSBlbmQuIFVzZSB0aGlzXG4gICAqIG9wdGlvbiBpZiB5b3UgZG9uJ3Qgd2FudCB0byBoYXZlIGFuIGVtcHR5IHNwYWNlIGFmdGVyXG4gICAqIGEgc2xpZGVyLiBXb3JrcyBvbmx5IHdpdGggYHNsaWRlcmAgdHlwZSBhbmQgYVxuICAgKiBub24tY2VudGVyZWQgYGZvY3VzQXRgIHNldHRpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgYm91bmQ6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBNaW5pbWFsIHN3aXBlIGRpc3RhbmNlIG5lZWRlZCB0byBjaGFuZ2UgdGhlIHNsaWRlLiBVc2UgYGZhbHNlYCBmb3IgdHVybmluZyBvZmYgYSBzd2lwaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfEJvb2xlYW59XG4gICAqL1xuICBzd2lwZVRocmVzaG9sZDogODAsXG5cbiAgLyoqXG4gICAqIE1pbmltYWwgbW91c2UgZHJhZyBkaXN0YW5jZSBuZWVkZWQgdG8gY2hhbmdlIHRoZSBzbGlkZS4gVXNlIGBmYWxzZWAgZm9yIHR1cm5pbmcgb2ZmIGEgZHJhZ2dpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIGRyYWdUaHJlc2hvbGQ6IDEyMCxcblxuICAvKipcbiAgICogQSBtYXhpbXVtIG51bWJlciBvZiBzbGlkZXMgdG8gd2hpY2ggbW92ZW1lbnQgd2lsbCBiZSBtYWRlIG9uIHN3aXBpbmcgb3IgZHJhZ2dpbmcuIFVzZSBgZmFsc2VgIGZvciB1bmxpbWl0ZWQuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIHBlclRvdWNoOiBmYWxzZSxcblxuICAvKipcbiAgICogTW92aW5nIGRpc3RhbmNlIHJhdGlvIG9mIHRoZSBzbGlkZXMgb24gYSBzd2lwaW5nIGFuZCBkcmFnZ2luZy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHRvdWNoUmF0aW86IDAuNSxcblxuICAvKipcbiAgICogQW5nbGUgcmVxdWlyZWQgdG8gYWN0aXZhdGUgc2xpZGVzIG1vdmluZyBvbiBzd2lwaW5nIG9yIGRyYWdnaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgdG91Y2hBbmdsZTogNDUsXG5cbiAgLyoqXG4gICAqIER1cmF0aW9uIG9mIHRoZSBhbmltYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgYW5pbWF0aW9uRHVyYXRpb246IDQwMCxcblxuICAvKipcbiAgICogQWxsb3dzIGxvb3BpbmcgdGhlIGBzbGlkZXJgIHR5cGUuIFNsaWRlciB3aWxsIHJld2luZCB0byB0aGUgZmlyc3QvbGFzdCBzbGlkZSB3aGVuIGl0J3MgYXQgdGhlIHN0YXJ0L2VuZC5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICByZXdpbmQ6IHRydWUsXG5cbiAgLyoqXG4gICAqIER1cmF0aW9uIG9mIHRoZSByZXdpbmRpbmcgYW5pbWF0aW9uIG9mIHRoZSBgc2xpZGVyYCB0eXBlIGluIG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHJld2luZER1cmF0aW9uOiA4MDAsXG5cbiAgLyoqXG4gICAqIEVhc2luZyBmdW5jdGlvbiBmb3IgdGhlIGFuaW1hdGlvbi5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGFuaW1hdGlvblRpbWluZ0Z1bmM6ICdjdWJpYy1iZXppZXIoLjE2NSwgLjg0MCwgLjQ0MCwgMSknLFxuXG4gIC8qKlxuICAgKiBXYWl0IGZvciB0aGUgYW5pbWF0aW9uIHRvIGZpbmlzaCB1bnRpbCB0aGUgbmV4dCB1c2VyIGlucHV0IGNhbiBiZSBwcm9jZXNzZWRcbiAgICpcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB3YWl0Rm9yVHJhbnNpdGlvbjogdHJ1ZSxcblxuICAvKipcbiAgICogVGhyb3R0bGUgY29zdGx5IGV2ZW50cyBhdCBtb3N0IG9uY2UgcGVyIGV2ZXJ5IHdhaXQgbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgdGhyb3R0bGU6IDEwLFxuXG4gIC8qKlxuICAgKiBNb3ZpbmcgZGlyZWN0aW9uIG1vZGUuXG4gICAqXG4gICAqIEF2YWlsYWJsZSBpbnB1dHM6XG4gICAqIC0gJ2x0cicgLSBsZWZ0IHRvIHJpZ2h0IG1vdmVtZW50LFxuICAgKiAtICdydGwnIC0gcmlnaHQgdG8gbGVmdCBtb3ZlbWVudC5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGRpcmVjdGlvbjogJ2x0cicsXG5cbiAgLyoqXG4gICAqIFRoZSBkaXN0YW5jZSB2YWx1ZSBvZiB0aGUgbmV4dCBhbmQgcHJldmlvdXMgdmlld3BvcnRzIHdoaWNoXG4gICAqIGhhdmUgdG8gcGVlayBpbiB0aGUgY3VycmVudCB2aWV3LiBBY2NlcHRzIG51bWJlciBhbmRcbiAgICogcGl4ZWxzIGFzIGEgc3RyaW5nLiBMZWZ0IGFuZCByaWdodCBwZWVraW5nIGNhbiBiZVxuICAgKiBzZXQgdXAgc2VwYXJhdGVseSB3aXRoIGEgZGlyZWN0aW9ucyBvYmplY3QuXG4gICAqXG4gICAqIEZvciBleGFtcGxlOlxuICAgKiBgMTAwYCAtIFBlZWsgMTAwcHggb24gdGhlIGJvdGggc2lkZXMuXG4gICAqIHsgYmVmb3JlOiAxMDAsIGFmdGVyOiA1MCB9YCAtIFBlZWsgMTAwcHggb24gdGhlIGxlZnQgc2lkZSBhbmQgNTBweCBvbiB0aGUgcmlnaHQgc2lkZS5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxTdHJpbmd8T2JqZWN0fVxuICAgKi9cbiAgcGVlazogMCxcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBvcHRpb25zIGFwcGxpZWQgYXQgc3BlY2lmaWVkIG1lZGlhIGJyZWFrcG9pbnRzLlxuICAgKiBGb3IgZXhhbXBsZTogZGlzcGxheSB0d28gc2xpZGVzIHBlciB2aWV3IHVuZGVyIDgwMHB4LlxuICAgKiBge1xuICAgKiAgICc4MDBweCc6IHtcbiAgICogICAgIHBlclZpZXc6IDJcbiAgICogICB9XG4gICAqIH1gXG4gICAqL1xuICBicmVha3BvaW50czoge30sXG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgaW50ZXJuYWxseSB1c2VkIEhUTUwgY2xhc3Nlcy5cbiAgICpcbiAgICogQHRvZG8gUmVmYWN0b3IgYHNsaWRlcmAgYW5kIGBjYXJvdXNlbGAgcHJvcGVydGllcyB0byBzaW5nbGUgYHR5cGU6IHsgc2xpZGVyOiAnJywgY2Fyb3VzZWw6ICcnIH1gIG9iamVjdFxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgY2xhc3Nlczoge1xuICAgIGRpcmVjdGlvbjoge1xuICAgICAgbHRyOiAnZ2xpZGUtLWx0cicsXG4gICAgICBydGw6ICdnbGlkZS0tcnRsJ1xuICAgIH0sXG4gICAgc2xpZGVyOiAnZ2xpZGUtLXNsaWRlcicsXG4gICAgY2Fyb3VzZWw6ICdnbGlkZS0tY2Fyb3VzZWwnLFxuICAgIHN3aXBlYWJsZTogJ2dsaWRlLS1zd2lwZWFibGUnLFxuICAgIGRyYWdnaW5nOiAnZ2xpZGUtLWRyYWdnaW5nJyxcbiAgICBjbG9uZVNsaWRlOiAnZ2xpZGVfX3NsaWRlLS1jbG9uZScsXG4gICAgYWN0aXZlTmF2OiAnZ2xpZGVfX2J1bGxldC0tYWN0aXZlJyxcbiAgICBhY3RpdmVTbGlkZTogJ2dsaWRlX19zbGlkZS0tYWN0aXZlJyxcbiAgICBkaXNhYmxlZEFycm93OiAnZ2xpZGVfX2Fycm93LS1kaXNhYmxlZCdcbiAgfVxufVxuIiwiLyoqXG4gKiBPdXRwdXRzIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgYm93c2VyIGNvbnNvbGUuXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBtc2dcbiAqIEByZXR1cm4ge1ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YXJuIChtc2cpIHtcbiAgY29uc29sZS5lcnJvcihgW0dsaWRlIHdhcm5dOiAke21zZ31gKVxufVxuIiwiLyoqXG4gKiBDb252ZXJ0cyB2YWx1ZSBlbnRlcmVkIGFzIG51bWJlclxuICogb3Igc3RyaW5nIHRvIGludGVnZXIgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9JbnQgKHZhbHVlKSB7XG4gIHJldHVybiBwYXJzZUludCh2YWx1ZSlcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB2YWx1ZSBlbnRlcmVkIGFzIG51bWJlclxuICogb3Igc3RyaW5nIHRvIGZsYXQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9GbG9hdCAodmFsdWUpIHtcbiAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHsqfSAgIHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcgKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0ICh2YWx1ZSkge1xuICBsZXQgdHlwZSA9IHR5cGVvZiB2YWx1ZVxuXG4gIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhdmFsdWUgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1taXhlZC1vcGVyYXRvcnNcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGEgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIgKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgdW5kZWZpbmVkLlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQgKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhbiBhcnJheS5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkgKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gQXJyYXlcbn1cbiIsImltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlscy9sb2cnXG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuLyoqXG4gKiBDcmVhdGVzIGFuZCBpbml0aWFsaXplcyBzcGVjaWZpZWQgY29sbGVjdGlvbiBvZiBleHRlbnNpb25zLlxuICogRWFjaCBleHRlbnNpb24gcmVjZWl2ZXMgYWNjZXNzIHRvIGluc3RhbmNlIG9mIGdsaWRlIGFuZCByZXN0IG9mIGNvbXBvbmVudHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGdsaWRlXG4gKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5zaW9uc1xuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtb3VudCAoZ2xpZGUsIGV4dGVuc2lvbnMsIGV2ZW50cykge1xuICBsZXQgY29tcG9uZW50cyA9IHt9XG5cbiAgZm9yIChsZXQgbmFtZSBpbiBleHRlbnNpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oZXh0ZW5zaW9uc1tuYW1lXSkpIHtcbiAgICAgIGNvbXBvbmVudHNbbmFtZV0gPSBleHRlbnNpb25zW25hbWVdKGdsaWRlLCBjb21wb25lbnRzLCBldmVudHMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHdhcm4oJ0V4dGVuc2lvbiBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IG5hbWUgaW4gY29tcG9uZW50cykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbXBvbmVudHNbbmFtZV0ubW91bnQpKSB7XG4gICAgICBjb21wb25lbnRzW25hbWVdLm1vdW50KClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29tcG9uZW50c1xufVxuIiwiLyoqXG4gKiBEZWZpbmVzIGdldHRlciBhbmQgc2V0dGVyIHByb3BlcnR5IG9uIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqICAgICAgICAgT2JqZWN0IHdoZXJlIHByb3BlcnR5IGhhcyB0byBiZSBkZWZpbmVkLlxuICogQHBhcmFtICB7U3RyaW5nfSBwcm9wICAgICAgICBOYW1lIG9mIHRoZSBkZWZpbmVkIHByb3BlcnR5LlxuICogQHBhcmFtICB7T2JqZWN0fSBkZWZpbml0aW9uICBHZXQgYW5kIHNldCBkZWZpbml0aW9ucyBmb3IgdGhlIHByb3BlcnR5LlxuICogQHJldHVybiB7Vm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZSAob2JqLCBwcm9wLCBkZWZpbml0aW9uKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGRlZmluaXRpb24pXG59XG5cbi8qKlxuICogU29ydHMgYXBoYWJldGljYWxseSBvYmplY3Qga2V5cy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gc29ydEtleXMgKG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5zb3J0KCkucmVkdWNlKChyLCBrKSA9PiB7XG4gICAgcltrXSA9IG9ialtrXVxuXG4gICAgcmV0dXJuIChyW2tdLCByKVxuICB9LCB7fSlcbn1cblxuLyoqXG4gKiBNZXJnZXMgcGFzc2VkIHNldHRpbmdzIG9iamVjdCB3aXRoIGRlZmF1bHQgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IGRlZmF1bHRzXG4gKiBAcGFyYW0gIHtPYmplY3R9IHNldHRpbmdzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU9wdGlvbnMgKGRlZmF1bHRzLCBzZXR0aW5ncykge1xuICBsZXQgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBzZXR0aW5ncylcblxuICAvLyBgT2JqZWN0LmFzc2lnbmAgZG8gbm90IGRlZXBseSBtZXJnZSBvYmplY3RzLCBzbyB3ZVxuICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5IGZvciBldmVyeSBuZXN0ZWQgb2JqZWN0XG4gIC8vIGluIG9wdGlvbnMuIEFsdGhvdWdoIGl0IGRvZXMgbm90IGxvb2sgc21hcnQsXG4gIC8vIGl0J3Mgc21hbGxlciBhbmQgZmFzdGVyIHRoYW4gc29tZSBmYW5jeVxuICAvLyBtZXJnaW5nIGRlZXAtbWVyZ2UgYWxnb3JpdGhtIHNjcmlwdC5cbiAgaWYgKHNldHRpbmdzLmhhc093blByb3BlcnR5KCdjbGFzc2VzJykpIHtcbiAgICBvcHRpb25zLmNsYXNzZXMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cy5jbGFzc2VzLCBzZXR0aW5ncy5jbGFzc2VzKVxuXG4gICAgaWYgKHNldHRpbmdzLmNsYXNzZXMuaGFzT3duUHJvcGVydHkoJ2RpcmVjdGlvbicpKSB7XG4gICAgICBvcHRpb25zLmNsYXNzZXMuZGlyZWN0aW9uID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMuY2xhc3Nlcy5kaXJlY3Rpb24sIHNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uKVxuICAgIH1cbiAgfVxuXG4gIGlmIChzZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eSgnYnJlYWtwb2ludHMnKSkge1xuICAgIG9wdGlvbnMuYnJlYWtwb2ludHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cy5icmVha3BvaW50cywgc2V0dGluZ3MuYnJlYWtwb2ludHMpXG4gIH1cblxuICByZXR1cm4gb3B0aW9uc1xufVxuIiwiaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJy4uLy4uL3V0aWxzL3VuaXQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50c0J1cyB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBFdmVudEJ1cyBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50c1xuICAgKi9cbiAgY29uc3RydWN0b3IgKGV2ZW50cyA9IHt9KSB7XG4gICAgdGhpcy5ldmVudHMgPSBldmVudHNcbiAgICB0aGlzLmhvcCA9IGV2ZW50cy5oYXNPd25Qcm9wZXJ0eVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgbGlzdGVuZXIgdG8gdGhlIHNwZWNpZmVkIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgb24gKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgaWYgKGlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMub24oZXZlbnRbaV0sIGhhbmRsZXIpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBldmVudCdzIG9iamVjdCBpZiBub3QgeWV0IGNyZWF0ZWRcbiAgICBpZiAoIXRoaXMuaG9wLmNhbGwodGhpcy5ldmVudHMsIGV2ZW50KSkge1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW11cbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGhhbmRsZXIgdG8gcXVldWVcbiAgICB2YXIgaW5kZXggPSB0aGlzLmV2ZW50c1tldmVudF0ucHVzaChoYW5kbGVyKSAtIDFcblxuICAgIC8vIFByb3ZpZGUgaGFuZGxlIGJhY2sgZm9yIHJlbW92YWwgb2YgZXZlbnRcbiAgICByZXR1cm4ge1xuICAgICAgcmVtb3ZlICgpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuZXZlbnRzW2V2ZW50XVtpbmRleF1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUnVucyByZWdpc3RlcmVkIGhhbmRsZXJzIGZvciBzcGVjaWZpZWQgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdD19IGNvbnRleHRcbiAgICovXG4gIGVtaXQgKGV2ZW50LCBjb250ZXh0KSB7XG4gICAgaWYgKGlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZW1pdChldmVudFtpXSwgY29udGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZXZlbnQgZG9lc24ndCBleGlzdCwgb3IgdGhlcmUncyBubyBoYW5kbGVycyBpbiBxdWV1ZSwganVzdCBsZWF2ZVxuICAgIGlmICghdGhpcy5ob3AuY2FsbCh0aGlzLmV2ZW50cywgZXZlbnQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBDeWNsZSB0aHJvdWdoIGV2ZW50cyBxdWV1ZSwgZmlyZSFcbiAgICB0aGlzLmV2ZW50c1tldmVudF0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbShjb250ZXh0IHx8IHt9KVxuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCBkZWZhdWx0cyBmcm9tIFwiLi9kZWZhdWx0c1wiO1xyXG5pbXBvcnQgeyB3YXJuIH0gZnJvbSBcIi4vdXRpbHMvbG9nXCI7XHJcbmltcG9ydCB7IG1vdW50IH0gZnJvbSBcIi4vY29yZS9pbmRleFwiO1xyXG5pbXBvcnQgeyBtZXJnZU9wdGlvbnMgfSBmcm9tIFwiLi91dGlscy9vYmplY3RcIjtcclxuaW1wb3J0IHsgdG9JbnQsIGlzT2JqZWN0LCBpc0FycmF5IH0gZnJvbSBcIi4vdXRpbHMvdW5pdFwiO1xyXG5cclxuaW1wb3J0IEV2ZW50c0J1cyBmcm9tIFwiLi9jb3JlL2V2ZW50L2V2ZW50cy1idXNcIjtcclxuY29uc29sZS5sb2coXCJnbGlkZSAzXCIpO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHbGlkZSB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGdsaWRlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBzZWxlY3RvclxyXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBvcHRpb25zID0ge30pIHtcclxuICAgIHRoaXMuX2MgPSB7fTtcclxuICAgIHRoaXMuX3QgPSBbXTtcclxuICAgIHRoaXMuX2UgPSBuZXcgRXZlbnRzQnVzKCk7XHJcblxyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IG1lcmdlT3B0aW9ucyhkZWZhdWx0cywgb3B0aW9ucyk7XHJcbiAgICB0aGlzLmluZGV4ID0gdGhpcy5zZXR0aW5ncy5zdGFydEF0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZXMgZ2xpZGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5zaW9ucyBDb2xsZWN0aW9uIG9mIGV4dGVuc2lvbnMgdG8gaW5pdGlhbGl6ZS5cclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBtb3VudChleHRlbnNpb25zID0ge30pIHtcclxuICAgIHRoaXMuX2UuZW1pdChcIm1vdW50LmJlZm9yZVwiKTtcclxuXHJcbiAgICBpZiAoaXNPYmplY3QoZXh0ZW5zaW9ucykpIHtcclxuICAgICAgdGhpcy5fYyA9IG1vdW50KHRoaXMsIGV4dGVuc2lvbnMsIHRoaXMuX2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2FybihcIllvdSBuZWVkIHRvIHByb3ZpZGUgYSBvYmplY3Qgb24gYG1vdW50KClgXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2UuZW1pdChcIm1vdW50LmFmdGVyXCIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29sbGVjdHMgYW4gaW5zdGFuY2UgYHRyYW5zbGF0ZWAgdHJhbnNmb3JtZXJzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7QXJyYXl9IHRyYW5zZm9ybWVycyBDb2xsZWN0aW9uIG9mIHRyYW5zZm9ybWVycy5cclxuICAgKiBAcmV0dXJuIHtWb2lkfVxyXG4gICAqL1xyXG4gIG11dGF0ZSh0cmFuc2Zvcm1lcnMgPSBbXSkge1xyXG4gICAgaWYgKGlzQXJyYXkodHJhbnNmb3JtZXJzKSkge1xyXG4gICAgICB0aGlzLl90ID0gdHJhbnNmb3JtZXJzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2FybihcIllvdSBuZWVkIHRvIHByb3ZpZGUgYSBhcnJheSBvbiBgbXV0YXRlKClgXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyBnbGlkZSB3aXRoIHNwZWNpZmllZCBzZXR0aW5ncy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXR0aW5nc1xyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIHVwZGF0ZShzZXR0aW5ncyA9IHt9KSB7XHJcbiAgICB0aGlzLnNldHRpbmdzID0gbWVyZ2VPcHRpb25zKHRoaXMuc2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHJcbiAgICBpZiAoc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoXCJzdGFydEF0XCIpKSB7XHJcbiAgICAgIHRoaXMuaW5kZXggPSBzZXR0aW5ncy5zdGFydEF0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2UuZW1pdChcInVwZGF0ZVwiKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZSBzbGlkZSB3aXRoIHNwZWNpZmllZCBwYXR0ZXJuLiBBIHBhdHRlcm4gbXVzdCBiZSBpbiB0aGUgc3BlY2lhbCBmb3JtYXQ6XHJcbiAgICogYD5gIC0gTW92ZSBvbmUgZm9yd2FyZFxyXG4gICAqIGA8YCAtIE1vdmUgb25lIGJhY2t3YXJkXHJcbiAgICogYD17aX1gIC0gR28gdG8ge2l9IHplcm8tYmFzZWQgc2xpZGUgKGVxLiAnPTEnLCB3aWxsIGdvIHRvIHNlY29uZCBzbGlkZSlcclxuICAgKiBgPj5gIC0gUmV3aW5kcyB0byBlbmQgKGxhc3Qgc2xpZGUpXHJcbiAgICogYDw8YCAtIFJld2luZHMgdG8gc3RhcnQgKGZpcnN0IHNsaWRlKVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdHRlcm5cclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBnbyhwYXR0ZXJuKSB7XHJcbiAgICB0aGlzLl9jLlJ1bi5tYWtlKHBhdHRlcm4pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZSB0cmFjayBieSBzcGVjaWZpZWQgZGlzdGFuY2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGlzdGFuY2VcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBtb3ZlKGRpc3RhbmNlKSB7XHJcbiAgICB0aGlzLl9jLlRyYW5zaXRpb24uZGlzYWJsZSgpO1xyXG4gICAgdGhpcy5fYy5Nb3ZlLm1ha2UoZGlzdGFuY2UpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveSBpbnN0YW5jZSBhbmQgcmV2ZXJ0IGFsbCBjaGFuZ2VzIGRvbmUgYnkgdGhpcy5fYy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9lLmVtaXQoXCJkZXN0cm95XCIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgaW5zdGFuY2UgYXV0b3BsYXlpbmcuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0Jvb2xlYW58TnVtYmVyfSBpbnRlcnZhbCBSdW4gYXV0b3BsYXlpbmcgd2l0aCBwYXNzZWQgaW50ZXJ2YWwgcmVnYXJkbGVzcyBvZiBgYXV0b3BsYXlgIHNldHRpbmdzXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgcGxheShpbnRlcnZhbCA9IGZhbHNlKSB7XHJcbiAgICBpZiAoaW50ZXJ2YWwpIHtcclxuICAgICAgdGhpcy5zZXR0aW5ncy5hdXRvcGxheSA9IGludGVydmFsO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2UuZW1pdChcInBsYXlcIik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIGluc3RhbmNlIGF1dG9wbGF5aW5nLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgcGF1c2UoKSB7XHJcbiAgICB0aGlzLl9lLmVtaXQoXCJwYXVzZVwiKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgZ2xpZGUgaW50byBhIGlkbGUgc3RhdHVzLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgZGlzYWJsZSgpIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBnbGlkZSBpbnRvIGEgYWN0aXZlIHN0YXR1cy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIGVuYWJsZSgpIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgY3V1dG9tIGV2ZW50IGxpc3RlbmVyIHdpdGggaGFuZGxlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge1N0cmluZ3xBcnJheX0gZXZlbnRcclxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIG9uKGV2ZW50LCBoYW5kbGVyKSB7XHJcbiAgICB0aGlzLl9lLm9uKGV2ZW50LCBoYW5kbGVyKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiBnbGlkZSBpcyBhIHByZWNpc2VkIHR5cGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWVcclxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAqL1xyXG4gIGlzVHlwZShuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy50eXBlID09PSBuYW1lO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB2YWx1ZSBvZiB0aGUgY29yZSBvcHRpb25zLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAqL1xyXG4gIGdldCBzZXR0aW5ncygpIHtcclxuICAgIHJldHVybiB0aGlzLl9vO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB2YWx1ZSBvZiB0aGUgY29yZSBvcHRpb25zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSBvXHJcbiAgICogQHJldHVybiB7Vm9pZH1cclxuICAgKi9cclxuICBzZXQgc2V0dGluZ3Mobykge1xyXG4gICAgaWYgKGlzT2JqZWN0KG8pKSB7XHJcbiAgICAgIHRoaXMuX28gPSBvO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2FybihcIk9wdGlvbnMgbXVzdCBiZSBhbiBgb2JqZWN0YCBpbnN0YW5jZS5cIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGN1cnJlbnQgaW5kZXggb2YgdGhlIHNsaWRlci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgKi9cclxuICBnZXQgaW5kZXgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgY3VycmVudCBpbmRleCBhIHNsaWRlci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgKi9cclxuICBzZXQgaW5kZXgoaSkge1xyXG4gICAgdGhpcy5faSA9IHRvSW50KGkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0eXBlIG5hbWUgb2YgdGhlIHNsaWRlci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge1N0cmluZ31cclxuICAgKi9cclxuICBnZXQgdHlwZSgpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnR5cGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBpZGxlIHN0YXR1cy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICovXHJcbiAgZ2V0IGRpc2FibGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Q7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBpZGxlIHN0YXR1cy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICovXHJcbiAgc2V0IGRpc2FibGVkKHN0YXR1cykge1xyXG4gICAgdGhpcy5fZCA9ICEhc3RhdHVzO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHsgdG9JbnQsIGlzTnVtYmVyIH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgUnVuID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGF1dG9ydW5uaW5nIG9mIHRoZSBnbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5fbyA9IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ha2VzIGdsaWRlcyBydW5uaW5nIGJhc2VkIG9uIHRoZSBwYXNzZWQgbW92aW5nIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtb3ZlXG4gICAgICovXG4gICAgbWFrZSAobW92ZSkge1xuICAgICAgaWYgKCFHbGlkZS5kaXNhYmxlZCkge1xuICAgICAgICAhR2xpZGUuc2V0dGluZ3Mud2FpdEZvclRyYW5zaXRpb24gfHwgR2xpZGUuZGlzYWJsZSgpXG5cbiAgICAgICAgdGhpcy5tb3ZlID0gbW92ZVxuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdydW4uYmVmb3JlJywgdGhpcy5tb3ZlKVxuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlKClcblxuICAgICAgICBFdmVudHMuZW1pdCgncnVuJywgdGhpcy5tb3ZlKVxuXG4gICAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcigoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNTdGFydCgpKSB7XG4gICAgICAgICAgICBFdmVudHMuZW1pdCgncnVuLnN0YXJ0JywgdGhpcy5tb3ZlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmlzRW5kKCkpIHtcbiAgICAgICAgICAgIEV2ZW50cy5lbWl0KCdydW4uZW5kJywgdGhpcy5tb3ZlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmlzT2Zmc2V0KCkpIHtcbiAgICAgICAgICAgIHRoaXMuX28gPSBmYWxzZVxuXG4gICAgICAgICAgICBFdmVudHMuZW1pdCgncnVuLm9mZnNldCcsIHRoaXMubW92ZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBFdmVudHMuZW1pdCgncnVuLmFmdGVyJywgdGhpcy5tb3ZlKVxuXG4gICAgICAgICAgR2xpZGUuZW5hYmxlKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyBjdXJyZW50IGluZGV4IGJhc2VkIG9uIGRlZmluZWQgbW92ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcnxVbmRlZmluZWR9XG4gICAgICovXG4gICAgY2FsY3VsYXRlICgpIHtcbiAgICAgIGNvbnN0IHsgbW92ZSwgbGVuZ3RoIH0gPSB0aGlzXG4gICAgICBjb25zdCB7IHN0ZXBzLCBkaXJlY3Rpb24gfSA9IG1vdmVcblxuICAgICAgLy8gQnkgZGVmYXVsdCBhc3N1bWUgdGhhdCBzaXplIG9mIHZpZXcgaXMgZXF1YWwgdG8gb25lIHNsaWRlXG4gICAgICBsZXQgdmlld1NpemUgPSAxXG4gICAgICAvLyBEZXRlcm1pbmUgaWYgc3RlcHMgYXJlIG51bWVyaWMgdmFsdWVcbiAgICAgIGxldCBjb3VudGFibGVTdGVwcyA9IGlzTnVtYmVyKHRvSW50KHN0ZXBzKSkgJiYgdG9JbnQoc3RlcHMpICE9PSAwXG5cbiAgICAgIC8vIFdoaWxlIGRpcmVjdGlvbiBpcyBgPWAgd2Ugd2FudCBqdW1wIHRvXG4gICAgICAvLyBhIHNwZWNpZmllZCBpbmRleCBkZXNjcmliZWQgaW4gc3RlcHMuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPScpIHtcbiAgICAgICAgR2xpZGUuaW5kZXggPSBzdGVwc1xuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBXaGVuIHBhdHRlcm4gaXMgZXF1YWwgdG8gYD4+YCB3ZSB3YW50XG4gICAgICAvLyBmYXN0IGZvcndhcmQgdG8gdGhlIGxhc3Qgc2xpZGUuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPicgJiYgc3RlcHMgPT09ICc+Jykge1xuICAgICAgICBHbGlkZS5pbmRleCA9IGxlbmd0aFxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBXaGVuIHBhdHRlcm4gaXMgZXF1YWwgdG8gYDw8YCB3ZSB3YW50XG4gICAgICAvLyBmYXN0IGZvcndhcmQgdG8gdGhlIGZpcnN0IHNsaWRlLlxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJzwnICYmIHN0ZXBzID09PSAnPCcpIHtcbiAgICAgICAgR2xpZGUuaW5kZXggPSAwXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIFdoaWxlIHN0ZXBzIGlzIGEgbnVtZXJpYyB2YWx1ZSBhbmQgd2VcbiAgICAgIC8vIG1vdmUgZm9yd2FyZCBieSB0aGUgbnVtYmVyIG9mIHN0ZXBzLlxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJz4nICYmIGNvdW50YWJsZVN0ZXBzKSB7XG4gICAgICAgIHZpZXdTaXplID0gdG9JbnQoc3RlcHMpICogLTFcbiAgICAgIH1cblxuICAgICAgLy8gJHN0ZXBzPCAoZHJhZykgbW92ZW1lbnRcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc8JyAmJiBjb3VudGFibGVTdGVwcykge1xuICAgICAgICB2aWV3U2l6ZSA9IHRvSW50KHN0ZXBzKVxuICAgICAgfVxuXG4gICAgICAvLyBwYWdpbmF0aW9uIG1vdmVtZW50XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnfCcpIHtcbiAgICAgICAgdmlld1NpemUgPSBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3IHx8IDFcbiAgICAgIH1cblxuICAgICAgLy8gd2UgYXJlIG1vdmluZyBmb3J3YXJkXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPicgfHwgKGRpcmVjdGlvbiA9PT0gJ3wnICYmIHN0ZXBzID09PSAnPicpKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gY2FsY3VsYXRlRm9yd2FyZEluZGV4KHZpZXdTaXplKVxuXG4gICAgICAgIGlmIChpbmRleCA+IGxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuX28gPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBHbGlkZS5pbmRleCA9IG5vcm1hbGl6ZUZvcndhcmRJbmRleChpbmRleCwgdmlld1NpemUpXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIHdlIGFyZSBtb3ZpbmcgYmFja3dhcmRcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc8JyB8fCAoZGlyZWN0aW9uID09PSAnfCcgJiYgc3RlcHMgPT09ICc8JykpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBjYWxjdWxhdGVCYWNrd2FyZEluZGV4KHZpZXdTaXplKVxuXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICB0aGlzLl9vID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgR2xpZGUuaW5kZXggPSBub3JtYWxpemVCYWNrd2FyZEluZGV4KGluZGV4LCB2aWV3U2l6ZSlcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgd2FybihgSW52YWxpZCBkaXJlY3Rpb24gcGF0dGVybiBbJHtkaXJlY3Rpb259JHtzdGVwc31dIGhhcyBiZWVuIHVzZWRgKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgd2UgYXJlIG9uIHRoZSBmaXJzdCBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNTdGFydCAoKSB7XG4gICAgICByZXR1cm4gR2xpZGUuaW5kZXggPD0gMFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgd2UgYXJlIG9uIHRoZSBsYXN0IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0VuZCAoKSB7XG4gICAgICByZXR1cm4gR2xpZGUuaW5kZXggPj0gdGhpcy5sZW5ndGhcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHdlIGFyZSBtYWtpbmcgYSBvZmZzZXQgcnVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdGlvblxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNPZmZzZXQgKGRpcmVjdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCFkaXJlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl9vKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICAvLyBkaWQgd2UgdmlldyB0byB0aGUgcmlnaHQ/XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnfD4nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmUuZGlyZWN0aW9uID09PSAnfCcgJiYgdGhpcy5tb3ZlLnN0ZXBzID09PSAnPidcbiAgICAgIH1cblxuICAgICAgLy8gZGlkIHdlIHZpZXcgdG8gdGhlIGxlZnQ/XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnfDwnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmUuZGlyZWN0aW9uID09PSAnfCcgJiYgdGhpcy5tb3ZlLnN0ZXBzID09PSAnPCdcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMubW92ZS5kaXJlY3Rpb24gPT09IGRpcmVjdGlvblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYm91bmQgbW9kZSBpcyBhY3RpdmVcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNCb3VuZCAoKSB7XG4gICAgICByZXR1cm4gR2xpZGUuaXNUeXBlKCdzbGlkZXInKSAmJiBHbGlkZS5zZXR0aW5ncy5mb2N1c0F0ICE9PSAnY2VudGVyJyAmJiBHbGlkZS5zZXR0aW5ncy5ib3VuZFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGluZGV4IHZhbHVlIHRvIG1vdmUgZm9yd2FyZC90byB0aGUgcmlnaHRcbiAgICpcbiAgICogQHBhcmFtIHZpZXdTaXplXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBjYWxjdWxhdGVGb3J3YXJkSW5kZXggKHZpZXdTaXplKSB7XG4gICAgY29uc3QgeyBpbmRleCB9ID0gR2xpZGVcblxuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykpIHtcbiAgICAgIHJldHVybiBpbmRleCArIHZpZXdTaXplXG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4ICsgKHZpZXdTaXplIC0gKGluZGV4ICUgdmlld1NpemUpKVxuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZXMgdGhlIGdpdmVuIGZvcndhcmQgaW5kZXggYmFzZWQgb24gZ2xpZGUgc2V0dGluZ3MsIHByZXZlbnRpbmcgaXQgdG8gZXhjZWVkIGNlcnRhaW4gYm91bmRhcmllc1xuICAgKlxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICogQHBhcmFtIGxlbmd0aFxuICAgKiBAcGFyYW0gdmlld1NpemVcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZUZvcndhcmRJbmRleCAoaW5kZXgsIHZpZXdTaXplKSB7XG4gICAgY29uc3QgeyBsZW5ndGggfSA9IFJ1blxuXG4gICAgaWYgKGluZGV4IDw9IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgcmV0dXJuIGluZGV4IC0gKGxlbmd0aCArIDEpXG4gICAgfVxuXG4gICAgaWYgKEdsaWRlLnNldHRpbmdzLnJld2luZCkge1xuICAgICAgLy8gYm91bmQgZG9lcyBmdW5ueSB0aGluZ3Mgd2l0aCB0aGUgbGVuZ3RoLCB0aGVyZWZvciB3ZSBoYXZlIHRvIGJlIGNlcnRhaW5cbiAgICAgIC8vIHRoYXQgd2UgYXJlIG9uIHRoZSBsYXN0IHBvc3NpYmxlIGluZGV4IHZhbHVlIGdpdmVuIGJ5IGJvdW5kXG4gICAgICBpZiAoUnVuLmlzQm91bmQoKSAmJiAhUnVuLmlzRW5kKCkpIHtcbiAgICAgICAgcmV0dXJuIGxlbmd0aFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gMFxuICAgIH1cblxuICAgIGlmIChSdW4uaXNCb3VuZCgpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoXG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguZmxvb3IobGVuZ3RoIC8gdmlld1NpemUpICogdmlld1NpemVcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIGluZGV4IHZhbHVlIHRvIG1vdmUgYmFja3dhcmQvdG8gdGhlIGxlZnRcbiAgICpcbiAgICogQHBhcmFtIHZpZXdTaXplXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBjYWxjdWxhdGVCYWNrd2FyZEluZGV4ICh2aWV3U2l6ZSkge1xuICAgIGNvbnN0IHsgaW5kZXggfSA9IEdsaWRlXG5cbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICByZXR1cm4gaW5kZXggLSB2aWV3U2l6ZVxuICAgIH1cblxuICAgIC8vIGVuc3VyZSBvdXIgYmFjayBuYXZpZ2F0aW9uIHJlc3VsdHMgaW4gdGhlIHNhbWUgaW5kZXggYXMgYSBmb3J3YXJkIG5hdmlnYXRpb25cbiAgICAvLyB0byBleHBlcmllbmNlIGEgaG9tb2dlbmVvdXMgcGFnaW5nXG4gICAgY29uc3QgdmlldyA9IE1hdGguY2VpbChpbmRleCAvIHZpZXdTaXplKVxuXG4gICAgcmV0dXJuICh2aWV3IC0gMSkgKiB2aWV3U2l6ZVxuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZXMgdGhlIGdpdmVuIGJhY2t3YXJkIGluZGV4IGJhc2VkIG9uIGdsaWRlIHNldHRpbmdzLCBwcmV2ZW50aW5nIGl0IHRvIGV4Y2VlZCBjZXJ0YWluIGJvdW5kYXJpZXNcbiAgICpcbiAgICogQHBhcmFtIGluZGV4XG4gICAqIEBwYXJhbSBsZW5ndGhcbiAgICogQHBhcmFtIHZpZXdTaXplXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZnVuY3Rpb24gbm9ybWFsaXplQmFja3dhcmRJbmRleCAoaW5kZXgsIHZpZXdTaXplKSB7XG4gICAgY29uc3QgeyBsZW5ndGggfSA9IFJ1blxuXG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykpIHtcbiAgICAgIHJldHVybiBpbmRleCArIChsZW5ndGggKyAxKVxuICAgIH1cblxuICAgIGlmIChHbGlkZS5zZXR0aW5ncy5yZXdpbmQpIHtcbiAgICAgIC8vIGJvdW5kIGRvZXMgZnVubnkgdGhpbmdzIHdpdGggdGhlIGxlbmd0aCwgdGhlcmVmb3Igd2UgaGF2ZSB0byBiZSBjZXJ0YWluXG4gICAgICAvLyB0aGF0IHdlIGFyZSBvbiBmaXJzdCBwb3NzaWJsZSBpbmRleCB2YWx1ZSBiZWZvcmUgd2UgdG8gcmV3aW5kIHRvIHRoZSBsZW5ndGggZ2l2ZW4gYnkgYm91bmRcbiAgICAgIGlmIChSdW4uaXNCb3VuZCgpICYmIFJ1bi5pc1N0YXJ0KCkpIHtcbiAgICAgICAgcmV0dXJuIGxlbmd0aFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihsZW5ndGggLyB2aWV3U2l6ZSkgKiB2aWV3U2l6ZVxuICAgIH1cblxuICAgIHJldHVybiAwXG4gIH1cblxuICBkZWZpbmUoUnVuLCAnbW92ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBtb3ZlIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9tXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgb2YgdGhlIG1vdmUgc2NoZW1hLlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBzZXQgKHZhbHVlKSB7XG4gICAgICBsZXQgc3RlcCA9IHZhbHVlLnN1YnN0cigxKVxuXG4gICAgICB0aGlzLl9tID0ge1xuICAgICAgICBkaXJlY3Rpb246IHZhbHVlLnN1YnN0cigwLCAxKSxcbiAgICAgICAgc3RlcHM6IHN0ZXAgPyAodG9JbnQoc3RlcCkgPyB0b0ludChzdGVwKSA6IHN0ZXApIDogMFxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoUnVuLCAnbGVuZ3RoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIHJ1bm5pbmcgZGlzdGFuY2UgYmFzZWRcbiAgICAgKiBvbiB6ZXJvLWluZGV4aW5nIG51bWJlciBvZiBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIGxldCB7IHNldHRpbmdzIH0gPSBHbGlkZVxuICAgICAgbGV0IHsgbGVuZ3RoIH0gPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzXG5cbiAgICAgIC8vIElmIHRoZSBgYm91bmRgIG9wdGlvbiBpcyBhY3RpdmUsIGEgbWF4aW11bSBydW5uaW5nIGRpc3RhbmNlIHNob3VsZCBiZVxuICAgICAgLy8gcmVkdWNlZCBieSBgcGVyVmlld2AgYW5kIGBmb2N1c0F0YCBzZXR0aW5ncy4gUnVubmluZyBkaXN0YW5jZVxuICAgICAgLy8gc2hvdWxkIGVuZCBiZWZvcmUgY3JlYXRpbmcgYW4gZW1wdHkgc3BhY2UgYWZ0ZXIgaW5zdGFuY2UuXG4gICAgICBpZiAodGhpcy5pc0JvdW5kKCkpIHtcbiAgICAgICAgcmV0dXJuIChsZW5ndGggLSAxKSAtICh0b0ludChzZXR0aW5ncy5wZXJWaWV3KSAtIDEpICsgdG9JbnQoc2V0dGluZ3MuZm9jdXNBdClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxlbmd0aCAtIDFcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKFJ1biwgJ29mZnNldCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHN0YXR1cyBvZiB0aGUgb2Zmc2V0dGluZyBmbGFnLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX29cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIFJ1blxufVxuIiwiLyoqXG4gKiBSZXR1cm5zIGEgY3VycmVudCB0aW1lLlxuICpcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vdyAoKSB7XG4gIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxufVxuIiwiaW1wb3J0IHsgbm93IH0gZnJvbSAnLi90aW1lJ1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkXG4gKiBhdCBtb3N0IG9uY2UgZHVyaW5nIGEgZ2l2ZW4gd2luZG93IG9mIHRpbWUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY1xuICogQHBhcmFtIHtOdW1iZXJ9IHdhaXRcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlIChmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIGxldCB0aW1lb3V0LCBjb250ZXh0LCBhcmdzLCByZXN1bHRcbiAgbGV0IHByZXZpb3VzID0gMFxuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fVxuXG4gIGxldCBsYXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogbm93KClcbiAgICB0aW1lb3V0ID0gbnVsbFxuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncylcbiAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbFxuICB9XG5cbiAgbGV0IHRocm90dGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXQgPSBub3coKVxuICAgIGlmICghcHJldmlvdXMgJiYgb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSkgcHJldmlvdXMgPSBhdFxuICAgIGxldCByZW1haW5pbmcgPSB3YWl0IC0gKGF0IC0gcHJldmlvdXMpXG4gICAgY29udGV4dCA9IHRoaXNcbiAgICBhcmdzID0gYXJndW1lbnRzXG4gICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcbiAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuICAgICAgICB0aW1lb3V0ID0gbnVsbFxuICAgICAgfVxuICAgICAgcHJldmlvdXMgPSBhdFxuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGxcbiAgICB9IGVsc2UgaWYgKCF0aW1lb3V0ICYmIG9wdGlvbnMudHJhaWxpbmcgIT09IGZhbHNlKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICB0aHJvdHRsZWQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuICAgIHByZXZpb3VzID0gMFxuICAgIHRpbWVvdXQgPSBjb250ZXh0ID0gYXJncyA9IG51bGxcbiAgfVxuXG4gIHJldHVybiB0aHJvdHRsZWRcbn1cbiIsImltcG9ydCB7IHRvSW50IH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnLi4vdXRpbHMvd2FpdCdcblxuY29uc3QgTUFSR0lOX1RZUEUgPSB7XG4gIGx0cjogWydtYXJnaW5MZWZ0JywgJ21hcmdpblJpZ2h0J10sXG4gIHJ0bDogWydtYXJnaW5SaWdodCcsICdtYXJnaW5MZWZ0J11cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgR2FwcyA9IHtcbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIGdhcHMgYmV0d2VlbiBzbGlkZXMuIEZpcnN0IGFuZCBsYXN0XG4gICAgICogc2xpZGVzIGRvIG5vdCByZWNlaXZlIGl0J3MgZWRnZSBtYXJnaW5zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gc2xpZGVzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhcHBseSAoc2xpZGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2xpZGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGxldCBzdHlsZSA9IHNsaWRlc1tpXS5zdHlsZVxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gQ29tcG9uZW50cy5EaXJlY3Rpb24udmFsdWVcblxuICAgICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMF1dID0gYCR7dGhpcy52YWx1ZSAvIDJ9cHhgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGVbTUFSR0lOX1RZUEVbZGlyZWN0aW9uXVswXV0gPSAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGkgIT09IHNsaWRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgc3R5bGVbTUFSR0lOX1RZUEVbZGlyZWN0aW9uXVsxXV0gPSBgJHt0aGlzLnZhbHVlIC8gMn1weGBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzFdXSA9ICcnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBnYXBzIGZyb20gdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IHNsaWRlc1xuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICovXG4gICAgcmVtb3ZlIChzbGlkZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzbGlkZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbGV0IHN0eWxlID0gc2xpZGVzW2ldLnN0eWxlXG5cbiAgICAgICAgc3R5bGUubWFyZ2luTGVmdCA9ICcnXG4gICAgICAgIHN0eWxlLm1hcmdpblJpZ2h0ID0gJydcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZWZpbmUoR2FwcywgJ3ZhbHVlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIGdhcC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiB0b0ludChHbGlkZS5zZXR0aW5ncy5nYXApXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShHYXBzLCAnZ3JvdycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGFkZGl0aW9uYWwgZGltZW50aW9ucyB2YWx1ZSBjYXVzZWQgYnkgZ2Fwcy5cbiAgICAgKiBVc2VkIHRvIGluY3JlYXNlIHdpZHRoIG9mIHRoZSBzbGlkZXMgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBHYXBzLnZhbHVlICogKENvbXBvbmVudHMuU2l6ZXMubGVuZ3RoKVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoR2FwcywgJ3JlZHVjdG9yJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgcmVkdWN0aW9uIHZhbHVlIGNhdXNlZCBieSBnYXBzLlxuICAgICAqIFVzZWQgdG8gc3VidHJhY3Qgd2lkdGggb2YgdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIGxldCBwZXJWaWV3ID0gR2xpZGUuc2V0dGluZ3MucGVyVmlld1xuXG4gICAgICByZXR1cm4gKEdhcHMudmFsdWUgKiAocGVyVmlldyAtIDEpKSAvIHBlclZpZXdcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIEFwcGx5IGNhbGN1bGF0ZWQgZ2FwczpcbiAgICogLSBhZnRlciBidWlsZGluZywgc28gc2xpZGVzIChpbmNsdWRpbmcgY2xvbmVzKSB3aWxsIHJlY2VpdmUgcHJvcGVyIG1hcmdpbnNcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJLCB0byByZWNhbGN1bGF0ZSBnYXBzIHdpdGggbmV3IG9wdGlvbnNcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmFmdGVyJywgJ3VwZGF0ZSddLCB0aHJvdHRsZSgoKSA9PiB7XG4gICAgR2Fwcy5hcHBseShDb21wb25lbnRzLkh0bWwud3JhcHBlci5jaGlsZHJlbilcbiAgfSwgMzApKVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgZ2FwczpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgR2Fwcy5yZW1vdmUoQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuY2hpbGRyZW4pXG4gIH0pXG5cbiAgcmV0dXJuIEdhcHNcbn1cbiIsIi8qKlxuICogRmluZHMgc2libGluZ3Mgbm9kZXMgb2YgdGhlIHBhc3NlZCBub2RlLlxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IG5vZGVcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2libGluZ3MgKG5vZGUpIHtcbiAgaWYgKG5vZGUgJiYgbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgbGV0IG4gPSBub2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZFxuICAgIGxldCBtYXRjaGVkID0gW11cblxuICAgIGZvciAoOyBuOyBuID0gbi5uZXh0U2libGluZykge1xuICAgICAgaWYgKG4ubm9kZVR5cGUgPT09IDEgJiYgbiAhPT0gbm9kZSkge1xuICAgICAgICBtYXRjaGVkLnB1c2gobilcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2hlZFxuICB9XG5cbiAgcmV0dXJuIFtdXG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHBhc3NlZCBub2RlIGV4aXN0IGFuZCBpcyBhIHZhbGlkIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gbm9kZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4aXN0IChub2RlKSB7XG4gIGlmIChub2RlICYmIG5vZGUgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xuaW1wb3J0IHsgZXhpc3QgfSBmcm9tICcuLi91dGlscy9kb20nXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbmNvbnN0IFRSQUNLX1NFTEVDVE9SID0gJ1tkYXRhLWdsaWRlLWVsPVwidHJhY2tcIl0nXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cykge1xuICBjb25zdCBIdG1sID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwIHNsaWRlciBIVE1MIG5vZGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtHbGlkZX0gZ2xpZGVcbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLnJvb3QgPSBHbGlkZS5zZWxlY3RvclxuICAgICAgdGhpcy50cmFjayA9IHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yKFRSQUNLX1NFTEVDVE9SKVxuICAgICAgdGhpcy5zbGlkZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLndyYXBwZXIuY2hpbGRyZW4pLmZpbHRlcigoc2xpZGUpID0+IHtcbiAgICAgICAgcmV0dXJuICFzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlcy5jbG9uZVNsaWRlKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoSHRtbCwgJ3Jvb3QnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBub2RlIG9mIHRoZSBnbGlkZSBtYWluIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBIdG1sLl9yXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgbm9kZSBvZiB0aGUgZ2xpZGUgbWFpbiBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNldCAocikge1xuICAgICAgaWYgKGlzU3RyaW5nKHIpKSB7XG4gICAgICAgIHIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHIpXG4gICAgICB9XG5cbiAgICAgIGlmIChleGlzdChyKSkge1xuICAgICAgICBIdG1sLl9yID0gclxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybignUm9vdCBlbGVtZW50IG11c3QgYmUgYSBleGlzdGluZyBIdG1sIG5vZGUnKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoSHRtbCwgJ3RyYWNrJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgbm9kZSBvZiB0aGUgZ2xpZGUgdHJhY2sgd2l0aCBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBIdG1sLl90XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgbm9kZSBvZiB0aGUgZ2xpZGUgdHJhY2sgd2l0aCBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0ICh0KSB7XG4gICAgICBpZiAoZXhpc3QodCkpIHtcbiAgICAgICAgSHRtbC5fdCA9IHRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oYENvdWxkIG5vdCBmaW5kIHRyYWNrIGVsZW1lbnQuIFBsZWFzZSB1c2UgJHtUUkFDS19TRUxFQ1RPUn0gYXR0cmlidXRlLmApXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShIdG1sLCAnd3JhcHBlcicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIG5vZGUgb2YgdGhlIHNsaWRlcyB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gSHRtbC50cmFjay5jaGlsZHJlblswXVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gSHRtbFxufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHsgdG9JbnQsIGlzT2JqZWN0IH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgUGVlayA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgaG93IG11Y2ggdG8gcGVlayBiYXNlZCBvbiBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy52YWx1ZSA9IEdsaWRlLnNldHRpbmdzLnBlZWtcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoUGVlaywgJ3ZhbHVlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIHBlZWsuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfE9iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIFBlZWsuX3ZcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0aGUgcGVlay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldCAodmFsdWUpIHtcbiAgICAgIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUuYmVmb3JlID0gdG9JbnQodmFsdWUuYmVmb3JlKVxuICAgICAgICB2YWx1ZS5hZnRlciA9IHRvSW50KHZhbHVlLmFmdGVyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSB0b0ludCh2YWx1ZSlcbiAgICAgIH1cblxuICAgICAgUGVlay5fdiA9IHZhbHVlXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShQZWVrLCAncmVkdWN0b3InLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyByZWR1Y3Rpb24gdmFsdWUgY2F1c2VkIGJ5IHBlZWsuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgdmFsdWUgPSBQZWVrLnZhbHVlXG4gICAgICBsZXQgcGVyVmlldyA9IEdsaWRlLnNldHRpbmdzLnBlclZpZXdcblxuICAgICAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gKHZhbHVlLmJlZm9yZSAvIHBlclZpZXcpICsgKHZhbHVlLmFmdGVyIC8gcGVyVmlldylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlICogMiAvIHBlclZpZXdcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlY2FsY3VsYXRlIHBlZWtpbmcgc2l6ZXMgb246XG4gICAqIC0gd2hlbiByZXNpemluZyB3aW5kb3cgdG8gdXBkYXRlIHRvIHByb3BlciBwZXJjZW50c1xuICAgKi9cbiAgRXZlbnRzLm9uKFsncmVzaXplJywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgUGVlay5tb3VudCgpXG4gIH0pXG5cbiAgcmV0dXJuIFBlZWtcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCB7IHRvSW50LCBpc1VuZGVmaW5lZCB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IE1vdmUgPSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBtb3ZlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuX28gPSAwXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgYSBtb3ZlbWVudCB2YWx1ZSBiYXNlZCBvbiBwYXNzZWQgb2Zmc2V0IGFuZCBjdXJyZW50bHkgYWN0aXZlIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBvZmZzZXRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1ha2UgKG9mZnNldCA9IDApIHtcbiAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0XG5cbiAgICAgIEV2ZW50cy5lbWl0KCdtb3ZlJywge1xuICAgICAgICBtb3ZlbWVudDogdGhpcy52YWx1ZVxuICAgICAgfSlcblxuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKCgpID0+IHtcbiAgICAgICAgRXZlbnRzLmVtaXQoJ21vdmUuYWZ0ZXInLCB7XG4gICAgICAgICAgbW92ZW1lbnQ6IHRoaXMudmFsdWVcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKE1vdmUsICdvZmZzZXQnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBvZmZzZXQgdmFsdWUgdXNlZCB0byBtb2RpZnkgY3VycmVudCB0cmFuc2xhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBNb3ZlLl9vXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgYW4gb2Zmc2V0IHZhbHVlIHVzZWQgdG8gbW9kaWZ5IGN1cnJlbnQgdHJhbnNsYXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNldCAodmFsdWUpIHtcbiAgICAgIE1vdmUuX28gPSAhaXNVbmRlZmluZWQodmFsdWUpID8gdG9JbnQodmFsdWUpIDogMFxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoTW92ZSwgJ3RyYW5zbGF0ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcmF3IG1vdmVtZW50IHZhbHVlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICogR2xpZGUuaW5kZXhcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKE1vdmUsICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGFuIGFjdHVhbCBtb3ZlbWVudCB2YWx1ZSBjb3JyZWN0ZWQgYnkgb2Zmc2V0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5vZmZzZXRcbiAgICAgIGxldCB0cmFuc2xhdGUgPSB0aGlzLnRyYW5zbGF0ZVxuXG4gICAgICBpZiAoQ29tcG9uZW50cy5EaXJlY3Rpb24uaXMoJ3J0bCcpKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGUgKyBvZmZzZXRcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIG9mZnNldFxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogTWFrZSBtb3ZlbWVudCB0byBwcm9wZXIgc2xpZGUgb246XG4gICAqIC0gYmVmb3JlIGJ1aWxkLCBzbyBnbGlkZSB3aWxsIHN0YXJ0IGF0IGBzdGFydEF0YCBpbmRleFxuICAgKiAtIG9uIGVhY2ggc3RhbmRhcmQgcnVuIHRvIG1vdmUgdG8gbmV3bHkgY2FsY3VsYXRlZCBpbmRleFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYmVmb3JlJywgJ3J1biddLCAoKSA9PiB7XG4gICAgTW92ZS5tYWtlKClcbiAgfSlcblxuICByZXR1cm4gTW92ZVxufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBTaXplcyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgZGltZW50aW9ucyBvZiBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldHVwU2xpZGVzICgpIHtcbiAgICAgIGxldCB3aWR0aCA9IGAke3RoaXMuc2xpZGVXaWR0aH1weGBcbiAgICAgIGxldCBzbGlkZXMgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNsaWRlc1tpXS5zdHlsZS53aWR0aCA9IHdpZHRoXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHVwcyBkaW1lbnRpb25zIG9mIHNsaWRlcyB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXR1cFdyYXBwZXIgKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUud2lkdGggPSBgJHt0aGlzLndyYXBwZXJTaXplfXB4YFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFwcGxpZWQgc3R5bGVzIGZyb20gSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZSAoKSB7XG4gICAgICBsZXQgc2xpZGVzID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlc1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzbGlkZXNbaV0uc3R5bGUud2lkdGggPSAnJ1xuICAgICAgfVxuXG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS53aWR0aCA9ICcnXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKFNpemVzLCAnbGVuZ3RoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgY291bnQgbnVtYmVyIG9mIHRoZSBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBDb21wb25lbnRzLkh0bWwuc2xpZGVzLmxlbmd0aFxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoU2l6ZXMsICd3aWR0aCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHdpZHRoIHZhbHVlIG9mIHRoZSBzbGlkZXIgKHZpc2libGUgYXJlYSkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBDb21wb25lbnRzLkh0bWwucm9vdC5vZmZzZXRXaWR0aFxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoU2l6ZXMsICd3cmFwcGVyU2l6ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHNpemUgb2YgdGhlIHNsaWRlcyB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gU2l6ZXMuc2xpZGVXaWR0aCAqIFNpemVzLmxlbmd0aCArIENvbXBvbmVudHMuR2Fwcy5ncm93ICsgQ29tcG9uZW50cy5DbG9uZXMuZ3Jvd1xuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoU2l6ZXMsICdzbGlkZVdpZHRoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgd2lkdGggdmFsdWUgb2YgYSBzaW5nbGUgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiAoU2l6ZXMud2lkdGggLyBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3KSAtIENvbXBvbmVudHMuUGVlay5yZWR1Y3RvciAtIENvbXBvbmVudHMuR2Fwcy5yZWR1Y3RvclxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogQXBwbHkgY2FsY3VsYXRlZCBnbGlkZSdzIGRpbWVuc2lvbnM6XG4gICAqIC0gYmVmb3JlIGJ1aWxkaW5nLCBzbyBvdGhlciBkaW1lbnRpb25zIChlLmcuIHRyYW5zbGF0ZSkgd2lsbCBiZSBjYWxjdWxhdGVkIHByb3BlcnRseVxuICAgKiAtIHdoZW4gcmVzaXppbmcgd2luZG93IHRvIHJlY2FsY3VsYXRlIHNpbGRlcyBkaW1lbnNpb25zXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSwgdG8gY2FsY3VsYXRlIGRpbWVuc2lvbnMgYmFzZWQgb24gbmV3IG9wdGlvbnNcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmJlZm9yZScsICdyZXNpemUnLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBTaXplcy5zZXR1cFNsaWRlcygpXG4gICAgU2l6ZXMuc2V0dXBXcmFwcGVyKClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3ZlIGNhbGN1bGF0ZWQgZ2xpZGUncyBkaW1lbnNpb25zOlxuICAgKiAtIG9uIGRlc3RvdGluZyB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIFNpemVzLnJlbW92ZSgpXG4gIH0pXG5cbiAgcmV0dXJuIFNpemVzXG59XG4iLCJpbXBvcnQgeyBzaWJsaW5ncyB9IGZyb20gJy4uL3V0aWxzL2RvbSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgQnVpbGQgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdCBnbGlkZSBidWlsZGluZy4gQWRkcyBjbGFzc2VzLCBzZXRzXG4gICAgICogZGltZW5zaW9ucyBhbmQgc2V0dXBzIGluaXRpYWwgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIEV2ZW50cy5lbWl0KCdidWlsZC5iZWZvcmUnKVxuXG4gICAgICB0aGlzLnR5cGVDbGFzcygpXG4gICAgICB0aGlzLmFjdGl2ZUNsYXNzKClcblxuICAgICAgRXZlbnRzLmVtaXQoJ2J1aWxkLmFmdGVyJylcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBgdHlwZWAgY2xhc3MgdG8gdGhlIGdsaWRlIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHR5cGVDbGFzcyAoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKEdsaWRlLnNldHRpbmdzLmNsYXNzZXNbR2xpZGUuc2V0dGluZ3MudHlwZV0pXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFjdGl2ZUNsYXNzICgpIHtcbiAgICAgIGxldCBjbGFzc2VzID0gR2xpZGUuc2V0dGluZ3MuY2xhc3Nlc1xuICAgICAgbGV0IHNsaWRlID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlc1tHbGlkZS5pbmRleF1cblxuICAgICAgaWYgKHNsaWRlKSB7XG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5hY3RpdmVTbGlkZSlcblxuICAgICAgICBzaWJsaW5ncyhzbGlkZSkuZm9yRWFjaCgoc2libGluZykgPT4ge1xuICAgICAgICAgIHNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZShjbGFzc2VzLmFjdGl2ZVNsaWRlKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIEhUTUwgY2xhc3NlcyBhcHBsaWVkIGF0IGJ1aWxkaW5nLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVDbGFzc2VzICgpIHtcbiAgICAgIGxldCBjbGFzc2VzID0gR2xpZGUuc2V0dGluZ3MuY2xhc3Nlc1xuXG4gICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzZXNbR2xpZGUuc2V0dGluZ3MudHlwZV0pXG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC5zbGlkZXMuZm9yRWFjaCgoc2libGluZykgPT4ge1xuICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlcy5hY3RpdmVTbGlkZSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGJ1aWxkaW5nIGNsYXNzZXM6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBIVE1MIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVtb3ZlIGNsYXNzZXMgYmVmb3JlIHJlbW91bnRpbmcgY29tcG9uZW50XG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgQnVpbGQucmVtb3ZlQ2xhc3NlcygpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW91bnQgY29tcG9uZW50OlxuICAgKiAtIG9uIHJlc2l6aW5nIG9mIHRoZSB3aW5kb3cgdG8gY2FsY3VsYXRlIG5ldyBkaW1lbnRpb25zXG4gICAqIC0gb24gdXBkYXRpbmcgc2V0dGluZ3MgdmlhIEFQSVxuICAgKi9cbiAgRXZlbnRzLm9uKFsncmVzaXplJywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgQnVpbGQubW91bnQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBTd2FwIGFjdGl2ZSBjbGFzcyBvZiBjdXJyZW50IHNsaWRlOlxuICAgKiAtIGFmdGVyIGVhY2ggbW92ZSB0byB0aGUgbmV3IGluZGV4XG4gICAqL1xuICBFdmVudHMub24oJ21vdmUuYWZ0ZXInLCAoKSA9PiB7XG4gICAgQnVpbGQuYWN0aXZlQ2xhc3MoKVxuICB9KVxuXG4gIHJldHVybiBCdWlsZFxufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBDbG9uZXMgPSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHBhdHRlcm4gbWFwIGFuZCBjb2xsZWN0IHNsaWRlcyB0byBiZSBjbG9uZWQuXG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5pdGVtcyA9IFtdXG5cbiAgICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuY29sbGVjdCgpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENvbGxlY3QgY2xvbmVzIHdpdGggcGF0dGVybi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1tdfVxuICAgICAqL1xuICAgIGNvbGxlY3QgKGl0ZW1zID0gW10pIHtcbiAgICAgIGxldCB7IHNsaWRlcyB9ID0gQ29tcG9uZW50cy5IdG1sXG4gICAgICBsZXQgeyBwZXJWaWV3LCBjbGFzc2VzIH0gPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICBjb25zdCBwZWVrSW5jcmVtZW50ZXIgPSArISFHbGlkZS5zZXR0aW5ncy5wZWVrXG4gICAgICBjb25zdCBjbG9uZUNvdW50ID0gcGVyVmlldyArIHBlZWtJbmNyZW1lbnRlciArIE1hdGgucm91bmQocGVyVmlldyAvIDIpXG4gICAgICBjb25zdCBhcHBlbmQgPSBzbGlkZXMuc2xpY2UoMCwgY2xvbmVDb3VudCkucmV2ZXJzZSgpXG4gICAgICBjb25zdCBwcmVwZW5kID0gc2xpZGVzLnNsaWNlKGNsb25lQ291bnQgKiAtMSlcblxuICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHBlclZpZXcgLyBzbGlkZXMubGVuZ3RoKSk7IHIrKykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFwcGVuZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBjbG9uZSA9IGFwcGVuZFtpXS5jbG9uZU5vZGUodHJ1ZSlcblxuICAgICAgICAgIGNsb25lLmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5jbG9uZVNsaWRlKVxuXG4gICAgICAgICAgaXRlbXMucHVzaChjbG9uZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlcGVuZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBjbG9uZSA9IHByZXBlbmRbaV0uY2xvbmVOb2RlKHRydWUpXG5cbiAgICAgICAgICBjbG9uZS5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuY2xvbmVTbGlkZSlcblxuICAgICAgICAgIGl0ZW1zLnVuc2hpZnQoY2xvbmUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGl0ZW1zXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFwcGVuZCBjbG9uZWQgc2xpZGVzIHdpdGggZ2VuZXJhdGVkIHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFwcGVuZCAoKSB7XG4gICAgICBsZXQgeyBpdGVtcyB9ID0gdGhpc1xuICAgICAgbGV0IHsgd3JhcHBlciwgc2xpZGVzIH0gPSBDb21wb25lbnRzLkh0bWxcblxuICAgICAgY29uc3QgaGFsZiA9IE1hdGguZmxvb3IoaXRlbXMubGVuZ3RoIC8gMilcbiAgICAgIGNvbnN0IHByZXBlbmQgPSBpdGVtcy5zbGljZSgwLCBoYWxmKS5yZXZlcnNlKClcbiAgICAgIGNvbnN0IGFwcGVuZCA9IGl0ZW1zLnNsaWNlKGhhbGYgKiAtMSkucmV2ZXJzZSgpXG4gICAgICBjb25zdCB3aWR0aCA9IGAke0NvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aH1weGBcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcHBlbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChhcHBlbmRbaV0pXG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlcGVuZC5sZW5ndGg7IGkrKykge1xuICAgICAgICB3cmFwcGVyLmluc2VydEJlZm9yZShwcmVwZW5kW2ldLCBzbGlkZXNbMF0pXG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbXNbaV0uc3R5bGUud2lkdGggPSB3aWR0aFxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGNsb25lZCBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZSAoKSB7XG4gICAgICBsZXQgeyBpdGVtcyB9ID0gdGhpc1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnJlbW92ZUNoaWxkKGl0ZW1zW2ldKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShDbG9uZXMsICdncm93Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYWRkaXRpb25hbCBkaW1lbnRpb25zIHZhbHVlIGNhdXNlZCBieSBjbG9uZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiAoQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICsgQ29tcG9uZW50cy5HYXBzLnZhbHVlKSAqIENsb25lcy5pdGVtcy5sZW5ndGhcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIEFwcGVuZCBhZGRpdGlvbmFsIHNsaWRlJ3MgY2xvbmVzOlxuICAgKiAtIHdoaWxlIGdsaWRlJ3MgdHlwZSBpcyBgY2Fyb3VzZWxgXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsICgpID0+IHtcbiAgICBDbG9uZXMucmVtb3ZlKClcbiAgICBDbG9uZXMubW91bnQoKVxuICAgIENsb25lcy5hcHBlbmQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBBcHBlbmQgYWRkaXRpb25hbCBzbGlkZSdzIGNsb25lczpcbiAgICogLSB3aGlsZSBnbGlkZSdzIHR5cGUgaXMgYGNhcm91c2VsYFxuICAgKi9cbiAgRXZlbnRzLm9uKCdidWlsZC5iZWZvcmUnLCAoKSA9PiB7XG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgQ2xvbmVzLmFwcGVuZCgpXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2xvbmVzIEhUTUxFbGVtZW50czpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBIVE1MIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgQ2xvbmVzLnJlbW92ZSgpXG4gIH0pXG5cbiAgcmV0dXJuIENsb25lc1xufVxuIiwiaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi8uLi91dGlscy91bml0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudHNCaW5kZXIge1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgRXZlbnRzQmluZGVyIGluc3RhbmNlLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKGxpc3RlbmVycyA9IHt9KSB7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBsaXN0ZW5lcnNcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50cyBsaXN0ZW5lcnMgdG8gYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSAge1N0cmluZ3xBcnJheX0gZXZlbnRzXG4gICAqIEBwYXJhbSAge0VsZW1lbnR8V2luZG93fERvY3VtZW50fSBlbFxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2xvc3VyZVxuICAgKiBAcGFyYW0gIHtCb29sZWFufE9iamVjdH0gY2FwdHVyZVxuICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgKi9cbiAgb24gKGV2ZW50cywgZWwsIGNsb3N1cmUsIGNhcHR1cmUgPSBmYWxzZSkge1xuICAgIGlmIChpc1N0cmluZyhldmVudHMpKSB7XG4gICAgICBldmVudHMgPSBbZXZlbnRzXVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyc1tldmVudHNbaV1dID0gY2xvc3VyZVxuXG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgdGhpcy5saXN0ZW5lcnNbZXZlbnRzW2ldXSwgY2FwdHVyZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBldmVudCBsaXN0ZW5lcnMgZnJvbSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfEFycmF5fSBldmVudHNcbiAgICogQHBhcmFtICB7RWxlbWVudHxXaW5kb3d8RG9jdW1lbnR9IGVsXG4gICAqIEBwYXJhbSAge0Jvb2xlYW58T2JqZWN0fSBjYXB0dXJlXG4gICAqIEByZXR1cm4ge1ZvaWR9XG4gICAqL1xuICBvZmYgKGV2ZW50cywgZWwsIGNhcHR1cmUgPSBmYWxzZSkge1xuICAgIGlmIChpc1N0cmluZyhldmVudHMpKSB7XG4gICAgICBldmVudHMgPSBbZXZlbnRzXVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgdGhpcy5saXN0ZW5lcnNbZXZlbnRzW2ldXSwgY2FwdHVyZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBjb2xsZWN0ZWQgbGlzdGVuZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICovXG4gIGRlc3Ryb3kgKCkge1xuICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1xuICB9XG59XG4iLCJpbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJy4uL3V0aWxzL3dhaXQnXG5cbmltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIGNvbnN0IFJlc2l6ZSA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB3aW5kb3cgYmluZGluZ3MuXG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5iaW5kKClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgYHJlenNpemVgIGxpc3RlbmVyIHRvIHRoZSB3aW5kb3cuXG4gICAgICogSXQncyBhIGNvc3RseSBldmVudCwgc28gd2UgYXJlIGRlYm91bmNpbmcgaXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQgKCkge1xuICAgICAgQmluZGVyLm9uKCdyZXNpemUnLCB3aW5kb3csIHRocm90dGxlKCgpID0+IHtcbiAgICAgICAgRXZlbnRzLmVtaXQoJ3Jlc2l6ZScpXG4gICAgICB9LCBHbGlkZS5zZXR0aW5ncy50aHJvdHRsZSkpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgbGlzdGVuZXJzIGZyb20gdGhlIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kICgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ3Jlc2l6ZScsIHdpbmRvdylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGZyb20gd2luZG93OlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIHJlbW92ZSBhZGRlZCBFdmVudExpc3RlbmVyXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgUmVzaXplLnVuYmluZCgpXG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBSZXNpemVcbn1cbiIsImltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlscy9sb2cnXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5cbmNvbnN0IFZBTElEX0RJUkVDVElPTlMgPSBbJ2x0cicsICdydGwnXVxuY29uc3QgRkxJUEVEX01PVkVNRU5UUyA9IHtcbiAgJz4nOiAnPCcsXG4gICc8JzogJz4nLFxuICAnPSc6ICc9J1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBEaXJlY3Rpb24gPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXBzIGdhcCB2YWx1ZSBiYXNlZCBvbiBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy52YWx1ZSA9IEdsaWRlLnNldHRpbmdzLmRpcmVjdGlvblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlcyBwYXR0ZXJuIGJhc2VkIG9uIGRpcmVjdGlvbiB2YWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdHRlcm5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIHJlc29sdmUgKHBhdHRlcm4pIHtcbiAgICAgIGxldCB0b2tlbiA9IHBhdHRlcm4uc2xpY2UoMCwgMSlcblxuICAgICAgaWYgKHRoaXMuaXMoJ3J0bCcpKSB7XG4gICAgICAgIHJldHVybiBwYXR0ZXJuLnNwbGl0KHRva2VuKS5qb2luKEZMSVBFRF9NT1ZFTUVOVFNbdG9rZW5dKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGF0dGVyblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdmFsdWUgb2YgZGlyZWN0aW9uIG1vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0aW9uXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXMgKGRpcmVjdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IGRpcmVjdGlvblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIGRpcmVjdGlvbiBjbGFzcyB0byB0aGUgcm9vdCBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFkZENsYXNzICgpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5hZGQoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlcy5kaXJlY3Rpb25bdGhpcy52YWx1ZV0pXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZGlyZWN0aW9uIGNsYXNzIGZyb20gdGhlIHJvb3QgSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVDbGFzcyAoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QucmVtb3ZlKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uW3RoaXMudmFsdWVdKVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShEaXJlY3Rpb24sICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBkaXJlY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gRGlyZWN0aW9uLl92XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgb2YgdGhlIGRpcmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0ICh2YWx1ZSkge1xuICAgICAgaWYgKFZBTElEX0RJUkVDVElPTlMuaW5kZXhPZih2YWx1ZSkgPiAtMSkge1xuICAgICAgICBEaXJlY3Rpb24uX3YgPSB2YWx1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybignRGlyZWN0aW9uIHZhbHVlIG11c3QgYmUgYGx0cmAgb3IgYHJ0bGAnKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogQ2xlYXIgZGlyZWN0aW9uIGNsYXNzOlxuICAgKiAtIG9uIGRlc3Ryb3kgdG8gYnJpbmcgSFRNTCB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKiAtIG9uIHVwZGF0ZSB0byByZW1vdmUgY2xhc3MgYmVmb3JlIHJlYXBwbGluZyBiZWxsb3dcbiAgICovXG4gIEV2ZW50cy5vbihbJ2Rlc3Ryb3knLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBEaXJlY3Rpb24ucmVtb3ZlQ2xhc3MoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdW50IGNvbXBvbmVudDpcbiAgICogLSBvbiB1cGRhdGUgdG8gcmVmbGVjdCBjaGFuZ2VzIGluIGRpcmVjdGlvbiB2YWx1ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgRGlyZWN0aW9uLm1vdW50KClcbiAgfSlcblxuICAvKipcbiAgICogQXBwbHkgZGlyZWN0aW9uIGNsYXNzOlxuICAgKiAtIGJlZm9yZSBidWlsZGluZyB0byBhcHBseSBjbGFzcyBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICogLSBvbiB1cGRhdGluZyB0byByZWFwcGx5IGRpcmVjdGlvbiBjbGFzcyB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBEaXJlY3Rpb24uYWRkQ2xhc3MoKVxuICB9KVxuXG4gIHJldHVybiBEaXJlY3Rpb25cbn1cbiIsIi8qKlxuICogUmVmbGVjdHMgdmFsdWUgb2YgZ2xpZGUgbW92ZW1lbnQuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE5lZ2F0ZXMgdGhlIHBhc3NlZCB0cmFuc2xhdGUgaWYgZ2xpZGUgaXMgaW4gUlRMIG9wdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeSAodHJhbnNsYXRlKSB7XG4gICAgICBpZiAoQ29tcG9uZW50cy5EaXJlY3Rpb24uaXMoJ3J0bCcpKSB7XG4gICAgICAgIHJldHVybiAtdHJhbnNsYXRlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGVcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIGEgYGdhcGAgc2V0dGluZ3MuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE1vZGlmaWVzIHBhc3NlZCB0cmFuc2xhdGUgdmFsdWUgd2l0aCBudW1iZXIgaW4gdGhlIGBnYXBgIHNldHRpbmdzLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5ICh0cmFuc2xhdGUpIHtcbiAgICAgIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLmZsb29yKHRyYW5zbGF0ZSAvIENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aClcbiAgICAgIHJldHVybiB0cmFuc2xhdGUgKyAoQ29tcG9uZW50cy5HYXBzLnZhbHVlICogbXVsdGlwbGllcilcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIHdpZHRoIG9mIGFkZGl0aW9uYWwgY2xvbmVzIHdpZHRoLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBBZGRzIHRvIHRoZSBwYXNzZWQgdHJhbnNsYXRlIHdpZHRoIG9mIHRoZSBoYWxmIG9mIGNsb25lcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeSAodHJhbnNsYXRlKSB7XG4gICAgICByZXR1cm4gdHJhbnNsYXRlICsgKENvbXBvbmVudHMuQ2xvbmVzLmdyb3cgLyAyKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi8uLi91dGlscy91bml0J1xuXG4vKipcbiAqIFVwZGF0ZXMgZ2xpZGUgbW92ZW1lbnQgd2l0aCBhIGBwZWVrYCBzZXR0aW5ncy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogTW9kaWZpZXMgcGFzc2VkIHRyYW5zbGF0ZSB2YWx1ZSB3aXRoIGEgYHBlZWtgIHNldHRpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnkgKHRyYW5zbGF0ZSkge1xuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmZvY3VzQXQgPj0gMCkge1xuICAgICAgICBsZXQgcGVlayA9IENvbXBvbmVudHMuUGVlay52YWx1ZVxuXG4gICAgICAgIGlmIChpc09iamVjdChwZWVrKSkge1xuICAgICAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBwZWVrLmJlZm9yZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIHBlZWtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZVxuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggYSBgZm9jdXNBdGAgc2V0dGluZ3MuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE1vZGlmaWVzIHBhc3NlZCB0cmFuc2xhdGUgdmFsdWUgd2l0aCBpbmRleCBpbiB0aGUgYGZvY3VzQXRgIHNldHRpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnkgKHRyYW5zbGF0ZSkge1xuICAgICAgbGV0IGdhcCA9IENvbXBvbmVudHMuR2Fwcy52YWx1ZVxuICAgICAgbGV0IHdpZHRoID0gQ29tcG9uZW50cy5TaXplcy53aWR0aFxuICAgICAgbGV0IGZvY3VzQXQgPSBHbGlkZS5zZXR0aW5ncy5mb2N1c0F0XG4gICAgICBsZXQgc2xpZGVXaWR0aCA9IENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aFxuXG4gICAgICBpZiAoZm9jdXNBdCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtICh3aWR0aCAvIDIgLSBzbGlkZVdpZHRoIC8gMilcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIChzbGlkZVdpZHRoICogZm9jdXNBdCkgLSAoZ2FwICogZm9jdXNBdClcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlscy9sb2cnXG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuaW1wb3J0IFJ0bCBmcm9tICcuL3RyYW5zZm9ybWVycy9ydGwnXG5pbXBvcnQgR2FwIGZyb20gJy4vdHJhbnNmb3JtZXJzL2dhcCdcbmltcG9ydCBHcm93IGZyb20gJy4vdHJhbnNmb3JtZXJzL2dyb3cnXG5pbXBvcnQgUGVla2luZyBmcm9tICcuL3RyYW5zZm9ybWVycy9wZWVraW5nJ1xuaW1wb3J0IEZvY3VzaW5nIGZyb20gJy4vdHJhbnNmb3JtZXJzL2ZvY3VzaW5nJ1xuXG4vKipcbiAqIEFwcGxpZXMgZGlmZnJlbnQgdHJhbnNmb3JtZXJzIG9uIHRyYW5zbGF0ZSB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIE1lcmdlIGluc3RhbmNlIHRyYW5zZm9ybWVycyB3aXRoIGNvbGxlY3Rpb24gb2YgZGVmYXVsdCB0cmFuc2Zvcm1lcnMuXG4gICAqIEl0J3MgaW1wb3J0YW50IHRoYXQgdGhlIFJ0bCBjb21wb25lbnQgYmUgbGFzdCBvbiB0aGUgbGlzdCxcbiAgICogc28gaXQgcmVmbGVjdHMgYWxsIHByZXZpb3VzIHRyYW5zZm9ybWF0aW9ucy5cbiAgICpcbiAgICogQHR5cGUge0FycmF5fVxuICAgKi9cbiAgbGV0IFRSQU5TRk9STUVSUyA9IFtcbiAgICBHYXAsXG4gICAgR3JvdyxcbiAgICBQZWVraW5nLFxuICAgIEZvY3VzaW5nXG4gIF0uY29uY2F0KEdsaWRlLl90LCBbUnRsXSlcblxuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIFBpcGxpbmVzIHRyYW5zbGF0ZSB2YWx1ZSB3aXRoIHJlZ2lzdGVyZWQgdHJhbnNmb3JtZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbXV0YXRlICh0cmFuc2xhdGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVFJBTlNGT1JNRVJTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm1lciA9IFRSQU5TRk9STUVSU1tpXVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRyYW5zZm9ybWVyKSAmJiBpc0Z1bmN0aW9uKHRyYW5zZm9ybWVyKCkubW9kaWZ5KSkge1xuICAgICAgICAgIHRyYW5zbGF0ZSA9IHRyYW5zZm9ybWVyKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpLm1vZGlmeSh0cmFuc2xhdGUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2FybignVHJhbnNmb3JtZXIgc2hvdWxkIGJlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGBtb2RpZnkoKWAgbWV0aG9kJylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgbXV0YXRvciBmcm9tICcuLi9tdXRhdG9yL2luZGV4J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBUcmFuc2xhdGUgPSB7XG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0cmFuc2xhdGUgb24gSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXQgKHZhbHVlKSB7XG4gICAgICBsZXQgdHJhbnNmb3JtID0gbXV0YXRvcihHbGlkZSwgQ29tcG9uZW50cykubXV0YXRlKHZhbHVlKVxuXG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHstMSAqIHRyYW5zZm9ybX1weCwgMHB4LCAwcHgpYFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHZhbHVlIG9mIHRyYW5zbGF0ZSBmcm9tIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlICgpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICcnXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXRTdGFydEluZGV4ICgpIHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IENvbXBvbmVudHMuU2l6ZXMubGVuZ3RoXG4gICAgICBjb25zdCBpbmRleCA9IEdsaWRlLmluZGV4XG4gICAgICBjb25zdCBwZXJWaWV3ID0gR2xpZGUuc2V0dGluZ3MucGVyVmlld1xuXG4gICAgICBpZiAoQ29tcG9uZW50cy5SdW4uaXNPZmZzZXQoJz4nKSB8fCBDb21wb25lbnRzLlJ1bi5pc09mZnNldCgnfD4nKSkge1xuICAgICAgICByZXR1cm4gbGVuZ3RoICsgKGluZGV4IC0gcGVyVmlldylcbiAgICAgIH1cblxuICAgICAgLy8gXCJtb2R1bG8gbGVuZ3RoXCIgY29udmVydHMgYW4gaW5kZXggdGhhdCBlcXVhbHMgbGVuZ3RoIHRvIHplcm9cbiAgICAgIHJldHVybiAoaW5kZXggKyBwZXJWaWV3KSAlIGxlbmd0aFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0VHJhdmVsRGlzdGFuY2UgKCkge1xuICAgICAgY29uc3QgdHJhdmVsRGlzdGFuY2UgPSBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGggKiBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3XG5cbiAgICAgIGlmIChDb21wb25lbnRzLlJ1bi5pc09mZnNldCgnPicpIHx8IENvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCd8PicpKSB7XG4gICAgICAgIC8vIHJldmVyc2UgdHJhdmVsIGRpc3RhbmNlIHNvIHRoYXQgd2UgZG9uJ3QgaGF2ZSB0byBjaGFuZ2Ugc3VidHJhY3Qgb3BlcmF0aW9uc1xuICAgICAgICByZXR1cm4gdHJhdmVsRGlzdGFuY2UgKiAtMVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhdmVsRGlzdGFuY2VcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyB0cmFuc2xhdGUgdmFsdWU6XG4gICAqIC0gb24gbW92ZSB0byByZWZsZWN0IGluZGV4IGNoYW5nZVxuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEkgdG8gcmVmbGVjdCBwb3NzaWJsZSBjaGFuZ2VzIGluIG9wdGlvbnNcbiAgICovXG4gIEV2ZW50cy5vbignbW92ZScsIChjb250ZXh0KSA9PiB7XG4gICAgaWYgKCFHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykgfHwgIUNvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCkpIHtcbiAgICAgIHJldHVybiBUcmFuc2xhdGUuc2V0KGNvbnRleHQubW92ZW1lbnQpXG4gICAgfVxuXG4gICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKCgpID0+IHtcbiAgICAgIEV2ZW50cy5lbWl0KCd0cmFuc2xhdGUuanVtcCcpXG5cbiAgICAgIFRyYW5zbGF0ZS5zZXQoQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICogR2xpZGUuaW5kZXgpXG4gICAgfSlcblxuICAgIGNvbnN0IHN0YXJ0V2lkdGggPSBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGggKiBDb21wb25lbnRzLlRyYW5zbGF0ZS5nZXRTdGFydEluZGV4KClcbiAgICByZXR1cm4gVHJhbnNsYXRlLnNldChzdGFydFdpZHRoIC0gQ29tcG9uZW50cy5UcmFuc2xhdGUuZ2V0VHJhdmVsRGlzdGFuY2UoKSlcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3ZlIHRyYW5zbGF0ZTpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgVHJhbnNsYXRlLnJlbW92ZSgpXG4gIH0pXG5cbiAgcmV0dXJuIFRyYW5zbGF0ZVxufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSG9sZHMgaW5hY3Rpdml0eSBzdGF0dXMgb2YgdHJhbnNpdGlvbi5cbiAgICogV2hlbiB0cnVlIHRyYW5zaXRpb24gaXMgbm90IGFwcGxpZWQuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgbGV0IGRpc2FibGVkID0gZmFsc2VcblxuICBjb25zdCBUcmFuc2l0aW9uID0ge1xuICAgIC8qKlxuICAgICAqIENvbXBvc2VzIHN0cmluZyBvZiB0aGUgQ1NTIHRyYW5zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgY29tcG9zZSAocHJvcGVydHkpIHtcbiAgICAgIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgIGlmICghZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIGAke3Byb3BlcnR5fSAke3RoaXMuZHVyYXRpb259bXMgJHtzZXR0aW5ncy5hbmltYXRpb25UaW1pbmdGdW5jfWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGAke3Byb3BlcnR5fSAwbXMgJHtzZXR0aW5ncy5hbmltYXRpb25UaW1pbmdGdW5jfWBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0cmFuc2l0aW9uIG9uIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nPX0gcHJvcGVydHlcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldCAocHJvcGVydHkgPSAndHJhbnNmb3JtJykge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUudHJhbnNpdGlvbiA9IHRoaXMuY29tcG9zZShwcm9wZXJ0eSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB2YWx1ZSBvZiB0cmFuc2l0aW9uIGZyb20gSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmUgKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUudHJhbnNpdGlvbiA9ICcnXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJ1bnMgY2FsbGJhY2sgYWZ0ZXIgYW5pbWF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZnRlciAoY2FsbGJhY2spIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9LCB0aGlzLmR1cmF0aW9uKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZW5hYmxlICgpIHtcbiAgICAgIGRpc2FibGVkID0gZmFsc2VcblxuICAgICAgdGhpcy5zZXQoKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlIHRyYW5zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGRpc2FibGUgKCkge1xuICAgICAgZGlzYWJsZWQgPSB0cnVlXG5cbiAgICAgIHRoaXMuc2V0KClcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoVHJhbnNpdGlvbiwgJ2R1cmF0aW9uJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgZHVyYXRpb24gb2YgdGhlIHRyYW5zaXRpb24gYmFzZWRcbiAgICAgKiBvbiBjdXJyZW50bHkgcnVubmluZyBhbmltYXRpb24gdHlwZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgaWYgKEdsaWRlLmlzVHlwZSgnc2xpZGVyJykgJiYgQ29tcG9uZW50cy5SdW4ub2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBzZXR0aW5ncy5yZXdpbmREdXJhdGlvblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0dGluZ3MuYW5pbWF0aW9uRHVyYXRpb25cbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIFNldCB0cmFuc2l0aW9uIGBzdHlsZWAgdmFsdWU6XG4gICAqIC0gb24gZWFjaCBtb3ZpbmcsIGJlY2F1c2UgaXQgbWF5IGJlIGNsZWFyZWQgYnkgb2Zmc2V0IG1vdmVcbiAgICovXG4gIEV2ZW50cy5vbignbW92ZScsICgpID0+IHtcbiAgICBUcmFuc2l0aW9uLnNldCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIERpc2FibGUgdHJhbnNpdGlvbjpcbiAgICogLSBiZWZvcmUgaW5pdGlhbCBidWlsZCB0byBhdm9pZCB0cmFuc2l0aW9uaW5nIGZyb20gYDBgIHRvIGBzdGFydEF0YCBpbmRleFxuICAgKiAtIHdoaWxlIHJlc2l6aW5nIHdpbmRvdyBhbmQgcmVjYWxjdWxhdGluZyBkaW1lbnRpb25zXG4gICAqIC0gb24ganVtcGluZyBmcm9tIG9mZnNldCB0cmFuc2l0aW9uIGF0IHN0YXJ0IGFuZCBlbmQgZWRnZXMgaW4gYGNhcm91c2VsYCB0eXBlXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAncmVzaXplJywgJ3RyYW5zbGF0ZS5qdW1wJ10sICgpID0+IHtcbiAgICBUcmFuc2l0aW9uLmRpc2FibGUoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBFbmFibGUgdHJhbnNpdGlvbjpcbiAgICogLSBvbiBlYWNoIHJ1bm5pbmcsIGJlY2F1c2UgaXQgbWF5IGJlIGRpc2FibGVkIGJ5IG9mZnNldCBtb3ZlXG4gICAqL1xuICBFdmVudHMub24oJ3J1bicsICgpID0+IHtcbiAgICBUcmFuc2l0aW9uLmVuYWJsZSgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0cmFuc2l0aW9uOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBUcmFuc2l0aW9uLnJlbW92ZSgpXG4gIH0pXG5cbiAgcmV0dXJuIFRyYW5zaXRpb25cbn1cbiIsIi8qKlxuICogVGVzdCB2aWEgYSBnZXR0ZXIgaW4gdGhlIG9wdGlvbnMgb2JqZWN0IHRvIHNlZVxuICogaWYgdGhlIHBhc3NpdmUgcHJvcGVydHkgaXMgYWNjZXNzZWQuXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vV0lDRy9FdmVudExpc3RlbmVyT3B0aW9ucy9ibG9iL2doLXBhZ2VzL2V4cGxhaW5lci5tZCNmZWF0dXJlLWRldGVjdGlvblxuICovXG5cbmxldCBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZVxuXG50cnkge1xuICBsZXQgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgZ2V0ICgpIHtcbiAgICAgIHN1cHBvcnRzUGFzc2l2ZSA9IHRydWVcbiAgICB9XG4gIH0pXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlJywgbnVsbCwgb3B0cylcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlJywgbnVsbCwgb3B0cylcbn0gY2F0Y2ggKGUpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnRzUGFzc2l2ZVxuIiwiaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICcuLi91dGlscy93YWl0J1xuaW1wb3J0IHsgdG9JbnQsIHRvRmxvYXQgfSBmcm9tICcuLi91dGlscy91bml0J1xuaW1wb3J0IHN1cHBvcnRzUGFzc2l2ZSBmcm9tICcuLi91dGlscy9kZXRlY3QtcGFzc2l2ZS1ldmVudCdcblxuaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmNvbnN0IFNUQVJUX0VWRU5UUyA9IFsndG91Y2hzdGFydCcsICdtb3VzZWRvd24nXVxuY29uc3QgTU9WRV9FVkVOVFMgPSBbJ3RvdWNobW92ZScsICdtb3VzZW1vdmUnXVxuY29uc3QgRU5EX0VWRU5UUyA9IFsndG91Y2hlbmQnLCAndG91Y2hjYW5jZWwnLCAnbW91c2V1cCcsICdtb3VzZWxlYXZlJ11cbmNvbnN0IE1PVVNFX0VWRU5UUyA9IFsnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZXVwJywgJ21vdXNlbGVhdmUnXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIGxldCBzd2lwZVNpbiA9IDBcbiAgbGV0IHN3aXBlU3RhcnRYID0gMFxuICBsZXQgc3dpcGVTdGFydFkgPSAwXG4gIGxldCBkaXNhYmxlZCA9IGZhbHNlXG4gIGxldCBjYXB0dXJlID0gKHN1cHBvcnRzUGFzc2l2ZSkgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlXG5cbiAgY29uc3QgU3dpcGUgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgc3dpcGUgYmluZGluZ3MuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuYmluZFN3aXBlU3RhcnQoKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBgc3dpcGVzdGFydGAgZXZlbnQuIENhbGN1bGF0ZXMgZW50cnkgcG9pbnRzIG9mIHRoZSB1c2VyJ3MgdGFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzdGFydCAoZXZlbnQpIHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZSgpXG5cbiAgICAgICAgbGV0IHN3aXBlID0gdGhpcy50b3VjaGVzKGV2ZW50KVxuXG4gICAgICAgIHN3aXBlU2luID0gbnVsbFxuICAgICAgICBzd2lwZVN0YXJ0WCA9IHRvSW50KHN3aXBlLnBhZ2VYKVxuICAgICAgICBzd2lwZVN0YXJ0WSA9IHRvSW50KHN3aXBlLnBhZ2VZKVxuXG4gICAgICAgIHRoaXMuYmluZFN3aXBlTW92ZSgpXG4gICAgICAgIHRoaXMuYmluZFN3aXBlRW5kKClcblxuICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUuc3RhcnQnKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBgc3dpcGVtb3ZlYCBldmVudC4gQ2FsY3VsYXRlcyB1c2VyJ3MgdGFwIGFuZ2xlIGFuZCBkaXN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG1vdmUgKGV2ZW50KSB7XG4gICAgICBpZiAoIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIGxldCB7IHRvdWNoQW5nbGUsIHRvdWNoUmF0aW8sIGNsYXNzZXMgfSA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgICAgbGV0IHN3aXBlID0gdGhpcy50b3VjaGVzKGV2ZW50KVxuXG4gICAgICAgIGxldCBzdWJFeFN4ID0gdG9JbnQoc3dpcGUucGFnZVgpIC0gc3dpcGVTdGFydFhcbiAgICAgICAgbGV0IHN1YkV5U3kgPSB0b0ludChzd2lwZS5wYWdlWSkgLSBzd2lwZVN0YXJ0WVxuICAgICAgICBsZXQgcG93RVggPSBNYXRoLmFicyhzdWJFeFN4IDw8IDIpXG4gICAgICAgIGxldCBwb3dFWSA9IE1hdGguYWJzKHN1YkV5U3kgPDwgMilcbiAgICAgICAgbGV0IHN3aXBlSHlwb3RlbnVzZSA9IE1hdGguc3FydChwb3dFWCArIHBvd0VZKVxuICAgICAgICBsZXQgc3dpcGVDYXRoZXR1cyA9IE1hdGguc3FydChwb3dFWSlcblxuICAgICAgICBzd2lwZVNpbiA9IE1hdGguYXNpbihzd2lwZUNhdGhldHVzIC8gc3dpcGVIeXBvdGVudXNlKVxuXG4gICAgICAgIGlmIChzd2lwZVNpbiAqIDE4MCAvIE1hdGguUEkgPCB0b3VjaEFuZ2xlKSB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIENvbXBvbmVudHMuTW92ZS5tYWtlKHN1YkV4U3ggKiB0b0Zsb2F0KHRvdWNoUmF0aW8pKVxuXG4gICAgICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LmFkZChjbGFzc2VzLmRyYWdnaW5nKVxuXG4gICAgICAgICAgRXZlbnRzLmVtaXQoJ3N3aXBlLm1vdmUnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGBzd2lwZWVuZGAgZXZlbnQuIEZpbml0aWFsaXplcyB1c2VyJ3MgdGFwIGFuZCBkZWNpZGVzIGFib3V0IGdsaWRlIG1vdmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGVuZCAoZXZlbnQpIHtcbiAgICAgIGlmICghR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgICBsZXQgc3dpcGUgPSB0aGlzLnRvdWNoZXMoZXZlbnQpXG4gICAgICAgIGxldCB0aHJlc2hvbGQgPSB0aGlzLnRocmVzaG9sZChldmVudClcblxuICAgICAgICBsZXQgc3dpcGVEaXN0YW5jZSA9IHN3aXBlLnBhZ2VYIC0gc3dpcGVTdGFydFhcbiAgICAgICAgbGV0IHN3aXBlRGVnID0gc3dpcGVTaW4gKiAxODAgLyBNYXRoLlBJXG4gICAgICAgIGxldCBzdGVwcyA9IE1hdGgucm91bmQoc3dpcGVEaXN0YW5jZSAvIENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aClcblxuICAgICAgICB0aGlzLmVuYWJsZSgpXG5cbiAgICAgICAgaWYgKHN3aXBlRGlzdGFuY2UgPiB0aHJlc2hvbGQgJiYgc3dpcGVEZWcgPCBzZXR0aW5ncy50b3VjaEFuZ2xlKSB7XG4gICAgICAgICAgLy8gV2hpbGUgc3dpcGUgaXMgcG9zaXRpdmUgYW5kIGdyZWF0ZXIgdGhhbiB0aHJlc2hvbGQgbW92ZSBiYWNrd2FyZC5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MucGVyVG91Y2gpIHtcbiAgICAgICAgICAgIHN0ZXBzID0gTWF0aC5taW4oc3RlcHMsIHRvSW50KHNldHRpbmdzLnBlclRvdWNoKSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoQ29tcG9uZW50cy5EaXJlY3Rpb24uaXMoJ3J0bCcpKSB7XG4gICAgICAgICAgICBzdGVwcyA9IC1zdGVwc1xuICAgICAgICAgIH1cblxuICAgICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZShgPCR7c3RlcHN9YCkpXG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgc3dpcGVEaXN0YW5jZSA8IC10aHJlc2hvbGQgJiZcbiAgICAgICAgICBzd2lwZURlZyA8IHNldHRpbmdzLnRvdWNoQW5nbGVcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gV2hpbGUgc3dpcGUgaXMgbmVnYXRpdmUgYW5kIGxvd2VyIHRoYW4gbmVnYXRpdmUgdGhyZXNob2xkIG1vdmUgZm9yd2FyZC5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MucGVyVG91Y2gpIHtcbiAgICAgICAgICAgIHN0ZXBzID0gTWF0aC5tYXgoc3RlcHMsIC10b0ludChzZXR0aW5ncy5wZXJUb3VjaCkpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICAgICAgc3RlcHMgPSAtc3RlcHNcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKENvbXBvbmVudHMuRGlyZWN0aW9uLnJlc29sdmUoYD4ke3N0ZXBzfWApKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFdoaWxlIHN3aXBlIGRvbid0IHJlYWNoIGRpc3RhbmNlIGFwcGx5IHByZXZpb3VzIHRyYW5zZm9ybS5cbiAgICAgICAgICBDb21wb25lbnRzLk1vdmUubWFrZSgpXG4gICAgICAgIH1cblxuICAgICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QucmVtb3ZlKHNldHRpbmdzLmNsYXNzZXMuZHJhZ2dpbmcpXG5cbiAgICAgICAgdGhpcy51bmJpbmRTd2lwZU1vdmUoKVxuICAgICAgICB0aGlzLnVuYmluZFN3aXBlRW5kKClcblxuICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUuZW5kJylcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBzdGFydGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZFN3aXBlU3RhcnQgKCkge1xuICAgICAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgaWYgKHNldHRpbmdzLnN3aXBlVGhyZXNob2xkKSB7XG4gICAgICAgIEJpbmRlci5vbihTVEFSVF9FVkVOVFNbMF0sIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXJ0KGV2ZW50KVxuICAgICAgICB9LCBjYXB0dXJlKVxuICAgICAgfVxuXG4gICAgICBpZiAoc2V0dGluZ3MuZHJhZ1RocmVzaG9sZCkge1xuICAgICAgICBCaW5kZXIub24oU1RBUlRfRVZFTlRTWzFdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGFydChldmVudClcbiAgICAgICAgfSwgY2FwdHVyZSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIHN0YXJ0aW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmRTd2lwZVN0YXJ0ICgpIHtcbiAgICAgIEJpbmRlci5vZmYoU1RBUlRfRVZFTlRTWzBdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgY2FwdHVyZSlcbiAgICAgIEJpbmRlci5vZmYoU1RBUlRfRVZFTlRTWzFdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgY2FwdHVyZSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBtb3ZpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmRTd2lwZU1vdmUgKCkge1xuICAgICAgQmluZGVyLm9uKE1PVkVfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgdGhyb3R0bGUoKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMubW92ZShldmVudClcbiAgICAgIH0sIEdsaWRlLnNldHRpbmdzLnRocm90dGxlKSwgY2FwdHVyZSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIG1vdmluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kU3dpcGVNb3ZlICgpIHtcbiAgICAgIEJpbmRlci5vZmYoTU9WRV9FVkVOVFMsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCBjYXB0dXJlKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBzd2lwZSdzIGVuZGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZFN3aXBlRW5kICgpIHtcbiAgICAgIEJpbmRlci5vbihFTkRfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuZW5kKGV2ZW50KVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIGVuZGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kU3dpcGVFbmQgKCkge1xuICAgICAgQmluZGVyLm9mZihFTkRfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlcilcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTm9ybWFsaXplcyBldmVudCB0b3VjaGVzIHBvaW50cyBhY2NvcnRpbmcgdG8gZGlmZmVyZW50IHR5cGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgdG91Y2hlcyAoZXZlbnQpIHtcbiAgICAgIGlmIChNT1VTRV9FVkVOVFMuaW5kZXhPZihldmVudC50eXBlKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBldmVudFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIG1pbmltdW0gc3dpcGUgZGlzdGFuY2Ugc2V0dGluZ3MgYmFzZWQgb24gZXZlbnQgdHlwZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICB0aHJlc2hvbGQgKGV2ZW50KSB7XG4gICAgICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICBpZiAoTU9VU0VfRVZFTlRTLmluZGV4T2YoZXZlbnQudHlwZSkgPiAtMSkge1xuICAgICAgICByZXR1cm4gc2V0dGluZ3MuZHJhZ1RocmVzaG9sZFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGRcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBzd2lwZSBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3NlbGZ9XG4gICAgICovXG4gICAgZW5hYmxlICgpIHtcbiAgICAgIGRpc2FibGVkID0gZmFsc2VcblxuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmVuYWJsZSgpXG5cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHN3aXBlIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBkaXNhYmxlICgpIHtcbiAgICAgIGRpc2FibGVkID0gdHJ1ZVxuXG4gICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uZGlzYWJsZSgpXG5cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjb21wb25lbnQgY2xhc3M6XG4gICAqIC0gYWZ0ZXIgaW5pdGlhbCBidWlsZGluZ1xuICAgKi9cbiAgRXZlbnRzLm9uKCdidWlsZC5hZnRlcicsICgpID0+IHtcbiAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuc3dpcGVhYmxlKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgc3dpcGluZyBiaW5kaW5nczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byByZW1vdmUgYWRkZWQgRXZlbnRMaXN0ZW5lcnNcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBTd2lwZS51bmJpbmRTd2lwZVN0YXJ0KClcbiAgICBTd2lwZS51bmJpbmRTd2lwZU1vdmUoKVxuICAgIFN3aXBlLnVuYmluZFN3aXBlRW5kKClcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIFN3aXBlXG59XG4iLCJpbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICBjb25zdCBJbWFnZXMgPSB7XG4gICAgLyoqXG4gICAgICogQmluZHMgbGlzdGVuZXIgdG8gZ2xpZGUgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5iaW5kKClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgYGRyYWdzdGFydGAgZXZlbnQgb24gd3JhcHBlciB0byBwcmV2ZW50IGRyYWdnaW5nIGltYWdlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZCAoKSB7XG4gICAgICBCaW5kZXIub24oJ2RyYWdzdGFydCcsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCB0aGlzLmRyYWdzdGFydClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBgZHJhZ3N0YXJ0YCBldmVudCBvbiB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQgKCkge1xuICAgICAgQmluZGVyLm9mZignZHJhZ3N0YXJ0JywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIuIFByZXZlbnRzIGRyYWdnaW5nLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBkcmFnc3RhcnQgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBiaW5kaW5ncyBmcm9tIGltYWdlczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byByZW1vdmUgYWRkZWQgRXZlbnRMaXN0ZW5lcnNcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBJbWFnZXMudW5iaW5kKClcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIEltYWdlc1xufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuXG5pbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICAvKipcbiAgICogSG9sZHMgZGV0YWNoaW5nIHN0YXR1cyBvZiBhbmNob3JzLlxuICAgKiBQcmV2ZW50cyBkZXRhY2hpbmcgb2YgYWxyZWFkeSBkZXRhY2hlZCBhbmNob3JzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGxldCBkZXRhY2hlZCA9IGZhbHNlXG5cbiAgLyoqXG4gICAqIEhvbGRzIHByZXZlbnRpbmcgc3RhdHVzIG9mIGFuY2hvcnMuXG4gICAqIElmIGB0cnVlYCByZWRpcmVjdGlvbiBhZnRlciBjbGljayB3aWxsIGJlIGRpc2FibGVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGxldCBwcmV2ZW50ZWQgPSBmYWxzZVxuXG4gIGNvbnN0IEFuY2hvcnMgPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXBzIGEgaW5pdGlhbCBzdGF0ZSBvZiBhbmNob3JzIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIC8qKlxuICAgICAgICogSG9sZHMgY29sbGVjdGlvbiBvZiBhbmNob3JzIGVsZW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwcml2YXRlXG4gICAgICAgKiBAdHlwZSB7SFRNTENvbGxlY3Rpb259XG4gICAgICAgKi9cbiAgICAgIHRoaXMuX2EgPSBDb21wb25lbnRzLkh0bWwud3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCdhJylcblxuICAgICAgdGhpcy5iaW5kKClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgZXZlbnRzIHRvIGFuY2hvcnMgaW5zaWRlIGEgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQgKCkge1xuICAgICAgQmluZGVyLm9uKCdjbGljaycsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCB0aGlzLmNsaWNrKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIGV2ZW50cyBhdHRhY2hlZCB0byBhbmNob3JzIGluc2lkZSBhIHRyYWNrLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQgKCkge1xuICAgICAgQmluZGVyLm9mZignY2xpY2snLCBDb21wb25lbnRzLkh0bWwud3JhcHBlcilcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQuIFByZXZlbnRzIGNsaWNrcyB3aGVuIGdsaWRlIGlzIGluIGBwcmV2ZW50YCBzdGF0dXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBjbGljayAoZXZlbnQpIHtcbiAgICAgIGlmIChwcmV2ZW50ZWQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBhbmNob3JzIGNsaWNrIGV2ZW50IGluc2lkZSBnbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3NlbGZ9XG4gICAgICovXG4gICAgZGV0YWNoICgpIHtcbiAgICAgIHByZXZlbnRlZCA9IHRydWVcblxuICAgICAgaWYgKCFkZXRhY2hlZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLml0ZW1zW2ldLmRyYWdnYWJsZSA9IGZhbHNlXG5cbiAgICAgICAgICB0aGlzLml0ZW1zW2ldLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICdkYXRhLWhyZWYnLFxuICAgICAgICAgICAgdGhpcy5pdGVtc1tpXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuICAgICAgICAgIClcblxuICAgICAgICAgIHRoaXMuaXRlbXNbaV0ucmVtb3ZlQXR0cmlidXRlKCdocmVmJylcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGFjaGVkID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyBhbmNob3JzIGNsaWNrIGV2ZW50cyBpbnNpZGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzZWxmfVxuICAgICAqL1xuICAgIGF0dGFjaCAoKSB7XG4gICAgICBwcmV2ZW50ZWQgPSBmYWxzZVxuXG4gICAgICBpZiAoZGV0YWNoZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5kcmFnZ2FibGUgPSB0cnVlXG5cbiAgICAgICAgICB0aGlzLml0ZW1zW2ldLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICdocmVmJyxcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWhyZWYnKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGFjaGVkID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoQW5jaG9ycywgJ2l0ZW1zJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgY29sbGVjdGlvbiBvZiB0aGUgYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gQW5jaG9ycy5fYVxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogRGV0YWNoIGFuY2hvcnMgaW5zaWRlIHNsaWRlczpcbiAgICogLSBvbiBzd2lwaW5nLCBzbyB0aGV5IHdvbid0IHJlZGlyZWN0IHRvIGl0cyBgaHJlZmAgYXR0cmlidXRlc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdzd2lwZS5tb3ZlJywgKCkgPT4ge1xuICAgIEFuY2hvcnMuZGV0YWNoKClcbiAgfSlcblxuICAvKipcbiAgICogQXR0YWNoIGFuY2hvcnMgaW5zaWRlIHNsaWRlczpcbiAgICogLSBhZnRlciBzd2lwaW5nIGFuZCB0cmFuc2l0aW9ucyBlbmRzLCBzbyB0aGV5IGNhbiByZWRpcmVjdCBhZnRlciBjbGljayBhZ2FpblxuICAgKi9cbiAgRXZlbnRzLm9uKCdzd2lwZS5lbmQnLCAoKSA9PiB7XG4gICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKCgpID0+IHtcbiAgICAgIEFuY2hvcnMuYXR0YWNoKClcbiAgICB9KVxuICB9KVxuXG4gIC8qKlxuICAgKiBVbmJpbmQgYW5jaG9ycyBpbnNpZGUgc2xpZGVzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGJyaW5nIGFuY2hvcnMgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBBbmNob3JzLmF0dGFjaCgpXG4gICAgQW5jaG9ycy51bmJpbmQoKVxuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gQW5jaG9yc1xufVxuIiwiaW1wb3J0IHsgc2libGluZ3MgfSBmcm9tICcuLi91dGlscy9kb20nXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgc3VwcG9ydHNQYXNzaXZlIGZyb20gJy4uL3V0aWxzL2RldGVjdC1wYXNzaXZlLWV2ZW50J1xuXG5pbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuY29uc3QgTkFWX1NFTEVDVE9SID0gJ1tkYXRhLWdsaWRlLWVsPVwiY29udHJvbHNbbmF2XVwiXSdcbmNvbnN0IENPTlRST0xTX1NFTEVDVE9SID0gJ1tkYXRhLWdsaWRlLWVsXj1cImNvbnRyb2xzXCJdJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIGxldCBjYXB0dXJlID0gKHN1cHBvcnRzUGFzc2l2ZSkgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlXG5cbiAgY29uc3QgQ29udHJvbHMgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdHMgYXJyb3dzLiBCaW5kcyBldmVudHMgbGlzdGVuZXJzXG4gICAgICogdG8gdGhlIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICAvKipcbiAgICAgICAqIENvbGxlY3Rpb24gb2YgbmF2aWdhdGlvbiBIVE1MIGVsZW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwcml2YXRlXG4gICAgICAgKiBAdHlwZSB7SFRNTENvbGxlY3Rpb259XG4gICAgICAgKi9cbiAgICAgIHRoaXMuX24gPSBDb21wb25lbnRzLkh0bWwucm9vdC5xdWVyeVNlbGVjdG9yQWxsKE5BVl9TRUxFQ1RPUilcblxuICAgICAgLyoqXG4gICAgICAgKiBDb2xsZWN0aW9uIG9mIGNvbnRyb2xzIEhUTUwgZWxlbWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHtIVE1MQ29sbGVjdGlvbn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5fYyA9IENvbXBvbmVudHMuSHRtbC5yb290LnF1ZXJ5U2VsZWN0b3JBbGwoQ09OVFJPTFNfU0VMRUNUT1IpXG5cbiAgICAgIHRoaXMuYWRkQmluZGluZ3MoKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXRBY3RpdmUgKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3ModGhpcy5fbltpXS5jaGlsZHJlbilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQWN0aXZlICgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKHRoaXMuX25baV0uY2hpbGRyZW4pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgYWN0aXZlIGNsYXNzIG9uIGl0ZW1zIGluc2lkZSBuYXZpZ2F0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGNvbnRyb2xzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZGRDbGFzcyAoY29udHJvbHMpIHtcbiAgICAgIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG4gICAgICBsZXQgaXRlbSA9IGNvbnRyb2xzW0dsaWRlLmluZGV4XVxuXG4gICAgICBpZiAoaXRlbSkge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoc2V0dGluZ3MuY2xhc3Nlcy5hY3RpdmVOYXYpXG5cbiAgICAgICAgc2libGluZ3MoaXRlbSkuZm9yRWFjaChzaWJsaW5nID0+IHtcbiAgICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoc2V0dGluZ3MuY2xhc3Nlcy5hY3RpdmVOYXYpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWN0aXZlIGNsYXNzIGZyb20gYWN0aXZlIGNvbnRyb2wuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gY29udHJvbHNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzIChjb250cm9scykge1xuICAgICAgbGV0IGl0ZW0gPSBjb250cm9sc1tHbGlkZS5pbmRleF1cblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGhhbmRsZXMgdG8gdGhlIGVhY2ggZ3JvdXAgb2YgY29udHJvbHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFkZEJpbmRpbmdzICgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJpbmQodGhpcy5fY1tpXS5jaGlsZHJlbilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBoYW5kbGVzIGZyb20gdGhlIGVhY2ggZ3JvdXAgb2YgY29udHJvbHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUJpbmRpbmdzICgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnVuYmluZCh0aGlzLl9jW2ldLmNoaWxkcmVuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBldmVudHMgdG8gYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBlbGVtZW50c1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZCAoZWxlbWVudHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQmluZGVyLm9uKCdjbGljaycsIGVsZW1lbnRzW2ldLCB0aGlzLmNsaWNrKVxuICAgICAgICBCaW5kZXIub24oJ3RvdWNoc3RhcnQnLCBlbGVtZW50c1tpXSwgdGhpcy5jbGljaywgY2FwdHVyZSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBldmVudHMgYmluZGVkIHRvIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IGVsZW1lbnRzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQgKGVsZW1lbnRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIEJpbmRlci5vZmYoWydjbGljaycsICd0b3VjaHN0YXJ0J10sIGVsZW1lbnRzW2ldKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGBjbGlja2AgZXZlbnQgb24gdGhlIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgICAqIE1vdmVzIHNsaWRlciBpbiBkcmllY3Rpb24gcHJlY2lzZWQgaW5cbiAgICAgKiBgZGF0YS1nbGlkZS1kaXJgIGF0dHJpYnV0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgY2xpY2sgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZShldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1nbGlkZS1kaXInKSkpXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKENvbnRyb2xzLCAnaXRlbXMnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBjb2xsZWN0aW9uIG9mIHRoZSBjb250cm9scyBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIENvbnRyb2xzLl9jXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBTd2FwIGFjdGl2ZSBjbGFzcyBvZiBjdXJyZW50IG5hdmlnYXRpb24gaXRlbTpcbiAgICogLSBhZnRlciBtb3VudGluZyB0byBzZXQgaXQgdG8gaW5pdGlhbCBpbmRleFxuICAgKiAtIGFmdGVyIGVhY2ggbW92ZSB0byB0aGUgbmV3IGluZGV4XG4gICAqL1xuICBFdmVudHMub24oWydtb3VudC5hZnRlcicsICdtb3ZlLmFmdGVyJ10sICgpID0+IHtcbiAgICBDb250cm9scy5zZXRBY3RpdmUoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgYW5kIEhUTUwgQ2xhc3NlczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBDb250cm9scy5yZW1vdmVCaW5kaW5ncygpXG4gICAgQ29udHJvbHMucmVtb3ZlQWN0aXZlKClcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIENvbnRyb2xzXG59XG4iLCJpbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICBjb25zdCBLZXlib2FyZCA9IHtcbiAgICAvKipcbiAgICAgKiBCaW5kcyBrZXlib2FyZCBldmVudHMgb24gY29tcG9uZW50IG1vdW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3Mua2V5Ym9hcmQpIHtcbiAgICAgICAgdGhpcy5iaW5kKClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBrZXlib2FyZCBwcmVzcyBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQgKCkge1xuICAgICAgQmluZGVyLm9uKCdrZXl1cCcsIGRvY3VtZW50LCB0aGlzLnByZXNzKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGtleWJvYXJkIHByZXNzIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kICgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ2tleXVwJywgZG9jdW1lbnQpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMga2V5Ym9hcmQncyBhcnJvd3MgcHJlc3MgYW5kIG1vdmluZyBnbGlkZSBmb3dhcmQgYW5kIGJhY2t3YXJkLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcHJlc3MgKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc+JykpXG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzNykge1xuICAgICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKENvbXBvbmVudHMuRGlyZWN0aW9uLnJlc29sdmUoJzwnKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGZyb20ga2V5Ym9hcmQ6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byByZW1vdmUgYWRkZWQgZXZlbnRzXG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVtb3ZlIGV2ZW50cyBiZWZvcmUgcmVtb3VudGluZ1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIEtleWJvYXJkLnVuYmluZCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW91bnQgY29tcG9uZW50XG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVmbGVjdCBwb3RlbnRpYWwgY2hhbmdlcyBpbiBzZXR0aW5nc1xuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgS2V5Ym9hcmQubW91bnQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGJpbmRlcjpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIHJlbW92ZSBsaXN0ZW5lcnNcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIEtleWJvYXJkXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgeyB0b0ludCwgaXNVbmRlZmluZWQgfSBmcm9tICcuLi91dGlscy91bml0J1xuXG5pbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICBjb25zdCBBdXRvcGxheSA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhdXRvcGxheWluZyBhbmQgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLnN0YXJ0KClcblxuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmhvdmVycGF1c2UpIHtcbiAgICAgICAgdGhpcy5iaW5kKClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIGF1dG9wbGF5aW5nIGluIGNvbmZpZ3VyZWQgaW50ZXJ2YWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW58TnVtYmVyfSBmb3JjZSBSdW4gYXV0b3BsYXlpbmcgd2l0aCBwYXNzZWQgaW50ZXJ2YWwgcmVnYXJkbGVzcyBvZiBgYXV0b3BsYXlgIHNldHRpbmdzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzdGFydCAoKSB7XG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3MuYXV0b3BsYXkpIHtcbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHRoaXMuX2kpKSB7XG4gICAgICAgICAgdGhpcy5faSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpXG5cbiAgICAgICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoJz4nKVxuXG4gICAgICAgICAgICB0aGlzLnN0YXJ0KClcbiAgICAgICAgICB9LCB0aGlzLnRpbWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgYXV0b3J1bm5pbmcgb2YgdGhlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzdG9wICgpIHtcbiAgICAgIHRoaXMuX2kgPSBjbGVhckludGVydmFsKHRoaXMuX2kpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3BzIGF1dG9wbGF5aW5nIHdoaWxlIG1vdXNlIGlzIG92ZXIgZ2xpZGUncyBhcmVhLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kICgpIHtcbiAgICAgIEJpbmRlci5vbignbW91c2VvdmVyJywgQ29tcG9uZW50cy5IdG1sLnJvb3QsICgpID0+IHtcbiAgICAgICAgdGhpcy5zdG9wKClcbiAgICAgIH0pXG5cbiAgICAgIEJpbmRlci5vbignbW91c2VvdXQnLCBDb21wb25lbnRzLkh0bWwucm9vdCwgKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0KClcbiAgICAgIH0pXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZCBtb3VzZW92ZXIgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kICgpIHtcbiAgICAgIEJpbmRlci5vZmYoWydtb3VzZW92ZXInLCAnbW91c2VvdXQnXSwgQ29tcG9uZW50cy5IdG1sLnJvb3QpXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKEF1dG9wbGF5LCAndGltZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRpbWUgcGVyaW9kIHZhbHVlIGZvciB0aGUgYXV0b3BsYXkgaW50ZXJ2YWwuIFByaW9yaXRpemVzXG4gICAgICogdGltZXMgaW4gYGRhdGEtZ2xpZGUtYXV0b3BsYXlgIGF0dHJ1YnV0ZXMgb3ZlciBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgYXV0b3BsYXkgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzW0dsaWRlLmluZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2xpZGUtYXV0b3BsYXknKVxuXG4gICAgICBpZiAoYXV0b3BsYXkpIHtcbiAgICAgICAgcmV0dXJuIHRvSW50KGF1dG9wbGF5KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdG9JbnQoR2xpZGUuc2V0dGluZ3MuYXV0b3BsYXkpXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBTdG9wIGF1dG9wbGF5aW5nIGFuZCB1bmJpbmQgZXZlbnRzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGNsZWFyIGRlZmluZWQgaW50ZXJ2YWxcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJIHRvIHJlc2V0IGludGVydmFsIHRoYXQgbWF5IGNoYW5nZWRcbiAgICovXG4gIEV2ZW50cy5vbihbJ2Rlc3Ryb3knLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBBdXRvcGxheS51bmJpbmQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBTdG9wIGF1dG9wbGF5aW5nOlxuICAgKiAtIGJlZm9yZSBlYWNoIHJ1biwgdG8gcmVzdGFydCBhdXRvcGxheWluZ1xuICAgKiAtIG9uIHBhdXNpbmcgdmlhIEFQSVxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGNsZWFyIGRlZmluZWQgaW50ZXJ2YWxcbiAgICogLSB3aGlsZSBzdGFydGluZyBhIHN3aXBlXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZXNldCBpbnRlcnZhbCB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydydW4uYmVmb3JlJywgJ3BhdXNlJywgJ2Rlc3Ryb3knLCAnc3dpcGUuc3RhcnQnLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBBdXRvcGxheS5zdG9wKClcbiAgfSlcblxuICAvKipcbiAgICogU3RhcnQgYXV0b3BsYXlpbmc6XG4gICAqIC0gYWZ0ZXIgZWFjaCBydW4sIHRvIHJlc3RhcnQgYXV0b3BsYXlpbmdcbiAgICogLSBvbiBwbGF5aW5nIHZpYSBBUElcbiAgICogLSB3aGlsZSBlbmRpbmcgYSBzd2lwZVxuICAgKi9cbiAgRXZlbnRzLm9uKFsncnVuLmFmdGVyJywgJ3BsYXknLCAnc3dpcGUuZW5kJ10sICgpID0+IHtcbiAgICBBdXRvcGxheS5zdGFydCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW91bnQgYXV0b3BsYXlpbmc6XG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZXNldCBpbnRlcnZhbCB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsICgpID0+IHtcbiAgICBBdXRvcGxheS5tb3VudCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYSBiaW5kZXI6XG4gICAqIC0gb24gZGVzdHJveWluZyBnbGlkZSBpbnN0YW5jZSB0byBjbGVhcnVwIGxpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gQXV0b3BsYXlcbn1cbiIsImltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlscy9sb2cnXG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJy4uL3V0aWxzL3dhaXQnXG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5pbXBvcnQgeyBzb3J0S2V5cywgbWVyZ2VPcHRpb25zIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuXG5pbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuLyoqXG4gKiBTb3J0cyBrZXlzIG9mIGJyZWFrcG9pbnQgb2JqZWN0IHNvIHRoZXkgd2lsbCBiZSBvcmRlcmVkIGZyb20gbG93ZXIgdG8gYmlnZ2VyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludHNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIHNvcnRCcmVha3BvaW50cyAocG9pbnRzKSB7XG4gIGlmIChpc09iamVjdChwb2ludHMpKSB7XG4gICAgcmV0dXJuIHNvcnRLZXlzKHBvaW50cylcbiAgfSBlbHNlIHtcbiAgICB3YXJuKGBCcmVha3BvaW50cyBvcHRpb24gbXVzdCBiZSBhbiBvYmplY3RgKVxuICB9XG5cbiAgcmV0dXJuIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgLyoqXG4gICAqIEhvbGRzIHJlZmVyZW5jZSB0byBzZXR0aW5ncy5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG5cbiAgLyoqXG4gICAqIEhvbGRzIHJlZmVyZW5jZSB0byBicmVha3BvaW50cyBvYmplY3QgaW4gc2V0dGluZ3MuIFNvcnRzIGJyZWFrcG9pbnRzXG4gICAqIGZyb20gc21hbGxlciB0byBsYXJnZXIuIEl0IGlzIHJlcXVpcmVkIGluIG9yZGVyIHRvIHByb3BlclxuICAgKiBtYXRjaGluZyBjdXJyZW50bHkgYWN0aXZlIGJyZWFrcG9pbnQgc2V0dGluZ3MuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBsZXQgcG9pbnRzID0gc29ydEJyZWFrcG9pbnRzKHNldHRpbmdzLmJyZWFrcG9pbnRzKVxuXG4gIC8qKlxuICAgKiBDYWNoZSBpbml0aWFsIHNldHRpbmdzIGJlZm9yZSBvdmVyd3JpdHRpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBsZXQgZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKHt9LCBzZXR0aW5ncylcblxuICBjb25zdCBCcmVha3BvaW50cyA9IHtcbiAgICAvKipcbiAgICAgKiBNYXRjaGVzIHNldHRpbmdzIGZvciBjdXJyZWN0bHkgbWF0Y2hpbmcgbWVkaWEgYnJlYWtwb2ludC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludHNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIG1hdGNoIChwb2ludHMpIHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Lm1hdGNoTWVkaWEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGZvciAobGV0IHBvaW50IGluIHBvaW50cykge1xuICAgICAgICAgIGlmIChwb2ludHMuaGFzT3duUHJvcGVydHkocG9pbnQpKSB7XG4gICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoYChtYXgtd2lkdGg6ICR7cG9pbnR9cHgpYCkubWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gcG9pbnRzW3BvaW50XVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVmYXVsdHNcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3ZlcndyaXRlIGluc3RhbmNlIHNldHRpbmdzIHdpdGggY3VycmVudGx5IG1hdGNoaW5nIGJyZWFrcG9pbnQgc2V0dGluZ3MuXG4gICAqIFRoaXMgaGFwcGVucyByaWdodCBhZnRlciBjb21wb25lbnQgaW5pdGlhbGl6YXRpb24uXG4gICAqL1xuICBPYmplY3QuYXNzaWduKHNldHRpbmdzLCBCcmVha3BvaW50cy5tYXRjaChwb2ludHMpKVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZ2xpZGUgd2l0aCBzZXR0aW5ncyBvZiBtYXRjaGVkIGJyZWtwb2ludDpcbiAgICogLSB3aW5kb3cgcmVzaXplIHRvIHVwZGF0ZSBzbGlkZXJcbiAgICovXG4gIEJpbmRlci5vbigncmVzaXplJywgd2luZG93LCB0aHJvdHRsZSgoKSA9PiB7XG4gICAgR2xpZGUuc2V0dGluZ3MgPSBtZXJnZU9wdGlvbnMoc2V0dGluZ3MsIEJyZWFrcG9pbnRzLm1hdGNoKHBvaW50cykpXG4gIH0sIEdsaWRlLnNldHRpbmdzLnRocm90dGxlKSlcblxuICAvKipcbiAgICogUmVzb3J0IGFuZCB1cGRhdGUgZGVmYXVsdCBzZXR0aW5nczpcbiAgICogLSBvbiByZWluaXQgdmlhIEFQSSwgc28gYnJlYWtwb2ludCBtYXRjaGluZyB3aWxsIGJlIHBlcmZvcm1lZCB3aXRoIG9wdGlvbnNcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgKCkgPT4ge1xuICAgIHBvaW50cyA9IHNvcnRCcmVha3BvaW50cyhwb2ludHMpXG5cbiAgICBkZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oe30sIHNldHRpbmdzKVxuICB9KVxuXG4gIC8qKlxuICAgKiBVbmJpbmQgcmVzaXplIGxpc3RlbmVyOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIEJpbmRlci5vZmYoJ3Jlc2l6ZScsIHdpbmRvdylcbiAgfSlcblxuICByZXR1cm4gQnJlYWtwb2ludHNcbn1cbiIsImltcG9ydCBDb3JlIGZyb20gJy4uL3NyYy9pbmRleCdcblxuaW1wb3J0IFJ1biBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9ydW4nXG5pbXBvcnQgR2FwcyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9nYXBzJ1xuaW1wb3J0IEh0bWwgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvaHRtbCdcbmltcG9ydCBQZWVrIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3BlZWsnXG5pbXBvcnQgTW92ZSBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9tb3ZlJ1xuaW1wb3J0IFNpemVzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3NpemVzJ1xuaW1wb3J0IEJ1aWxkIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2J1aWxkJ1xuaW1wb3J0IENsb25lcyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9jbG9uZXMnXG5pbXBvcnQgUmVzaXplIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3Jlc2l6ZSdcbmltcG9ydCBEaXJlY3Rpb24gZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvZGlyZWN0aW9uJ1xuaW1wb3J0IFRyYW5zbGF0ZSBmcm9tICcuLi9zcmMvY29tcG9uZW50cy90cmFuc2xhdGUnXG5pbXBvcnQgVHJhbnNpdGlvbiBmcm9tICcuLi9zcmMvY29tcG9uZW50cy90cmFuc2l0aW9uJ1xuXG5pbXBvcnQgU3dpcGUgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvc3dpcGUnXG5pbXBvcnQgSW1hZ2VzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2ltYWdlcydcbmltcG9ydCBBbmNob3JzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2FuY2hvcnMnXG5pbXBvcnQgQ29udHJvbHMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvY29udHJvbHMnXG5pbXBvcnQgS2V5Ym9hcmQgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMva2V5Ym9hcmQnXG5pbXBvcnQgQXV0b3BsYXkgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvYXV0b3BsYXknXG5pbXBvcnQgQnJlYWtwb2ludHMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvYnJlYWtwb2ludHMnXG5cbmNvbnN0IENPTVBPTkVOVFMgPSB7XG4gIEh0bWwsXG4gIFRyYW5zbGF0ZSxcbiAgVHJhbnNpdGlvbixcbiAgRGlyZWN0aW9uLFxuICBQZWVrLFxuICBTaXplcyxcbiAgR2FwcyxcbiAgTW92ZSxcbiAgQ2xvbmVzLFxuICBSZXNpemUsXG4gIEJ1aWxkLFxuICBSdW5cbn1cblxuZXhwb3J0IHtcbiAgU3dpcGUsXG4gIEltYWdlcyxcbiAgQW5jaG9ycyxcbiAgQ29udHJvbHMsXG4gIEtleWJvYXJkLFxuICBBdXRvcGxheSxcbiAgQnJlYWtwb2ludHNcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2xpZGUgZXh0ZW5kcyBDb3JlIHtcbiAgbW91bnQgKGV4dGVuc2lvbnMgPSB7fSkge1xuICAgIHJldHVybiBzdXBlci5tb3VudChPYmplY3QuYXNzaWduKHt9LCBDT01QT05FTlRTLCBleHRlbnNpb25zKSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbIndhcm4iLCJtc2ciLCJlcnJvciIsInRvSW50IiwidmFsdWUiLCJwYXJzZUludCIsInRvRmxvYXQiLCJwYXJzZUZsb2F0IiwiaXNTdHJpbmciLCJpc09iamVjdCIsInR5cGUiLCJpc051bWJlciIsImlzRnVuY3Rpb24iLCJpc1VuZGVmaW5lZCIsImlzQXJyYXkiLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwibW91bnQiLCJnbGlkZSIsImV4dGVuc2lvbnMiLCJldmVudHMiLCJjb21wb25lbnRzIiwibmFtZSIsImRlZmluZSIsIm9iaiIsInByb3AiLCJkZWZpbml0aW9uIiwiZGVmaW5lUHJvcGVydHkiLCJzb3J0S2V5cyIsIk9iamVjdCIsImtleXMiLCJzb3J0IiwicmVkdWNlIiwiciIsImsiLCJtZXJnZU9wdGlvbnMiLCJkZWZhdWx0cyIsInNldHRpbmdzIiwib3B0aW9ucyIsImJhYmVsSGVscGVycy5leHRlbmRzIiwiaGFzT3duUHJvcGVydHkiLCJjbGFzc2VzIiwiZGlyZWN0aW9uIiwiYnJlYWtwb2ludHMiLCJFdmVudHNCdXMiLCJob3AiLCJldmVudCIsImhhbmRsZXIiLCJpIiwibGVuZ3RoIiwib24iLCJjYWxsIiwiaW5kZXgiLCJwdXNoIiwiY29udGV4dCIsImVtaXQiLCJmb3JFYWNoIiwiaXRlbSIsImNvbnNvbGUiLCJsb2ciLCJHbGlkZSIsInNlbGVjdG9yIiwiX2MiLCJfdCIsIl9lIiwiZGlzYWJsZWQiLCJzdGFydEF0IiwidHJhbnNmb3JtZXJzIiwicGF0dGVybiIsIlJ1biIsIm1ha2UiLCJkaXN0YW5jZSIsIlRyYW5zaXRpb24iLCJkaXNhYmxlIiwiTW92ZSIsImludGVydmFsIiwiYXV0b3BsYXkiLCJfbyIsIm8iLCJfaSIsIl9kIiwic3RhdHVzIiwiQ29tcG9uZW50cyIsIkV2ZW50cyIsIm1vdmUiLCJ3YWl0Rm9yVHJhbnNpdGlvbiIsImNhbGN1bGF0ZSIsImFmdGVyIiwiaXNTdGFydCIsImlzRW5kIiwiaXNPZmZzZXQiLCJlbmFibGUiLCJzdGVwcyIsInZpZXdTaXplIiwiY291bnRhYmxlU3RlcHMiLCJwZXJWaWV3IiwiY2FsY3VsYXRlRm9yd2FyZEluZGV4Iiwibm9ybWFsaXplRm9yd2FyZEluZGV4IiwiY2FsY3VsYXRlQmFja3dhcmRJbmRleCIsIm5vcm1hbGl6ZUJhY2t3YXJkSW5kZXgiLCJ1bmRlZmluZWQiLCJpc1R5cGUiLCJmb2N1c0F0IiwiYm91bmQiLCJyZXdpbmQiLCJpc0JvdW5kIiwiTWF0aCIsImZsb29yIiwidmlldyIsImNlaWwiLCJfbSIsInN0ZXAiLCJzdWJzdHIiLCJIdG1sIiwic2xpZGVzIiwibm93IiwiRGF0ZSIsImdldFRpbWUiLCJ0aHJvdHRsZSIsImZ1bmMiLCJ3YWl0IiwidGltZW91dCIsImFyZ3MiLCJyZXN1bHQiLCJwcmV2aW91cyIsImxhdGVyIiwibGVhZGluZyIsImFwcGx5IiwidGhyb3R0bGVkIiwiYXQiLCJyZW1haW5pbmciLCJhcmd1bWVudHMiLCJ0cmFpbGluZyIsInNldFRpbWVvdXQiLCJjYW5jZWwiLCJNQVJHSU5fVFlQRSIsIkdhcHMiLCJsZW4iLCJzdHlsZSIsIkRpcmVjdGlvbiIsIm1hcmdpbkxlZnQiLCJtYXJnaW5SaWdodCIsImdhcCIsIlNpemVzIiwid3JhcHBlciIsImNoaWxkcmVuIiwicmVtb3ZlIiwic2libGluZ3MiLCJub2RlIiwicGFyZW50Tm9kZSIsIm4iLCJmaXJzdENoaWxkIiwibWF0Y2hlZCIsIm5leHRTaWJsaW5nIiwibm9kZVR5cGUiLCJleGlzdCIsIndpbmRvdyIsIkhUTUxFbGVtZW50IiwiVFJBQ0tfU0VMRUNUT1IiLCJyb290IiwidHJhY2siLCJxdWVyeVNlbGVjdG9yIiwicHJvdG90eXBlIiwic2xpY2UiLCJmaWx0ZXIiLCJzbGlkZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xvbmVTbGlkZSIsIl9yIiwiZG9jdW1lbnQiLCJ0IiwiUGVlayIsInBlZWsiLCJfdiIsImJlZm9yZSIsIm9mZnNldCIsInNsaWRlV2lkdGgiLCJ0cmFuc2xhdGUiLCJpcyIsIndpZHRoIiwid3JhcHBlclNpemUiLCJvZmZzZXRXaWR0aCIsImdyb3ciLCJDbG9uZXMiLCJyZWR1Y3RvciIsInNldHVwU2xpZGVzIiwic2V0dXBXcmFwcGVyIiwiQnVpbGQiLCJ0eXBlQ2xhc3MiLCJhY3RpdmVDbGFzcyIsImFkZCIsImFjdGl2ZVNsaWRlIiwic2libGluZyIsInJlbW92ZUNsYXNzZXMiLCJpdGVtcyIsImNvbGxlY3QiLCJwZWVrSW5jcmVtZW50ZXIiLCJjbG9uZUNvdW50Iiwicm91bmQiLCJhcHBlbmQiLCJyZXZlcnNlIiwicHJlcGVuZCIsIm1heCIsImNsb25lIiwiY2xvbmVOb2RlIiwidW5zaGlmdCIsImhhbGYiLCJhcHBlbmRDaGlsZCIsImluc2VydEJlZm9yZSIsInJlbW92ZUNoaWxkIiwiRXZlbnRzQmluZGVyIiwibGlzdGVuZXJzIiwiZWwiLCJjbG9zdXJlIiwiY2FwdHVyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiQmluZGVyIiwiUmVzaXplIiwiYmluZCIsIm9mZiIsInVuYmluZCIsImRlc3Ryb3kiLCJWQUxJRF9ESVJFQ1RJT05TIiwiRkxJUEVEX01PVkVNRU5UUyIsInRva2VuIiwic3BsaXQiLCJqb2luIiwiaW5kZXhPZiIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJtdWx0aXBsaWVyIiwiVFJBTlNGT1JNRVJTIiwiR2FwIiwiR3JvdyIsIlBlZWtpbmciLCJGb2N1c2luZyIsImNvbmNhdCIsIlJ0bCIsInRyYW5zZm9ybWVyIiwibW9kaWZ5IiwiVHJhbnNsYXRlIiwidHJhbnNmb3JtIiwibXV0YXRvciIsIm11dGF0ZSIsInRyYXZlbERpc3RhbmNlIiwic2V0IiwibW92ZW1lbnQiLCJzdGFydFdpZHRoIiwiZ2V0U3RhcnRJbmRleCIsImdldFRyYXZlbERpc3RhbmNlIiwicHJvcGVydHkiLCJkdXJhdGlvbiIsImFuaW1hdGlvblRpbWluZ0Z1bmMiLCJ0cmFuc2l0aW9uIiwiY29tcG9zZSIsImNhbGxiYWNrIiwicmV3aW5kRHVyYXRpb24iLCJhbmltYXRpb25EdXJhdGlvbiIsInN1cHBvcnRzUGFzc2l2ZSIsIm9wdHMiLCJlIiwiU1RBUlRfRVZFTlRTIiwiTU9WRV9FVkVOVFMiLCJFTkRfRVZFTlRTIiwiTU9VU0VfRVZFTlRTIiwic3dpcGVTaW4iLCJzd2lwZVN0YXJ0WCIsInN3aXBlU3RhcnRZIiwicGFzc2l2ZSIsIlN3aXBlIiwiYmluZFN3aXBlU3RhcnQiLCJzd2lwZSIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiYmluZFN3aXBlTW92ZSIsImJpbmRTd2lwZUVuZCIsInRvdWNoQW5nbGUiLCJ0b3VjaFJhdGlvIiwic3ViRXhTeCIsInN1YkV5U3kiLCJwb3dFWCIsImFicyIsInBvd0VZIiwic3dpcGVIeXBvdGVudXNlIiwic3FydCIsInN3aXBlQ2F0aGV0dXMiLCJhc2luIiwiUEkiLCJzdG9wUHJvcGFnYXRpb24iLCJkcmFnZ2luZyIsInRocmVzaG9sZCIsInN3aXBlRGlzdGFuY2UiLCJzd2lwZURlZyIsInBlclRvdWNoIiwibWluIiwicmVzb2x2ZSIsInVuYmluZFN3aXBlTW92ZSIsInVuYmluZFN3aXBlRW5kIiwic3dpcGVUaHJlc2hvbGQiLCJzdGFydCIsImRyYWdUaHJlc2hvbGQiLCJlbmQiLCJjaGFuZ2VkVG91Y2hlcyIsInN3aXBlYWJsZSIsInVuYmluZFN3aXBlU3RhcnQiLCJJbWFnZXMiLCJkcmFnc3RhcnQiLCJwcmV2ZW50RGVmYXVsdCIsImRldGFjaGVkIiwicHJldmVudGVkIiwiQW5jaG9ycyIsIl9hIiwicXVlcnlTZWxlY3RvckFsbCIsImNsaWNrIiwiZHJhZ2dhYmxlIiwic2V0QXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiZGV0YWNoIiwiYXR0YWNoIiwiTkFWX1NFTEVDVE9SIiwiQ09OVFJPTFNfU0VMRUNUT1IiLCJDb250cm9scyIsIl9uIiwiYWRkQmluZGluZ3MiLCJjb250cm9scyIsImFjdGl2ZU5hdiIsImVsZW1lbnRzIiwiY3VycmVudFRhcmdldCIsInNldEFjdGl2ZSIsInJlbW92ZUJpbmRpbmdzIiwicmVtb3ZlQWN0aXZlIiwiS2V5Ym9hcmQiLCJrZXlib2FyZCIsInByZXNzIiwia2V5Q29kZSIsIkF1dG9wbGF5IiwiaG92ZXJwYXVzZSIsInNldEludGVydmFsIiwic3RvcCIsInRpbWUiLCJjbGVhckludGVydmFsIiwic29ydEJyZWFrcG9pbnRzIiwicG9pbnRzIiwiQnJlYWtwb2ludHMiLCJtYXRjaE1lZGlhIiwicG9pbnQiLCJtYXRjaGVzIiwibWF0Y2giLCJDT01QT05FTlRTIiwiQ29yZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZUFBZTs7Ozs7Ozs7OztRQVVQLFFBVk87Ozs7Ozs7V0FpQkosQ0FqQkk7Ozs7Ozs7V0F3QkosQ0F4Qkk7Ozs7Ozs7Ozs7O1dBbUNKLENBbkNJOzs7Ozs7O09BMENSLEVBMUNROzs7Ozs7O1lBaURILEtBakRHOzs7Ozs7O2NBd0RELElBeERDOzs7Ozs7O1lBK0RILElBL0RHOzs7Ozs7Ozs7O1NBeUVOLEtBekVNOzs7Ozs7O2tCQWdGRyxFQWhGSDs7Ozs7OztpQkF1RkUsR0F2RkY7Ozs7Ozs7WUE4RkgsS0E5Rkc7Ozs7Ozs7Y0FxR0QsR0FyR0M7Ozs7Ozs7Y0E0R0QsRUE1R0M7Ozs7Ozs7cUJBbUhNLEdBbkhOOzs7Ozs7O1VBMEhMLElBMUhLOzs7Ozs7O2tCQWlJRyxHQWpJSDs7Ozs7Ozt1QkF3SVEsbUNBeElSOzs7Ozs7O3FCQStJTSxJQS9JTjs7Ozs7OztZQXNKSCxFQXRKRzs7Ozs7Ozs7Ozs7YUFpS0YsS0FqS0U7Ozs7Ozs7Ozs7Ozs7O1FBK0tQLENBL0tPOzs7Ozs7Ozs7OztlQTBMQSxFQTFMQTs7Ozs7Ozs7V0FrTUo7ZUFDSTtXQUNKLFlBREk7V0FFSjtLQUhBO1lBS0MsZUFMRDtjQU1HLGlCQU5IO2VBT0ksa0JBUEo7Y0FRRyxpQkFSSDtnQkFTSyxxQkFUTDtlQVVJLHVCQVZKO2lCQVdNLHNCQVhOO21CQVlROztDQTlNbkI7O0FDQUE7Ozs7OztBQU1BLEFBQU8sU0FBU0EsSUFBVCxDQUFlQyxHQUFmLEVBQW9CO1VBQ2pCQyxLQUFSLG9CQUErQkQsR0FBL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BGOzs7Ozs7O0FBT0EsQUFBTyxTQUFTRSxLQUFULENBQWdCQyxLQUFoQixFQUF1QjtTQUNyQkMsU0FBU0QsS0FBVCxDQUFQOzs7Ozs7Ozs7O0FBVUYsQUFBTyxTQUFTRSxPQUFULENBQWtCRixLQUFsQixFQUF5QjtTQUN2QkcsV0FBV0gsS0FBWCxDQUFQOzs7Ozs7Ozs7QUFTRixBQUFPLFNBQVNJLFFBQVQsQ0FBbUJKLEtBQW5CLEVBQTBCO1NBQ3hCLE9BQU9BLEtBQVAsS0FBaUIsUUFBeEI7Ozs7Ozs7Ozs7O0FBV0YsQUFBTyxTQUFTSyxRQUFULENBQW1CTCxLQUFuQixFQUEwQjtNQUMzQk0sY0FBY04sS0FBZCx5Q0FBY0EsS0FBZCxDQUFKOztTQUVPTSxTQUFTLFVBQVQsSUFBdUJBLFNBQVMsUUFBVCxJQUFxQixDQUFDLENBQUNOLEtBQXJELENBSCtCOzs7Ozs7Ozs7QUFZakMsQUFBTyxTQUFTTyxRQUFULENBQW1CUCxLQUFuQixFQUEwQjtTQUN4QixPQUFPQSxLQUFQLEtBQWlCLFFBQXhCOzs7Ozs7Ozs7QUFTRixBQUFPLFNBQVNRLFVBQVQsQ0FBcUJSLEtBQXJCLEVBQTRCO1NBQzFCLE9BQU9BLEtBQVAsS0FBaUIsVUFBeEI7Ozs7Ozs7OztBQVNGLEFBQU8sU0FBU1MsV0FBVCxDQUFzQlQsS0FBdEIsRUFBNkI7U0FDM0IsT0FBT0EsS0FBUCxLQUFpQixXQUF4Qjs7Ozs7Ozs7O0FBU0YsQUFBTyxTQUFTVSxPQUFULENBQWtCVixLQUFsQixFQUF5QjtTQUN2QkEsTUFBTVcsV0FBTixLQUFzQkMsS0FBN0I7OztBQ2hGRjs7Ozs7Ozs7O0FBU0EsQUFBTyxTQUFTQyxLQUFULENBQWdCQyxLQUFoQixFQUF1QkMsVUFBdkIsRUFBbUNDLE1BQW5DLEVBQTJDO01BQzVDQyxhQUFhLEVBQWpCOztPQUVLLElBQUlDLElBQVQsSUFBaUJILFVBQWpCLEVBQTZCO1FBQ3ZCUCxXQUFXTyxXQUFXRyxJQUFYLENBQVgsQ0FBSixFQUFrQztpQkFDckJBLElBQVgsSUFBbUJILFdBQVdHLElBQVgsRUFBaUJKLEtBQWpCLEVBQXdCRyxVQUF4QixFQUFvQ0QsTUFBcEMsQ0FBbkI7S0FERixNQUVPO1dBQ0EsOEJBQUw7Ozs7T0FJQyxJQUFJRSxLQUFULElBQWlCRCxVQUFqQixFQUE2QjtRQUN2QlQsV0FBV1MsV0FBV0MsS0FBWCxFQUFpQkwsS0FBNUIsQ0FBSixFQUF3QztpQkFDM0JLLEtBQVgsRUFBaUJMLEtBQWpCOzs7O1NBSUdJLFVBQVA7OztBQzdCRjs7Ozs7Ozs7QUFRQSxBQUFPLFNBQVNFLE1BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCQyxJQUF0QixFQUE0QkMsVUFBNUIsRUFBd0M7U0FDdENDLGNBQVAsQ0FBc0JILEdBQXRCLEVBQTJCQyxJQUEzQixFQUFpQ0MsVUFBakM7Ozs7Ozs7OztBQVNGLEFBQU8sU0FBU0UsUUFBVCxDQUFtQkosR0FBbkIsRUFBd0I7U0FDdEJLLE9BQU9DLElBQVAsQ0FBWU4sR0FBWixFQUFpQk8sSUFBakIsR0FBd0JDLE1BQXhCLENBQStCLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFVO01BQzVDQSxDQUFGLElBQU9WLElBQUlVLENBQUosQ0FBUDs7V0FFUUQsRUFBRUMsQ0FBRixHQUFNRCxDQUFkO0dBSEssRUFJSixFQUpJLENBQVA7Ozs7Ozs7Ozs7QUFjRixBQUFPLFNBQVNFLFlBQVQsQ0FBdUJDLFFBQXZCLEVBQWlDQyxRQUFqQyxFQUEyQztNQUM1Q0MsVUFBVUMsU0FBYyxFQUFkLEVBQWtCSCxRQUFsQixFQUE0QkMsUUFBNUIsQ0FBZDs7Ozs7OztNQU9JQSxTQUFTRyxjQUFULENBQXdCLFNBQXhCLENBQUosRUFBd0M7WUFDOUJDLE9BQVIsR0FBa0JGLFNBQWMsRUFBZCxFQUFrQkgsU0FBU0ssT0FBM0IsRUFBb0NKLFNBQVNJLE9BQTdDLENBQWxCOztRQUVJSixTQUFTSSxPQUFULENBQWlCRCxjQUFqQixDQUFnQyxXQUFoQyxDQUFKLEVBQWtEO2NBQ3hDQyxPQUFSLENBQWdCQyxTQUFoQixHQUE0QkgsU0FBYyxFQUFkLEVBQWtCSCxTQUFTSyxPQUFULENBQWlCQyxTQUFuQyxFQUE4Q0wsU0FBU0ksT0FBVCxDQUFpQkMsU0FBL0QsQ0FBNUI7Ozs7TUFJQUwsU0FBU0csY0FBVCxDQUF3QixhQUF4QixDQUFKLEVBQTRDO1lBQ2xDRyxXQUFSLEdBQXNCSixTQUFjLEVBQWQsRUFBa0JILFNBQVNPLFdBQTNCLEVBQXdDTixTQUFTTSxXQUFqRCxDQUF0Qjs7O1NBR0tMLE9BQVA7OztJQ25EbUJNOzs7Ozs7dUJBTU87UUFBYnhCLE1BQWEsdUVBQUosRUFBSTs7O1NBQ25CQSxNQUFMLEdBQWNBLE1BQWQ7U0FDS3lCLEdBQUwsR0FBV3pCLE9BQU9vQixjQUFsQjs7Ozs7Ozs7Ozs7Ozt1QkFTRU0sT0FBT0MsU0FBUztVQUNkakMsUUFBUWdDLEtBQVIsQ0FBSixFQUFvQjthQUNiLElBQUlFLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsTUFBTUcsTUFBMUIsRUFBa0NELEdBQWxDLEVBQXVDO2VBQ2hDRSxFQUFMLENBQVFKLE1BQU1FLENBQU4sQ0FBUixFQUFrQkQsT0FBbEI7Ozs7O1VBS0EsQ0FBQyxLQUFLRixHQUFMLENBQVNNLElBQVQsQ0FBYyxLQUFLL0IsTUFBbkIsRUFBMkIwQixLQUEzQixDQUFMLEVBQXdDO2FBQ2pDMUIsTUFBTCxDQUFZMEIsS0FBWixJQUFxQixFQUFyQjs7OztVQUlFTSxRQUFRLEtBQUtoQyxNQUFMLENBQVkwQixLQUFaLEVBQW1CTyxJQUFuQixDQUF3Qk4sT0FBeEIsSUFBbUMsQ0FBL0M7OzthQUdPO2NBQUEsb0JBQ0s7aUJBQ0QsS0FBSzNCLE1BQUwsQ0FBWTBCLEtBQVosRUFBbUJNLEtBQW5CLENBQVA7O09BRko7Ozs7Ozs7Ozs7Ozt5QkFhSU4sT0FBT1EsU0FBUztVQUNoQnhDLFFBQVFnQyxLQUFSLENBQUosRUFBb0I7YUFDYixJQUFJRSxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLE1BQU1HLE1BQTFCLEVBQWtDRCxHQUFsQyxFQUF1QztlQUNoQ08sSUFBTCxDQUFVVCxNQUFNRSxDQUFOLENBQVYsRUFBb0JNLE9BQXBCOzs7OztVQUtBLENBQUMsS0FBS1QsR0FBTCxDQUFTTSxJQUFULENBQWMsS0FBSy9CLE1BQW5CLEVBQTJCMEIsS0FBM0IsQ0FBTCxFQUF3Qzs7Ozs7V0FLbkMxQixNQUFMLENBQVkwQixLQUFaLEVBQW1CVSxPQUFuQixDQUEyQixVQUFDQyxJQUFELEVBQVU7YUFDOUJILFdBQVcsRUFBaEI7T0FERjs7Ozs7O0FDdERKSSxRQUFRQyxHQUFSLENBQVksU0FBWjs7SUFDcUJDOzs7Ozs7O2lCQU9QQyxRQUFaLEVBQW9DO1FBQWR2QixPQUFjLHVFQUFKLEVBQUk7OztTQUM3QndCLEVBQUwsR0FBVSxFQUFWO1NBQ0tDLEVBQUwsR0FBVSxFQUFWO1NBQ0tDLEVBQUwsR0FBVSxJQUFJcEIsU0FBSixFQUFWOztTQUVLcUIsUUFBTCxHQUFnQixLQUFoQjtTQUNLSixRQUFMLEdBQWdCQSxRQUFoQjtTQUNLeEIsUUFBTCxHQUFnQkYsYUFBYUMsUUFBYixFQUF1QkUsT0FBdkIsQ0FBaEI7U0FDS2MsS0FBTCxHQUFhLEtBQUtmLFFBQUwsQ0FBYzZCLE9BQTNCOzs7Ozs7Ozs7Ozs7OytCQVNxQjtVQUFqQi9DLFVBQWlCLHVFQUFKLEVBQUk7O1dBQ2hCNkMsRUFBTCxDQUFRVCxJQUFSLENBQWEsY0FBYjs7VUFFSTlDLFNBQVNVLFVBQVQsQ0FBSixFQUEwQjthQUNuQjJDLEVBQUwsR0FBVTdDLE1BQU0sSUFBTixFQUFZRSxVQUFaLEVBQXdCLEtBQUs2QyxFQUE3QixDQUFWO09BREYsTUFFTzthQUNBLDJDQUFMOzs7V0FHR0EsRUFBTCxDQUFRVCxJQUFSLENBQWEsYUFBYjs7YUFFTyxJQUFQOzs7Ozs7Ozs7Ozs7NkJBU3dCO1VBQW5CWSxZQUFtQix1RUFBSixFQUFJOztVQUNwQnJELFFBQVFxRCxZQUFSLENBQUosRUFBMkI7YUFDcEJKLEVBQUwsR0FBVUksWUFBVjtPQURGLE1BRU87YUFDQSwyQ0FBTDs7O2FBR0ssSUFBUDs7Ozs7Ozs7Ozs7OzZCQVNvQjtVQUFmOUIsUUFBZSx1RUFBSixFQUFJOztXQUNmQSxRQUFMLEdBQWdCRixhQUFhLEtBQUtFLFFBQWxCLEVBQTRCQSxRQUE1QixDQUFoQjs7VUFFSUEsU0FBU0csY0FBVCxDQUF3QixTQUF4QixDQUFKLEVBQXdDO2FBQ2pDWSxLQUFMLEdBQWFmLFNBQVM2QixPQUF0Qjs7O1dBR0dGLEVBQUwsQ0FBUVQsSUFBUixDQUFhLFFBQWI7O2FBRU8sSUFBUDs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBY0NhLFNBQVM7V0FDTE4sRUFBTCxDQUFRTyxHQUFSLENBQVlDLElBQVosQ0FBaUJGLE9BQWpCOzthQUVPLElBQVA7Ozs7Ozs7Ozs7Ozt5QkFTR0csVUFBVTtXQUNSVCxFQUFMLENBQVFVLFVBQVIsQ0FBbUJDLE9BQW5CO1dBQ0tYLEVBQUwsQ0FBUVksSUFBUixDQUFhSixJQUFiLENBQWtCQyxRQUFsQjs7YUFFTyxJQUFQOzs7Ozs7Ozs7Ozs4QkFRUTtXQUNIUCxFQUFMLENBQVFULElBQVIsQ0FBYSxTQUFiOzthQUVPLElBQVA7Ozs7Ozs7Ozs7OzsyQkFTcUI7VUFBbEJvQixRQUFrQix1RUFBUCxLQUFPOztVQUNqQkEsUUFBSixFQUFjO2FBQ1B0QyxRQUFMLENBQWN1QyxRQUFkLEdBQXlCRCxRQUF6Qjs7O1dBR0dYLEVBQUwsQ0FBUVQsSUFBUixDQUFhLE1BQWI7O2FBRU8sSUFBUDs7Ozs7Ozs7Ozs7NEJBUU07V0FDRFMsRUFBTCxDQUFRVCxJQUFSLENBQWEsT0FBYjs7YUFFTyxJQUFQOzs7Ozs7Ozs7Ozs4QkFRUTtXQUNIVSxRQUFMLEdBQWdCLElBQWhCOzthQUVPLElBQVA7Ozs7Ozs7Ozs7OzZCQVFPO1dBQ0ZBLFFBQUwsR0FBZ0IsS0FBaEI7O2FBRU8sSUFBUDs7Ozs7Ozs7Ozs7Ozt1QkFVQ25CLE9BQU9DLFNBQVM7V0FDWmlCLEVBQUwsQ0FBUWQsRUFBUixDQUFXSixLQUFYLEVBQWtCQyxPQUFsQjs7YUFFTyxJQUFQOzs7Ozs7Ozs7Ozs7MkJBU0t6QixNQUFNO2FBQ0osS0FBS2UsUUFBTCxDQUFjM0IsSUFBZCxLQUF1QlksSUFBOUI7Ozs7Ozs7Ozs7OzJCQVFhO2FBQ04sS0FBS3VELEVBQVo7Ozs7Ozs7Ozs7eUJBU1dDLEdBQUc7VUFDVnJFLFNBQVNxRSxDQUFULENBQUosRUFBaUI7YUFDVkQsRUFBTCxHQUFVQyxDQUFWO09BREYsTUFFTzthQUNBLHVDQUFMOzs7Ozs7Ozs7Ozs7MkJBU1E7YUFDSCxLQUFLQyxFQUFaOzs7Ozs7Ozs7eUJBUVEvQixHQUFHO1dBQ04rQixFQUFMLEdBQVU1RSxNQUFNNkMsQ0FBTixDQUFWOzs7Ozs7Ozs7OzsyQkFRUzthQUNGLEtBQUtYLFFBQUwsQ0FBYzNCLElBQXJCOzs7Ozs7Ozs7OzsyQkFRYTthQUNOLEtBQUtzRSxFQUFaOzs7Ozs7Ozs7eUJBUVdDLFFBQVE7V0FDZEQsRUFBTCxHQUFVLENBQUMsQ0FBQ0MsTUFBWjs7Ozs7O0FDOVBXLGNBQVVyQixLQUFWLEVBQWlCc0IsVUFBakIsRUFBNkJDLE1BQTdCLEVBQXFDO01BQzVDZCxNQUFNOzs7Ozs7U0FBQSxtQkFNRDtXQUNGUSxFQUFMLEdBQVUsS0FBVjtLQVBROzs7Ozs7OztRQUFBLGdCQWVKTyxJQWZJLEVBZUU7OztVQUNOLENBQUN4QixNQUFNSyxRQUFYLEVBQXFCO1NBQ2xCTCxNQUFNdkIsUUFBTixDQUFlZ0QsaUJBQWhCLElBQXFDekIsTUFBTWEsT0FBTixFQUFyQzs7YUFFS1csSUFBTCxHQUFZQSxJQUFaOztlQUVPN0IsSUFBUCxDQUFZLFlBQVosRUFBMEIsS0FBSzZCLElBQS9COzthQUVLRSxTQUFMOztlQUVPL0IsSUFBUCxDQUFZLEtBQVosRUFBbUIsS0FBSzZCLElBQXhCOzttQkFFV1osVUFBWCxDQUFzQmUsS0FBdEIsQ0FBNEIsWUFBTTtjQUM1QixNQUFLQyxPQUFMLEVBQUosRUFBb0I7bUJBQ1hqQyxJQUFQLENBQVksV0FBWixFQUF5QixNQUFLNkIsSUFBOUI7OztjQUdFLE1BQUtLLEtBQUwsRUFBSixFQUFrQjttQkFDVGxDLElBQVAsQ0FBWSxTQUFaLEVBQXVCLE1BQUs2QixJQUE1Qjs7O2NBR0UsTUFBS00sUUFBTCxFQUFKLEVBQXFCO2tCQUNkYixFQUFMLEdBQVUsS0FBVjs7bUJBRU90QixJQUFQLENBQVksWUFBWixFQUEwQixNQUFLNkIsSUFBL0I7OztpQkFHSzdCLElBQVAsQ0FBWSxXQUFaLEVBQXlCLE1BQUs2QixJQUE5Qjs7Z0JBRU1PLE1BQU47U0FqQkY7O0tBM0JNOzs7Ozs7OzthQUFBLHVCQXNERztVQUNIUCxJQURHLEdBQ2MsSUFEZCxDQUNIQSxJQURHO1VBQ0duQyxNQURILEdBQ2MsSUFEZCxDQUNHQSxNQURIO1VBRUgyQyxLQUZHLEdBRWtCUixJQUZsQixDQUVIUSxLQUZHO1VBRUlsRCxTQUZKLEdBRWtCMEMsSUFGbEIsQ0FFSTFDLFNBRko7Ozs7VUFLUG1ELFdBQVcsQ0FBZjs7VUFFSUMsaUJBQWlCbkYsU0FBU1IsTUFBTXlGLEtBQU4sQ0FBVCxLQUEwQnpGLE1BQU15RixLQUFOLE1BQWlCLENBQWhFOzs7O1VBSUlsRCxjQUFjLEdBQWxCLEVBQXVCO2NBQ2ZVLEtBQU4sR0FBY3dDLEtBQWQ7Ozs7Ozs7VUFPRWxELGNBQWMsR0FBZCxJQUFxQmtELFVBQVUsR0FBbkMsRUFBd0M7Y0FDaEN4QyxLQUFOLEdBQWNILE1BQWQ7Ozs7Ozs7VUFPRVAsY0FBYyxHQUFkLElBQXFCa0QsVUFBVSxHQUFuQyxFQUF3QztjQUNoQ3hDLEtBQU4sR0FBYyxDQUFkOzs7Ozs7O1VBT0VWLGNBQWMsR0FBZCxJQUFxQm9ELGNBQXpCLEVBQXlDO21CQUM1QjNGLE1BQU15RixLQUFOLElBQWUsQ0FBQyxDQUEzQjs7OztVQUlFbEQsY0FBYyxHQUFkLElBQXFCb0QsY0FBekIsRUFBeUM7bUJBQzVCM0YsTUFBTXlGLEtBQU4sQ0FBWDs7OztVQUlFbEQsY0FBYyxHQUFsQixFQUF1QjttQkFDVmtCLE1BQU12QixRQUFOLENBQWUwRCxPQUFmLElBQTBCLENBQXJDOzs7O1VBSUVyRCxjQUFjLEdBQWQsSUFBc0JBLGNBQWMsR0FBZCxJQUFxQmtELFVBQVUsR0FBekQsRUFBK0Q7WUFDdkR4QyxRQUFRNEMsc0JBQXNCSCxRQUF0QixDQUFkOztZQUVJekMsUUFBUUgsTUFBWixFQUFvQjtlQUNiNEIsRUFBTCxHQUFVLElBQVY7OztjQUdJekIsS0FBTixHQUFjNkMsc0JBQXNCN0MsS0FBdEIsRUFBNkJ5QyxRQUE3QixDQUFkOzs7Ozs7VUFNRW5ELGNBQWMsR0FBZCxJQUFzQkEsY0FBYyxHQUFkLElBQXFCa0QsVUFBVSxHQUF6RCxFQUErRDtZQUN2RHhDLFNBQVE4Qyx1QkFBdUJMLFFBQXZCLENBQWQ7O1lBRUl6QyxTQUFRLENBQVosRUFBZTtlQUNSeUIsRUFBTCxHQUFVLElBQVY7OztjQUdJekIsS0FBTixHQUFjK0MsdUJBQXVCL0MsTUFBdkIsRUFBOEJ5QyxRQUE5QixDQUFkOzs7OzsyQ0FLaUNuRCxTQUFuQyxHQUErQ2tELEtBQS9DO0tBaklROzs7Ozs7OztXQUFBLHFCQXlJQzthQUNGaEMsTUFBTVIsS0FBTixJQUFlLENBQXRCO0tBMUlROzs7Ozs7OztTQUFBLG1CQWtKRDthQUNBUSxNQUFNUixLQUFOLElBQWUsS0FBS0gsTUFBM0I7S0FuSlE7Ozs7Ozs7OztZQUFBLHNCQTRKdUI7VUFBdkJQLFNBQXVCLHVFQUFYMEQsU0FBVzs7VUFDM0IsQ0FBQzFELFNBQUwsRUFBZ0I7ZUFDUCxLQUFLbUMsRUFBWjs7O1VBR0UsQ0FBQyxLQUFLQSxFQUFWLEVBQWM7ZUFDTCxLQUFQOzs7O1VBSUVuQyxjQUFjLElBQWxCLEVBQXdCO2VBQ2YsS0FBSzBDLElBQUwsQ0FBVTFDLFNBQVYsS0FBd0IsR0FBeEIsSUFBK0IsS0FBSzBDLElBQUwsQ0FBVVEsS0FBVixLQUFvQixHQUExRDs7OztVQUlFbEQsY0FBYyxJQUFsQixFQUF3QjtlQUNmLEtBQUswQyxJQUFMLENBQVUxQyxTQUFWLEtBQXdCLEdBQXhCLElBQStCLEtBQUswQyxJQUFMLENBQVVRLEtBQVYsS0FBb0IsR0FBMUQ7OzthQUdLLEtBQUtSLElBQUwsQ0FBVTFDLFNBQVYsS0FBd0JBLFNBQS9CO0tBL0tROzs7Ozs7OztXQUFBLHFCQXVMQzthQUNGa0IsTUFBTXlDLE1BQU4sQ0FBYSxRQUFiLEtBQTBCekMsTUFBTXZCLFFBQU4sQ0FBZWlFLE9BQWYsS0FBMkIsUUFBckQsSUFBaUUxQyxNQUFNdkIsUUFBTixDQUFla0UsS0FBdkY7O0dBeExKOzs7Ozs7OztXQWtNU1AscUJBQVQsQ0FBZ0NILFFBQWhDLEVBQTBDO1FBQ2hDekMsS0FEZ0MsR0FDdEJRLEtBRHNCLENBQ2hDUixLQURnQzs7O1FBR3BDUSxNQUFNeUMsTUFBTixDQUFhLFVBQWIsQ0FBSixFQUE4QjthQUNyQmpELFFBQVF5QyxRQUFmOzs7V0FHS3pDLFNBQVN5QyxXQUFZekMsUUFBUXlDLFFBQTdCLENBQVA7Ozs7Ozs7Ozs7O1dBV09JLHFCQUFULENBQWdDN0MsS0FBaEMsRUFBdUN5QyxRQUF2QyxFQUFpRDtRQUN2QzVDLE1BRHVDLEdBQzVCb0IsR0FENEIsQ0FDdkNwQixNQUR1Qzs7O1FBRzNDRyxTQUFTSCxNQUFiLEVBQXFCO2FBQ1pHLEtBQVA7OztRQUdFUSxNQUFNeUMsTUFBTixDQUFhLFVBQWIsQ0FBSixFQUE4QjthQUNyQmpELFNBQVNILFNBQVMsQ0FBbEIsQ0FBUDs7O1FBR0VXLE1BQU12QixRQUFOLENBQWVtRSxNQUFuQixFQUEyQjs7O1VBR3JCbkMsSUFBSW9DLE9BQUosTUFBaUIsQ0FBQ3BDLElBQUlvQixLQUFKLEVBQXRCLEVBQW1DO2VBQzFCeEMsTUFBUDs7O2FBR0ssQ0FBUDs7O1FBR0VvQixJQUFJb0MsT0FBSixFQUFKLEVBQW1CO2FBQ1Z4RCxNQUFQOzs7V0FHS3lELEtBQUtDLEtBQUwsQ0FBVzFELFNBQVM0QyxRQUFwQixJQUFnQ0EsUUFBdkM7Ozs7Ozs7OztXQVNPSyxzQkFBVCxDQUFpQ0wsUUFBakMsRUFBMkM7UUFDakN6QyxLQURpQyxHQUN2QlEsS0FEdUIsQ0FDakNSLEtBRGlDOzs7UUFHckNRLE1BQU15QyxNQUFOLENBQWEsVUFBYixDQUFKLEVBQThCO2FBQ3JCakQsUUFBUXlDLFFBQWY7Ozs7O1FBS0llLE9BQU9GLEtBQUtHLElBQUwsQ0FBVXpELFFBQVF5QyxRQUFsQixDQUFiOztXQUVPLENBQUNlLE9BQU8sQ0FBUixJQUFhZixRQUFwQjs7Ozs7Ozs7Ozs7V0FXT00sc0JBQVQsQ0FBaUMvQyxLQUFqQyxFQUF3Q3lDLFFBQXhDLEVBQWtEO1FBQ3hDNUMsTUFEd0MsR0FDN0JvQixHQUQ2QixDQUN4Q3BCLE1BRHdDOzs7UUFHNUNHLFNBQVMsQ0FBYixFQUFnQjthQUNQQSxLQUFQOzs7UUFHRVEsTUFBTXlDLE1BQU4sQ0FBYSxVQUFiLENBQUosRUFBOEI7YUFDckJqRCxTQUFTSCxTQUFTLENBQWxCLENBQVA7OztRQUdFVyxNQUFNdkIsUUFBTixDQUFlbUUsTUFBbkIsRUFBMkI7OztVQUdyQm5DLElBQUlvQyxPQUFKLE1BQWlCcEMsSUFBSW1CLE9BQUosRUFBckIsRUFBb0M7ZUFDM0J2QyxNQUFQOzs7YUFHS3lELEtBQUtDLEtBQUwsQ0FBVzFELFNBQVM0QyxRQUFwQixJQUFnQ0EsUUFBdkM7OztXQUdLLENBQVA7OztTQUdLeEIsR0FBUCxFQUFZLE1BQVosRUFBb0I7Ozs7OztPQUFBLGlCQU1YO2FBQ0UsS0FBS3lDLEVBQVo7S0FQZ0I7Ozs7Ozs7O09BQUEsZUFlYjFHLEtBZmEsRUFlTjtVQUNOMkcsT0FBTzNHLE1BQU00RyxNQUFOLENBQWEsQ0FBYixDQUFYOztXQUVLRixFQUFMLEdBQVU7bUJBQ0cxRyxNQUFNNEcsTUFBTixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsQ0FESDtlQUVERCxPQUFRNUcsTUFBTTRHLElBQU4sSUFBYzVHLE1BQU00RyxJQUFOLENBQWQsR0FBNEJBLElBQXBDLEdBQTRDO09BRnJEOztHQWxCSjs7U0F5Qk8xQyxHQUFQLEVBQVksUUFBWixFQUFzQjs7Ozs7OztPQUFBLGlCQU9iO1VBQ0NoQyxRQURELEdBQ2N1QixLQURkLENBQ0N2QixRQUREO1VBRUNZLE1BRkQsR0FFWWlDLFdBQVcrQixJQUFYLENBQWdCQyxNQUY1QixDQUVDakUsTUFGRDs7Ozs7O1VBT0QsS0FBS3dELE9BQUwsRUFBSixFQUFvQjtlQUNWeEQsU0FBUyxDQUFWLElBQWdCOUMsTUFBTWtDLFNBQVMwRCxPQUFmLElBQTBCLENBQTFDLElBQStDNUYsTUFBTWtDLFNBQVNpRSxPQUFmLENBQXREOzs7YUFHS3JELFNBQVMsQ0FBaEI7O0dBbEJKOztTQXNCT29CLEdBQVAsRUFBWSxRQUFaLEVBQXNCOzs7Ozs7T0FBQSxpQkFNYjthQUNFLEtBQUtRLEVBQVo7O0dBUEo7O1NBV09SLEdBQVA7OztBQ25XRjs7Ozs7QUFLQSxBQUFPLFNBQVM4QyxHQUFULEdBQWdCO1NBQ2QsSUFBSUMsSUFBSixHQUFXQyxPQUFYLEVBQVA7OztBQ0pGOzs7Ozs7Ozs7OztBQVdBLEFBQU8sU0FBU0MsUUFBVCxDQUFtQkMsSUFBbkIsRUFBeUJDLElBQXpCLEVBQStCbEYsT0FBL0IsRUFBd0M7TUFDekNtRixnQkFBSjtNQUFhbkUsZ0JBQWI7TUFBc0JvRSxhQUF0QjtNQUE0QkMsZUFBNUI7TUFDSUMsV0FBVyxDQUFmO01BQ0ksQ0FBQ3RGLE9BQUwsRUFBY0EsVUFBVSxFQUFWOztNQUVWdUYsUUFBUSxTQUFSQSxLQUFRLEdBQVk7ZUFDWHZGLFFBQVF3RixPQUFSLEtBQW9CLEtBQXBCLEdBQTRCLENBQTVCLEdBQWdDWCxLQUEzQztjQUNVLElBQVY7YUFDU0ksS0FBS1EsS0FBTCxDQUFXekUsT0FBWCxFQUFvQm9FLElBQXBCLENBQVQ7UUFDSSxDQUFDRCxPQUFMLEVBQWNuRSxVQUFVb0UsT0FBTyxJQUFqQjtHQUpoQjs7TUFPSU0sWUFBWSxTQUFaQSxTQUFZLEdBQVk7UUFDdEJDLEtBQUtkLEtBQVQ7UUFDSSxDQUFDUyxRQUFELElBQWF0RixRQUFRd0YsT0FBUixLQUFvQixLQUFyQyxFQUE0Q0YsV0FBV0ssRUFBWDtRQUN4Q0MsWUFBWVYsUUFBUVMsS0FBS0wsUUFBYixDQUFoQjtjQUNVLElBQVY7V0FDT08sU0FBUDtRQUNJRCxhQUFhLENBQWIsSUFBa0JBLFlBQVlWLElBQWxDLEVBQXdDO1VBQ2xDQyxPQUFKLEVBQWE7cUJBQ0VBLE9BQWI7a0JBQ1UsSUFBVjs7aUJBRVNRLEVBQVg7ZUFDU1YsS0FBS1EsS0FBTCxDQUFXekUsT0FBWCxFQUFvQm9FLElBQXBCLENBQVQ7VUFDSSxDQUFDRCxPQUFMLEVBQWNuRSxVQUFVb0UsT0FBTyxJQUFqQjtLQVBoQixNQVFPLElBQUksQ0FBQ0QsT0FBRCxJQUFZbkYsUUFBUThGLFFBQVIsS0FBcUIsS0FBckMsRUFBNEM7Z0JBQ3ZDQyxXQUFXUixLQUFYLEVBQWtCSyxTQUFsQixDQUFWOztXQUVLUCxNQUFQO0dBakJGOztZQW9CVVcsTUFBVixHQUFtQixZQUFZO2lCQUNoQmIsT0FBYjtlQUNXLENBQVg7Y0FDVW5FLFVBQVVvRSxPQUFPLElBQTNCO0dBSEY7O1NBTU9NLFNBQVA7OztBQy9DRixJQUFNTyxjQUFjO09BQ2IsQ0FBQyxZQUFELEVBQWUsYUFBZixDQURhO09BRWIsQ0FBQyxhQUFELEVBQWdCLFlBQWhCO0NBRlA7O0FBS0EsQUFBZSxlQUFVM0UsS0FBVixFQUFpQnNCLFVBQWpCLEVBQTZCQyxNQUE3QixFQUFxQztNQUM1Q3FELE9BQU87Ozs7Ozs7O1NBQUEsaUJBUUp0QixNQVJJLEVBUUk7V0FDUixJQUFJbEUsSUFBSSxDQUFSLEVBQVd5RixNQUFNdkIsT0FBT2pFLE1BQTdCLEVBQXFDRCxJQUFJeUYsR0FBekMsRUFBOEN6RixHQUE5QyxFQUFtRDtZQUM3QzBGLFFBQVF4QixPQUFPbEUsQ0FBUCxFQUFVMEYsS0FBdEI7WUFDSWhHLFlBQVl3QyxXQUFXeUQsU0FBWCxDQUFxQnZJLEtBQXJDOztZQUVJNEMsTUFBTSxDQUFWLEVBQWE7Z0JBQ0x1RixZQUFZN0YsU0FBWixFQUF1QixDQUF2QixDQUFOLElBQXNDLEtBQUt0QyxLQUFMLEdBQWEsQ0FBbkQ7U0FERixNQUVPO2dCQUNDbUksWUFBWTdGLFNBQVosRUFBdUIsQ0FBdkIsQ0FBTixJQUFtQyxFQUFuQzs7O1lBR0VNLE1BQU1rRSxPQUFPakUsTUFBUCxHQUFnQixDQUExQixFQUE2QjtnQkFDckJzRixZQUFZN0YsU0FBWixFQUF1QixDQUF2QixDQUFOLElBQXNDLEtBQUt0QyxLQUFMLEdBQWEsQ0FBbkQ7U0FERixNQUVPO2dCQUNDbUksWUFBWTdGLFNBQVosRUFBdUIsQ0FBdkIsQ0FBTixJQUFtQyxFQUFuQzs7O0tBdEJLOzs7Ozs7Ozs7VUFBQSxrQkFpQ0h3RSxNQWpDRyxFQWlDSztXQUNULElBQUlsRSxJQUFJLENBQVIsRUFBV3lGLE1BQU12QixPQUFPakUsTUFBN0IsRUFBcUNELElBQUl5RixHQUF6QyxFQUE4Q3pGLEdBQTlDLEVBQW1EO1lBQzdDMEYsUUFBUXhCLE9BQU9sRSxDQUFQLEVBQVUwRixLQUF0Qjs7Y0FFTUUsVUFBTixHQUFtQixFQUFuQjtjQUNNQyxXQUFOLEdBQW9CLEVBQXBCOzs7R0F0Q047O1NBMkNPTCxJQUFQLEVBQWEsT0FBYixFQUFzQjs7Ozs7O09BQUEsaUJBTWI7YUFDRXJJLE1BQU15RCxNQUFNdkIsUUFBTixDQUFleUcsR0FBckIsQ0FBUDs7R0FQSjs7U0FXT04sSUFBUCxFQUFhLE1BQWIsRUFBcUI7Ozs7Ozs7T0FBQSxpQkFPWjthQUNFQSxLQUFLcEksS0FBTCxHQUFjOEUsV0FBVzZELEtBQVgsQ0FBaUI5RixNQUF0Qzs7R0FSSjs7U0FZT3VGLElBQVAsRUFBYSxVQUFiLEVBQXlCOzs7Ozs7O09BQUEsaUJBT2hCO1VBQ0R6QyxVQUFVbkMsTUFBTXZCLFFBQU4sQ0FBZTBELE9BQTdCOzthQUVReUMsS0FBS3BJLEtBQUwsSUFBYzJGLFVBQVUsQ0FBeEIsQ0FBRCxHQUErQkEsT0FBdEM7O0dBVko7Ozs7Ozs7U0FtQk83QyxFQUFQLENBQVUsQ0FBQyxhQUFELEVBQWdCLFFBQWhCLENBQVYsRUFBcUNvRSxTQUFTLFlBQU07U0FDN0NTLEtBQUwsQ0FBVzdDLFdBQVcrQixJQUFYLENBQWdCK0IsT0FBaEIsQ0FBd0JDLFFBQW5DO0dBRG1DLEVBRWxDLEVBRmtDLENBQXJDOzs7Ozs7U0FRTy9GLEVBQVAsQ0FBVSxTQUFWLEVBQXFCLFlBQU07U0FDcEJnRyxNQUFMLENBQVloRSxXQUFXK0IsSUFBWCxDQUFnQitCLE9BQWhCLENBQXdCQyxRQUFwQztHQURGOztTQUlPVCxJQUFQOzs7QUMzR0Y7Ozs7OztBQU1BLEFBQU8sU0FBU1csUUFBVCxDQUFtQkMsSUFBbkIsRUFBeUI7TUFDMUJBLFFBQVFBLEtBQUtDLFVBQWpCLEVBQTZCO1FBQ3ZCQyxJQUFJRixLQUFLQyxVQUFMLENBQWdCRSxVQUF4QjtRQUNJQyxVQUFVLEVBQWQ7O1dBRU9GLENBQVAsRUFBVUEsSUFBSUEsRUFBRUcsV0FBaEIsRUFBNkI7VUFDdkJILEVBQUVJLFFBQUYsS0FBZSxDQUFmLElBQW9CSixNQUFNRixJQUE5QixFQUFvQztnQkFDMUIvRixJQUFSLENBQWFpRyxDQUFiOzs7O1dBSUdFLE9BQVA7OztTQUdLLEVBQVA7Ozs7Ozs7OztBQVNGLEFBQU8sU0FBU0csS0FBVCxDQUFnQlAsSUFBaEIsRUFBc0I7TUFDdkJBLFFBQVFBLGdCQUFnQlEsT0FBT0MsV0FBbkMsRUFBZ0Q7V0FDdkMsSUFBUDs7O1NBR0ssS0FBUDs7O0FDN0JGLElBQU1DLGlCQUFpQix5QkFBdkI7O0FBRUEsQUFBZSxlQUFVbEcsS0FBVixFQUFpQnNCLFVBQWpCLEVBQTZCO01BQ3BDK0IsT0FBTzs7Ozs7O1NBQUEsbUJBTUY7V0FDRjhDLElBQUwsR0FBWW5HLE1BQU1DLFFBQWxCO1dBQ0ttRyxLQUFMLEdBQWEsS0FBS0QsSUFBTCxDQUFVRSxhQUFWLENBQXdCSCxjQUF4QixDQUFiO1dBQ0s1QyxNQUFMLEdBQWNsRyxNQUFNa0osU0FBTixDQUFnQkMsS0FBaEIsQ0FBc0JoSCxJQUF0QixDQUEyQixLQUFLNkYsT0FBTCxDQUFhQyxRQUF4QyxFQUFrRG1CLE1BQWxELENBQXlELFVBQUNDLEtBQUQsRUFBVztlQUN6RSxDQUFDQSxNQUFNQyxTQUFOLENBQWdCQyxRQUFoQixDQUF5QjNHLE1BQU12QixRQUFOLENBQWVJLE9BQWYsQ0FBdUIrSCxVQUFoRCxDQUFSO09BRFksQ0FBZDs7R0FUSjs7U0FlT3ZELElBQVAsRUFBYSxNQUFiLEVBQXFCOzs7Ozs7T0FBQSxpQkFNWjthQUNFQSxLQUFLd0QsRUFBWjtLQVBpQjs7Ozs7Ozs7T0FBQSxlQWVkeEksQ0FmYyxFQWVYO1VBQ0Z6QixTQUFTeUIsQ0FBVCxDQUFKLEVBQWlCO1lBQ1h5SSxTQUFTVCxhQUFULENBQXVCaEksQ0FBdkIsQ0FBSjs7O1VBR0UwSCxNQUFNMUgsQ0FBTixDQUFKLEVBQWM7YUFDUHdJLEVBQUwsR0FBVXhJLENBQVY7T0FERixNQUVPO2FBQ0EsMkNBQUw7OztHQXZCTjs7U0E0Qk9nRixJQUFQLEVBQWEsT0FBYixFQUFzQjs7Ozs7O09BQUEsaUJBTWI7YUFDRUEsS0FBS2xELEVBQVo7S0FQa0I7Ozs7Ozs7O09BQUEsZUFlZjRHLENBZmUsRUFlWjtVQUNGaEIsTUFBTWdCLENBQU4sQ0FBSixFQUFjO2FBQ1A1RyxFQUFMLEdBQVU0RyxDQUFWO09BREYsTUFFTzsyREFDNENiLGNBQWpEOzs7R0FuQk47O1NBd0JPN0MsSUFBUCxFQUFhLFNBQWIsRUFBd0I7Ozs7OztPQUFBLGlCQU1mO2FBQ0VBLEtBQUsrQyxLQUFMLENBQVdmLFFBQVgsQ0FBb0IsQ0FBcEIsQ0FBUDs7R0FQSjs7U0FXT2hDLElBQVA7OztBQ25GYSxlQUFVckQsS0FBVixFQUFpQnNCLFVBQWpCLEVBQTZCQyxNQUE3QixFQUFxQztNQUM1Q3lGLE9BQU87Ozs7OztTQUFBLG1CQU1GO1dBQ0Z4SyxLQUFMLEdBQWF3RCxNQUFNdkIsUUFBTixDQUFld0ksSUFBNUI7O0dBUEo7O1NBV09ELElBQVAsRUFBYSxPQUFiLEVBQXNCOzs7Ozs7T0FBQSxpQkFNYjthQUNFQSxLQUFLRSxFQUFaO0tBUGtCOzs7Ozs7Ozs7T0FBQSxlQWdCZjFLLEtBaEJlLEVBZ0JSO1VBQ05LLFNBQVNMLEtBQVQsQ0FBSixFQUFxQjtjQUNiMkssTUFBTixHQUFlNUssTUFBTUMsTUFBTTJLLE1BQVosQ0FBZjtjQUNNeEYsS0FBTixHQUFjcEYsTUFBTUMsTUFBTW1GLEtBQVosQ0FBZDtPQUZGLE1BR087Z0JBQ0dwRixNQUFNQyxLQUFOLENBQVI7OztXQUdHMEssRUFBTCxHQUFVMUssS0FBVjs7R0F4Qko7O1NBNEJPd0ssSUFBUCxFQUFhLFVBQWIsRUFBeUI7Ozs7OztPQUFBLGlCQU1oQjtVQUNEeEssUUFBUXdLLEtBQUt4SyxLQUFqQjtVQUNJMkYsVUFBVW5DLE1BQU12QixRQUFOLENBQWUwRCxPQUE3Qjs7VUFFSXRGLFNBQVNMLEtBQVQsQ0FBSixFQUFxQjtlQUNYQSxNQUFNMkssTUFBTixHQUFlaEYsT0FBaEIsR0FBNEIzRixNQUFNbUYsS0FBTixHQUFjUSxPQUFqRDs7O2FBR0szRixRQUFRLENBQVIsR0FBWTJGLE9BQW5COztHQWRKOzs7Ozs7U0FzQk83QyxFQUFQLENBQVUsQ0FBQyxRQUFELEVBQVcsUUFBWCxDQUFWLEVBQWdDLFlBQU07U0FDL0JqQyxLQUFMO0dBREY7O1NBSU8ySixJQUFQOzs7QUNsRWEsZUFBVWhILEtBQVYsRUFBaUJzQixVQUFqQixFQUE2QkMsTUFBN0IsRUFBcUM7TUFDNUNULE9BQU87Ozs7OztTQUFBLG1CQU1GO1dBQ0ZHLEVBQUwsR0FBVSxDQUFWO0tBUFM7Ozs7Ozs7OztRQUFBLGtCQWdCTzs7O1VBQVptRyxNQUFZLHVFQUFILENBQUc7O1dBQ1hBLE1BQUwsR0FBY0EsTUFBZDs7YUFFT3pILElBQVAsQ0FBWSxNQUFaLEVBQW9CO2tCQUNSLEtBQUtuRDtPQURqQjs7aUJBSVdvRSxVQUFYLENBQXNCZSxLQUF0QixDQUE0QixZQUFNO2VBQ3pCaEMsSUFBUCxDQUFZLFlBQVosRUFBMEI7b0JBQ2QsTUFBS25EO1NBRGpCO09BREY7O0dBdkJKOztTQStCT3NFLElBQVAsRUFBYSxRQUFiLEVBQXVCOzs7Ozs7T0FBQSxpQkFNZDthQUNFQSxLQUFLRyxFQUFaO0tBUG1COzs7Ozs7OztPQUFBLGVBZWhCekUsS0FmZ0IsRUFlVDtXQUNMeUUsRUFBTCxHQUFVLENBQUNoRSxZQUFZVCxLQUFaLENBQUQsR0FBc0JELE1BQU1DLEtBQU4sQ0FBdEIsR0FBcUMsQ0FBL0M7O0dBaEJKOztTQW9CT3NFLElBQVAsRUFBYSxXQUFiLEVBQTBCOzs7Ozs7T0FBQSxpQkFNakI7YUFDRVEsV0FBVzZELEtBQVgsQ0FBaUJrQyxVQUFqQixHQUE4QnJILE1BQU1SLEtBQTNDOztHQVBKOztTQVdPc0IsSUFBUCxFQUFhLE9BQWIsRUFBc0I7Ozs7OztPQUFBLGlCQU1iO1VBQ0RzRyxTQUFTLEtBQUtBLE1BQWxCO1VBQ0lFLFlBQVksS0FBS0EsU0FBckI7O1VBRUloRyxXQUFXeUQsU0FBWCxDQUFxQndDLEVBQXJCLENBQXdCLEtBQXhCLENBQUosRUFBb0M7ZUFDM0JELFlBQVlGLE1BQW5COzs7YUFHS0UsWUFBWUYsTUFBbkI7O0dBZEo7Ozs7Ozs7U0F1Qk85SCxFQUFQLENBQVUsQ0FBQyxjQUFELEVBQWlCLEtBQWpCLENBQVYsRUFBbUMsWUFBTTtTQUNsQ29CLElBQUw7R0FERjs7U0FJT0ksSUFBUDs7O0FDM0ZhLGdCQUFVZCxLQUFWLEVBQWlCc0IsVUFBakIsRUFBNkJDLE1BQTdCLEVBQXFDO01BQzVDNEQsUUFBUTs7Ozs7O2VBQUEseUJBTUc7VUFDVHFDLFFBQVcsS0FBS0gsVUFBaEIsT0FBSjtVQUNJL0QsU0FBU2hDLFdBQVcrQixJQUFYLENBQWdCQyxNQUE3Qjs7V0FFSyxJQUFJbEUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJa0UsT0FBT2pFLE1BQTNCLEVBQW1DRCxHQUFuQyxFQUF3QztlQUMvQkEsQ0FBUCxFQUFVMEYsS0FBVixDQUFnQjBDLEtBQWhCLEdBQXdCQSxLQUF4Qjs7S0FYUTs7Ozs7Ozs7Z0JBQUEsMEJBb0JJO2lCQUNIbkUsSUFBWCxDQUFnQitCLE9BQWhCLENBQXdCTixLQUF4QixDQUE4QjBDLEtBQTlCLEdBQXlDLEtBQUtDLFdBQTlDO0tBckJVOzs7Ozs7OztVQUFBLG9CQTZCRjtVQUNKbkUsU0FBU2hDLFdBQVcrQixJQUFYLENBQWdCQyxNQUE3Qjs7V0FFSyxJQUFJbEUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJa0UsT0FBT2pFLE1BQTNCLEVBQW1DRCxHQUFuQyxFQUF3QztlQUMvQkEsQ0FBUCxFQUFVMEYsS0FBVixDQUFnQjBDLEtBQWhCLEdBQXdCLEVBQXhCOzs7aUJBR1NuRSxJQUFYLENBQWdCK0IsT0FBaEIsQ0FBd0JOLEtBQXhCLENBQThCMEMsS0FBOUIsR0FBc0MsRUFBdEM7O0dBcENKOztTQXdDT3JDLEtBQVAsRUFBYyxRQUFkLEVBQXdCOzs7Ozs7T0FBQSxpQkFNZjthQUNFN0QsV0FBVytCLElBQVgsQ0FBZ0JDLE1BQWhCLENBQXVCakUsTUFBOUI7O0dBUEo7O1NBV084RixLQUFQLEVBQWMsT0FBZCxFQUF1Qjs7Ozs7O09BQUEsaUJBTWQ7YUFDRTdELFdBQVcrQixJQUFYLENBQWdCOEMsSUFBaEIsQ0FBcUJ1QixXQUE1Qjs7R0FQSjs7U0FXT3ZDLEtBQVAsRUFBYyxhQUFkLEVBQTZCOzs7Ozs7T0FBQSxpQkFNcEI7YUFDRUEsTUFBTWtDLFVBQU4sR0FBbUJsQyxNQUFNOUYsTUFBekIsR0FBa0NpQyxXQUFXc0QsSUFBWCxDQUFnQitDLElBQWxELEdBQXlEckcsV0FBV3NHLE1BQVgsQ0FBa0JELElBQWxGOztHQVBKOztTQVdPeEMsS0FBUCxFQUFjLFlBQWQsRUFBNEI7Ozs7OztPQUFBLGlCQU1uQjthQUNHQSxNQUFNcUMsS0FBTixHQUFjeEgsTUFBTXZCLFFBQU4sQ0FBZTBELE9BQTlCLEdBQXlDYixXQUFXMEYsSUFBWCxDQUFnQmEsUUFBekQsR0FBb0V2RyxXQUFXc0QsSUFBWCxDQUFnQmlELFFBQTNGOztHQVBKOzs7Ozs7OztTQWlCT3ZJLEVBQVAsQ0FBVSxDQUFDLGNBQUQsRUFBaUIsUUFBakIsRUFBMkIsUUFBM0IsQ0FBVixFQUFnRCxZQUFNO1VBQzlDd0ksV0FBTjtVQUNNQyxZQUFOO0dBRkY7Ozs7OztTQVNPekksRUFBUCxDQUFVLFNBQVYsRUFBcUIsWUFBTTtVQUNuQmdHLE1BQU47R0FERjs7U0FJT0gsS0FBUDs7O0FDeEdhLGdCQUFVbkYsS0FBVixFQUFpQnNCLFVBQWpCLEVBQTZCQyxNQUE3QixFQUFxQztNQUM1Q3lHLFFBQVE7Ozs7Ozs7U0FBQSxtQkFPSDthQUNBckksSUFBUCxDQUFZLGNBQVo7O1dBRUtzSSxTQUFMO1dBQ0tDLFdBQUw7O2FBRU92SSxJQUFQLENBQVksYUFBWjtLQWJVOzs7Ozs7OzthQUFBLHVCQXFCQztpQkFDQTBELElBQVgsQ0FBZ0I4QyxJQUFoQixDQUFxQk8sU0FBckIsQ0FBK0J5QixHQUEvQixDQUFtQ25JLE1BQU12QixRQUFOLENBQWVJLE9BQWYsQ0FBdUJtQixNQUFNdkIsUUFBTixDQUFlM0IsSUFBdEMsQ0FBbkM7S0F0QlU7Ozs7Ozs7O2VBQUEseUJBOEJHO1VBQ1QrQixVQUFVbUIsTUFBTXZCLFFBQU4sQ0FBZUksT0FBN0I7VUFDSTRILFFBQVFuRixXQUFXK0IsSUFBWCxDQUFnQkMsTUFBaEIsQ0FBdUJ0RCxNQUFNUixLQUE3QixDQUFaOztVQUVJaUgsS0FBSixFQUFXO2NBQ0hDLFNBQU4sQ0FBZ0J5QixHQUFoQixDQUFvQnRKLFFBQVF1SixXQUE1Qjs7aUJBRVMzQixLQUFULEVBQWdCN0csT0FBaEIsQ0FBd0IsVUFBQ3lJLE9BQUQsRUFBYTtrQkFDM0IzQixTQUFSLENBQWtCcEIsTUFBbEIsQ0FBeUJ6RyxRQUFRdUosV0FBakM7U0FERjs7S0FyQ1E7Ozs7Ozs7O2lCQUFBLDJCQWdESztVQUNYdkosVUFBVW1CLE1BQU12QixRQUFOLENBQWVJLE9BQTdCOztpQkFFV3dFLElBQVgsQ0FBZ0I4QyxJQUFoQixDQUFxQk8sU0FBckIsQ0FBK0JwQixNQUEvQixDQUFzQ3pHLFFBQVFtQixNQUFNdkIsUUFBTixDQUFlM0IsSUFBdkIsQ0FBdEM7O2lCQUVXdUcsSUFBWCxDQUFnQkMsTUFBaEIsQ0FBdUIxRCxPQUF2QixDQUErQixVQUFDeUksT0FBRCxFQUFhO2dCQUNsQzNCLFNBQVIsQ0FBa0JwQixNQUFsQixDQUF5QnpHLFFBQVF1SixXQUFqQztPQURGOztHQXJESjs7Ozs7OztTQWdFTzlJLEVBQVAsQ0FBVSxDQUFDLFNBQUQsRUFBWSxRQUFaLENBQVYsRUFBaUMsWUFBTTtVQUMvQmdKLGFBQU47R0FERjs7Ozs7OztTQVNPaEosRUFBUCxDQUFVLENBQUMsUUFBRCxFQUFXLFFBQVgsQ0FBVixFQUFnQyxZQUFNO1VBQzlCakMsS0FBTjtHQURGOzs7Ozs7U0FRT2lDLEVBQVAsQ0FBVSxZQUFWLEVBQXdCLFlBQU07VUFDdEI0SSxXQUFOO0dBREY7O1NBSU9GLEtBQVA7OztBQ3RGYSxpQkFBVWhJLEtBQVYsRUFBaUJzQixVQUFqQixFQUE2QkMsTUFBN0IsRUFBcUM7TUFDNUNxRyxTQUFTOzs7O1NBQUEsbUJBSUo7V0FDRlcsS0FBTCxHQUFhLEVBQWI7O1VBRUl2SSxNQUFNeUMsTUFBTixDQUFhLFVBQWIsQ0FBSixFQUE4QjthQUN2QjhGLEtBQUwsR0FBYSxLQUFLQyxPQUFMLEVBQWI7O0tBUlM7Ozs7Ozs7O1dBQUEscUJBaUJRO1VBQVpELEtBQVksdUVBQUosRUFBSTtVQUNiakYsTUFEYSxHQUNGaEMsV0FBVytCLElBRFQsQ0FDYkMsTUFEYTs0QkFFUXRELE1BQU12QixRQUZkO1VBRWIwRCxPQUZhLG1CQUViQSxPQUZhO1VBRUp0RCxPQUZJLG1CQUVKQSxPQUZJOzs7VUFJYjRKLGtCQUFrQixDQUFDLENBQUMsQ0FBQ3pJLE1BQU12QixRQUFOLENBQWV3SSxJQUExQztVQUNNeUIsYUFBYXZHLFVBQVVzRyxlQUFWLEdBQTRCM0YsS0FBSzZGLEtBQUwsQ0FBV3hHLFVBQVUsQ0FBckIsQ0FBL0M7VUFDTXlHLFNBQVN0RixPQUFPaUQsS0FBUCxDQUFhLENBQWIsRUFBZ0JtQyxVQUFoQixFQUE0QkcsT0FBNUIsRUFBZjtVQUNNQyxVQUFVeEYsT0FBT2lELEtBQVAsQ0FBYW1DLGFBQWEsQ0FBQyxDQUEzQixDQUFoQjs7V0FFSyxJQUFJckssSUFBSSxDQUFiLEVBQWdCQSxJQUFJeUUsS0FBS2lHLEdBQUwsQ0FBUyxDQUFULEVBQVlqRyxLQUFLQyxLQUFMLENBQVdaLFVBQVVtQixPQUFPakUsTUFBNUIsQ0FBWixDQUFwQixFQUFzRWhCLEdBQXRFLEVBQTJFO2FBQ3BFLElBQUllLElBQUksQ0FBYixFQUFnQkEsSUFBSXdKLE9BQU92SixNQUEzQixFQUFtQ0QsR0FBbkMsRUFBd0M7Y0FDbEM0SixRQUFRSixPQUFPeEosQ0FBUCxFQUFVNkosU0FBVixDQUFvQixJQUFwQixDQUFaOztnQkFFTXZDLFNBQU4sQ0FBZ0J5QixHQUFoQixDQUFvQnRKLFFBQVErSCxVQUE1Qjs7Z0JBRU1uSCxJQUFOLENBQVd1SixLQUFYOzs7YUFHRyxJQUFJNUosS0FBSSxDQUFiLEVBQWdCQSxLQUFJMEosUUFBUXpKLE1BQTVCLEVBQW9DRCxJQUFwQyxFQUF5QztjQUNuQzRKLFNBQVFGLFFBQVExSixFQUFSLEVBQVc2SixTQUFYLENBQXFCLElBQXJCLENBQVo7O2lCQUVNdkMsU0FBTixDQUFnQnlCLEdBQWhCLENBQW9CdEosUUFBUStILFVBQTVCOztnQkFFTXNDLE9BQU4sQ0FBY0YsTUFBZDs7OzthQUlHVCxLQUFQO0tBNUNXOzs7Ozs7OztVQUFBLG9CQW9ESDtVQUNGQSxLQURFLEdBQ1EsSUFEUixDQUNGQSxLQURFOzZCQUVrQmpILFdBQVcrQixJQUY3QjtVQUVGK0IsT0FGRSxvQkFFRkEsT0FGRTtVQUVPOUIsTUFGUCxvQkFFT0EsTUFGUDs7O1VBSUY2RixPQUFPckcsS0FBS0MsS0FBTCxDQUFXd0YsTUFBTWxKLE1BQU4sR0FBZSxDQUExQixDQUFiO1VBQ015SixVQUFVUCxNQUFNaEMsS0FBTixDQUFZLENBQVosRUFBZTRDLElBQWYsRUFBcUJOLE9BQXJCLEVBQWhCO1VBQ01ELFNBQVNMLE1BQU1oQyxLQUFOLENBQVk0QyxPQUFPLENBQUMsQ0FBcEIsRUFBdUJOLE9BQXZCLEVBQWY7VUFDTXJCLFFBQVdsRyxXQUFXNkQsS0FBWCxDQUFpQmtDLFVBQTVCLE9BQU47O1dBRUssSUFBSWpJLElBQUksQ0FBYixFQUFnQkEsSUFBSXdKLE9BQU92SixNQUEzQixFQUFtQ0QsR0FBbkMsRUFBd0M7Z0JBQzlCZ0ssV0FBUixDQUFvQlIsT0FBT3hKLENBQVAsQ0FBcEI7OztXQUdHLElBQUlBLE1BQUksQ0FBYixFQUFnQkEsTUFBSTBKLFFBQVF6SixNQUE1QixFQUFvQ0QsS0FBcEMsRUFBeUM7Z0JBQy9CaUssWUFBUixDQUFxQlAsUUFBUTFKLEdBQVIsQ0FBckIsRUFBaUNrRSxPQUFPLENBQVAsQ0FBakM7OztXQUdHLElBQUlsRSxNQUFJLENBQWIsRUFBZ0JBLE1BQUltSixNQUFNbEosTUFBMUIsRUFBa0NELEtBQWxDLEVBQXVDO2NBQy9CQSxHQUFOLEVBQVMwRixLQUFULENBQWUwQyxLQUFmLEdBQXVCQSxLQUF2Qjs7S0F0RVM7Ozs7Ozs7O1VBQUEsb0JBK0VIO1VBQ0ZlLEtBREUsR0FDUSxJQURSLENBQ0ZBLEtBREU7OztXQUdILElBQUluSixJQUFJLENBQWIsRUFBZ0JBLElBQUltSixNQUFNbEosTUFBMUIsRUFBa0NELEdBQWxDLEVBQXVDO21CQUMxQmlFLElBQVgsQ0FBZ0IrQixPQUFoQixDQUF3QmtFLFdBQXhCLENBQW9DZixNQUFNbkosQ0FBTixDQUFwQzs7O0dBbkZOOztTQXdGT3dJLE1BQVAsRUFBZSxNQUFmLEVBQXVCOzs7Ozs7T0FBQSxpQkFNZDthQUNFLENBQUN0RyxXQUFXNkQsS0FBWCxDQUFpQmtDLFVBQWpCLEdBQThCL0YsV0FBV3NELElBQVgsQ0FBZ0JwSSxLQUEvQyxJQUF3RG9MLE9BQU9XLEtBQVAsQ0FBYWxKLE1BQTVFOztHQVBKOzs7Ozs7U0FlT0MsRUFBUCxDQUFVLFFBQVYsRUFBb0IsWUFBTTtXQUNqQmdHLE1BQVA7V0FDT2pJLEtBQVA7V0FDT3VMLE1BQVA7R0FIRjs7Ozs7O1NBVU90SixFQUFQLENBQVUsY0FBVixFQUEwQixZQUFNO1FBQzFCVSxNQUFNeUMsTUFBTixDQUFhLFVBQWIsQ0FBSixFQUE4QjthQUNyQm1HLE1BQVA7O0dBRko7Ozs7OztTQVVPdEosRUFBUCxDQUFVLFNBQVYsRUFBcUIsWUFBTTtXQUNsQmdHLE1BQVA7R0FERjs7U0FJT3NDLE1BQVA7OztJQ2hJbUIyQjs7OzswQkFJVTtRQUFoQkMsU0FBZ0IsdUVBQUosRUFBSTs7O1NBQ3RCQSxTQUFMLEdBQWlCQSxTQUFqQjs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFZRWhNLFFBQVFpTSxJQUFJQyxTQUEwQjtVQUFqQkMsT0FBaUIsdUVBQVAsS0FBTzs7VUFDcEMvTSxTQUFTWSxNQUFULENBQUosRUFBc0I7aUJBQ1gsQ0FBQ0EsTUFBRCxDQUFUOzs7V0FHRyxJQUFJNEIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJNUIsT0FBTzZCLE1BQTNCLEVBQW1DRCxHQUFuQyxFQUF3QzthQUNqQ29LLFNBQUwsQ0FBZWhNLE9BQU80QixDQUFQLENBQWYsSUFBNEJzSyxPQUE1Qjs7V0FFR0UsZ0JBQUgsQ0FBb0JwTSxPQUFPNEIsQ0FBUCxDQUFwQixFQUErQixLQUFLb0ssU0FBTCxDQUFlaE0sT0FBTzRCLENBQVAsQ0FBZixDQUEvQixFQUEwRHVLLE9BQTFEOzs7Ozs7Ozs7Ozs7Ozs7d0JBWUNuTSxRQUFRaU0sSUFBcUI7VUFBakJFLE9BQWlCLHVFQUFQLEtBQU87O1VBQzVCL00sU0FBU1ksTUFBVCxDQUFKLEVBQXNCO2lCQUNYLENBQUNBLE1BQUQsQ0FBVDs7O1dBR0csSUFBSTRCLElBQUksQ0FBYixFQUFnQkEsSUFBSTVCLE9BQU82QixNQUEzQixFQUFtQ0QsR0FBbkMsRUFBd0M7V0FDbkN5SyxtQkFBSCxDQUF1QnJNLE9BQU80QixDQUFQLENBQXZCLEVBQWtDLEtBQUtvSyxTQUFMLENBQWVoTSxPQUFPNEIsQ0FBUCxDQUFmLENBQWxDLEVBQTZEdUssT0FBN0Q7Ozs7Ozs7Ozs7Ozs4QkFTTzthQUNGLEtBQUtILFNBQVo7Ozs7OztBQ25EVyxpQkFBVXhKLEtBQVYsRUFBaUJzQixVQUFqQixFQUE2QkMsTUFBN0IsRUFBcUM7Ozs7OztNQU01Q3VJLFNBQVMsSUFBSVAsWUFBSixFQUFmOztNQUVNUSxTQUFTOzs7O1NBQUEsbUJBSUo7V0FDRkMsSUFBTDtLQUxXOzs7Ozs7Ozs7UUFBQSxrQkFjTDthQUNDMUssRUFBUCxDQUFVLFFBQVYsRUFBb0IwRyxNQUFwQixFQUE0QnRDLFNBQVMsWUFBTTtlQUNsQy9ELElBQVAsQ0FBWSxRQUFaO09BRDBCLEVBRXpCSyxNQUFNdkIsUUFBTixDQUFlaUYsUUFGVSxDQUE1QjtLQWZXOzs7Ozs7OztVQUFBLG9CQXlCSDthQUNEdUcsR0FBUCxDQUFXLFFBQVgsRUFBcUJqRSxNQUFyQjs7R0ExQko7Ozs7OztTQWtDTzFHLEVBQVAsQ0FBVSxTQUFWLEVBQXFCLFlBQU07V0FDbEI0SyxNQUFQO1dBQ09DLE9BQVA7R0FGRjs7U0FLT0osTUFBUDs7O0FDaERGLElBQU1LLG1CQUFtQixDQUFDLEtBQUQsRUFBUSxLQUFSLENBQXpCO0FBQ0EsSUFBTUMsbUJBQW1CO09BQ2xCLEdBRGtCO09BRWxCLEdBRmtCO09BR2xCO0NBSFA7O0FBTUEsQUFBZSxvQkFBVXJLLEtBQVYsRUFBaUJzQixVQUFqQixFQUE2QkMsTUFBN0IsRUFBcUM7TUFDNUN3RCxZQUFZOzs7Ozs7U0FBQSxtQkFNUDtXQUNGdkksS0FBTCxHQUFhd0QsTUFBTXZCLFFBQU4sQ0FBZUssU0FBNUI7S0FQYzs7Ozs7Ozs7O1dBQUEsbUJBZ0JQMEIsT0FoQk8sRUFnQkU7VUFDWjhKLFFBQVE5SixRQUFRK0YsS0FBUixDQUFjLENBQWQsRUFBaUIsQ0FBakIsQ0FBWjs7VUFFSSxLQUFLZ0IsRUFBTCxDQUFRLEtBQVIsQ0FBSixFQUFvQjtlQUNYL0csUUFBUStKLEtBQVIsQ0FBY0QsS0FBZCxFQUFxQkUsSUFBckIsQ0FBMEJILGlCQUFpQkMsS0FBakIsQ0FBMUIsQ0FBUDs7O2FBR0s5SixPQUFQO0tBdkJjOzs7Ozs7Ozs7TUFBQSxjQWdDWjFCLFNBaENZLEVBZ0NEO2FBQ04sS0FBS3RDLEtBQUwsS0FBZXNDLFNBQXRCO0tBakNjOzs7Ozs7OztZQUFBLHNCQXlDSjtpQkFDQ3VFLElBQVgsQ0FBZ0I4QyxJQUFoQixDQUFxQk8sU0FBckIsQ0FBK0J5QixHQUEvQixDQUFtQ25JLE1BQU12QixRQUFOLENBQWVJLE9BQWYsQ0FBdUJDLFNBQXZCLENBQWlDLEtBQUt0QyxLQUF0QyxDQUFuQztLQTFDYzs7Ozs7Ozs7ZUFBQSx5QkFrREQ7aUJBQ0Y2RyxJQUFYLENBQWdCOEMsSUFBaEIsQ0FBcUJPLFNBQXJCLENBQStCcEIsTUFBL0IsQ0FBc0N0RixNQUFNdkIsUUFBTixDQUFlSSxPQUFmLENBQXVCQyxTQUF2QixDQUFpQyxLQUFLdEMsS0FBdEMsQ0FBdEM7O0dBbkRKOztTQXVET3VJLFNBQVAsRUFBa0IsT0FBbEIsRUFBMkI7Ozs7OztPQUFBLGlCQU1sQjthQUNFQSxVQUFVbUMsRUFBakI7S0FQdUI7Ozs7Ozs7OztPQUFBLGVBZ0JwQjFLLEtBaEJvQixFQWdCYjtVQUNONE4saUJBQWlCSyxPQUFqQixDQUF5QmpPLEtBQXpCLElBQWtDLENBQUMsQ0FBdkMsRUFBMEM7a0JBQzlCMEssRUFBVixHQUFlMUssS0FBZjtPQURGLE1BRU87YUFDQSx3Q0FBTDs7O0dBcEJOOzs7Ozs7O1NBOEJPOEMsRUFBUCxDQUFVLENBQUMsU0FBRCxFQUFZLFFBQVosQ0FBVixFQUFpQyxZQUFNO2NBQzNCb0wsV0FBVjtHQURGOzs7Ozs7U0FRT3BMLEVBQVAsQ0FBVSxRQUFWLEVBQW9CLFlBQU07Y0FDZGpDLEtBQVY7R0FERjs7Ozs7OztTQVNPaUMsRUFBUCxDQUFVLENBQUMsY0FBRCxFQUFpQixRQUFqQixDQUFWLEVBQXNDLFlBQU07Y0FDaENxTCxRQUFWO0dBREY7O1NBSU81RixTQUFQOzs7QUNySEY7Ozs7Ozs7QUFPQSxBQUFlLGNBQVUvRSxLQUFWLEVBQWlCc0IsVUFBakIsRUFBNkI7U0FDbkM7Ozs7Ozs7VUFBQSxrQkFPR2dHLFNBUEgsRUFPYztVQUNiaEcsV0FBV3lELFNBQVgsQ0FBcUJ3QyxFQUFyQixDQUF3QixLQUF4QixDQUFKLEVBQW9DO2VBQzNCLENBQUNELFNBQVI7OzthQUdLQSxTQUFQOztHQVpKOzs7QUNSRjs7Ozs7OztBQU9BLEFBQWUsY0FBVXRILEtBQVYsRUFBaUJzQixVQUFqQixFQUE2QjtTQUNuQzs7Ozs7OztVQUFBLGtCQU9HZ0csU0FQSCxFQU9jO1VBQ1hzRCxhQUFhOUgsS0FBS0MsS0FBTCxDQUFXdUUsWUFBWWhHLFdBQVc2RCxLQUFYLENBQWlCa0MsVUFBeEMsQ0FBbkI7YUFDT0MsWUFBYWhHLFdBQVdzRCxJQUFYLENBQWdCcEksS0FBaEIsR0FBd0JvTyxVQUE1Qzs7R0FUSjs7O0FDUkY7Ozs7Ozs7QUFPQSxBQUFlLGVBQVU1SyxLQUFWLEVBQWlCc0IsVUFBakIsRUFBNkI7U0FDbkM7Ozs7Ozs7VUFBQSxrQkFPR2dHLFNBUEgsRUFPYzthQUNWQSxZQUFhaEcsV0FBV3NHLE1BQVgsQ0FBa0JELElBQWxCLEdBQXlCLENBQTdDOztHQVJKOzs7QUNORjs7Ozs7OztBQU9BLEFBQWUsa0JBQVUzSCxLQUFWLEVBQWlCc0IsVUFBakIsRUFBNkI7U0FDbkM7Ozs7Ozs7VUFBQSxrQkFPR2dHLFNBUEgsRUFPYztVQUNidEgsTUFBTXZCLFFBQU4sQ0FBZWlFLE9BQWYsSUFBMEIsQ0FBOUIsRUFBaUM7WUFDM0J1RSxPQUFPM0YsV0FBVzBGLElBQVgsQ0FBZ0J4SyxLQUEzQjs7WUFFSUssU0FBU29LLElBQVQsQ0FBSixFQUFvQjtpQkFDWEssWUFBWUwsS0FBS0UsTUFBeEI7OztlQUdLRyxZQUFZTCxJQUFuQjs7O2FBR0tLLFNBQVA7O0dBbEJKOzs7QUNWRjs7Ozs7OztBQU9BLEFBQWUsbUJBQVV0SCxLQUFWLEVBQWlCc0IsVUFBakIsRUFBNkI7U0FDbkM7Ozs7Ozs7VUFBQSxrQkFPR2dHLFNBUEgsRUFPYztVQUNicEMsTUFBTTVELFdBQVdzRCxJQUFYLENBQWdCcEksS0FBMUI7VUFDSWdMLFFBQVFsRyxXQUFXNkQsS0FBWCxDQUFpQnFDLEtBQTdCO1VBQ0k5RSxVQUFVMUMsTUFBTXZCLFFBQU4sQ0FBZWlFLE9BQTdCO1VBQ0kyRSxhQUFhL0YsV0FBVzZELEtBQVgsQ0FBaUJrQyxVQUFsQzs7VUFFSTNFLFlBQVksUUFBaEIsRUFBMEI7ZUFDakI0RSxhQUFhRSxRQUFRLENBQVIsR0FBWUgsYUFBYSxDQUF0QyxDQUFQOzs7YUFHS0MsWUFBYUQsYUFBYTNFLE9BQTFCLEdBQXNDd0MsTUFBTXhDLE9BQW5EOztHQWpCSjs7O0FDQ0Y7Ozs7Ozs7QUFPQSxBQUFlLGtCQUFVMUMsS0FBVixFQUFpQnNCLFVBQWpCLEVBQTZCQyxNQUE3QixFQUFxQzs7Ozs7Ozs7TUFROUNzSixlQUFlLENBQ2pCQyxHQURpQixFQUVqQkMsSUFGaUIsRUFHakJDLE9BSGlCLEVBSWpCQyxRQUppQixFQUtqQkMsTUFMaUIsQ0FLVmxMLE1BQU1HLEVBTEksRUFLQSxDQUFDZ0wsR0FBRCxDQUxBLENBQW5COztTQU9POzs7Ozs7O1VBQUEsa0JBT0c3RCxTQVBILEVBT2M7V0FDWixJQUFJbEksSUFBSSxDQUFiLEVBQWdCQSxJQUFJeUwsYUFBYXhMLE1BQWpDLEVBQXlDRCxHQUF6QyxFQUE4QztZQUN4Q2dNLGNBQWNQLGFBQWF6TCxDQUFiLENBQWxCOztZQUVJcEMsV0FBV29PLFdBQVgsS0FBMkJwTyxXQUFXb08sY0FBY0MsTUFBekIsQ0FBL0IsRUFBaUU7c0JBQ25ERCxZQUFZcEwsS0FBWixFQUFtQnNCLFVBQW5CLEVBQStCQyxNQUEvQixFQUF1QzhKLE1BQXZDLENBQThDL0QsU0FBOUMsQ0FBWjtTQURGLE1BRU87ZUFDQSxnRkFBTDs7OzthQUlHQSxTQUFQOztHQWxCSjs7O0FDN0JhLG9CQUFVdEgsS0FBVixFQUFpQnNCLFVBQWpCLEVBQTZCQyxNQUE3QixFQUFxQztNQUM1QytKLFlBQVk7Ozs7Ozs7T0FBQSxlQU9YOU8sS0FQVyxFQU9KO1VBQ04rTyxZQUFZQyxRQUFReEwsS0FBUixFQUFlc0IsVUFBZixFQUEyQm1LLE1BQTNCLENBQWtDalAsS0FBbEMsQ0FBaEI7O2lCQUVXNkcsSUFBWCxDQUFnQitCLE9BQWhCLENBQXdCTixLQUF4QixDQUE4QnlHLFNBQTlCLG9CQUF5RCxDQUFDLENBQUQsR0FBS0EsU0FBOUQ7S0FWYzs7Ozs7Ozs7VUFBQSxvQkFrQk47aUJBQ0dsSSxJQUFYLENBQWdCK0IsT0FBaEIsQ0FBd0JOLEtBQXhCLENBQThCeUcsU0FBOUIsR0FBMEMsRUFBMUM7S0FuQmM7Ozs7OztpQkFBQSwyQkF5QkM7VUFDVGxNLFNBQVNpQyxXQUFXNkQsS0FBWCxDQUFpQjlGLE1BQWhDO1VBQ01HLFFBQVFRLE1BQU1SLEtBQXBCO1VBQ00yQyxVQUFVbkMsTUFBTXZCLFFBQU4sQ0FBZTBELE9BQS9COztVQUVJYixXQUFXYixHQUFYLENBQWVxQixRQUFmLENBQXdCLEdBQXhCLEtBQWdDUixXQUFXYixHQUFYLENBQWVxQixRQUFmLENBQXdCLElBQXhCLENBQXBDLEVBQW1FO2VBQzFEekMsVUFBVUcsUUFBUTJDLE9BQWxCLENBQVA7Ozs7YUFJSyxDQUFDM0MsUUFBUTJDLE9BQVQsSUFBb0I5QyxNQUEzQjtLQW5DYzs7Ozs7O3FCQUFBLCtCQXlDSztVQUNicU0saUJBQWlCcEssV0FBVzZELEtBQVgsQ0FBaUJrQyxVQUFqQixHQUE4QnJILE1BQU12QixRQUFOLENBQWUwRCxPQUFwRTs7VUFFSWIsV0FBV2IsR0FBWCxDQUFlcUIsUUFBZixDQUF3QixHQUF4QixLQUFnQ1IsV0FBV2IsR0FBWCxDQUFlcUIsUUFBZixDQUF3QixJQUF4QixDQUFwQyxFQUFtRTs7ZUFFMUQ0SixpQkFBaUIsQ0FBQyxDQUF6Qjs7O2FBR0tBLGNBQVA7O0dBakRKOzs7Ozs7O1NBMERPcE0sRUFBUCxDQUFVLE1BQVYsRUFBa0IsVUFBQ0ksT0FBRCxFQUFhO1FBQ3pCLENBQUNNLE1BQU15QyxNQUFOLENBQWEsVUFBYixDQUFELElBQTZCLENBQUNuQixXQUFXYixHQUFYLENBQWVxQixRQUFmLEVBQWxDLEVBQTZEO2FBQ3BEd0osVUFBVUssR0FBVixDQUFjak0sUUFBUWtNLFFBQXRCLENBQVA7OztlQUdTaEwsVUFBWCxDQUFzQmUsS0FBdEIsQ0FBNEIsWUFBTTthQUN6QmhDLElBQVAsQ0FBWSxnQkFBWjs7Z0JBRVVnTSxHQUFWLENBQWNySyxXQUFXNkQsS0FBWCxDQUFpQmtDLFVBQWpCLEdBQThCckgsTUFBTVIsS0FBbEQ7S0FIRjs7UUFNTXFNLGFBQWF2SyxXQUFXNkQsS0FBWCxDQUFpQmtDLFVBQWpCLEdBQThCL0YsV0FBV2dLLFNBQVgsQ0FBcUJRLGFBQXJCLEVBQWpEO1dBQ09SLFVBQVVLLEdBQVYsQ0FBY0UsYUFBYXZLLFdBQVdnSyxTQUFYLENBQXFCUyxpQkFBckIsRUFBM0IsQ0FBUDtHQVpGOzs7Ozs7U0FtQk96TSxFQUFQLENBQVUsU0FBVixFQUFxQixZQUFNO2NBQ2ZnRyxNQUFWO0dBREY7O1NBSU9nRyxTQUFQOzs7QUNsRmEscUJBQVV0TCxLQUFWLEVBQWlCc0IsVUFBakIsRUFBNkJDLE1BQTdCLEVBQXFDOzs7Ozs7O01BTzlDbEIsV0FBVyxLQUFmOztNQUVNTyxhQUFhOzs7Ozs7O1dBQUEsbUJBT1JvTCxRQVBRLEVBT0U7VUFDYnZOLFdBQVd1QixNQUFNdkIsUUFBckI7O1VBRUksQ0FBQzRCLFFBQUwsRUFBZTtlQUNIMkwsUUFBVixTQUFzQixLQUFLQyxRQUEzQixXQUF5Q3hOLFNBQVN5TixtQkFBbEQ7OzthQUdRRixRQUFWLGFBQTBCdk4sU0FBU3lOLG1CQUFuQztLQWRlOzs7Ozs7Ozs7T0FBQSxpQkF1Qlk7VUFBeEJGLFFBQXdCLHVFQUFiLFdBQWE7O2lCQUNoQjNJLElBQVgsQ0FBZ0IrQixPQUFoQixDQUF3Qk4sS0FBeEIsQ0FBOEJxSCxVQUE5QixHQUEyQyxLQUFLQyxPQUFMLENBQWFKLFFBQWIsQ0FBM0M7S0F4QmU7Ozs7Ozs7O1VBQUEsb0JBZ0NQO2lCQUNHM0ksSUFBWCxDQUFnQitCLE9BQWhCLENBQXdCTixLQUF4QixDQUE4QnFILFVBQTlCLEdBQTJDLEVBQTNDO0tBakNlOzs7Ozs7Ozs7U0FBQSxpQkEwQ1ZFLFFBMUNVLEVBMENBO2lCQUNKLFlBQU07O09BQWpCLEVBRUcsS0FBS0osUUFGUjtLQTNDZTs7Ozs7Ozs7VUFBQSxvQkFxRFA7aUJBQ0csS0FBWDs7V0FFS04sR0FBTDtLQXhEZTs7Ozs7Ozs7V0FBQSxxQkFnRU47aUJBQ0UsSUFBWDs7V0FFS0EsR0FBTDs7R0FuRUo7O1NBdUVPL0ssVUFBUCxFQUFtQixVQUFuQixFQUErQjs7Ozs7OztPQUFBLGlCQU90QjtVQUNEbkMsV0FBV3VCLE1BQU12QixRQUFyQjs7VUFFSXVCLE1BQU15QyxNQUFOLENBQWEsUUFBYixLQUEwQm5CLFdBQVdiLEdBQVgsQ0FBZTJHLE1BQTdDLEVBQXFEO2VBQzVDM0ksU0FBUzZOLGNBQWhCOzs7YUFHSzdOLFNBQVM4TixpQkFBaEI7O0dBZEo7Ozs7OztTQXNCT2pOLEVBQVAsQ0FBVSxNQUFWLEVBQWtCLFlBQU07ZUFDWHFNLEdBQVg7R0FERjs7Ozs7Ozs7U0FVT3JNLEVBQVAsQ0FBVSxDQUFDLGNBQUQsRUFBaUIsUUFBakIsRUFBMkIsZ0JBQTNCLENBQVYsRUFBd0QsWUFBTTtlQUNqRHVCLE9BQVg7R0FERjs7Ozs7O1NBUU92QixFQUFQLENBQVUsS0FBVixFQUFpQixZQUFNO2VBQ1Z5QyxNQUFYO0dBREY7Ozs7OztTQVFPekMsRUFBUCxDQUFVLFNBQVYsRUFBcUIsWUFBTTtlQUNkZ0csTUFBWDtHQURGOztTQUlPMUUsVUFBUDs7O0FDdElGOzs7Ozs7O0FBT0EsSUFBSTRMLGtCQUFrQixLQUF0Qjs7QUFFQSxJQUFJO01BQ0VDLE9BQU94TyxPQUFPRixjQUFQLENBQXNCLEVBQXRCLEVBQTBCLFNBQTFCLEVBQXFDO09BQUEsaUJBQ3ZDO3dCQUNhLElBQWxCOztHQUZPLENBQVg7O1NBTU82TCxnQkFBUCxDQUF3QixhQUF4QixFQUF1QyxJQUF2QyxFQUE2QzZDLElBQTdDO1NBQ081QyxtQkFBUCxDQUEyQixhQUEzQixFQUEwQyxJQUExQyxFQUFnRDRDLElBQWhEO0NBUkYsQ0FTRSxPQUFPQyxDQUFQLEVBQVU7O0FBRVosd0JBQWVGLGVBQWY7O0FDZEEsSUFBTUcsZUFBZSxDQUFDLFlBQUQsRUFBZSxXQUFmLENBQXJCO0FBQ0EsSUFBTUMsY0FBYyxDQUFDLFdBQUQsRUFBYyxXQUFkLENBQXBCO0FBQ0EsSUFBTUMsYUFBYSxDQUFDLFVBQUQsRUFBYSxhQUFiLEVBQTRCLFNBQTVCLEVBQXVDLFlBQXZDLENBQW5CO0FBQ0EsSUFBTUMsZUFBZSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQTJCLFNBQTNCLEVBQXNDLFlBQXRDLENBQXJCOztBQUVBLEFBQWUsZ0JBQVU5TSxLQUFWLEVBQWlCc0IsVUFBakIsRUFBNkJDLE1BQTdCLEVBQXFDOzs7Ozs7TUFNNUN1SSxTQUFTLElBQUlQLFlBQUosRUFBZjs7TUFFSXdELFdBQVcsQ0FBZjtNQUNJQyxjQUFjLENBQWxCO01BQ0lDLGNBQWMsQ0FBbEI7TUFDSTVNLFdBQVcsS0FBZjtNQUNJc0osVUFBVzZDLGlCQUFELEdBQW9CLEVBQUVVLFNBQVMsSUFBWCxFQUFwQixHQUF3QyxLQUF0RDs7TUFFTUMsUUFBUTs7Ozs7O1NBQUEsbUJBTUg7V0FDRkMsY0FBTDtLQVBVOzs7Ozs7Ozs7U0FBQSxpQkFnQkxsTyxLQWhCSyxFQWdCRTtVQUNSLENBQUNtQixRQUFELElBQWEsQ0FBQ0wsTUFBTUssUUFBeEIsRUFBa0M7YUFDM0JRLE9BQUw7O1lBRUl3TSxRQUFRLEtBQUtDLE9BQUwsQ0FBYXBPLEtBQWIsQ0FBWjs7bUJBRVcsSUFBWDtzQkFDYzNDLE1BQU04USxNQUFNRSxLQUFaLENBQWQ7c0JBQ2NoUixNQUFNOFEsTUFBTUcsS0FBWixDQUFkOzthQUVLQyxhQUFMO2FBQ0tDLFlBQUw7O2VBRU8vTixJQUFQLENBQVksYUFBWjs7S0E3QlE7Ozs7Ozs7O1FBQUEsZ0JBc0NOVCxLQXRDTSxFQXNDQztVQUNQLENBQUNjLE1BQU1LLFFBQVgsRUFBcUI7OEJBQ3VCTCxNQUFNdkIsUUFEN0I7WUFDYmtQLFVBRGEsbUJBQ2JBLFVBRGE7WUFDREMsVUFEQyxtQkFDREEsVUFEQztZQUNXL08sT0FEWCxtQkFDV0EsT0FEWDs7O1lBR2Z3TyxRQUFRLEtBQUtDLE9BQUwsQ0FBYXBPLEtBQWIsQ0FBWjs7WUFFSTJPLFVBQVV0UixNQUFNOFEsTUFBTUUsS0FBWixJQUFxQlAsV0FBbkM7WUFDSWMsVUFBVXZSLE1BQU04USxNQUFNRyxLQUFaLElBQXFCUCxXQUFuQztZQUNJYyxRQUFRakwsS0FBS2tMLEdBQUwsQ0FBU0gsV0FBVyxDQUFwQixDQUFaO1lBQ0lJLFFBQVFuTCxLQUFLa0wsR0FBTCxDQUFTRixXQUFXLENBQXBCLENBQVo7WUFDSUksa0JBQWtCcEwsS0FBS3FMLElBQUwsQ0FBVUosUUFBUUUsS0FBbEIsQ0FBdEI7WUFDSUcsZ0JBQWdCdEwsS0FBS3FMLElBQUwsQ0FBVUYsS0FBVixDQUFwQjs7bUJBRVduTCxLQUFLdUwsSUFBTCxDQUFVRCxnQkFBZ0JGLGVBQTFCLENBQVg7O1lBRUluQixXQUFXLEdBQVgsR0FBaUJqSyxLQUFLd0wsRUFBdEIsR0FBMkJYLFVBQS9CLEVBQTJDO2dCQUNuQ1ksZUFBTjs7cUJBRVd6TixJQUFYLENBQWdCSixJQUFoQixDQUFxQm1OLFVBQVVuUixRQUFRa1IsVUFBUixDQUEvQjs7cUJBRVd2SyxJQUFYLENBQWdCOEMsSUFBaEIsQ0FBcUJPLFNBQXJCLENBQStCeUIsR0FBL0IsQ0FBbUN0SixRQUFRMlAsUUFBM0M7O2lCQUVPN08sSUFBUCxDQUFZLFlBQVo7U0FQRixNQVFPO2lCQUNFLEtBQVA7OztLQTlETTs7Ozs7Ozs7O09BQUEsZUF5RVBULEtBekVPLEVBeUVBO1VBQ04sQ0FBQ2MsTUFBTUssUUFBWCxFQUFxQjtZQUNmNUIsV0FBV3VCLE1BQU12QixRQUFyQjs7WUFFSTRPLFFBQVEsS0FBS0MsT0FBTCxDQUFhcE8sS0FBYixDQUFaO1lBQ0l1UCxZQUFZLEtBQUtBLFNBQUwsQ0FBZXZQLEtBQWYsQ0FBaEI7O1lBRUl3UCxnQkFBZ0JyQixNQUFNRSxLQUFOLEdBQWNQLFdBQWxDO1lBQ0kyQixXQUFXNUIsV0FBVyxHQUFYLEdBQWlCakssS0FBS3dMLEVBQXJDO1lBQ0l0TSxRQUFRYyxLQUFLNkYsS0FBTCxDQUFXK0YsZ0JBQWdCcE4sV0FBVzZELEtBQVgsQ0FBaUJrQyxVQUE1QyxDQUFaOzthQUVLdEYsTUFBTDs7WUFFSTJNLGdCQUFnQkQsU0FBaEIsSUFBNkJFLFdBQVdsUSxTQUFTa1AsVUFBckQsRUFBaUU7O2NBRTNEbFAsU0FBU21RLFFBQWIsRUFBdUI7b0JBQ2I5TCxLQUFLK0wsR0FBTCxDQUFTN00sS0FBVCxFQUFnQnpGLE1BQU1rQyxTQUFTbVEsUUFBZixDQUFoQixDQUFSOzs7Y0FHRXROLFdBQVd5RCxTQUFYLENBQXFCd0MsRUFBckIsQ0FBd0IsS0FBeEIsQ0FBSixFQUFvQztvQkFDMUIsQ0FBQ3ZGLEtBQVQ7OztxQkFHU3ZCLEdBQVgsQ0FBZUMsSUFBZixDQUFvQlksV0FBV3lELFNBQVgsQ0FBcUIrSixPQUFyQixPQUFpQzlNLEtBQWpDLENBQXBCO1NBVkYsTUFXTyxJQUNMME0sZ0JBQWdCLENBQUNELFNBQWpCLElBQ0FFLFdBQVdsUSxTQUFTa1AsVUFGZixFQUdMOztjQUVJbFAsU0FBU21RLFFBQWIsRUFBdUI7b0JBQ2I5TCxLQUFLaUcsR0FBTCxDQUFTL0csS0FBVCxFQUFnQixDQUFDekYsTUFBTWtDLFNBQVNtUSxRQUFmLENBQWpCLENBQVI7OztjQUdFdE4sV0FBV3lELFNBQVgsQ0FBcUJ3QyxFQUFyQixDQUF3QixLQUF4QixDQUFKLEVBQW9DO29CQUMxQixDQUFDdkYsS0FBVDs7O3FCQUdTdkIsR0FBWCxDQUFlQyxJQUFmLENBQW9CWSxXQUFXeUQsU0FBWCxDQUFxQitKLE9BQXJCLE9BQWlDOU0sS0FBakMsQ0FBcEI7U0FiSyxNQWNBOztxQkFFTWxCLElBQVgsQ0FBZ0JKLElBQWhCOzs7bUJBR1MyQyxJQUFYLENBQWdCOEMsSUFBaEIsQ0FBcUJPLFNBQXJCLENBQStCcEIsTUFBL0IsQ0FBc0M3RyxTQUFTSSxPQUFULENBQWlCMlAsUUFBdkQ7O2FBRUtPLGVBQUw7YUFDS0MsY0FBTDs7ZUFFT3JQLElBQVAsQ0FBWSxXQUFaOztLQXpIUTs7Ozs7Ozs7a0JBQUEsNEJBa0lNOzs7VUFDWmxCLFdBQVd1QixNQUFNdkIsUUFBckI7O1VBRUlBLFNBQVN3USxjQUFiLEVBQTZCO2VBQ3BCM1AsRUFBUCxDQUFVcU4sYUFBYSxDQUFiLENBQVYsRUFBMkJyTCxXQUFXK0IsSUFBWCxDQUFnQitCLE9BQTNDLEVBQW9ELFVBQUNsRyxLQUFELEVBQVc7Z0JBQ3hEZ1EsS0FBTCxDQUFXaFEsS0FBWDtTQURGLEVBRUd5SyxPQUZIOzs7VUFLRWxMLFNBQVMwUSxhQUFiLEVBQTRCO2VBQ25CN1AsRUFBUCxDQUFVcU4sYUFBYSxDQUFiLENBQVYsRUFBMkJyTCxXQUFXK0IsSUFBWCxDQUFnQitCLE9BQTNDLEVBQW9ELFVBQUNsRyxLQUFELEVBQVc7Z0JBQ3hEZ1EsS0FBTCxDQUFXaFEsS0FBWDtTQURGLEVBRUd5SyxPQUZIOztLQTVJUTs7Ozs7Ozs7b0JBQUEsOEJBdUpRO2FBQ1hNLEdBQVAsQ0FBVzBDLGFBQWEsQ0FBYixDQUFYLEVBQTRCckwsV0FBVytCLElBQVgsQ0FBZ0IrQixPQUE1QyxFQUFxRHVFLE9BQXJEO2FBQ09NLEdBQVAsQ0FBVzBDLGFBQWEsQ0FBYixDQUFYLEVBQTRCckwsV0FBVytCLElBQVgsQ0FBZ0IrQixPQUE1QyxFQUFxRHVFLE9BQXJEO0tBekpVOzs7Ozs7OztpQkFBQSwyQkFpS0s7OzthQUNSckssRUFBUCxDQUFVc04sV0FBVixFQUF1QnRMLFdBQVcrQixJQUFYLENBQWdCK0IsT0FBdkMsRUFBZ0QxQixTQUFTLFVBQUN4RSxLQUFELEVBQVc7ZUFDN0RzQyxJQUFMLENBQVV0QyxLQUFWO09BRDhDLEVBRTdDYyxNQUFNdkIsUUFBTixDQUFlaUYsUUFGOEIsQ0FBaEQsRUFFNkJpRyxPQUY3QjtLQWxLVTs7Ozs7Ozs7bUJBQUEsNkJBNEtPO2FBQ1ZNLEdBQVAsQ0FBVzJDLFdBQVgsRUFBd0J0TCxXQUFXK0IsSUFBWCxDQUFnQitCLE9BQXhDLEVBQWlEdUUsT0FBakQ7S0E3S1U7Ozs7Ozs7O2dCQUFBLDBCQXFMSTs7O2FBQ1BySyxFQUFQLENBQVV1TixVQUFWLEVBQXNCdkwsV0FBVytCLElBQVgsQ0FBZ0IrQixPQUF0QyxFQUErQyxVQUFDbEcsS0FBRCxFQUFXO2VBQ25Ea1EsR0FBTCxDQUFTbFEsS0FBVDtPQURGO0tBdExVOzs7Ozs7OztrQkFBQSw0QkFnTU07YUFDVCtLLEdBQVAsQ0FBVzRDLFVBQVgsRUFBdUJ2TCxXQUFXK0IsSUFBWCxDQUFnQitCLE9BQXZDO0tBak1VOzs7Ozs7OztXQUFBLG1CQXlNSGxHLEtBek1HLEVBeU1JO1VBQ1Y0TixhQUFhckMsT0FBYixDQUFxQnZMLE1BQU1wQyxJQUEzQixJQUFtQyxDQUFDLENBQXhDLEVBQTJDO2VBQ2xDb0MsS0FBUDs7O2FBR0tBLE1BQU1vTyxPQUFOLENBQWMsQ0FBZCxLQUFvQnBPLE1BQU1tUSxjQUFOLENBQXFCLENBQXJCLENBQTNCO0tBOU1VOzs7Ozs7OzthQUFBLHFCQXNORG5RLEtBdE5DLEVBc05NO1VBQ1pULFdBQVd1QixNQUFNdkIsUUFBckI7O1VBRUlxTyxhQUFhckMsT0FBYixDQUFxQnZMLE1BQU1wQyxJQUEzQixJQUFtQyxDQUFDLENBQXhDLEVBQTJDO2VBQ2xDMkIsU0FBUzBRLGFBQWhCOzs7YUFHSzFRLFNBQVN3USxjQUFoQjtLQTdOVTs7Ozs7Ozs7VUFBQSxvQkFxT0Y7aUJBQ0csS0FBWDs7aUJBRVdyTyxVQUFYLENBQXNCbUIsTUFBdEI7O2FBRU8sSUFBUDtLQTFPVTs7Ozs7Ozs7V0FBQSxxQkFrUEQ7aUJBQ0UsSUFBWDs7aUJBRVduQixVQUFYLENBQXNCQyxPQUF0Qjs7YUFFTyxJQUFQOztHQXZQSjs7Ozs7O1NBK1BPdkIsRUFBUCxDQUFVLGFBQVYsRUFBeUIsWUFBTTtlQUNsQitELElBQVgsQ0FBZ0I4QyxJQUFoQixDQUFxQk8sU0FBckIsQ0FBK0J5QixHQUEvQixDQUFtQ25JLE1BQU12QixRQUFOLENBQWVJLE9BQWYsQ0FBdUJ5USxTQUExRDtHQURGOzs7Ozs7U0FRT2hRLEVBQVAsQ0FBVSxTQUFWLEVBQXFCLFlBQU07VUFDbkJpUSxnQkFBTjtVQUNNUixlQUFOO1VBQ01DLGNBQU47V0FDTzdFLE9BQVA7R0FKRjs7U0FPT2dELEtBQVA7OztBQ3JTYSxpQkFBVW5OLEtBQVYsRUFBaUJzQixVQUFqQixFQUE2QkMsTUFBN0IsRUFBcUM7Ozs7OztNQU01Q3VJLFNBQVMsSUFBSVAsWUFBSixFQUFmOztNQUVNaUcsU0FBUzs7Ozs7O1NBQUEsbUJBTUo7V0FDRnhGLElBQUw7S0FQVzs7Ozs7Ozs7UUFBQSxrQkFlTDthQUNDMUssRUFBUCxDQUFVLFdBQVYsRUFBdUJnQyxXQUFXK0IsSUFBWCxDQUFnQitCLE9BQXZDLEVBQWdELEtBQUtxSyxTQUFyRDtLQWhCVzs7Ozs7Ozs7VUFBQSxvQkF3Qkg7YUFDRHhGLEdBQVAsQ0FBVyxXQUFYLEVBQXdCM0ksV0FBVytCLElBQVgsQ0FBZ0IrQixPQUF4QztLQXpCVzs7Ozs7Ozs7YUFBQSxxQkFpQ0ZsRyxLQWpDRSxFQWlDSztZQUNWd1EsY0FBTjs7R0FsQ0o7Ozs7OztTQTBDT3BRLEVBQVAsQ0FBVSxTQUFWLEVBQXFCLFlBQU07V0FDbEI0SyxNQUFQO1dBQ09DLE9BQVA7R0FGRjs7U0FLT3FGLE1BQVA7OztBQ3JEYSxrQkFBVXhQLEtBQVYsRUFBaUJzQixVQUFqQixFQUE2QkMsTUFBN0IsRUFBcUM7Ozs7OztNQU01Q3VJLFNBQVMsSUFBSVAsWUFBSixFQUFmOzs7Ozs7Ozs7TUFTSW9HLFdBQVcsS0FBZjs7Ozs7Ozs7O01BU0lDLFlBQVksS0FBaEI7O01BRU1DLFVBQVU7Ozs7OztTQUFBLG1CQU1MOzs7Ozs7O1dBT0ZDLEVBQUwsR0FBVXhPLFdBQVcrQixJQUFYLENBQWdCK0IsT0FBaEIsQ0FBd0IySyxnQkFBeEIsQ0FBeUMsR0FBekMsQ0FBVjs7V0FFSy9GLElBQUw7S0FmWTs7Ozs7Ozs7UUFBQSxrQkF1Qk47YUFDQzFLLEVBQVAsQ0FBVSxPQUFWLEVBQW1CZ0MsV0FBVytCLElBQVgsQ0FBZ0IrQixPQUFuQyxFQUE0QyxLQUFLNEssS0FBakQ7S0F4Qlk7Ozs7Ozs7O1VBQUEsb0JBZ0NKO2FBQ0QvRixHQUFQLENBQVcsT0FBWCxFQUFvQjNJLFdBQVcrQixJQUFYLENBQWdCK0IsT0FBcEM7S0FqQ1k7Ozs7Ozs7OztTQUFBLGlCQTBDUGxHLEtBMUNPLEVBMENBO1VBQ1IwUSxTQUFKLEVBQWU7Y0FDUHJCLGVBQU47Y0FDTW1CLGNBQU47O0tBN0NVOzs7Ozs7OztVQUFBLG9CQXNESjtrQkFDSSxJQUFaOztVQUVJLENBQUNDLFFBQUwsRUFBZTthQUNSLElBQUl2USxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS21KLEtBQUwsQ0FBV2xKLE1BQS9CLEVBQXVDRCxHQUF2QyxFQUE0QztlQUNyQ21KLEtBQUwsQ0FBV25KLENBQVgsRUFBYzZRLFNBQWQsR0FBMEIsS0FBMUI7O2VBRUsxSCxLQUFMLENBQVduSixDQUFYLEVBQWM4USxZQUFkLENBQ0UsV0FERixFQUVFLEtBQUszSCxLQUFMLENBQVduSixDQUFYLEVBQWMrUSxZQUFkLENBQTJCLE1BQTNCLENBRkY7O2VBS0s1SCxLQUFMLENBQVduSixDQUFYLEVBQWNnUixlQUFkLENBQThCLE1BQTlCOzs7bUJBR1MsSUFBWDs7O2FBR0ssSUFBUDtLQXhFWTs7Ozs7Ozs7VUFBQSxvQkFnRko7a0JBQ0ksS0FBWjs7VUFFSVQsUUFBSixFQUFjO2FBQ1AsSUFBSXZRLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLbUosS0FBTCxDQUFXbEosTUFBL0IsRUFBdUNELEdBQXZDLEVBQTRDO2VBQ3JDbUosS0FBTCxDQUFXbkosQ0FBWCxFQUFjNlEsU0FBZCxHQUEwQixJQUExQjs7ZUFFSzFILEtBQUwsQ0FBV25KLENBQVgsRUFBYzhRLFlBQWQsQ0FDRSxNQURGLEVBRUUsS0FBSzNILEtBQUwsQ0FBV25KLENBQVgsRUFBYytRLFlBQWQsQ0FBMkIsV0FBM0IsQ0FGRjs7O21CQU1TLEtBQVg7OzthQUdLLElBQVA7O0dBaEdKOztTQW9HT04sT0FBUCxFQUFnQixPQUFoQixFQUF5Qjs7Ozs7O09BQUEsaUJBTWhCO2FBQ0VBLFFBQVFDLEVBQWY7O0dBUEo7Ozs7OztTQWVPeFEsRUFBUCxDQUFVLFlBQVYsRUFBd0IsWUFBTTtZQUNwQitRLE1BQVI7R0FERjs7Ozs7O1NBUU8vUSxFQUFQLENBQVUsV0FBVixFQUF1QixZQUFNO2VBQ2hCc0IsVUFBWCxDQUFzQmUsS0FBdEIsQ0FBNEIsWUFBTTtjQUN4QjJPLE1BQVI7S0FERjtHQURGOzs7Ozs7U0FVT2hSLEVBQVAsQ0FBVSxTQUFWLEVBQXFCLFlBQU07WUFDakJnUixNQUFSO1lBQ1FwRyxNQUFSO1dBQ09DLE9BQVA7R0FIRjs7U0FNTzBGLE9BQVA7OztBQ25LRixJQUFNVSxlQUFlLGlDQUFyQjtBQUNBLElBQU1DLG9CQUFvQiw2QkFBMUI7O0FBRUEsQUFBZSxtQkFBVXhRLEtBQVYsRUFBaUJzQixVQUFqQixFQUE2QkMsTUFBN0IsRUFBcUM7Ozs7OztNQU01Q3VJLFNBQVMsSUFBSVAsWUFBSixFQUFmOztNQUVJSSxVQUFXNkMsaUJBQUQsR0FBb0IsRUFBRVUsU0FBUyxJQUFYLEVBQXBCLEdBQXdDLEtBQXREOztNQUVNdUQsV0FBVzs7Ozs7OztTQUFBLG1CQU9OOzs7Ozs7O1dBT0ZDLEVBQUwsR0FBVXBQLFdBQVcrQixJQUFYLENBQWdCOEMsSUFBaEIsQ0FBcUI0SixnQkFBckIsQ0FBc0NRLFlBQXRDLENBQVY7Ozs7Ozs7O1dBUUtyUSxFQUFMLEdBQVVvQixXQUFXK0IsSUFBWCxDQUFnQjhDLElBQWhCLENBQXFCNEosZ0JBQXJCLENBQXNDUyxpQkFBdEMsQ0FBVjs7V0FFS0csV0FBTDtLQXhCYTs7Ozs7Ozs7YUFBQSx1QkFnQ0Y7V0FDTixJQUFJdlIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtzUixFQUFMLENBQVFyUixNQUE1QixFQUFvQ0QsR0FBcEMsRUFBeUM7YUFDbEN1TCxRQUFMLENBQWMsS0FBSytGLEVBQUwsQ0FBUXRSLENBQVIsRUFBV2lHLFFBQXpCOztLQWxDVzs7Ozs7Ozs7Z0JBQUEsMEJBMkNDO1dBQ1QsSUFBSWpHLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLc1IsRUFBTCxDQUFRclIsTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO2FBQ2xDc0wsV0FBTCxDQUFpQixLQUFLZ0csRUFBTCxDQUFRdFIsQ0FBUixFQUFXaUcsUUFBNUI7O0tBN0NXOzs7Ozs7Ozs7WUFBQSxvQkF1REx1TCxRQXZESyxFQXVESztVQUNkblMsV0FBV3VCLE1BQU12QixRQUFyQjtVQUNJb0IsT0FBTytRLFNBQVM1USxNQUFNUixLQUFmLENBQVg7O1VBRUlLLElBQUosRUFBVTthQUNINkcsU0FBTCxDQUFleUIsR0FBZixDQUFtQjFKLFNBQVNJLE9BQVQsQ0FBaUJnUyxTQUFwQzs7aUJBRVNoUixJQUFULEVBQWVELE9BQWYsQ0FBdUIsbUJBQVc7a0JBQ3hCOEcsU0FBUixDQUFrQnBCLE1BQWxCLENBQXlCN0csU0FBU0ksT0FBVCxDQUFpQmdTLFNBQTFDO1NBREY7O0tBOURXOzs7Ozs7Ozs7ZUFBQSx1QkEwRUZELFFBMUVFLEVBMEVRO1VBQ2pCL1EsT0FBTytRLFNBQVM1USxNQUFNUixLQUFmLENBQVg7O1VBRUlLLElBQUosRUFBVTthQUNINkcsU0FBTCxDQUFlcEIsTUFBZixDQUFzQnRGLE1BQU12QixRQUFOLENBQWVJLE9BQWYsQ0FBdUJnUyxTQUE3Qzs7S0E5RVc7Ozs7Ozs7O2VBQUEseUJBdUZBO1dBQ1IsSUFBSXpSLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLYyxFQUFMLENBQVFiLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QzthQUNsQzRLLElBQUwsQ0FBVSxLQUFLOUosRUFBTCxDQUFRZCxDQUFSLEVBQVdpRyxRQUFyQjs7S0F6Rlc7Ozs7Ozs7O2tCQUFBLDRCQWtHRztXQUNYLElBQUlqRyxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS2MsRUFBTCxDQUFRYixNQUE1QixFQUFvQ0QsR0FBcEMsRUFBeUM7YUFDbEM4SyxNQUFMLENBQVksS0FBS2hLLEVBQUwsQ0FBUWQsQ0FBUixFQUFXaUcsUUFBdkI7O0tBcEdXOzs7Ozs7Ozs7UUFBQSxnQkE4R1R5TCxRQTlHUyxFQThHQztXQUNULElBQUkxUixJQUFJLENBQWIsRUFBZ0JBLElBQUkwUixTQUFTelIsTUFBN0IsRUFBcUNELEdBQXJDLEVBQTBDO2VBQ2pDRSxFQUFQLENBQVUsT0FBVixFQUFtQndSLFNBQVMxUixDQUFULENBQW5CLEVBQWdDLEtBQUs0USxLQUFyQztlQUNPMVEsRUFBUCxDQUFVLFlBQVYsRUFBd0J3UixTQUFTMVIsQ0FBVCxDQUF4QixFQUFxQyxLQUFLNFEsS0FBMUMsRUFBaURyRyxPQUFqRDs7S0FqSFc7Ozs7Ozs7OztVQUFBLGtCQTJIUG1ILFFBM0hPLEVBMkhHO1dBQ1gsSUFBSTFSLElBQUksQ0FBYixFQUFnQkEsSUFBSTBSLFNBQVN6UixNQUE3QixFQUFxQ0QsR0FBckMsRUFBMEM7ZUFDakM2SyxHQUFQLENBQVcsQ0FBQyxPQUFELEVBQVUsWUFBVixDQUFYLEVBQW9DNkcsU0FBUzFSLENBQVQsQ0FBcEM7O0tBN0hXOzs7Ozs7Ozs7OztTQUFBLGlCQXlJUkYsS0F6SVEsRUF5SUQ7WUFDTndRLGNBQU47O2lCQUVXalAsR0FBWCxDQUFlQyxJQUFmLENBQW9CWSxXQUFXeUQsU0FBWCxDQUFxQitKLE9BQXJCLENBQTZCNVAsTUFBTTZSLGFBQU4sQ0FBb0JaLFlBQXBCLENBQWlDLGdCQUFqQyxDQUE3QixDQUFwQjs7R0E1SUo7O1NBZ0pPTSxRQUFQLEVBQWlCLE9BQWpCLEVBQTBCOzs7Ozs7T0FBQSxpQkFNakI7YUFDRUEsU0FBU3ZRLEVBQWhCOztHQVBKOzs7Ozs7O1NBZ0JPWixFQUFQLENBQVUsQ0FBQyxhQUFELEVBQWdCLFlBQWhCLENBQVYsRUFBeUMsWUFBTTthQUNwQzBSLFNBQVQ7R0FERjs7Ozs7O1NBUU8xUixFQUFQLENBQVUsU0FBVixFQUFxQixZQUFNO2FBQ2hCMlIsY0FBVDthQUNTQyxZQUFUO1dBQ08vRyxPQUFQO0dBSEY7O1NBTU9zRyxRQUFQOzs7QUMvTGEsbUJBQVV6USxLQUFWLEVBQWlCc0IsVUFBakIsRUFBNkJDLE1BQTdCLEVBQXFDOzs7Ozs7TUFNNUN1SSxTQUFTLElBQUlQLFlBQUosRUFBZjs7TUFFTTRILFdBQVc7Ozs7OztTQUFBLG1CQU1OO1VBQ0huUixNQUFNdkIsUUFBTixDQUFlMlMsUUFBbkIsRUFBNkI7YUFDdEJwSCxJQUFMOztLQVJXOzs7Ozs7OztRQUFBLGtCQWlCUDthQUNDMUssRUFBUCxDQUFVLE9BQVYsRUFBbUJ3SCxRQUFuQixFQUE2QixLQUFLdUssS0FBbEM7S0FsQmE7Ozs7Ozs7O1VBQUEsb0JBMEJMO2FBQ0RwSCxHQUFQLENBQVcsT0FBWCxFQUFvQm5ELFFBQXBCO0tBM0JhOzs7Ozs7Ozs7U0FBQSxpQkFvQ1I1SCxLQXBDUSxFQW9DRDtVQUNSQSxNQUFNb1MsT0FBTixLQUFrQixFQUF0QixFQUEwQjttQkFDYjdRLEdBQVgsQ0FBZUMsSUFBZixDQUFvQlksV0FBV3lELFNBQVgsQ0FBcUIrSixPQUFyQixDQUE2QixHQUE3QixDQUFwQjs7O1VBR0U1UCxNQUFNb1MsT0FBTixLQUFrQixFQUF0QixFQUEwQjttQkFDYjdRLEdBQVgsQ0FBZUMsSUFBZixDQUFvQlksV0FBV3lELFNBQVgsQ0FBcUIrSixPQUFyQixDQUE2QixHQUE3QixDQUFwQjs7O0dBMUNOOzs7Ozs7O1NBb0RPeFAsRUFBUCxDQUFVLENBQUMsU0FBRCxFQUFZLFFBQVosQ0FBVixFQUFpQyxZQUFNO2FBQzVCNEssTUFBVDtHQURGOzs7Ozs7U0FRTzVLLEVBQVAsQ0FBVSxRQUFWLEVBQW9CLFlBQU07YUFDZmpDLEtBQVQ7R0FERjs7Ozs7O1NBUU9pQyxFQUFQLENBQVUsU0FBVixFQUFxQixZQUFNO1dBQ2xCNkssT0FBUDtHQURGOztTQUlPZ0gsUUFBUDs7O0FDN0VhLG1CQUFVblIsS0FBVixFQUFpQnNCLFVBQWpCLEVBQTZCQyxNQUE3QixFQUFxQzs7Ozs7O01BTTVDdUksU0FBUyxJQUFJUCxZQUFKLEVBQWY7O01BRU1nSSxXQUFXOzs7Ozs7U0FBQSxtQkFNTjtXQUNGckMsS0FBTDs7VUFFSWxQLE1BQU12QixRQUFOLENBQWUrUyxVQUFuQixFQUErQjthQUN4QnhILElBQUw7O0tBVlc7Ozs7Ozs7OztTQUFBLG1CQW9CTjs7O1VBQ0hoSyxNQUFNdkIsUUFBTixDQUFldUMsUUFBbkIsRUFBNkI7WUFDdkIvRCxZQUFZLEtBQUtrRSxFQUFqQixDQUFKLEVBQTBCO2VBQ25CQSxFQUFMLEdBQVVzUSxZQUFZLFlBQU07a0JBQ3JCQyxJQUFMOzt1QkFFV2pSLEdBQVgsQ0FBZUMsSUFBZixDQUFvQixHQUFwQjs7a0JBRUt3TyxLQUFMO1dBTFEsRUFNUCxLQUFLeUMsSUFORSxDQUFWOzs7S0F2QlM7Ozs7Ozs7O1FBQUEsa0JBdUNQO1dBQ0R4USxFQUFMLEdBQVV5USxjQUFjLEtBQUt6USxFQUFuQixDQUFWO0tBeENhOzs7Ozs7OztRQUFBLGtCQWdEUDs7O2FBQ0M3QixFQUFQLENBQVUsV0FBVixFQUF1QmdDLFdBQVcrQixJQUFYLENBQWdCOEMsSUFBdkMsRUFBNkMsWUFBTTtlQUM1Q3VMLElBQUw7T0FERjs7YUFJT3BTLEVBQVAsQ0FBVSxVQUFWLEVBQXNCZ0MsV0FBVytCLElBQVgsQ0FBZ0I4QyxJQUF0QyxFQUE0QyxZQUFNO2VBQzNDK0ksS0FBTDtPQURGO0tBckRhOzs7Ozs7OztVQUFBLG9CQStETDthQUNEakYsR0FBUCxDQUFXLENBQUMsV0FBRCxFQUFjLFVBQWQsQ0FBWCxFQUFzQzNJLFdBQVcrQixJQUFYLENBQWdCOEMsSUFBdEQ7O0dBaEVKOztTQW9FT29MLFFBQVAsRUFBaUIsTUFBakIsRUFBeUI7Ozs7Ozs7T0FBQSxpQkFPaEI7VUFDRHZRLFdBQVdNLFdBQVcrQixJQUFYLENBQWdCQyxNQUFoQixDQUF1QnRELE1BQU1SLEtBQTdCLEVBQW9DMlEsWUFBcEMsQ0FBaUQscUJBQWpELENBQWY7O1VBRUluUCxRQUFKLEVBQWM7ZUFDTHpFLE1BQU15RSxRQUFOLENBQVA7OzthQUdLekUsTUFBTXlELE1BQU12QixRQUFOLENBQWV1QyxRQUFyQixDQUFQOztHQWRKOzs7Ozs7O1NBdUJPMUIsRUFBUCxDQUFVLENBQUMsU0FBRCxFQUFZLFFBQVosQ0FBVixFQUFpQyxZQUFNO2FBQzVCNEssTUFBVDtHQURGOzs7Ozs7Ozs7O1NBWU81SyxFQUFQLENBQVUsQ0FBQyxZQUFELEVBQWUsT0FBZixFQUF3QixTQUF4QixFQUFtQyxhQUFuQyxFQUFrRCxRQUFsRCxDQUFWLEVBQXVFLFlBQU07YUFDbEVvUyxJQUFUO0dBREY7Ozs7Ozs7O1NBVU9wUyxFQUFQLENBQVUsQ0FBQyxXQUFELEVBQWMsTUFBZCxFQUFzQixXQUF0QixDQUFWLEVBQThDLFlBQU07YUFDekM0UCxLQUFUO0dBREY7Ozs7OztTQVFPNVAsRUFBUCxDQUFVLFFBQVYsRUFBb0IsWUFBTTthQUNmakMsS0FBVDtHQURGOzs7Ozs7U0FRT2lDLEVBQVAsQ0FBVSxTQUFWLEVBQXFCLFlBQU07V0FDbEI2SyxPQUFQO0dBREY7O1NBSU9vSCxRQUFQOzs7QUMzSUY7Ozs7OztBQU1BLFNBQVNNLGVBQVQsQ0FBMEJDLE1BQTFCLEVBQWtDO01BQzVCalYsU0FBU2lWLE1BQVQsQ0FBSixFQUFzQjtXQUNiOVQsU0FBUzhULE1BQVQsQ0FBUDtHQURGLE1BRU87Ozs7U0FJQSxFQUFQOzs7QUFHRixBQUFlLHNCQUFVOVIsS0FBVixFQUFpQnNCLFVBQWpCLEVBQTZCQyxNQUE3QixFQUFxQzs7Ozs7O01BTTVDdUksU0FBUyxJQUFJUCxZQUFKLEVBQWY7Ozs7Ozs7TUFPSTlLLFdBQVd1QixNQUFNdkIsUUFBckI7Ozs7Ozs7OztNQVNJcVQsU0FBU0QsZ0JBQWdCcFQsU0FBU00sV0FBekIsQ0FBYjs7Ozs7OztNQU9JUCxXQUFXRyxTQUFjLEVBQWQsRUFBa0JGLFFBQWxCLENBQWY7O01BRU1zVCxjQUFjOzs7Ozs7O1NBQUEsaUJBT1hELE1BUFcsRUFPSDtVQUNULE9BQU85TCxPQUFPZ00sVUFBZCxLQUE2QixXQUFqQyxFQUE4QzthQUN2QyxJQUFJQyxLQUFULElBQWtCSCxNQUFsQixFQUEwQjtjQUNwQkEsT0FBT2xULGNBQVAsQ0FBc0JxVCxLQUF0QixDQUFKLEVBQWtDO2dCQUM1QmpNLE9BQU9nTSxVQUFQLGtCQUFpQ0MsS0FBakMsVUFBNkNDLE9BQWpELEVBQTBEO3FCQUNqREosT0FBT0csS0FBUCxDQUFQOzs7Ozs7YUFNRHpULFFBQVA7O0dBbEJKOzs7Ozs7V0EwQmNDLFFBQWQsRUFBd0JzVCxZQUFZSSxLQUFaLENBQWtCTCxNQUFsQixDQUF4Qjs7Ozs7O1NBTU94UyxFQUFQLENBQVUsUUFBVixFQUFvQjBHLE1BQXBCLEVBQTRCdEMsU0FBUyxZQUFNO1VBQ25DakYsUUFBTixHQUFpQkYsYUFBYUUsUUFBYixFQUF1QnNULFlBQVlJLEtBQVosQ0FBa0JMLE1BQWxCLENBQXZCLENBQWpCO0dBRDBCLEVBRXpCOVIsTUFBTXZCLFFBQU4sQ0FBZWlGLFFBRlUsQ0FBNUI7Ozs7OztTQVFPcEUsRUFBUCxDQUFVLFFBQVYsRUFBb0IsWUFBTTthQUNmdVMsZ0JBQWdCQyxNQUFoQixDQUFUOztlQUVXblQsU0FBYyxFQUFkLEVBQWtCRixRQUFsQixDQUFYO0dBSEY7Ozs7OztTQVVPYSxFQUFQLENBQVUsU0FBVixFQUFxQixZQUFNO1dBQ2xCMkssR0FBUCxDQUFXLFFBQVgsRUFBcUJqRSxNQUFyQjtHQURGOztTQUlPK0wsV0FBUDs7O0FDckZGLElBQU1LLGFBQWE7WUFBQTtzQkFBQTt3QkFBQTtzQkFBQTtZQUFBO2NBQUE7WUFBQTtZQUFBO2dCQUFBO2dCQUFBO2NBQUE7O0NBQW5COztJQXlCcUJwUzs7Ozs7Ozs7Ozs0QkFDSztVQUFqQnpDLFVBQWlCLHVFQUFKLEVBQUk7O3NIQUNIb0IsU0FBYyxFQUFkLEVBQWtCeVQsVUFBbEIsRUFBOEI3VSxVQUE5QixDQUFuQjs7OztFQUYrQjhVOzs7OzsifQ==
