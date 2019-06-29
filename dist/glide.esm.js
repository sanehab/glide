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
    key: 'mount',
    value: function mount$$1() {
      var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._e.emit('mount.before');

      if (isObject(extensions)) {
        this._c = mount(this, extensions, this._e);
      } else {
        warn('You need to provide a object on `mount()`');
      }

      this._e.emit('mount.after');

      return this;
    }

    /**
     * Collects an instance `translate` transformers.
     *
     * @param  {Array} transformers Collection of transformers.
     * @return {Void}
     */

  }, {
    key: 'mutate',
    value: function mutate() {
      var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (isArray(transformers)) {
        this._t = transformers;
      } else {
        warn('You need to provide a array on `mutate()`');
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
    key: 'update',
    value: function update() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.settings = mergeOptions(this.settings, settings);

      if (settings.hasOwnProperty('startAt')) {
        this.index = settings.startAt;
      }

      this._e.emit('update');

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
    key: 'go',
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
    key: 'move',
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
    key: 'destroy',
    value: function destroy() {
      this._e.emit('destroy');

      return this;
    }

    /**
     * Start instance autoplaying.
     *
     * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Glide}
     */

  }, {
    key: 'play',
    value: function play() {
      var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (interval) {
        this.settings.autoplay = interval;
      }

      this._e.emit('play');

      return this;
    }

    /**
     * Stop instance autoplaying.
     *
     * @return {Glide}
     */

  }, {
    key: 'pause',
    value: function pause() {
      this._e.emit('pause');

      return this;
    }

    /**
     * Sets glide into a idle status.
     *
     * @return {Glide}
     */

  }, {
    key: 'disable',
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
    key: 'enable',
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
    key: 'on',
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
    key: 'isType',
    value: function isType(name) {
      return this.settings.type === name;
    }

    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */

  }, {
    key: 'settings',
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
        warn('Options must be an `object` instance.');
      }
    }

    /**
     * Gets current index of the slider.
     *
     * @return {Object}
     */

  }, {
    key: 'index',
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
    key: 'type',
    get: function get$$1() {
      return this.settings.type;
    }

    /**
     * Gets value of the idle status.
     *
     * @return {Boolean}
     */

  }, {
    key: 'disabled',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xpZGUuZXNtLmpzIiwic291cmNlcyI6WyIuLi9zcmMvZGVmYXVsdHMuanMiLCIuLi9zcmMvdXRpbHMvbG9nLmpzIiwiLi4vc3JjL3V0aWxzL3VuaXQuanMiLCIuLi9zcmMvY29yZS9pbmRleC5qcyIsIi4uL3NyYy91dGlscy9vYmplY3QuanMiLCIuLi9zcmMvY29yZS9ldmVudC9ldmVudHMtYnVzLmpzIiwiLi4vc3JjL2luZGV4LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcnVuLmpzIiwiLi4vc3JjL3V0aWxzL3RpbWUuanMiLCIuLi9zcmMvdXRpbHMvd2FpdC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2dhcHMuanMiLCIuLi9zcmMvdXRpbHMvZG9tLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvaHRtbC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3BlZWsuanMiLCIuLi9zcmMvY29tcG9uZW50cy9tb3ZlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvc2l6ZXMuanMiLCIuLi9zcmMvY29tcG9uZW50cy9idWlsZC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2Nsb25lcy5qcyIsIi4uL3NyYy9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9yZXNpemUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9kaXJlY3Rpb24uanMiLCIuLi9zcmMvbXV0YXRvci90cmFuc2Zvcm1lcnMvcnRsLmpzIiwiLi4vc3JjL211dGF0b3IvdHJhbnNmb3JtZXJzL2dhcC5qcyIsIi4uL3NyYy9tdXRhdG9yL3RyYW5zZm9ybWVycy9ncm93LmpzIiwiLi4vc3JjL211dGF0b3IvdHJhbnNmb3JtZXJzL3BlZWtpbmcuanMiLCIuLi9zcmMvbXV0YXRvci90cmFuc2Zvcm1lcnMvZm9jdXNpbmcuanMiLCIuLi9zcmMvbXV0YXRvci9pbmRleC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3RyYW5zbGF0ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3RyYW5zaXRpb24uanMiLCIuLi9zcmMvdXRpbHMvZGV0ZWN0LXBhc3NpdmUtZXZlbnQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9zd2lwZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2ltYWdlcy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2FuY2hvcnMuanMiLCIuLi9zcmMvY29tcG9uZW50cy9jb250cm9scy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2tleWJvYXJkLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvYXV0b3BsYXkuanMiLCIuLi9zcmMvY29tcG9uZW50cy9icmVha3BvaW50cy5qcyIsIi4uL2VudHJ5L2VudHJ5LWNvbXBsZXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIFR5cGUgb2YgdGhlIG1vdmVtZW50LlxuICAgKlxuICAgKiBBdmFpbGFibGUgdHlwZXM6XG4gICAqIGBzbGlkZXJgIC0gUmV3aW5kcyBzbGlkZXIgdG8gdGhlIHN0YXJ0L2VuZCB3aGVuIGl0IHJlYWNoZXMgdGhlIGZpcnN0IG9yIGxhc3Qgc2xpZGUuXG4gICAqIGBjYXJvdXNlbGAgLSBDaGFuZ2VzIHNsaWRlcyB3aXRob3V0IHN0YXJ0aW5nIG92ZXIgd2hlbiBpdCByZWFjaGVzIHRoZSBmaXJzdCBvciBsYXN0IHNsaWRlLlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgdHlwZTogJ3NsaWRlcicsXG5cbiAgLyoqXG4gICAqIFN0YXJ0IGF0IHNwZWNpZmljIHNsaWRlIG51bWJlciBkZWZpbmVkIHdpdGggemVyby1iYXNlZCBpbmRleC5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHN0YXJ0QXQ6IDAsXG5cbiAgLyoqXG4gICAqIEEgbnVtYmVyIG9mIHNsaWRlcyB2aXNpYmxlIG9uIHRoZSBzaW5nbGUgdmlld3BvcnQuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBwZXJWaWV3OiAxLFxuXG4gIC8qKlxuICAgKiBGb2N1cyBjdXJyZW50bHkgYWN0aXZlIHNsaWRlIGF0IGEgc3BlY2lmaWVkIHBvc2l0aW9uIGluIHRoZSB0cmFjay5cbiAgICpcbiAgICogQXZhaWxhYmxlIGlucHV0czpcbiAgICogYGNlbnRlcmAgLSBDdXJyZW50IHNsaWRlIHdpbGwgYmUgYWx3YXlzIGZvY3VzZWQgYXQgdGhlIGNlbnRlciBvZiBhIHRyYWNrLlxuICAgKiBgMCwxLDIsMy4uLmAgLSBDdXJyZW50IHNsaWRlIHdpbGwgYmUgZm9jdXNlZCBvbiB0aGUgc3BlY2lmaWVkIHplcm8tYmFzZWQgaW5kZXguXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd8TnVtYmVyfVxuICAgKi9cbiAgZm9jdXNBdDogMCxcblxuICAvKipcbiAgICogQSBzaXplIG9mIHRoZSBnYXAgYWRkZWQgYmV0d2VlbiBzbGlkZXMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnYXA6IDEwLFxuXG4gIC8qKlxuICAgKiBDaGFuZ2Ugc2xpZGVzIGFmdGVyIGEgc3BlY2lmaWVkIGludGVydmFsLiBVc2UgYGZhbHNlYCBmb3IgdHVybmluZyBvZmYgYXV0b3BsYXkuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIGF1dG9wbGF5OiBmYWxzZSxcblxuICAvKipcbiAgICogU3RvcCBhdXRvcGxheSBvbiBtb3VzZW92ZXIgZXZlbnQuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgaG92ZXJwYXVzZTogdHJ1ZSxcblxuICAvKipcbiAgICogQWxsb3cgZm9yIGNoYW5naW5nIHNsaWRlcyB3aXRoIGxlZnQgYW5kIHJpZ2h0IGtleWJvYXJkIGFycm93cy5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBrZXlib2FyZDogdHJ1ZSxcblxuICAvKipcbiAgICogU3RvcCBydW5uaW5nIGBwZXJWaWV3YCBudW1iZXIgb2Ygc2xpZGVzIGZyb20gdGhlIGVuZC4gVXNlIHRoaXNcbiAgICogb3B0aW9uIGlmIHlvdSBkb24ndCB3YW50IHRvIGhhdmUgYW4gZW1wdHkgc3BhY2UgYWZ0ZXJcbiAgICogYSBzbGlkZXIuIFdvcmtzIG9ubHkgd2l0aCBgc2xpZGVyYCB0eXBlIGFuZCBhXG4gICAqIG5vbi1jZW50ZXJlZCBgZm9jdXNBdGAgc2V0dGluZy5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBib3VuZDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIE1pbmltYWwgc3dpcGUgZGlzdGFuY2UgbmVlZGVkIHRvIGNoYW5nZSB0aGUgc2xpZGUuIFVzZSBgZmFsc2VgIGZvciB0dXJuaW5nIG9mZiBhIHN3aXBpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIHN3aXBlVGhyZXNob2xkOiA4MCxcblxuICAvKipcbiAgICogTWluaW1hbCBtb3VzZSBkcmFnIGRpc3RhbmNlIG5lZWRlZCB0byBjaGFuZ2UgdGhlIHNsaWRlLiBVc2UgYGZhbHNlYCBmb3IgdHVybmluZyBvZmYgYSBkcmFnZ2luZy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgZHJhZ1RocmVzaG9sZDogMTIwLFxuXG4gIC8qKlxuICAgKiBBIG1heGltdW0gbnVtYmVyIG9mIHNsaWRlcyB0byB3aGljaCBtb3ZlbWVudCB3aWxsIGJlIG1hZGUgb24gc3dpcGluZyBvciBkcmFnZ2luZy4gVXNlIGBmYWxzZWAgZm9yIHVubGltaXRlZC5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgcGVyVG91Y2g6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBNb3ZpbmcgZGlzdGFuY2UgcmF0aW8gb2YgdGhlIHNsaWRlcyBvbiBhIHN3aXBpbmcgYW5kIGRyYWdnaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgdG91Y2hSYXRpbzogMC41LFxuXG4gIC8qKlxuICAgKiBBbmdsZSByZXF1aXJlZCB0byBhY3RpdmF0ZSBzbGlkZXMgbW92aW5nIG9uIHN3aXBpbmcgb3IgZHJhZ2dpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICB0b3VjaEFuZ2xlOiA0NSxcblxuICAvKipcbiAgICogRHVyYXRpb24gb2YgdGhlIGFuaW1hdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBhbmltYXRpb25EdXJhdGlvbjogNDAwLFxuXG4gIC8qKlxuICAgKiBBbGxvd3MgbG9vcGluZyB0aGUgYHNsaWRlcmAgdHlwZS4gU2xpZGVyIHdpbGwgcmV3aW5kIHRvIHRoZSBmaXJzdC9sYXN0IHNsaWRlIHdoZW4gaXQncyBhdCB0aGUgc3RhcnQvZW5kLlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIHJld2luZDogdHJ1ZSxcblxuICAvKipcbiAgICogRHVyYXRpb24gb2YgdGhlIHJld2luZGluZyBhbmltYXRpb24gb2YgdGhlIGBzbGlkZXJgIHR5cGUgaW4gbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgcmV3aW5kRHVyYXRpb246IDgwMCxcblxuICAvKipcbiAgICogRWFzaW5nIGZ1bmN0aW9uIGZvciB0aGUgYW5pbWF0aW9uLlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgYW5pbWF0aW9uVGltaW5nRnVuYzogJ2N1YmljLWJlemllciguMTY1LCAuODQwLCAuNDQwLCAxKScsXG5cbiAgLyoqXG4gICAqIFdhaXQgZm9yIHRoZSBhbmltYXRpb24gdG8gZmluaXNoIHVudGlsIHRoZSBuZXh0IHVzZXIgaW5wdXQgY2FuIGJlIHByb2Nlc3NlZFxuICAgKlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHdhaXRGb3JUcmFuc2l0aW9uOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBUaHJvdHRsZSBjb3N0bHkgZXZlbnRzIGF0IG1vc3Qgb25jZSBwZXIgZXZlcnkgd2FpdCBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICB0aHJvdHRsZTogMTAsXG5cbiAgLyoqXG4gICAqIE1vdmluZyBkaXJlY3Rpb24gbW9kZS5cbiAgICpcbiAgICogQXZhaWxhYmxlIGlucHV0czpcbiAgICogLSAnbHRyJyAtIGxlZnQgdG8gcmlnaHQgbW92ZW1lbnQsXG4gICAqIC0gJ3J0bCcgLSByaWdodCB0byBsZWZ0IG1vdmVtZW50LlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZGlyZWN0aW9uOiAnbHRyJyxcblxuICAvKipcbiAgICogVGhlIGRpc3RhbmNlIHZhbHVlIG9mIHRoZSBuZXh0IGFuZCBwcmV2aW91cyB2aWV3cG9ydHMgd2hpY2hcbiAgICogaGF2ZSB0byBwZWVrIGluIHRoZSBjdXJyZW50IHZpZXcuIEFjY2VwdHMgbnVtYmVyIGFuZFxuICAgKiBwaXhlbHMgYXMgYSBzdHJpbmcuIExlZnQgYW5kIHJpZ2h0IHBlZWtpbmcgY2FuIGJlXG4gICAqIHNldCB1cCBzZXBhcmF0ZWx5IHdpdGggYSBkaXJlY3Rpb25zIG9iamVjdC5cbiAgICpcbiAgICogRm9yIGV4YW1wbGU6XG4gICAqIGAxMDBgIC0gUGVlayAxMDBweCBvbiB0aGUgYm90aCBzaWRlcy5cbiAgICogeyBiZWZvcmU6IDEwMCwgYWZ0ZXI6IDUwIH1gIC0gUGVlayAxMDBweCBvbiB0aGUgbGVmdCBzaWRlIGFuZCA1MHB4IG9uIHRoZSByaWdodCBzaWRlLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfFN0cmluZ3xPYmplY3R9XG4gICAqL1xuICBwZWVrOiAwLFxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG9wdGlvbnMgYXBwbGllZCBhdCBzcGVjaWZpZWQgbWVkaWEgYnJlYWtwb2ludHMuXG4gICAqIEZvciBleGFtcGxlOiBkaXNwbGF5IHR3byBzbGlkZXMgcGVyIHZpZXcgdW5kZXIgODAwcHguXG4gICAqIGB7XG4gICAqICAgJzgwMHB4Jzoge1xuICAgKiAgICAgcGVyVmlldzogMlxuICAgKiAgIH1cbiAgICogfWBcbiAgICovXG4gIGJyZWFrcG9pbnRzOiB7fSxcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBpbnRlcm5hbGx5IHVzZWQgSFRNTCBjbGFzc2VzLlxuICAgKlxuICAgKiBAdG9kbyBSZWZhY3RvciBgc2xpZGVyYCBhbmQgYGNhcm91c2VsYCBwcm9wZXJ0aWVzIHRvIHNpbmdsZSBgdHlwZTogeyBzbGlkZXI6ICcnLCBjYXJvdXNlbDogJycgfWAgb2JqZWN0XG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBjbGFzc2VzOiB7XG4gICAgZGlyZWN0aW9uOiB7XG4gICAgICBsdHI6ICdnbGlkZS0tbHRyJyxcbiAgICAgIHJ0bDogJ2dsaWRlLS1ydGwnXG4gICAgfSxcbiAgICBzbGlkZXI6ICdnbGlkZS0tc2xpZGVyJyxcbiAgICBjYXJvdXNlbDogJ2dsaWRlLS1jYXJvdXNlbCcsXG4gICAgc3dpcGVhYmxlOiAnZ2xpZGUtLXN3aXBlYWJsZScsXG4gICAgZHJhZ2dpbmc6ICdnbGlkZS0tZHJhZ2dpbmcnLFxuICAgIGNsb25lU2xpZGU6ICdnbGlkZV9fc2xpZGUtLWNsb25lJyxcbiAgICBhY3RpdmVOYXY6ICdnbGlkZV9fYnVsbGV0LS1hY3RpdmUnLFxuICAgIGFjdGl2ZVNsaWRlOiAnZ2xpZGVfX3NsaWRlLS1hY3RpdmUnLFxuICAgIGRpc2FibGVkQXJyb3c6ICdnbGlkZV9fYXJyb3ctLWRpc2FibGVkJ1xuICB9XG59XG4iLCIvKipcbiAqIE91dHB1dHMgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBib3dzZXIgY29uc29sZS5cbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IG1zZ1xuICogQHJldHVybiB7Vm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdhcm4gKG1zZykge1xuICBjb25zb2xlLmVycm9yKGBbR2xpZGUgd2Fybl06ICR7bXNnfWApXG59XG4iLCIvKipcbiAqIENvbnZlcnRzIHZhbHVlIGVudGVyZWQgYXMgbnVtYmVyXG4gKiBvciBzdHJpbmcgdG8gaW50ZWdlciB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0ludCAodmFsdWUpIHtcbiAgcmV0dXJuIHBhcnNlSW50KHZhbHVlKVxufVxuXG4vKipcbiAqIENvbnZlcnRzIHZhbHVlIGVudGVyZWQgYXMgbnVtYmVyXG4gKiBvciBzdHJpbmcgdG8gZmxhdCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0Zsb2F0ICh2YWx1ZSkge1xuICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSlcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSAgeyp9ICAgdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyAodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZydcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QgKHZhbHVlKSB7XG4gIGxldCB0eXBlID0gdHlwZW9mIHZhbHVlXG5cbiAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZSA9PT0gJ29iamVjdCcgJiYgISF2YWx1ZSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW1peGVkLW9wZXJhdG9yc1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBudW1iZXIuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlciAodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGEgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyB1bmRlZmluZWQuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1VuZGVmaW5lZCAodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCdcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGFuIGFycmF5LlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheSAodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yID09PSBBcnJheVxufVxuIiwiaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uL3V0aWxzL2xvZydcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlscy91bml0J1xuXG4vKipcbiAqIENyZWF0ZXMgYW5kIGluaXRpYWxpemVzIHNwZWNpZmllZCBjb2xsZWN0aW9uIG9mIGV4dGVuc2lvbnMuXG4gKiBFYWNoIGV4dGVuc2lvbiByZWNlaXZlcyBhY2Nlc3MgdG8gaW5zdGFuY2Ugb2YgZ2xpZGUgYW5kIHJlc3Qgb2YgY29tcG9uZW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZ2xpZGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbnNpb25zXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vdW50IChnbGlkZSwgZXh0ZW5zaW9ucywgZXZlbnRzKSB7XG4gIGxldCBjb21wb25lbnRzID0ge31cblxuICBmb3IgKGxldCBuYW1lIGluIGV4dGVuc2lvbnMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihleHRlbnNpb25zW25hbWVdKSkge1xuICAgICAgY29tcG9uZW50c1tuYW1lXSA9IGV4dGVuc2lvbnNbbmFtZV0oZ2xpZGUsIGNvbXBvbmVudHMsIGV2ZW50cylcbiAgICB9IGVsc2Uge1xuICAgICAgd2FybignRXh0ZW5zaW9uIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgbmFtZSBpbiBjb21wb25lbnRzKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY29tcG9uZW50c1tuYW1lXS5tb3VudCkpIHtcbiAgICAgIGNvbXBvbmVudHNbbmFtZV0ubW91bnQoKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb21wb25lbnRzXG59XG4iLCIvKipcbiAqIERlZmluZXMgZ2V0dGVyIGFuZCBzZXR0ZXIgcHJvcGVydHkgb24gdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmogICAgICAgICBPYmplY3Qgd2hlcmUgcHJvcGVydHkgaGFzIHRvIGJlIGRlZmluZWQuXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHByb3AgICAgICAgIE5hbWUgb2YgdGhlIGRlZmluZWQgcHJvcGVydHkuXG4gKiBAcGFyYW0gIHtPYmplY3R9IGRlZmluaXRpb24gIEdldCBhbmQgc2V0IGRlZmluaXRpb25zIGZvciB0aGUgcHJvcGVydHkuXG4gKiBAcmV0dXJuIHtWb2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lIChvYmosIHByb3AsIGRlZmluaXRpb24pIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgZGVmaW5pdGlvbilcbn1cblxuLyoqXG4gKiBTb3J0cyBhcGhhYmV0aWNhbGx5IG9iamVjdCBrZXlzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzb3J0S2V5cyAob2JqKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnNvcnQoKS5yZWR1Y2UoKHIsIGspID0+IHtcbiAgICByW2tdID0gb2JqW2tdXG5cbiAgICByZXR1cm4gKHJba10sIHIpXG4gIH0sIHt9KVxufVxuXG4vKipcbiAqIE1lcmdlcyBwYXNzZWQgc2V0dGluZ3Mgb2JqZWN0IHdpdGggZGVmYXVsdCBvcHRpb25zLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gZGVmYXVsdHNcbiAqIEBwYXJhbSAge09iamVjdH0gc2V0dGluZ3NcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyAoZGVmYXVsdHMsIHNldHRpbmdzKSB7XG4gIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIHNldHRpbmdzKVxuXG4gIC8vIGBPYmplY3QuYXNzaWduYCBkbyBub3QgZGVlcGx5IG1lcmdlIG9iamVjdHMsIHNvIHdlXG4gIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkgZm9yIGV2ZXJ5IG5lc3RlZCBvYmplY3RcbiAgLy8gaW4gb3B0aW9ucy4gQWx0aG91Z2ggaXQgZG9lcyBub3QgbG9vayBzbWFydCxcbiAgLy8gaXQncyBzbWFsbGVyIGFuZCBmYXN0ZXIgdGhhbiBzb21lIGZhbmN5XG4gIC8vIG1lcmdpbmcgZGVlcC1tZXJnZSBhbGdvcml0aG0gc2NyaXB0LlxuICBpZiAoc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ2NsYXNzZXMnKSkge1xuICAgIG9wdGlvbnMuY2xhc3NlcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLmNsYXNzZXMsIHNldHRpbmdzLmNsYXNzZXMpXG5cbiAgICBpZiAoc2V0dGluZ3MuY2xhc3Nlcy5oYXNPd25Qcm9wZXJ0eSgnZGlyZWN0aW9uJykpIHtcbiAgICAgIG9wdGlvbnMuY2xhc3Nlcy5kaXJlY3Rpb24gPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cy5jbGFzc2VzLmRpcmVjdGlvbiwgc2V0dGluZ3MuY2xhc3Nlcy5kaXJlY3Rpb24pXG4gICAgfVxuICB9XG5cbiAgaWYgKHNldHRpbmdzLmhhc093blByb3BlcnR5KCdicmVha3BvaW50cycpKSB7XG4gICAgb3B0aW9ucy5icmVha3BvaW50cyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLmJyZWFrcG9pbnRzLCBzZXR0aW5ncy5icmVha3BvaW50cylcbiAgfVxuXG4gIHJldHVybiBvcHRpb25zXG59XG4iLCJpbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAnLi4vLi4vdXRpbHMvdW5pdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRzQnVzIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIEV2ZW50QnVzIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoZXZlbnRzID0ge30pIHtcbiAgICB0aGlzLmV2ZW50cyA9IGV2ZW50c1xuICAgIHRoaXMuaG9wID0gZXZlbnRzLmhhc093blByb3BlcnR5XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBsaXN0ZW5lciB0byB0aGUgc3BlY2lmZWQgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBvbiAoZXZlbnQsIGhhbmRsZXIpIHtcbiAgICBpZiAoaXNBcnJheShldmVudCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5vbihldmVudFtpXSwgaGFuZGxlcilcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgdGhlIGV2ZW50J3Mgb2JqZWN0IGlmIG5vdCB5ZXQgY3JlYXRlZFxuICAgIGlmICghdGhpcy5ob3AuY2FsbCh0aGlzLmV2ZW50cywgZXZlbnQpKSB7XG4gICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXVxuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgaGFuZGxlciB0byBxdWV1ZVxuICAgIHZhciBpbmRleCA9IHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKGhhbmRsZXIpIC0gMVxuXG4gICAgLy8gUHJvdmlkZSBoYW5kbGUgYmFjayBmb3IgcmVtb3ZhbCBvZiBldmVudFxuICAgIHJldHVybiB7XG4gICAgICByZW1vdmUgKCkge1xuICAgICAgICBkZWxldGUgdGhpcy5ldmVudHNbZXZlbnRdW2luZGV4XVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSdW5zIHJlZ2lzdGVyZWQgaGFuZGxlcnMgZm9yIHNwZWNpZmllZCBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gY29udGV4dFxuICAgKi9cbiAgZW1pdCAoZXZlbnQsIGNvbnRleHQpIHtcbiAgICBpZiAoaXNBcnJheShldmVudCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5lbWl0KGV2ZW50W2ldLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHRoZSBldmVudCBkb2Vzbid0IGV4aXN0LCBvciB0aGVyZSdzIG5vIGhhbmRsZXJzIGluIHF1ZXVlLCBqdXN0IGxlYXZlXG4gICAgaWYgKCF0aGlzLmhvcC5jYWxsKHRoaXMuZXZlbnRzLCBldmVudCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIEN5Y2xlIHRocm91Z2ggZXZlbnRzIHF1ZXVlLCBmaXJlIVxuICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtKGNvbnRleHQgfHwge30pXG4gICAgfSlcbiAgfVxufVxuIiwiaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMnXHJcbmltcG9ydCB7IHdhcm4gfSBmcm9tICcuL3V0aWxzL2xvZydcclxuaW1wb3J0IHsgbW91bnQgfSBmcm9tICcuL2NvcmUvaW5kZXgnXHJcbmltcG9ydCB7IG1lcmdlT3B0aW9ucyB9IGZyb20gJy4vdXRpbHMvb2JqZWN0J1xyXG5pbXBvcnQgeyB0b0ludCwgaXNPYmplY3QsIGlzQXJyYXkgfSBmcm9tICcuL3V0aWxzL3VuaXQnXHJcblxyXG5pbXBvcnQgRXZlbnRzQnVzIGZyb20gJy4vY29yZS9ldmVudC9ldmVudHMtYnVzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2xpZGUge1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBnbGlkZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gc2VsZWN0b3JcclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvciAoc2VsZWN0b3IsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgdGhpcy5fYyA9IHt9XHJcbiAgICB0aGlzLl90ID0gW11cclxuICAgIHRoaXMuX2UgPSBuZXcgRXZlbnRzQnVzKClcclxuXHJcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcclxuICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvclxyXG4gICAgdGhpcy5zZXR0aW5ncyA9IG1lcmdlT3B0aW9ucyhkZWZhdWx0cywgb3B0aW9ucylcclxuICAgIHRoaXMuaW5kZXggPSB0aGlzLnNldHRpbmdzLnN0YXJ0QXRcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemVzIGdsaWRlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGV4dGVuc2lvbnMgQ29sbGVjdGlvbiBvZiBleHRlbnNpb25zIHRvIGluaXRpYWxpemUuXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgbW91bnQgKGV4dGVuc2lvbnMgPSB7fSkge1xyXG4gICAgdGhpcy5fZS5lbWl0KCdtb3VudC5iZWZvcmUnKVxyXG5cclxuICAgIGlmIChpc09iamVjdChleHRlbnNpb25zKSkge1xyXG4gICAgICB0aGlzLl9jID0gbW91bnQodGhpcywgZXh0ZW5zaW9ucywgdGhpcy5fZSlcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdhcm4oJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBvYmplY3Qgb24gYG1vdW50KClgJylcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9lLmVtaXQoJ21vdW50LmFmdGVyJylcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29sbGVjdHMgYW4gaW5zdGFuY2UgYHRyYW5zbGF0ZWAgdHJhbnNmb3JtZXJzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7QXJyYXl9IHRyYW5zZm9ybWVycyBDb2xsZWN0aW9uIG9mIHRyYW5zZm9ybWVycy5cclxuICAgKiBAcmV0dXJuIHtWb2lkfVxyXG4gICAqL1xyXG4gIG11dGF0ZSAodHJhbnNmb3JtZXJzID0gW10pIHtcclxuICAgIGlmIChpc0FycmF5KHRyYW5zZm9ybWVycykpIHtcclxuICAgICAgdGhpcy5fdCA9IHRyYW5zZm9ybWVyc1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2FybignWW91IG5lZWQgdG8gcHJvdmlkZSBhIGFycmF5IG9uIGBtdXRhdGUoKWAnKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIGdsaWRlIHdpdGggc3BlY2lmaWVkIHNldHRpbmdzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHNldHRpbmdzXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgdXBkYXRlIChzZXR0aW5ncyA9IHt9KSB7XHJcbiAgICB0aGlzLnNldHRpbmdzID0gbWVyZ2VPcHRpb25zKHRoaXMuc2V0dGluZ3MsIHNldHRpbmdzKVxyXG5cclxuICAgIGlmIChzZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eSgnc3RhcnRBdCcpKSB7XHJcbiAgICAgIHRoaXMuaW5kZXggPSBzZXR0aW5ncy5zdGFydEF0XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZS5lbWl0KCd1cGRhdGUnKVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2Ugc2xpZGUgd2l0aCBzcGVjaWZpZWQgcGF0dGVybi4gQSBwYXR0ZXJuIG11c3QgYmUgaW4gdGhlIHNwZWNpYWwgZm9ybWF0OlxyXG4gICAqIGA+YCAtIE1vdmUgb25lIGZvcndhcmRcclxuICAgKiBgPGAgLSBNb3ZlIG9uZSBiYWNrd2FyZFxyXG4gICAqIGA9e2l9YCAtIEdvIHRvIHtpfSB6ZXJvLWJhc2VkIHNsaWRlIChlcS4gJz0xJywgd2lsbCBnbyB0byBzZWNvbmQgc2xpZGUpXHJcbiAgICogYD4+YCAtIFJld2luZHMgdG8gZW5kIChsYXN0IHNsaWRlKVxyXG4gICAqIGA8PGAgLSBSZXdpbmRzIHRvIHN0YXJ0IChmaXJzdCBzbGlkZSlcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXR0ZXJuXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgZ28gKHBhdHRlcm4pIHtcclxuICAgIHRoaXMuX2MuUnVuLm1ha2UocGF0dGVybilcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTW92ZSB0cmFjayBieSBzcGVjaWZpZWQgZGlzdGFuY2UuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGlzdGFuY2VcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBtb3ZlIChkaXN0YW5jZSkge1xyXG4gICAgdGhpcy5fYy5UcmFuc2l0aW9uLmRpc2FibGUoKVxyXG4gICAgdGhpcy5fYy5Nb3ZlLm1ha2UoZGlzdGFuY2UpXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3kgaW5zdGFuY2UgYW5kIHJldmVydCBhbGwgY2hhbmdlcyBkb25lIGJ5IHRoaXMuX2MuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBkZXN0cm95ICgpIHtcclxuICAgIHRoaXMuX2UuZW1pdCgnZGVzdHJveScpXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IGluc3RhbmNlIGF1dG9wbGF5aW5nLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtCb29sZWFufE51bWJlcn0gaW50ZXJ2YWwgUnVuIGF1dG9wbGF5aW5nIHdpdGggcGFzc2VkIGludGVydmFsIHJlZ2FyZGxlc3Mgb2YgYGF1dG9wbGF5YCBzZXR0aW5nc1xyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIHBsYXkgKGludGVydmFsID0gZmFsc2UpIHtcclxuICAgIGlmIChpbnRlcnZhbCkge1xyXG4gICAgICB0aGlzLnNldHRpbmdzLmF1dG9wbGF5ID0gaW50ZXJ2YWxcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9lLmVtaXQoJ3BsYXknKVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wIGluc3RhbmNlIGF1dG9wbGF5aW5nLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgcGF1c2UgKCkge1xyXG4gICAgdGhpcy5fZS5lbWl0KCdwYXVzZScpXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgZ2xpZGUgaW50byBhIGlkbGUgc3RhdHVzLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgZGlzYWJsZSAoKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGdsaWRlIGludG8gYSBhY3RpdmUgc3RhdHVzLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgZW5hYmxlICgpIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGN1dXRvbSBldmVudCBsaXN0ZW5lciB3aXRoIGhhbmRsZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd8QXJyYXl9IGV2ZW50XHJcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBvbiAoZXZlbnQsIGhhbmRsZXIpIHtcclxuICAgIHRoaXMuX2Uub24oZXZlbnQsIGhhbmRsZXIpXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiBnbGlkZSBpcyBhIHByZWNpc2VkIHR5cGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWVcclxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAqL1xyXG4gIGlzVHlwZSAobmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MudHlwZSA9PT0gbmFtZVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB2YWx1ZSBvZiB0aGUgY29yZSBvcHRpb25zLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAqL1xyXG4gIGdldCBzZXR0aW5ncyAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fb1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB2YWx1ZSBvZiB0aGUgY29yZSBvcHRpb25zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSBvXHJcbiAgICogQHJldHVybiB7Vm9pZH1cclxuICAgKi9cclxuICBzZXQgc2V0dGluZ3MgKG8pIHtcclxuICAgIGlmIChpc09iamVjdChvKSkge1xyXG4gICAgICB0aGlzLl9vID0gb1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2FybignT3B0aW9ucyBtdXN0IGJlIGFuIGBvYmplY3RgIGluc3RhbmNlLicpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGN1cnJlbnQgaW5kZXggb2YgdGhlIHNsaWRlci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgKi9cclxuICBnZXQgaW5kZXggKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgY3VycmVudCBpbmRleCBhIHNsaWRlci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgKi9cclxuICBzZXQgaW5kZXggKGkpIHtcclxuICAgIHRoaXMuX2kgPSB0b0ludChpKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0eXBlIG5hbWUgb2YgdGhlIHNsaWRlci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge1N0cmluZ31cclxuICAgKi9cclxuICBnZXQgdHlwZSAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy50eXBlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBpZGxlIHN0YXR1cy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICovXHJcbiAgZ2V0IGRpc2FibGVkICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBpZGxlIHN0YXR1cy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICovXHJcbiAgc2V0IGRpc2FibGVkIChzdGF0dXMpIHtcclxuICAgIHRoaXMuX2QgPSAhIXN0YXR1c1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHsgdG9JbnQsIGlzTnVtYmVyIH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgUnVuID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGF1dG9ydW5uaW5nIG9mIHRoZSBnbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5fbyA9IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ha2VzIGdsaWRlcyBydW5uaW5nIGJhc2VkIG9uIHRoZSBwYXNzZWQgbW92aW5nIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtb3ZlXG4gICAgICovXG4gICAgbWFrZSAobW92ZSkge1xuICAgICAgaWYgKCFHbGlkZS5kaXNhYmxlZCkge1xuICAgICAgICAhR2xpZGUuc2V0dGluZ3Mud2FpdEZvclRyYW5zaXRpb24gfHwgR2xpZGUuZGlzYWJsZSgpXG5cbiAgICAgICAgdGhpcy5tb3ZlID0gbW92ZVxuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdydW4uYmVmb3JlJywgdGhpcy5tb3ZlKVxuXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlKClcblxuICAgICAgICBFdmVudHMuZW1pdCgncnVuJywgdGhpcy5tb3ZlKVxuXG4gICAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcigoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNTdGFydCgpKSB7XG4gICAgICAgICAgICBFdmVudHMuZW1pdCgncnVuLnN0YXJ0JywgdGhpcy5tb3ZlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmlzRW5kKCkpIHtcbiAgICAgICAgICAgIEV2ZW50cy5lbWl0KCdydW4uZW5kJywgdGhpcy5tb3ZlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmlzT2Zmc2V0KCkpIHtcbiAgICAgICAgICAgIHRoaXMuX28gPSBmYWxzZVxuXG4gICAgICAgICAgICBFdmVudHMuZW1pdCgncnVuLm9mZnNldCcsIHRoaXMubW92ZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBFdmVudHMuZW1pdCgncnVuLmFmdGVyJywgdGhpcy5tb3ZlKVxuXG4gICAgICAgICAgR2xpZGUuZW5hYmxlKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyBjdXJyZW50IGluZGV4IGJhc2VkIG9uIGRlZmluZWQgbW92ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcnxVbmRlZmluZWR9XG4gICAgICovXG4gICAgY2FsY3VsYXRlICgpIHtcbiAgICAgIGNvbnN0IHsgbW92ZSwgbGVuZ3RoIH0gPSB0aGlzXG4gICAgICBjb25zdCB7IHN0ZXBzLCBkaXJlY3Rpb24gfSA9IG1vdmVcblxuICAgICAgLy8gQnkgZGVmYXVsdCBhc3N1bWUgdGhhdCBzaXplIG9mIHZpZXcgaXMgZXF1YWwgdG8gb25lIHNsaWRlXG4gICAgICBsZXQgdmlld1NpemUgPSAxXG4gICAgICAvLyBEZXRlcm1pbmUgaWYgc3RlcHMgYXJlIG51bWVyaWMgdmFsdWVcbiAgICAgIGxldCBjb3VudGFibGVTdGVwcyA9IGlzTnVtYmVyKHRvSW50KHN0ZXBzKSkgJiYgdG9JbnQoc3RlcHMpICE9PSAwXG5cbiAgICAgIC8vIFdoaWxlIGRpcmVjdGlvbiBpcyBgPWAgd2Ugd2FudCBqdW1wIHRvXG4gICAgICAvLyBhIHNwZWNpZmllZCBpbmRleCBkZXNjcmliZWQgaW4gc3RlcHMuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPScpIHtcbiAgICAgICAgR2xpZGUuaW5kZXggPSBzdGVwc1xuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBXaGVuIHBhdHRlcm4gaXMgZXF1YWwgdG8gYD4+YCB3ZSB3YW50XG4gICAgICAvLyBmYXN0IGZvcndhcmQgdG8gdGhlIGxhc3Qgc2xpZGUuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPicgJiYgc3RlcHMgPT09ICc+Jykge1xuICAgICAgICBHbGlkZS5pbmRleCA9IGxlbmd0aFxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBXaGVuIHBhdHRlcm4gaXMgZXF1YWwgdG8gYDw8YCB3ZSB3YW50XG4gICAgICAvLyBmYXN0IGZvcndhcmQgdG8gdGhlIGZpcnN0IHNsaWRlLlxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJzwnICYmIHN0ZXBzID09PSAnPCcpIHtcbiAgICAgICAgR2xpZGUuaW5kZXggPSAwXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIFdoaWxlIHN0ZXBzIGlzIGEgbnVtZXJpYyB2YWx1ZSBhbmQgd2VcbiAgICAgIC8vIG1vdmUgZm9yd2FyZCBieSB0aGUgbnVtYmVyIG9mIHN0ZXBzLlxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJz4nICYmIGNvdW50YWJsZVN0ZXBzKSB7XG4gICAgICAgIHZpZXdTaXplID0gdG9JbnQoc3RlcHMpICogLTFcbiAgICAgIH1cblxuICAgICAgLy8gJHN0ZXBzPCAoZHJhZykgbW92ZW1lbnRcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc8JyAmJiBjb3VudGFibGVTdGVwcykge1xuICAgICAgICB2aWV3U2l6ZSA9IHRvSW50KHN0ZXBzKVxuICAgICAgfVxuXG4gICAgICAvLyBwYWdpbmF0aW9uIG1vdmVtZW50XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnfCcpIHtcbiAgICAgICAgdmlld1NpemUgPSBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3IHx8IDFcbiAgICAgIH1cblxuICAgICAgLy8gd2UgYXJlIG1vdmluZyBmb3J3YXJkXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPicgfHwgKGRpcmVjdGlvbiA9PT0gJ3wnICYmIHN0ZXBzID09PSAnPicpKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gY2FsY3VsYXRlRm9yd2FyZEluZGV4KHZpZXdTaXplKVxuXG4gICAgICAgIGlmIChpbmRleCA+IGxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuX28gPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBHbGlkZS5pbmRleCA9IG5vcm1hbGl6ZUZvcndhcmRJbmRleChpbmRleCwgdmlld1NpemUpXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIHdlIGFyZSBtb3ZpbmcgYmFja3dhcmRcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc8JyB8fCAoZGlyZWN0aW9uID09PSAnfCcgJiYgc3RlcHMgPT09ICc8JykpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBjYWxjdWxhdGVCYWNrd2FyZEluZGV4KHZpZXdTaXplKVxuXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICB0aGlzLl9vID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgR2xpZGUuaW5kZXggPSBub3JtYWxpemVCYWNrd2FyZEluZGV4KGluZGV4LCB2aWV3U2l6ZSlcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgd2FybihgSW52YWxpZCBkaXJlY3Rpb24gcGF0dGVybiBbJHtkaXJlY3Rpb259JHtzdGVwc31dIGhhcyBiZWVuIHVzZWRgKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgd2UgYXJlIG9uIHRoZSBmaXJzdCBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNTdGFydCAoKSB7XG4gICAgICByZXR1cm4gR2xpZGUuaW5kZXggPD0gMFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgd2UgYXJlIG9uIHRoZSBsYXN0IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0VuZCAoKSB7XG4gICAgICByZXR1cm4gR2xpZGUuaW5kZXggPj0gdGhpcy5sZW5ndGhcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHdlIGFyZSBtYWtpbmcgYSBvZmZzZXQgcnVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdGlvblxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNPZmZzZXQgKGRpcmVjdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCFkaXJlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl9vKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICAvLyBkaWQgd2UgdmlldyB0byB0aGUgcmlnaHQ/XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnfD4nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmUuZGlyZWN0aW9uID09PSAnfCcgJiYgdGhpcy5tb3ZlLnN0ZXBzID09PSAnPidcbiAgICAgIH1cblxuICAgICAgLy8gZGlkIHdlIHZpZXcgdG8gdGhlIGxlZnQ/XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnfDwnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmUuZGlyZWN0aW9uID09PSAnfCcgJiYgdGhpcy5tb3ZlLnN0ZXBzID09PSAnPCdcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMubW92ZS5kaXJlY3Rpb24gPT09IGRpcmVjdGlvblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgYm91bmQgbW9kZSBpcyBhY3RpdmVcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNCb3VuZCAoKSB7XG4gICAgICByZXR1cm4gR2xpZGUuaXNUeXBlKCdzbGlkZXInKSAmJiBHbGlkZS5zZXR0aW5ncy5mb2N1c0F0ICE9PSAnY2VudGVyJyAmJiBHbGlkZS5zZXR0aW5ncy5ib3VuZFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGluZGV4IHZhbHVlIHRvIG1vdmUgZm9yd2FyZC90byB0aGUgcmlnaHRcbiAgICpcbiAgICogQHBhcmFtIHZpZXdTaXplXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBjYWxjdWxhdGVGb3J3YXJkSW5kZXggKHZpZXdTaXplKSB7XG4gICAgY29uc3QgeyBpbmRleCB9ID0gR2xpZGVcblxuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykpIHtcbiAgICAgIHJldHVybiBpbmRleCArIHZpZXdTaXplXG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4ICsgKHZpZXdTaXplIC0gKGluZGV4ICUgdmlld1NpemUpKVxuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZXMgdGhlIGdpdmVuIGZvcndhcmQgaW5kZXggYmFzZWQgb24gZ2xpZGUgc2V0dGluZ3MsIHByZXZlbnRpbmcgaXQgdG8gZXhjZWVkIGNlcnRhaW4gYm91bmRhcmllc1xuICAgKlxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICogQHBhcmFtIGxlbmd0aFxuICAgKiBAcGFyYW0gdmlld1NpemVcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZUZvcndhcmRJbmRleCAoaW5kZXgsIHZpZXdTaXplKSB7XG4gICAgY29uc3QgeyBsZW5ndGggfSA9IFJ1blxuXG4gICAgaWYgKGluZGV4IDw9IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgcmV0dXJuIGluZGV4IC0gKGxlbmd0aCArIDEpXG4gICAgfVxuXG4gICAgaWYgKEdsaWRlLnNldHRpbmdzLnJld2luZCkge1xuICAgICAgLy8gYm91bmQgZG9lcyBmdW5ueSB0aGluZ3Mgd2l0aCB0aGUgbGVuZ3RoLCB0aGVyZWZvciB3ZSBoYXZlIHRvIGJlIGNlcnRhaW5cbiAgICAgIC8vIHRoYXQgd2UgYXJlIG9uIHRoZSBsYXN0IHBvc3NpYmxlIGluZGV4IHZhbHVlIGdpdmVuIGJ5IGJvdW5kXG4gICAgICBpZiAoUnVuLmlzQm91bmQoKSAmJiAhUnVuLmlzRW5kKCkpIHtcbiAgICAgICAgcmV0dXJuIGxlbmd0aFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gMFxuICAgIH1cblxuICAgIGlmIChSdW4uaXNCb3VuZCgpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoXG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguZmxvb3IobGVuZ3RoIC8gdmlld1NpemUpICogdmlld1NpemVcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIGluZGV4IHZhbHVlIHRvIG1vdmUgYmFja3dhcmQvdG8gdGhlIGxlZnRcbiAgICpcbiAgICogQHBhcmFtIHZpZXdTaXplXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBjYWxjdWxhdGVCYWNrd2FyZEluZGV4ICh2aWV3U2l6ZSkge1xuICAgIGNvbnN0IHsgaW5kZXggfSA9IEdsaWRlXG5cbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICByZXR1cm4gaW5kZXggLSB2aWV3U2l6ZVxuICAgIH1cblxuICAgIC8vIGVuc3VyZSBvdXIgYmFjayBuYXZpZ2F0aW9uIHJlc3VsdHMgaW4gdGhlIHNhbWUgaW5kZXggYXMgYSBmb3J3YXJkIG5hdmlnYXRpb25cbiAgICAvLyB0byBleHBlcmllbmNlIGEgaG9tb2dlbmVvdXMgcGFnaW5nXG4gICAgY29uc3QgdmlldyA9IE1hdGguY2VpbChpbmRleCAvIHZpZXdTaXplKVxuXG4gICAgcmV0dXJuICh2aWV3IC0gMSkgKiB2aWV3U2l6ZVxuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZXMgdGhlIGdpdmVuIGJhY2t3YXJkIGluZGV4IGJhc2VkIG9uIGdsaWRlIHNldHRpbmdzLCBwcmV2ZW50aW5nIGl0IHRvIGV4Y2VlZCBjZXJ0YWluIGJvdW5kYXJpZXNcbiAgICpcbiAgICogQHBhcmFtIGluZGV4XG4gICAqIEBwYXJhbSBsZW5ndGhcbiAgICogQHBhcmFtIHZpZXdTaXplXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZnVuY3Rpb24gbm9ybWFsaXplQmFja3dhcmRJbmRleCAoaW5kZXgsIHZpZXdTaXplKSB7XG4gICAgY29uc3QgeyBsZW5ndGggfSA9IFJ1blxuXG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykpIHtcbiAgICAgIHJldHVybiBpbmRleCArIChsZW5ndGggKyAxKVxuICAgIH1cblxuICAgIGlmIChHbGlkZS5zZXR0aW5ncy5yZXdpbmQpIHtcbiAgICAgIC8vIGJvdW5kIGRvZXMgZnVubnkgdGhpbmdzIHdpdGggdGhlIGxlbmd0aCwgdGhlcmVmb3Igd2UgaGF2ZSB0byBiZSBjZXJ0YWluXG4gICAgICAvLyB0aGF0IHdlIGFyZSBvbiBmaXJzdCBwb3NzaWJsZSBpbmRleCB2YWx1ZSBiZWZvcmUgd2UgdG8gcmV3aW5kIHRvIHRoZSBsZW5ndGggZ2l2ZW4gYnkgYm91bmRcbiAgICAgIGlmIChSdW4uaXNCb3VuZCgpICYmIFJ1bi5pc1N0YXJ0KCkpIHtcbiAgICAgICAgcmV0dXJuIGxlbmd0aFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihsZW5ndGggLyB2aWV3U2l6ZSkgKiB2aWV3U2l6ZVxuICAgIH1cblxuICAgIHJldHVybiAwXG4gIH1cblxuICBkZWZpbmUoUnVuLCAnbW92ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBtb3ZlIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9tXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgb2YgdGhlIG1vdmUgc2NoZW1hLlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBzZXQgKHZhbHVlKSB7XG4gICAgICBsZXQgc3RlcCA9IHZhbHVlLnN1YnN0cigxKVxuXG4gICAgICB0aGlzLl9tID0ge1xuICAgICAgICBkaXJlY3Rpb246IHZhbHVlLnN1YnN0cigwLCAxKSxcbiAgICAgICAgc3RlcHM6IHN0ZXAgPyAodG9JbnQoc3RlcCkgPyB0b0ludChzdGVwKSA6IHN0ZXApIDogMFxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoUnVuLCAnbGVuZ3RoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIHJ1bm5pbmcgZGlzdGFuY2UgYmFzZWRcbiAgICAgKiBvbiB6ZXJvLWluZGV4aW5nIG51bWJlciBvZiBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIGxldCB7IHNldHRpbmdzIH0gPSBHbGlkZVxuICAgICAgbGV0IHsgbGVuZ3RoIH0gPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzXG5cbiAgICAgIC8vIElmIHRoZSBgYm91bmRgIG9wdGlvbiBpcyBhY3RpdmUsIGEgbWF4aW11bSBydW5uaW5nIGRpc3RhbmNlIHNob3VsZCBiZVxuICAgICAgLy8gcmVkdWNlZCBieSBgcGVyVmlld2AgYW5kIGBmb2N1c0F0YCBzZXR0aW5ncy4gUnVubmluZyBkaXN0YW5jZVxuICAgICAgLy8gc2hvdWxkIGVuZCBiZWZvcmUgY3JlYXRpbmcgYW4gZW1wdHkgc3BhY2UgYWZ0ZXIgaW5zdGFuY2UuXG4gICAgICBpZiAodGhpcy5pc0JvdW5kKCkpIHtcbiAgICAgICAgcmV0dXJuIChsZW5ndGggLSAxKSAtICh0b0ludChzZXR0aW5ncy5wZXJWaWV3KSAtIDEpICsgdG9JbnQoc2V0dGluZ3MuZm9jdXNBdClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxlbmd0aCAtIDFcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKFJ1biwgJ29mZnNldCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHN0YXR1cyBvZiB0aGUgb2Zmc2V0dGluZyBmbGFnLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX29cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIFJ1blxufVxuIiwiLyoqXG4gKiBSZXR1cm5zIGEgY3VycmVudCB0aW1lLlxuICpcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vdyAoKSB7XG4gIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxufVxuIiwiaW1wb3J0IHsgbm93IH0gZnJvbSAnLi90aW1lJ1xuXG4vKipcbiAqIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkXG4gKiBhdCBtb3N0IG9uY2UgZHVyaW5nIGEgZ2l2ZW4gd2luZG93IG9mIHRpbWUuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuY1xuICogQHBhcmFtIHtOdW1iZXJ9IHdhaXRcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlIChmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIGxldCB0aW1lb3V0LCBjb250ZXh0LCBhcmdzLCByZXN1bHRcbiAgbGV0IHByZXZpb3VzID0gMFxuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fVxuXG4gIGxldCBsYXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogbm93KClcbiAgICB0aW1lb3V0ID0gbnVsbFxuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncylcbiAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbFxuICB9XG5cbiAgbGV0IHRocm90dGxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgYXQgPSBub3coKVxuICAgIGlmICghcHJldmlvdXMgJiYgb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSkgcHJldmlvdXMgPSBhdFxuICAgIGxldCByZW1haW5pbmcgPSB3YWl0IC0gKGF0IC0gcHJldmlvdXMpXG4gICAgY29udGV4dCA9IHRoaXNcbiAgICBhcmdzID0gYXJndW1lbnRzXG4gICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcbiAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuICAgICAgICB0aW1lb3V0ID0gbnVsbFxuICAgICAgfVxuICAgICAgcHJldmlvdXMgPSBhdFxuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGxcbiAgICB9IGVsc2UgaWYgKCF0aW1lb3V0ICYmIG9wdGlvbnMudHJhaWxpbmcgIT09IGZhbHNlKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICB0aHJvdHRsZWQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuICAgIHByZXZpb3VzID0gMFxuICAgIHRpbWVvdXQgPSBjb250ZXh0ID0gYXJncyA9IG51bGxcbiAgfVxuXG4gIHJldHVybiB0aHJvdHRsZWRcbn1cbiIsImltcG9ydCB7IHRvSW50IH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnLi4vdXRpbHMvd2FpdCdcblxuY29uc3QgTUFSR0lOX1RZUEUgPSB7XG4gIGx0cjogWydtYXJnaW5MZWZ0JywgJ21hcmdpblJpZ2h0J10sXG4gIHJ0bDogWydtYXJnaW5SaWdodCcsICdtYXJnaW5MZWZ0J11cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgR2FwcyA9IHtcbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIGdhcHMgYmV0d2VlbiBzbGlkZXMuIEZpcnN0IGFuZCBsYXN0XG4gICAgICogc2xpZGVzIGRvIG5vdCByZWNlaXZlIGl0J3MgZWRnZSBtYXJnaW5zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gc2xpZGVzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhcHBseSAoc2xpZGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2xpZGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGxldCBzdHlsZSA9IHNsaWRlc1tpXS5zdHlsZVxuICAgICAgICBsZXQgZGlyZWN0aW9uID0gQ29tcG9uZW50cy5EaXJlY3Rpb24udmFsdWVcblxuICAgICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMF1dID0gYCR7dGhpcy52YWx1ZSAvIDJ9cHhgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGVbTUFSR0lOX1RZUEVbZGlyZWN0aW9uXVswXV0gPSAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGkgIT09IHNsaWRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgc3R5bGVbTUFSR0lOX1RZUEVbZGlyZWN0aW9uXVsxXV0gPSBgJHt0aGlzLnZhbHVlIC8gMn1weGBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzFdXSA9ICcnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBnYXBzIGZyb20gdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IHNsaWRlc1xuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICovXG4gICAgcmVtb3ZlIChzbGlkZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzbGlkZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbGV0IHN0eWxlID0gc2xpZGVzW2ldLnN0eWxlXG5cbiAgICAgICAgc3R5bGUubWFyZ2luTGVmdCA9ICcnXG4gICAgICAgIHN0eWxlLm1hcmdpblJpZ2h0ID0gJydcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZWZpbmUoR2FwcywgJ3ZhbHVlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIGdhcC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiB0b0ludChHbGlkZS5zZXR0aW5ncy5nYXApXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShHYXBzLCAnZ3JvdycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGFkZGl0aW9uYWwgZGltZW50aW9ucyB2YWx1ZSBjYXVzZWQgYnkgZ2Fwcy5cbiAgICAgKiBVc2VkIHRvIGluY3JlYXNlIHdpZHRoIG9mIHRoZSBzbGlkZXMgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBHYXBzLnZhbHVlICogKENvbXBvbmVudHMuU2l6ZXMubGVuZ3RoKVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoR2FwcywgJ3JlZHVjdG9yJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgcmVkdWN0aW9uIHZhbHVlIGNhdXNlZCBieSBnYXBzLlxuICAgICAqIFVzZWQgdG8gc3VidHJhY3Qgd2lkdGggb2YgdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIGxldCBwZXJWaWV3ID0gR2xpZGUuc2V0dGluZ3MucGVyVmlld1xuXG4gICAgICByZXR1cm4gKEdhcHMudmFsdWUgKiAocGVyVmlldyAtIDEpKSAvIHBlclZpZXdcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIEFwcGx5IGNhbGN1bGF0ZWQgZ2FwczpcbiAgICogLSBhZnRlciBidWlsZGluZywgc28gc2xpZGVzIChpbmNsdWRpbmcgY2xvbmVzKSB3aWxsIHJlY2VpdmUgcHJvcGVyIG1hcmdpbnNcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJLCB0byByZWNhbGN1bGF0ZSBnYXBzIHdpdGggbmV3IG9wdGlvbnNcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmFmdGVyJywgJ3VwZGF0ZSddLCB0aHJvdHRsZSgoKSA9PiB7XG4gICAgR2Fwcy5hcHBseShDb21wb25lbnRzLkh0bWwud3JhcHBlci5jaGlsZHJlbilcbiAgfSwgMzApKVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgZ2FwczpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgR2Fwcy5yZW1vdmUoQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuY2hpbGRyZW4pXG4gIH0pXG5cbiAgcmV0dXJuIEdhcHNcbn1cbiIsIi8qKlxuICogRmluZHMgc2libGluZ3Mgbm9kZXMgb2YgdGhlIHBhc3NlZCBub2RlLlxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IG5vZGVcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2libGluZ3MgKG5vZGUpIHtcbiAgaWYgKG5vZGUgJiYgbm9kZS5wYXJlbnROb2RlKSB7XG4gICAgbGV0IG4gPSBub2RlLnBhcmVudE5vZGUuZmlyc3RDaGlsZFxuICAgIGxldCBtYXRjaGVkID0gW11cblxuICAgIGZvciAoOyBuOyBuID0gbi5uZXh0U2libGluZykge1xuICAgICAgaWYgKG4ubm9kZVR5cGUgPT09IDEgJiYgbiAhPT0gbm9kZSkge1xuICAgICAgICBtYXRjaGVkLnB1c2gobilcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2hlZFxuICB9XG5cbiAgcmV0dXJuIFtdXG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHBhc3NlZCBub2RlIGV4aXN0IGFuZCBpcyBhIHZhbGlkIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gbm9kZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4aXN0IChub2RlKSB7XG4gIGlmIChub2RlICYmIG5vZGUgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xuaW1wb3J0IHsgZXhpc3QgfSBmcm9tICcuLi91dGlscy9kb20nXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbmNvbnN0IFRSQUNLX1NFTEVDVE9SID0gJ1tkYXRhLWdsaWRlLWVsPVwidHJhY2tcIl0nXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cykge1xuICBjb25zdCBIdG1sID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwIHNsaWRlciBIVE1MIG5vZGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtHbGlkZX0gZ2xpZGVcbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLnJvb3QgPSBHbGlkZS5zZWxlY3RvclxuICAgICAgdGhpcy50cmFjayA9IHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yKFRSQUNLX1NFTEVDVE9SKVxuICAgICAgdGhpcy5zbGlkZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLndyYXBwZXIuY2hpbGRyZW4pLmZpbHRlcigoc2xpZGUpID0+IHtcbiAgICAgICAgcmV0dXJuICFzbGlkZS5jbGFzc0xpc3QuY29udGFpbnMoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlcy5jbG9uZVNsaWRlKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoSHRtbCwgJ3Jvb3QnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBub2RlIG9mIHRoZSBnbGlkZSBtYWluIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBIdG1sLl9yXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgbm9kZSBvZiB0aGUgZ2xpZGUgbWFpbiBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNldCAocikge1xuICAgICAgaWYgKGlzU3RyaW5nKHIpKSB7XG4gICAgICAgIHIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHIpXG4gICAgICB9XG5cbiAgICAgIGlmIChleGlzdChyKSkge1xuICAgICAgICBIdG1sLl9yID0gclxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybignUm9vdCBlbGVtZW50IG11c3QgYmUgYSBleGlzdGluZyBIdG1sIG5vZGUnKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoSHRtbCwgJ3RyYWNrJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgbm9kZSBvZiB0aGUgZ2xpZGUgdHJhY2sgd2l0aCBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBIdG1sLl90XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgbm9kZSBvZiB0aGUgZ2xpZGUgdHJhY2sgd2l0aCBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0ICh0KSB7XG4gICAgICBpZiAoZXhpc3QodCkpIHtcbiAgICAgICAgSHRtbC5fdCA9IHRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oYENvdWxkIG5vdCBmaW5kIHRyYWNrIGVsZW1lbnQuIFBsZWFzZSB1c2UgJHtUUkFDS19TRUxFQ1RPUn0gYXR0cmlidXRlLmApXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShIdG1sLCAnd3JhcHBlcicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIG5vZGUgb2YgdGhlIHNsaWRlcyB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gSHRtbC50cmFjay5jaGlsZHJlblswXVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gSHRtbFxufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHsgdG9JbnQsIGlzT2JqZWN0IH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgUGVlayA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgaG93IG11Y2ggdG8gcGVlayBiYXNlZCBvbiBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy52YWx1ZSA9IEdsaWRlLnNldHRpbmdzLnBlZWtcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoUGVlaywgJ3ZhbHVlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIHBlZWsuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfE9iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIFBlZWsuX3ZcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0aGUgcGVlay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldCAodmFsdWUpIHtcbiAgICAgIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUuYmVmb3JlID0gdG9JbnQodmFsdWUuYmVmb3JlKVxuICAgICAgICB2YWx1ZS5hZnRlciA9IHRvSW50KHZhbHVlLmFmdGVyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSB0b0ludCh2YWx1ZSlcbiAgICAgIH1cblxuICAgICAgUGVlay5fdiA9IHZhbHVlXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShQZWVrLCAncmVkdWN0b3InLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyByZWR1Y3Rpb24gdmFsdWUgY2F1c2VkIGJ5IHBlZWsuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgdmFsdWUgPSBQZWVrLnZhbHVlXG4gICAgICBsZXQgcGVyVmlldyA9IEdsaWRlLnNldHRpbmdzLnBlclZpZXdcblxuICAgICAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gKHZhbHVlLmJlZm9yZSAvIHBlclZpZXcpICsgKHZhbHVlLmFmdGVyIC8gcGVyVmlldylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlICogMiAvIHBlclZpZXdcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlY2FsY3VsYXRlIHBlZWtpbmcgc2l6ZXMgb246XG4gICAqIC0gd2hlbiByZXNpemluZyB3aW5kb3cgdG8gdXBkYXRlIHRvIHByb3BlciBwZXJjZW50c1xuICAgKi9cbiAgRXZlbnRzLm9uKFsncmVzaXplJywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgUGVlay5tb3VudCgpXG4gIH0pXG5cbiAgcmV0dXJuIFBlZWtcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCB7IHRvSW50LCBpc1VuZGVmaW5lZCB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IE1vdmUgPSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBtb3ZlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuX28gPSAwXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgYSBtb3ZlbWVudCB2YWx1ZSBiYXNlZCBvbiBwYXNzZWQgb2Zmc2V0IGFuZCBjdXJyZW50bHkgYWN0aXZlIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSBvZmZzZXRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1ha2UgKG9mZnNldCA9IDApIHtcbiAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0XG5cbiAgICAgIEV2ZW50cy5lbWl0KCdtb3ZlJywge1xuICAgICAgICBtb3ZlbWVudDogdGhpcy52YWx1ZVxuICAgICAgfSlcblxuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKCgpID0+IHtcbiAgICAgICAgRXZlbnRzLmVtaXQoJ21vdmUuYWZ0ZXInLCB7XG4gICAgICAgICAgbW92ZW1lbnQ6IHRoaXMudmFsdWVcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKE1vdmUsICdvZmZzZXQnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBvZmZzZXQgdmFsdWUgdXNlZCB0byBtb2RpZnkgY3VycmVudCB0cmFuc2xhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBNb3ZlLl9vXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgYW4gb2Zmc2V0IHZhbHVlIHVzZWQgdG8gbW9kaWZ5IGN1cnJlbnQgdHJhbnNsYXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNldCAodmFsdWUpIHtcbiAgICAgIE1vdmUuX28gPSAhaXNVbmRlZmluZWQodmFsdWUpID8gdG9JbnQodmFsdWUpIDogMFxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoTW92ZSwgJ3RyYW5zbGF0ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcmF3IG1vdmVtZW50IHZhbHVlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICogR2xpZGUuaW5kZXhcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKE1vdmUsICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGFuIGFjdHVhbCBtb3ZlbWVudCB2YWx1ZSBjb3JyZWN0ZWQgYnkgb2Zmc2V0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5vZmZzZXRcbiAgICAgIGxldCB0cmFuc2xhdGUgPSB0aGlzLnRyYW5zbGF0ZVxuXG4gICAgICBpZiAoQ29tcG9uZW50cy5EaXJlY3Rpb24uaXMoJ3J0bCcpKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGUgKyBvZmZzZXRcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIG9mZnNldFxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogTWFrZSBtb3ZlbWVudCB0byBwcm9wZXIgc2xpZGUgb246XG4gICAqIC0gYmVmb3JlIGJ1aWxkLCBzbyBnbGlkZSB3aWxsIHN0YXJ0IGF0IGBzdGFydEF0YCBpbmRleFxuICAgKiAtIG9uIGVhY2ggc3RhbmRhcmQgcnVuIHRvIG1vdmUgdG8gbmV3bHkgY2FsY3VsYXRlZCBpbmRleFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYmVmb3JlJywgJ3J1biddLCAoKSA9PiB7XG4gICAgTW92ZS5tYWtlKClcbiAgfSlcblxuICByZXR1cm4gTW92ZVxufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBTaXplcyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgZGltZW50aW9ucyBvZiBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldHVwU2xpZGVzICgpIHtcbiAgICAgIGxldCB3aWR0aCA9IGAke3RoaXMuc2xpZGVXaWR0aH1weGBcbiAgICAgIGxldCBzbGlkZXMgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNsaWRlc1tpXS5zdHlsZS53aWR0aCA9IHdpZHRoXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHVwcyBkaW1lbnRpb25zIG9mIHNsaWRlcyB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXR1cFdyYXBwZXIgKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUud2lkdGggPSBgJHt0aGlzLndyYXBwZXJTaXplfXB4YFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFwcGxpZWQgc3R5bGVzIGZyb20gSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZSAoKSB7XG4gICAgICBsZXQgc2xpZGVzID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlc1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzbGlkZXNbaV0uc3R5bGUud2lkdGggPSAnJ1xuICAgICAgfVxuXG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS53aWR0aCA9ICcnXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKFNpemVzLCAnbGVuZ3RoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgY291bnQgbnVtYmVyIG9mIHRoZSBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBDb21wb25lbnRzLkh0bWwuc2xpZGVzLmxlbmd0aFxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoU2l6ZXMsICd3aWR0aCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHdpZHRoIHZhbHVlIG9mIHRoZSBzbGlkZXIgKHZpc2libGUgYXJlYSkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBDb21wb25lbnRzLkh0bWwucm9vdC5vZmZzZXRXaWR0aFxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoU2l6ZXMsICd3cmFwcGVyU2l6ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHNpemUgb2YgdGhlIHNsaWRlcyB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gU2l6ZXMuc2xpZGVXaWR0aCAqIFNpemVzLmxlbmd0aCArIENvbXBvbmVudHMuR2Fwcy5ncm93ICsgQ29tcG9uZW50cy5DbG9uZXMuZ3Jvd1xuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoU2l6ZXMsICdzbGlkZVdpZHRoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgd2lkdGggdmFsdWUgb2YgYSBzaW5nbGUgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiAoU2l6ZXMud2lkdGggLyBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3KSAtIENvbXBvbmVudHMuUGVlay5yZWR1Y3RvciAtIENvbXBvbmVudHMuR2Fwcy5yZWR1Y3RvclxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogQXBwbHkgY2FsY3VsYXRlZCBnbGlkZSdzIGRpbWVuc2lvbnM6XG4gICAqIC0gYmVmb3JlIGJ1aWxkaW5nLCBzbyBvdGhlciBkaW1lbnRpb25zIChlLmcuIHRyYW5zbGF0ZSkgd2lsbCBiZSBjYWxjdWxhdGVkIHByb3BlcnRseVxuICAgKiAtIHdoZW4gcmVzaXppbmcgd2luZG93IHRvIHJlY2FsY3VsYXRlIHNpbGRlcyBkaW1lbnNpb25zXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSwgdG8gY2FsY3VsYXRlIGRpbWVuc2lvbnMgYmFzZWQgb24gbmV3IG9wdGlvbnNcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmJlZm9yZScsICdyZXNpemUnLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBTaXplcy5zZXR1cFNsaWRlcygpXG4gICAgU2l6ZXMuc2V0dXBXcmFwcGVyKClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3ZlIGNhbGN1bGF0ZWQgZ2xpZGUncyBkaW1lbnNpb25zOlxuICAgKiAtIG9uIGRlc3RvdGluZyB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIFNpemVzLnJlbW92ZSgpXG4gIH0pXG5cbiAgcmV0dXJuIFNpemVzXG59XG4iLCJpbXBvcnQgeyBzaWJsaW5ncyB9IGZyb20gJy4uL3V0aWxzL2RvbSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgQnVpbGQgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdCBnbGlkZSBidWlsZGluZy4gQWRkcyBjbGFzc2VzLCBzZXRzXG4gICAgICogZGltZW5zaW9ucyBhbmQgc2V0dXBzIGluaXRpYWwgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIEV2ZW50cy5lbWl0KCdidWlsZC5iZWZvcmUnKVxuXG4gICAgICB0aGlzLnR5cGVDbGFzcygpXG4gICAgICB0aGlzLmFjdGl2ZUNsYXNzKClcblxuICAgICAgRXZlbnRzLmVtaXQoJ2J1aWxkLmFmdGVyJylcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBgdHlwZWAgY2xhc3MgdG8gdGhlIGdsaWRlIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHR5cGVDbGFzcyAoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKEdsaWRlLnNldHRpbmdzLmNsYXNzZXNbR2xpZGUuc2V0dGluZ3MudHlwZV0pXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFjdGl2ZUNsYXNzICgpIHtcbiAgICAgIGxldCBjbGFzc2VzID0gR2xpZGUuc2V0dGluZ3MuY2xhc3Nlc1xuICAgICAgbGV0IHNsaWRlID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlc1tHbGlkZS5pbmRleF1cblxuICAgICAgaWYgKHNsaWRlKSB7XG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5hY3RpdmVTbGlkZSlcblxuICAgICAgICBzaWJsaW5ncyhzbGlkZSkuZm9yRWFjaCgoc2libGluZykgPT4ge1xuICAgICAgICAgIHNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZShjbGFzc2VzLmFjdGl2ZVNsaWRlKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIEhUTUwgY2xhc3NlcyBhcHBsaWVkIGF0IGJ1aWxkaW5nLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVDbGFzc2VzICgpIHtcbiAgICAgIGxldCBjbGFzc2VzID0gR2xpZGUuc2V0dGluZ3MuY2xhc3Nlc1xuXG4gICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzZXNbR2xpZGUuc2V0dGluZ3MudHlwZV0pXG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC5zbGlkZXMuZm9yRWFjaCgoc2libGluZykgPT4ge1xuICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlcy5hY3RpdmVTbGlkZSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGJ1aWxkaW5nIGNsYXNzZXM6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBIVE1MIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVtb3ZlIGNsYXNzZXMgYmVmb3JlIHJlbW91bnRpbmcgY29tcG9uZW50XG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgQnVpbGQucmVtb3ZlQ2xhc3NlcygpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW91bnQgY29tcG9uZW50OlxuICAgKiAtIG9uIHJlc2l6aW5nIG9mIHRoZSB3aW5kb3cgdG8gY2FsY3VsYXRlIG5ldyBkaW1lbnRpb25zXG4gICAqIC0gb24gdXBkYXRpbmcgc2V0dGluZ3MgdmlhIEFQSVxuICAgKi9cbiAgRXZlbnRzLm9uKFsncmVzaXplJywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgQnVpbGQubW91bnQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBTd2FwIGFjdGl2ZSBjbGFzcyBvZiBjdXJyZW50IHNsaWRlOlxuICAgKiAtIGFmdGVyIGVhY2ggbW92ZSB0byB0aGUgbmV3IGluZGV4XG4gICAqL1xuICBFdmVudHMub24oJ21vdmUuYWZ0ZXInLCAoKSA9PiB7XG4gICAgQnVpbGQuYWN0aXZlQ2xhc3MoKVxuICB9KVxuXG4gIHJldHVybiBCdWlsZFxufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBDbG9uZXMgPSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHBhdHRlcm4gbWFwIGFuZCBjb2xsZWN0IHNsaWRlcyB0byBiZSBjbG9uZWQuXG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5pdGVtcyA9IFtdXG5cbiAgICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuY29sbGVjdCgpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENvbGxlY3QgY2xvbmVzIHdpdGggcGF0dGVybi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1tdfVxuICAgICAqL1xuICAgIGNvbGxlY3QgKGl0ZW1zID0gW10pIHtcbiAgICAgIGxldCB7IHNsaWRlcyB9ID0gQ29tcG9uZW50cy5IdG1sXG4gICAgICBsZXQgeyBwZXJWaWV3LCBjbGFzc2VzIH0gPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICBjb25zdCBwZWVrSW5jcmVtZW50ZXIgPSArISFHbGlkZS5zZXR0aW5ncy5wZWVrXG4gICAgICBjb25zdCBjbG9uZUNvdW50ID0gcGVyVmlldyArIHBlZWtJbmNyZW1lbnRlciArIE1hdGgucm91bmQocGVyVmlldyAvIDIpXG4gICAgICBjb25zdCBhcHBlbmQgPSBzbGlkZXMuc2xpY2UoMCwgY2xvbmVDb3VudCkucmV2ZXJzZSgpXG4gICAgICBjb25zdCBwcmVwZW5kID0gc2xpZGVzLnNsaWNlKGNsb25lQ291bnQgKiAtMSlcblxuICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHBlclZpZXcgLyBzbGlkZXMubGVuZ3RoKSk7IHIrKykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFwcGVuZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBjbG9uZSA9IGFwcGVuZFtpXS5jbG9uZU5vZGUodHJ1ZSlcblxuICAgICAgICAgIGNsb25lLmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5jbG9uZVNsaWRlKVxuXG4gICAgICAgICAgaXRlbXMucHVzaChjbG9uZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlcGVuZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGxldCBjbG9uZSA9IHByZXBlbmRbaV0uY2xvbmVOb2RlKHRydWUpXG5cbiAgICAgICAgICBjbG9uZS5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuY2xvbmVTbGlkZSlcblxuICAgICAgICAgIGl0ZW1zLnVuc2hpZnQoY2xvbmUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGl0ZW1zXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFwcGVuZCBjbG9uZWQgc2xpZGVzIHdpdGggZ2VuZXJhdGVkIHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFwcGVuZCAoKSB7XG4gICAgICBsZXQgeyBpdGVtcyB9ID0gdGhpc1xuICAgICAgbGV0IHsgd3JhcHBlciwgc2xpZGVzIH0gPSBDb21wb25lbnRzLkh0bWxcblxuICAgICAgY29uc3QgaGFsZiA9IE1hdGguZmxvb3IoaXRlbXMubGVuZ3RoIC8gMilcbiAgICAgIGNvbnN0IHByZXBlbmQgPSBpdGVtcy5zbGljZSgwLCBoYWxmKS5yZXZlcnNlKClcbiAgICAgIGNvbnN0IGFwcGVuZCA9IGl0ZW1zLnNsaWNlKGhhbGYgKiAtMSkucmV2ZXJzZSgpXG4gICAgICBjb25zdCB3aWR0aCA9IGAke0NvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aH1weGBcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcHBlbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChhcHBlbmRbaV0pXG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlcGVuZC5sZW5ndGg7IGkrKykge1xuICAgICAgICB3cmFwcGVyLmluc2VydEJlZm9yZShwcmVwZW5kW2ldLCBzbGlkZXNbMF0pXG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlbXNbaV0uc3R5bGUud2lkdGggPSB3aWR0aFxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGNsb25lZCBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZSAoKSB7XG4gICAgICBsZXQgeyBpdGVtcyB9ID0gdGhpc1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnJlbW92ZUNoaWxkKGl0ZW1zW2ldKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShDbG9uZXMsICdncm93Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYWRkaXRpb25hbCBkaW1lbnRpb25zIHZhbHVlIGNhdXNlZCBieSBjbG9uZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiAoQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICsgQ29tcG9uZW50cy5HYXBzLnZhbHVlKSAqIENsb25lcy5pdGVtcy5sZW5ndGhcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIEFwcGVuZCBhZGRpdGlvbmFsIHNsaWRlJ3MgY2xvbmVzOlxuICAgKiAtIHdoaWxlIGdsaWRlJ3MgdHlwZSBpcyBgY2Fyb3VzZWxgXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsICgpID0+IHtcbiAgICBDbG9uZXMucmVtb3ZlKClcbiAgICBDbG9uZXMubW91bnQoKVxuICAgIENsb25lcy5hcHBlbmQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBBcHBlbmQgYWRkaXRpb25hbCBzbGlkZSdzIGNsb25lczpcbiAgICogLSB3aGlsZSBnbGlkZSdzIHR5cGUgaXMgYGNhcm91c2VsYFxuICAgKi9cbiAgRXZlbnRzLm9uKCdidWlsZC5iZWZvcmUnLCAoKSA9PiB7XG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgQ2xvbmVzLmFwcGVuZCgpXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2xvbmVzIEhUTUxFbGVtZW50czpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBIVE1MIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgQ2xvbmVzLnJlbW92ZSgpXG4gIH0pXG5cbiAgcmV0dXJuIENsb25lc1xufVxuIiwiaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi8uLi91dGlscy91bml0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudHNCaW5kZXIge1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgRXZlbnRzQmluZGVyIGluc3RhbmNlLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKGxpc3RlbmVycyA9IHt9KSB7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBsaXN0ZW5lcnNcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGV2ZW50cyBsaXN0ZW5lcnMgdG8gYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSAge1N0cmluZ3xBcnJheX0gZXZlbnRzXG4gICAqIEBwYXJhbSAge0VsZW1lbnR8V2luZG93fERvY3VtZW50fSBlbFxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2xvc3VyZVxuICAgKiBAcGFyYW0gIHtCb29sZWFufE9iamVjdH0gY2FwdHVyZVxuICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgKi9cbiAgb24gKGV2ZW50cywgZWwsIGNsb3N1cmUsIGNhcHR1cmUgPSBmYWxzZSkge1xuICAgIGlmIChpc1N0cmluZyhldmVudHMpKSB7XG4gICAgICBldmVudHMgPSBbZXZlbnRzXVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyc1tldmVudHNbaV1dID0gY2xvc3VyZVxuXG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgdGhpcy5saXN0ZW5lcnNbZXZlbnRzW2ldXSwgY2FwdHVyZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBldmVudCBsaXN0ZW5lcnMgZnJvbSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfEFycmF5fSBldmVudHNcbiAgICogQHBhcmFtICB7RWxlbWVudHxXaW5kb3d8RG9jdW1lbnR9IGVsXG4gICAqIEBwYXJhbSAge0Jvb2xlYW58T2JqZWN0fSBjYXB0dXJlXG4gICAqIEByZXR1cm4ge1ZvaWR9XG4gICAqL1xuICBvZmYgKGV2ZW50cywgZWwsIGNhcHR1cmUgPSBmYWxzZSkge1xuICAgIGlmIChpc1N0cmluZyhldmVudHMpKSB7XG4gICAgICBldmVudHMgPSBbZXZlbnRzXVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50c1tpXSwgdGhpcy5saXN0ZW5lcnNbZXZlbnRzW2ldXSwgY2FwdHVyZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBjb2xsZWN0ZWQgbGlzdGVuZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICovXG4gIGRlc3Ryb3kgKCkge1xuICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1xuICB9XG59XG4iLCJpbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJy4uL3V0aWxzL3dhaXQnXG5cbmltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIGNvbnN0IFJlc2l6ZSA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB3aW5kb3cgYmluZGluZ3MuXG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5iaW5kKClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgYHJlenNpemVgIGxpc3RlbmVyIHRvIHRoZSB3aW5kb3cuXG4gICAgICogSXQncyBhIGNvc3RseSBldmVudCwgc28gd2UgYXJlIGRlYm91bmNpbmcgaXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQgKCkge1xuICAgICAgQmluZGVyLm9uKCdyZXNpemUnLCB3aW5kb3csIHRocm90dGxlKCgpID0+IHtcbiAgICAgICAgRXZlbnRzLmVtaXQoJ3Jlc2l6ZScpXG4gICAgICB9LCBHbGlkZS5zZXR0aW5ncy50aHJvdHRsZSkpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgbGlzdGVuZXJzIGZyb20gdGhlIHdpbmRvdy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kICgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ3Jlc2l6ZScsIHdpbmRvdylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGZyb20gd2luZG93OlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIHJlbW92ZSBhZGRlZCBFdmVudExpc3RlbmVyXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgUmVzaXplLnVuYmluZCgpXG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBSZXNpemVcbn1cbiIsImltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlscy9sb2cnXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5cbmNvbnN0IFZBTElEX0RJUkVDVElPTlMgPSBbJ2x0cicsICdydGwnXVxuY29uc3QgRkxJUEVEX01PVkVNRU5UUyA9IHtcbiAgJz4nOiAnPCcsXG4gICc8JzogJz4nLFxuICAnPSc6ICc9J1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBEaXJlY3Rpb24gPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXBzIGdhcCB2YWx1ZSBiYXNlZCBvbiBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy52YWx1ZSA9IEdsaWRlLnNldHRpbmdzLmRpcmVjdGlvblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXNvbHZlcyBwYXR0ZXJuIGJhc2VkIG9uIGRpcmVjdGlvbiB2YWx1ZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdHRlcm5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIHJlc29sdmUgKHBhdHRlcm4pIHtcbiAgICAgIGxldCB0b2tlbiA9IHBhdHRlcm4uc2xpY2UoMCwgMSlcblxuICAgICAgaWYgKHRoaXMuaXMoJ3J0bCcpKSB7XG4gICAgICAgIHJldHVybiBwYXR0ZXJuLnNwbGl0KHRva2VuKS5qb2luKEZMSVBFRF9NT1ZFTUVOVFNbdG9rZW5dKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGF0dGVyblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdmFsdWUgb2YgZGlyZWN0aW9uIG1vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0aW9uXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXMgKGRpcmVjdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPT09IGRpcmVjdGlvblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIGRpcmVjdGlvbiBjbGFzcyB0byB0aGUgcm9vdCBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFkZENsYXNzICgpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5hZGQoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlcy5kaXJlY3Rpb25bdGhpcy52YWx1ZV0pXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZGlyZWN0aW9uIGNsYXNzIGZyb20gdGhlIHJvb3QgSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVDbGFzcyAoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QucmVtb3ZlKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uW3RoaXMudmFsdWVdKVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShEaXJlY3Rpb24sICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBkaXJlY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gRGlyZWN0aW9uLl92XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgb2YgdGhlIGRpcmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0ICh2YWx1ZSkge1xuICAgICAgaWYgKFZBTElEX0RJUkVDVElPTlMuaW5kZXhPZih2YWx1ZSkgPiAtMSkge1xuICAgICAgICBEaXJlY3Rpb24uX3YgPSB2YWx1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybignRGlyZWN0aW9uIHZhbHVlIG11c3QgYmUgYGx0cmAgb3IgYHJ0bGAnKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogQ2xlYXIgZGlyZWN0aW9uIGNsYXNzOlxuICAgKiAtIG9uIGRlc3Ryb3kgdG8gYnJpbmcgSFRNTCB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKiAtIG9uIHVwZGF0ZSB0byByZW1vdmUgY2xhc3MgYmVmb3JlIHJlYXBwbGluZyBiZWxsb3dcbiAgICovXG4gIEV2ZW50cy5vbihbJ2Rlc3Ryb3knLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBEaXJlY3Rpb24ucmVtb3ZlQ2xhc3MoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdW50IGNvbXBvbmVudDpcbiAgICogLSBvbiB1cGRhdGUgdG8gcmVmbGVjdCBjaGFuZ2VzIGluIGRpcmVjdGlvbiB2YWx1ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgRGlyZWN0aW9uLm1vdW50KClcbiAgfSlcblxuICAvKipcbiAgICogQXBwbHkgZGlyZWN0aW9uIGNsYXNzOlxuICAgKiAtIGJlZm9yZSBidWlsZGluZyB0byBhcHBseSBjbGFzcyBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICogLSBvbiB1cGRhdGluZyB0byByZWFwcGx5IGRpcmVjdGlvbiBjbGFzcyB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBEaXJlY3Rpb24uYWRkQ2xhc3MoKVxuICB9KVxuXG4gIHJldHVybiBEaXJlY3Rpb25cbn1cbiIsIi8qKlxuICogUmVmbGVjdHMgdmFsdWUgb2YgZ2xpZGUgbW92ZW1lbnQuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE5lZ2F0ZXMgdGhlIHBhc3NlZCB0cmFuc2xhdGUgaWYgZ2xpZGUgaXMgaW4gUlRMIG9wdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeSAodHJhbnNsYXRlKSB7XG4gICAgICBpZiAoQ29tcG9uZW50cy5EaXJlY3Rpb24uaXMoJ3J0bCcpKSB7XG4gICAgICAgIHJldHVybiAtdHJhbnNsYXRlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGVcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIGEgYGdhcGAgc2V0dGluZ3MuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE1vZGlmaWVzIHBhc3NlZCB0cmFuc2xhdGUgdmFsdWUgd2l0aCBudW1iZXIgaW4gdGhlIGBnYXBgIHNldHRpbmdzLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5ICh0cmFuc2xhdGUpIHtcbiAgICAgIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLmZsb29yKHRyYW5zbGF0ZSAvIENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aClcbiAgICAgIHJldHVybiB0cmFuc2xhdGUgKyAoQ29tcG9uZW50cy5HYXBzLnZhbHVlICogbXVsdGlwbGllcilcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIHdpZHRoIG9mIGFkZGl0aW9uYWwgY2xvbmVzIHdpZHRoLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBBZGRzIHRvIHRoZSBwYXNzZWQgdHJhbnNsYXRlIHdpZHRoIG9mIHRoZSBoYWxmIG9mIGNsb25lcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeSAodHJhbnNsYXRlKSB7XG4gICAgICByZXR1cm4gdHJhbnNsYXRlICsgKENvbXBvbmVudHMuQ2xvbmVzLmdyb3cgLyAyKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi8uLi91dGlscy91bml0J1xuXG4vKipcbiAqIFVwZGF0ZXMgZ2xpZGUgbW92ZW1lbnQgd2l0aCBhIGBwZWVrYCBzZXR0aW5ncy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogTW9kaWZpZXMgcGFzc2VkIHRyYW5zbGF0ZSB2YWx1ZSB3aXRoIGEgYHBlZWtgIHNldHRpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnkgKHRyYW5zbGF0ZSkge1xuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmZvY3VzQXQgPj0gMCkge1xuICAgICAgICBsZXQgcGVlayA9IENvbXBvbmVudHMuUGVlay52YWx1ZVxuXG4gICAgICAgIGlmIChpc09iamVjdChwZWVrKSkge1xuICAgICAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBwZWVrLmJlZm9yZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIHBlZWtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZVxuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggYSBgZm9jdXNBdGAgc2V0dGluZ3MuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE1vZGlmaWVzIHBhc3NlZCB0cmFuc2xhdGUgdmFsdWUgd2l0aCBpbmRleCBpbiB0aGUgYGZvY3VzQXRgIHNldHRpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnkgKHRyYW5zbGF0ZSkge1xuICAgICAgbGV0IGdhcCA9IENvbXBvbmVudHMuR2Fwcy52YWx1ZVxuICAgICAgbGV0IHdpZHRoID0gQ29tcG9uZW50cy5TaXplcy53aWR0aFxuICAgICAgbGV0IGZvY3VzQXQgPSBHbGlkZS5zZXR0aW5ncy5mb2N1c0F0XG4gICAgICBsZXQgc2xpZGVXaWR0aCA9IENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aFxuXG4gICAgICBpZiAoZm9jdXNBdCA9PT0gJ2NlbnRlcicpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtICh3aWR0aCAvIDIgLSBzbGlkZVdpZHRoIC8gMilcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIChzbGlkZVdpZHRoICogZm9jdXNBdCkgLSAoZ2FwICogZm9jdXNBdClcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlscy9sb2cnXG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuaW1wb3J0IFJ0bCBmcm9tICcuL3RyYW5zZm9ybWVycy9ydGwnXG5pbXBvcnQgR2FwIGZyb20gJy4vdHJhbnNmb3JtZXJzL2dhcCdcbmltcG9ydCBHcm93IGZyb20gJy4vdHJhbnNmb3JtZXJzL2dyb3cnXG5pbXBvcnQgUGVla2luZyBmcm9tICcuL3RyYW5zZm9ybWVycy9wZWVraW5nJ1xuaW1wb3J0IEZvY3VzaW5nIGZyb20gJy4vdHJhbnNmb3JtZXJzL2ZvY3VzaW5nJ1xuXG4vKipcbiAqIEFwcGxpZXMgZGlmZnJlbnQgdHJhbnNmb3JtZXJzIG9uIHRyYW5zbGF0ZSB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIE1lcmdlIGluc3RhbmNlIHRyYW5zZm9ybWVycyB3aXRoIGNvbGxlY3Rpb24gb2YgZGVmYXVsdCB0cmFuc2Zvcm1lcnMuXG4gICAqIEl0J3MgaW1wb3J0YW50IHRoYXQgdGhlIFJ0bCBjb21wb25lbnQgYmUgbGFzdCBvbiB0aGUgbGlzdCxcbiAgICogc28gaXQgcmVmbGVjdHMgYWxsIHByZXZpb3VzIHRyYW5zZm9ybWF0aW9ucy5cbiAgICpcbiAgICogQHR5cGUge0FycmF5fVxuICAgKi9cbiAgbGV0IFRSQU5TRk9STUVSUyA9IFtcbiAgICBHYXAsXG4gICAgR3JvdyxcbiAgICBQZWVraW5nLFxuICAgIEZvY3VzaW5nXG4gIF0uY29uY2F0KEdsaWRlLl90LCBbUnRsXSlcblxuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIFBpcGxpbmVzIHRyYW5zbGF0ZSB2YWx1ZSB3aXRoIHJlZ2lzdGVyZWQgdHJhbnNmb3JtZXJzLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbXV0YXRlICh0cmFuc2xhdGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVFJBTlNGT1JNRVJTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm1lciA9IFRSQU5TRk9STUVSU1tpXVxuXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHRyYW5zZm9ybWVyKSAmJiBpc0Z1bmN0aW9uKHRyYW5zZm9ybWVyKCkubW9kaWZ5KSkge1xuICAgICAgICAgIHRyYW5zbGF0ZSA9IHRyYW5zZm9ybWVyKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpLm1vZGlmeSh0cmFuc2xhdGUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2FybignVHJhbnNmb3JtZXIgc2hvdWxkIGJlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGBtb2RpZnkoKWAgbWV0aG9kJylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgbXV0YXRvciBmcm9tICcuLi9tdXRhdG9yL2luZGV4J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBUcmFuc2xhdGUgPSB7XG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0cmFuc2xhdGUgb24gSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXQgKHZhbHVlKSB7XG4gICAgICBsZXQgdHJhbnNmb3JtID0gbXV0YXRvcihHbGlkZSwgQ29tcG9uZW50cykubXV0YXRlKHZhbHVlKVxuXG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHstMSAqIHRyYW5zZm9ybX1weCwgMHB4LCAwcHgpYFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHZhbHVlIG9mIHRyYW5zbGF0ZSBmcm9tIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlICgpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICcnXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXRTdGFydEluZGV4ICgpIHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IENvbXBvbmVudHMuU2l6ZXMubGVuZ3RoXG4gICAgICBjb25zdCBpbmRleCA9IEdsaWRlLmluZGV4XG4gICAgICBjb25zdCBwZXJWaWV3ID0gR2xpZGUuc2V0dGluZ3MucGVyVmlld1xuXG4gICAgICBpZiAoQ29tcG9uZW50cy5SdW4uaXNPZmZzZXQoJz4nKSB8fCBDb21wb25lbnRzLlJ1bi5pc09mZnNldCgnfD4nKSkge1xuICAgICAgICByZXR1cm4gbGVuZ3RoICsgKGluZGV4IC0gcGVyVmlldylcbiAgICAgIH1cblxuICAgICAgLy8gXCJtb2R1bG8gbGVuZ3RoXCIgY29udmVydHMgYW4gaW5kZXggdGhhdCBlcXVhbHMgbGVuZ3RoIHRvIHplcm9cbiAgICAgIHJldHVybiAoaW5kZXggKyBwZXJWaWV3KSAlIGxlbmd0aFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0VHJhdmVsRGlzdGFuY2UgKCkge1xuICAgICAgY29uc3QgdHJhdmVsRGlzdGFuY2UgPSBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGggKiBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3XG5cbiAgICAgIGlmIChDb21wb25lbnRzLlJ1bi5pc09mZnNldCgnPicpIHx8IENvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCd8PicpKSB7XG4gICAgICAgIC8vIHJldmVyc2UgdHJhdmVsIGRpc3RhbmNlIHNvIHRoYXQgd2UgZG9uJ3QgaGF2ZSB0byBjaGFuZ2Ugc3VidHJhY3Qgb3BlcmF0aW9uc1xuICAgICAgICByZXR1cm4gdHJhdmVsRGlzdGFuY2UgKiAtMVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhdmVsRGlzdGFuY2VcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5ldyB0cmFuc2xhdGUgdmFsdWU6XG4gICAqIC0gb24gbW92ZSB0byByZWZsZWN0IGluZGV4IGNoYW5nZVxuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEkgdG8gcmVmbGVjdCBwb3NzaWJsZSBjaGFuZ2VzIGluIG9wdGlvbnNcbiAgICovXG4gIEV2ZW50cy5vbignbW92ZScsIChjb250ZXh0KSA9PiB7XG4gICAgaWYgKCFHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykgfHwgIUNvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCkpIHtcbiAgICAgIHJldHVybiBUcmFuc2xhdGUuc2V0KGNvbnRleHQubW92ZW1lbnQpXG4gICAgfVxuXG4gICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKCgpID0+IHtcbiAgICAgIEV2ZW50cy5lbWl0KCd0cmFuc2xhdGUuanVtcCcpXG5cbiAgICAgIFRyYW5zbGF0ZS5zZXQoQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICogR2xpZGUuaW5kZXgpXG4gICAgfSlcblxuICAgIGNvbnN0IHN0YXJ0V2lkdGggPSBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGggKiBDb21wb25lbnRzLlRyYW5zbGF0ZS5nZXRTdGFydEluZGV4KClcbiAgICByZXR1cm4gVHJhbnNsYXRlLnNldChzdGFydFdpZHRoIC0gQ29tcG9uZW50cy5UcmFuc2xhdGUuZ2V0VHJhdmVsRGlzdGFuY2UoKSlcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3ZlIHRyYW5zbGF0ZTpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgVHJhbnNsYXRlLnJlbW92ZSgpXG4gIH0pXG5cbiAgcmV0dXJuIFRyYW5zbGF0ZVxufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSG9sZHMgaW5hY3Rpdml0eSBzdGF0dXMgb2YgdHJhbnNpdGlvbi5cbiAgICogV2hlbiB0cnVlIHRyYW5zaXRpb24gaXMgbm90IGFwcGxpZWQuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgbGV0IGRpc2FibGVkID0gZmFsc2VcblxuICBjb25zdCBUcmFuc2l0aW9uID0ge1xuICAgIC8qKlxuICAgICAqIENvbXBvc2VzIHN0cmluZyBvZiB0aGUgQ1NTIHRyYW5zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgY29tcG9zZSAocHJvcGVydHkpIHtcbiAgICAgIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgIGlmICghZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIGAke3Byb3BlcnR5fSAke3RoaXMuZHVyYXRpb259bXMgJHtzZXR0aW5ncy5hbmltYXRpb25UaW1pbmdGdW5jfWBcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGAke3Byb3BlcnR5fSAwbXMgJHtzZXR0aW5ncy5hbmltYXRpb25UaW1pbmdGdW5jfWBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0cmFuc2l0aW9uIG9uIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nPX0gcHJvcGVydHlcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldCAocHJvcGVydHkgPSAndHJhbnNmb3JtJykge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUudHJhbnNpdGlvbiA9IHRoaXMuY29tcG9zZShwcm9wZXJ0eSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB2YWx1ZSBvZiB0cmFuc2l0aW9uIGZyb20gSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmUgKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUudHJhbnNpdGlvbiA9ICcnXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJ1bnMgY2FsbGJhY2sgYWZ0ZXIgYW5pbWF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZnRlciAoY2FsbGJhY2spIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9LCB0aGlzLmR1cmF0aW9uKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZW5hYmxlICgpIHtcbiAgICAgIGRpc2FibGVkID0gZmFsc2VcblxuICAgICAgdGhpcy5zZXQoKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlIHRyYW5zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGRpc2FibGUgKCkge1xuICAgICAgZGlzYWJsZWQgPSB0cnVlXG5cbiAgICAgIHRoaXMuc2V0KClcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoVHJhbnNpdGlvbiwgJ2R1cmF0aW9uJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgZHVyYXRpb24gb2YgdGhlIHRyYW5zaXRpb24gYmFzZWRcbiAgICAgKiBvbiBjdXJyZW50bHkgcnVubmluZyBhbmltYXRpb24gdHlwZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgaWYgKEdsaWRlLmlzVHlwZSgnc2xpZGVyJykgJiYgQ29tcG9uZW50cy5SdW4ub2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBzZXR0aW5ncy5yZXdpbmREdXJhdGlvblxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0dGluZ3MuYW5pbWF0aW9uRHVyYXRpb25cbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIFNldCB0cmFuc2l0aW9uIGBzdHlsZWAgdmFsdWU6XG4gICAqIC0gb24gZWFjaCBtb3ZpbmcsIGJlY2F1c2UgaXQgbWF5IGJlIGNsZWFyZWQgYnkgb2Zmc2V0IG1vdmVcbiAgICovXG4gIEV2ZW50cy5vbignbW92ZScsICgpID0+IHtcbiAgICBUcmFuc2l0aW9uLnNldCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIERpc2FibGUgdHJhbnNpdGlvbjpcbiAgICogLSBiZWZvcmUgaW5pdGlhbCBidWlsZCB0byBhdm9pZCB0cmFuc2l0aW9uaW5nIGZyb20gYDBgIHRvIGBzdGFydEF0YCBpbmRleFxuICAgKiAtIHdoaWxlIHJlc2l6aW5nIHdpbmRvdyBhbmQgcmVjYWxjdWxhdGluZyBkaW1lbnRpb25zXG4gICAqIC0gb24ganVtcGluZyBmcm9tIG9mZnNldCB0cmFuc2l0aW9uIGF0IHN0YXJ0IGFuZCBlbmQgZWRnZXMgaW4gYGNhcm91c2VsYCB0eXBlXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAncmVzaXplJywgJ3RyYW5zbGF0ZS5qdW1wJ10sICgpID0+IHtcbiAgICBUcmFuc2l0aW9uLmRpc2FibGUoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBFbmFibGUgdHJhbnNpdGlvbjpcbiAgICogLSBvbiBlYWNoIHJ1bm5pbmcsIGJlY2F1c2UgaXQgbWF5IGJlIGRpc2FibGVkIGJ5IG9mZnNldCBtb3ZlXG4gICAqL1xuICBFdmVudHMub24oJ3J1bicsICgpID0+IHtcbiAgICBUcmFuc2l0aW9uLmVuYWJsZSgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0cmFuc2l0aW9uOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBUcmFuc2l0aW9uLnJlbW92ZSgpXG4gIH0pXG5cbiAgcmV0dXJuIFRyYW5zaXRpb25cbn1cbiIsIi8qKlxuICogVGVzdCB2aWEgYSBnZXR0ZXIgaW4gdGhlIG9wdGlvbnMgb2JqZWN0IHRvIHNlZVxuICogaWYgdGhlIHBhc3NpdmUgcHJvcGVydHkgaXMgYWNjZXNzZWQuXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vV0lDRy9FdmVudExpc3RlbmVyT3B0aW9ucy9ibG9iL2doLXBhZ2VzL2V4cGxhaW5lci5tZCNmZWF0dXJlLWRldGVjdGlvblxuICovXG5cbmxldCBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZVxuXG50cnkge1xuICBsZXQgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgZ2V0ICgpIHtcbiAgICAgIHN1cHBvcnRzUGFzc2l2ZSA9IHRydWVcbiAgICB9XG4gIH0pXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlJywgbnVsbCwgb3B0cylcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlJywgbnVsbCwgb3B0cylcbn0gY2F0Y2ggKGUpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnRzUGFzc2l2ZVxuIiwiaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICcuLi91dGlscy93YWl0J1xuaW1wb3J0IHsgdG9JbnQsIHRvRmxvYXQgfSBmcm9tICcuLi91dGlscy91bml0J1xuaW1wb3J0IHN1cHBvcnRzUGFzc2l2ZSBmcm9tICcuLi91dGlscy9kZXRlY3QtcGFzc2l2ZS1ldmVudCdcblxuaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmNvbnN0IFNUQVJUX0VWRU5UUyA9IFsndG91Y2hzdGFydCcsICdtb3VzZWRvd24nXVxuY29uc3QgTU9WRV9FVkVOVFMgPSBbJ3RvdWNobW92ZScsICdtb3VzZW1vdmUnXVxuY29uc3QgRU5EX0VWRU5UUyA9IFsndG91Y2hlbmQnLCAndG91Y2hjYW5jZWwnLCAnbW91c2V1cCcsICdtb3VzZWxlYXZlJ11cbmNvbnN0IE1PVVNFX0VWRU5UUyA9IFsnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZXVwJywgJ21vdXNlbGVhdmUnXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIGxldCBzd2lwZVNpbiA9IDBcbiAgbGV0IHN3aXBlU3RhcnRYID0gMFxuICBsZXQgc3dpcGVTdGFydFkgPSAwXG4gIGxldCBkaXNhYmxlZCA9IGZhbHNlXG4gIGxldCBjYXB0dXJlID0gKHN1cHBvcnRzUGFzc2l2ZSkgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlXG5cbiAgY29uc3QgU3dpcGUgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgc3dpcGUgYmluZGluZ3MuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuYmluZFN3aXBlU3RhcnQoKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBgc3dpcGVzdGFydGAgZXZlbnQuIENhbGN1bGF0ZXMgZW50cnkgcG9pbnRzIG9mIHRoZSB1c2VyJ3MgdGFwLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzdGFydCAoZXZlbnQpIHtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZSgpXG5cbiAgICAgICAgbGV0IHN3aXBlID0gdGhpcy50b3VjaGVzKGV2ZW50KVxuXG4gICAgICAgIHN3aXBlU2luID0gbnVsbFxuICAgICAgICBzd2lwZVN0YXJ0WCA9IHRvSW50KHN3aXBlLnBhZ2VYKVxuICAgICAgICBzd2lwZVN0YXJ0WSA9IHRvSW50KHN3aXBlLnBhZ2VZKVxuXG4gICAgICAgIHRoaXMuYmluZFN3aXBlTW92ZSgpXG4gICAgICAgIHRoaXMuYmluZFN3aXBlRW5kKClcblxuICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUuc3RhcnQnKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBgc3dpcGVtb3ZlYCBldmVudC4gQ2FsY3VsYXRlcyB1c2VyJ3MgdGFwIGFuZ2xlIGFuZCBkaXN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIG1vdmUgKGV2ZW50KSB7XG4gICAgICBpZiAoIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIGxldCB7IHRvdWNoQW5nbGUsIHRvdWNoUmF0aW8sIGNsYXNzZXMgfSA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgICAgbGV0IHN3aXBlID0gdGhpcy50b3VjaGVzKGV2ZW50KVxuXG4gICAgICAgIGxldCBzdWJFeFN4ID0gdG9JbnQoc3dpcGUucGFnZVgpIC0gc3dpcGVTdGFydFhcbiAgICAgICAgbGV0IHN1YkV5U3kgPSB0b0ludChzd2lwZS5wYWdlWSkgLSBzd2lwZVN0YXJ0WVxuICAgICAgICBsZXQgcG93RVggPSBNYXRoLmFicyhzdWJFeFN4IDw8IDIpXG4gICAgICAgIGxldCBwb3dFWSA9IE1hdGguYWJzKHN1YkV5U3kgPDwgMilcbiAgICAgICAgbGV0IHN3aXBlSHlwb3RlbnVzZSA9IE1hdGguc3FydChwb3dFWCArIHBvd0VZKVxuICAgICAgICBsZXQgc3dpcGVDYXRoZXR1cyA9IE1hdGguc3FydChwb3dFWSlcblxuICAgICAgICBzd2lwZVNpbiA9IE1hdGguYXNpbihzd2lwZUNhdGhldHVzIC8gc3dpcGVIeXBvdGVudXNlKVxuXG4gICAgICAgIGlmIChzd2lwZVNpbiAqIDE4MCAvIE1hdGguUEkgPCB0b3VjaEFuZ2xlKSB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgICAgICAgIENvbXBvbmVudHMuTW92ZS5tYWtlKHN1YkV4U3ggKiB0b0Zsb2F0KHRvdWNoUmF0aW8pKVxuXG4gICAgICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LmFkZChjbGFzc2VzLmRyYWdnaW5nKVxuXG4gICAgICAgICAgRXZlbnRzLmVtaXQoJ3N3aXBlLm1vdmUnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGBzd2lwZWVuZGAgZXZlbnQuIEZpbml0aWFsaXplcyB1c2VyJ3MgdGFwIGFuZCBkZWNpZGVzIGFib3V0IGdsaWRlIG1vdmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGVuZCAoZXZlbnQpIHtcbiAgICAgIGlmICghR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgICBsZXQgc3dpcGUgPSB0aGlzLnRvdWNoZXMoZXZlbnQpXG4gICAgICAgIGxldCB0aHJlc2hvbGQgPSB0aGlzLnRocmVzaG9sZChldmVudClcblxuICAgICAgICBsZXQgc3dpcGVEaXN0YW5jZSA9IHN3aXBlLnBhZ2VYIC0gc3dpcGVTdGFydFhcbiAgICAgICAgbGV0IHN3aXBlRGVnID0gc3dpcGVTaW4gKiAxODAgLyBNYXRoLlBJXG4gICAgICAgIGxldCBzdGVwcyA9IE1hdGgucm91bmQoc3dpcGVEaXN0YW5jZSAvIENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aClcblxuICAgICAgICB0aGlzLmVuYWJsZSgpXG5cbiAgICAgICAgaWYgKHN3aXBlRGlzdGFuY2UgPiB0aHJlc2hvbGQgJiYgc3dpcGVEZWcgPCBzZXR0aW5ncy50b3VjaEFuZ2xlKSB7XG4gICAgICAgICAgLy8gV2hpbGUgc3dpcGUgaXMgcG9zaXRpdmUgYW5kIGdyZWF0ZXIgdGhhbiB0aHJlc2hvbGQgbW92ZSBiYWNrd2FyZC5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MucGVyVG91Y2gpIHtcbiAgICAgICAgICAgIHN0ZXBzID0gTWF0aC5taW4oc3RlcHMsIHRvSW50KHNldHRpbmdzLnBlclRvdWNoKSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoQ29tcG9uZW50cy5EaXJlY3Rpb24uaXMoJ3J0bCcpKSB7XG4gICAgICAgICAgICBzdGVwcyA9IC1zdGVwc1xuICAgICAgICAgIH1cblxuICAgICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZShgPCR7c3RlcHN9YCkpXG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgc3dpcGVEaXN0YW5jZSA8IC10aHJlc2hvbGQgJiZcbiAgICAgICAgICBzd2lwZURlZyA8IHNldHRpbmdzLnRvdWNoQW5nbGVcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gV2hpbGUgc3dpcGUgaXMgbmVnYXRpdmUgYW5kIGxvd2VyIHRoYW4gbmVnYXRpdmUgdGhyZXNob2xkIG1vdmUgZm9yd2FyZC5cbiAgICAgICAgICBpZiAoc2V0dGluZ3MucGVyVG91Y2gpIHtcbiAgICAgICAgICAgIHN0ZXBzID0gTWF0aC5tYXgoc3RlcHMsIC10b0ludChzZXR0aW5ncy5wZXJUb3VjaCkpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICAgICAgc3RlcHMgPSAtc3RlcHNcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKENvbXBvbmVudHMuRGlyZWN0aW9uLnJlc29sdmUoYD4ke3N0ZXBzfWApKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFdoaWxlIHN3aXBlIGRvbid0IHJlYWNoIGRpc3RhbmNlIGFwcGx5IHByZXZpb3VzIHRyYW5zZm9ybS5cbiAgICAgICAgICBDb21wb25lbnRzLk1vdmUubWFrZSgpXG4gICAgICAgIH1cblxuICAgICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QucmVtb3ZlKHNldHRpbmdzLmNsYXNzZXMuZHJhZ2dpbmcpXG5cbiAgICAgICAgdGhpcy51bmJpbmRTd2lwZU1vdmUoKVxuICAgICAgICB0aGlzLnVuYmluZFN3aXBlRW5kKClcblxuICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUuZW5kJylcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBzdGFydGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZFN3aXBlU3RhcnQgKCkge1xuICAgICAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgaWYgKHNldHRpbmdzLnN3aXBlVGhyZXNob2xkKSB7XG4gICAgICAgIEJpbmRlci5vbihTVEFSVF9FVkVOVFNbMF0sIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXJ0KGV2ZW50KVxuICAgICAgICB9LCBjYXB0dXJlKVxuICAgICAgfVxuXG4gICAgICBpZiAoc2V0dGluZ3MuZHJhZ1RocmVzaG9sZCkge1xuICAgICAgICBCaW5kZXIub24oU1RBUlRfRVZFTlRTWzFdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGFydChldmVudClcbiAgICAgICAgfSwgY2FwdHVyZSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIHN0YXJ0aW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmRTd2lwZVN0YXJ0ICgpIHtcbiAgICAgIEJpbmRlci5vZmYoU1RBUlRfRVZFTlRTWzBdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgY2FwdHVyZSlcbiAgICAgIEJpbmRlci5vZmYoU1RBUlRfRVZFTlRTWzFdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgY2FwdHVyZSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBtb3ZpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmRTd2lwZU1vdmUgKCkge1xuICAgICAgQmluZGVyLm9uKE1PVkVfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgdGhyb3R0bGUoKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMubW92ZShldmVudClcbiAgICAgIH0sIEdsaWRlLnNldHRpbmdzLnRocm90dGxlKSwgY2FwdHVyZSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIG1vdmluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kU3dpcGVNb3ZlICgpIHtcbiAgICAgIEJpbmRlci5vZmYoTU9WRV9FVkVOVFMsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCBjYXB0dXJlKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBzd2lwZSdzIGVuZGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZFN3aXBlRW5kICgpIHtcbiAgICAgIEJpbmRlci5vbihFTkRfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuZW5kKGV2ZW50KVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBzd2lwZSdzIGVuZGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kU3dpcGVFbmQgKCkge1xuICAgICAgQmluZGVyLm9mZihFTkRfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlcilcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTm9ybWFsaXplcyBldmVudCB0b3VjaGVzIHBvaW50cyBhY2NvcnRpbmcgdG8gZGlmZmVyZW50IHR5cGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgdG91Y2hlcyAoZXZlbnQpIHtcbiAgICAgIGlmIChNT1VTRV9FVkVOVFMuaW5kZXhPZihldmVudC50eXBlKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBldmVudFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIG1pbmltdW0gc3dpcGUgZGlzdGFuY2Ugc2V0dGluZ3MgYmFzZWQgb24gZXZlbnQgdHlwZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICB0aHJlc2hvbGQgKGV2ZW50KSB7XG4gICAgICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICBpZiAoTU9VU0VfRVZFTlRTLmluZGV4T2YoZXZlbnQudHlwZSkgPiAtMSkge1xuICAgICAgICByZXR1cm4gc2V0dGluZ3MuZHJhZ1RocmVzaG9sZFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGRcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBzd2lwZSBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3NlbGZ9XG4gICAgICovXG4gICAgZW5hYmxlICgpIHtcbiAgICAgIGRpc2FibGVkID0gZmFsc2VcblxuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmVuYWJsZSgpXG5cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHN3aXBlIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBkaXNhYmxlICgpIHtcbiAgICAgIGRpc2FibGVkID0gdHJ1ZVxuXG4gICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uZGlzYWJsZSgpXG5cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjb21wb25lbnQgY2xhc3M6XG4gICAqIC0gYWZ0ZXIgaW5pdGlhbCBidWlsZGluZ1xuICAgKi9cbiAgRXZlbnRzLm9uKCdidWlsZC5hZnRlcicsICgpID0+IHtcbiAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuc3dpcGVhYmxlKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgc3dpcGluZyBiaW5kaW5nczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byByZW1vdmUgYWRkZWQgRXZlbnRMaXN0ZW5lcnNcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBTd2lwZS51bmJpbmRTd2lwZVN0YXJ0KClcbiAgICBTd2lwZS51bmJpbmRTd2lwZU1vdmUoKVxuICAgIFN3aXBlLnVuYmluZFN3aXBlRW5kKClcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIFN3aXBlXG59XG4iLCJpbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICBjb25zdCBJbWFnZXMgPSB7XG4gICAgLyoqXG4gICAgICogQmluZHMgbGlzdGVuZXIgdG8gZ2xpZGUgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5iaW5kKClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgYGRyYWdzdGFydGAgZXZlbnQgb24gd3JhcHBlciB0byBwcmV2ZW50IGRyYWdnaW5nIGltYWdlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZCAoKSB7XG4gICAgICBCaW5kZXIub24oJ2RyYWdzdGFydCcsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCB0aGlzLmRyYWdzdGFydClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBgZHJhZ3N0YXJ0YCBldmVudCBvbiB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQgKCkge1xuICAgICAgQmluZGVyLm9mZignZHJhZ3N0YXJ0JywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZXIuIFByZXZlbnRzIGRyYWdnaW5nLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBkcmFnc3RhcnQgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBiaW5kaW5ncyBmcm9tIGltYWdlczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byByZW1vdmUgYWRkZWQgRXZlbnRMaXN0ZW5lcnNcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBJbWFnZXMudW5iaW5kKClcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIEltYWdlc1xufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuXG5pbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICAvKipcbiAgICogSG9sZHMgZGV0YWNoaW5nIHN0YXR1cyBvZiBhbmNob3JzLlxuICAgKiBQcmV2ZW50cyBkZXRhY2hpbmcgb2YgYWxyZWFkeSBkZXRhY2hlZCBhbmNob3JzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGxldCBkZXRhY2hlZCA9IGZhbHNlXG5cbiAgLyoqXG4gICAqIEhvbGRzIHByZXZlbnRpbmcgc3RhdHVzIG9mIGFuY2hvcnMuXG4gICAqIElmIGB0cnVlYCByZWRpcmVjdGlvbiBhZnRlciBjbGljayB3aWxsIGJlIGRpc2FibGVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGxldCBwcmV2ZW50ZWQgPSBmYWxzZVxuXG4gIGNvbnN0IEFuY2hvcnMgPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXBzIGEgaW5pdGlhbCBzdGF0ZSBvZiBhbmNob3JzIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIC8qKlxuICAgICAgICogSG9sZHMgY29sbGVjdGlvbiBvZiBhbmNob3JzIGVsZW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwcml2YXRlXG4gICAgICAgKiBAdHlwZSB7SFRNTENvbGxlY3Rpb259XG4gICAgICAgKi9cbiAgICAgIHRoaXMuX2EgPSBDb21wb25lbnRzLkh0bWwud3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKCdhJylcblxuICAgICAgdGhpcy5iaW5kKClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgZXZlbnRzIHRvIGFuY2hvcnMgaW5zaWRlIGEgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQgKCkge1xuICAgICAgQmluZGVyLm9uKCdjbGljaycsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCB0aGlzLmNsaWNrKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIGV2ZW50cyBhdHRhY2hlZCB0byBhbmNob3JzIGluc2lkZSBhIHRyYWNrLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQgKCkge1xuICAgICAgQmluZGVyLm9mZignY2xpY2snLCBDb21wb25lbnRzLkh0bWwud3JhcHBlcilcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgY2xpY2sgZXZlbnQuIFByZXZlbnRzIGNsaWNrcyB3aGVuIGdsaWRlIGlzIGluIGBwcmV2ZW50YCBzdGF0dXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBjbGljayAoZXZlbnQpIHtcbiAgICAgIGlmIChwcmV2ZW50ZWQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyBhbmNob3JzIGNsaWNrIGV2ZW50IGluc2lkZSBnbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3NlbGZ9XG4gICAgICovXG4gICAgZGV0YWNoICgpIHtcbiAgICAgIHByZXZlbnRlZCA9IHRydWVcblxuICAgICAgaWYgKCFkZXRhY2hlZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLml0ZW1zW2ldLmRyYWdnYWJsZSA9IGZhbHNlXG5cbiAgICAgICAgICB0aGlzLml0ZW1zW2ldLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICdkYXRhLWhyZWYnLFxuICAgICAgICAgICAgdGhpcy5pdGVtc1tpXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKVxuICAgICAgICAgIClcblxuICAgICAgICAgIHRoaXMuaXRlbXNbaV0ucmVtb3ZlQXR0cmlidXRlKCdocmVmJylcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGFjaGVkID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyBhbmNob3JzIGNsaWNrIGV2ZW50cyBpbnNpZGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzZWxmfVxuICAgICAqL1xuICAgIGF0dGFjaCAoKSB7XG4gICAgICBwcmV2ZW50ZWQgPSBmYWxzZVxuXG4gICAgICBpZiAoZGV0YWNoZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5kcmFnZ2FibGUgPSB0cnVlXG5cbiAgICAgICAgICB0aGlzLml0ZW1zW2ldLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICdocmVmJyxcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLWhyZWYnKVxuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGFjaGVkID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoQW5jaG9ycywgJ2l0ZW1zJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgY29sbGVjdGlvbiBvZiB0aGUgYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gQW5jaG9ycy5fYVxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogRGV0YWNoIGFuY2hvcnMgaW5zaWRlIHNsaWRlczpcbiAgICogLSBvbiBzd2lwaW5nLCBzbyB0aGV5IHdvbid0IHJlZGlyZWN0IHRvIGl0cyBgaHJlZmAgYXR0cmlidXRlc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdzd2lwZS5tb3ZlJywgKCkgPT4ge1xuICAgIEFuY2hvcnMuZGV0YWNoKClcbiAgfSlcblxuICAvKipcbiAgICogQXR0YWNoIGFuY2hvcnMgaW5zaWRlIHNsaWRlczpcbiAgICogLSBhZnRlciBzd2lwaW5nIGFuZCB0cmFuc2l0aW9ucyBlbmRzLCBzbyB0aGV5IGNhbiByZWRpcmVjdCBhZnRlciBjbGljayBhZ2FpblxuICAgKi9cbiAgRXZlbnRzLm9uKCdzd2lwZS5lbmQnLCAoKSA9PiB7XG4gICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKCgpID0+IHtcbiAgICAgIEFuY2hvcnMuYXR0YWNoKClcbiAgICB9KVxuICB9KVxuXG4gIC8qKlxuICAgKiBVbmJpbmQgYW5jaG9ycyBpbnNpZGUgc2xpZGVzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGJyaW5nIGFuY2hvcnMgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBBbmNob3JzLmF0dGFjaCgpXG4gICAgQW5jaG9ycy51bmJpbmQoKVxuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gQW5jaG9yc1xufVxuIiwiaW1wb3J0IHsgc2libGluZ3MgfSBmcm9tICcuLi91dGlscy9kb20nXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgc3VwcG9ydHNQYXNzaXZlIGZyb20gJy4uL3V0aWxzL2RldGVjdC1wYXNzaXZlLWV2ZW50J1xuXG5pbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuY29uc3QgTkFWX1NFTEVDVE9SID0gJ1tkYXRhLWdsaWRlLWVsPVwiY29udHJvbHNbbmF2XVwiXSdcbmNvbnN0IENPTlRST0xTX1NFTEVDVE9SID0gJ1tkYXRhLWdsaWRlLWVsXj1cImNvbnRyb2xzXCJdJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIGxldCBjYXB0dXJlID0gKHN1cHBvcnRzUGFzc2l2ZSkgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlXG5cbiAgY29uc3QgQ29udHJvbHMgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdHMgYXJyb3dzLiBCaW5kcyBldmVudHMgbGlzdGVuZXJzXG4gICAgICogdG8gdGhlIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICAvKipcbiAgICAgICAqIENvbGxlY3Rpb24gb2YgbmF2aWdhdGlvbiBIVE1MIGVsZW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwcml2YXRlXG4gICAgICAgKiBAdHlwZSB7SFRNTENvbGxlY3Rpb259XG4gICAgICAgKi9cbiAgICAgIHRoaXMuX24gPSBDb21wb25lbnRzLkh0bWwucm9vdC5xdWVyeVNlbGVjdG9yQWxsKE5BVl9TRUxFQ1RPUilcblxuICAgICAgLyoqXG4gICAgICAgKiBDb2xsZWN0aW9uIG9mIGNvbnRyb2xzIEhUTUwgZWxlbWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHtIVE1MQ29sbGVjdGlvbn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5fYyA9IENvbXBvbmVudHMuSHRtbC5yb290LnF1ZXJ5U2VsZWN0b3JBbGwoQ09OVFJPTFNfU0VMRUNUT1IpXG5cbiAgICAgIHRoaXMuYWRkQmluZGluZ3MoKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXRBY3RpdmUgKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3ModGhpcy5fbltpXS5jaGlsZHJlbilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQWN0aXZlICgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKHRoaXMuX25baV0uY2hpbGRyZW4pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgYWN0aXZlIGNsYXNzIG9uIGl0ZW1zIGluc2lkZSBuYXZpZ2F0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGNvbnRyb2xzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZGRDbGFzcyAoY29udHJvbHMpIHtcbiAgICAgIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG4gICAgICBsZXQgaXRlbSA9IGNvbnRyb2xzW0dsaWRlLmluZGV4XVxuXG4gICAgICBpZiAoaXRlbSkge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoc2V0dGluZ3MuY2xhc3Nlcy5hY3RpdmVOYXYpXG5cbiAgICAgICAgc2libGluZ3MoaXRlbSkuZm9yRWFjaChzaWJsaW5nID0+IHtcbiAgICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoc2V0dGluZ3MuY2xhc3Nlcy5hY3RpdmVOYXYpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWN0aXZlIGNsYXNzIGZyb20gYWN0aXZlIGNvbnRyb2wuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gY29udHJvbHNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzIChjb250cm9scykge1xuICAgICAgbGV0IGl0ZW0gPSBjb250cm9sc1tHbGlkZS5pbmRleF1cblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGhhbmRsZXMgdG8gdGhlIGVhY2ggZ3JvdXAgb2YgY29udHJvbHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFkZEJpbmRpbmdzICgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmJpbmQodGhpcy5fY1tpXS5jaGlsZHJlbilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBoYW5kbGVzIGZyb20gdGhlIGVhY2ggZ3JvdXAgb2YgY29udHJvbHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUJpbmRpbmdzICgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnVuYmluZCh0aGlzLl9jW2ldLmNoaWxkcmVuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBldmVudHMgdG8gYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBlbGVtZW50c1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZCAoZWxlbWVudHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQmluZGVyLm9uKCdjbGljaycsIGVsZW1lbnRzW2ldLCB0aGlzLmNsaWNrKVxuICAgICAgICBCaW5kZXIub24oJ3RvdWNoc3RhcnQnLCBlbGVtZW50c1tpXSwgdGhpcy5jbGljaywgY2FwdHVyZSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBldmVudHMgYmluZGVkIHRvIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IGVsZW1lbnRzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQgKGVsZW1lbnRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIEJpbmRlci5vZmYoWydjbGljaycsICd0b3VjaHN0YXJ0J10sIGVsZW1lbnRzW2ldKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGBjbGlja2AgZXZlbnQgb24gdGhlIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgICAqIE1vdmVzIHNsaWRlciBpbiBkcmllY3Rpb24gcHJlY2lzZWQgaW5cbiAgICAgKiBgZGF0YS1nbGlkZS1kaXJgIGF0dHJpYnV0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgY2xpY2sgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZShldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1nbGlkZS1kaXInKSkpXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKENvbnRyb2xzLCAnaXRlbXMnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBjb2xsZWN0aW9uIG9mIHRoZSBjb250cm9scyBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIENvbnRyb2xzLl9jXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBTd2FwIGFjdGl2ZSBjbGFzcyBvZiBjdXJyZW50IG5hdmlnYXRpb24gaXRlbTpcbiAgICogLSBhZnRlciBtb3VudGluZyB0byBzZXQgaXQgdG8gaW5pdGlhbCBpbmRleFxuICAgKiAtIGFmdGVyIGVhY2ggbW92ZSB0byB0aGUgbmV3IGluZGV4XG4gICAqL1xuICBFdmVudHMub24oWydtb3VudC5hZnRlcicsICdtb3ZlLmFmdGVyJ10sICgpID0+IHtcbiAgICBDb250cm9scy5zZXRBY3RpdmUoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgYW5kIEhUTUwgQ2xhc3NlczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBDb250cm9scy5yZW1vdmVCaW5kaW5ncygpXG4gICAgQ29udHJvbHMucmVtb3ZlQWN0aXZlKClcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIENvbnRyb2xzXG59XG4iLCJpbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICBjb25zdCBLZXlib2FyZCA9IHtcbiAgICAvKipcbiAgICAgKiBCaW5kcyBrZXlib2FyZCBldmVudHMgb24gY29tcG9uZW50IG1vdW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3Mua2V5Ym9hcmQpIHtcbiAgICAgICAgdGhpcy5iaW5kKClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBrZXlib2FyZCBwcmVzcyBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQgKCkge1xuICAgICAgQmluZGVyLm9uKCdrZXl1cCcsIGRvY3VtZW50LCB0aGlzLnByZXNzKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGtleWJvYXJkIHByZXNzIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kICgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ2tleXVwJywgZG9jdW1lbnQpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMga2V5Ym9hcmQncyBhcnJvd3MgcHJlc3MgYW5kIG1vdmluZyBnbGlkZSBmb3dhcmQgYW5kIGJhY2t3YXJkLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcHJlc3MgKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkpIHtcbiAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc+JykpXG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzNykge1xuICAgICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKENvbXBvbmVudHMuRGlyZWN0aW9uLnJlc29sdmUoJzwnKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGZyb20ga2V5Ym9hcmQ6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byByZW1vdmUgYWRkZWQgZXZlbnRzXG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVtb3ZlIGV2ZW50cyBiZWZvcmUgcmVtb3VudGluZ1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIEtleWJvYXJkLnVuYmluZCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW91bnQgY29tcG9uZW50XG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVmbGVjdCBwb3RlbnRpYWwgY2hhbmdlcyBpbiBzZXR0aW5nc1xuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgS2V5Ym9hcmQubW91bnQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGJpbmRlcjpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIHJlbW92ZSBsaXN0ZW5lcnNcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIEtleWJvYXJkXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgeyB0b0ludCwgaXNVbmRlZmluZWQgfSBmcm9tICcuLi91dGlscy91bml0J1xuXG5pbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICBjb25zdCBBdXRvcGxheSA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhdXRvcGxheWluZyBhbmQgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLnN0YXJ0KClcblxuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmhvdmVycGF1c2UpIHtcbiAgICAgICAgdGhpcy5iaW5kKClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIGF1dG9wbGF5aW5nIGluIGNvbmZpZ3VyZWQgaW50ZXJ2YWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW58TnVtYmVyfSBmb3JjZSBSdW4gYXV0b3BsYXlpbmcgd2l0aCBwYXNzZWQgaW50ZXJ2YWwgcmVnYXJkbGVzcyBvZiBgYXV0b3BsYXlgIHNldHRpbmdzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzdGFydCAoKSB7XG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3MuYXV0b3BsYXkpIHtcbiAgICAgICAgaWYgKGlzVW5kZWZpbmVkKHRoaXMuX2kpKSB7XG4gICAgICAgICAgdGhpcy5faSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpXG5cbiAgICAgICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoJz4nKVxuXG4gICAgICAgICAgICB0aGlzLnN0YXJ0KClcbiAgICAgICAgICB9LCB0aGlzLnRpbWUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgYXV0b3J1bm5pbmcgb2YgdGhlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzdG9wICgpIHtcbiAgICAgIHRoaXMuX2kgPSBjbGVhckludGVydmFsKHRoaXMuX2kpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3BzIGF1dG9wbGF5aW5nIHdoaWxlIG1vdXNlIGlzIG92ZXIgZ2xpZGUncyBhcmVhLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kICgpIHtcbiAgICAgIEJpbmRlci5vbignbW91c2VvdmVyJywgQ29tcG9uZW50cy5IdG1sLnJvb3QsICgpID0+IHtcbiAgICAgICAgdGhpcy5zdG9wKClcbiAgICAgIH0pXG5cbiAgICAgIEJpbmRlci5vbignbW91c2VvdXQnLCBDb21wb25lbnRzLkh0bWwucm9vdCwgKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0KClcbiAgICAgIH0pXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZCBtb3VzZW92ZXIgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kICgpIHtcbiAgICAgIEJpbmRlci5vZmYoWydtb3VzZW92ZXInLCAnbW91c2VvdXQnXSwgQ29tcG9uZW50cy5IdG1sLnJvb3QpXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKEF1dG9wbGF5LCAndGltZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHRpbWUgcGVyaW9kIHZhbHVlIGZvciB0aGUgYXV0b3BsYXkgaW50ZXJ2YWwuIFByaW9yaXRpemVzXG4gICAgICogdGltZXMgaW4gYGRhdGEtZ2xpZGUtYXV0b3BsYXlgIGF0dHJ1YnV0ZXMgb3ZlciBvcHRpb25zLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgYXV0b3BsYXkgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzW0dsaWRlLmluZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2xpZGUtYXV0b3BsYXknKVxuXG4gICAgICBpZiAoYXV0b3BsYXkpIHtcbiAgICAgICAgcmV0dXJuIHRvSW50KGF1dG9wbGF5KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdG9JbnQoR2xpZGUuc2V0dGluZ3MuYXV0b3BsYXkpXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBTdG9wIGF1dG9wbGF5aW5nIGFuZCB1bmJpbmQgZXZlbnRzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGNsZWFyIGRlZmluZWQgaW50ZXJ2YWxcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJIHRvIHJlc2V0IGludGVydmFsIHRoYXQgbWF5IGNoYW5nZWRcbiAgICovXG4gIEV2ZW50cy5vbihbJ2Rlc3Ryb3knLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBBdXRvcGxheS51bmJpbmQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBTdG9wIGF1dG9wbGF5aW5nOlxuICAgKiAtIGJlZm9yZSBlYWNoIHJ1biwgdG8gcmVzdGFydCBhdXRvcGxheWluZ1xuICAgKiAtIG9uIHBhdXNpbmcgdmlhIEFQSVxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGNsZWFyIGRlZmluZWQgaW50ZXJ2YWxcbiAgICogLSB3aGlsZSBzdGFydGluZyBhIHN3aXBlXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZXNldCBpbnRlcnZhbCB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydydW4uYmVmb3JlJywgJ3BhdXNlJywgJ2Rlc3Ryb3knLCAnc3dpcGUuc3RhcnQnLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBBdXRvcGxheS5zdG9wKClcbiAgfSlcblxuICAvKipcbiAgICogU3RhcnQgYXV0b3BsYXlpbmc6XG4gICAqIC0gYWZ0ZXIgZWFjaCBydW4sIHRvIHJlc3RhcnQgYXV0b3BsYXlpbmdcbiAgICogLSBvbiBwbGF5aW5nIHZpYSBBUElcbiAgICogLSB3aGlsZSBlbmRpbmcgYSBzd2lwZVxuICAgKi9cbiAgRXZlbnRzLm9uKFsncnVuLmFmdGVyJywgJ3BsYXknLCAnc3dpcGUuZW5kJ10sICgpID0+IHtcbiAgICBBdXRvcGxheS5zdGFydCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW91bnQgYXV0b3BsYXlpbmc6XG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZXNldCBpbnRlcnZhbCB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsICgpID0+IHtcbiAgICBBdXRvcGxheS5tb3VudCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYSBiaW5kZXI6XG4gICAqIC0gb24gZGVzdHJveWluZyBnbGlkZSBpbnN0YW5jZSB0byBjbGVhcnVwIGxpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gQXV0b3BsYXlcbn1cbiIsImltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlscy9sb2cnXG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJy4uL3V0aWxzL3dhaXQnXG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5pbXBvcnQgeyBzb3J0S2V5cywgbWVyZ2VPcHRpb25zIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuXG5pbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuLyoqXG4gKiBTb3J0cyBrZXlzIG9mIGJyZWFrcG9pbnQgb2JqZWN0IHNvIHRoZXkgd2lsbCBiZSBvcmRlcmVkIGZyb20gbG93ZXIgdG8gYmlnZ2VyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludHNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIHNvcnRCcmVha3BvaW50cyAocG9pbnRzKSB7XG4gIGlmIChpc09iamVjdChwb2ludHMpKSB7XG4gICAgcmV0dXJuIHNvcnRLZXlzKHBvaW50cylcbiAgfSBlbHNlIHtcbiAgICB3YXJuKGBCcmVha3BvaW50cyBvcHRpb24gbXVzdCBiZSBhbiBvYmplY3RgKVxuICB9XG5cbiAgcmV0dXJuIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgLyoqXG4gICAqIEhvbGRzIHJlZmVyZW5jZSB0byBzZXR0aW5ncy5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG5cbiAgLyoqXG4gICAqIEhvbGRzIHJlZmVyZW5jZSB0byBicmVha3BvaW50cyBvYmplY3QgaW4gc2V0dGluZ3MuIFNvcnRzIGJyZWFrcG9pbnRzXG4gICAqIGZyb20gc21hbGxlciB0byBsYXJnZXIuIEl0IGlzIHJlcXVpcmVkIGluIG9yZGVyIHRvIHByb3BlclxuICAgKiBtYXRjaGluZyBjdXJyZW50bHkgYWN0aXZlIGJyZWFrcG9pbnQgc2V0dGluZ3MuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBsZXQgcG9pbnRzID0gc29ydEJyZWFrcG9pbnRzKHNldHRpbmdzLmJyZWFrcG9pbnRzKVxuXG4gIC8qKlxuICAgKiBDYWNoZSBpbml0aWFsIHNldHRpbmdzIGJlZm9yZSBvdmVyd3JpdHRpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBsZXQgZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKHt9LCBzZXR0aW5ncylcblxuICBjb25zdCBCcmVha3BvaW50cyA9IHtcbiAgICAvKipcbiAgICAgKiBNYXRjaGVzIHNldHRpbmdzIGZvciBjdXJyZWN0bHkgbWF0Y2hpbmcgbWVkaWEgYnJlYWtwb2ludC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwb2ludHNcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIG1hdGNoIChwb2ludHMpIHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Lm1hdGNoTWVkaWEgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGZvciAobGV0IHBvaW50IGluIHBvaW50cykge1xuICAgICAgICAgIGlmIChwb2ludHMuaGFzT3duUHJvcGVydHkocG9pbnQpKSB7XG4gICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoYChtYXgtd2lkdGg6ICR7cG9pbnR9cHgpYCkubWF0Y2hlcykge1xuICAgICAgICAgICAgICByZXR1cm4gcG9pbnRzW3BvaW50XVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVmYXVsdHNcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3ZlcndyaXRlIGluc3RhbmNlIHNldHRpbmdzIHdpdGggY3VycmVudGx5IG1hdGNoaW5nIGJyZWFrcG9pbnQgc2V0dGluZ3MuXG4gICAqIFRoaXMgaGFwcGVucyByaWdodCBhZnRlciBjb21wb25lbnQgaW5pdGlhbGl6YXRpb24uXG4gICAqL1xuICBPYmplY3QuYXNzaWduKHNldHRpbmdzLCBCcmVha3BvaW50cy5tYXRjaChwb2ludHMpKVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgZ2xpZGUgd2l0aCBzZXR0aW5ncyBvZiBtYXRjaGVkIGJyZWtwb2ludDpcbiAgICogLSB3aW5kb3cgcmVzaXplIHRvIHVwZGF0ZSBzbGlkZXJcbiAgICovXG4gIEJpbmRlci5vbigncmVzaXplJywgd2luZG93LCB0aHJvdHRsZSgoKSA9PiB7XG4gICAgR2xpZGUuc2V0dGluZ3MgPSBtZXJnZU9wdGlvbnMoc2V0dGluZ3MsIEJyZWFrcG9pbnRzLm1hdGNoKHBvaW50cykpXG4gIH0sIEdsaWRlLnNldHRpbmdzLnRocm90dGxlKSlcblxuICAvKipcbiAgICogUmVzb3J0IGFuZCB1cGRhdGUgZGVmYXVsdCBzZXR0aW5nczpcbiAgICogLSBvbiByZWluaXQgdmlhIEFQSSwgc28gYnJlYWtwb2ludCBtYXRjaGluZyB3aWxsIGJlIHBlcmZvcm1lZCB3aXRoIG9wdGlvbnNcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgKCkgPT4ge1xuICAgIHBvaW50cyA9IHNvcnRCcmVha3BvaW50cyhwb2ludHMpXG5cbiAgICBkZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oe30sIHNldHRpbmdzKVxuICB9KVxuXG4gIC8qKlxuICAgKiBVbmJpbmQgcmVzaXplIGxpc3RlbmVyOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIEJpbmRlci5vZmYoJ3Jlc2l6ZScsIHdpbmRvdylcbiAgfSlcblxuICByZXR1cm4gQnJlYWtwb2ludHNcbn1cbiIsImltcG9ydCBDb3JlIGZyb20gJy4uL3NyYy9pbmRleCdcblxuLy8gUmVxdWlyZWQgY29tcG9uZW50c1xuaW1wb3J0IFJ1biBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9ydW4nXG5pbXBvcnQgR2FwcyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9nYXBzJ1xuaW1wb3J0IEh0bWwgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvaHRtbCdcbmltcG9ydCBQZWVrIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3BlZWsnXG5pbXBvcnQgTW92ZSBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9tb3ZlJ1xuaW1wb3J0IFNpemVzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3NpemVzJ1xuaW1wb3J0IEJ1aWxkIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2J1aWxkJ1xuaW1wb3J0IENsb25lcyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9jbG9uZXMnXG5pbXBvcnQgUmVzaXplIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3Jlc2l6ZSdcbmltcG9ydCBEaXJlY3Rpb24gZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvZGlyZWN0aW9uJ1xuaW1wb3J0IFRyYW5zbGF0ZSBmcm9tICcuLi9zcmMvY29tcG9uZW50cy90cmFuc2xhdGUnXG5pbXBvcnQgVHJhbnNpdGlvbiBmcm9tICcuLi9zcmMvY29tcG9uZW50cy90cmFuc2l0aW9uJ1xuXG4vLyBPcHRpb25hbCBjb21wb25lbnRzXG5pbXBvcnQgU3dpcGUgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvc3dpcGUnXG5pbXBvcnQgSW1hZ2VzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2ltYWdlcydcbmltcG9ydCBBbmNob3JzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2FuY2hvcnMnXG5pbXBvcnQgQ29udHJvbHMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvY29udHJvbHMnXG5pbXBvcnQgS2V5Ym9hcmQgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMva2V5Ym9hcmQnXG5pbXBvcnQgQXV0b3BsYXkgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvYXV0b3BsYXknXG5pbXBvcnQgQnJlYWtwb2ludHMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvYnJlYWtwb2ludHMnXG5cbmNvbnN0IENPTVBPTkVOVFMgPSB7XG4gIC8vIFJlcXVpcmVkXG4gIEh0bWwsXG4gIFRyYW5zbGF0ZSxcbiAgVHJhbnNpdGlvbixcbiAgRGlyZWN0aW9uLFxuICBQZWVrLFxuICBTaXplcyxcbiAgR2FwcyxcbiAgTW92ZSxcbiAgQ2xvbmVzLFxuICBSZXNpemUsXG4gIEJ1aWxkLFxuICBSdW4sXG5cbiAgLy8gT3B0aW9uYWxcbiAgU3dpcGUsXG4gIEltYWdlcyxcbiAgQW5jaG9ycyxcbiAgQ29udHJvbHMsXG4gIEtleWJvYXJkLFxuICBBdXRvcGxheSxcbiAgQnJlYWtwb2ludHNcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2xpZGUgZXh0ZW5kcyBDb3JlIHtcbiAgbW91bnQgKGV4dGVuc2lvbnMgPSB7fSkge1xuICAgIHJldHVybiBzdXBlci5tb3VudChPYmplY3QuYXNzaWduKHt9LCBDT01QT05FTlRTLCBleHRlbnNpb25zKSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbIndhcm4iLCJtc2ciLCJlcnJvciIsInRvSW50IiwidmFsdWUiLCJwYXJzZUludCIsInRvRmxvYXQiLCJwYXJzZUZsb2F0IiwiaXNTdHJpbmciLCJpc09iamVjdCIsInR5cGUiLCJpc051bWJlciIsImlzRnVuY3Rpb24iLCJpc1VuZGVmaW5lZCIsImlzQXJyYXkiLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwibW91bnQiLCJnbGlkZSIsImV4dGVuc2lvbnMiLCJldmVudHMiLCJjb21wb25lbnRzIiwibmFtZSIsImRlZmluZSIsIm9iaiIsInByb3AiLCJkZWZpbml0aW9uIiwiZGVmaW5lUHJvcGVydHkiLCJzb3J0S2V5cyIsIk9iamVjdCIsImtleXMiLCJzb3J0IiwicmVkdWNlIiwiciIsImsiLCJtZXJnZU9wdGlvbnMiLCJkZWZhdWx0cyIsInNldHRpbmdzIiwib3B0aW9ucyIsImJhYmVsSGVscGVycy5leHRlbmRzIiwiaGFzT3duUHJvcGVydHkiLCJjbGFzc2VzIiwiZGlyZWN0aW9uIiwiYnJlYWtwb2ludHMiLCJFdmVudHNCdXMiLCJob3AiLCJldmVudCIsImhhbmRsZXIiLCJpIiwibGVuZ3RoIiwib24iLCJjYWxsIiwiaW5kZXgiLCJwdXNoIiwiY29udGV4dCIsImVtaXQiLCJmb3JFYWNoIiwiaXRlbSIsIkdsaWRlIiwic2VsZWN0b3IiLCJfYyIsIl90IiwiX2UiLCJkaXNhYmxlZCIsInN0YXJ0QXQiLCJ0cmFuc2Zvcm1lcnMiLCJwYXR0ZXJuIiwiUnVuIiwibWFrZSIsImRpc3RhbmNlIiwiVHJhbnNpdGlvbiIsImRpc2FibGUiLCJNb3ZlIiwiaW50ZXJ2YWwiLCJhdXRvcGxheSIsIl9vIiwibyIsIl9pIiwiX2QiLCJzdGF0dXMiLCJDb21wb25lbnRzIiwiRXZlbnRzIiwibW92ZSIsIndhaXRGb3JUcmFuc2l0aW9uIiwiY2FsY3VsYXRlIiwiYWZ0ZXIiLCJpc1N0YXJ0IiwiaXNFbmQiLCJpc09mZnNldCIsImVuYWJsZSIsInN0ZXBzIiwidmlld1NpemUiLCJjb3VudGFibGVTdGVwcyIsInBlclZpZXciLCJjYWxjdWxhdGVGb3J3YXJkSW5kZXgiLCJub3JtYWxpemVGb3J3YXJkSW5kZXgiLCJjYWxjdWxhdGVCYWNrd2FyZEluZGV4Iiwibm9ybWFsaXplQmFja3dhcmRJbmRleCIsInVuZGVmaW5lZCIsImlzVHlwZSIsImZvY3VzQXQiLCJib3VuZCIsInJld2luZCIsImlzQm91bmQiLCJNYXRoIiwiZmxvb3IiLCJ2aWV3IiwiY2VpbCIsIl9tIiwic3RlcCIsInN1YnN0ciIsIkh0bWwiLCJzbGlkZXMiLCJub3ciLCJEYXRlIiwiZ2V0VGltZSIsInRocm90dGxlIiwiZnVuYyIsIndhaXQiLCJ0aW1lb3V0IiwiYXJncyIsInJlc3VsdCIsInByZXZpb3VzIiwibGF0ZXIiLCJsZWFkaW5nIiwiYXBwbHkiLCJ0aHJvdHRsZWQiLCJhdCIsInJlbWFpbmluZyIsImFyZ3VtZW50cyIsInRyYWlsaW5nIiwic2V0VGltZW91dCIsImNhbmNlbCIsIk1BUkdJTl9UWVBFIiwiR2FwcyIsImxlbiIsInN0eWxlIiwiRGlyZWN0aW9uIiwibWFyZ2luTGVmdCIsIm1hcmdpblJpZ2h0IiwiZ2FwIiwiU2l6ZXMiLCJ3cmFwcGVyIiwiY2hpbGRyZW4iLCJyZW1vdmUiLCJzaWJsaW5ncyIsIm5vZGUiLCJwYXJlbnROb2RlIiwibiIsImZpcnN0Q2hpbGQiLCJtYXRjaGVkIiwibmV4dFNpYmxpbmciLCJub2RlVHlwZSIsImV4aXN0Iiwid2luZG93IiwiSFRNTEVsZW1lbnQiLCJUUkFDS19TRUxFQ1RPUiIsInJvb3QiLCJ0cmFjayIsInF1ZXJ5U2VsZWN0b3IiLCJwcm90b3R5cGUiLCJzbGljZSIsImZpbHRlciIsInNsaWRlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjbG9uZVNsaWRlIiwiX3IiLCJkb2N1bWVudCIsInQiLCJQZWVrIiwicGVlayIsIl92IiwiYmVmb3JlIiwib2Zmc2V0Iiwic2xpZGVXaWR0aCIsInRyYW5zbGF0ZSIsImlzIiwid2lkdGgiLCJ3cmFwcGVyU2l6ZSIsIm9mZnNldFdpZHRoIiwiZ3JvdyIsIkNsb25lcyIsInJlZHVjdG9yIiwic2V0dXBTbGlkZXMiLCJzZXR1cFdyYXBwZXIiLCJCdWlsZCIsInR5cGVDbGFzcyIsImFjdGl2ZUNsYXNzIiwiYWRkIiwiYWN0aXZlU2xpZGUiLCJzaWJsaW5nIiwicmVtb3ZlQ2xhc3NlcyIsIml0ZW1zIiwiY29sbGVjdCIsInBlZWtJbmNyZW1lbnRlciIsImNsb25lQ291bnQiLCJyb3VuZCIsImFwcGVuZCIsInJldmVyc2UiLCJwcmVwZW5kIiwibWF4IiwiY2xvbmUiLCJjbG9uZU5vZGUiLCJ1bnNoaWZ0IiwiaGFsZiIsImFwcGVuZENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwicmVtb3ZlQ2hpbGQiLCJFdmVudHNCaW5kZXIiLCJsaXN0ZW5lcnMiLCJlbCIsImNsb3N1cmUiLCJjYXB0dXJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJCaW5kZXIiLCJSZXNpemUiLCJiaW5kIiwib2ZmIiwidW5iaW5kIiwiZGVzdHJveSIsIlZBTElEX0RJUkVDVElPTlMiLCJGTElQRURfTU9WRU1FTlRTIiwidG9rZW4iLCJzcGxpdCIsImpvaW4iLCJpbmRleE9mIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsIm11bHRpcGxpZXIiLCJUUkFOU0ZPUk1FUlMiLCJHYXAiLCJHcm93IiwiUGVla2luZyIsIkZvY3VzaW5nIiwiY29uY2F0IiwiUnRsIiwidHJhbnNmb3JtZXIiLCJtb2RpZnkiLCJUcmFuc2xhdGUiLCJ0cmFuc2Zvcm0iLCJtdXRhdG9yIiwibXV0YXRlIiwidHJhdmVsRGlzdGFuY2UiLCJzZXQiLCJtb3ZlbWVudCIsInN0YXJ0V2lkdGgiLCJnZXRTdGFydEluZGV4IiwiZ2V0VHJhdmVsRGlzdGFuY2UiLCJwcm9wZXJ0eSIsImR1cmF0aW9uIiwiYW5pbWF0aW9uVGltaW5nRnVuYyIsInRyYW5zaXRpb24iLCJjb21wb3NlIiwiY2FsbGJhY2siLCJyZXdpbmREdXJhdGlvbiIsImFuaW1hdGlvbkR1cmF0aW9uIiwic3VwcG9ydHNQYXNzaXZlIiwib3B0cyIsImUiLCJTVEFSVF9FVkVOVFMiLCJNT1ZFX0VWRU5UUyIsIkVORF9FVkVOVFMiLCJNT1VTRV9FVkVOVFMiLCJzd2lwZVNpbiIsInN3aXBlU3RhcnRYIiwic3dpcGVTdGFydFkiLCJwYXNzaXZlIiwiU3dpcGUiLCJiaW5kU3dpcGVTdGFydCIsInN3aXBlIiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJiaW5kU3dpcGVNb3ZlIiwiYmluZFN3aXBlRW5kIiwidG91Y2hBbmdsZSIsInRvdWNoUmF0aW8iLCJzdWJFeFN4Iiwic3ViRXlTeSIsInBvd0VYIiwiYWJzIiwicG93RVkiLCJzd2lwZUh5cG90ZW51c2UiLCJzcXJ0Iiwic3dpcGVDYXRoZXR1cyIsImFzaW4iLCJQSSIsInN0b3BQcm9wYWdhdGlvbiIsImRyYWdnaW5nIiwidGhyZXNob2xkIiwic3dpcGVEaXN0YW5jZSIsInN3aXBlRGVnIiwicGVyVG91Y2giLCJtaW4iLCJyZXNvbHZlIiwidW5iaW5kU3dpcGVNb3ZlIiwidW5iaW5kU3dpcGVFbmQiLCJzd2lwZVRocmVzaG9sZCIsInN0YXJ0IiwiZHJhZ1RocmVzaG9sZCIsImVuZCIsImNoYW5nZWRUb3VjaGVzIiwic3dpcGVhYmxlIiwidW5iaW5kU3dpcGVTdGFydCIsIkltYWdlcyIsImRyYWdzdGFydCIsInByZXZlbnREZWZhdWx0IiwiZGV0YWNoZWQiLCJwcmV2ZW50ZWQiLCJBbmNob3JzIiwiX2EiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xpY2siLCJkcmFnZ2FibGUiLCJzZXRBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJkZXRhY2giLCJhdHRhY2giLCJOQVZfU0VMRUNUT1IiLCJDT05UUk9MU19TRUxFQ1RPUiIsIkNvbnRyb2xzIiwiX24iLCJhZGRCaW5kaW5ncyIsImNvbnRyb2xzIiwiYWN0aXZlTmF2IiwiZWxlbWVudHMiLCJjdXJyZW50VGFyZ2V0Iiwic2V0QWN0aXZlIiwicmVtb3ZlQmluZGluZ3MiLCJyZW1vdmVBY3RpdmUiLCJLZXlib2FyZCIsImtleWJvYXJkIiwicHJlc3MiLCJrZXlDb2RlIiwiQXV0b3BsYXkiLCJob3ZlcnBhdXNlIiwic2V0SW50ZXJ2YWwiLCJzdG9wIiwidGltZSIsImNsZWFySW50ZXJ2YWwiLCJzb3J0QnJlYWtwb2ludHMiLCJwb2ludHMiLCJCcmVha3BvaW50cyIsIm1hdGNoTWVkaWEiLCJwb2ludCIsIm1hdGNoZXMiLCJtYXRjaCIsIkNPTVBPTkVOVFMiLCJDb3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxlQUFlOzs7Ozs7Ozs7O1FBVVAsUUFWTzs7Ozs7OztXQWlCSixDQWpCSTs7Ozs7OztXQXdCSixDQXhCSTs7Ozs7Ozs7Ozs7V0FtQ0osQ0FuQ0k7Ozs7Ozs7T0EwQ1IsRUExQ1E7Ozs7Ozs7WUFpREgsS0FqREc7Ozs7Ozs7Y0F3REQsSUF4REM7Ozs7Ozs7WUErREgsSUEvREc7Ozs7Ozs7Ozs7U0F5RU4sS0F6RU07Ozs7Ozs7a0JBZ0ZHLEVBaEZIOzs7Ozs7O2lCQXVGRSxHQXZGRjs7Ozs7OztZQThGSCxLQTlGRzs7Ozs7OztjQXFHRCxHQXJHQzs7Ozs7OztjQTRHRCxFQTVHQzs7Ozs7OztxQkFtSE0sR0FuSE47Ozs7Ozs7VUEwSEwsSUExSEs7Ozs7Ozs7a0JBaUlHLEdBaklIOzs7Ozs7O3VCQXdJUSxtQ0F4SVI7Ozs7Ozs7cUJBK0lNLElBL0lOOzs7Ozs7O1lBc0pILEVBdEpHOzs7Ozs7Ozs7OzthQWlLRixLQWpLRTs7Ozs7Ozs7Ozs7Ozs7UUErS1AsQ0EvS087Ozs7Ozs7Ozs7O2VBMExBLEVBMUxBOzs7Ozs7OztXQWtNSjtlQUNJO1dBQ0osWUFESTtXQUVKO0tBSEE7WUFLQyxlQUxEO2NBTUcsaUJBTkg7ZUFPSSxrQkFQSjtjQVFHLGlCQVJIO2dCQVNLLHFCQVRMO2VBVUksdUJBVko7aUJBV00sc0JBWE47bUJBWVE7O0NBOU1uQjs7QUNBQTs7Ozs7O0FBTUEsQUFBTyxTQUFTQSxJQUFULENBQWVDLEdBQWYsRUFBb0I7VUFDakJDLEtBQVIsb0JBQStCRCxHQUEvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEY7Ozs7Ozs7QUFPQSxBQUFPLFNBQVNFLEtBQVQsQ0FBZ0JDLEtBQWhCLEVBQXVC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
