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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xpZGUubW9kdWxhci5lc20uanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0cy5qcyIsIi4uL3NyYy91dGlscy9sb2cuanMiLCIuLi9zcmMvdXRpbHMvdW5pdC5qcyIsIi4uL3NyYy9jb3JlL2luZGV4LmpzIiwiLi4vc3JjL3V0aWxzL29iamVjdC5qcyIsIi4uL3NyYy9jb3JlL2V2ZW50L2V2ZW50cy1idXMuanMiLCIuLi9zcmMvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9ydW4uanMiLCIuLi9zcmMvdXRpbHMvdGltZS5qcyIsIi4uL3NyYy91dGlscy93YWl0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZ2Fwcy5qcyIsIi4uL3NyYy91dGlscy9kb20uanMiLCIuLi9zcmMvY29tcG9uZW50cy9odG1sLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcGVlay5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21vdmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9zaXplcy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2J1aWxkLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2xvbmVzLmpzIiwiLi4vc3JjL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3Jlc2l6ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2RpcmVjdGlvbi5qcyIsIi4uL3NyYy9tdXRhdG9yL3RyYW5zZm9ybWVycy9ydGwuanMiLCIuLi9zcmMvbXV0YXRvci90cmFuc2Zvcm1lcnMvZ2FwLmpzIiwiLi4vc3JjL211dGF0b3IvdHJhbnNmb3JtZXJzL2dyb3cuanMiLCIuLi9zcmMvbXV0YXRvci90cmFuc2Zvcm1lcnMvcGVla2luZy5qcyIsIi4uL3NyYy9tdXRhdG9yL3RyYW5zZm9ybWVycy9mb2N1c2luZy5qcyIsIi4uL3NyYy9tdXRhdG9yL2luZGV4LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvdHJhbnNsYXRlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvdHJhbnNpdGlvbi5qcyIsIi4uL3NyYy91dGlscy9kZXRlY3QtcGFzc2l2ZS1ldmVudC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3N3aXBlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW1hZ2VzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvYW5jaG9ycy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NvbnRyb2xzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMva2V5Ym9hcmQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9hdXRvcGxheS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2JyZWFrcG9pbnRzLmpzIiwiLi4vZW50cnkvZW50cnktbW9kdWxhci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBUeXBlIG9mIHRoZSBtb3ZlbWVudC5cbiAgICpcbiAgICogQXZhaWxhYmxlIHR5cGVzOlxuICAgKiBgc2xpZGVyYCAtIFJld2luZHMgc2xpZGVyIHRvIHRoZSBzdGFydC9lbmQgd2hlbiBpdCByZWFjaGVzIHRoZSBmaXJzdCBvciBsYXN0IHNsaWRlLlxuICAgKiBgY2Fyb3VzZWxgIC0gQ2hhbmdlcyBzbGlkZXMgd2l0aG91dCBzdGFydGluZyBvdmVyIHdoZW4gaXQgcmVhY2hlcyB0aGUgZmlyc3Qgb3IgbGFzdCBzbGlkZS5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIHR5cGU6ICdzbGlkZXInLFxuXG4gIC8qKlxuICAgKiBTdGFydCBhdCBzcGVjaWZpYyBzbGlkZSBudW1iZXIgZGVmaW5lZCB3aXRoIHplcm8tYmFzZWQgaW5kZXguXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBzdGFydEF0OiAwLFxuXG4gIC8qKlxuICAgKiBBIG51bWJlciBvZiBzbGlkZXMgdmlzaWJsZSBvbiB0aGUgc2luZ2xlIHZpZXdwb3J0LlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgcGVyVmlldzogMSxcblxuICAvKipcbiAgICogRm9jdXMgY3VycmVudGx5IGFjdGl2ZSBzbGlkZSBhdCBhIHNwZWNpZmllZCBwb3NpdGlvbiBpbiB0aGUgdHJhY2suXG4gICAqXG4gICAqIEF2YWlsYWJsZSBpbnB1dHM6XG4gICAqIGBjZW50ZXJgIC0gQ3VycmVudCBzbGlkZSB3aWxsIGJlIGFsd2F5cyBmb2N1c2VkIGF0IHRoZSBjZW50ZXIgb2YgYSB0cmFjay5cbiAgICogYDAsMSwyLDMuLi5gIC0gQ3VycmVudCBzbGlkZSB3aWxsIGJlIGZvY3VzZWQgb24gdGhlIHNwZWNpZmllZCB6ZXJvLWJhc2VkIGluZGV4LlxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfE51bWJlcn1cbiAgICovXG4gIGZvY3VzQXQ6IDAsXG5cbiAgLyoqXG4gICAqIEEgc2l6ZSBvZiB0aGUgZ2FwIGFkZGVkIGJldHdlZW4gc2xpZGVzLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgZ2FwOiAxMCxcblxuICAvKipcbiAgICogQ2hhbmdlIHNsaWRlcyBhZnRlciBhIHNwZWNpZmllZCBpbnRlcnZhbC4gVXNlIGBmYWxzZWAgZm9yIHR1cm5pbmcgb2ZmIGF1dG9wbGF5LlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfEJvb2xlYW59XG4gICAqL1xuICBhdXRvcGxheTogZmFsc2UsXG5cbiAgLyoqXG4gICAqIFN0b3AgYXV0b3BsYXkgb24gbW91c2VvdmVyIGV2ZW50LlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGhvdmVycGF1c2U6IHRydWUsXG5cbiAgLyoqXG4gICAqIEFsbG93IGZvciBjaGFuZ2luZyBzbGlkZXMgd2l0aCBsZWZ0IGFuZCByaWdodCBrZXlib2FyZCBhcnJvd3MuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAga2V5Ym9hcmQ6IHRydWUsXG5cbiAgLyoqXG4gICAqIFN0b3AgcnVubmluZyBgcGVyVmlld2AgbnVtYmVyIG9mIHNsaWRlcyBmcm9tIHRoZSBlbmQuIFVzZSB0aGlzXG4gICAqIG9wdGlvbiBpZiB5b3UgZG9uJ3Qgd2FudCB0byBoYXZlIGFuIGVtcHR5IHNwYWNlIGFmdGVyXG4gICAqIGEgc2xpZGVyLiBXb3JrcyBvbmx5IHdpdGggYHNsaWRlcmAgdHlwZSBhbmQgYVxuICAgKiBub24tY2VudGVyZWQgYGZvY3VzQXRgIHNldHRpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgYm91bmQ6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBNaW5pbWFsIHN3aXBlIGRpc3RhbmNlIG5lZWRlZCB0byBjaGFuZ2UgdGhlIHNsaWRlLiBVc2UgYGZhbHNlYCBmb3IgdHVybmluZyBvZmYgYSBzd2lwaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfEJvb2xlYW59XG4gICAqL1xuICBzd2lwZVRocmVzaG9sZDogODAsXG5cbiAgLyoqXG4gICAqIE1pbmltYWwgbW91c2UgZHJhZyBkaXN0YW5jZSBuZWVkZWQgdG8gY2hhbmdlIHRoZSBzbGlkZS4gVXNlIGBmYWxzZWAgZm9yIHR1cm5pbmcgb2ZmIGEgZHJhZ2dpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIGRyYWdUaHJlc2hvbGQ6IDEyMCxcblxuICAvKipcbiAgICogQSBtYXhpbXVtIG51bWJlciBvZiBzbGlkZXMgdG8gd2hpY2ggbW92ZW1lbnQgd2lsbCBiZSBtYWRlIG9uIHN3aXBpbmcgb3IgZHJhZ2dpbmcuIFVzZSBgZmFsc2VgIGZvciB1bmxpbWl0ZWQuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8Qm9vbGVhbn1cbiAgICovXG4gIHBlclRvdWNoOiBmYWxzZSxcblxuICAvKipcbiAgICogTW92aW5nIGRpc3RhbmNlIHJhdGlvIG9mIHRoZSBzbGlkZXMgb24gYSBzd2lwaW5nIGFuZCBkcmFnZ2luZy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHRvdWNoUmF0aW86IDAuNSxcblxuICAvKipcbiAgICogQW5nbGUgcmVxdWlyZWQgdG8gYWN0aXZhdGUgc2xpZGVzIG1vdmluZyBvbiBzd2lwaW5nIG9yIGRyYWdnaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgdG91Y2hBbmdsZTogNDUsXG5cbiAgLyoqXG4gICAqIER1cmF0aW9uIG9mIHRoZSBhbmltYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgYW5pbWF0aW9uRHVyYXRpb246IDQwMCxcblxuICAvKipcbiAgICogQWxsb3dzIGxvb3BpbmcgdGhlIGBzbGlkZXJgIHR5cGUuIFNsaWRlciB3aWxsIHJld2luZCB0byB0aGUgZmlyc3QvbGFzdCBzbGlkZSB3aGVuIGl0J3MgYXQgdGhlIHN0YXJ0L2VuZC5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICByZXdpbmQ6IHRydWUsXG5cbiAgLyoqXG4gICAqIER1cmF0aW9uIG9mIHRoZSByZXdpbmRpbmcgYW5pbWF0aW9uIG9mIHRoZSBgc2xpZGVyYCB0eXBlIGluIG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHJld2luZER1cmF0aW9uOiA4MDAsXG5cbiAgLyoqXG4gICAqIEVhc2luZyBmdW5jdGlvbiBmb3IgdGhlIGFuaW1hdGlvbi5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGFuaW1hdGlvblRpbWluZ0Z1bmM6ICdjdWJpYy1iZXppZXIoLjE2NSwgLjg0MCwgLjQ0MCwgMSknLFxuXG4gIC8qKlxuICAgKiBXYWl0IGZvciB0aGUgYW5pbWF0aW9uIHRvIGZpbmlzaCB1bnRpbCB0aGUgbmV4dCB1c2VyIGlucHV0IGNhbiBiZSBwcm9jZXNzZWRcbiAgICpcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICB3YWl0Rm9yVHJhbnNpdGlvbjogdHJ1ZSxcblxuICAvKipcbiAgICogVGhyb3R0bGUgY29zdGx5IGV2ZW50cyBhdCBtb3N0IG9uY2UgcGVyIGV2ZXJ5IHdhaXQgbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgdGhyb3R0bGU6IDEwLFxuXG4gIC8qKlxuICAgKiBNb3ZpbmcgZGlyZWN0aW9uIG1vZGUuXG4gICAqXG4gICAqIEF2YWlsYWJsZSBpbnB1dHM6XG4gICAqIC0gJ2x0cicgLSBsZWZ0IHRvIHJpZ2h0IG1vdmVtZW50LFxuICAgKiAtICdydGwnIC0gcmlnaHQgdG8gbGVmdCBtb3ZlbWVudC5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGRpcmVjdGlvbjogJ2x0cicsXG5cbiAgLyoqXG4gICAqIFRoZSBkaXN0YW5jZSB2YWx1ZSBvZiB0aGUgbmV4dCBhbmQgcHJldmlvdXMgdmlld3BvcnRzIHdoaWNoXG4gICAqIGhhdmUgdG8gcGVlayBpbiB0aGUgY3VycmVudCB2aWV3LiBBY2NlcHRzIG51bWJlciBhbmRcbiAgICogcGl4ZWxzIGFzIGEgc3RyaW5nLiBMZWZ0IGFuZCByaWdodCBwZWVraW5nIGNhbiBiZVxuICAgKiBzZXQgdXAgc2VwYXJhdGVseSB3aXRoIGEgZGlyZWN0aW9ucyBvYmplY3QuXG4gICAqXG4gICAqIEZvciBleGFtcGxlOlxuICAgKiBgMTAwYCAtIFBlZWsgMTAwcHggb24gdGhlIGJvdGggc2lkZXMuXG4gICAqIHsgYmVmb3JlOiAxMDAsIGFmdGVyOiA1MCB9YCAtIFBlZWsgMTAwcHggb24gdGhlIGxlZnQgc2lkZSBhbmQgNTBweCBvbiB0aGUgcmlnaHQgc2lkZS5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxTdHJpbmd8T2JqZWN0fVxuICAgKi9cbiAgcGVlazogMCxcblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBvcHRpb25zIGFwcGxpZWQgYXQgc3BlY2lmaWVkIG1lZGlhIGJyZWFrcG9pbnRzLlxuICAgKiBGb3IgZXhhbXBsZTogZGlzcGxheSB0d28gc2xpZGVzIHBlciB2aWV3IHVuZGVyIDgwMHB4LlxuICAgKiBge1xuICAgKiAgICc4MDBweCc6IHtcbiAgICogICAgIHBlclZpZXc6IDJcbiAgICogICB9XG4gICAqIH1gXG4gICAqL1xuICBicmVha3BvaW50czoge30sXG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgaW50ZXJuYWxseSB1c2VkIEhUTUwgY2xhc3Nlcy5cbiAgICpcbiAgICogQHRvZG8gUmVmYWN0b3IgYHNsaWRlcmAgYW5kIGBjYXJvdXNlbGAgcHJvcGVydGllcyB0byBzaW5nbGUgYHR5cGU6IHsgc2xpZGVyOiAnJywgY2Fyb3VzZWw6ICcnIH1gIG9iamVjdFxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgY2xhc3Nlczoge1xuICAgIGRpcmVjdGlvbjoge1xuICAgICAgbHRyOiAnZ2xpZGUtLWx0cicsXG4gICAgICBydGw6ICdnbGlkZS0tcnRsJ1xuICAgIH0sXG4gICAgc2xpZGVyOiAnZ2xpZGUtLXNsaWRlcicsXG4gICAgY2Fyb3VzZWw6ICdnbGlkZS0tY2Fyb3VzZWwnLFxuICAgIHN3aXBlYWJsZTogJ2dsaWRlLS1zd2lwZWFibGUnLFxuICAgIGRyYWdnaW5nOiAnZ2xpZGUtLWRyYWdnaW5nJyxcbiAgICBjbG9uZVNsaWRlOiAnZ2xpZGVfX3NsaWRlLS1jbG9uZScsXG4gICAgYWN0aXZlTmF2OiAnZ2xpZGVfX2J1bGxldC0tYWN0aXZlJyxcbiAgICBhY3RpdmVTbGlkZTogJ2dsaWRlX19zbGlkZS0tYWN0aXZlJyxcbiAgICBkaXNhYmxlZEFycm93OiAnZ2xpZGVfX2Fycm93LS1kaXNhYmxlZCdcbiAgfVxufVxuIiwiLyoqXG4gKiBPdXRwdXRzIHdhcm5pbmcgbWVzc2FnZSB0byB0aGUgYm93c2VyIGNvbnNvbGUuXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBtc2dcbiAqIEByZXR1cm4ge1ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3YXJuIChtc2cpIHtcbiAgY29uc29sZS5lcnJvcihgW0dsaWRlIHdhcm5dOiAke21zZ31gKVxufVxuIiwiLyoqXG4gKiBDb252ZXJ0cyB2YWx1ZSBlbnRlcmVkIGFzIG51bWJlclxuICogb3Igc3RyaW5nIHRvIGludGVnZXIgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9JbnQgKHZhbHVlKSB7XG4gIHJldHVybiBwYXJzZUludCh2YWx1ZSlcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB2YWx1ZSBlbnRlcmVkIGFzIG51bWJlclxuICogb3Igc3RyaW5nIHRvIGZsYXQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9GbG9hdCAodmFsdWUpIHtcbiAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHsqfSAgIHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmcgKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0ICh2YWx1ZSkge1xuICBsZXQgdHlwZSA9IHR5cGVvZiB2YWx1ZVxuXG4gIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhdmFsdWUgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1taXhlZC1vcGVyYXRvcnNcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGEgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIgKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbiAodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgdW5kZWZpbmVkLlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNVbmRlZmluZWQgKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhbiBhcnJheS5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkgKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gQXJyYXlcbn1cbiIsImltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlscy9sb2cnXG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuLyoqXG4gKiBDcmVhdGVzIGFuZCBpbml0aWFsaXplcyBzcGVjaWZpZWQgY29sbGVjdGlvbiBvZiBleHRlbnNpb25zLlxuICogRWFjaCBleHRlbnNpb24gcmVjZWl2ZXMgYWNjZXNzIHRvIGluc3RhbmNlIG9mIGdsaWRlIGFuZCByZXN0IG9mIGNvbXBvbmVudHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGdsaWRlXG4gKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5zaW9uc1xuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtb3VudCAoZ2xpZGUsIGV4dGVuc2lvbnMsIGV2ZW50cykge1xuICBsZXQgY29tcG9uZW50cyA9IHt9XG5cbiAgZm9yIChsZXQgbmFtZSBpbiBleHRlbnNpb25zKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oZXh0ZW5zaW9uc1tuYW1lXSkpIHtcbiAgICAgIGNvbXBvbmVudHNbbmFtZV0gPSBleHRlbnNpb25zW25hbWVdKGdsaWRlLCBjb21wb25lbnRzLCBldmVudHMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHdhcm4oJ0V4dGVuc2lvbiBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICAgIH1cbiAgfVxuXG4gIGZvciAobGV0IG5hbWUgaW4gY29tcG9uZW50cykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNvbXBvbmVudHNbbmFtZV0ubW91bnQpKSB7XG4gICAgICBjb21wb25lbnRzW25hbWVdLm1vdW50KClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29tcG9uZW50c1xufVxuIiwiLyoqXG4gKiBEZWZpbmVzIGdldHRlciBhbmQgc2V0dGVyIHByb3BlcnR5IG9uIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqICAgICAgICAgT2JqZWN0IHdoZXJlIHByb3BlcnR5IGhhcyB0byBiZSBkZWZpbmVkLlxuICogQHBhcmFtICB7U3RyaW5nfSBwcm9wICAgICAgICBOYW1lIG9mIHRoZSBkZWZpbmVkIHByb3BlcnR5LlxuICogQHBhcmFtICB7T2JqZWN0fSBkZWZpbml0aW9uICBHZXQgYW5kIHNldCBkZWZpbml0aW9ucyBmb3IgdGhlIHByb3BlcnR5LlxuICogQHJldHVybiB7Vm9pZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZSAob2JqLCBwcm9wLCBkZWZpbml0aW9uKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIGRlZmluaXRpb24pXG59XG5cbi8qKlxuICogU29ydHMgYXBoYWJldGljYWxseSBvYmplY3Qga2V5cy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gc29ydEtleXMgKG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5zb3J0KCkucmVkdWNlKChyLCBrKSA9PiB7XG4gICAgcltrXSA9IG9ialtrXVxuXG4gICAgcmV0dXJuIChyW2tdLCByKVxuICB9LCB7fSlcbn1cblxuLyoqXG4gKiBNZXJnZXMgcGFzc2VkIHNldHRpbmdzIG9iamVjdCB3aXRoIGRlZmF1bHQgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IGRlZmF1bHRzXG4gKiBAcGFyYW0gIHtPYmplY3R9IHNldHRpbmdzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU9wdGlvbnMgKGRlZmF1bHRzLCBzZXR0aW5ncykge1xuICBsZXQgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBzZXR0aW5ncylcblxuICAvLyBgT2JqZWN0LmFzc2lnbmAgZG8gbm90IGRlZXBseSBtZXJnZSBvYmplY3RzLCBzbyB3ZVxuICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5IGZvciBldmVyeSBuZXN0ZWQgb2JqZWN0XG4gIC8vIGluIG9wdGlvbnMuIEFsdGhvdWdoIGl0IGRvZXMgbm90IGxvb2sgc21hcnQsXG4gIC8vIGl0J3Mgc21hbGxlciBhbmQgZmFzdGVyIHRoYW4gc29tZSBmYW5jeVxuICAvLyBtZXJnaW5nIGRlZXAtbWVyZ2UgYWxnb3JpdGhtIHNjcmlwdC5cbiAgaWYgKHNldHRpbmdzLmhhc093blByb3BlcnR5KCdjbGFzc2VzJykpIHtcbiAgICBvcHRpb25zLmNsYXNzZXMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cy5jbGFzc2VzLCBzZXR0aW5ncy5jbGFzc2VzKVxuXG4gICAgaWYgKHNldHRpbmdzLmNsYXNzZXMuaGFzT3duUHJvcGVydHkoJ2RpcmVjdGlvbicpKSB7XG4gICAgICBvcHRpb25zLmNsYXNzZXMuZGlyZWN0aW9uID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMuY2xhc3Nlcy5kaXJlY3Rpb24sIHNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uKVxuICAgIH1cbiAgfVxuXG4gIGlmIChzZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eSgnYnJlYWtwb2ludHMnKSkge1xuICAgIG9wdGlvbnMuYnJlYWtwb2ludHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cy5icmVha3BvaW50cywgc2V0dGluZ3MuYnJlYWtwb2ludHMpXG4gIH1cblxuICByZXR1cm4gb3B0aW9uc1xufVxuIiwiaW1wb3J0IHsgaXNBcnJheSB9IGZyb20gJy4uLy4uL3V0aWxzL3VuaXQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50c0J1cyB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBFdmVudEJ1cyBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50c1xuICAgKi9cbiAgY29uc3RydWN0b3IgKGV2ZW50cyA9IHt9KSB7XG4gICAgdGhpcy5ldmVudHMgPSBldmVudHNcbiAgICB0aGlzLmhvcCA9IGV2ZW50cy5oYXNPd25Qcm9wZXJ0eVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgbGlzdGVuZXIgdG8gdGhlIHNwZWNpZmVkIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgb24gKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgaWYgKGlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMub24oZXZlbnRbaV0sIGhhbmRsZXIpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHRoZSBldmVudCdzIG9iamVjdCBpZiBub3QgeWV0IGNyZWF0ZWRcbiAgICBpZiAoIXRoaXMuaG9wLmNhbGwodGhpcy5ldmVudHMsIGV2ZW50KSkge1xuICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW11cbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGhhbmRsZXIgdG8gcXVldWVcbiAgICB2YXIgaW5kZXggPSB0aGlzLmV2ZW50c1tldmVudF0ucHVzaChoYW5kbGVyKSAtIDFcblxuICAgIC8vIFByb3ZpZGUgaGFuZGxlIGJhY2sgZm9yIHJlbW92YWwgb2YgZXZlbnRcbiAgICByZXR1cm4ge1xuICAgICAgcmVtb3ZlICgpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuZXZlbnRzW2V2ZW50XVtpbmRleF1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUnVucyByZWdpc3RlcmVkIGhhbmRsZXJzIGZvciBzcGVjaWZpZWQgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdD19IGNvbnRleHRcbiAgICovXG4gIGVtaXQgKGV2ZW50LCBjb250ZXh0KSB7XG4gICAgaWYgKGlzQXJyYXkoZXZlbnQpKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZW1pdChldmVudFtpXSwgY29udGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZXZlbnQgZG9lc24ndCBleGlzdCwgb3IgdGhlcmUncyBubyBoYW5kbGVycyBpbiBxdWV1ZSwganVzdCBsZWF2ZVxuICAgIGlmICghdGhpcy5ob3AuY2FsbCh0aGlzLmV2ZW50cywgZXZlbnQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBDeWNsZSB0aHJvdWdoIGV2ZW50cyBxdWV1ZSwgZmlyZSFcbiAgICB0aGlzLmV2ZW50c1tldmVudF0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbShjb250ZXh0IHx8IHt9KVxuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRzJ1xyXG5pbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi91dGlscy9sb2cnXHJcbmltcG9ydCB7IG1vdW50IH0gZnJvbSAnLi9jb3JlL2luZGV4J1xyXG5pbXBvcnQgeyBtZXJnZU9wdGlvbnMgfSBmcm9tICcuL3V0aWxzL29iamVjdCdcclxuaW1wb3J0IHsgdG9JbnQsIGlzT2JqZWN0LCBpc0FycmF5IH0gZnJvbSAnLi91dGlscy91bml0J1xyXG5cclxuaW1wb3J0IEV2ZW50c0J1cyBmcm9tICcuL2NvcmUvZXZlbnQvZXZlbnRzLWJ1cydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdsaWRlIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgZ2xpZGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAgICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IgKHNlbGVjdG9yLCBvcHRpb25zID0ge30pIHtcclxuICAgIHRoaXMuX2MgPSB7fVxyXG4gICAgdGhpcy5fdCA9IFtdXHJcbiAgICB0aGlzLl9lID0gbmV3IEV2ZW50c0J1cygpXHJcblxyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXHJcbiAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3JcclxuICAgIHRoaXMuc2V0dGluZ3MgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdGlvbnMpXHJcbiAgICB0aGlzLmluZGV4ID0gdGhpcy5zZXR0aW5ncy5zdGFydEF0XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXplcyBnbGlkZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbnNpb25zIENvbGxlY3Rpb24gb2YgZXh0ZW5zaW9ucyB0byBpbml0aWFsaXplLlxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIG1vdW50IChleHRlbnNpb25zID0ge30pIHtcclxuICAgIHRoaXMuX2UuZW1pdCgnbW91bnQuYmVmb3JlJylcclxuXHJcbiAgICBpZiAoaXNPYmplY3QoZXh0ZW5zaW9ucykpIHtcclxuICAgICAgdGhpcy5fYyA9IG1vdW50KHRoaXMsIGV4dGVuc2lvbnMsIHRoaXMuX2UpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3YXJuKCdZb3UgbmVlZCB0byBwcm92aWRlIGEgb2JqZWN0IG9uIGBtb3VudCgpYCcpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZS5lbWl0KCdtb3VudC5hZnRlcicpXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbGxlY3RzIGFuIGluc3RhbmNlIGB0cmFuc2xhdGVgIHRyYW5zZm9ybWVycy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge0FycmF5fSB0cmFuc2Zvcm1lcnMgQ29sbGVjdGlvbiBvZiB0cmFuc2Zvcm1lcnMuXHJcbiAgICogQHJldHVybiB7Vm9pZH1cclxuICAgKi9cclxuICBtdXRhdGUgKHRyYW5zZm9ybWVycyA9IFtdKSB7XHJcbiAgICBpZiAoaXNBcnJheSh0cmFuc2Zvcm1lcnMpKSB7XHJcbiAgICAgIHRoaXMuX3QgPSB0cmFuc2Zvcm1lcnNcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdhcm4oJ1lvdSBuZWVkIHRvIHByb3ZpZGUgYSBhcnJheSBvbiBgbXV0YXRlKClgJylcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyBnbGlkZSB3aXRoIHNwZWNpZmllZCBzZXR0aW5ncy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzZXR0aW5nc1xyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIHVwZGF0ZSAoc2V0dGluZ3MgPSB7fSkge1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IG1lcmdlT3B0aW9ucyh0aGlzLnNldHRpbmdzLCBzZXR0aW5ncylcclxuXHJcbiAgICBpZiAoc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ3N0YXJ0QXQnKSkge1xyXG4gICAgICB0aGlzLmluZGV4ID0gc2V0dGluZ3Muc3RhcnRBdFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2UuZW1pdCgndXBkYXRlJylcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlIHNsaWRlIHdpdGggc3BlY2lmaWVkIHBhdHRlcm4uIEEgcGF0dGVybiBtdXN0IGJlIGluIHRoZSBzcGVjaWFsIGZvcm1hdDpcclxuICAgKiBgPmAgLSBNb3ZlIG9uZSBmb3J3YXJkXHJcbiAgICogYDxgIC0gTW92ZSBvbmUgYmFja3dhcmRcclxuICAgKiBgPXtpfWAgLSBHbyB0byB7aX0gemVyby1iYXNlZCBzbGlkZSAoZXEuICc9MScsIHdpbGwgZ28gdG8gc2Vjb25kIHNsaWRlKVxyXG4gICAqIGA+PmAgLSBSZXdpbmRzIHRvIGVuZCAobGFzdCBzbGlkZSlcclxuICAgKiBgPDxgIC0gUmV3aW5kcyB0byBzdGFydCAoZmlyc3Qgc2xpZGUpXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0dGVyblxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIGdvIChwYXR0ZXJuKSB7XHJcbiAgICB0aGlzLl9jLlJ1bi5tYWtlKHBhdHRlcm4pXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmUgdHJhY2sgYnkgc3BlY2lmaWVkIGRpc3RhbmNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRpc3RhbmNlXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgbW92ZSAoZGlzdGFuY2UpIHtcclxuICAgIHRoaXMuX2MuVHJhbnNpdGlvbi5kaXNhYmxlKClcclxuICAgIHRoaXMuX2MuTW92ZS5tYWtlKGRpc3RhbmNlKVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95IGluc3RhbmNlIGFuZCByZXZlcnQgYWxsIGNoYW5nZXMgZG9uZSBieSB0aGlzLl9jLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgZGVzdHJveSAoKSB7XHJcbiAgICB0aGlzLl9lLmVtaXQoJ2Rlc3Ryb3knKVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCBpbnN0YW5jZSBhdXRvcGxheWluZy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbnxOdW1iZXJ9IGludGVydmFsIFJ1biBhdXRvcGxheWluZyB3aXRoIHBhc3NlZCBpbnRlcnZhbCByZWdhcmRsZXNzIG9mIGBhdXRvcGxheWAgc2V0dGluZ3NcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBwbGF5IChpbnRlcnZhbCA9IGZhbHNlKSB7XHJcbiAgICBpZiAoaW50ZXJ2YWwpIHtcclxuICAgICAgdGhpcy5zZXR0aW5ncy5hdXRvcGxheSA9IGludGVydmFsXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZS5lbWl0KCdwbGF5JylcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBpbnN0YW5jZSBhdXRvcGxheWluZy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIHBhdXNlICgpIHtcclxuICAgIHRoaXMuX2UuZW1pdCgncGF1c2UnKVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGdsaWRlIGludG8gYSBpZGxlIHN0YXR1cy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIGRpc2FibGUgKCkge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IHRydWVcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBnbGlkZSBpbnRvIGEgYWN0aXZlIHN0YXR1cy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIGVuYWJsZSAoKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2VcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBjdXV0b20gZXZlbnQgbGlzdGVuZXIgd2l0aCBoYW5kbGVyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfEFycmF5fSBldmVudFxyXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBoYW5kbGVyXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgb24gKGV2ZW50LCBoYW5kbGVyKSB7XHJcbiAgICB0aGlzLl9lLm9uKGV2ZW50LCBoYW5kbGVyKVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgaWYgZ2xpZGUgaXMgYSBwcmVjaXNlZCB0eXBlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lXHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgKi9cclxuICBpc1R5cGUgKG5hbWUpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnR5cGUgPT09IG5hbWVcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdmFsdWUgb2YgdGhlIGNvcmUgb3B0aW9ucy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgKi9cclxuICBnZXQgc2V0dGluZ3MgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX29cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdmFsdWUgb2YgdGhlIGNvcmUgb3B0aW9ucy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge09iamVjdH0gb1xyXG4gICAqIEByZXR1cm4ge1ZvaWR9XHJcbiAgICovXHJcbiAgc2V0IHNldHRpbmdzIChvKSB7XHJcbiAgICBpZiAoaXNPYmplY3QobykpIHtcclxuICAgICAgdGhpcy5fbyA9IG9cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdhcm4oJ09wdGlvbnMgbXVzdCBiZSBhbiBgb2JqZWN0YCBpbnN0YW5jZS4nKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBjdXJyZW50IGluZGV4IG9mIHRoZSBzbGlkZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICovXHJcbiAgZ2V0IGluZGV4ICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9pXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGN1cnJlbnQgaW5kZXggYSBzbGlkZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICovXHJcbiAgc2V0IGluZGV4IChpKSB7XHJcbiAgICB0aGlzLl9pID0gdG9JbnQoaSlcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdHlwZSBuYW1lIG9mIHRoZSBzbGlkZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAgICovXHJcbiAgZ2V0IHR5cGUgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MudHlwZVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB2YWx1ZSBvZiB0aGUgaWRsZSBzdGF0dXMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAqL1xyXG4gIGdldCBkaXNhYmxlZCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB2YWx1ZSBvZiB0aGUgaWRsZSBzdGF0dXMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAqL1xyXG4gIHNldCBkaXNhYmxlZCAoc3RhdHVzKSB7XHJcbiAgICB0aGlzLl9kID0gISFzdGF0dXNcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uL3V0aWxzL2xvZydcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCB7IHRvSW50LCBpc051bWJlciB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IFJ1biA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhdXRvcnVubmluZyBvZiB0aGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuX28gPSBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyBnbGlkZXMgcnVubmluZyBiYXNlZCBvbiB0aGUgcGFzc2VkIG1vdmluZyBzY2hlbWEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbW92ZVxuICAgICAqL1xuICAgIG1ha2UgKG1vdmUpIHtcbiAgICAgIGlmICghR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgIUdsaWRlLnNldHRpbmdzLndhaXRGb3JUcmFuc2l0aW9uIHx8IEdsaWRlLmRpc2FibGUoKVxuXG4gICAgICAgIHRoaXMubW92ZSA9IG1vdmVcblxuICAgICAgICBFdmVudHMuZW1pdCgncnVuLmJlZm9yZScsIHRoaXMubW92ZSlcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpXG5cbiAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bicsIHRoaXMubW92ZSlcblxuICAgICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uYWZ0ZXIoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmlzU3RhcnQoKSkge1xuICAgICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5zdGFydCcsIHRoaXMubW92ZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5pc0VuZCgpKSB7XG4gICAgICAgICAgICBFdmVudHMuZW1pdCgncnVuLmVuZCcsIHRoaXMubW92ZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5pc09mZnNldCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9vID0gZmFsc2VcblxuICAgICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5vZmZzZXQnLCB0aGlzLm1vdmUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5hZnRlcicsIHRoaXMubW92ZSlcblxuICAgICAgICAgIEdsaWRlLmVuYWJsZSgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgY3VycmVudCBpbmRleCBiYXNlZCBvbiBkZWZpbmVkIG1vdmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ8VW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGNhbGN1bGF0ZSAoKSB7XG4gICAgICBjb25zdCB7IG1vdmUsIGxlbmd0aCB9ID0gdGhpc1xuICAgICAgY29uc3QgeyBzdGVwcywgZGlyZWN0aW9uIH0gPSBtb3ZlXG5cbiAgICAgIC8vIEJ5IGRlZmF1bHQgYXNzdW1lIHRoYXQgc2l6ZSBvZiB2aWV3IGlzIGVxdWFsIHRvIG9uZSBzbGlkZVxuICAgICAgbGV0IHZpZXdTaXplID0gMVxuICAgICAgLy8gRGV0ZXJtaW5lIGlmIHN0ZXBzIGFyZSBudW1lcmljIHZhbHVlXG4gICAgICBsZXQgY291bnRhYmxlU3RlcHMgPSBpc051bWJlcih0b0ludChzdGVwcykpICYmIHRvSW50KHN0ZXBzKSAhPT0gMFxuXG4gICAgICAvLyBXaGlsZSBkaXJlY3Rpb24gaXMgYD1gIHdlIHdhbnQganVtcCB0b1xuICAgICAgLy8gYSBzcGVjaWZpZWQgaW5kZXggZGVzY3JpYmVkIGluIHN0ZXBzLlxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJz0nKSB7XG4gICAgICAgIEdsaWRlLmluZGV4ID0gc3RlcHNcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gV2hlbiBwYXR0ZXJuIGlzIGVxdWFsIHRvIGA+PmAgd2Ugd2FudFxuICAgICAgLy8gZmFzdCBmb3J3YXJkIHRvIHRoZSBsYXN0IHNsaWRlLlxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJz4nICYmIHN0ZXBzID09PSAnPicpIHtcbiAgICAgICAgR2xpZGUuaW5kZXggPSBsZW5ndGhcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gV2hlbiBwYXR0ZXJuIGlzIGVxdWFsIHRvIGA8PGAgd2Ugd2FudFxuICAgICAgLy8gZmFzdCBmb3J3YXJkIHRvIHRoZSBmaXJzdCBzbGlkZS5cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc8JyAmJiBzdGVwcyA9PT0gJzwnKSB7XG4gICAgICAgIEdsaWRlLmluZGV4ID0gMFxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBXaGlsZSBzdGVwcyBpcyBhIG51bWVyaWMgdmFsdWUgYW5kIHdlXG4gICAgICAvLyBtb3ZlIGZvcndhcmQgYnkgdGhlIG51bWJlciBvZiBzdGVwcy5cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc+JyAmJiBjb3VudGFibGVTdGVwcykge1xuICAgICAgICB2aWV3U2l6ZSA9IHRvSW50KHN0ZXBzKSAqIC0xXG4gICAgICB9XG5cbiAgICAgIC8vICRzdGVwczwgKGRyYWcpIG1vdmVtZW50XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPCcgJiYgY291bnRhYmxlU3RlcHMpIHtcbiAgICAgICAgdmlld1NpemUgPSB0b0ludChzdGVwcylcbiAgICAgIH1cblxuICAgICAgLy8gcGFnaW5hdGlvbiBtb3ZlbWVudFxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3wnKSB7XG4gICAgICAgIHZpZXdTaXplID0gR2xpZGUuc2V0dGluZ3MucGVyVmlldyB8fCAxXG4gICAgICB9XG5cbiAgICAgIC8vIHdlIGFyZSBtb3ZpbmcgZm9yd2FyZFxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJz4nIHx8IChkaXJlY3Rpb24gPT09ICd8JyAmJiBzdGVwcyA9PT0gJz4nKSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IGNhbGN1bGF0ZUZvcndhcmRJbmRleCh2aWV3U2l6ZSlcblxuICAgICAgICBpZiAoaW5kZXggPiBsZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLl9vID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgR2xpZGUuaW5kZXggPSBub3JtYWxpemVGb3J3YXJkSW5kZXgoaW5kZXgsIHZpZXdTaXplKVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyB3ZSBhcmUgbW92aW5nIGJhY2t3YXJkXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPCcgfHwgKGRpcmVjdGlvbiA9PT0gJ3wnICYmIHN0ZXBzID09PSAnPCcpKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gY2FsY3VsYXRlQmFja3dhcmRJbmRleCh2aWV3U2l6ZSlcblxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgdGhpcy5fbyA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIEdsaWRlLmluZGV4ID0gbm9ybWFsaXplQmFja3dhcmRJbmRleChpbmRleCwgdmlld1NpemUpXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHdhcm4oYEludmFsaWQgZGlyZWN0aW9uIHBhdHRlcm4gWyR7ZGlyZWN0aW9ufSR7c3RlcHN9XSBoYXMgYmVlbiB1c2VkYClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHdlIGFyZSBvbiB0aGUgZmlyc3Qgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzU3RhcnQgKCkge1xuICAgICAgcmV0dXJuIEdsaWRlLmluZGV4IDw9IDBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHdlIGFyZSBvbiB0aGUgbGFzdCBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNFbmQgKCkge1xuICAgICAgcmV0dXJuIEdsaWRlLmluZGV4ID49IHRoaXMubGVuZ3RoXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB3ZSBhcmUgbWFraW5nIGEgb2Zmc2V0IHJ1bi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzT2Zmc2V0IChkaXJlY3Rpb24gPSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICghZGlyZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fbykge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgLy8gZGlkIHdlIHZpZXcgdG8gdGhlIHJpZ2h0P1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3w+Jykge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlLmRpcmVjdGlvbiA9PT0gJ3wnICYmIHRoaXMubW92ZS5zdGVwcyA9PT0gJz4nXG4gICAgICB9XG5cbiAgICAgIC8vIGRpZCB3ZSB2aWV3IHRvIHRoZSBsZWZ0P1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3w8Jykge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlLmRpcmVjdGlvbiA9PT0gJ3wnICYmIHRoaXMubW92ZS5zdGVwcyA9PT0gJzwnXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLm1vdmUuZGlyZWN0aW9uID09PSBkaXJlY3Rpb25cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGJvdW5kIG1vZGUgaXMgYWN0aXZlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzQm91bmQgKCkge1xuICAgICAgcmV0dXJuIEdsaWRlLmlzVHlwZSgnc2xpZGVyJykgJiYgR2xpZGUuc2V0dGluZ3MuZm9jdXNBdCAhPT0gJ2NlbnRlcicgJiYgR2xpZGUuc2V0dGluZ3MuYm91bmRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBpbmRleCB2YWx1ZSB0byBtb3ZlIGZvcndhcmQvdG8gdGhlIHJpZ2h0XG4gICAqXG4gICAqIEBwYXJhbSB2aWV3U2l6ZVxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZnVuY3Rpb24gY2FsY3VsYXRlRm9yd2FyZEluZGV4ICh2aWV3U2l6ZSkge1xuICAgIGNvbnN0IHsgaW5kZXggfSA9IEdsaWRlXG5cbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICByZXR1cm4gaW5kZXggKyB2aWV3U2l6ZVxuICAgIH1cblxuICAgIHJldHVybiBpbmRleCArICh2aWV3U2l6ZSAtIChpbmRleCAlIHZpZXdTaXplKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemVzIHRoZSBnaXZlbiBmb3J3YXJkIGluZGV4IGJhc2VkIG9uIGdsaWRlIHNldHRpbmdzLCBwcmV2ZW50aW5nIGl0IHRvIGV4Y2VlZCBjZXJ0YWluIGJvdW5kYXJpZXNcbiAgICpcbiAgICogQHBhcmFtIGluZGV4XG4gICAqIEBwYXJhbSBsZW5ndGhcbiAgICogQHBhcmFtIHZpZXdTaXplXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBub3JtYWxpemVGb3J3YXJkSW5kZXggKGluZGV4LCB2aWV3U2l6ZSkge1xuICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSBSdW5cblxuICAgIGlmIChpbmRleCA8PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykpIHtcbiAgICAgIHJldHVybiBpbmRleCAtIChsZW5ndGggKyAxKVxuICAgIH1cblxuICAgIGlmIChHbGlkZS5zZXR0aW5ncy5yZXdpbmQpIHtcbiAgICAgIC8vIGJvdW5kIGRvZXMgZnVubnkgdGhpbmdzIHdpdGggdGhlIGxlbmd0aCwgdGhlcmVmb3Igd2UgaGF2ZSB0byBiZSBjZXJ0YWluXG4gICAgICAvLyB0aGF0IHdlIGFyZSBvbiB0aGUgbGFzdCBwb3NzaWJsZSBpbmRleCB2YWx1ZSBnaXZlbiBieSBib3VuZFxuICAgICAgaWYgKFJ1bi5pc0JvdW5kKCkgJiYgIVJ1bi5pc0VuZCgpKSB7XG4gICAgICAgIHJldHVybiBsZW5ndGhcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICBpZiAoUnVuLmlzQm91bmQoKSkge1xuICAgICAgcmV0dXJuIGxlbmd0aFxuICAgIH1cblxuICAgIHJldHVybiBNYXRoLmZsb29yKGxlbmd0aCAvIHZpZXdTaXplKSAqIHZpZXdTaXplXG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBpbmRleCB2YWx1ZSB0byBtb3ZlIGJhY2t3YXJkL3RvIHRoZSBsZWZ0XG4gICAqXG4gICAqIEBwYXJhbSB2aWV3U2l6ZVxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZnVuY3Rpb24gY2FsY3VsYXRlQmFja3dhcmRJbmRleCAodmlld1NpemUpIHtcbiAgICBjb25zdCB7IGluZGV4IH0gPSBHbGlkZVxuXG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgcmV0dXJuIGluZGV4IC0gdmlld1NpemVcbiAgICB9XG5cbiAgICAvLyBlbnN1cmUgb3VyIGJhY2sgbmF2aWdhdGlvbiByZXN1bHRzIGluIHRoZSBzYW1lIGluZGV4IGFzIGEgZm9yd2FyZCBuYXZpZ2F0aW9uXG4gICAgLy8gdG8gZXhwZXJpZW5jZSBhIGhvbW9nZW5lb3VzIHBhZ2luZ1xuICAgIGNvbnN0IHZpZXcgPSBNYXRoLmNlaWwoaW5kZXggLyB2aWV3U2l6ZSlcblxuICAgIHJldHVybiAodmlldyAtIDEpICogdmlld1NpemVcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemVzIHRoZSBnaXZlbiBiYWNrd2FyZCBpbmRleCBiYXNlZCBvbiBnbGlkZSBzZXR0aW5ncywgcHJldmVudGluZyBpdCB0byBleGNlZWQgY2VydGFpbiBib3VuZGFyaWVzXG4gICAqXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKiBAcGFyYW0gbGVuZ3RoXG4gICAqIEBwYXJhbSB2aWV3U2l6ZVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZUJhY2t3YXJkSW5kZXggKGluZGV4LCB2aWV3U2l6ZSkge1xuICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSBSdW5cblxuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICByZXR1cm4gaW5kZXggKyAobGVuZ3RoICsgMSlcbiAgICB9XG5cbiAgICBpZiAoR2xpZGUuc2V0dGluZ3MucmV3aW5kKSB7XG4gICAgICAvLyBib3VuZCBkb2VzIGZ1bm55IHRoaW5ncyB3aXRoIHRoZSBsZW5ndGgsIHRoZXJlZm9yIHdlIGhhdmUgdG8gYmUgY2VydGFpblxuICAgICAgLy8gdGhhdCB3ZSBhcmUgb24gZmlyc3QgcG9zc2libGUgaW5kZXggdmFsdWUgYmVmb3JlIHdlIHRvIHJld2luZCB0byB0aGUgbGVuZ3RoIGdpdmVuIGJ5IGJvdW5kXG4gICAgICBpZiAoUnVuLmlzQm91bmQoKSAmJiBSdW4uaXNTdGFydCgpKSB7XG4gICAgICAgIHJldHVybiBsZW5ndGhcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IobGVuZ3RoIC8gdmlld1NpemUpICogdmlld1NpemVcbiAgICB9XG5cbiAgICByZXR1cm4gMFxuICB9XG5cbiAgZGVmaW5lKFJ1biwgJ21vdmUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgbW92ZSBzY2hlbWEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBtb3ZlIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0ICh2YWx1ZSkge1xuICAgICAgbGV0IHN0ZXAgPSB2YWx1ZS5zdWJzdHIoMSlcblxuICAgICAgdGhpcy5fbSA9IHtcbiAgICAgICAgZGlyZWN0aW9uOiB2YWx1ZS5zdWJzdHIoMCwgMSksXG4gICAgICAgIHN0ZXBzOiBzdGVwID8gKHRvSW50KHN0ZXApID8gdG9JbnQoc3RlcCkgOiBzdGVwKSA6IDBcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKFJ1biwgJ2xlbmd0aCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBydW5uaW5nIGRpc3RhbmNlIGJhc2VkXG4gICAgICogb24gemVyby1pbmRleGluZyBudW1iZXIgb2Ygc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgeyBzZXR0aW5ncyB9ID0gR2xpZGVcbiAgICAgIGxldCB7IGxlbmd0aCB9ID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlc1xuXG4gICAgICAvLyBJZiB0aGUgYGJvdW5kYCBvcHRpb24gaXMgYWN0aXZlLCBhIG1heGltdW0gcnVubmluZyBkaXN0YW5jZSBzaG91bGQgYmVcbiAgICAgIC8vIHJlZHVjZWQgYnkgYHBlclZpZXdgIGFuZCBgZm9jdXNBdGAgc2V0dGluZ3MuIFJ1bm5pbmcgZGlzdGFuY2VcbiAgICAgIC8vIHNob3VsZCBlbmQgYmVmb3JlIGNyZWF0aW5nIGFuIGVtcHR5IHNwYWNlIGFmdGVyIGluc3RhbmNlLlxuICAgICAgaWYgKHRoaXMuaXNCb3VuZCgpKSB7XG4gICAgICAgIHJldHVybiAobGVuZ3RoIC0gMSkgLSAodG9JbnQoc2V0dGluZ3MucGVyVmlldykgLSAxKSArIHRvSW50KHNldHRpbmdzLmZvY3VzQXQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBsZW5ndGggLSAxXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShSdW4sICdvZmZzZXQnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBzdGF0dXMgb2YgdGhlIG9mZnNldHRpbmcgZmxhZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBSdW5cbn1cbiIsIi8qKlxuICogUmV0dXJucyBhIGN1cnJlbnQgdGltZS5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3cgKCkge1xuICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKClcbn1cbiIsImltcG9ydCB7IG5vdyB9IGZyb20gJy4vdGltZSdcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIHdoZW4gaW52b2tlZCwgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZFxuICogYXQgbW9zdCBvbmNlIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmNcbiAqIEBwYXJhbSB7TnVtYmVyfSB3YWl0XG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZSAoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICBsZXQgdGltZW91dCwgY29udGV4dCwgYXJncywgcmVzdWx0XG4gIGxldCBwcmV2aW91cyA9IDBcbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge31cblxuICBsZXQgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJldmlvdXMgPSBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlID8gMCA6IG5vdygpXG4gICAgdGltZW91dCA9IG51bGxcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGxcbiAgfVxuXG4gIGxldCB0aHJvdHRsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGF0ID0gbm93KClcbiAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gYXRcbiAgICBsZXQgcmVtYWluaW5nID0gd2FpdCAtIChhdCAtIHByZXZpb3VzKVxuICAgIGNvbnRleHQgPSB0aGlzXG4gICAgYXJncyA9IGFyZ3VtZW50c1xuICAgIGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XG4gICAgICBpZiAodGltZW91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICAgICAgdGltZW91dCA9IG51bGxcbiAgICAgIH1cbiAgICAgIHByZXZpb3VzID0gYXRcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncylcbiAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsXG4gICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZylcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgdGhyb3R0bGVkLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICBwcmV2aW91cyA9IDBcbiAgICB0aW1lb3V0ID0gY29udGV4dCA9IGFyZ3MgPSBudWxsXG4gIH1cblxuICByZXR1cm4gdGhyb3R0bGVkXG59XG4iLCJpbXBvcnQgeyB0b0ludCB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJy4uL3V0aWxzL3dhaXQnXG5cbmNvbnN0IE1BUkdJTl9UWVBFID0ge1xuICBsdHI6IFsnbWFyZ2luTGVmdCcsICdtYXJnaW5SaWdodCddLFxuICBydGw6IFsnbWFyZ2luUmlnaHQnLCAnbWFyZ2luTGVmdCddXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IEdhcHMgPSB7XG4gICAgLyoqXG4gICAgICogQXBwbGllcyBnYXBzIGJldHdlZW4gc2xpZGVzLiBGaXJzdCBhbmQgbGFzdFxuICAgICAqIHNsaWRlcyBkbyBub3QgcmVjZWl2ZSBpdCdzIGVkZ2UgbWFyZ2lucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IHNsaWRlc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYXBwbHkgKHNsaWRlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNsaWRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBsZXQgc3R5bGUgPSBzbGlkZXNbaV0uc3R5bGVcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IENvbXBvbmVudHMuRGlyZWN0aW9uLnZhbHVlXG5cbiAgICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzBdXSA9IGAke3RoaXMudmFsdWUgLyAyfXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMF1dID0gJydcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpICE9PSBzbGlkZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMV1dID0gYCR7dGhpcy52YWx1ZSAvIDJ9cHhgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGVbTUFSR0lOX1RZUEVbZGlyZWN0aW9uXVsxXV0gPSAnJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZ2FwcyBmcm9tIHRoZSBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBzbGlkZXNcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAqL1xuICAgIHJlbW92ZSAoc2xpZGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2xpZGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGxldCBzdHlsZSA9IHNsaWRlc1tpXS5zdHlsZVxuXG4gICAgICAgIHN0eWxlLm1hcmdpbkxlZnQgPSAnJ1xuICAgICAgICBzdHlsZS5tYXJnaW5SaWdodCA9ICcnXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKEdhcHMsICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBnYXAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdG9JbnQoR2xpZGUuc2V0dGluZ3MuZ2FwKVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoR2FwcywgJ2dyb3cnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhZGRpdGlvbmFsIGRpbWVudGlvbnMgdmFsdWUgY2F1c2VkIGJ5IGdhcHMuXG4gICAgICogVXNlZCB0byBpbmNyZWFzZSB3aWR0aCBvZiB0aGUgc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gR2Fwcy52YWx1ZSAqIChDb21wb25lbnRzLlNpemVzLmxlbmd0aClcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKEdhcHMsICdyZWR1Y3RvcicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHJlZHVjdGlvbiB2YWx1ZSBjYXVzZWQgYnkgZ2Fwcy5cbiAgICAgKiBVc2VkIHRvIHN1YnRyYWN0IHdpZHRoIG9mIHRoZSBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgcGVyVmlldyA9IEdsaWRlLnNldHRpbmdzLnBlclZpZXdcblxuICAgICAgcmV0dXJuIChHYXBzLnZhbHVlICogKHBlclZpZXcgLSAxKSkgLyBwZXJWaWV3XG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBBcHBseSBjYWxjdWxhdGVkIGdhcHM6XG4gICAqIC0gYWZ0ZXIgYnVpbGRpbmcsIHNvIHNsaWRlcyAoaW5jbHVkaW5nIGNsb25lcykgd2lsbCByZWNlaXZlIHByb3BlciBtYXJnaW5zXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSwgdG8gcmVjYWxjdWxhdGUgZ2FwcyB3aXRoIG5ldyBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5hZnRlcicsICd1cGRhdGUnXSwgdGhyb3R0bGUoKCkgPT4ge1xuICAgIEdhcHMuYXBwbHkoQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuY2hpbGRyZW4pXG4gIH0sIDMwKSlcblxuICAvKipcbiAgICogUmVtb3ZlIGdhcHM6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIEdhcHMucmVtb3ZlKENvbXBvbmVudHMuSHRtbC53cmFwcGVyLmNoaWxkcmVuKVxuICB9KVxuXG4gIHJldHVybiBHYXBzXG59XG4iLCIvKipcbiAqIEZpbmRzIHNpYmxpbmdzIG5vZGVzIG9mIHRoZSBwYXNzZWQgbm9kZS5cbiAqXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBub2RlXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNpYmxpbmdzIChub2RlKSB7XG4gIGlmIChub2RlICYmIG5vZGUucGFyZW50Tm9kZSkge1xuICAgIGxldCBuID0gbm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGRcbiAgICBsZXQgbWF0Y2hlZCA9IFtdXG5cbiAgICBmb3IgKDsgbjsgbiA9IG4ubmV4dFNpYmxpbmcpIHtcbiAgICAgIGlmIChuLm5vZGVUeXBlID09PSAxICYmIG4gIT09IG5vZGUpIHtcbiAgICAgICAgbWF0Y2hlZC5wdXNoKG4pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoZWRcbiAgfVxuXG4gIHJldHVybiBbXVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiBwYXNzZWQgbm9kZSBleGlzdCBhbmQgaXMgYSB2YWxpZCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IG5vZGVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGlzdCAobm9kZSkge1xuICBpZiAobm9kZSAmJiBub2RlIGluc3RhbmNlb2Ygd2luZG93LkhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuIiwiaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uL3V0aWxzL2xvZydcbmltcG9ydCB7IGV4aXN0IH0gZnJvbSAnLi4vdXRpbHMvZG9tJ1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi91dGlscy91bml0J1xuXG5jb25zdCBUUkFDS19TRUxFQ1RPUiA9ICdbZGF0YS1nbGlkZS1lbD1cInRyYWNrXCJdJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgY29uc3QgSHRtbCA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cCBzbGlkZXIgSFRNTCBub2Rlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7R2xpZGV9IGdsaWRlXG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5yb290ID0gR2xpZGUuc2VsZWN0b3JcbiAgICAgIHRoaXMudHJhY2sgPSB0aGlzLnJvb3QucXVlcnlTZWxlY3RvcihUUkFDS19TRUxFQ1RPUilcbiAgICAgIHRoaXMuc2xpZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy53cmFwcGVyLmNoaWxkcmVuKS5maWx0ZXIoKHNsaWRlKSA9PiB7XG4gICAgICAgIHJldHVybiAhc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuY2xvbmVTbGlkZSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKEh0bWwsICdyb290Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgbm9kZSBvZiB0aGUgZ2xpZGUgbWFpbiBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gSHRtbC5fclxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIG5vZGUgb2YgdGhlIGdsaWRlIG1haW4gZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBzZXQgKHIpIHtcbiAgICAgIGlmIChpc1N0cmluZyhyKSkge1xuICAgICAgICByID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyKVxuICAgICAgfVxuXG4gICAgICBpZiAoZXhpc3QocikpIHtcbiAgICAgICAgSHRtbC5fciA9IHJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oJ1Jvb3QgZWxlbWVudCBtdXN0IGJlIGEgZXhpc3RpbmcgSHRtbCBub2RlJylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKEh0bWwsICd0cmFjaycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIG5vZGUgb2YgdGhlIGdsaWRlIHRyYWNrIHdpdGggc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gSHRtbC5fdFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIG5vZGUgb2YgdGhlIGdsaWRlIHRyYWNrIHdpdGggc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNldCAodCkge1xuICAgICAgaWYgKGV4aXN0KHQpKSB7XG4gICAgICAgIEh0bWwuX3QgPSB0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKGBDb3VsZCBub3QgZmluZCB0cmFjayBlbGVtZW50LiBQbGVhc2UgdXNlICR7VFJBQ0tfU0VMRUNUT1J9IGF0dHJpYnV0ZS5gKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoSHRtbCwgJ3dyYXBwZXInLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBub2RlIG9mIHRoZSBzbGlkZXMgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIEh0bWwudHJhY2suY2hpbGRyZW5bMF1cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIEh0bWxcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCB7IHRvSW50LCBpc09iamVjdCB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IFBlZWsgPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXBzIGhvdyBtdWNoIHRvIHBlZWsgYmFzZWQgb24gc2V0dGluZ3MuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBHbGlkZS5zZXR0aW5ncy5wZWVrXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKFBlZWssICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBwZWVrLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcnxPYmplY3R9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBQZWVrLl92XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgb2YgdGhlIHBlZWsuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IHZhbHVlXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXQgKHZhbHVlKSB7XG4gICAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlLmJlZm9yZSA9IHRvSW50KHZhbHVlLmJlZm9yZSlcbiAgICAgICAgdmFsdWUuYWZ0ZXIgPSB0b0ludCh2YWx1ZS5hZnRlcilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gdG9JbnQodmFsdWUpXG4gICAgICB9XG5cbiAgICAgIFBlZWsuX3YgPSB2YWx1ZVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoUGVlaywgJ3JlZHVjdG9yJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgcmVkdWN0aW9uIHZhbHVlIGNhdXNlZCBieSBwZWVrLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgbGV0IHZhbHVlID0gUGVlay52YWx1ZVxuICAgICAgbGV0IHBlclZpZXcgPSBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3XG5cbiAgICAgIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuICh2YWx1ZS5iZWZvcmUgLyBwZXJWaWV3KSArICh2YWx1ZS5hZnRlciAvIHBlclZpZXcpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZSAqIDIgLyBwZXJWaWV3XG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZWNhbGN1bGF0ZSBwZWVraW5nIHNpemVzIG9uOlxuICAgKiAtIHdoZW4gcmVzaXppbmcgd2luZG93IHRvIHVwZGF0ZSB0byBwcm9wZXIgcGVyY2VudHNcbiAgICovXG4gIEV2ZW50cy5vbihbJ3Jlc2l6ZScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIFBlZWsubW91bnQoKVxuICB9KVxuXG4gIHJldHVybiBQZWVrXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgeyB0b0ludCwgaXNVbmRlZmluZWQgfSBmcm9tICcuLi91dGlscy91bml0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBNb3ZlID0ge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgbW92ZSBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLl9vID0gMFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIGEgbW92ZW1lbnQgdmFsdWUgYmFzZWQgb24gcGFzc2VkIG9mZnNldCBhbmQgY3VycmVudGx5IGFjdGl2ZSBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gb2Zmc2V0XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtYWtlIChvZmZzZXQgPSAwKSB7XG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldFxuXG4gICAgICBFdmVudHMuZW1pdCgnbW92ZScsIHtcbiAgICAgICAgbW92ZW1lbnQ6IHRoaXMudmFsdWVcbiAgICAgIH0pXG5cbiAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcigoKSA9PiB7XG4gICAgICAgIEV2ZW50cy5lbWl0KCdtb3ZlLmFmdGVyJywge1xuICAgICAgICAgIG1vdmVtZW50OiB0aGlzLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShNb3ZlLCAnb2Zmc2V0Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYW4gb2Zmc2V0IHZhbHVlIHVzZWQgdG8gbW9kaWZ5IGN1cnJlbnQgdHJhbnNsYXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gTW92ZS5fb1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFuIG9mZnNldCB2YWx1ZSB1c2VkIHRvIG1vZGlmeSBjdXJyZW50IHRyYW5zbGF0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBzZXQgKHZhbHVlKSB7XG4gICAgICBNb3ZlLl9vID0gIWlzVW5kZWZpbmVkKHZhbHVlKSA/IHRvSW50KHZhbHVlKSA6IDBcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKE1vdmUsICd0cmFuc2xhdGUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhIHJhdyBtb3ZlbWVudCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCAqIEdsaWRlLmluZGV4XG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShNb3ZlLCAndmFsdWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBhY3R1YWwgbW92ZW1lbnQgdmFsdWUgY29ycmVjdGVkIGJ5IG9mZnNldC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgbGV0IG9mZnNldCA9IHRoaXMub2Zmc2V0XG4gICAgICBsZXQgdHJhbnNsYXRlID0gdGhpcy50cmFuc2xhdGVcblxuICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRlICsgb2Zmc2V0XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBvZmZzZXRcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIE1ha2UgbW92ZW1lbnQgdG8gcHJvcGVyIHNsaWRlIG9uOlxuICAgKiAtIGJlZm9yZSBidWlsZCwgc28gZ2xpZGUgd2lsbCBzdGFydCBhdCBgc3RhcnRBdGAgaW5kZXhcbiAgICogLSBvbiBlYWNoIHN0YW5kYXJkIHJ1biB0byBtb3ZlIHRvIG5ld2x5IGNhbGN1bGF0ZWQgaW5kZXhcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmJlZm9yZScsICdydW4nXSwgKCkgPT4ge1xuICAgIE1vdmUubWFrZSgpXG4gIH0pXG5cbiAgcmV0dXJuIE1vdmVcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgU2l6ZXMgPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXBzIGRpbWVudGlvbnMgb2Ygc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXR1cFNsaWRlcyAoKSB7XG4gICAgICBsZXQgd2lkdGggPSBgJHt0aGlzLnNsaWRlV2lkdGh9cHhgXG4gICAgICBsZXQgc2xpZGVzID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlc1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzbGlkZXNbaV0uc3R5bGUud2lkdGggPSB3aWR0aFxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXR1cHMgZGltZW50aW9ucyBvZiBzbGlkZXMgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0dXBXcmFwcGVyICgpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLndpZHRoID0gYCR7dGhpcy53cmFwcGVyU2l6ZX1weGBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhcHBsaWVkIHN0eWxlcyBmcm9tIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmUgKCkge1xuICAgICAgbGV0IHNsaWRlcyA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXNcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2xpZGVzW2ldLnN0eWxlLndpZHRoID0gJydcbiAgICAgIH1cblxuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUud2lkdGggPSAnJ1xuICAgIH1cbiAgfVxuXG4gIGRlZmluZShTaXplcywgJ2xlbmd0aCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGNvdW50IG51bWJlciBvZiB0aGUgc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gQ29tcG9uZW50cy5IdG1sLnNsaWRlcy5sZW5ndGhcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKFNpemVzLCAnd2lkdGgnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB3aWR0aCB2YWx1ZSBvZiB0aGUgc2xpZGVyICh2aXNpYmxlIGFyZWEpLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gQ29tcG9uZW50cy5IdG1sLnJvb3Qub2Zmc2V0V2lkdGhcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKFNpemVzLCAnd3JhcHBlclNpemUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBzaXplIG9mIHRoZSBzbGlkZXMgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIFNpemVzLnNsaWRlV2lkdGggKiBTaXplcy5sZW5ndGggKyBDb21wb25lbnRzLkdhcHMuZ3JvdyArIENvbXBvbmVudHMuQ2xvbmVzLmdyb3dcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKFNpemVzLCAnc2xpZGVXaWR0aCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHdpZHRoIHZhbHVlIG9mIGEgc2luZ2xlIHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gKFNpemVzLndpZHRoIC8gR2xpZGUuc2V0dGluZ3MucGVyVmlldykgLSBDb21wb25lbnRzLlBlZWsucmVkdWN0b3IgLSBDb21wb25lbnRzLkdhcHMucmVkdWN0b3JcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIEFwcGx5IGNhbGN1bGF0ZWQgZ2xpZGUncyBkaW1lbnNpb25zOlxuICAgKiAtIGJlZm9yZSBidWlsZGluZywgc28gb3RoZXIgZGltZW50aW9ucyAoZS5nLiB0cmFuc2xhdGUpIHdpbGwgYmUgY2FsY3VsYXRlZCBwcm9wZXJ0bHlcbiAgICogLSB3aGVuIHJlc2l6aW5nIHdpbmRvdyB0byByZWNhbGN1bGF0ZSBzaWxkZXMgZGltZW5zaW9uc1xuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEksIHRvIGNhbGN1bGF0ZSBkaW1lbnNpb25zIGJhc2VkIG9uIG5ldyBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAncmVzaXplJywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgU2l6ZXMuc2V0dXBTbGlkZXMoKVxuICAgIFNpemVzLnNldHVwV3JhcHBlcigpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjYWxjdWxhdGVkIGdsaWRlJ3MgZGltZW5zaW9uczpcbiAgICogLSBvbiBkZXN0b3RpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBTaXplcy5yZW1vdmUoKVxuICB9KVxuXG4gIHJldHVybiBTaXplc1xufVxuIiwiaW1wb3J0IHsgc2libGluZ3MgfSBmcm9tICcuLi91dGlscy9kb20nXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IEJ1aWxkID0ge1xuICAgIC8qKlxuICAgICAqIEluaXQgZ2xpZGUgYnVpbGRpbmcuIEFkZHMgY2xhc3Nlcywgc2V0c1xuICAgICAqIGRpbWVuc2lvbnMgYW5kIHNldHVwcyBpbml0aWFsIHN0YXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICBFdmVudHMuZW1pdCgnYnVpbGQuYmVmb3JlJylcblxuICAgICAgdGhpcy50eXBlQ2xhc3MoKVxuICAgICAgdGhpcy5hY3RpdmVDbGFzcygpXG5cbiAgICAgIEV2ZW50cy5lbWl0KCdidWlsZC5hZnRlcicpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYHR5cGVgIGNsYXNzIHRvIHRoZSBnbGlkZSBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB0eXBlQ2xhc3MgKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LmFkZChHbGlkZS5zZXR0aW5ncy5jbGFzc2VzW0dsaWRlLnNldHRpbmdzLnR5cGVdKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhY3RpdmVDbGFzcyAoKSB7XG4gICAgICBsZXQgY2xhc3NlcyA9IEdsaWRlLnNldHRpbmdzLmNsYXNzZXNcbiAgICAgIGxldCBzbGlkZSA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXNbR2xpZGUuaW5kZXhdXG5cbiAgICAgIGlmIChzbGlkZSkge1xuICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuYWN0aXZlU2xpZGUpXG5cbiAgICAgICAgc2libGluZ3Moc2xpZGUpLmZvckVhY2goKHNpYmxpbmcpID0+IHtcbiAgICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlcy5hY3RpdmVTbGlkZSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBIVE1MIGNsYXNzZXMgYXBwbGllZCBhdCBidWlsZGluZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3NlcyAoKSB7XG4gICAgICBsZXQgY2xhc3NlcyA9IEdsaWRlLnNldHRpbmdzLmNsYXNzZXNcblxuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LnJlbW92ZShjbGFzc2VzW0dsaWRlLnNldHRpbmdzLnR5cGVdKVxuXG4gICAgICBDb21wb25lbnRzLkh0bWwuc2xpZGVzLmZvckVhY2goKHNpYmxpbmcpID0+IHtcbiAgICAgICAgc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzZXMuYWN0aXZlU2xpZGUpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBidWlsZGluZyBjbGFzc2VzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gYnJpbmcgSFRNTCB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKiAtIG9uIHVwZGF0aW5nIHRvIHJlbW92ZSBjbGFzc2VzIGJlZm9yZSByZW1vdW50aW5nIGNvbXBvbmVudFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIEJ1aWxkLnJlbW92ZUNsYXNzZXMoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdW50IGNvbXBvbmVudDpcbiAgICogLSBvbiByZXNpemluZyBvZiB0aGUgd2luZG93IHRvIGNhbGN1bGF0ZSBuZXcgZGltZW50aW9uc1xuICAgKiAtIG9uIHVwZGF0aW5nIHNldHRpbmdzIHZpYSBBUElcbiAgICovXG4gIEV2ZW50cy5vbihbJ3Jlc2l6ZScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIEJ1aWxkLm1vdW50KClcbiAgfSlcblxuICAvKipcbiAgICogU3dhcCBhY3RpdmUgY2xhc3Mgb2YgY3VycmVudCBzbGlkZTpcbiAgICogLSBhZnRlciBlYWNoIG1vdmUgdG8gdGhlIG5ldyBpbmRleFxuICAgKi9cbiAgRXZlbnRzLm9uKCdtb3ZlLmFmdGVyJywgKCkgPT4ge1xuICAgIEJ1aWxkLmFjdGl2ZUNsYXNzKClcbiAgfSlcblxuICByZXR1cm4gQnVpbGRcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgQ2xvbmVzID0ge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBwYXR0ZXJuIG1hcCBhbmQgY29sbGVjdCBzbGlkZXMgdG8gYmUgY2xvbmVkLlxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuaXRlbXMgPSBbXVxuXG4gICAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmNvbGxlY3QoKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0IGNsb25lcyB3aXRoIHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtbXX1cbiAgICAgKi9cbiAgICBjb2xsZWN0IChpdGVtcyA9IFtdKSB7XG4gICAgICBsZXQgeyBzbGlkZXMgfSA9IENvbXBvbmVudHMuSHRtbFxuICAgICAgbGV0IHsgcGVyVmlldywgY2xhc3NlcyB9ID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgY29uc3QgcGVla0luY3JlbWVudGVyID0gKyEhR2xpZGUuc2V0dGluZ3MucGVla1xuICAgICAgY29uc3QgY2xvbmVDb3VudCA9IHBlclZpZXcgKyBwZWVrSW5jcmVtZW50ZXIgKyBNYXRoLnJvdW5kKHBlclZpZXcgLyAyKVxuICAgICAgY29uc3QgYXBwZW5kID0gc2xpZGVzLnNsaWNlKDAsIGNsb25lQ291bnQpLnJldmVyc2UoKVxuICAgICAgY29uc3QgcHJlcGVuZCA9IHNsaWRlcy5zbGljZShjbG9uZUNvdW50ICogLTEpXG5cbiAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihwZXJWaWV3IC8gc2xpZGVzLmxlbmd0aCkpOyByKyspIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcHBlbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgY2xvbmUgPSBhcHBlbmRbaV0uY2xvbmVOb2RlKHRydWUpXG5cbiAgICAgICAgICBjbG9uZS5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuY2xvbmVTbGlkZSlcblxuICAgICAgICAgIGl0ZW1zLnB1c2goY2xvbmUpXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXBlbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgY2xvbmUgPSBwcmVwZW5kW2ldLmNsb25lTm9kZSh0cnVlKVxuXG4gICAgICAgICAgY2xvbmUuY2xhc3NMaXN0LmFkZChjbGFzc2VzLmNsb25lU2xpZGUpXG5cbiAgICAgICAgICBpdGVtcy51bnNoaWZ0KGNsb25lKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpdGVtc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBcHBlbmQgY2xvbmVkIHNsaWRlcyB3aXRoIGdlbmVyYXRlZCBwYXR0ZXJuLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhcHBlbmQgKCkge1xuICAgICAgbGV0IHsgaXRlbXMgfSA9IHRoaXNcbiAgICAgIGxldCB7IHdyYXBwZXIsIHNsaWRlcyB9ID0gQ29tcG9uZW50cy5IdG1sXG5cbiAgICAgIGNvbnN0IGhhbGYgPSBNYXRoLmZsb29yKGl0ZW1zLmxlbmd0aCAvIDIpXG4gICAgICBjb25zdCBwcmVwZW5kID0gaXRlbXMuc2xpY2UoMCwgaGFsZikucmV2ZXJzZSgpXG4gICAgICBjb25zdCBhcHBlbmQgPSBpdGVtcy5zbGljZShoYWxmICogLTEpLnJldmVyc2UoKVxuICAgICAgY29uc3Qgd2lkdGggPSBgJHtDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGh9cHhgXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXBwZW5kLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoYXBwZW5kW2ldKVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXBlbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgd3JhcHBlci5pbnNlcnRCZWZvcmUocHJlcGVuZFtpXSwgc2xpZGVzWzBdKVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZW1zW2ldLnN0eWxlLndpZHRoID0gd2lkdGhcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBjbG9uZWQgc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmUgKCkge1xuICAgICAgbGV0IHsgaXRlbXMgfSA9IHRoaXNcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5yZW1vdmVDaGlsZChpdGVtc1tpXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZWZpbmUoQ2xvbmVzLCAnZ3JvdycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGFkZGl0aW9uYWwgZGltZW50aW9ucyB2YWx1ZSBjYXVzZWQgYnkgY2xvbmVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gKENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCArIENvbXBvbmVudHMuR2Fwcy52YWx1ZSkgKiBDbG9uZXMuaXRlbXMubGVuZ3RoXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBBcHBlbmQgYWRkaXRpb25hbCBzbGlkZSdzIGNsb25lczpcbiAgICogLSB3aGlsZSBnbGlkZSdzIHR5cGUgaXMgYGNhcm91c2VsYFxuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgQ2xvbmVzLnJlbW92ZSgpXG4gICAgQ2xvbmVzLm1vdW50KClcbiAgICBDbG9uZXMuYXBwZW5kKClcbiAgfSlcblxuICAvKipcbiAgICogQXBwZW5kIGFkZGl0aW9uYWwgc2xpZGUncyBjbG9uZXM6XG4gICAqIC0gd2hpbGUgZ2xpZGUncyB0eXBlIGlzIGBjYXJvdXNlbGBcbiAgICovXG4gIEV2ZW50cy5vbignYnVpbGQuYmVmb3JlJywgKCkgPT4ge1xuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykpIHtcbiAgICAgIENsb25lcy5hcHBlbmQoKVxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogUmVtb3ZlIGNsb25lcyBIVE1MRWxlbWVudHM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gYnJpbmcgSFRNTCB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIENsb25lcy5yZW1vdmUoKVxuICB9KVxuXG4gIHJldHVybiBDbG9uZXNcbn1cbiIsImltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vLi4vdXRpbHMvdW5pdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRzQmluZGVyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIEV2ZW50c0JpbmRlciBpbnN0YW5jZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChsaXN0ZW5lcnMgPSB7fSkge1xuICAgIHRoaXMubGlzdGVuZXJzID0gbGlzdGVuZXJzXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudHMgbGlzdGVuZXJzIHRvIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gIHtTdHJpbmd8QXJyYXl9IGV2ZW50c1xuICAgKiBAcGFyYW0gIHtFbGVtZW50fFdpbmRvd3xEb2N1bWVudH0gZWxcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGNsb3N1cmVcbiAgICogQHBhcmFtICB7Qm9vbGVhbnxPYmplY3R9IGNhcHR1cmVcbiAgICogQHJldHVybiB7Vm9pZH1cbiAgICovXG4gIG9uIChldmVudHMsIGVsLCBjbG9zdXJlLCBjYXB0dXJlID0gZmFsc2UpIHtcbiAgICBpZiAoaXNTdHJpbmcoZXZlbnRzKSkge1xuICAgICAgZXZlbnRzID0gW2V2ZW50c11cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRzW2ldXSA9IGNsb3N1cmVcblxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudHNbaV0sIHRoaXMubGlzdGVuZXJzW2V2ZW50c1tpXV0sIGNhcHR1cmUpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzIGZyb20gYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSAge1N0cmluZ3xBcnJheX0gZXZlbnRzXG4gICAqIEBwYXJhbSAge0VsZW1lbnR8V2luZG93fERvY3VtZW50fSBlbFxuICAgKiBAcGFyYW0gIHtCb29sZWFufE9iamVjdH0gY2FwdHVyZVxuICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgKi9cbiAgb2ZmIChldmVudHMsIGVsLCBjYXB0dXJlID0gZmFsc2UpIHtcbiAgICBpZiAoaXNTdHJpbmcoZXZlbnRzKSkge1xuICAgICAgZXZlbnRzID0gW2V2ZW50c11cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHNbaV0sIHRoaXMubGlzdGVuZXJzW2V2ZW50c1tpXV0sIGNhcHR1cmUpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgY29sbGVjdGVkIGxpc3RlbmVycy5cbiAgICpcbiAgICogQHJldHVybnMge1ZvaWR9XG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnNcbiAgfVxufVxuIiwiaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICcuLi91dGlscy93YWl0J1xuXG5pbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICBjb25zdCBSZXNpemUgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgd2luZG93IGJpbmRpbmdzLlxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuYmluZCgpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIGByZXpzaXplYCBsaXN0ZW5lciB0byB0aGUgd2luZG93LlxuICAgICAqIEl0J3MgYSBjb3N0bHkgZXZlbnQsIHNvIHdlIGFyZSBkZWJvdW5jaW5nIGl0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kICgpIHtcbiAgICAgIEJpbmRlci5vbigncmVzaXplJywgd2luZG93LCB0aHJvdHRsZSgoKSA9PiB7XG4gICAgICAgIEV2ZW50cy5lbWl0KCdyZXNpemUnKVxuICAgICAgfSwgR2xpZGUuc2V0dGluZ3MudGhyb3R0bGUpKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIGxpc3RlbmVycyBmcm9tIHRoZSB3aW5kb3cuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKCdyZXNpemUnLCB3aW5kb3cpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBiaW5kaW5ncyBmcm9tIHdpbmRvdzpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byByZW1vdmUgYWRkZWQgRXZlbnRMaXN0ZW5lclxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIFJlc2l6ZS51bmJpbmQoKVxuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gUmVzaXplXG59XG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuXG5jb25zdCBWQUxJRF9ESVJFQ1RJT05TID0gWydsdHInLCAncnRsJ11cbmNvbnN0IEZMSVBFRF9NT1ZFTUVOVFMgPSB7XG4gICc+JzogJzwnLFxuICAnPCc6ICc+JyxcbiAgJz0nOiAnPSdcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgRGlyZWN0aW9uID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwcyBnYXAgdmFsdWUgYmFzZWQgb24gc2V0dGluZ3MuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBHbGlkZS5zZXR0aW5ncy5kaXJlY3Rpb25cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZXMgcGF0dGVybiBiYXNlZCBvbiBkaXJlY3Rpb24gdmFsdWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXR0ZXJuXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICByZXNvbHZlIChwYXR0ZXJuKSB7XG4gICAgICBsZXQgdG9rZW4gPSBwYXR0ZXJuLnNsaWNlKDAsIDEpXG5cbiAgICAgIGlmICh0aGlzLmlzKCdydGwnKSkge1xuICAgICAgICByZXR1cm4gcGF0dGVybi5zcGxpdCh0b2tlbikuam9pbihGTElQRURfTU9WRU1FTlRTW3Rva2VuXSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhdHRlcm5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHZhbHVlIG9mIGRpcmVjdGlvbiBtb2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdGlvblxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzIChkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBkaXJlY3Rpb25cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBkaXJlY3Rpb24gY2xhc3MgdG8gdGhlIHJvb3QgSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZGRDbGFzcyAoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uW3RoaXMudmFsdWVdKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGRpcmVjdGlvbiBjbGFzcyBmcm9tIHRoZSByb290IEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3MgKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LnJlbW92ZShHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvblt0aGlzLnZhbHVlXSlcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoRGlyZWN0aW9uLCAndmFsdWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgZGlyZWN0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIERpcmVjdGlvbi5fdlxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBkaXJlY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldCAodmFsdWUpIHtcbiAgICAgIGlmIChWQUxJRF9ESVJFQ1RJT05TLmluZGV4T2YodmFsdWUpID4gLTEpIHtcbiAgICAgICAgRGlyZWN0aW9uLl92ID0gdmFsdWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oJ0RpcmVjdGlvbiB2YWx1ZSBtdXN0IGJlIGBsdHJgIG9yIGBydGxgJylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIENsZWFyIGRpcmVjdGlvbiBjbGFzczpcbiAgICogLSBvbiBkZXN0cm95IHRvIGJyaW5nIEhUTUwgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICogLSBvbiB1cGRhdGUgdG8gcmVtb3ZlIGNsYXNzIGJlZm9yZSByZWFwcGxpbmcgYmVsbG93XG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgRGlyZWN0aW9uLnJlbW92ZUNsYXNzKClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnQ6XG4gICAqIC0gb24gdXBkYXRlIHRvIHJlZmxlY3QgY2hhbmdlcyBpbiBkaXJlY3Rpb24gdmFsdWVcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgKCkgPT4ge1xuICAgIERpcmVjdGlvbi5tb3VudCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIEFwcGx5IGRpcmVjdGlvbiBjbGFzczpcbiAgICogLSBiZWZvcmUgYnVpbGRpbmcgdG8gYXBwbHkgY2xhc3MgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVhcHBseSBkaXJlY3Rpb24gY2xhc3MgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYmVmb3JlJywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgRGlyZWN0aW9uLmFkZENsYXNzKClcbiAgfSlcblxuICByZXR1cm4gRGlyZWN0aW9uXG59XG4iLCIvKipcbiAqIFJlZmxlY3RzIHZhbHVlIG9mIGdsaWRlIG1vdmVtZW50LlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBOZWdhdGVzIHRoZSBwYXNzZWQgdHJhbnNsYXRlIGlmIGdsaWRlIGlzIGluIFJUTCBvcHRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnkgKHRyYW5zbGF0ZSkge1xuICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICByZXR1cm4gLXRyYW5zbGF0ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlXG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIFVwZGF0ZXMgZ2xpZGUgbW92ZW1lbnQgd2l0aCBhIGBnYXBgIHNldHRpbmdzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBNb2RpZmllcyBwYXNzZWQgdHJhbnNsYXRlIHZhbHVlIHdpdGggbnVtYmVyIGluIHRoZSBgZ2FwYCBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeSAodHJhbnNsYXRlKSB7XG4gICAgICBjb25zdCBtdWx0aXBsaWVyID0gTWF0aC5mbG9vcih0cmFuc2xhdGUgLyBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGgpXG4gICAgICByZXR1cm4gdHJhbnNsYXRlICsgKENvbXBvbmVudHMuR2Fwcy52YWx1ZSAqIG11bHRpcGxpZXIpXG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIFVwZGF0ZXMgZ2xpZGUgbW92ZW1lbnQgd2l0aCB3aWR0aCBvZiBhZGRpdGlvbmFsIGNsb25lcyB3aWR0aC5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogQWRkcyB0byB0aGUgcGFzc2VkIHRyYW5zbGF0ZSB3aWR0aCBvZiB0aGUgaGFsZiBvZiBjbG9uZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnkgKHRyYW5zbGF0ZSkge1xuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSArIChDb21wb25lbnRzLkNsb25lcy5ncm93IC8gMilcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvdW5pdCdcblxuLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggYSBgcGVla2Agc2V0dGluZ3MuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE1vZGlmaWVzIHBhc3NlZCB0cmFuc2xhdGUgdmFsdWUgd2l0aCBhIGBwZWVrYCBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5ICh0cmFuc2xhdGUpIHtcbiAgICAgIGlmIChHbGlkZS5zZXR0aW5ncy5mb2N1c0F0ID49IDApIHtcbiAgICAgICAgbGV0IHBlZWsgPSBDb21wb25lbnRzLlBlZWsudmFsdWVcblxuICAgICAgICBpZiAoaXNPYmplY3QocGVlaykpIHtcbiAgICAgICAgICByZXR1cm4gdHJhbnNsYXRlIC0gcGVlay5iZWZvcmVcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBwZWVrXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGVcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIGEgYGZvY3VzQXRgIHNldHRpbmdzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBNb2RpZmllcyBwYXNzZWQgdHJhbnNsYXRlIHZhbHVlIHdpdGggaW5kZXggaW4gdGhlIGBmb2N1c0F0YCBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5ICh0cmFuc2xhdGUpIHtcbiAgICAgIGxldCBnYXAgPSBDb21wb25lbnRzLkdhcHMudmFsdWVcbiAgICAgIGxldCB3aWR0aCA9IENvbXBvbmVudHMuU2l6ZXMud2lkdGhcbiAgICAgIGxldCBmb2N1c0F0ID0gR2xpZGUuc2V0dGluZ3MuZm9jdXNBdFxuICAgICAgbGV0IHNsaWRlV2lkdGggPSBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGhcblxuICAgICAgaWYgKGZvY3VzQXQgPT09ICdjZW50ZXInKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGUgLSAod2lkdGggLyAyIC0gc2xpZGVXaWR0aCAvIDIpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGUgLSAoc2xpZGVXaWR0aCAqIGZvY3VzQXQpIC0gKGdhcCAqIGZvY3VzQXQpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbmltcG9ydCBSdGwgZnJvbSAnLi90cmFuc2Zvcm1lcnMvcnRsJ1xuaW1wb3J0IEdhcCBmcm9tICcuL3RyYW5zZm9ybWVycy9nYXAnXG5pbXBvcnQgR3JvdyBmcm9tICcuL3RyYW5zZm9ybWVycy9ncm93J1xuaW1wb3J0IFBlZWtpbmcgZnJvbSAnLi90cmFuc2Zvcm1lcnMvcGVla2luZydcbmltcG9ydCBGb2N1c2luZyBmcm9tICcuL3RyYW5zZm9ybWVycy9mb2N1c2luZydcblxuLyoqXG4gKiBBcHBsaWVzIGRpZmZyZW50IHRyYW5zZm9ybWVycyBvbiB0cmFuc2xhdGUgdmFsdWUuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBNZXJnZSBpbnN0YW5jZSB0cmFuc2Zvcm1lcnMgd2l0aCBjb2xsZWN0aW9uIG9mIGRlZmF1bHQgdHJhbnNmb3JtZXJzLlxuICAgKiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZSBSdGwgY29tcG9uZW50IGJlIGxhc3Qgb24gdGhlIGxpc3QsXG4gICAqIHNvIGl0IHJlZmxlY3RzIGFsbCBwcmV2aW91cyB0cmFuc2Zvcm1hdGlvbnMuXG4gICAqXG4gICAqIEB0eXBlIHtBcnJheX1cbiAgICovXG4gIGxldCBUUkFOU0ZPUk1FUlMgPSBbXG4gICAgR2FwLFxuICAgIEdyb3csXG4gICAgUGVla2luZyxcbiAgICBGb2N1c2luZ1xuICBdLmNvbmNhdChHbGlkZS5fdCwgW1J0bF0pXG5cbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBQaXBsaW5lcyB0cmFuc2xhdGUgdmFsdWUgd2l0aCByZWdpc3RlcmVkIHRyYW5zZm9ybWVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG11dGF0ZSAodHJhbnNsYXRlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IFRSQU5TRk9STUVSUy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdHJhbnNmb3JtZXIgPSBUUkFOU0ZPUk1FUlNbaV1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0cmFuc2Zvcm1lcikgJiYgaXNGdW5jdGlvbih0cmFuc2Zvcm1lcigpLm1vZGlmeSkpIHtcbiAgICAgICAgICB0cmFuc2xhdGUgPSB0cmFuc2Zvcm1lcihHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKS5tb2RpZnkodHJhbnNsYXRlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhcm4oJ1RyYW5zZm9ybWVyIHNob3VsZCBiZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgbW9kaWZ5KClgIG1ldGhvZCcpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IG11dGF0b3IgZnJvbSAnLi4vbXV0YXRvci9pbmRleCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgVHJhbnNsYXRlID0ge1xuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgb2YgdHJhbnNsYXRlIG9uIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0ICh2YWx1ZSkge1xuICAgICAgbGV0IHRyYW5zZm9ybSA9IG11dGF0b3IoR2xpZGUsIENvbXBvbmVudHMpLm11dGF0ZSh2YWx1ZSlcblxuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7LTEgKiB0cmFuc2Zvcm19cHgsIDBweCwgMHB4KWBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB2YWx1ZSBvZiB0cmFuc2xhdGUgZnJvbSBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZSAoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAnJ1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0U3RhcnRJbmRleCAoKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSBDb21wb25lbnRzLlNpemVzLmxlbmd0aFxuICAgICAgY29uc3QgaW5kZXggPSBHbGlkZS5pbmRleFxuICAgICAgY29uc3QgcGVyVmlldyA9IEdsaWRlLnNldHRpbmdzLnBlclZpZXdcblxuICAgICAgaWYgKENvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCc+JykgfHwgQ29tcG9uZW50cy5SdW4uaXNPZmZzZXQoJ3w+JykpIHtcbiAgICAgICAgcmV0dXJuIGxlbmd0aCArIChpbmRleCAtIHBlclZpZXcpXG4gICAgICB9XG5cbiAgICAgIC8vIFwibW9kdWxvIGxlbmd0aFwiIGNvbnZlcnRzIGFuIGluZGV4IHRoYXQgZXF1YWxzIGxlbmd0aCB0byB6ZXJvXG4gICAgICByZXR1cm4gKGluZGV4ICsgcGVyVmlldykgJSBsZW5ndGhcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldFRyYXZlbERpc3RhbmNlICgpIHtcbiAgICAgIGNvbnN0IHRyYXZlbERpc3RhbmNlID0gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICogR2xpZGUuc2V0dGluZ3MucGVyVmlld1xuXG4gICAgICBpZiAoQ29tcG9uZW50cy5SdW4uaXNPZmZzZXQoJz4nKSB8fCBDb21wb25lbnRzLlJ1bi5pc09mZnNldCgnfD4nKSkge1xuICAgICAgICAvLyByZXZlcnNlIHRyYXZlbCBkaXN0YW5jZSBzbyB0aGF0IHdlIGRvbid0IGhhdmUgdG8gY2hhbmdlIHN1YnRyYWN0IG9wZXJhdGlvbnNcbiAgICAgICAgcmV0dXJuIHRyYXZlbERpc3RhbmNlICogLTFcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYXZlbERpc3RhbmNlXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgdHJhbnNsYXRlIHZhbHVlOlxuICAgKiAtIG9uIG1vdmUgdG8gcmVmbGVjdCBpbmRleCBjaGFuZ2VcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJIHRvIHJlZmxlY3QgcG9zc2libGUgY2hhbmdlcyBpbiBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oJ21vdmUnLCAoY29udGV4dCkgPT4ge1xuICAgIGlmICghR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpIHx8ICFDb21wb25lbnRzLlJ1bi5pc09mZnNldCgpKSB7XG4gICAgICByZXR1cm4gVHJhbnNsYXRlLnNldChjb250ZXh0Lm1vdmVtZW50KVxuICAgIH1cblxuICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcigoKSA9PiB7XG4gICAgICBFdmVudHMuZW1pdCgndHJhbnNsYXRlLmp1bXAnKVxuXG4gICAgICBUcmFuc2xhdGUuc2V0KENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCAqIEdsaWRlLmluZGV4KVxuICAgIH0pXG5cbiAgICBjb25zdCBzdGFydFdpZHRoID0gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICogQ29tcG9uZW50cy5UcmFuc2xhdGUuZ2V0U3RhcnRJbmRleCgpXG4gICAgcmV0dXJuIFRyYW5zbGF0ZS5zZXQoc3RhcnRXaWR0aCAtIENvbXBvbmVudHMuVHJhbnNsYXRlLmdldFRyYXZlbERpc3RhbmNlKCkpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0cmFuc2xhdGU6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIFRyYW5zbGF0ZS5yZW1vdmUoKVxuICB9KVxuXG4gIHJldHVybiBUcmFuc2xhdGVcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEhvbGRzIGluYWN0aXZpdHkgc3RhdHVzIG9mIHRyYW5zaXRpb24uXG4gICAqIFdoZW4gdHJ1ZSB0cmFuc2l0aW9uIGlzIG5vdCBhcHBsaWVkLlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGxldCBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgY29uc3QgVHJhbnNpdGlvbiA9IHtcbiAgICAvKipcbiAgICAgKiBDb21wb3NlcyBzdHJpbmcgb2YgdGhlIENTUyB0cmFuc2l0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGNvbXBvc2UgKHByb3BlcnR5KSB7XG4gICAgICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiBgJHtwcm9wZXJ0eX0gJHt0aGlzLmR1cmF0aW9ufW1zICR7c2V0dGluZ3MuYW5pbWF0aW9uVGltaW5nRnVuY31gXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBgJHtwcm9wZXJ0eX0gMG1zICR7c2V0dGluZ3MuYW5pbWF0aW9uVGltaW5nRnVuY31gXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgb2YgdHJhbnNpdGlvbiBvbiBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZz19IHByb3BlcnR5XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXQgKHByb3BlcnR5ID0gJ3RyYW5zZm9ybScpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSB0aGlzLmNvbXBvc2UocHJvcGVydHkpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdmFsdWUgb2YgdHJhbnNpdGlvbiBmcm9tIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlICgpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnJ1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSdW5zIGNhbGxiYWNrIGFmdGVyIGFuaW1hdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYWZ0ZXIgKGNhbGxiYWNrKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfSwgdGhpcy5kdXJhdGlvbilcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlIHRyYW5zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGVuYWJsZSAoKSB7XG4gICAgICBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgICAgIHRoaXMuc2V0KClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZSB0cmFuc2l0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBkaXNhYmxlICgpIHtcbiAgICAgIGRpc2FibGVkID0gdHJ1ZVxuXG4gICAgICB0aGlzLnNldCgpXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKFRyYW5zaXRpb24sICdkdXJhdGlvbicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGR1cmF0aW9uIG9mIHRoZSB0cmFuc2l0aW9uIGJhc2VkXG4gICAgICogb24gY3VycmVudGx5IHJ1bm5pbmcgYW5pbWF0aW9uIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgIGlmIChHbGlkZS5pc1R5cGUoJ3NsaWRlcicpICYmIENvbXBvbmVudHMuUnVuLm9mZnNldCkge1xuICAgICAgICByZXR1cm4gc2V0dGluZ3MucmV3aW5kRHVyYXRpb25cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNldHRpbmdzLmFuaW1hdGlvbkR1cmF0aW9uXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBTZXQgdHJhbnNpdGlvbiBgc3R5bGVgIHZhbHVlOlxuICAgKiAtIG9uIGVhY2ggbW92aW5nLCBiZWNhdXNlIGl0IG1heSBiZSBjbGVhcmVkIGJ5IG9mZnNldCBtb3ZlXG4gICAqL1xuICBFdmVudHMub24oJ21vdmUnLCAoKSA9PiB7XG4gICAgVHJhbnNpdGlvbi5zZXQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIHRyYW5zaXRpb246XG4gICAqIC0gYmVmb3JlIGluaXRpYWwgYnVpbGQgdG8gYXZvaWQgdHJhbnNpdGlvbmluZyBmcm9tIGAwYCB0byBgc3RhcnRBdGAgaW5kZXhcbiAgICogLSB3aGlsZSByZXNpemluZyB3aW5kb3cgYW5kIHJlY2FsY3VsYXRpbmcgZGltZW50aW9uc1xuICAgKiAtIG9uIGp1bXBpbmcgZnJvbSBvZmZzZXQgdHJhbnNpdGlvbiBhdCBzdGFydCBhbmQgZW5kIGVkZ2VzIGluIGBjYXJvdXNlbGAgdHlwZVxuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYmVmb3JlJywgJ3Jlc2l6ZScsICd0cmFuc2xhdGUuanVtcCddLCAoKSA9PiB7XG4gICAgVHJhbnNpdGlvbi5kaXNhYmxlKClcbiAgfSlcblxuICAvKipcbiAgICogRW5hYmxlIHRyYW5zaXRpb246XG4gICAqIC0gb24gZWFjaCBydW5uaW5nLCBiZWNhdXNlIGl0IG1heSBiZSBkaXNhYmxlZCBieSBvZmZzZXQgbW92ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdydW4nLCAoKSA9PiB7XG4gICAgVHJhbnNpdGlvbi5lbmFibGUoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdHJhbnNpdGlvbjpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgVHJhbnNpdGlvbi5yZW1vdmUoKVxuICB9KVxuXG4gIHJldHVybiBUcmFuc2l0aW9uXG59XG4iLCIvKipcbiAqIFRlc3QgdmlhIGEgZ2V0dGVyIGluIHRoZSBvcHRpb25zIG9iamVjdCB0byBzZWVcbiAqIGlmIHRoZSBwYXNzaXZlIHByb3BlcnR5IGlzIGFjY2Vzc2VkLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL1dJQ0cvRXZlbnRMaXN0ZW5lck9wdGlvbnMvYmxvYi9naC1wYWdlcy9leHBsYWluZXIubWQjZmVhdHVyZS1kZXRlY3Rpb25cbiAqL1xuXG5sZXQgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2VcblxudHJ5IHtcbiAgbGV0IG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgIGdldCAoKSB7XG4gICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlXG4gICAgfVxuICB9KVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0UGFzc2l2ZScsIG51bGwsIG9wdHMpXG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0ZXN0UGFzc2l2ZScsIG51bGwsIG9wdHMpXG59IGNhdGNoIChlKSB7fVxuXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0c1Bhc3NpdmVcbiIsImltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnLi4vdXRpbHMvd2FpdCdcbmltcG9ydCB7IHRvSW50LCB0b0Zsb2F0IH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcbmltcG9ydCBzdXBwb3J0c1Bhc3NpdmUgZnJvbSAnLi4vdXRpbHMvZGV0ZWN0LXBhc3NpdmUtZXZlbnQnXG5cbmltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5jb25zdCBTVEFSVF9FVkVOVFMgPSBbJ3RvdWNoc3RhcnQnLCAnbW91c2Vkb3duJ11cbmNvbnN0IE1PVkVfRVZFTlRTID0gWyd0b3VjaG1vdmUnLCAnbW91c2Vtb3ZlJ11cbmNvbnN0IEVORF9FVkVOVFMgPSBbJ3RvdWNoZW5kJywgJ3RvdWNoY2FuY2VsJywgJ21vdXNldXAnLCAnbW91c2VsZWF2ZSddXG5jb25zdCBNT1VTRV9FVkVOVFMgPSBbJ21vdXNlZG93bicsICdtb3VzZW1vdmUnLCAnbW91c2V1cCcsICdtb3VzZWxlYXZlJ11cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICBsZXQgc3dpcGVTaW4gPSAwXG4gIGxldCBzd2lwZVN0YXJ0WCA9IDBcbiAgbGV0IHN3aXBlU3RhcnRZID0gMFxuICBsZXQgZGlzYWJsZWQgPSBmYWxzZVxuICBsZXQgY2FwdHVyZSA9IChzdXBwb3J0c1Bhc3NpdmUpID8geyBwYXNzaXZlOiB0cnVlIH0gOiBmYWxzZVxuXG4gIGNvbnN0IFN3aXBlID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHN3aXBlIGJpbmRpbmdzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLmJpbmRTd2lwZVN0YXJ0KClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgYHN3aXBlc3RhcnRgIGV2ZW50LiBDYWxjdWxhdGVzIGVudHJ5IHBvaW50cyBvZiB0aGUgdXNlcidzIHRhcC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc3RhcnQgKGV2ZW50KSB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmICFHbGlkZS5kaXNhYmxlZCkge1xuICAgICAgICB0aGlzLmRpc2FibGUoKVxuXG4gICAgICAgIGxldCBzd2lwZSA9IHRoaXMudG91Y2hlcyhldmVudClcblxuICAgICAgICBzd2lwZVNpbiA9IG51bGxcbiAgICAgICAgc3dpcGVTdGFydFggPSB0b0ludChzd2lwZS5wYWdlWClcbiAgICAgICAgc3dpcGVTdGFydFkgPSB0b0ludChzd2lwZS5wYWdlWSlcblxuICAgICAgICB0aGlzLmJpbmRTd2lwZU1vdmUoKVxuICAgICAgICB0aGlzLmJpbmRTd2lwZUVuZCgpXG5cbiAgICAgICAgRXZlbnRzLmVtaXQoJ3N3aXBlLnN0YXJ0JylcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgYHN3aXBlbW92ZWAgZXZlbnQuIENhbGN1bGF0ZXMgdXNlcidzIHRhcCBhbmdsZSBhbmQgZGlzdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBtb3ZlIChldmVudCkge1xuICAgICAgaWYgKCFHbGlkZS5kaXNhYmxlZCkge1xuICAgICAgICBsZXQgeyB0b3VjaEFuZ2xlLCB0b3VjaFJhdGlvLCBjbGFzc2VzIH0gPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICAgIGxldCBzd2lwZSA9IHRoaXMudG91Y2hlcyhldmVudClcblxuICAgICAgICBsZXQgc3ViRXhTeCA9IHRvSW50KHN3aXBlLnBhZ2VYKSAtIHN3aXBlU3RhcnRYXG4gICAgICAgIGxldCBzdWJFeVN5ID0gdG9JbnQoc3dpcGUucGFnZVkpIC0gc3dpcGVTdGFydFlcbiAgICAgICAgbGV0IHBvd0VYID0gTWF0aC5hYnMoc3ViRXhTeCA8PCAyKVxuICAgICAgICBsZXQgcG93RVkgPSBNYXRoLmFicyhzdWJFeVN5IDw8IDIpXG4gICAgICAgIGxldCBzd2lwZUh5cG90ZW51c2UgPSBNYXRoLnNxcnQocG93RVggKyBwb3dFWSlcbiAgICAgICAgbGV0IHN3aXBlQ2F0aGV0dXMgPSBNYXRoLnNxcnQocG93RVkpXG5cbiAgICAgICAgc3dpcGVTaW4gPSBNYXRoLmFzaW4oc3dpcGVDYXRoZXR1cyAvIHN3aXBlSHlwb3RlbnVzZSlcblxuICAgICAgICBpZiAoc3dpcGVTaW4gKiAxODAgLyBNYXRoLlBJIDwgdG91Y2hBbmdsZSkge1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgICBDb21wb25lbnRzLk1vdmUubWFrZShzdWJFeFN4ICogdG9GbG9hdCh0b3VjaFJhdGlvKSlcblxuICAgICAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5kcmFnZ2luZylcblxuICAgICAgICAgIEV2ZW50cy5lbWl0KCdzd2lwZS5tb3ZlJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBgc3dpcGVlbmRgIGV2ZW50LiBGaW5pdGlhbGl6ZXMgdXNlcidzIHRhcCBhbmQgZGVjaWRlcyBhYm91dCBnbGlkZSBtb3ZlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBlbmQgKGV2ZW50KSB7XG4gICAgICBpZiAoIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgICAgbGV0IHN3aXBlID0gdGhpcy50b3VjaGVzKGV2ZW50KVxuICAgICAgICBsZXQgdGhyZXNob2xkID0gdGhpcy50aHJlc2hvbGQoZXZlbnQpXG5cbiAgICAgICAgbGV0IHN3aXBlRGlzdGFuY2UgPSBzd2lwZS5wYWdlWCAtIHN3aXBlU3RhcnRYXG4gICAgICAgIGxldCBzd2lwZURlZyA9IHN3aXBlU2luICogMTgwIC8gTWF0aC5QSVxuICAgICAgICBsZXQgc3RlcHMgPSBNYXRoLnJvdW5kKHN3aXBlRGlzdGFuY2UgLyBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGgpXG5cbiAgICAgICAgdGhpcy5lbmFibGUoKVxuXG4gICAgICAgIGlmIChzd2lwZURpc3RhbmNlID4gdGhyZXNob2xkICYmIHN3aXBlRGVnIDwgc2V0dGluZ3MudG91Y2hBbmdsZSkge1xuICAgICAgICAgIC8vIFdoaWxlIHN3aXBlIGlzIHBvc2l0aXZlIGFuZCBncmVhdGVyIHRoYW4gdGhyZXNob2xkIG1vdmUgYmFja3dhcmQuXG4gICAgICAgICAgaWYgKHNldHRpbmdzLnBlclRvdWNoKSB7XG4gICAgICAgICAgICBzdGVwcyA9IE1hdGgubWluKHN0ZXBzLCB0b0ludChzZXR0aW5ncy5wZXJUb3VjaCkpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICAgICAgc3RlcHMgPSAtc3RlcHNcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKENvbXBvbmVudHMuRGlyZWN0aW9uLnJlc29sdmUoYDwke3N0ZXBzfWApKVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHN3aXBlRGlzdGFuY2UgPCAtdGhyZXNob2xkICYmXG4gICAgICAgICAgc3dpcGVEZWcgPCBzZXR0aW5ncy50b3VjaEFuZ2xlXG4gICAgICAgICkge1xuICAgICAgICAgIC8vIFdoaWxlIHN3aXBlIGlzIG5lZ2F0aXZlIGFuZCBsb3dlciB0aGFuIG5lZ2F0aXZlIHRocmVzaG9sZCBtb3ZlIGZvcndhcmQuXG4gICAgICAgICAgaWYgKHNldHRpbmdzLnBlclRvdWNoKSB7XG4gICAgICAgICAgICBzdGVwcyA9IE1hdGgubWF4KHN0ZXBzLCAtdG9JbnQoc2V0dGluZ3MucGVyVG91Y2gpKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChDb21wb25lbnRzLkRpcmVjdGlvbi5pcygncnRsJykpIHtcbiAgICAgICAgICAgIHN0ZXBzID0gLXN0ZXBzXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKGA+JHtzdGVwc31gKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBXaGlsZSBzd2lwZSBkb24ndCByZWFjaCBkaXN0YW5jZSBhcHBseSBwcmV2aW91cyB0cmFuc2Zvcm0uXG4gICAgICAgICAgQ29tcG9uZW50cy5Nb3ZlLm1ha2UoKVxuICAgICAgICB9XG5cbiAgICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LnJlbW92ZShzZXR0aW5ncy5jbGFzc2VzLmRyYWdnaW5nKVxuXG4gICAgICAgIHRoaXMudW5iaW5kU3dpcGVNb3ZlKClcbiAgICAgICAgdGhpcy51bmJpbmRTd2lwZUVuZCgpXG5cbiAgICAgICAgRXZlbnRzLmVtaXQoJ3N3aXBlLmVuZCcpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIHN3aXBlJ3Mgc3RhcnRpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmRTd2lwZVN0YXJ0ICgpIHtcbiAgICAgIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgIGlmIChzZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xuICAgICAgICBCaW5kZXIub24oU1RBUlRfRVZFTlRTWzBdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGFydChldmVudClcbiAgICAgICAgfSwgY2FwdHVyZSlcbiAgICAgIH1cblxuICAgICAgaWYgKHNldHRpbmdzLmRyYWdUaHJlc2hvbGQpIHtcbiAgICAgICAgQmluZGVyLm9uKFNUQVJUX0VWRU5UU1sxXSwgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIChldmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhcnQoZXZlbnQpXG4gICAgICAgIH0sIGNhcHR1cmUpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgc3dpcGUncyBzdGFydGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kU3dpcGVTdGFydCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKFNUQVJUX0VWRU5UU1swXSwgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIGNhcHR1cmUpXG4gICAgICBCaW5kZXIub2ZmKFNUQVJUX0VWRU5UU1sxXSwgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIGNhcHR1cmUpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIHN3aXBlJ3MgbW92aW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kU3dpcGVNb3ZlICgpIHtcbiAgICAgIEJpbmRlci5vbihNT1ZFX0VWRU5UUywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIHRocm90dGxlKChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLm1vdmUoZXZlbnQpXG4gICAgICB9LCBHbGlkZS5zZXR0aW5ncy50aHJvdHRsZSksIGNhcHR1cmUpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgc3dpcGUncyBtb3ZpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZFN3aXBlTW92ZSAoKSB7XG4gICAgICBCaW5kZXIub2ZmKE1PVkVfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgY2FwdHVyZSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBlbmRpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmRTd2lwZUVuZCAoKSB7XG4gICAgICBCaW5kZXIub24oRU5EX0VWRU5UUywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmVuZChldmVudClcbiAgICAgIH0pXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgc3dpcGUncyBlbmRpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZFN3aXBlRW5kICgpIHtcbiAgICAgIEJpbmRlci5vZmYoRU5EX0VWRU5UUywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZXMgZXZlbnQgdG91Y2hlcyBwb2ludHMgYWNjb3J0aW5nIHRvIGRpZmZlcmVudCB0eXBlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIHRvdWNoZXMgKGV2ZW50KSB7XG4gICAgICBpZiAoTU9VU0VfRVZFTlRTLmluZGV4T2YoZXZlbnQudHlwZSkgPiAtMSkge1xuICAgICAgICByZXR1cm4gZXZlbnRcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV2ZW50LnRvdWNoZXNbMF0gfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiBtaW5pbXVtIHN3aXBlIGRpc3RhbmNlIHNldHRpbmdzIGJhc2VkIG9uIGV2ZW50IHR5cGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgdGhyZXNob2xkIChldmVudCkge1xuICAgICAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgaWYgKE1PVVNFX0VWRU5UUy5pbmRleE9mKGV2ZW50LnR5cGUpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzLmRyYWdUaHJlc2hvbGRcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNldHRpbmdzLnN3aXBlVGhyZXNob2xkXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgc3dpcGUgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzZWxmfVxuICAgICAqL1xuICAgIGVuYWJsZSAoKSB7XG4gICAgICBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5lbmFibGUoKVxuXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyBzd2lwZSBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3NlbGZ9XG4gICAgICovXG4gICAgZGlzYWJsZSAoKSB7XG4gICAgICBkaXNhYmxlZCA9IHRydWVcblxuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmRpc2FibGUoKVxuXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY29tcG9uZW50IGNsYXNzOlxuICAgKiAtIGFmdGVyIGluaXRpYWwgYnVpbGRpbmdcbiAgICovXG4gIEV2ZW50cy5vbignYnVpbGQuYWZ0ZXInLCAoKSA9PiB7XG4gICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LmFkZChHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLnN3aXBlYWJsZSlcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3ZlIHN3aXBpbmcgYmluZGluZ3M6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gcmVtb3ZlIGFkZGVkIEV2ZW50TGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgU3dpcGUudW5iaW5kU3dpcGVTdGFydCgpXG4gICAgU3dpcGUudW5iaW5kU3dpcGVNb3ZlKClcbiAgICBTd2lwZS51bmJpbmRTd2lwZUVuZCgpXG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBTd2lwZVxufVxuIiwiaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgY29uc3QgSW1hZ2VzID0ge1xuICAgIC8qKlxuICAgICAqIEJpbmRzIGxpc3RlbmVyIHRvIGdsaWRlIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuYmluZCgpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIGBkcmFnc3RhcnRgIGV2ZW50IG9uIHdyYXBwZXIgdG8gcHJldmVudCBkcmFnZ2luZyBpbWFnZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQgKCkge1xuICAgICAgQmluZGVyLm9uKCdkcmFnc3RhcnQnLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgdGhpcy5kcmFnc3RhcnQpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgYGRyYWdzdGFydGAgZXZlbnQgb24gd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kICgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ2RyYWdzdGFydCcsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyLiBQcmV2ZW50cyBkcmFnZ2luZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZHJhZ3N0YXJ0IChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgZnJvbSBpbWFnZXM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gcmVtb3ZlIGFkZGVkIEV2ZW50TGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgSW1hZ2VzLnVuYmluZCgpXG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBJbWFnZXNcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcblxuaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgLyoqXG4gICAqIEhvbGRzIGRldGFjaGluZyBzdGF0dXMgb2YgYW5jaG9ycy5cbiAgICogUHJldmVudHMgZGV0YWNoaW5nIG9mIGFscmVhZHkgZGV0YWNoZWQgYW5jaG9ycy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBsZXQgZGV0YWNoZWQgPSBmYWxzZVxuXG4gIC8qKlxuICAgKiBIb2xkcyBwcmV2ZW50aW5nIHN0YXR1cyBvZiBhbmNob3JzLlxuICAgKiBJZiBgdHJ1ZWAgcmVkaXJlY3Rpb24gYWZ0ZXIgY2xpY2sgd2lsbCBiZSBkaXNhYmxlZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBsZXQgcHJldmVudGVkID0gZmFsc2VcblxuICBjb25zdCBBbmNob3JzID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwcyBhIGluaXRpYWwgc3RhdGUgb2YgYW5jaG9ycyBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICAvKipcbiAgICAgICAqIEhvbGRzIGNvbGxlY3Rpb24gb2YgYW5jaG9ycyBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0hUTUxDb2xsZWN0aW9ufVxuICAgICAgICovXG4gICAgICB0aGlzLl9hID0gQ29tcG9uZW50cy5IdG1sLndyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnYScpXG5cbiAgICAgIHRoaXMuYmluZCgpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIGV2ZW50cyB0byBhbmNob3JzIGluc2lkZSBhIHRyYWNrLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kICgpIHtcbiAgICAgIEJpbmRlci5vbignY2xpY2snLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgdGhpcy5jbGljaylcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBldmVudHMgYXR0YWNoZWQgdG8gYW5jaG9ycyBpbnNpZGUgYSB0cmFjay5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kICgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ2NsaWNrJywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LiBQcmV2ZW50cyBjbGlja3Mgd2hlbiBnbGlkZSBpcyBpbiBgcHJldmVudGAgc3RhdHVzLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgY2xpY2sgKGV2ZW50KSB7XG4gICAgICBpZiAocHJldmVudGVkKSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgYW5jaG9ycyBjbGljayBldmVudCBpbnNpZGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzZWxmfVxuICAgICAqL1xuICAgIGRldGFjaCAoKSB7XG4gICAgICBwcmV2ZW50ZWQgPSB0cnVlXG5cbiAgICAgIGlmICghZGV0YWNoZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5kcmFnZ2FibGUgPSBmYWxzZVxuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAnZGF0YS1ocmVmJyxcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZ2V0QXR0cmlidXRlKCdocmVmJylcbiAgICAgICAgICApXG5cbiAgICAgICAgICB0aGlzLml0ZW1zW2ldLnJlbW92ZUF0dHJpYnV0ZSgnaHJlZicpXG4gICAgICAgIH1cblxuICAgICAgICBkZXRhY2hlZCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgYW5jaG9ycyBjbGljayBldmVudHMgaW5zaWRlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBhdHRhY2ggKCkge1xuICAgICAgcHJldmVudGVkID0gZmFsc2VcblxuICAgICAgaWYgKGRldGFjaGVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZHJhZ2dhYmxlID0gdHJ1ZVxuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAnaHJlZicsXG4gICAgICAgICAgICB0aGlzLml0ZW1zW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1ocmVmJylcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBkZXRhY2hlZCA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKEFuY2hvcnMsICdpdGVtcycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGNvbGxlY3Rpb24gb2YgdGhlIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIEFuY2hvcnMuX2FcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIERldGFjaCBhbmNob3JzIGluc2lkZSBzbGlkZXM6XG4gICAqIC0gb24gc3dpcGluZywgc28gdGhleSB3b24ndCByZWRpcmVjdCB0byBpdHMgYGhyZWZgIGF0dHJpYnV0ZXNcbiAgICovXG4gIEV2ZW50cy5vbignc3dpcGUubW92ZScsICgpID0+IHtcbiAgICBBbmNob3JzLmRldGFjaCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbmNob3JzIGluc2lkZSBzbGlkZXM6XG4gICAqIC0gYWZ0ZXIgc3dpcGluZyBhbmQgdHJhbnNpdGlvbnMgZW5kcywgc28gdGhleSBjYW4gcmVkaXJlY3QgYWZ0ZXIgY2xpY2sgYWdhaW5cbiAgICovXG4gIEV2ZW50cy5vbignc3dpcGUuZW5kJywgKCkgPT4ge1xuICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcigoKSA9PiB7XG4gICAgICBBbmNob3JzLmF0dGFjaCgpXG4gICAgfSlcbiAgfSlcblxuICAvKipcbiAgICogVW5iaW5kIGFuY2hvcnMgaW5zaWRlIHNsaWRlczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBhbmNob3JzIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgQW5jaG9ycy5hdHRhY2goKVxuICAgIEFuY2hvcnMudW5iaW5kKClcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIEFuY2hvcnNcbn1cbiIsImltcG9ydCB7IHNpYmxpbmdzIH0gZnJvbSAnLi4vdXRpbHMvZG9tJ1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHN1cHBvcnRzUGFzc2l2ZSBmcm9tICcuLi91dGlscy9kZXRlY3QtcGFzc2l2ZS1ldmVudCdcblxuaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmNvbnN0IE5BVl9TRUxFQ1RPUiA9ICdbZGF0YS1nbGlkZS1lbD1cImNvbnRyb2xzW25hdl1cIl0nXG5jb25zdCBDT05UUk9MU19TRUxFQ1RPUiA9ICdbZGF0YS1nbGlkZS1lbF49XCJjb250cm9sc1wiXSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICBsZXQgY2FwdHVyZSA9IChzdXBwb3J0c1Bhc3NpdmUpID8geyBwYXNzaXZlOiB0cnVlIH0gOiBmYWxzZVxuXG4gIGNvbnN0IENvbnRyb2xzID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRzIGFycm93cy4gQmluZHMgZXZlbnRzIGxpc3RlbmVyc1xuICAgICAqIHRvIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgLyoqXG4gICAgICAgKiBDb2xsZWN0aW9uIG9mIG5hdmlnYXRpb24gSFRNTCBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0hUTUxDb2xsZWN0aW9ufVxuICAgICAgICovXG4gICAgICB0aGlzLl9uID0gQ29tcG9uZW50cy5IdG1sLnJvb3QucXVlcnlTZWxlY3RvckFsbChOQVZfU0VMRUNUT1IpXG5cbiAgICAgIC8qKlxuICAgICAgICogQ29sbGVjdGlvbiBvZiBjb250cm9scyBIVE1MIGVsZW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwcml2YXRlXG4gICAgICAgKiBAdHlwZSB7SFRNTENvbGxlY3Rpb259XG4gICAgICAgKi9cbiAgICAgIHRoaXMuX2MgPSBDb21wb25lbnRzLkh0bWwucm9vdC5xdWVyeVNlbGVjdG9yQWxsKENPTlRST0xTX1NFTEVDVE9SKVxuXG4gICAgICB0aGlzLmFkZEJpbmRpbmdzKClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0QWN0aXZlICgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmFkZENsYXNzKHRoaXMuX25baV0uY2hpbGRyZW4pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUFjdGl2ZSAoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyh0aGlzLl9uW2ldLmNoaWxkcmVuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIGFjdGl2ZSBjbGFzcyBvbiBpdGVtcyBpbnNpZGUgbmF2aWdhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBjb250cm9sc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYWRkQ2xhc3MgKGNvbnRyb2xzKSB7XG4gICAgICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuICAgICAgbGV0IGl0ZW0gPSBjb250cm9sc1tHbGlkZS5pbmRleF1cblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKHNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KVxuXG4gICAgICAgIHNpYmxpbmdzKGl0ZW0pLmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICAgICAgc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKHNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFjdGl2ZSBjbGFzcyBmcm9tIGFjdGl2ZSBjb250cm9sLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGNvbnRyb2xzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVDbGFzcyAoY29udHJvbHMpIHtcbiAgICAgIGxldCBpdGVtID0gY29udHJvbHNbR2xpZGUuaW5kZXhdXG5cbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmFjdGl2ZU5hdilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBoYW5kbGVzIHRvIHRoZSBlYWNoIGdyb3VwIG9mIGNvbnRyb2xzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZGRCaW5kaW5ncyAoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5iaW5kKHRoaXMuX2NbaV0uY2hpbGRyZW4pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgaGFuZGxlcyBmcm9tIHRoZSBlYWNoIGdyb3VwIG9mIGNvbnRyb2xzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVCaW5kaW5ncyAoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy51bmJpbmQodGhpcy5fY1tpXS5jaGlsZHJlbilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgZXZlbnRzIHRvIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gZWxlbWVudHNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQgKGVsZW1lbnRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIEJpbmRlci5vbignY2xpY2snLCBlbGVtZW50c1tpXSwgdGhpcy5jbGljaylcbiAgICAgICAgQmluZGVyLm9uKCd0b3VjaHN0YXJ0JywgZWxlbWVudHNbaV0sIHRoaXMuY2xpY2ssIGNhcHR1cmUpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgZXZlbnRzIGJpbmRlZCB0byB0aGUgYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBlbGVtZW50c1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kIChlbGVtZW50cykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBCaW5kZXIub2ZmKFsnY2xpY2snLCAndG91Y2hzdGFydCddLCBlbGVtZW50c1tpXSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBgY2xpY2tgIGV2ZW50IG9uIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKiBNb3ZlcyBzbGlkZXIgaW4gZHJpZWN0aW9uIHByZWNpc2VkIGluXG4gICAgICogYGRhdGEtZ2xpZGUtZGlyYCBhdHRyaWJ1dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGNsaWNrIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKENvbXBvbmVudHMuRGlyZWN0aW9uLnJlc29sdmUoZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2xpZGUtZGlyJykpKVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShDb250cm9scywgJ2l0ZW1zJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgY29sbGVjdGlvbiBvZiB0aGUgY29udHJvbHMgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBDb250cm9scy5fY1xuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogU3dhcCBhY3RpdmUgY2xhc3Mgb2YgY3VycmVudCBuYXZpZ2F0aW9uIGl0ZW06XG4gICAqIC0gYWZ0ZXIgbW91bnRpbmcgdG8gc2V0IGl0IHRvIGluaXRpYWwgaW5kZXhcbiAgICogLSBhZnRlciBlYWNoIG1vdmUgdG8gdGhlIG5ldyBpbmRleFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnbW91bnQuYWZ0ZXInLCAnbW92ZS5hZnRlciddLCAoKSA9PiB7XG4gICAgQ29udHJvbHMuc2V0QWN0aXZlKClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGFuZCBIVE1MIENsYXNzZXM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgQ29udHJvbHMucmVtb3ZlQmluZGluZ3MoKVxuICAgIENvbnRyb2xzLnJlbW92ZUFjdGl2ZSgpXG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBDb250cm9sc1xufVxuIiwiaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgY29uc3QgS2V5Ym9hcmQgPSB7XG4gICAgLyoqXG4gICAgICogQmluZHMga2V5Ym9hcmQgZXZlbnRzIG9uIGNvbXBvbmVudCBtb3VudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmtleWJvYXJkKSB7XG4gICAgICAgIHRoaXMuYmluZCgpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZHMga2V5Ym9hcmQgcHJlc3MgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kICgpIHtcbiAgICAgIEJpbmRlci5vbigna2V5dXAnLCBkb2N1bWVudCwgdGhpcy5wcmVzcylcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBrZXlib2FyZCBwcmVzcyBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKCdrZXl1cCcsIGRvY3VtZW50KVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGtleWJvYXJkJ3MgYXJyb3dzIHByZXNzIGFuZCBtb3ZpbmcgZ2xpZGUgZm93YXJkIGFuZCBiYWNrd2FyZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHByZXNzIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5KSB7XG4gICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZSgnPicpKVxuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcpIHtcbiAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc8JykpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBiaW5kaW5ncyBmcm9tIGtleWJvYXJkOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gcmVtb3ZlIGFkZGVkIGV2ZW50c1xuICAgKiAtIG9uIHVwZGF0aW5nIHRvIHJlbW92ZSBldmVudHMgYmVmb3JlIHJlbW91bnRpbmdcbiAgICovXG4gIEV2ZW50cy5vbihbJ2Rlc3Ryb3knLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBLZXlib2FyZC51bmJpbmQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdW50IGNvbXBvbmVudFxuICAgKiAtIG9uIHVwZGF0aW5nIHRvIHJlZmxlY3QgcG90ZW50aWFsIGNoYW5nZXMgaW4gc2V0dGluZ3NcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgKCkgPT4ge1xuICAgIEtleWJvYXJkLm1vdW50KClcbiAgfSlcblxuICAvKipcbiAgICogRGVzdHJveSBiaW5kZXI6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byByZW1vdmUgbGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBLZXlib2FyZFxufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHsgdG9JbnQsIGlzVW5kZWZpbmVkIH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgY29uc3QgQXV0b3BsYXkgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYXV0b3BsYXlpbmcgYW5kIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5zdGFydCgpXG5cbiAgICAgIGlmIChHbGlkZS5zZXR0aW5ncy5ob3ZlcnBhdXNlKSB7XG4gICAgICAgIHRoaXMuYmluZCgpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBhdXRvcGxheWluZyBpbiBjb25maWd1cmVkIGludGVydmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufE51bWJlcn0gZm9yY2UgUnVuIGF1dG9wbGF5aW5nIHdpdGggcGFzc2VkIGludGVydmFsIHJlZ2FyZGxlc3Mgb2YgYGF1dG9wbGF5YCBzZXR0aW5nc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc3RhcnQgKCkge1xuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmF1dG9wbGF5KSB7XG4gICAgICAgIGlmIChpc1VuZGVmaW5lZCh0aGlzLl9pKSkge1xuICAgICAgICAgIHRoaXMuX2kgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKVxuXG4gICAgICAgICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKCc+JylcblxuICAgICAgICAgICAgdGhpcy5zdGFydCgpXG4gICAgICAgICAgfSwgdGhpcy50aW1lKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3BzIGF1dG9ydW5uaW5nIG9mIHRoZSBnbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc3RvcCAoKSB7XG4gICAgICB0aGlzLl9pID0gY2xlYXJJbnRlcnZhbCh0aGlzLl9pKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhdXRvcGxheWluZyB3aGlsZSBtb3VzZSBpcyBvdmVyIGdsaWRlJ3MgYXJlYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZCAoKSB7XG4gICAgICBCaW5kZXIub24oJ21vdXNlb3ZlcicsIENvbXBvbmVudHMuSHRtbC5yb290LCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcCgpXG4gICAgICB9KVxuXG4gICAgICBCaW5kZXIub24oJ21vdXNlb3V0JywgQ29tcG9uZW50cy5IdG1sLnJvb3QsICgpID0+IHtcbiAgICAgICAgdGhpcy5zdGFydCgpXG4gICAgICB9KVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmQgbW91c2VvdmVyIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKFsnbW91c2VvdmVyJywgJ21vdXNlb3V0J10sIENvbXBvbmVudHMuSHRtbC5yb290KVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShBdXRvcGxheSwgJ3RpbWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB0aW1lIHBlcmlvZCB2YWx1ZSBmb3IgdGhlIGF1dG9wbGF5IGludGVydmFsLiBQcmlvcml0aXplc1xuICAgICAqIHRpbWVzIGluIGBkYXRhLWdsaWRlLWF1dG9wbGF5YCBhdHRydWJ1dGVzIG92ZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgbGV0IGF1dG9wbGF5ID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlc1tHbGlkZS5pbmRleF0uZ2V0QXR0cmlidXRlKCdkYXRhLWdsaWRlLWF1dG9wbGF5JylcblxuICAgICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICAgIHJldHVybiB0b0ludChhdXRvcGxheSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRvSW50KEdsaWRlLnNldHRpbmdzLmF1dG9wbGF5KVxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogU3RvcCBhdXRvcGxheWluZyBhbmQgdW5iaW5kIGV2ZW50czpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBjbGVhciBkZWZpbmVkIGludGVydmFsXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZXNldCBpbnRlcnZhbCB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgQXV0b3BsYXkudW5iaW5kKClcbiAgfSlcblxuICAvKipcbiAgICogU3RvcCBhdXRvcGxheWluZzpcbiAgICogLSBiZWZvcmUgZWFjaCBydW4sIHRvIHJlc3RhcnQgYXV0b3BsYXlpbmdcbiAgICogLSBvbiBwYXVzaW5nIHZpYSBBUElcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBjbGVhciBkZWZpbmVkIGludGVydmFsXG4gICAqIC0gd2hpbGUgc3RhcnRpbmcgYSBzd2lwZVxuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEkgdG8gcmVzZXQgaW50ZXJ2YWwgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKFsncnVuLmJlZm9yZScsICdwYXVzZScsICdkZXN0cm95JywgJ3N3aXBlLnN0YXJ0JywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgQXV0b3BsYXkuc3RvcCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFN0YXJ0IGF1dG9wbGF5aW5nOlxuICAgKiAtIGFmdGVyIGVhY2ggcnVuLCB0byByZXN0YXJ0IGF1dG9wbGF5aW5nXG4gICAqIC0gb24gcGxheWluZyB2aWEgQVBJXG4gICAqIC0gd2hpbGUgZW5kaW5nIGEgc3dpcGVcbiAgICovXG4gIEV2ZW50cy5vbihbJ3J1bi5hZnRlcicsICdwbGF5JywgJ3N3aXBlLmVuZCddLCAoKSA9PiB7XG4gICAgQXV0b3BsYXkuc3RhcnQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdW50IGF1dG9wbGF5aW5nOlxuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEkgdG8gcmVzZXQgaW50ZXJ2YWwgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgQXV0b3BsYXkubW91bnQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGEgYmluZGVyOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgZ2xpZGUgaW5zdGFuY2UgdG8gY2xlYXJ1cCBsaXN0ZW5lcnNcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIEF1dG9wbGF5XG59XG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICcuLi91dGlscy93YWl0J1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi91dGlscy91bml0J1xuaW1wb3J0IHsgc29ydEtleXMsIG1lcmdlT3B0aW9ucyB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcblxuaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbi8qKlxuICogU29ydHMga2V5cyBvZiBicmVha3BvaW50IG9iamVjdCBzbyB0aGV5IHdpbGwgYmUgb3JkZXJlZCBmcm9tIGxvd2VyIHRvIGJpZ2dlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnRzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBzb3J0QnJlYWtwb2ludHMgKHBvaW50cykge1xuICBpZiAoaXNPYmplY3QocG9pbnRzKSkge1xuICAgIHJldHVybiBzb3J0S2V5cyhwb2ludHMpXG4gIH0gZWxzZSB7XG4gICAgd2FybihgQnJlYWtwb2ludHMgb3B0aW9uIG11c3QgYmUgYW4gb2JqZWN0YClcbiAgfVxuXG4gIHJldHVybiB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIC8qKlxuICAgKiBIb2xkcyByZWZlcmVuY2UgdG8gc2V0dGluZ3MuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuXG4gIC8qKlxuICAgKiBIb2xkcyByZWZlcmVuY2UgdG8gYnJlYWtwb2ludHMgb2JqZWN0IGluIHNldHRpbmdzLiBTb3J0cyBicmVha3BvaW50c1xuICAgKiBmcm9tIHNtYWxsZXIgdG8gbGFyZ2VyLiBJdCBpcyByZXF1aXJlZCBpbiBvcmRlciB0byBwcm9wZXJcbiAgICogbWF0Y2hpbmcgY3VycmVudGx5IGFjdGl2ZSBicmVha3BvaW50IHNldHRpbmdzLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgbGV0IHBvaW50cyA9IHNvcnRCcmVha3BvaW50cyhzZXR0aW5ncy5icmVha3BvaW50cylcblxuICAvKipcbiAgICogQ2FjaGUgaW5pdGlhbCBzZXR0aW5ncyBiZWZvcmUgb3ZlcndyaXR0aW5nLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgbGV0IGRlZmF1bHRzID0gT2JqZWN0LmFzc2lnbih7fSwgc2V0dGluZ3MpXG5cbiAgY29uc3QgQnJlYWtwb2ludHMgPSB7XG4gICAgLyoqXG4gICAgICogTWF0Y2hlcyBzZXR0aW5ncyBmb3IgY3VycmVjdGx5IG1hdGNoaW5nIG1lZGlhIGJyZWFrcG9pbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcG9pbnRzXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBtYXRjaCAocG9pbnRzKSB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5tYXRjaE1lZGlhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBmb3IgKGxldCBwb2ludCBpbiBwb2ludHMpIHtcbiAgICAgICAgICBpZiAocG9pbnRzLmhhc093blByb3BlcnR5KHBvaW50KSkge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKGAobWF4LXdpZHRoOiAke3BvaW50fXB4KWApLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBvaW50c1twb2ludF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlZmF1bHRzXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJ3cml0ZSBpbnN0YW5jZSBzZXR0aW5ncyB3aXRoIGN1cnJlbnRseSBtYXRjaGluZyBicmVha3BvaW50IHNldHRpbmdzLlxuICAgKiBUaGlzIGhhcHBlbnMgcmlnaHQgYWZ0ZXIgY29tcG9uZW50IGluaXRpYWxpemF0aW9uLlxuICAgKi9cbiAgT2JqZWN0LmFzc2lnbihzZXR0aW5ncywgQnJlYWtwb2ludHMubWF0Y2gocG9pbnRzKSlcblxuICAvKipcbiAgICogVXBkYXRlIGdsaWRlIHdpdGggc2V0dGluZ3Mgb2YgbWF0Y2hlZCBicmVrcG9pbnQ6XG4gICAqIC0gd2luZG93IHJlc2l6ZSB0byB1cGRhdGUgc2xpZGVyXG4gICAqL1xuICBCaW5kZXIub24oJ3Jlc2l6ZScsIHdpbmRvdywgdGhyb3R0bGUoKCkgPT4ge1xuICAgIEdsaWRlLnNldHRpbmdzID0gbWVyZ2VPcHRpb25zKHNldHRpbmdzLCBCcmVha3BvaW50cy5tYXRjaChwb2ludHMpKVxuICB9LCBHbGlkZS5zZXR0aW5ncy50aHJvdHRsZSkpXG5cbiAgLyoqXG4gICAqIFJlc29ydCBhbmQgdXBkYXRlIGRlZmF1bHQgc2V0dGluZ3M6XG4gICAqIC0gb24gcmVpbml0IHZpYSBBUEksIHNvIGJyZWFrcG9pbnQgbWF0Y2hpbmcgd2lsbCBiZSBwZXJmb3JtZWQgd2l0aCBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsICgpID0+IHtcbiAgICBwb2ludHMgPSBzb3J0QnJlYWtwb2ludHMocG9pbnRzKVxuXG4gICAgZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKHt9LCBzZXR0aW5ncylcbiAgfSlcblxuICAvKipcbiAgICogVW5iaW5kIHJlc2l6ZSBsaXN0ZW5lcjpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBCaW5kZXIub2ZmKCdyZXNpemUnLCB3aW5kb3cpXG4gIH0pXG5cbiAgcmV0dXJuIEJyZWFrcG9pbnRzXG59XG4iLCJpbXBvcnQgQ29yZSBmcm9tICcuLi9zcmMvaW5kZXgnXG5cbmltcG9ydCBSdW4gZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvcnVuJ1xuaW1wb3J0IEdhcHMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvZ2FwcydcbmltcG9ydCBIdG1sIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2h0bWwnXG5pbXBvcnQgUGVlayBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9wZWVrJ1xuaW1wb3J0IE1vdmUgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvbW92ZSdcbmltcG9ydCBTaXplcyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9zaXplcydcbmltcG9ydCBCdWlsZCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9idWlsZCdcbmltcG9ydCBDbG9uZXMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvY2xvbmVzJ1xuaW1wb3J0IFJlc2l6ZSBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9yZXNpemUnXG5pbXBvcnQgRGlyZWN0aW9uIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2RpcmVjdGlvbidcbmltcG9ydCBUcmFuc2xhdGUgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvdHJhbnNsYXRlJ1xuaW1wb3J0IFRyYW5zaXRpb24gZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvdHJhbnNpdGlvbidcblxuaW1wb3J0IFN3aXBlIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3N3aXBlJ1xuaW1wb3J0IEltYWdlcyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9pbWFnZXMnXG5pbXBvcnQgQW5jaG9ycyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9hbmNob3JzJ1xuaW1wb3J0IENvbnRyb2xzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2NvbnRyb2xzJ1xuaW1wb3J0IEtleWJvYXJkIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2tleWJvYXJkJ1xuaW1wb3J0IEF1dG9wbGF5IGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2F1dG9wbGF5J1xuaW1wb3J0IEJyZWFrcG9pbnRzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2JyZWFrcG9pbnRzJ1xuXG5jb25zdCBDT01QT05FTlRTID0ge1xuICBIdG1sLFxuICBUcmFuc2xhdGUsXG4gIFRyYW5zaXRpb24sXG4gIERpcmVjdGlvbixcbiAgUGVlayxcbiAgU2l6ZXMsXG4gIEdhcHMsXG4gIE1vdmUsXG4gIENsb25lcyxcbiAgUmVzaXplLFxuICBCdWlsZCxcbiAgUnVuXG59XG5cbmV4cG9ydCB7XG4gIFN3aXBlLFxuICBJbWFnZXMsXG4gIEFuY2hvcnMsXG4gIENvbnRyb2xzLFxuICBLZXlib2FyZCxcbiAgQXV0b3BsYXksXG4gIEJyZWFrcG9pbnRzXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdsaWRlIGV4dGVuZHMgQ29yZSB7XG4gIG1vdW50IChleHRlbnNpb25zID0ge30pIHtcbiAgICByZXR1cm4gc3VwZXIubW91bnQoT2JqZWN0LmFzc2lnbih7fSwgQ09NUE9ORU5UUywgZXh0ZW5zaW9ucykpXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJ3YXJuIiwibXNnIiwiZXJyb3IiLCJ0b0ludCIsInZhbHVlIiwicGFyc2VJbnQiLCJ0b0Zsb2F0IiwicGFyc2VGbG9hdCIsImlzU3RyaW5nIiwiaXNPYmplY3QiLCJ0eXBlIiwiaXNOdW1iZXIiLCJpc0Z1bmN0aW9uIiwiaXNVbmRlZmluZWQiLCJpc0FycmF5IiwiY29uc3RydWN0b3IiLCJBcnJheSIsIm1vdW50IiwiZ2xpZGUiLCJleHRlbnNpb25zIiwiZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hbWUiLCJkZWZpbmUiLCJvYmoiLCJwcm9wIiwiZGVmaW5pdGlvbiIsImRlZmluZVByb3BlcnR5Iiwic29ydEtleXMiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsInJlZHVjZSIsInIiLCJrIiwibWVyZ2VPcHRpb25zIiwiZGVmYXVsdHMiLCJzZXR0aW5ncyIsIm9wdGlvbnMiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImhhc093blByb3BlcnR5IiwiY2xhc3NlcyIsImRpcmVjdGlvbiIsImJyZWFrcG9pbnRzIiwiRXZlbnRzQnVzIiwiaG9wIiwiZXZlbnQiLCJoYW5kbGVyIiwiaSIsImxlbmd0aCIsIm9uIiwiY2FsbCIsImluZGV4IiwicHVzaCIsImNvbnRleHQiLCJlbWl0IiwiZm9yRWFjaCIsIml0ZW0iLCJHbGlkZSIsInNlbGVjdG9yIiwiX2MiLCJfdCIsIl9lIiwiZGlzYWJsZWQiLCJzdGFydEF0IiwidHJhbnNmb3JtZXJzIiwicGF0dGVybiIsIlJ1biIsIm1ha2UiLCJkaXN0YW5jZSIsIlRyYW5zaXRpb24iLCJkaXNhYmxlIiwiTW92ZSIsImludGVydmFsIiwiYXV0b3BsYXkiLCJfbyIsIm8iLCJfaSIsIl9kIiwic3RhdHVzIiwiQ29tcG9uZW50cyIsIkV2ZW50cyIsIm1vdmUiLCJ3YWl0Rm9yVHJhbnNpdGlvbiIsImNhbGN1bGF0ZSIsImFmdGVyIiwiaXNTdGFydCIsImlzRW5kIiwiaXNPZmZzZXQiLCJlbmFibGUiLCJzdGVwcyIsInZpZXdTaXplIiwiY291bnRhYmxlU3RlcHMiLCJwZXJWaWV3IiwiY2FsY3VsYXRlRm9yd2FyZEluZGV4Iiwibm9ybWFsaXplRm9yd2FyZEluZGV4IiwiY2FsY3VsYXRlQmFja3dhcmRJbmRleCIsIm5vcm1hbGl6ZUJhY2t3YXJkSW5kZXgiLCJ1bmRlZmluZWQiLCJpc1R5cGUiLCJmb2N1c0F0IiwiYm91bmQiLCJyZXdpbmQiLCJpc0JvdW5kIiwiTWF0aCIsImZsb29yIiwidmlldyIsImNlaWwiLCJfbSIsInN0ZXAiLCJzdWJzdHIiLCJIdG1sIiwic2xpZGVzIiwibm93IiwiRGF0ZSIsImdldFRpbWUiLCJ0aHJvdHRsZSIsImZ1bmMiLCJ3YWl0IiwidGltZW91dCIsImFyZ3MiLCJyZXN1bHQiLCJwcmV2aW91cyIsImxhdGVyIiwibGVhZGluZyIsImFwcGx5IiwidGhyb3R0bGVkIiwiYXQiLCJyZW1haW5pbmciLCJhcmd1bWVudHMiLCJ0cmFpbGluZyIsInNldFRpbWVvdXQiLCJjYW5jZWwiLCJNQVJHSU5fVFlQRSIsIkdhcHMiLCJsZW4iLCJzdHlsZSIsIkRpcmVjdGlvbiIsIm1hcmdpbkxlZnQiLCJtYXJnaW5SaWdodCIsImdhcCIsIlNpemVzIiwid3JhcHBlciIsImNoaWxkcmVuIiwicmVtb3ZlIiwic2libGluZ3MiLCJub2RlIiwicGFyZW50Tm9kZSIsIm4iLCJmaXJzdENoaWxkIiwibWF0Y2hlZCIsIm5leHRTaWJsaW5nIiwibm9kZVR5cGUiLCJleGlzdCIsIndpbmRvdyIsIkhUTUxFbGVtZW50IiwiVFJBQ0tfU0VMRUNUT1IiLCJyb290IiwidHJhY2siLCJxdWVyeVNlbGVjdG9yIiwicHJvdG90eXBlIiwic2xpY2UiLCJmaWx0ZXIiLCJzbGlkZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xvbmVTbGlkZSIsIl9yIiwiZG9jdW1lbnQiLCJ0IiwiUGVlayIsInBlZWsiLCJfdiIsImJlZm9yZSIsIm9mZnNldCIsInNsaWRlV2lkdGgiLCJ0cmFuc2xhdGUiLCJpcyIsIndpZHRoIiwid3JhcHBlclNpemUiLCJvZmZzZXRXaWR0aCIsImdyb3ciLCJDbG9uZXMiLCJyZWR1Y3RvciIsInNldHVwU2xpZGVzIiwic2V0dXBXcmFwcGVyIiwiQnVpbGQiLCJ0eXBlQ2xhc3MiLCJhY3RpdmVDbGFzcyIsImFkZCIsImFjdGl2ZVNsaWRlIiwic2libGluZyIsInJlbW92ZUNsYXNzZXMiLCJpdGVtcyIsImNvbGxlY3QiLCJwZWVrSW5jcmVtZW50ZXIiLCJjbG9uZUNvdW50Iiwicm91bmQiLCJhcHBlbmQiLCJyZXZlcnNlIiwicHJlcGVuZCIsIm1heCIsImNsb25lIiwiY2xvbmVOb2RlIiwidW5zaGlmdCIsImhhbGYiLCJhcHBlbmRDaGlsZCIsImluc2VydEJlZm9yZSIsInJlbW92ZUNoaWxkIiwiRXZlbnRzQmluZGVyIiwibGlzdGVuZXJzIiwiZWwiLCJjbG9zdXJlIiwiY2FwdHVyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiQmluZGVyIiwiUmVzaXplIiwiYmluZCIsIm9mZiIsInVuYmluZCIsImRlc3Ryb3kiLCJWQUxJRF9ESVJFQ1RJT05TIiwiRkxJUEVEX01PVkVNRU5UUyIsInRva2VuIiwic3BsaXQiLCJqb2luIiwiaW5kZXhPZiIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJtdWx0aXBsaWVyIiwiVFJBTlNGT1JNRVJTIiwiR2FwIiwiR3JvdyIsIlBlZWtpbmciLCJGb2N1c2luZyIsImNvbmNhdCIsIlJ0bCIsInRyYW5zZm9ybWVyIiwibW9kaWZ5IiwiVHJhbnNsYXRlIiwidHJhbnNmb3JtIiwibXV0YXRvciIsIm11dGF0ZSIsInRyYXZlbERpc3RhbmNlIiwic2V0IiwibW92ZW1lbnQiLCJzdGFydFdpZHRoIiwiZ2V0U3RhcnRJbmRleCIsImdldFRyYXZlbERpc3RhbmNlIiwicHJvcGVydHkiLCJkdXJhdGlvbiIsImFuaW1hdGlvblRpbWluZ0Z1bmMiLCJ0cmFuc2l0aW9uIiwiY29tcG9zZSIsImNhbGxiYWNrIiwicmV3aW5kRHVyYXRpb24iLCJhbmltYXRpb25EdXJhdGlvbiIsInN1cHBvcnRzUGFzc2l2ZSIsIm9wdHMiLCJlIiwiU1RBUlRfRVZFTlRTIiwiTU9WRV9FVkVOVFMiLCJFTkRfRVZFTlRTIiwiTU9VU0VfRVZFTlRTIiwic3dpcGVTaW4iLCJzd2lwZVN0YXJ0WCIsInN3aXBlU3RhcnRZIiwicGFzc2l2ZSIsIlN3aXBlIiwiYmluZFN3aXBlU3RhcnQiLCJzd2lwZSIsInRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwiYmluZFN3aXBlTW92ZSIsImJpbmRTd2lwZUVuZCIsInRvdWNoQW5nbGUiLCJ0b3VjaFJhdGlvIiwic3ViRXhTeCIsInN1YkV5U3kiLCJwb3dFWCIsImFicyIsInBvd0VZIiwic3dpcGVIeXBvdGVudXNlIiwic3FydCIsInN3aXBlQ2F0aGV0dXMiLCJhc2luIiwiUEkiLCJzdG9wUHJvcGFnYXRpb24iLCJkcmFnZ2luZyIsInRocmVzaG9sZCIsInN3aXBlRGlzdGFuY2UiLCJzd2lwZURlZyIsInBlclRvdWNoIiwibWluIiwicmVzb2x2ZSIsInVuYmluZFN3aXBlTW92ZSIsInVuYmluZFN3aXBlRW5kIiwic3dpcGVUaHJlc2hvbGQiLCJzdGFydCIsImRyYWdUaHJlc2hvbGQiLCJlbmQiLCJjaGFuZ2VkVG91Y2hlcyIsInN3aXBlYWJsZSIsInVuYmluZFN3aXBlU3RhcnQiLCJJbWFnZXMiLCJkcmFnc3RhcnQiLCJwcmV2ZW50RGVmYXVsdCIsImRldGFjaGVkIiwicHJldmVudGVkIiwiQW5jaG9ycyIsIl9hIiwicXVlcnlTZWxlY3RvckFsbCIsImNsaWNrIiwiZHJhZ2dhYmxlIiwic2V0QXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwiZGV0YWNoIiwiYXR0YWNoIiwiTkFWX1NFTEVDVE9SIiwiQ09OVFJPTFNfU0VMRUNUT1IiLCJDb250cm9scyIsIl9uIiwiYWRkQmluZGluZ3MiLCJjb250cm9scyIsImFjdGl2ZU5hdiIsImVsZW1lbnRzIiwiY3VycmVudFRhcmdldCIsInNldEFjdGl2ZSIsInJlbW92ZUJpbmRpbmdzIiwicmVtb3ZlQWN0aXZlIiwiS2V5Ym9hcmQiLCJrZXlib2FyZCIsInByZXNzIiwia2V5Q29kZSIsIkF1dG9wbGF5IiwiaG92ZXJwYXVzZSIsInNldEludGVydmFsIiwic3RvcCIsInRpbWUiLCJjbGVhckludGVydmFsIiwic29ydEJyZWFrcG9pbnRzIiwicG9pbnRzIiwiQnJlYWtwb2ludHMiLCJtYXRjaE1lZGlhIiwicG9pbnQiLCJtYXRjaGVzIiwibWF0Y2giLCJD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
