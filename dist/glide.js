/*!
 * Glide.js v3.3.0
 * (c) 2013-2019 Jędrzej Chałubek <jedrzej.chalubek@gmail.com> (http://jedrzejchalubek.com/)
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Glide = factory());
}(this, (function () { 'use strict';

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

  return Glide$1;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xpZGUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0cy5qcyIsIi4uL3NyYy91dGlscy9sb2cuanMiLCIuLi9zcmMvdXRpbHMvdW5pdC5qcyIsIi4uL3NyYy9jb3JlL2luZGV4LmpzIiwiLi4vc3JjL3V0aWxzL29iamVjdC5qcyIsIi4uL3NyYy9jb3JlL2V2ZW50L2V2ZW50cy1idXMuanMiLCIuLi9zcmMvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9ydW4uanMiLCIuLi9zcmMvdXRpbHMvdGltZS5qcyIsIi4uL3NyYy91dGlscy93YWl0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZ2Fwcy5qcyIsIi4uL3NyYy91dGlscy9kb20uanMiLCIuLi9zcmMvY29tcG9uZW50cy9odG1sLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcGVlay5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21vdmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9zaXplcy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2J1aWxkLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2xvbmVzLmpzIiwiLi4vc3JjL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3Jlc2l6ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2RpcmVjdGlvbi5qcyIsIi4uL3NyYy9tdXRhdG9yL3RyYW5zZm9ybWVycy9ydGwuanMiLCIuLi9zcmMvbXV0YXRvci90cmFuc2Zvcm1lcnMvZ2FwLmpzIiwiLi4vc3JjL211dGF0b3IvdHJhbnNmb3JtZXJzL2dyb3cuanMiLCIuLi9zcmMvbXV0YXRvci90cmFuc2Zvcm1lcnMvcGVla2luZy5qcyIsIi4uL3NyYy9tdXRhdG9yL3RyYW5zZm9ybWVycy9mb2N1c2luZy5qcyIsIi4uL3NyYy9tdXRhdG9yL2luZGV4LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvdHJhbnNsYXRlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvdHJhbnNpdGlvbi5qcyIsIi4uL3NyYy91dGlscy9kZXRlY3QtcGFzc2l2ZS1ldmVudC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3N3aXBlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW1hZ2VzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvYW5jaG9ycy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NvbnRyb2xzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMva2V5Ym9hcmQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9hdXRvcGxheS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2JyZWFrcG9pbnRzLmpzIiwiLi4vZW50cnkvZW50cnktY29tcGxldGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogVHlwZSBvZiB0aGUgbW92ZW1lbnQuXG4gICAqXG4gICAqIEF2YWlsYWJsZSB0eXBlczpcbiAgICogYHNsaWRlcmAgLSBSZXdpbmRzIHNsaWRlciB0byB0aGUgc3RhcnQvZW5kIHdoZW4gaXQgcmVhY2hlcyB0aGUgZmlyc3Qgb3IgbGFzdCBzbGlkZS5cbiAgICogYGNhcm91c2VsYCAtIENoYW5nZXMgc2xpZGVzIHdpdGhvdXQgc3RhcnRpbmcgb3ZlciB3aGVuIGl0IHJlYWNoZXMgdGhlIGZpcnN0IG9yIGxhc3Qgc2xpZGUuXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICB0eXBlOiAnc2xpZGVyJyxcblxuICAvKipcbiAgICogU3RhcnQgYXQgc3BlY2lmaWMgc2xpZGUgbnVtYmVyIGRlZmluZWQgd2l0aCB6ZXJvLWJhc2VkIGluZGV4LlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgc3RhcnRBdDogMCxcblxuICAvKipcbiAgICogQSBudW1iZXIgb2Ygc2xpZGVzIHZpc2libGUgb24gdGhlIHNpbmdsZSB2aWV3cG9ydC5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHBlclZpZXc6IDEsXG5cbiAgLyoqXG4gICAqIEZvY3VzIGN1cnJlbnRseSBhY3RpdmUgc2xpZGUgYXQgYSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhlIHRyYWNrLlxuICAgKlxuICAgKiBBdmFpbGFibGUgaW5wdXRzOlxuICAgKiBgY2VudGVyYCAtIEN1cnJlbnQgc2xpZGUgd2lsbCBiZSBhbHdheXMgZm9jdXNlZCBhdCB0aGUgY2VudGVyIG9mIGEgdHJhY2suXG4gICAqIGAwLDEsMiwzLi4uYCAtIEN1cnJlbnQgc2xpZGUgd2lsbCBiZSBmb2N1c2VkIG9uIHRoZSBzcGVjaWZpZWQgemVyby1iYXNlZCBpbmRleC5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ3xOdW1iZXJ9XG4gICAqL1xuICBmb2N1c0F0OiAwLFxuXG4gIC8qKlxuICAgKiBBIHNpemUgb2YgdGhlIGdhcCBhZGRlZCBiZXR3ZWVuIHNsaWRlcy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdhcDogMTAsXG5cbiAgLyoqXG4gICAqIENoYW5nZSBzbGlkZXMgYWZ0ZXIgYSBzcGVjaWZpZWQgaW50ZXJ2YWwuIFVzZSBgZmFsc2VgIGZvciB0dXJuaW5nIG9mZiBhdXRvcGxheS5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgYXV0b3BsYXk6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBTdG9wIGF1dG9wbGF5IG9uIG1vdXNlb3ZlciBldmVudC5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBob3ZlcnBhdXNlOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBBbGxvdyBmb3IgY2hhbmdpbmcgc2xpZGVzIHdpdGggbGVmdCBhbmQgcmlnaHQga2V5Ym9hcmQgYXJyb3dzLlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGtleWJvYXJkOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBTdG9wIHJ1bm5pbmcgYHBlclZpZXdgIG51bWJlciBvZiBzbGlkZXMgZnJvbSB0aGUgZW5kLiBVc2UgdGhpc1xuICAgKiBvcHRpb24gaWYgeW91IGRvbid0IHdhbnQgdG8gaGF2ZSBhbiBlbXB0eSBzcGFjZSBhZnRlclxuICAgKiBhIHNsaWRlci4gV29ya3Mgb25seSB3aXRoIGBzbGlkZXJgIHR5cGUgYW5kIGFcbiAgICogbm9uLWNlbnRlcmVkIGBmb2N1c0F0YCBzZXR0aW5nLlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGJvdW5kOiBmYWxzZSxcblxuICAvKipcbiAgICogTWluaW1hbCBzd2lwZSBkaXN0YW5jZSBuZWVkZWQgdG8gY2hhbmdlIHRoZSBzbGlkZS4gVXNlIGBmYWxzZWAgZm9yIHR1cm5pbmcgb2ZmIGEgc3dpcGluZy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgc3dpcGVUaHJlc2hvbGQ6IDgwLFxuXG4gIC8qKlxuICAgKiBNaW5pbWFsIG1vdXNlIGRyYWcgZGlzdGFuY2UgbmVlZGVkIHRvIGNoYW5nZSB0aGUgc2xpZGUuIFVzZSBgZmFsc2VgIGZvciB0dXJuaW5nIG9mZiBhIGRyYWdnaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfEJvb2xlYW59XG4gICAqL1xuICBkcmFnVGhyZXNob2xkOiAxMjAsXG5cbiAgLyoqXG4gICAqIEEgbWF4aW11bSBudW1iZXIgb2Ygc2xpZGVzIHRvIHdoaWNoIG1vdmVtZW50IHdpbGwgYmUgbWFkZSBvbiBzd2lwaW5nIG9yIGRyYWdnaW5nLiBVc2UgYGZhbHNlYCBmb3IgdW5saW1pdGVkLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfEJvb2xlYW59XG4gICAqL1xuICBwZXJUb3VjaDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIE1vdmluZyBkaXN0YW5jZSByYXRpbyBvZiB0aGUgc2xpZGVzIG9uIGEgc3dpcGluZyBhbmQgZHJhZ2dpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICB0b3VjaFJhdGlvOiAwLjUsXG5cbiAgLyoqXG4gICAqIEFuZ2xlIHJlcXVpcmVkIHRvIGFjdGl2YXRlIHNsaWRlcyBtb3Zpbmcgb24gc3dpcGluZyBvciBkcmFnZ2luZy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHRvdWNoQW5nbGU6IDQ1LFxuXG4gIC8qKlxuICAgKiBEdXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uIGluIG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGFuaW1hdGlvbkR1cmF0aW9uOiA0MDAsXG5cbiAgLyoqXG4gICAqIEFsbG93cyBsb29waW5nIHRoZSBgc2xpZGVyYCB0eXBlLiBTbGlkZXIgd2lsbCByZXdpbmQgdG8gdGhlIGZpcnN0L2xhc3Qgc2xpZGUgd2hlbiBpdCdzIGF0IHRoZSBzdGFydC9lbmQuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgcmV3aW5kOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBEdXJhdGlvbiBvZiB0aGUgcmV3aW5kaW5nIGFuaW1hdGlvbiBvZiB0aGUgYHNsaWRlcmAgdHlwZSBpbiBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICByZXdpbmREdXJhdGlvbjogODAwLFxuXG4gIC8qKlxuICAgKiBFYXNpbmcgZnVuY3Rpb24gZm9yIHRoZSBhbmltYXRpb24uXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBhbmltYXRpb25UaW1pbmdGdW5jOiAnY3ViaWMtYmV6aWVyKC4xNjUsIC44NDAsIC40NDAsIDEpJyxcblxuICAvKipcbiAgICogV2FpdCBmb3IgdGhlIGFuaW1hdGlvbiB0byBmaW5pc2ggdW50aWwgdGhlIG5leHQgdXNlciBpbnB1dCBjYW4gYmUgcHJvY2Vzc2VkXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgd2FpdEZvclRyYW5zaXRpb246IHRydWUsXG5cbiAgLyoqXG4gICAqIFRocm90dGxlIGNvc3RseSBldmVudHMgYXQgbW9zdCBvbmNlIHBlciBldmVyeSB3YWl0IG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHRocm90dGxlOiAxMCxcblxuICAvKipcbiAgICogTW92aW5nIGRpcmVjdGlvbiBtb2RlLlxuICAgKlxuICAgKiBBdmFpbGFibGUgaW5wdXRzOlxuICAgKiAtICdsdHInIC0gbGVmdCB0byByaWdodCBtb3ZlbWVudCxcbiAgICogLSAncnRsJyAtIHJpZ2h0IHRvIGxlZnQgbW92ZW1lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBkaXJlY3Rpb246ICdsdHInLFxuXG4gIC8qKlxuICAgKiBUaGUgZGlzdGFuY2UgdmFsdWUgb2YgdGhlIG5leHQgYW5kIHByZXZpb3VzIHZpZXdwb3J0cyB3aGljaFxuICAgKiBoYXZlIHRvIHBlZWsgaW4gdGhlIGN1cnJlbnQgdmlldy4gQWNjZXB0cyBudW1iZXIgYW5kXG4gICAqIHBpeGVscyBhcyBhIHN0cmluZy4gTGVmdCBhbmQgcmlnaHQgcGVla2luZyBjYW4gYmVcbiAgICogc2V0IHVwIHNlcGFyYXRlbHkgd2l0aCBhIGRpcmVjdGlvbnMgb2JqZWN0LlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZTpcbiAgICogYDEwMGAgLSBQZWVrIDEwMHB4IG9uIHRoZSBib3RoIHNpZGVzLlxuICAgKiB7IGJlZm9yZTogMTAwLCBhZnRlcjogNTAgfWAgLSBQZWVrIDEwMHB4IG9uIHRoZSBsZWZ0IHNpZGUgYW5kIDUwcHggb24gdGhlIHJpZ2h0IHNpZGUuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8U3RyaW5nfE9iamVjdH1cbiAgICovXG4gIHBlZWs6IDAsXG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2Ygb3B0aW9ucyBhcHBsaWVkIGF0IHNwZWNpZmllZCBtZWRpYSBicmVha3BvaW50cy5cbiAgICogRm9yIGV4YW1wbGU6IGRpc3BsYXkgdHdvIHNsaWRlcyBwZXIgdmlldyB1bmRlciA4MDBweC5cbiAgICogYHtcbiAgICogICAnODAwcHgnOiB7XG4gICAqICAgICBwZXJWaWV3OiAyXG4gICAqICAgfVxuICAgKiB9YFxuICAgKi9cbiAgYnJlYWtwb2ludHM6IHt9LFxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIGludGVybmFsbHkgdXNlZCBIVE1MIGNsYXNzZXMuXG4gICAqXG4gICAqIEB0b2RvIFJlZmFjdG9yIGBzbGlkZXJgIGFuZCBgY2Fyb3VzZWxgIHByb3BlcnRpZXMgdG8gc2luZ2xlIGB0eXBlOiB7IHNsaWRlcjogJycsIGNhcm91c2VsOiAnJyB9YCBvYmplY3RcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIGNsYXNzZXM6IHtcbiAgICBkaXJlY3Rpb246IHtcbiAgICAgIGx0cjogJ2dsaWRlLS1sdHInLFxuICAgICAgcnRsOiAnZ2xpZGUtLXJ0bCdcbiAgICB9LFxuICAgIHNsaWRlcjogJ2dsaWRlLS1zbGlkZXInLFxuICAgIGNhcm91c2VsOiAnZ2xpZGUtLWNhcm91c2VsJyxcbiAgICBzd2lwZWFibGU6ICdnbGlkZS0tc3dpcGVhYmxlJyxcbiAgICBkcmFnZ2luZzogJ2dsaWRlLS1kcmFnZ2luZycsXG4gICAgY2xvbmVTbGlkZTogJ2dsaWRlX19zbGlkZS0tY2xvbmUnLFxuICAgIGFjdGl2ZU5hdjogJ2dsaWRlX19idWxsZXQtLWFjdGl2ZScsXG4gICAgYWN0aXZlU2xpZGU6ICdnbGlkZV9fc2xpZGUtLWFjdGl2ZScsXG4gICAgZGlzYWJsZWRBcnJvdzogJ2dsaWRlX19hcnJvdy0tZGlzYWJsZWQnXG4gIH1cbn1cbiIsIi8qKlxuICogT3V0cHV0cyB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGJvd3NlciBjb25zb2xlLlxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gbXNnXG4gKiBAcmV0dXJuIHtWb2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2FybiAobXNnKSB7XG4gIGNvbnNvbGUuZXJyb3IoYFtHbGlkZSB3YXJuXTogJHttc2d9YClcbn1cbiIsIi8qKlxuICogQ29udmVydHMgdmFsdWUgZW50ZXJlZCBhcyBudW1iZXJcbiAqIG9yIHN0cmluZyB0byBpbnRlZ2VyIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvSW50ICh2YWx1ZSkge1xuICByZXR1cm4gcGFyc2VJbnQodmFsdWUpXG59XG5cbi8qKlxuICogQ29udmVydHMgdmFsdWUgZW50ZXJlZCBhcyBudW1iZXJcbiAqIG9yIHN0cmluZyB0byBmbGF0IHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvRmxvYXQgKHZhbHVlKSB7XG4gIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKVxufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtICB7Kn0gICB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCAodmFsdWUpIHtcbiAgbGV0IHR5cGUgPSB0eXBlb2YgdmFsdWVcblxuICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0JyAmJiAhIXZhbHVlIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbWl4ZWQtb3BlcmF0b3JzXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIG51bWJlci5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJ1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbidcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIHVuZGVmaW5lZC5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJ1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYW4gYXJyYXkuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5ICh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUuY29uc3RydWN0b3IgPT09IEFycmF5XG59XG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgaW5pdGlhbGl6ZXMgc3BlY2lmaWVkIGNvbGxlY3Rpb24gb2YgZXh0ZW5zaW9ucy5cbiAqIEVhY2ggZXh0ZW5zaW9uIHJlY2VpdmVzIGFjY2VzcyB0byBpbnN0YW5jZSBvZiBnbGlkZSBhbmQgcmVzdCBvZiBjb21wb25lbnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBnbGlkZVxuICogQHBhcmFtIHtPYmplY3R9IGV4dGVuc2lvbnNcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gbW91bnQgKGdsaWRlLCBleHRlbnNpb25zLCBldmVudHMpIHtcbiAgbGV0IGNvbXBvbmVudHMgPSB7fVxuXG4gIGZvciAobGV0IG5hbWUgaW4gZXh0ZW5zaW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGV4dGVuc2lvbnNbbmFtZV0pKSB7XG4gICAgICBjb21wb25lbnRzW25hbWVdID0gZXh0ZW5zaW9uc1tuYW1lXShnbGlkZSwgY29tcG9uZW50cywgZXZlbnRzKVxuICAgIH0gZWxzZSB7XG4gICAgICB3YXJuKCdFeHRlbnNpb24gbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBuYW1lIGluIGNvbXBvbmVudHMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjb21wb25lbnRzW25hbWVdLm1vdW50KSkge1xuICAgICAgY29tcG9uZW50c1tuYW1lXS5tb3VudCgpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbXBvbmVudHNcbn1cbiIsIi8qKlxuICogRGVmaW5lcyBnZXR0ZXIgYW5kIHNldHRlciBwcm9wZXJ0eSBvbiB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9iaiAgICAgICAgIE9iamVjdCB3aGVyZSBwcm9wZXJ0eSBoYXMgdG8gYmUgZGVmaW5lZC5cbiAqIEBwYXJhbSAge1N0cmluZ30gcHJvcCAgICAgICAgTmFtZSBvZiB0aGUgZGVmaW5lZCBwcm9wZXJ0eS5cbiAqIEBwYXJhbSAge09iamVjdH0gZGVmaW5pdGlvbiAgR2V0IGFuZCBzZXQgZGVmaW5pdGlvbnMgZm9yIHRoZSBwcm9wZXJ0eS5cbiAqIEByZXR1cm4ge1ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmUgKG9iaiwgcHJvcCwgZGVmaW5pdGlvbikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCBkZWZpbml0aW9uKVxufVxuXG4vKipcbiAqIFNvcnRzIGFwaGFiZXRpY2FsbHkgb2JqZWN0IGtleXMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNvcnRLZXlzIChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuc29ydCgpLnJlZHVjZSgociwgaykgPT4ge1xuICAgIHJba10gPSBvYmpba11cblxuICAgIHJldHVybiAocltrXSwgcilcbiAgfSwge30pXG59XG5cbi8qKlxuICogTWVyZ2VzIHBhc3NlZCBzZXR0aW5ncyBvYmplY3Qgd2l0aCBkZWZhdWx0IG9wdGlvbnMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBkZWZhdWx0c1xuICogQHBhcmFtICB7T2JqZWN0fSBzZXR0aW5nc1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPcHRpb25zIChkZWZhdWx0cywgc2V0dGluZ3MpIHtcbiAgbGV0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgc2V0dGluZ3MpXG5cbiAgLy8gYE9iamVjdC5hc3NpZ25gIGRvIG5vdCBkZWVwbHkgbWVyZ2Ugb2JqZWN0cywgc28gd2VcbiAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseSBmb3IgZXZlcnkgbmVzdGVkIG9iamVjdFxuICAvLyBpbiBvcHRpb25zLiBBbHRob3VnaCBpdCBkb2VzIG5vdCBsb29rIHNtYXJ0LFxuICAvLyBpdCdzIHNtYWxsZXIgYW5kIGZhc3RlciB0aGFuIHNvbWUgZmFuY3lcbiAgLy8gbWVyZ2luZyBkZWVwLW1lcmdlIGFsZ29yaXRobSBzY3JpcHQuXG4gIGlmIChzZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eSgnY2xhc3NlcycpKSB7XG4gICAgb3B0aW9ucy5jbGFzc2VzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMuY2xhc3Nlcywgc2V0dGluZ3MuY2xhc3NlcylcblxuICAgIGlmIChzZXR0aW5ncy5jbGFzc2VzLmhhc093blByb3BlcnR5KCdkaXJlY3Rpb24nKSkge1xuICAgICAgb3B0aW9ucy5jbGFzc2VzLmRpcmVjdGlvbiA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLmNsYXNzZXMuZGlyZWN0aW9uLCBzZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvbilcbiAgICB9XG4gIH1cblxuICBpZiAoc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ2JyZWFrcG9pbnRzJykpIHtcbiAgICBvcHRpb25zLmJyZWFrcG9pbnRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMuYnJlYWtwb2ludHMsIHNldHRpbmdzLmJyZWFrcG9pbnRzKVxuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnNcbn1cbiIsImltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi8uLi91dGlscy91bml0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudHNCdXMge1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgRXZlbnRCdXMgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudHNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChldmVudHMgPSB7fSkge1xuICAgIHRoaXMuZXZlbnRzID0gZXZlbnRzXG4gICAgdGhpcy5ob3AgPSBldmVudHMuaGFzT3duUHJvcGVydHlcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGxpc3RlbmVyIHRvIHRoZSBzcGVjaWZlZCBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIG9uIChldmVudCwgaGFuZGxlcikge1xuICAgIGlmIChpc0FycmF5KGV2ZW50KSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLm9uKGV2ZW50W2ldLCBoYW5kbGVyKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSB0aGUgZXZlbnQncyBvYmplY3QgaWYgbm90IHlldCBjcmVhdGVkXG4gICAgaWYgKCF0aGlzLmhvcC5jYWxsKHRoaXMuZXZlbnRzLCBldmVudCkpIHtcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdXG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBoYW5kbGVyIHRvIHF1ZXVlXG4gICAgdmFyIGluZGV4ID0gdGhpcy5ldmVudHNbZXZlbnRdLnB1c2goaGFuZGxlcikgLSAxXG5cbiAgICAvLyBQcm92aWRlIGhhbmRsZSBiYWNrIGZvciByZW1vdmFsIG9mIGV2ZW50XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlbW92ZSAoKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50c1tldmVudF1baW5kZXhdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJ1bnMgcmVnaXN0ZXJlZCBoYW5kbGVycyBmb3Igc3BlY2lmaWVkIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gZXZlbnRcbiAgICogQHBhcmFtIHtPYmplY3Q9fSBjb250ZXh0XG4gICAqL1xuICBlbWl0IChldmVudCwgY29udGV4dCkge1xuICAgIGlmIChpc0FycmF5KGV2ZW50KSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmVtaXQoZXZlbnRbaV0sIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGV2ZW50IGRvZXNuJ3QgZXhpc3QsIG9yIHRoZXJlJ3Mgbm8gaGFuZGxlcnMgaW4gcXVldWUsIGp1c3QgbGVhdmVcbiAgICBpZiAoIXRoaXMuaG9wLmNhbGwodGhpcy5ldmVudHMsIGV2ZW50KSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gQ3ljbGUgdGhyb3VnaCBldmVudHMgcXVldWUsIGZpcmUhXG4gICAgdGhpcy5ldmVudHNbZXZlbnRdLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0oY29udGV4dCB8fCB7fSlcbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQgZGVmYXVsdHMgZnJvbSBcIi4vZGVmYXVsdHNcIjtcclxuaW1wb3J0IHsgd2FybiB9IGZyb20gXCIuL3V0aWxzL2xvZ1wiO1xyXG5pbXBvcnQgeyBtb3VudCB9IGZyb20gXCIuL2NvcmUvaW5kZXhcIjtcclxuaW1wb3J0IHsgbWVyZ2VPcHRpb25zIH0gZnJvbSBcIi4vdXRpbHMvb2JqZWN0XCI7XHJcbmltcG9ydCB7IHRvSW50LCBpc09iamVjdCwgaXNBcnJheSB9IGZyb20gXCIuL3V0aWxzL3VuaXRcIjtcclxuXHJcbmltcG9ydCBFdmVudHNCdXMgZnJvbSBcIi4vY29yZS9ldmVudC9ldmVudHMtYnVzXCI7XHJcbmNvbnNvbGUubG9nKFwiZ2xpZGUgM1wiKTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2xpZGUge1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBnbGlkZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gc2VsZWN0b3JcclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICB0aGlzLl9jID0ge307XHJcbiAgICB0aGlzLl90ID0gW107XHJcbiAgICB0aGlzLl9lID0gbmV3IEV2ZW50c0J1cygpO1xyXG5cclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcclxuICAgIHRoaXMuc2V0dGluZ3MgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5pbmRleCA9IHRoaXMuc2V0dGluZ3Muc3RhcnRBdDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemVzIGdsaWRlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGV4dGVuc2lvbnMgQ29sbGVjdGlvbiBvZiBleHRlbnNpb25zIHRvIGluaXRpYWxpemUuXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgbW91bnQoZXh0ZW5zaW9ucyA9IHt9KSB7XHJcbiAgICB0aGlzLl9lLmVtaXQoXCJtb3VudC5iZWZvcmVcIik7XHJcblxyXG4gICAgaWYgKGlzT2JqZWN0KGV4dGVuc2lvbnMpKSB7XHJcbiAgICAgIHRoaXMuX2MgPSBtb3VudCh0aGlzLCBleHRlbnNpb25zLCB0aGlzLl9lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdhcm4oXCJZb3UgbmVlZCB0byBwcm92aWRlIGEgb2JqZWN0IG9uIGBtb3VudCgpYFwiKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9lLmVtaXQoXCJtb3VudC5hZnRlclwiKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbGxlY3RzIGFuIGluc3RhbmNlIGB0cmFuc2xhdGVgIHRyYW5zZm9ybWVycy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge0FycmF5fSB0cmFuc2Zvcm1lcnMgQ29sbGVjdGlvbiBvZiB0cmFuc2Zvcm1lcnMuXHJcbiAgICogQHJldHVybiB7Vm9pZH1cclxuICAgKi9cclxuICBtdXRhdGUodHJhbnNmb3JtZXJzID0gW10pIHtcclxuICAgIGlmIChpc0FycmF5KHRyYW5zZm9ybWVycykpIHtcclxuICAgICAgdGhpcy5fdCA9IHRyYW5zZm9ybWVycztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdhcm4oXCJZb3UgbmVlZCB0byBwcm92aWRlIGEgYXJyYXkgb24gYG11dGF0ZSgpYFwiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgZ2xpZGUgd2l0aCBzcGVjaWZpZWQgc2V0dGluZ3MuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3NcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICB1cGRhdGUoc2V0dGluZ3MgPSB7fSkge1xyXG4gICAgdGhpcy5zZXR0aW5ncyA9IG1lcmdlT3B0aW9ucyh0aGlzLnNldHRpbmdzLCBzZXR0aW5ncyk7XHJcblxyXG4gICAgaWYgKHNldHRpbmdzLmhhc093blByb3BlcnR5KFwic3RhcnRBdFwiKSkge1xyXG4gICAgICB0aGlzLmluZGV4ID0gc2V0dGluZ3Muc3RhcnRBdDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9lLmVtaXQoXCJ1cGRhdGVcIik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2Ugc2xpZGUgd2l0aCBzcGVjaWZpZWQgcGF0dGVybi4gQSBwYXR0ZXJuIG11c3QgYmUgaW4gdGhlIHNwZWNpYWwgZm9ybWF0OlxyXG4gICAqIGA+YCAtIE1vdmUgb25lIGZvcndhcmRcclxuICAgKiBgPGAgLSBNb3ZlIG9uZSBiYWNrd2FyZFxyXG4gICAqIGA9e2l9YCAtIEdvIHRvIHtpfSB6ZXJvLWJhc2VkIHNsaWRlIChlcS4gJz0xJywgd2lsbCBnbyB0byBzZWNvbmQgc2xpZGUpXHJcbiAgICogYD4+YCAtIFJld2luZHMgdG8gZW5kIChsYXN0IHNsaWRlKVxyXG4gICAqIGA8PGAgLSBSZXdpbmRzIHRvIHN0YXJ0IChmaXJzdCBzbGlkZSlcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwYXR0ZXJuXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgZ28ocGF0dGVybikge1xyXG4gICAgdGhpcy5fYy5SdW4ubWFrZShwYXR0ZXJuKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1vdmUgdHJhY2sgYnkgc3BlY2lmaWVkIGRpc3RhbmNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRpc3RhbmNlXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgbW92ZShkaXN0YW5jZSkge1xyXG4gICAgdGhpcy5fYy5UcmFuc2l0aW9uLmRpc2FibGUoKTtcclxuICAgIHRoaXMuX2MuTW92ZS5tYWtlKGRpc3RhbmNlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3kgaW5zdGFuY2UgYW5kIHJldmVydCBhbGwgY2hhbmdlcyBkb25lIGJ5IHRoaXMuX2MuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZS5lbWl0KFwiZGVzdHJveVwiKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IGluc3RhbmNlIGF1dG9wbGF5aW5nLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtCb29sZWFufE51bWJlcn0gaW50ZXJ2YWwgUnVuIGF1dG9wbGF5aW5nIHdpdGggcGFzc2VkIGludGVydmFsIHJlZ2FyZGxlc3Mgb2YgYGF1dG9wbGF5YCBzZXR0aW5nc1xyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIHBsYXkoaW50ZXJ2YWwgPSBmYWxzZSkge1xyXG4gICAgaWYgKGludGVydmFsKSB7XHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuYXV0b3BsYXkgPSBpbnRlcnZhbDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9lLmVtaXQoXCJwbGF5XCIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcCBpbnN0YW5jZSBhdXRvcGxheWluZy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIHBhdXNlKCkge1xyXG4gICAgdGhpcy5fZS5lbWl0KFwicGF1c2VcIik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGdsaWRlIGludG8gYSBpZGxlIHN0YXR1cy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIGRpc2FibGUoKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgZ2xpZGUgaW50byBhIGFjdGl2ZSBzdGF0dXMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBlbmFibGUoKSB7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGN1dXRvbSBldmVudCBsaXN0ZW5lciB3aXRoIGhhbmRsZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtTdHJpbmd8QXJyYXl9IGV2ZW50XHJcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGhhbmRsZXJcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBvbihldmVudCwgaGFuZGxlcikge1xyXG4gICAgdGhpcy5fZS5vbihldmVudCwgaGFuZGxlcik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgaWYgZ2xpZGUgaXMgYSBwcmVjaXNlZCB0eXBlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBuYW1lXHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgKi9cclxuICBpc1R5cGUobmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3MudHlwZSA9PT0gbmFtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdmFsdWUgb2YgdGhlIGNvcmUgb3B0aW9ucy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgKi9cclxuICBnZXQgc2V0dGluZ3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdmFsdWUgb2YgdGhlIGNvcmUgb3B0aW9ucy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge09iamVjdH0gb1xyXG4gICAqIEByZXR1cm4ge1ZvaWR9XHJcbiAgICovXHJcbiAgc2V0IHNldHRpbmdzKG8pIHtcclxuICAgIGlmIChpc09iamVjdChvKSkge1xyXG4gICAgICB0aGlzLl9vID0gbztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdhcm4oXCJPcHRpb25zIG11c3QgYmUgYW4gYG9iamVjdGAgaW5zdGFuY2UuXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBjdXJyZW50IGluZGV4IG9mIHRoZSBzbGlkZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICovXHJcbiAgZ2V0IGluZGV4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2k7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGN1cnJlbnQgaW5kZXggYSBzbGlkZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICovXHJcbiAgc2V0IGluZGV4KGkpIHtcclxuICAgIHRoaXMuX2kgPSB0b0ludChpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdHlwZSBuYW1lIG9mIHRoZSBzbGlkZXIuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAgICovXHJcbiAgZ2V0IHR5cGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy50eXBlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB2YWx1ZSBvZiB0aGUgaWRsZSBzdGF0dXMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAqL1xyXG4gIGdldCBkaXNhYmxlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB2YWx1ZSBvZiB0aGUgaWRsZSBzdGF0dXMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAqL1xyXG4gIHNldCBkaXNhYmxlZChzdGF0dXMpIHtcclxuICAgIHRoaXMuX2QgPSAhIXN0YXR1cztcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uL3V0aWxzL2xvZydcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCB7IHRvSW50LCBpc051bWJlciB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IFJ1biA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBhdXRvcnVubmluZyBvZiB0aGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuX28gPSBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyBnbGlkZXMgcnVubmluZyBiYXNlZCBvbiB0aGUgcGFzc2VkIG1vdmluZyBzY2hlbWEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbW92ZVxuICAgICAqL1xuICAgIG1ha2UgKG1vdmUpIHtcbiAgICAgIGlmICghR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgIUdsaWRlLnNldHRpbmdzLndhaXRGb3JUcmFuc2l0aW9uIHx8IEdsaWRlLmRpc2FibGUoKVxuXG4gICAgICAgIHRoaXMubW92ZSA9IG1vdmVcblxuICAgICAgICBFdmVudHMuZW1pdCgncnVuLmJlZm9yZScsIHRoaXMubW92ZSlcblxuICAgICAgICB0aGlzLmNhbGN1bGF0ZSgpXG5cbiAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bicsIHRoaXMubW92ZSlcblxuICAgICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uYWZ0ZXIoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmlzU3RhcnQoKSkge1xuICAgICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5zdGFydCcsIHRoaXMubW92ZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5pc0VuZCgpKSB7XG4gICAgICAgICAgICBFdmVudHMuZW1pdCgncnVuLmVuZCcsIHRoaXMubW92ZSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5pc09mZnNldCgpKSB7XG4gICAgICAgICAgICB0aGlzLl9vID0gZmFsc2VcblxuICAgICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5vZmZzZXQnLCB0aGlzLm1vdmUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5hZnRlcicsIHRoaXMubW92ZSlcblxuICAgICAgICAgIEdsaWRlLmVuYWJsZSgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgY3VycmVudCBpbmRleCBiYXNlZCBvbiBkZWZpbmVkIG1vdmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ8VW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGNhbGN1bGF0ZSAoKSB7XG4gICAgICBjb25zdCB7IG1vdmUsIGxlbmd0aCB9ID0gdGhpc1xuICAgICAgY29uc3QgeyBzdGVwcywgZGlyZWN0aW9uIH0gPSBtb3ZlXG5cbiAgICAgIC8vIEJ5IGRlZmF1bHQgYXNzdW1lIHRoYXQgc2l6ZSBvZiB2aWV3IGlzIGVxdWFsIHRvIG9uZSBzbGlkZVxuICAgICAgbGV0IHZpZXdTaXplID0gMVxuICAgICAgLy8gRGV0ZXJtaW5lIGlmIHN0ZXBzIGFyZSBudW1lcmljIHZhbHVlXG4gICAgICBsZXQgY291bnRhYmxlU3RlcHMgPSBpc051bWJlcih0b0ludChzdGVwcykpICYmIHRvSW50KHN0ZXBzKSAhPT0gMFxuXG4gICAgICAvLyBXaGlsZSBkaXJlY3Rpb24gaXMgYD1gIHdlIHdhbnQganVtcCB0b1xuICAgICAgLy8gYSBzcGVjaWZpZWQgaW5kZXggZGVzY3JpYmVkIGluIHN0ZXBzLlxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJz0nKSB7XG4gICAgICAgIEdsaWRlLmluZGV4ID0gc3RlcHNcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gV2hlbiBwYXR0ZXJuIGlzIGVxdWFsIHRvIGA+PmAgd2Ugd2FudFxuICAgICAgLy8gZmFzdCBmb3J3YXJkIHRvIHRoZSBsYXN0IHNsaWRlLlxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJz4nICYmIHN0ZXBzID09PSAnPicpIHtcbiAgICAgICAgR2xpZGUuaW5kZXggPSBsZW5ndGhcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gV2hlbiBwYXR0ZXJuIGlzIGVxdWFsIHRvIGA8PGAgd2Ugd2FudFxuICAgICAgLy8gZmFzdCBmb3J3YXJkIHRvIHRoZSBmaXJzdCBzbGlkZS5cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc8JyAmJiBzdGVwcyA9PT0gJzwnKSB7XG4gICAgICAgIEdsaWRlLmluZGV4ID0gMFxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBXaGlsZSBzdGVwcyBpcyBhIG51bWVyaWMgdmFsdWUgYW5kIHdlXG4gICAgICAvLyBtb3ZlIGZvcndhcmQgYnkgdGhlIG51bWJlciBvZiBzdGVwcy5cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc+JyAmJiBjb3VudGFibGVTdGVwcykge1xuICAgICAgICB2aWV3U2l6ZSA9IHRvSW50KHN0ZXBzKSAqIC0xXG4gICAgICB9XG5cbiAgICAgIC8vICRzdGVwczwgKGRyYWcpIG1vdmVtZW50XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPCcgJiYgY291bnRhYmxlU3RlcHMpIHtcbiAgICAgICAgdmlld1NpemUgPSB0b0ludChzdGVwcylcbiAgICAgIH1cblxuICAgICAgLy8gcGFnaW5hdGlvbiBtb3ZlbWVudFxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3wnKSB7XG4gICAgICAgIHZpZXdTaXplID0gR2xpZGUuc2V0dGluZ3MucGVyVmlldyB8fCAxXG4gICAgICB9XG5cbiAgICAgIC8vIHdlIGFyZSBtb3ZpbmcgZm9yd2FyZFxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJz4nIHx8IChkaXJlY3Rpb24gPT09ICd8JyAmJiBzdGVwcyA9PT0gJz4nKSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IGNhbGN1bGF0ZUZvcndhcmRJbmRleCh2aWV3U2l6ZSlcblxuICAgICAgICBpZiAoaW5kZXggPiBsZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLl9vID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgR2xpZGUuaW5kZXggPSBub3JtYWxpemVGb3J3YXJkSW5kZXgoaW5kZXgsIHZpZXdTaXplKVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyB3ZSBhcmUgbW92aW5nIGJhY2t3YXJkXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPCcgfHwgKGRpcmVjdGlvbiA9PT0gJ3wnICYmIHN0ZXBzID09PSAnPCcpKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gY2FsY3VsYXRlQmFja3dhcmRJbmRleCh2aWV3U2l6ZSlcblxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgdGhpcy5fbyA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIEdsaWRlLmluZGV4ID0gbm9ybWFsaXplQmFja3dhcmRJbmRleChpbmRleCwgdmlld1NpemUpXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHdhcm4oYEludmFsaWQgZGlyZWN0aW9uIHBhdHRlcm4gWyR7ZGlyZWN0aW9ufSR7c3RlcHN9XSBoYXMgYmVlbiB1c2VkYClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHdlIGFyZSBvbiB0aGUgZmlyc3Qgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzU3RhcnQgKCkge1xuICAgICAgcmV0dXJuIEdsaWRlLmluZGV4IDw9IDBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHdlIGFyZSBvbiB0aGUgbGFzdCBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNFbmQgKCkge1xuICAgICAgcmV0dXJuIEdsaWRlLmluZGV4ID49IHRoaXMubGVuZ3RoXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB3ZSBhcmUgbWFraW5nIGEgb2Zmc2V0IHJ1bi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzT2Zmc2V0IChkaXJlY3Rpb24gPSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICghZGlyZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fbykge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgLy8gZGlkIHdlIHZpZXcgdG8gdGhlIHJpZ2h0P1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3w+Jykge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlLmRpcmVjdGlvbiA9PT0gJ3wnICYmIHRoaXMubW92ZS5zdGVwcyA9PT0gJz4nXG4gICAgICB9XG5cbiAgICAgIC8vIGRpZCB3ZSB2aWV3IHRvIHRoZSBsZWZ0P1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3w8Jykge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlLmRpcmVjdGlvbiA9PT0gJ3wnICYmIHRoaXMubW92ZS5zdGVwcyA9PT0gJzwnXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLm1vdmUuZGlyZWN0aW9uID09PSBkaXJlY3Rpb25cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGJvdW5kIG1vZGUgaXMgYWN0aXZlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzQm91bmQgKCkge1xuICAgICAgcmV0dXJuIEdsaWRlLmlzVHlwZSgnc2xpZGVyJykgJiYgR2xpZGUuc2V0dGluZ3MuZm9jdXNBdCAhPT0gJ2NlbnRlcicgJiYgR2xpZGUuc2V0dGluZ3MuYm91bmRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBpbmRleCB2YWx1ZSB0byBtb3ZlIGZvcndhcmQvdG8gdGhlIHJpZ2h0XG4gICAqXG4gICAqIEBwYXJhbSB2aWV3U2l6ZVxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZnVuY3Rpb24gY2FsY3VsYXRlRm9yd2FyZEluZGV4ICh2aWV3U2l6ZSkge1xuICAgIGNvbnN0IHsgaW5kZXggfSA9IEdsaWRlXG5cbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICByZXR1cm4gaW5kZXggKyB2aWV3U2l6ZVxuICAgIH1cblxuICAgIHJldHVybiBpbmRleCArICh2aWV3U2l6ZSAtIChpbmRleCAlIHZpZXdTaXplKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemVzIHRoZSBnaXZlbiBmb3J3YXJkIGluZGV4IGJhc2VkIG9uIGdsaWRlIHNldHRpbmdzLCBwcmV2ZW50aW5nIGl0IHRvIGV4Y2VlZCBjZXJ0YWluIGJvdW5kYXJpZXNcbiAgICpcbiAgICogQHBhcmFtIGluZGV4XG4gICAqIEBwYXJhbSBsZW5ndGhcbiAgICogQHBhcmFtIHZpZXdTaXplXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAqL1xuICBmdW5jdGlvbiBub3JtYWxpemVGb3J3YXJkSW5kZXggKGluZGV4LCB2aWV3U2l6ZSkge1xuICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSBSdW5cblxuICAgIGlmIChpbmRleCA8PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykpIHtcbiAgICAgIHJldHVybiBpbmRleCAtIChsZW5ndGggKyAxKVxuICAgIH1cblxuICAgIGlmIChHbGlkZS5zZXR0aW5ncy5yZXdpbmQpIHtcbiAgICAgIC8vIGJvdW5kIGRvZXMgZnVubnkgdGhpbmdzIHdpdGggdGhlIGxlbmd0aCwgdGhlcmVmb3Igd2UgaGF2ZSB0byBiZSBjZXJ0YWluXG4gICAgICAvLyB0aGF0IHdlIGFyZSBvbiB0aGUgbGFzdCBwb3NzaWJsZSBpbmRleCB2YWx1ZSBnaXZlbiBieSBib3VuZFxuICAgICAgaWYgKFJ1bi5pc0JvdW5kKCkgJiYgIVJ1bi5pc0VuZCgpKSB7XG4gICAgICAgIHJldHVybiBsZW5ndGhcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICBpZiAoUnVuLmlzQm91bmQoKSkge1xuICAgICAgcmV0dXJuIGxlbmd0aFxuICAgIH1cblxuICAgIHJldHVybiBNYXRoLmZsb29yKGxlbmd0aCAvIHZpZXdTaXplKSAqIHZpZXdTaXplXG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBpbmRleCB2YWx1ZSB0byBtb3ZlIGJhY2t3YXJkL3RvIHRoZSBsZWZ0XG4gICAqXG4gICAqIEBwYXJhbSB2aWV3U2l6ZVxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZnVuY3Rpb24gY2FsY3VsYXRlQmFja3dhcmRJbmRleCAodmlld1NpemUpIHtcbiAgICBjb25zdCB7IGluZGV4IH0gPSBHbGlkZVxuXG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgcmV0dXJuIGluZGV4IC0gdmlld1NpemVcbiAgICB9XG5cbiAgICAvLyBlbnN1cmUgb3VyIGJhY2sgbmF2aWdhdGlvbiByZXN1bHRzIGluIHRoZSBzYW1lIGluZGV4IGFzIGEgZm9yd2FyZCBuYXZpZ2F0aW9uXG4gICAgLy8gdG8gZXhwZXJpZW5jZSBhIGhvbW9nZW5lb3VzIHBhZ2luZ1xuICAgIGNvbnN0IHZpZXcgPSBNYXRoLmNlaWwoaW5kZXggLyB2aWV3U2l6ZSlcblxuICAgIHJldHVybiAodmlldyAtIDEpICogdmlld1NpemVcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemVzIHRoZSBnaXZlbiBiYWNrd2FyZCBpbmRleCBiYXNlZCBvbiBnbGlkZSBzZXR0aW5ncywgcHJldmVudGluZyBpdCB0byBleGNlZWQgY2VydGFpbiBib3VuZGFyaWVzXG4gICAqXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKiBAcGFyYW0gbGVuZ3RoXG4gICAqIEBwYXJhbSB2aWV3U2l6ZVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZUJhY2t3YXJkSW5kZXggKGluZGV4LCB2aWV3U2l6ZSkge1xuICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSBSdW5cblxuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICByZXR1cm4gaW5kZXggKyAobGVuZ3RoICsgMSlcbiAgICB9XG5cbiAgICBpZiAoR2xpZGUuc2V0dGluZ3MucmV3aW5kKSB7XG4gICAgICAvLyBib3VuZCBkb2VzIGZ1bm55IHRoaW5ncyB3aXRoIHRoZSBsZW5ndGgsIHRoZXJlZm9yIHdlIGhhdmUgdG8gYmUgY2VydGFpblxuICAgICAgLy8gdGhhdCB3ZSBhcmUgb24gZmlyc3QgcG9zc2libGUgaW5kZXggdmFsdWUgYmVmb3JlIHdlIHRvIHJld2luZCB0byB0aGUgbGVuZ3RoIGdpdmVuIGJ5IGJvdW5kXG4gICAgICBpZiAoUnVuLmlzQm91bmQoKSAmJiBSdW4uaXNTdGFydCgpKSB7XG4gICAgICAgIHJldHVybiBsZW5ndGhcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IobGVuZ3RoIC8gdmlld1NpemUpICogdmlld1NpemVcbiAgICB9XG5cbiAgICByZXR1cm4gMFxuICB9XG5cbiAgZGVmaW5lKFJ1biwgJ21vdmUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgbW92ZSBzY2hlbWEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBtb3ZlIHNjaGVtYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0ICh2YWx1ZSkge1xuICAgICAgbGV0IHN0ZXAgPSB2YWx1ZS5zdWJzdHIoMSlcblxuICAgICAgdGhpcy5fbSA9IHtcbiAgICAgICAgZGlyZWN0aW9uOiB2YWx1ZS5zdWJzdHIoMCwgMSksXG4gICAgICAgIHN0ZXBzOiBzdGVwID8gKHRvSW50KHN0ZXApID8gdG9JbnQoc3RlcCkgOiBzdGVwKSA6IDBcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKFJ1biwgJ2xlbmd0aCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBydW5uaW5nIGRpc3RhbmNlIGJhc2VkXG4gICAgICogb24gemVyby1pbmRleGluZyBudW1iZXIgb2Ygc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgeyBzZXR0aW5ncyB9ID0gR2xpZGVcbiAgICAgIGxldCB7IGxlbmd0aCB9ID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlc1xuXG4gICAgICAvLyBJZiB0aGUgYGJvdW5kYCBvcHRpb24gaXMgYWN0aXZlLCBhIG1heGltdW0gcnVubmluZyBkaXN0YW5jZSBzaG91bGQgYmVcbiAgICAgIC8vIHJlZHVjZWQgYnkgYHBlclZpZXdgIGFuZCBgZm9jdXNBdGAgc2V0dGluZ3MuIFJ1bm5pbmcgZGlzdGFuY2VcbiAgICAgIC8vIHNob3VsZCBlbmQgYmVmb3JlIGNyZWF0aW5nIGFuIGVtcHR5IHNwYWNlIGFmdGVyIGluc3RhbmNlLlxuICAgICAgaWYgKHRoaXMuaXNCb3VuZCgpKSB7XG4gICAgICAgIHJldHVybiAobGVuZ3RoIC0gMSkgLSAodG9JbnQoc2V0dGluZ3MucGVyVmlldykgLSAxKSArIHRvSW50KHNldHRpbmdzLmZvY3VzQXQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBsZW5ndGggLSAxXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShSdW4sICdvZmZzZXQnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBzdGF0dXMgb2YgdGhlIG9mZnNldHRpbmcgZmxhZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9vXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBSdW5cbn1cbiIsIi8qKlxuICogUmV0dXJucyBhIGN1cnJlbnQgdGltZS5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3cgKCkge1xuICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKClcbn1cbiIsImltcG9ydCB7IG5vdyB9IGZyb20gJy4vdGltZSdcblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIHdoZW4gaW52b2tlZCwgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZFxuICogYXQgbW9zdCBvbmNlIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmNcbiAqIEBwYXJhbSB7TnVtYmVyfSB3YWl0XG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZSAoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICBsZXQgdGltZW91dCwgY29udGV4dCwgYXJncywgcmVzdWx0XG4gIGxldCBwcmV2aW91cyA9IDBcbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge31cblxuICBsZXQgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHJldmlvdXMgPSBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlID8gMCA6IG5vdygpXG4gICAgdGltZW91dCA9IG51bGxcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGxcbiAgfVxuXG4gIGxldCB0aHJvdHRsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGF0ID0gbm93KClcbiAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gYXRcbiAgICBsZXQgcmVtYWluaW5nID0gd2FpdCAtIChhdCAtIHByZXZpb3VzKVxuICAgIGNvbnRleHQgPSB0aGlzXG4gICAgYXJncyA9IGFyZ3VtZW50c1xuICAgIGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XG4gICAgICBpZiAodGltZW91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICAgICAgdGltZW91dCA9IG51bGxcbiAgICAgIH1cbiAgICAgIHByZXZpb3VzID0gYXRcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncylcbiAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsXG4gICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZylcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgdGhyb3R0bGVkLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICBwcmV2aW91cyA9IDBcbiAgICB0aW1lb3V0ID0gY29udGV4dCA9IGFyZ3MgPSBudWxsXG4gIH1cblxuICByZXR1cm4gdGhyb3R0bGVkXG59XG4iLCJpbXBvcnQgeyB0b0ludCB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJy4uL3V0aWxzL3dhaXQnXG5cbmNvbnN0IE1BUkdJTl9UWVBFID0ge1xuICBsdHI6IFsnbWFyZ2luTGVmdCcsICdtYXJnaW5SaWdodCddLFxuICBydGw6IFsnbWFyZ2luUmlnaHQnLCAnbWFyZ2luTGVmdCddXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IEdhcHMgPSB7XG4gICAgLyoqXG4gICAgICogQXBwbGllcyBnYXBzIGJldHdlZW4gc2xpZGVzLiBGaXJzdCBhbmQgbGFzdFxuICAgICAqIHNsaWRlcyBkbyBub3QgcmVjZWl2ZSBpdCdzIGVkZ2UgbWFyZ2lucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IHNsaWRlc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYXBwbHkgKHNsaWRlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNsaWRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBsZXQgc3R5bGUgPSBzbGlkZXNbaV0uc3R5bGVcbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IENvbXBvbmVudHMuRGlyZWN0aW9uLnZhbHVlXG5cbiAgICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzBdXSA9IGAke3RoaXMudmFsdWUgLyAyfXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMF1dID0gJydcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpICE9PSBzbGlkZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMV1dID0gYCR7dGhpcy52YWx1ZSAvIDJ9cHhgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3R5bGVbTUFSR0lOX1RZUEVbZGlyZWN0aW9uXVsxXV0gPSAnJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgZ2FwcyBmcm9tIHRoZSBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBzbGlkZXNcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAqL1xuICAgIHJlbW92ZSAoc2xpZGVzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2xpZGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGxldCBzdHlsZSA9IHNsaWRlc1tpXS5zdHlsZVxuXG4gICAgICAgIHN0eWxlLm1hcmdpbkxlZnQgPSAnJ1xuICAgICAgICBzdHlsZS5tYXJnaW5SaWdodCA9ICcnXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKEdhcHMsICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBnYXAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdG9JbnQoR2xpZGUuc2V0dGluZ3MuZ2FwKVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoR2FwcywgJ2dyb3cnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhZGRpdGlvbmFsIGRpbWVudGlvbnMgdmFsdWUgY2F1c2VkIGJ5IGdhcHMuXG4gICAgICogVXNlZCB0byBpbmNyZWFzZSB3aWR0aCBvZiB0aGUgc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gR2Fwcy52YWx1ZSAqIChDb21wb25lbnRzLlNpemVzLmxlbmd0aClcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKEdhcHMsICdyZWR1Y3RvcicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHJlZHVjdGlvbiB2YWx1ZSBjYXVzZWQgYnkgZ2Fwcy5cbiAgICAgKiBVc2VkIHRvIHN1YnRyYWN0IHdpZHRoIG9mIHRoZSBzbGlkZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgcGVyVmlldyA9IEdsaWRlLnNldHRpbmdzLnBlclZpZXdcblxuICAgICAgcmV0dXJuIChHYXBzLnZhbHVlICogKHBlclZpZXcgLSAxKSkgLyBwZXJWaWV3XG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBBcHBseSBjYWxjdWxhdGVkIGdhcHM6XG4gICAqIC0gYWZ0ZXIgYnVpbGRpbmcsIHNvIHNsaWRlcyAoaW5jbHVkaW5nIGNsb25lcykgd2lsbCByZWNlaXZlIHByb3BlciBtYXJnaW5zXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSwgdG8gcmVjYWxjdWxhdGUgZ2FwcyB3aXRoIG5ldyBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5hZnRlcicsICd1cGRhdGUnXSwgdGhyb3R0bGUoKCkgPT4ge1xuICAgIEdhcHMuYXBwbHkoQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuY2hpbGRyZW4pXG4gIH0sIDMwKSlcblxuICAvKipcbiAgICogUmVtb3ZlIGdhcHM6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIEdhcHMucmVtb3ZlKENvbXBvbmVudHMuSHRtbC53cmFwcGVyLmNoaWxkcmVuKVxuICB9KVxuXG4gIHJldHVybiBHYXBzXG59XG4iLCIvKipcbiAqIEZpbmRzIHNpYmxpbmdzIG5vZGVzIG9mIHRoZSBwYXNzZWQgbm9kZS5cbiAqXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBub2RlXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNpYmxpbmdzIChub2RlKSB7XG4gIGlmIChub2RlICYmIG5vZGUucGFyZW50Tm9kZSkge1xuICAgIGxldCBuID0gbm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGRcbiAgICBsZXQgbWF0Y2hlZCA9IFtdXG5cbiAgICBmb3IgKDsgbjsgbiA9IG4ubmV4dFNpYmxpbmcpIHtcbiAgICAgIGlmIChuLm5vZGVUeXBlID09PSAxICYmIG4gIT09IG5vZGUpIHtcbiAgICAgICAgbWF0Y2hlZC5wdXNoKG4pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hdGNoZWRcbiAgfVxuXG4gIHJldHVybiBbXVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiBwYXNzZWQgbm9kZSBleGlzdCBhbmQgaXMgYSB2YWxpZCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IG5vZGVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGlzdCAobm9kZSkge1xuICBpZiAobm9kZSAmJiBub2RlIGluc3RhbmNlb2Ygd2luZG93LkhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuIiwiaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uL3V0aWxzL2xvZydcbmltcG9ydCB7IGV4aXN0IH0gZnJvbSAnLi4vdXRpbHMvZG9tJ1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICcuLi91dGlscy91bml0J1xuXG5jb25zdCBUUkFDS19TRUxFQ1RPUiA9ICdbZGF0YS1nbGlkZS1lbD1cInRyYWNrXCJdJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgY29uc3QgSHRtbCA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cCBzbGlkZXIgSFRNTCBub2Rlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7R2xpZGV9IGdsaWRlXG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5yb290ID0gR2xpZGUuc2VsZWN0b3JcbiAgICAgIHRoaXMudHJhY2sgPSB0aGlzLnJvb3QucXVlcnlTZWxlY3RvcihUUkFDS19TRUxFQ1RPUilcbiAgICAgIHRoaXMuc2xpZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy53cmFwcGVyLmNoaWxkcmVuKS5maWx0ZXIoKHNsaWRlKSA9PiB7XG4gICAgICAgIHJldHVybiAhc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuY2xvbmVTbGlkZSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKEh0bWwsICdyb290Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgbm9kZSBvZiB0aGUgZ2xpZGUgbWFpbiBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gSHRtbC5fclxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIG5vZGUgb2YgdGhlIGdsaWRlIG1haW4gZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBzZXQgKHIpIHtcbiAgICAgIGlmIChpc1N0cmluZyhyKSkge1xuICAgICAgICByID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihyKVxuICAgICAgfVxuXG4gICAgICBpZiAoZXhpc3QocikpIHtcbiAgICAgICAgSHRtbC5fciA9IHJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oJ1Jvb3QgZWxlbWVudCBtdXN0IGJlIGEgZXhpc3RpbmcgSHRtbCBub2RlJylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKEh0bWwsICd0cmFjaycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIG5vZGUgb2YgdGhlIGdsaWRlIHRyYWNrIHdpdGggc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gSHRtbC5fdFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIG5vZGUgb2YgdGhlIGdsaWRlIHRyYWNrIHdpdGggc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNldCAodCkge1xuICAgICAgaWYgKGV4aXN0KHQpKSB7XG4gICAgICAgIEh0bWwuX3QgPSB0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKGBDb3VsZCBub3QgZmluZCB0cmFjayBlbGVtZW50LiBQbGVhc2UgdXNlICR7VFJBQ0tfU0VMRUNUT1J9IGF0dHJpYnV0ZS5gKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoSHRtbCwgJ3dyYXBwZXInLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBub2RlIG9mIHRoZSBzbGlkZXMgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIEh0bWwudHJhY2suY2hpbGRyZW5bMF1cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIEh0bWxcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCB7IHRvSW50LCBpc09iamVjdCB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IFBlZWsgPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXBzIGhvdyBtdWNoIHRvIHBlZWsgYmFzZWQgb24gc2V0dGluZ3MuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBHbGlkZS5zZXR0aW5ncy5wZWVrXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKFBlZWssICd2YWx1ZScsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBwZWVrLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcnxPYmplY3R9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBQZWVrLl92XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgb2YgdGhlIHBlZWsuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IHZhbHVlXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXQgKHZhbHVlKSB7XG4gICAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlLmJlZm9yZSA9IHRvSW50KHZhbHVlLmJlZm9yZSlcbiAgICAgICAgdmFsdWUuYWZ0ZXIgPSB0b0ludCh2YWx1ZS5hZnRlcilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gdG9JbnQodmFsdWUpXG4gICAgICB9XG5cbiAgICAgIFBlZWsuX3YgPSB2YWx1ZVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoUGVlaywgJ3JlZHVjdG9yJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgcmVkdWN0aW9uIHZhbHVlIGNhdXNlZCBieSBwZWVrLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgbGV0IHZhbHVlID0gUGVlay52YWx1ZVxuICAgICAgbGV0IHBlclZpZXcgPSBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3XG5cbiAgICAgIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuICh2YWx1ZS5iZWZvcmUgLyBwZXJWaWV3KSArICh2YWx1ZS5hZnRlciAvIHBlclZpZXcpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZSAqIDIgLyBwZXJWaWV3XG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZWNhbGN1bGF0ZSBwZWVraW5nIHNpemVzIG9uOlxuICAgKiAtIHdoZW4gcmVzaXppbmcgd2luZG93IHRvIHVwZGF0ZSB0byBwcm9wZXIgcGVyY2VudHNcbiAgICovXG4gIEV2ZW50cy5vbihbJ3Jlc2l6ZScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIFBlZWsubW91bnQoKVxuICB9KVxuXG4gIHJldHVybiBQZWVrXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgeyB0b0ludCwgaXNVbmRlZmluZWQgfSBmcm9tICcuLi91dGlscy91bml0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBNb3ZlID0ge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgbW92ZSBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLl9vID0gMFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIGEgbW92ZW1lbnQgdmFsdWUgYmFzZWQgb24gcGFzc2VkIG9mZnNldCBhbmQgY3VycmVudGx5IGFjdGl2ZSBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gb2Zmc2V0XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtYWtlIChvZmZzZXQgPSAwKSB7XG4gICAgICB0aGlzLm9mZnNldCA9IG9mZnNldFxuXG4gICAgICBFdmVudHMuZW1pdCgnbW92ZScsIHtcbiAgICAgICAgbW92ZW1lbnQ6IHRoaXMudmFsdWVcbiAgICAgIH0pXG5cbiAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcigoKSA9PiB7XG4gICAgICAgIEV2ZW50cy5lbWl0KCdtb3ZlLmFmdGVyJywge1xuICAgICAgICAgIG1vdmVtZW50OiB0aGlzLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShNb3ZlLCAnb2Zmc2V0Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYW4gb2Zmc2V0IHZhbHVlIHVzZWQgdG8gbW9kaWZ5IGN1cnJlbnQgdHJhbnNsYXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gTW92ZS5fb1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFuIG9mZnNldCB2YWx1ZSB1c2VkIHRvIG1vZGlmeSBjdXJyZW50IHRyYW5zbGF0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBzZXQgKHZhbHVlKSB7XG4gICAgICBNb3ZlLl9vID0gIWlzVW5kZWZpbmVkKHZhbHVlKSA/IHRvSW50KHZhbHVlKSA6IDBcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKE1vdmUsICd0cmFuc2xhdGUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhIHJhdyBtb3ZlbWVudCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCAqIEdsaWRlLmluZGV4XG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShNb3ZlLCAndmFsdWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBhY3R1YWwgbW92ZW1lbnQgdmFsdWUgY29ycmVjdGVkIGJ5IG9mZnNldC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgbGV0IG9mZnNldCA9IHRoaXMub2Zmc2V0XG4gICAgICBsZXQgdHJhbnNsYXRlID0gdGhpcy50cmFuc2xhdGVcblxuICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRlICsgb2Zmc2V0XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBvZmZzZXRcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIE1ha2UgbW92ZW1lbnQgdG8gcHJvcGVyIHNsaWRlIG9uOlxuICAgKiAtIGJlZm9yZSBidWlsZCwgc28gZ2xpZGUgd2lsbCBzdGFydCBhdCBgc3RhcnRBdGAgaW5kZXhcbiAgICogLSBvbiBlYWNoIHN0YW5kYXJkIHJ1biB0byBtb3ZlIHRvIG5ld2x5IGNhbGN1bGF0ZWQgaW5kZXhcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmJlZm9yZScsICdydW4nXSwgKCkgPT4ge1xuICAgIE1vdmUubWFrZSgpXG4gIH0pXG5cbiAgcmV0dXJuIE1vdmVcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgU2l6ZXMgPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXBzIGRpbWVudGlvbnMgb2Ygc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXR1cFNsaWRlcyAoKSB7XG4gICAgICBsZXQgd2lkdGggPSBgJHt0aGlzLnNsaWRlV2lkdGh9cHhgXG4gICAgICBsZXQgc2xpZGVzID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlc1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzbGlkZXNbaV0uc3R5bGUud2lkdGggPSB3aWR0aFxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXR1cHMgZGltZW50aW9ucyBvZiBzbGlkZXMgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0dXBXcmFwcGVyICgpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLndpZHRoID0gYCR7dGhpcy53cmFwcGVyU2l6ZX1weGBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhcHBsaWVkIHN0eWxlcyBmcm9tIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmUgKCkge1xuICAgICAgbGV0IHNsaWRlcyA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXNcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2xpZGVzW2ldLnN0eWxlLndpZHRoID0gJydcbiAgICAgIH1cblxuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUud2lkdGggPSAnJ1xuICAgIH1cbiAgfVxuXG4gIGRlZmluZShTaXplcywgJ2xlbmd0aCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGNvdW50IG51bWJlciBvZiB0aGUgc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gQ29tcG9uZW50cy5IdG1sLnNsaWRlcy5sZW5ndGhcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKFNpemVzLCAnd2lkdGgnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB3aWR0aCB2YWx1ZSBvZiB0aGUgc2xpZGVyICh2aXNpYmxlIGFyZWEpLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gQ29tcG9uZW50cy5IdG1sLnJvb3Qub2Zmc2V0V2lkdGhcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKFNpemVzLCAnd3JhcHBlclNpemUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBzaXplIG9mIHRoZSBzbGlkZXMgd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIFNpemVzLnNsaWRlV2lkdGggKiBTaXplcy5sZW5ndGggKyBDb21wb25lbnRzLkdhcHMuZ3JvdyArIENvbXBvbmVudHMuQ2xvbmVzLmdyb3dcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKFNpemVzLCAnc2xpZGVXaWR0aCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHdpZHRoIHZhbHVlIG9mIGEgc2luZ2xlIHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gKFNpemVzLndpZHRoIC8gR2xpZGUuc2V0dGluZ3MucGVyVmlldykgLSBDb21wb25lbnRzLlBlZWsucmVkdWN0b3IgLSBDb21wb25lbnRzLkdhcHMucmVkdWN0b3JcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIEFwcGx5IGNhbGN1bGF0ZWQgZ2xpZGUncyBkaW1lbnNpb25zOlxuICAgKiAtIGJlZm9yZSBidWlsZGluZywgc28gb3RoZXIgZGltZW50aW9ucyAoZS5nLiB0cmFuc2xhdGUpIHdpbGwgYmUgY2FsY3VsYXRlZCBwcm9wZXJ0bHlcbiAgICogLSB3aGVuIHJlc2l6aW5nIHdpbmRvdyB0byByZWNhbGN1bGF0ZSBzaWxkZXMgZGltZW5zaW9uc1xuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEksIHRvIGNhbGN1bGF0ZSBkaW1lbnNpb25zIGJhc2VkIG9uIG5ldyBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAncmVzaXplJywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgU2l6ZXMuc2V0dXBTbGlkZXMoKVxuICAgIFNpemVzLnNldHVwV3JhcHBlcigpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjYWxjdWxhdGVkIGdsaWRlJ3MgZGltZW5zaW9uczpcbiAgICogLSBvbiBkZXN0b3RpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBTaXplcy5yZW1vdmUoKVxuICB9KVxuXG4gIHJldHVybiBTaXplc1xufVxuIiwiaW1wb3J0IHsgc2libGluZ3MgfSBmcm9tICcuLi91dGlscy9kb20nXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IEJ1aWxkID0ge1xuICAgIC8qKlxuICAgICAqIEluaXQgZ2xpZGUgYnVpbGRpbmcuIEFkZHMgY2xhc3Nlcywgc2V0c1xuICAgICAqIGRpbWVuc2lvbnMgYW5kIHNldHVwcyBpbml0aWFsIHN0YXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICBFdmVudHMuZW1pdCgnYnVpbGQuYmVmb3JlJylcblxuICAgICAgdGhpcy50eXBlQ2xhc3MoKVxuICAgICAgdGhpcy5hY3RpdmVDbGFzcygpXG5cbiAgICAgIEV2ZW50cy5lbWl0KCdidWlsZC5hZnRlcicpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYHR5cGVgIGNsYXNzIHRvIHRoZSBnbGlkZSBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB0eXBlQ2xhc3MgKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LmFkZChHbGlkZS5zZXR0aW5ncy5jbGFzc2VzW0dsaWRlLnNldHRpbmdzLnR5cGVdKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhY3RpdmVDbGFzcyAoKSB7XG4gICAgICBsZXQgY2xhc3NlcyA9IEdsaWRlLnNldHRpbmdzLmNsYXNzZXNcbiAgICAgIGxldCBzbGlkZSA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXNbR2xpZGUuaW5kZXhdXG5cbiAgICAgIGlmIChzbGlkZSkge1xuICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuYWN0aXZlU2xpZGUpXG5cbiAgICAgICAgc2libGluZ3Moc2xpZGUpLmZvckVhY2goKHNpYmxpbmcpID0+IHtcbiAgICAgICAgICBzaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlcy5hY3RpdmVTbGlkZSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBIVE1MIGNsYXNzZXMgYXBwbGllZCBhdCBidWlsZGluZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3NlcyAoKSB7XG4gICAgICBsZXQgY2xhc3NlcyA9IEdsaWRlLnNldHRpbmdzLmNsYXNzZXNcblxuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LnJlbW92ZShjbGFzc2VzW0dsaWRlLnNldHRpbmdzLnR5cGVdKVxuXG4gICAgICBDb21wb25lbnRzLkh0bWwuc2xpZGVzLmZvckVhY2goKHNpYmxpbmcpID0+IHtcbiAgICAgICAgc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzZXMuYWN0aXZlU2xpZGUpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBidWlsZGluZyBjbGFzc2VzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gYnJpbmcgSFRNTCB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKiAtIG9uIHVwZGF0aW5nIHRvIHJlbW92ZSBjbGFzc2VzIGJlZm9yZSByZW1vdW50aW5nIGNvbXBvbmVudFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIEJ1aWxkLnJlbW92ZUNsYXNzZXMoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdW50IGNvbXBvbmVudDpcbiAgICogLSBvbiByZXNpemluZyBvZiB0aGUgd2luZG93IHRvIGNhbGN1bGF0ZSBuZXcgZGltZW50aW9uc1xuICAgKiAtIG9uIHVwZGF0aW5nIHNldHRpbmdzIHZpYSBBUElcbiAgICovXG4gIEV2ZW50cy5vbihbJ3Jlc2l6ZScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIEJ1aWxkLm1vdW50KClcbiAgfSlcblxuICAvKipcbiAgICogU3dhcCBhY3RpdmUgY2xhc3Mgb2YgY3VycmVudCBzbGlkZTpcbiAgICogLSBhZnRlciBlYWNoIG1vdmUgdG8gdGhlIG5ldyBpbmRleFxuICAgKi9cbiAgRXZlbnRzLm9uKCdtb3ZlLmFmdGVyJywgKCkgPT4ge1xuICAgIEJ1aWxkLmFjdGl2ZUNsYXNzKClcbiAgfSlcblxuICByZXR1cm4gQnVpbGRcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgQ2xvbmVzID0ge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBwYXR0ZXJuIG1hcCBhbmQgY29sbGVjdCBzbGlkZXMgdG8gYmUgY2xvbmVkLlxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuaXRlbXMgPSBbXVxuXG4gICAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLmNvbGxlY3QoKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0IGNsb25lcyB3aXRoIHBhdHRlcm4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtbXX1cbiAgICAgKi9cbiAgICBjb2xsZWN0IChpdGVtcyA9IFtdKSB7XG4gICAgICBsZXQgeyBzbGlkZXMgfSA9IENvbXBvbmVudHMuSHRtbFxuICAgICAgbGV0IHsgcGVyVmlldywgY2xhc3NlcyB9ID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgY29uc3QgcGVla0luY3JlbWVudGVyID0gKyEhR2xpZGUuc2V0dGluZ3MucGVla1xuICAgICAgY29uc3QgY2xvbmVDb3VudCA9IHBlclZpZXcgKyBwZWVrSW5jcmVtZW50ZXIgKyBNYXRoLnJvdW5kKHBlclZpZXcgLyAyKVxuICAgICAgY29uc3QgYXBwZW5kID0gc2xpZGVzLnNsaWNlKDAsIGNsb25lQ291bnQpLnJldmVyc2UoKVxuICAgICAgY29uc3QgcHJlcGVuZCA9IHNsaWRlcy5zbGljZShjbG9uZUNvdW50ICogLTEpXG5cbiAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihwZXJWaWV3IC8gc2xpZGVzLmxlbmd0aCkpOyByKyspIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcHBlbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgY2xvbmUgPSBhcHBlbmRbaV0uY2xvbmVOb2RlKHRydWUpXG5cbiAgICAgICAgICBjbG9uZS5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuY2xvbmVTbGlkZSlcblxuICAgICAgICAgIGl0ZW1zLnB1c2goY2xvbmUpXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXBlbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgY2xvbmUgPSBwcmVwZW5kW2ldLmNsb25lTm9kZSh0cnVlKVxuXG4gICAgICAgICAgY2xvbmUuY2xhc3NMaXN0LmFkZChjbGFzc2VzLmNsb25lU2xpZGUpXG5cbiAgICAgICAgICBpdGVtcy51bnNoaWZ0KGNsb25lKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpdGVtc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBcHBlbmQgY2xvbmVkIHNsaWRlcyB3aXRoIGdlbmVyYXRlZCBwYXR0ZXJuLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhcHBlbmQgKCkge1xuICAgICAgbGV0IHsgaXRlbXMgfSA9IHRoaXNcbiAgICAgIGxldCB7IHdyYXBwZXIsIHNsaWRlcyB9ID0gQ29tcG9uZW50cy5IdG1sXG5cbiAgICAgIGNvbnN0IGhhbGYgPSBNYXRoLmZsb29yKGl0ZW1zLmxlbmd0aCAvIDIpXG4gICAgICBjb25zdCBwcmVwZW5kID0gaXRlbXMuc2xpY2UoMCwgaGFsZikucmV2ZXJzZSgpXG4gICAgICBjb25zdCBhcHBlbmQgPSBpdGVtcy5zbGljZShoYWxmICogLTEpLnJldmVyc2UoKVxuICAgICAgY29uc3Qgd2lkdGggPSBgJHtDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGh9cHhgXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXBwZW5kLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoYXBwZW5kW2ldKVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXBlbmQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgd3JhcHBlci5pbnNlcnRCZWZvcmUocHJlcGVuZFtpXSwgc2xpZGVzWzBdKVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZW1zW2ldLnN0eWxlLndpZHRoID0gd2lkdGhcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBjbG9uZWQgc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmUgKCkge1xuICAgICAgbGV0IHsgaXRlbXMgfSA9IHRoaXNcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5yZW1vdmVDaGlsZChpdGVtc1tpXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZWZpbmUoQ2xvbmVzLCAnZ3JvdycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGFkZGl0aW9uYWwgZGltZW50aW9ucyB2YWx1ZSBjYXVzZWQgYnkgY2xvbmVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gKENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCArIENvbXBvbmVudHMuR2Fwcy52YWx1ZSkgKiBDbG9uZXMuaXRlbXMubGVuZ3RoXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBBcHBlbmQgYWRkaXRpb25hbCBzbGlkZSdzIGNsb25lczpcbiAgICogLSB3aGlsZSBnbGlkZSdzIHR5cGUgaXMgYGNhcm91c2VsYFxuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgQ2xvbmVzLnJlbW92ZSgpXG4gICAgQ2xvbmVzLm1vdW50KClcbiAgICBDbG9uZXMuYXBwZW5kKClcbiAgfSlcblxuICAvKipcbiAgICogQXBwZW5kIGFkZGl0aW9uYWwgc2xpZGUncyBjbG9uZXM6XG4gICAqIC0gd2hpbGUgZ2xpZGUncyB0eXBlIGlzIGBjYXJvdXNlbGBcbiAgICovXG4gIEV2ZW50cy5vbignYnVpbGQuYmVmb3JlJywgKCkgPT4ge1xuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykpIHtcbiAgICAgIENsb25lcy5hcHBlbmQoKVxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogUmVtb3ZlIGNsb25lcyBIVE1MRWxlbWVudHM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gYnJpbmcgSFRNTCB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIENsb25lcy5yZW1vdmUoKVxuICB9KVxuXG4gIHJldHVybiBDbG9uZXNcbn1cbiIsImltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vLi4vdXRpbHMvdW5pdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRzQmluZGVyIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdCBhIEV2ZW50c0JpbmRlciBpbnN0YW5jZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChsaXN0ZW5lcnMgPSB7fSkge1xuICAgIHRoaXMubGlzdGVuZXJzID0gbGlzdGVuZXJzXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBldmVudHMgbGlzdGVuZXJzIHRvIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gIHtTdHJpbmd8QXJyYXl9IGV2ZW50c1xuICAgKiBAcGFyYW0gIHtFbGVtZW50fFdpbmRvd3xEb2N1bWVudH0gZWxcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGNsb3N1cmVcbiAgICogQHBhcmFtICB7Qm9vbGVhbnxPYmplY3R9IGNhcHR1cmVcbiAgICogQHJldHVybiB7Vm9pZH1cbiAgICovXG4gIG9uIChldmVudHMsIGVsLCBjbG9zdXJlLCBjYXB0dXJlID0gZmFsc2UpIHtcbiAgICBpZiAoaXNTdHJpbmcoZXZlbnRzKSkge1xuICAgICAgZXZlbnRzID0gW2V2ZW50c11cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRzW2ldXSA9IGNsb3N1cmVcblxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudHNbaV0sIHRoaXMubGlzdGVuZXJzW2V2ZW50c1tpXV0sIGNhcHR1cmUpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzIGZyb20gYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAqXG4gICAqIEBwYXJhbSAge1N0cmluZ3xBcnJheX0gZXZlbnRzXG4gICAqIEBwYXJhbSAge0VsZW1lbnR8V2luZG93fERvY3VtZW50fSBlbFxuICAgKiBAcGFyYW0gIHtCb29sZWFufE9iamVjdH0gY2FwdHVyZVxuICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgKi9cbiAgb2ZmIChldmVudHMsIGVsLCBjYXB0dXJlID0gZmFsc2UpIHtcbiAgICBpZiAoaXNTdHJpbmcoZXZlbnRzKSkge1xuICAgICAgZXZlbnRzID0gW2V2ZW50c11cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHNbaV0sIHRoaXMubGlzdGVuZXJzW2V2ZW50c1tpXV0sIGNhcHR1cmUpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgY29sbGVjdGVkIGxpc3RlbmVycy5cbiAgICpcbiAgICogQHJldHVybnMge1ZvaWR9XG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnNcbiAgfVxufVxuIiwiaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICcuLi91dGlscy93YWl0J1xuXG5pbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICBjb25zdCBSZXNpemUgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgd2luZG93IGJpbmRpbmdzLlxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuYmluZCgpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIGByZXpzaXplYCBsaXN0ZW5lciB0byB0aGUgd2luZG93LlxuICAgICAqIEl0J3MgYSBjb3N0bHkgZXZlbnQsIHNvIHdlIGFyZSBkZWJvdW5jaW5nIGl0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kICgpIHtcbiAgICAgIEJpbmRlci5vbigncmVzaXplJywgd2luZG93LCB0aHJvdHRsZSgoKSA9PiB7XG4gICAgICAgIEV2ZW50cy5lbWl0KCdyZXNpemUnKVxuICAgICAgfSwgR2xpZGUuc2V0dGluZ3MudGhyb3R0bGUpKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIGxpc3RlbmVycyBmcm9tIHRoZSB3aW5kb3cuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKCdyZXNpemUnLCB3aW5kb3cpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBiaW5kaW5ncyBmcm9tIHdpbmRvdzpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byByZW1vdmUgYWRkZWQgRXZlbnRMaXN0ZW5lclxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIFJlc2l6ZS51bmJpbmQoKVxuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gUmVzaXplXG59XG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuXG5jb25zdCBWQUxJRF9ESVJFQ1RJT05TID0gWydsdHInLCAncnRsJ11cbmNvbnN0IEZMSVBFRF9NT1ZFTUVOVFMgPSB7XG4gICc+JzogJzwnLFxuICAnPCc6ICc+JyxcbiAgJz0nOiAnPSdcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgRGlyZWN0aW9uID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwcyBnYXAgdmFsdWUgYmFzZWQgb24gc2V0dGluZ3MuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBHbGlkZS5zZXR0aW5ncy5kaXJlY3Rpb25cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVzb2x2ZXMgcGF0dGVybiBiYXNlZCBvbiBkaXJlY3Rpb24gdmFsdWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXR0ZXJuXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICByZXNvbHZlIChwYXR0ZXJuKSB7XG4gICAgICBsZXQgdG9rZW4gPSBwYXR0ZXJuLnNsaWNlKDAsIDEpXG5cbiAgICAgIGlmICh0aGlzLmlzKCdydGwnKSkge1xuICAgICAgICByZXR1cm4gcGF0dGVybi5zcGxpdCh0b2tlbikuam9pbihGTElQRURfTU9WRU1FTlRTW3Rva2VuXSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhdHRlcm5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHZhbHVlIG9mIGRpcmVjdGlvbiBtb2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdGlvblxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzIChkaXJlY3Rpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBkaXJlY3Rpb25cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBkaXJlY3Rpb24gY2xhc3MgdG8gdGhlIHJvb3QgSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZGRDbGFzcyAoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKEdsaWRlLnNldHRpbmdzLmNsYXNzZXMuZGlyZWN0aW9uW3RoaXMudmFsdWVdKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGRpcmVjdGlvbiBjbGFzcyBmcm9tIHRoZSByb290IEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3MgKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LnJlbW92ZShHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvblt0aGlzLnZhbHVlXSlcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoRGlyZWN0aW9uLCAndmFsdWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgZGlyZWN0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIERpcmVjdGlvbi5fdlxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBkaXJlY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldCAodmFsdWUpIHtcbiAgICAgIGlmIChWQUxJRF9ESVJFQ1RJT05TLmluZGV4T2YodmFsdWUpID4gLTEpIHtcbiAgICAgICAgRGlyZWN0aW9uLl92ID0gdmFsdWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhcm4oJ0RpcmVjdGlvbiB2YWx1ZSBtdXN0IGJlIGBsdHJgIG9yIGBydGxgJylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIENsZWFyIGRpcmVjdGlvbiBjbGFzczpcbiAgICogLSBvbiBkZXN0cm95IHRvIGJyaW5nIEhUTUwgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICogLSBvbiB1cGRhdGUgdG8gcmVtb3ZlIGNsYXNzIGJlZm9yZSByZWFwcGxpbmcgYmVsbG93XG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgRGlyZWN0aW9uLnJlbW92ZUNsYXNzKClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnQ6XG4gICAqIC0gb24gdXBkYXRlIHRvIHJlZmxlY3QgY2hhbmdlcyBpbiBkaXJlY3Rpb24gdmFsdWVcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgKCkgPT4ge1xuICAgIERpcmVjdGlvbi5tb3VudCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIEFwcGx5IGRpcmVjdGlvbiBjbGFzczpcbiAgICogLSBiZWZvcmUgYnVpbGRpbmcgdG8gYXBwbHkgY2xhc3MgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAqIC0gb24gdXBkYXRpbmcgdG8gcmVhcHBseSBkaXJlY3Rpb24gY2xhc3MgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYmVmb3JlJywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgRGlyZWN0aW9uLmFkZENsYXNzKClcbiAgfSlcblxuICByZXR1cm4gRGlyZWN0aW9uXG59XG4iLCIvKipcbiAqIFJlZmxlY3RzIHZhbHVlIG9mIGdsaWRlIG1vdmVtZW50LlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBOZWdhdGVzIHRoZSBwYXNzZWQgdHJhbnNsYXRlIGlmIGdsaWRlIGlzIGluIFJUTCBvcHRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnkgKHRyYW5zbGF0ZSkge1xuICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICByZXR1cm4gLXRyYW5zbGF0ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlXG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIFVwZGF0ZXMgZ2xpZGUgbW92ZW1lbnQgd2l0aCBhIGBnYXBgIHNldHRpbmdzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBNb2RpZmllcyBwYXNzZWQgdHJhbnNsYXRlIHZhbHVlIHdpdGggbnVtYmVyIGluIHRoZSBgZ2FwYCBzZXR0aW5ncy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeSAodHJhbnNsYXRlKSB7XG4gICAgICBjb25zdCBtdWx0aXBsaWVyID0gTWF0aC5mbG9vcih0cmFuc2xhdGUgLyBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGgpXG4gICAgICByZXR1cm4gdHJhbnNsYXRlICsgKENvbXBvbmVudHMuR2Fwcy52YWx1ZSAqIG11bHRpcGxpZXIpXG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIFVwZGF0ZXMgZ2xpZGUgbW92ZW1lbnQgd2l0aCB3aWR0aCBvZiBhZGRpdGlvbmFsIGNsb25lcyB3aWR0aC5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogQWRkcyB0byB0aGUgcGFzc2VkIHRyYW5zbGF0ZSB3aWR0aCBvZiB0aGUgaGFsZiBvZiBjbG9uZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnkgKHRyYW5zbGF0ZSkge1xuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSArIChDb21wb25lbnRzLkNsb25lcy5ncm93IC8gMilcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvdW5pdCdcblxuLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggYSBgcGVla2Agc2V0dGluZ3MuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIE1vZGlmaWVzIHBhc3NlZCB0cmFuc2xhdGUgdmFsdWUgd2l0aCBhIGBwZWVrYCBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5ICh0cmFuc2xhdGUpIHtcbiAgICAgIGlmIChHbGlkZS5zZXR0aW5ncy5mb2N1c0F0ID49IDApIHtcbiAgICAgICAgbGV0IHBlZWsgPSBDb21wb25lbnRzLlBlZWsudmFsdWVcblxuICAgICAgICBpZiAoaXNPYmplY3QocGVlaykpIHtcbiAgICAgICAgICByZXR1cm4gdHJhbnNsYXRlIC0gcGVlay5iZWZvcmVcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cmFuc2xhdGUgLSBwZWVrXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGVcbiAgICB9XG4gIH1cbn1cbiIsIi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIGEgYGZvY3VzQXRgIHNldHRpbmdzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBNb2RpZmllcyBwYXNzZWQgdHJhbnNsYXRlIHZhbHVlIHdpdGggaW5kZXggaW4gdGhlIGBmb2N1c0F0YCBzZXR0aW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5ICh0cmFuc2xhdGUpIHtcbiAgICAgIGxldCBnYXAgPSBDb21wb25lbnRzLkdhcHMudmFsdWVcbiAgICAgIGxldCB3aWR0aCA9IENvbXBvbmVudHMuU2l6ZXMud2lkdGhcbiAgICAgIGxldCBmb2N1c0F0ID0gR2xpZGUuc2V0dGluZ3MuZm9jdXNBdFxuICAgICAgbGV0IHNsaWRlV2lkdGggPSBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGhcblxuICAgICAgaWYgKGZvY3VzQXQgPT09ICdjZW50ZXInKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2xhdGUgLSAod2lkdGggLyAyIC0gc2xpZGVXaWR0aCAvIDIpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGUgLSAoc2xpZGVXaWR0aCAqIGZvY3VzQXQpIC0gKGdhcCAqIGZvY3VzQXQpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbmltcG9ydCBSdGwgZnJvbSAnLi90cmFuc2Zvcm1lcnMvcnRsJ1xuaW1wb3J0IEdhcCBmcm9tICcuL3RyYW5zZm9ybWVycy9nYXAnXG5pbXBvcnQgR3JvdyBmcm9tICcuL3RyYW5zZm9ybWVycy9ncm93J1xuaW1wb3J0IFBlZWtpbmcgZnJvbSAnLi90cmFuc2Zvcm1lcnMvcGVla2luZydcbmltcG9ydCBGb2N1c2luZyBmcm9tICcuL3RyYW5zZm9ybWVycy9mb2N1c2luZydcblxuLyoqXG4gKiBBcHBsaWVzIGRpZmZyZW50IHRyYW5zZm9ybWVycyBvbiB0cmFuc2xhdGUgdmFsdWUuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBNZXJnZSBpbnN0YW5jZSB0cmFuc2Zvcm1lcnMgd2l0aCBjb2xsZWN0aW9uIG9mIGRlZmF1bHQgdHJhbnNmb3JtZXJzLlxuICAgKiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZSBSdGwgY29tcG9uZW50IGJlIGxhc3Qgb24gdGhlIGxpc3QsXG4gICAqIHNvIGl0IHJlZmxlY3RzIGFsbCBwcmV2aW91cyB0cmFuc2Zvcm1hdGlvbnMuXG4gICAqXG4gICAqIEB0eXBlIHtBcnJheX1cbiAgICovXG4gIGxldCBUUkFOU0ZPUk1FUlMgPSBbXG4gICAgR2FwLFxuICAgIEdyb3csXG4gICAgUGVla2luZyxcbiAgICBGb2N1c2luZ1xuICBdLmNvbmNhdChHbGlkZS5fdCwgW1J0bF0pXG5cbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBQaXBsaW5lcyB0cmFuc2xhdGUgdmFsdWUgd2l0aCByZWdpc3RlcmVkIHRyYW5zZm9ybWVycy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG11dGF0ZSAodHJhbnNsYXRlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IFRSQU5TRk9STUVSUy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdHJhbnNmb3JtZXIgPSBUUkFOU0ZPUk1FUlNbaV1cblxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0cmFuc2Zvcm1lcikgJiYgaXNGdW5jdGlvbih0cmFuc2Zvcm1lcigpLm1vZGlmeSkpIHtcbiAgICAgICAgICB0cmFuc2xhdGUgPSB0cmFuc2Zvcm1lcihHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKS5tb2RpZnkodHJhbnNsYXRlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdhcm4oJ1RyYW5zZm9ybWVyIHNob3VsZCBiZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBgbW9kaWZ5KClgIG1ldGhvZCcpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IG11dGF0b3IgZnJvbSAnLi4vbXV0YXRvci9pbmRleCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgVHJhbnNsYXRlID0ge1xuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgb2YgdHJhbnNsYXRlIG9uIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0ICh2YWx1ZSkge1xuICAgICAgbGV0IHRyYW5zZm9ybSA9IG11dGF0b3IoR2xpZGUsIENvbXBvbmVudHMpLm11dGF0ZSh2YWx1ZSlcblxuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7LTEgKiB0cmFuc2Zvcm19cHgsIDBweCwgMHB4KWBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB2YWx1ZSBvZiB0cmFuc2xhdGUgZnJvbSBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZSAoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAnJ1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0U3RhcnRJbmRleCAoKSB7XG4gICAgICBjb25zdCBsZW5ndGggPSBDb21wb25lbnRzLlNpemVzLmxlbmd0aFxuICAgICAgY29uc3QgaW5kZXggPSBHbGlkZS5pbmRleFxuICAgICAgY29uc3QgcGVyVmlldyA9IEdsaWRlLnNldHRpbmdzLnBlclZpZXdcblxuICAgICAgaWYgKENvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCc+JykgfHwgQ29tcG9uZW50cy5SdW4uaXNPZmZzZXQoJ3w+JykpIHtcbiAgICAgICAgcmV0dXJuIGxlbmd0aCArIChpbmRleCAtIHBlclZpZXcpXG4gICAgICB9XG5cbiAgICAgIC8vIFwibW9kdWxvIGxlbmd0aFwiIGNvbnZlcnRzIGFuIGluZGV4IHRoYXQgZXF1YWxzIGxlbmd0aCB0byB6ZXJvXG4gICAgICByZXR1cm4gKGluZGV4ICsgcGVyVmlldykgJSBsZW5ndGhcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldFRyYXZlbERpc3RhbmNlICgpIHtcbiAgICAgIGNvbnN0IHRyYXZlbERpc3RhbmNlID0gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICogR2xpZGUuc2V0dGluZ3MucGVyVmlld1xuXG4gICAgICBpZiAoQ29tcG9uZW50cy5SdW4uaXNPZmZzZXQoJz4nKSB8fCBDb21wb25lbnRzLlJ1bi5pc09mZnNldCgnfD4nKSkge1xuICAgICAgICAvLyByZXZlcnNlIHRyYXZlbCBkaXN0YW5jZSBzbyB0aGF0IHdlIGRvbid0IGhhdmUgdG8gY2hhbmdlIHN1YnRyYWN0IG9wZXJhdGlvbnNcbiAgICAgICAgcmV0dXJuIHRyYXZlbERpc3RhbmNlICogLTFcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYXZlbERpc3RhbmNlXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBuZXcgdHJhbnNsYXRlIHZhbHVlOlxuICAgKiAtIG9uIG1vdmUgdG8gcmVmbGVjdCBpbmRleCBjaGFuZ2VcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJIHRvIHJlZmxlY3QgcG9zc2libGUgY2hhbmdlcyBpbiBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oJ21vdmUnLCAoY29udGV4dCkgPT4ge1xuICAgIGlmICghR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpIHx8ICFDb21wb25lbnRzLlJ1bi5pc09mZnNldCgpKSB7XG4gICAgICByZXR1cm4gVHJhbnNsYXRlLnNldChjb250ZXh0Lm1vdmVtZW50KVxuICAgIH1cblxuICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcigoKSA9PiB7XG4gICAgICBFdmVudHMuZW1pdCgndHJhbnNsYXRlLmp1bXAnKVxuXG4gICAgICBUcmFuc2xhdGUuc2V0KENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCAqIEdsaWRlLmluZGV4KVxuICAgIH0pXG5cbiAgICBjb25zdCBzdGFydFdpZHRoID0gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoICogQ29tcG9uZW50cy5UcmFuc2xhdGUuZ2V0U3RhcnRJbmRleCgpXG4gICAgcmV0dXJuIFRyYW5zbGF0ZS5zZXQoc3RhcnRXaWR0aCAtIENvbXBvbmVudHMuVHJhbnNsYXRlLmdldFRyYXZlbERpc3RhbmNlKCkpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW92ZSB0cmFuc2xhdGU6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIFRyYW5zbGF0ZS5yZW1vdmUoKVxuICB9KVxuXG4gIHJldHVybiBUcmFuc2xhdGVcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEhvbGRzIGluYWN0aXZpdHkgc3RhdHVzIG9mIHRyYW5zaXRpb24uXG4gICAqIFdoZW4gdHJ1ZSB0cmFuc2l0aW9uIGlzIG5vdCBhcHBsaWVkLlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGxldCBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgY29uc3QgVHJhbnNpdGlvbiA9IHtcbiAgICAvKipcbiAgICAgKiBDb21wb3NlcyBzdHJpbmcgb2YgdGhlIENTUyB0cmFuc2l0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGNvbXBvc2UgKHByb3BlcnR5KSB7XG4gICAgICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiBgJHtwcm9wZXJ0eX0gJHt0aGlzLmR1cmF0aW9ufW1zICR7c2V0dGluZ3MuYW5pbWF0aW9uVGltaW5nRnVuY31gXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBgJHtwcm9wZXJ0eX0gMG1zICR7c2V0dGluZ3MuYW5pbWF0aW9uVGltaW5nRnVuY31gXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdmFsdWUgb2YgdHJhbnNpdGlvbiBvbiBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZz19IHByb3BlcnR5XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXQgKHByb3BlcnR5ID0gJ3RyYW5zZm9ybScpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSB0aGlzLmNvbXBvc2UocHJvcGVydHkpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdmFsdWUgb2YgdHJhbnNpdGlvbiBmcm9tIEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlICgpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnJ1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSdW5zIGNhbGxiYWNrIGFmdGVyIGFuaW1hdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYWZ0ZXIgKGNhbGxiYWNrKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfSwgdGhpcy5kdXJhdGlvbilcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlIHRyYW5zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGVuYWJsZSAoKSB7XG4gICAgICBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgICAgIHRoaXMuc2V0KClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZSB0cmFuc2l0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBkaXNhYmxlICgpIHtcbiAgICAgIGRpc2FibGVkID0gdHJ1ZVxuXG4gICAgICB0aGlzLnNldCgpXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKFRyYW5zaXRpb24sICdkdXJhdGlvbicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGR1cmF0aW9uIG9mIHRoZSB0cmFuc2l0aW9uIGJhc2VkXG4gICAgICogb24gY3VycmVudGx5IHJ1bm5pbmcgYW5pbWF0aW9uIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgIGlmIChHbGlkZS5pc1R5cGUoJ3NsaWRlcicpICYmIENvbXBvbmVudHMuUnVuLm9mZnNldCkge1xuICAgICAgICByZXR1cm4gc2V0dGluZ3MucmV3aW5kRHVyYXRpb25cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNldHRpbmdzLmFuaW1hdGlvbkR1cmF0aW9uXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBTZXQgdHJhbnNpdGlvbiBgc3R5bGVgIHZhbHVlOlxuICAgKiAtIG9uIGVhY2ggbW92aW5nLCBiZWNhdXNlIGl0IG1heSBiZSBjbGVhcmVkIGJ5IG9mZnNldCBtb3ZlXG4gICAqL1xuICBFdmVudHMub24oJ21vdmUnLCAoKSA9PiB7XG4gICAgVHJhbnNpdGlvbi5zZXQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIHRyYW5zaXRpb246XG4gICAqIC0gYmVmb3JlIGluaXRpYWwgYnVpbGQgdG8gYXZvaWQgdHJhbnNpdGlvbmluZyBmcm9tIGAwYCB0byBgc3RhcnRBdGAgaW5kZXhcbiAgICogLSB3aGlsZSByZXNpemluZyB3aW5kb3cgYW5kIHJlY2FsY3VsYXRpbmcgZGltZW50aW9uc1xuICAgKiAtIG9uIGp1bXBpbmcgZnJvbSBvZmZzZXQgdHJhbnNpdGlvbiBhdCBzdGFydCBhbmQgZW5kIGVkZ2VzIGluIGBjYXJvdXNlbGAgdHlwZVxuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYmVmb3JlJywgJ3Jlc2l6ZScsICd0cmFuc2xhdGUuanVtcCddLCAoKSA9PiB7XG4gICAgVHJhbnNpdGlvbi5kaXNhYmxlKClcbiAgfSlcblxuICAvKipcbiAgICogRW5hYmxlIHRyYW5zaXRpb246XG4gICAqIC0gb24gZWFjaCBydW5uaW5nLCBiZWNhdXNlIGl0IG1heSBiZSBkaXNhYmxlZCBieSBvZmZzZXQgbW92ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdydW4nLCAoKSA9PiB7XG4gICAgVHJhbnNpdGlvbi5lbmFibGUoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdHJhbnNpdGlvbjpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgVHJhbnNpdGlvbi5yZW1vdmUoKVxuICB9KVxuXG4gIHJldHVybiBUcmFuc2l0aW9uXG59XG4iLCIvKipcbiAqIFRlc3QgdmlhIGEgZ2V0dGVyIGluIHRoZSBvcHRpb25zIG9iamVjdCB0byBzZWVcbiAqIGlmIHRoZSBwYXNzaXZlIHByb3BlcnR5IGlzIGFjY2Vzc2VkLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL1dJQ0cvRXZlbnRMaXN0ZW5lck9wdGlvbnMvYmxvYi9naC1wYWdlcy9leHBsYWluZXIubWQjZmVhdHVyZS1kZXRlY3Rpb25cbiAqL1xuXG5sZXQgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2VcblxudHJ5IHtcbiAgbGV0IG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgIGdldCAoKSB7XG4gICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlXG4gICAgfVxuICB9KVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0UGFzc2l2ZScsIG51bGwsIG9wdHMpXG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0ZXN0UGFzc2l2ZScsIG51bGwsIG9wdHMpXG59IGNhdGNoIChlKSB7fVxuXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0c1Bhc3NpdmVcbiIsImltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnLi4vdXRpbHMvd2FpdCdcbmltcG9ydCB7IHRvSW50LCB0b0Zsb2F0IH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcbmltcG9ydCBzdXBwb3J0c1Bhc3NpdmUgZnJvbSAnLi4vdXRpbHMvZGV0ZWN0LXBhc3NpdmUtZXZlbnQnXG5cbmltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5jb25zdCBTVEFSVF9FVkVOVFMgPSBbJ3RvdWNoc3RhcnQnLCAnbW91c2Vkb3duJ11cbmNvbnN0IE1PVkVfRVZFTlRTID0gWyd0b3VjaG1vdmUnLCAnbW91c2Vtb3ZlJ11cbmNvbnN0IEVORF9FVkVOVFMgPSBbJ3RvdWNoZW5kJywgJ3RvdWNoY2FuY2VsJywgJ21vdXNldXAnLCAnbW91c2VsZWF2ZSddXG5jb25zdCBNT1VTRV9FVkVOVFMgPSBbJ21vdXNlZG93bicsICdtb3VzZW1vdmUnLCAnbW91c2V1cCcsICdtb3VzZWxlYXZlJ11cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICBsZXQgc3dpcGVTaW4gPSAwXG4gIGxldCBzd2lwZVN0YXJ0WCA9IDBcbiAgbGV0IHN3aXBlU3RhcnRZID0gMFxuICBsZXQgZGlzYWJsZWQgPSBmYWxzZVxuICBsZXQgY2FwdHVyZSA9IChzdXBwb3J0c1Bhc3NpdmUpID8geyBwYXNzaXZlOiB0cnVlIH0gOiBmYWxzZVxuXG4gIGNvbnN0IFN3aXBlID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHN3aXBlIGJpbmRpbmdzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLmJpbmRTd2lwZVN0YXJ0KClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgYHN3aXBlc3RhcnRgIGV2ZW50LiBDYWxjdWxhdGVzIGVudHJ5IHBvaW50cyBvZiB0aGUgdXNlcidzIHRhcC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc3RhcnQgKGV2ZW50KSB7XG4gICAgICBpZiAoIWRpc2FibGVkICYmICFHbGlkZS5kaXNhYmxlZCkge1xuICAgICAgICB0aGlzLmRpc2FibGUoKVxuXG4gICAgICAgIGxldCBzd2lwZSA9IHRoaXMudG91Y2hlcyhldmVudClcblxuICAgICAgICBzd2lwZVNpbiA9IG51bGxcbiAgICAgICAgc3dpcGVTdGFydFggPSB0b0ludChzd2lwZS5wYWdlWClcbiAgICAgICAgc3dpcGVTdGFydFkgPSB0b0ludChzd2lwZS5wYWdlWSlcblxuICAgICAgICB0aGlzLmJpbmRTd2lwZU1vdmUoKVxuICAgICAgICB0aGlzLmJpbmRTd2lwZUVuZCgpXG5cbiAgICAgICAgRXZlbnRzLmVtaXQoJ3N3aXBlLnN0YXJ0JylcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgYHN3aXBlbW92ZWAgZXZlbnQuIENhbGN1bGF0ZXMgdXNlcidzIHRhcCBhbmdsZSBhbmQgZGlzdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICBtb3ZlIChldmVudCkge1xuICAgICAgaWYgKCFHbGlkZS5kaXNhYmxlZCkge1xuICAgICAgICBsZXQgeyB0b3VjaEFuZ2xlLCB0b3VjaFJhdGlvLCBjbGFzc2VzIH0gPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICAgIGxldCBzd2lwZSA9IHRoaXMudG91Y2hlcyhldmVudClcblxuICAgICAgICBsZXQgc3ViRXhTeCA9IHRvSW50KHN3aXBlLnBhZ2VYKSAtIHN3aXBlU3RhcnRYXG4gICAgICAgIGxldCBzdWJFeVN5ID0gdG9JbnQoc3dpcGUucGFnZVkpIC0gc3dpcGVTdGFydFlcbiAgICAgICAgbGV0IHBvd0VYID0gTWF0aC5hYnMoc3ViRXhTeCA8PCAyKVxuICAgICAgICBsZXQgcG93RVkgPSBNYXRoLmFicyhzdWJFeVN5IDw8IDIpXG4gICAgICAgIGxldCBzd2lwZUh5cG90ZW51c2UgPSBNYXRoLnNxcnQocG93RVggKyBwb3dFWSlcbiAgICAgICAgbGV0IHN3aXBlQ2F0aGV0dXMgPSBNYXRoLnNxcnQocG93RVkpXG5cbiAgICAgICAgc3dpcGVTaW4gPSBNYXRoLmFzaW4oc3dpcGVDYXRoZXR1cyAvIHN3aXBlSHlwb3RlbnVzZSlcblxuICAgICAgICBpZiAoc3dpcGVTaW4gKiAxODAgLyBNYXRoLlBJIDwgdG91Y2hBbmdsZSkge1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICAgICAgICBDb21wb25lbnRzLk1vdmUubWFrZShzdWJFeFN4ICogdG9GbG9hdCh0b3VjaFJhdGlvKSlcblxuICAgICAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5kcmFnZ2luZylcblxuICAgICAgICAgIEV2ZW50cy5lbWl0KCdzd2lwZS5tb3ZlJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBgc3dpcGVlbmRgIGV2ZW50LiBGaW5pdGlhbGl6ZXMgdXNlcidzIHRhcCBhbmQgZGVjaWRlcyBhYm91dCBnbGlkZSBtb3ZlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBlbmQgKGV2ZW50KSB7XG4gICAgICBpZiAoIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgICAgbGV0IHN3aXBlID0gdGhpcy50b3VjaGVzKGV2ZW50KVxuICAgICAgICBsZXQgdGhyZXNob2xkID0gdGhpcy50aHJlc2hvbGQoZXZlbnQpXG5cbiAgICAgICAgbGV0IHN3aXBlRGlzdGFuY2UgPSBzd2lwZS5wYWdlWCAtIHN3aXBlU3RhcnRYXG4gICAgICAgIGxldCBzd2lwZURlZyA9IHN3aXBlU2luICogMTgwIC8gTWF0aC5QSVxuICAgICAgICBsZXQgc3RlcHMgPSBNYXRoLnJvdW5kKHN3aXBlRGlzdGFuY2UgLyBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGgpXG5cbiAgICAgICAgdGhpcy5lbmFibGUoKVxuXG4gICAgICAgIGlmIChzd2lwZURpc3RhbmNlID4gdGhyZXNob2xkICYmIHN3aXBlRGVnIDwgc2V0dGluZ3MudG91Y2hBbmdsZSkge1xuICAgICAgICAgIC8vIFdoaWxlIHN3aXBlIGlzIHBvc2l0aXZlIGFuZCBncmVhdGVyIHRoYW4gdGhyZXNob2xkIG1vdmUgYmFja3dhcmQuXG4gICAgICAgICAgaWYgKHNldHRpbmdzLnBlclRvdWNoKSB7XG4gICAgICAgICAgICBzdGVwcyA9IE1hdGgubWluKHN0ZXBzLCB0b0ludChzZXR0aW5ncy5wZXJUb3VjaCkpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKENvbXBvbmVudHMuRGlyZWN0aW9uLmlzKCdydGwnKSkge1xuICAgICAgICAgICAgc3RlcHMgPSAtc3RlcHNcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKENvbXBvbmVudHMuRGlyZWN0aW9uLnJlc29sdmUoYDwke3N0ZXBzfWApKVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHN3aXBlRGlzdGFuY2UgPCAtdGhyZXNob2xkICYmXG4gICAgICAgICAgc3dpcGVEZWcgPCBzZXR0aW5ncy50b3VjaEFuZ2xlXG4gICAgICAgICkge1xuICAgICAgICAgIC8vIFdoaWxlIHN3aXBlIGlzIG5lZ2F0aXZlIGFuZCBsb3dlciB0aGFuIG5lZ2F0aXZlIHRocmVzaG9sZCBtb3ZlIGZvcndhcmQuXG4gICAgICAgICAgaWYgKHNldHRpbmdzLnBlclRvdWNoKSB7XG4gICAgICAgICAgICBzdGVwcyA9IE1hdGgubWF4KHN0ZXBzLCAtdG9JbnQoc2V0dGluZ3MucGVyVG91Y2gpKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChDb21wb25lbnRzLkRpcmVjdGlvbi5pcygncnRsJykpIHtcbiAgICAgICAgICAgIHN0ZXBzID0gLXN0ZXBzXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKGA+JHtzdGVwc31gKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBXaGlsZSBzd2lwZSBkb24ndCByZWFjaCBkaXN0YW5jZSBhcHBseSBwcmV2aW91cyB0cmFuc2Zvcm0uXG4gICAgICAgICAgQ29tcG9uZW50cy5Nb3ZlLm1ha2UoKVxuICAgICAgICB9XG5cbiAgICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LnJlbW92ZShzZXR0aW5ncy5jbGFzc2VzLmRyYWdnaW5nKVxuXG4gICAgICAgIHRoaXMudW5iaW5kU3dpcGVNb3ZlKClcbiAgICAgICAgdGhpcy51bmJpbmRTd2lwZUVuZCgpXG5cbiAgICAgICAgRXZlbnRzLmVtaXQoJ3N3aXBlLmVuZCcpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIHN3aXBlJ3Mgc3RhcnRpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmRTd2lwZVN0YXJ0ICgpIHtcbiAgICAgIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgIGlmIChzZXR0aW5ncy5zd2lwZVRocmVzaG9sZCkge1xuICAgICAgICBCaW5kZXIub24oU1RBUlRfRVZFTlRTWzBdLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGFydChldmVudClcbiAgICAgICAgfSwgY2FwdHVyZSlcbiAgICAgIH1cblxuICAgICAgaWYgKHNldHRpbmdzLmRyYWdUaHJlc2hvbGQpIHtcbiAgICAgICAgQmluZGVyLm9uKFNUQVJUX0VWRU5UU1sxXSwgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIChldmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhcnQoZXZlbnQpXG4gICAgICAgIH0sIGNhcHR1cmUpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgc3dpcGUncyBzdGFydGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kU3dpcGVTdGFydCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKFNUQVJUX0VWRU5UU1swXSwgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIGNhcHR1cmUpXG4gICAgICBCaW5kZXIub2ZmKFNUQVJUX0VWRU5UU1sxXSwgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIGNhcHR1cmUpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIHN3aXBlJ3MgbW92aW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kU3dpcGVNb3ZlICgpIHtcbiAgICAgIEJpbmRlci5vbihNT1ZFX0VWRU5UUywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIHRocm90dGxlKChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLm1vdmUoZXZlbnQpXG4gICAgICB9LCBHbGlkZS5zZXR0aW5ncy50aHJvdHRsZSksIGNhcHR1cmUpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgc3dpcGUncyBtb3ZpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZFN3aXBlTW92ZSAoKSB7XG4gICAgICBCaW5kZXIub2ZmKE1PVkVfRVZFTlRTLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgY2FwdHVyZSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgc3dpcGUncyBlbmRpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmRTd2lwZUVuZCAoKSB7XG4gICAgICBCaW5kZXIub24oRU5EX0VWRU5UUywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLmVuZChldmVudClcbiAgICAgIH0pXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgc3dpcGUncyBlbmRpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZFN3aXBlRW5kICgpIHtcbiAgICAgIEJpbmRlci5vZmYoRU5EX0VWRU5UUywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZXMgZXZlbnQgdG91Y2hlcyBwb2ludHMgYWNjb3J0aW5nIHRvIGRpZmZlcmVudCB0eXBlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqL1xuICAgIHRvdWNoZXMgKGV2ZW50KSB7XG4gICAgICBpZiAoTU9VU0VfRVZFTlRTLmluZGV4T2YoZXZlbnQudHlwZSkgPiAtMSkge1xuICAgICAgICByZXR1cm4gZXZlbnRcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV2ZW50LnRvdWNoZXNbMF0gfHwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiBtaW5pbXVtIHN3aXBlIGRpc3RhbmNlIHNldHRpbmdzIGJhc2VkIG9uIGV2ZW50IHR5cGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgdGhyZXNob2xkIChldmVudCkge1xuICAgICAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgaWYgKE1PVVNFX0VWRU5UUy5pbmRleE9mKGV2ZW50LnR5cGUpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzLmRyYWdUaHJlc2hvbGRcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNldHRpbmdzLnN3aXBlVGhyZXNob2xkXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgc3dpcGUgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzZWxmfVxuICAgICAqL1xuICAgIGVuYWJsZSAoKSB7XG4gICAgICBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5lbmFibGUoKVxuXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyBzd2lwZSBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3NlbGZ9XG4gICAgICovXG4gICAgZGlzYWJsZSAoKSB7XG4gICAgICBkaXNhYmxlZCA9IHRydWVcblxuICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmRpc2FibGUoKVxuXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY29tcG9uZW50IGNsYXNzOlxuICAgKiAtIGFmdGVyIGluaXRpYWwgYnVpbGRpbmdcbiAgICovXG4gIEV2ZW50cy5vbignYnVpbGQuYWZ0ZXInLCAoKSA9PiB7XG4gICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LmFkZChHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLnN3aXBlYWJsZSlcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3ZlIHN3aXBpbmcgYmluZGluZ3M6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gcmVtb3ZlIGFkZGVkIEV2ZW50TGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgU3dpcGUudW5iaW5kU3dpcGVTdGFydCgpXG4gICAgU3dpcGUudW5iaW5kU3dpcGVNb3ZlKClcbiAgICBTd2lwZS51bmJpbmRTd2lwZUVuZCgpXG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBTd2lwZVxufVxuIiwiaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgY29uc3QgSW1hZ2VzID0ge1xuICAgIC8qKlxuICAgICAqIEJpbmRzIGxpc3RlbmVyIHRvIGdsaWRlIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuYmluZCgpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIGBkcmFnc3RhcnRgIGV2ZW50IG9uIHdyYXBwZXIgdG8gcHJldmVudCBkcmFnZ2luZyBpbWFnZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQgKCkge1xuICAgICAgQmluZGVyLm9uKCdkcmFnc3RhcnQnLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgdGhpcy5kcmFnc3RhcnQpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgYGRyYWdzdGFydGAgZXZlbnQgb24gd3JhcHBlci5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kICgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ2RyYWdzdGFydCcsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVyLiBQcmV2ZW50cyBkcmFnZ2luZy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZHJhZ3N0YXJ0IChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgZnJvbSBpbWFnZXM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gcmVtb3ZlIGFkZGVkIEV2ZW50TGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgSW1hZ2VzLnVuYmluZCgpXG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBJbWFnZXNcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcblxuaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgLyoqXG4gICAqIEhvbGRzIGRldGFjaGluZyBzdGF0dXMgb2YgYW5jaG9ycy5cbiAgICogUHJldmVudHMgZGV0YWNoaW5nIG9mIGFscmVhZHkgZGV0YWNoZWQgYW5jaG9ycy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBsZXQgZGV0YWNoZWQgPSBmYWxzZVxuXG4gIC8qKlxuICAgKiBIb2xkcyBwcmV2ZW50aW5nIHN0YXR1cyBvZiBhbmNob3JzLlxuICAgKiBJZiBgdHJ1ZWAgcmVkaXJlY3Rpb24gYWZ0ZXIgY2xpY2sgd2lsbCBiZSBkaXNhYmxlZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBsZXQgcHJldmVudGVkID0gZmFsc2VcblxuICBjb25zdCBBbmNob3JzID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwcyBhIGluaXRpYWwgc3RhdGUgb2YgYW5jaG9ycyBjb21wb25lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICAvKipcbiAgICAgICAqIEhvbGRzIGNvbGxlY3Rpb24gb2YgYW5jaG9ycyBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0hUTUxDb2xsZWN0aW9ufVxuICAgICAgICovXG4gICAgICB0aGlzLl9hID0gQ29tcG9uZW50cy5IdG1sLndyYXBwZXIucXVlcnlTZWxlY3RvckFsbCgnYScpXG5cbiAgICAgIHRoaXMuYmluZCgpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIGV2ZW50cyB0byBhbmNob3JzIGluc2lkZSBhIHRyYWNrLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kICgpIHtcbiAgICAgIEJpbmRlci5vbignY2xpY2snLCBDb21wb25lbnRzLkh0bWwud3JhcHBlciwgdGhpcy5jbGljaylcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBldmVudHMgYXR0YWNoZWQgdG8gYW5jaG9ycyBpbnNpZGUgYSB0cmFjay5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kICgpIHtcbiAgICAgIEJpbmRlci5vZmYoJ2NsaWNrJywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGNsaWNrIGV2ZW50LiBQcmV2ZW50cyBjbGlja3Mgd2hlbiBnbGlkZSBpcyBpbiBgcHJldmVudGAgc3RhdHVzLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgY2xpY2sgKGV2ZW50KSB7XG4gICAgICBpZiAocHJldmVudGVkKSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgYW5jaG9ycyBjbGljayBldmVudCBpbnNpZGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzZWxmfVxuICAgICAqL1xuICAgIGRldGFjaCAoKSB7XG4gICAgICBwcmV2ZW50ZWQgPSB0cnVlXG5cbiAgICAgIGlmICghZGV0YWNoZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5kcmFnZ2FibGUgPSBmYWxzZVxuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAnZGF0YS1ocmVmJyxcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZ2V0QXR0cmlidXRlKCdocmVmJylcbiAgICAgICAgICApXG5cbiAgICAgICAgICB0aGlzLml0ZW1zW2ldLnJlbW92ZUF0dHJpYnV0ZSgnaHJlZicpXG4gICAgICAgIH1cblxuICAgICAgICBkZXRhY2hlZCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgYW5jaG9ycyBjbGljayBldmVudHMgaW5zaWRlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBhdHRhY2ggKCkge1xuICAgICAgcHJldmVudGVkID0gZmFsc2VcblxuICAgICAgaWYgKGRldGFjaGVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZHJhZ2dhYmxlID0gdHJ1ZVxuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAnaHJlZicsXG4gICAgICAgICAgICB0aGlzLml0ZW1zW2ldLmdldEF0dHJpYnV0ZSgnZGF0YS1ocmVmJylcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBkZXRhY2hlZCA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKEFuY2hvcnMsICdpdGVtcycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGNvbGxlY3Rpb24gb2YgdGhlIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnRbXX1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIEFuY2hvcnMuX2FcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIERldGFjaCBhbmNob3JzIGluc2lkZSBzbGlkZXM6XG4gICAqIC0gb24gc3dpcGluZywgc28gdGhleSB3b24ndCByZWRpcmVjdCB0byBpdHMgYGhyZWZgIGF0dHJpYnV0ZXNcbiAgICovXG4gIEV2ZW50cy5vbignc3dpcGUubW92ZScsICgpID0+IHtcbiAgICBBbmNob3JzLmRldGFjaCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhbmNob3JzIGluc2lkZSBzbGlkZXM6XG4gICAqIC0gYWZ0ZXIgc3dpcGluZyBhbmQgdHJhbnNpdGlvbnMgZW5kcywgc28gdGhleSBjYW4gcmVkaXJlY3QgYWZ0ZXIgY2xpY2sgYWdhaW5cbiAgICovXG4gIEV2ZW50cy5vbignc3dpcGUuZW5kJywgKCkgPT4ge1xuICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5hZnRlcigoKSA9PiB7XG4gICAgICBBbmNob3JzLmF0dGFjaCgpXG4gICAgfSlcbiAgfSlcblxuICAvKipcbiAgICogVW5iaW5kIGFuY2hvcnMgaW5zaWRlIHNsaWRlczpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBhbmNob3JzIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgQW5jaG9ycy5hdHRhY2goKVxuICAgIEFuY2hvcnMudW5iaW5kKClcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIEFuY2hvcnNcbn1cbiIsImltcG9ydCB7IHNpYmxpbmdzIH0gZnJvbSAnLi4vdXRpbHMvZG9tJ1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHN1cHBvcnRzUGFzc2l2ZSBmcm9tICcuLi91dGlscy9kZXRlY3QtcGFzc2l2ZS1ldmVudCdcblxuaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmNvbnN0IE5BVl9TRUxFQ1RPUiA9ICdbZGF0YS1nbGlkZS1lbD1cImNvbnRyb2xzW25hdl1cIl0nXG5jb25zdCBDT05UUk9MU19TRUxFQ1RPUiA9ICdbZGF0YS1nbGlkZS1lbF49XCJjb250cm9sc1wiXSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICBsZXQgY2FwdHVyZSA9IChzdXBwb3J0c1Bhc3NpdmUpID8geyBwYXNzaXZlOiB0cnVlIH0gOiBmYWxzZVxuXG4gIGNvbnN0IENvbnRyb2xzID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRzIGFycm93cy4gQmluZHMgZXZlbnRzIGxpc3RlbmVyc1xuICAgICAqIHRvIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgLyoqXG4gICAgICAgKiBDb2xsZWN0aW9uIG9mIG5hdmlnYXRpb24gSFRNTCBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0hUTUxDb2xsZWN0aW9ufVxuICAgICAgICovXG4gICAgICB0aGlzLl9uID0gQ29tcG9uZW50cy5IdG1sLnJvb3QucXVlcnlTZWxlY3RvckFsbChOQVZfU0VMRUNUT1IpXG5cbiAgICAgIC8qKlxuICAgICAgICogQ29sbGVjdGlvbiBvZiBjb250cm9scyBIVE1MIGVsZW1lbnRzLlxuICAgICAgICpcbiAgICAgICAqIEBwcml2YXRlXG4gICAgICAgKiBAdHlwZSB7SFRNTENvbGxlY3Rpb259XG4gICAgICAgKi9cbiAgICAgIHRoaXMuX2MgPSBDb21wb25lbnRzLkh0bWwucm9vdC5xdWVyeVNlbGVjdG9yQWxsKENPTlRST0xTX1NFTEVDVE9SKVxuXG4gICAgICB0aGlzLmFkZEJpbmRpbmdzKClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0QWN0aXZlICgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmFkZENsYXNzKHRoaXMuX25baV0uY2hpbGRyZW4pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUFjdGl2ZSAoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyh0aGlzLl9uW2ldLmNoaWxkcmVuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIGFjdGl2ZSBjbGFzcyBvbiBpdGVtcyBpbnNpZGUgbmF2aWdhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBjb250cm9sc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYWRkQ2xhc3MgKGNvbnRyb2xzKSB7XG4gICAgICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuICAgICAgbGV0IGl0ZW0gPSBjb250cm9sc1tHbGlkZS5pbmRleF1cblxuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKHNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KVxuXG4gICAgICAgIHNpYmxpbmdzKGl0ZW0pLmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICAgICAgc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKHNldHRpbmdzLmNsYXNzZXMuYWN0aXZlTmF2KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFjdGl2ZSBjbGFzcyBmcm9tIGFjdGl2ZSBjb250cm9sLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGNvbnRyb2xzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVDbGFzcyAoY29udHJvbHMpIHtcbiAgICAgIGxldCBpdGVtID0gY29udHJvbHNbR2xpZGUuaW5kZXhdXG5cbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmFjdGl2ZU5hdilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkcyBoYW5kbGVzIHRvIHRoZSBlYWNoIGdyb3VwIG9mIGNvbnRyb2xzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBhZGRCaW5kaW5ncyAoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5iaW5kKHRoaXMuX2NbaV0uY2hpbGRyZW4pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgaGFuZGxlcyBmcm9tIHRoZSBlYWNoIGdyb3VwIG9mIGNvbnRyb2xzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVCaW5kaW5ncyAoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy51bmJpbmQodGhpcy5fY1tpXS5jaGlsZHJlbilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQmluZHMgZXZlbnRzIHRvIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gZWxlbWVudHNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQgKGVsZW1lbnRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIEJpbmRlci5vbignY2xpY2snLCBlbGVtZW50c1tpXSwgdGhpcy5jbGljaylcbiAgICAgICAgQmluZGVyLm9uKCd0b3VjaHN0YXJ0JywgZWxlbWVudHNbaV0sIHRoaXMuY2xpY2ssIGNhcHR1cmUpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgZXZlbnRzIGJpbmRlZCB0byB0aGUgYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBlbGVtZW50c1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdW5iaW5kIChlbGVtZW50cykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBCaW5kZXIub2ZmKFsnY2xpY2snLCAndG91Y2hzdGFydCddLCBlbGVtZW50c1tpXSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBgY2xpY2tgIGV2ZW50IG9uIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKiBNb3ZlcyBzbGlkZXIgaW4gZHJpZWN0aW9uIHByZWNpc2VkIGluXG4gICAgICogYGRhdGEtZ2xpZGUtZGlyYCBhdHRyaWJ1dGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGNsaWNrIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKENvbXBvbmVudHMuRGlyZWN0aW9uLnJlc29sdmUoZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ2xpZGUtZGlyJykpKVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShDb250cm9scywgJ2l0ZW1zJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgY29sbGVjdGlvbiBvZiB0aGUgY29udHJvbHMgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBDb250cm9scy5fY1xuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogU3dhcCBhY3RpdmUgY2xhc3Mgb2YgY3VycmVudCBuYXZpZ2F0aW9uIGl0ZW06XG4gICAqIC0gYWZ0ZXIgbW91bnRpbmcgdG8gc2V0IGl0IHRvIGluaXRpYWwgaW5kZXhcbiAgICogLSBhZnRlciBlYWNoIG1vdmUgdG8gdGhlIG5ldyBpbmRleFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnbW91bnQuYWZ0ZXInLCAnbW92ZS5hZnRlciddLCAoKSA9PiB7XG4gICAgQ29udHJvbHMuc2V0QWN0aXZlKClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGFuZCBIVE1MIENsYXNzZXM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgQ29udHJvbHMucmVtb3ZlQmluZGluZ3MoKVxuICAgIENvbnRyb2xzLnJlbW92ZUFjdGl2ZSgpXG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBDb250cm9sc1xufVxuIiwiaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgY29uc3QgS2V5Ym9hcmQgPSB7XG4gICAgLyoqXG4gICAgICogQmluZHMga2V5Ym9hcmQgZXZlbnRzIG9uIGNvbXBvbmVudCBtb3VudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmtleWJvYXJkKSB7XG4gICAgICAgIHRoaXMuYmluZCgpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZHMga2V5Ym9hcmQgcHJlc3MgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kICgpIHtcbiAgICAgIEJpbmRlci5vbigna2V5dXAnLCBkb2N1bWVudCwgdGhpcy5wcmVzcylcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBrZXlib2FyZCBwcmVzcyBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKCdrZXl1cCcsIGRvY3VtZW50KVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGtleWJvYXJkJ3MgYXJyb3dzIHByZXNzIGFuZCBtb3ZpbmcgZ2xpZGUgZm93YXJkIGFuZCBiYWNrd2FyZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHByZXNzIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5KSB7XG4gICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZSgnPicpKVxuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcpIHtcbiAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKCc8JykpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBiaW5kaW5ncyBmcm9tIGtleWJvYXJkOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gcmVtb3ZlIGFkZGVkIGV2ZW50c1xuICAgKiAtIG9uIHVwZGF0aW5nIHRvIHJlbW92ZSBldmVudHMgYmVmb3JlIHJlbW91bnRpbmdcbiAgICovXG4gIEV2ZW50cy5vbihbJ2Rlc3Ryb3knLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBLZXlib2FyZC51bmJpbmQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdW50IGNvbXBvbmVudFxuICAgKiAtIG9uIHVwZGF0aW5nIHRvIHJlZmxlY3QgcG90ZW50aWFsIGNoYW5nZXMgaW4gc2V0dGluZ3NcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgKCkgPT4ge1xuICAgIEtleWJvYXJkLm1vdW50KClcbiAgfSlcblxuICAvKipcbiAgICogRGVzdHJveSBiaW5kZXI6XG4gICAqIC0gb24gZGVzdHJveWluZyB0byByZW1vdmUgbGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBLZXlib2FyZFxufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHsgdG9JbnQsIGlzVW5kZWZpbmVkIH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgY29uc3QgQXV0b3BsYXkgPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYXV0b3BsYXlpbmcgYW5kIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5zdGFydCgpXG5cbiAgICAgIGlmIChHbGlkZS5zZXR0aW5ncy5ob3ZlcnBhdXNlKSB7XG4gICAgICAgIHRoaXMuYmluZCgpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBhdXRvcGxheWluZyBpbiBjb25maWd1cmVkIGludGVydmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufE51bWJlcn0gZm9yY2UgUnVuIGF1dG9wbGF5aW5nIHdpdGggcGFzc2VkIGludGVydmFsIHJlZ2FyZGxlc3Mgb2YgYGF1dG9wbGF5YCBzZXR0aW5nc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc3RhcnQgKCkge1xuICAgICAgaWYgKEdsaWRlLnNldHRpbmdzLmF1dG9wbGF5KSB7XG4gICAgICAgIGlmIChpc1VuZGVmaW5lZCh0aGlzLl9pKSkge1xuICAgICAgICAgIHRoaXMuX2kgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKVxuXG4gICAgICAgICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKCc+JylcblxuICAgICAgICAgICAgdGhpcy5zdGFydCgpXG4gICAgICAgICAgfSwgdGhpcy50aW1lKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3BzIGF1dG9ydW5uaW5nIG9mIHRoZSBnbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc3RvcCAoKSB7XG4gICAgICB0aGlzLl9pID0gY2xlYXJJbnRlcnZhbCh0aGlzLl9pKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhdXRvcGxheWluZyB3aGlsZSBtb3VzZSBpcyBvdmVyIGdsaWRlJ3MgYXJlYS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZCAoKSB7XG4gICAgICBCaW5kZXIub24oJ21vdXNlb3ZlcicsIENvbXBvbmVudHMuSHRtbC5yb290LCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcCgpXG4gICAgICB9KVxuXG4gICAgICBCaW5kZXIub24oJ21vdXNlb3V0JywgQ29tcG9uZW50cy5IdG1sLnJvb3QsICgpID0+IHtcbiAgICAgICAgdGhpcy5zdGFydCgpXG4gICAgICB9KVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmQgbW91c2VvdmVyIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKFsnbW91c2VvdmVyJywgJ21vdXNlb3V0J10sIENvbXBvbmVudHMuSHRtbC5yb290KVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShBdXRvcGxheSwgJ3RpbWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB0aW1lIHBlcmlvZCB2YWx1ZSBmb3IgdGhlIGF1dG9wbGF5IGludGVydmFsLiBQcmlvcml0aXplc1xuICAgICAqIHRpbWVzIGluIGBkYXRhLWdsaWRlLWF1dG9wbGF5YCBhdHRydWJ1dGVzIG92ZXIgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgbGV0IGF1dG9wbGF5ID0gQ29tcG9uZW50cy5IdG1sLnNsaWRlc1tHbGlkZS5pbmRleF0uZ2V0QXR0cmlidXRlKCdkYXRhLWdsaWRlLWF1dG9wbGF5JylcblxuICAgICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICAgIHJldHVybiB0b0ludChhdXRvcGxheSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRvSW50KEdsaWRlLnNldHRpbmdzLmF1dG9wbGF5KVxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogU3RvcCBhdXRvcGxheWluZyBhbmQgdW5iaW5kIGV2ZW50czpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBjbGVhciBkZWZpbmVkIGludGVydmFsXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZXNldCBpbnRlcnZhbCB0aGF0IG1heSBjaGFuZ2VkXG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgQXV0b3BsYXkudW5iaW5kKClcbiAgfSlcblxuICAvKipcbiAgICogU3RvcCBhdXRvcGxheWluZzpcbiAgICogLSBiZWZvcmUgZWFjaCBydW4sIHRvIHJlc3RhcnQgYXV0b3BsYXlpbmdcbiAgICogLSBvbiBwYXVzaW5nIHZpYSBBUElcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBjbGVhciBkZWZpbmVkIGludGVydmFsXG4gICAqIC0gd2hpbGUgc3RhcnRpbmcgYSBzd2lwZVxuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEkgdG8gcmVzZXQgaW50ZXJ2YWwgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKFsncnVuLmJlZm9yZScsICdwYXVzZScsICdkZXN0cm95JywgJ3N3aXBlLnN0YXJ0JywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgQXV0b3BsYXkuc3RvcCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFN0YXJ0IGF1dG9wbGF5aW5nOlxuICAgKiAtIGFmdGVyIGVhY2ggcnVuLCB0byByZXN0YXJ0IGF1dG9wbGF5aW5nXG4gICAqIC0gb24gcGxheWluZyB2aWEgQVBJXG4gICAqIC0gd2hpbGUgZW5kaW5nIGEgc3dpcGVcbiAgICovXG4gIEV2ZW50cy5vbihbJ3J1bi5hZnRlcicsICdwbGF5JywgJ3N3aXBlLmVuZCddLCAoKSA9PiB7XG4gICAgQXV0b3BsYXkuc3RhcnQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdW50IGF1dG9wbGF5aW5nOlxuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEkgdG8gcmVzZXQgaW50ZXJ2YWwgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgQXV0b3BsYXkubW91bnQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGEgYmluZGVyOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgZ2xpZGUgaW5zdGFuY2UgdG8gY2xlYXJ1cCBsaXN0ZW5lcnNcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIEF1dG9wbGF5XG59XG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICcuLi91dGlscy93YWl0J1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi91dGlscy91bml0J1xuaW1wb3J0IHsgc29ydEtleXMsIG1lcmdlT3B0aW9ucyB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcblxuaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbi8qKlxuICogU29ydHMga2V5cyBvZiBicmVha3BvaW50IG9iamVjdCBzbyB0aGV5IHdpbGwgYmUgb3JkZXJlZCBmcm9tIGxvd2VyIHRvIGJpZ2dlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcG9pbnRzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBzb3J0QnJlYWtwb2ludHMgKHBvaW50cykge1xuICBpZiAoaXNPYmplY3QocG9pbnRzKSkge1xuICAgIHJldHVybiBzb3J0S2V5cyhwb2ludHMpXG4gIH0gZWxzZSB7XG4gICAgd2FybihgQnJlYWtwb2ludHMgb3B0aW9uIG11c3QgYmUgYW4gb2JqZWN0YClcbiAgfVxuXG4gIHJldHVybiB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIC8qKlxuICAgKiBIb2xkcyByZWZlcmVuY2UgdG8gc2V0dGluZ3MuXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuXG4gIC8qKlxuICAgKiBIb2xkcyByZWZlcmVuY2UgdG8gYnJlYWtwb2ludHMgb2JqZWN0IGluIHNldHRpbmdzLiBTb3J0cyBicmVha3BvaW50c1xuICAgKiBmcm9tIHNtYWxsZXIgdG8gbGFyZ2VyLiBJdCBpcyByZXF1aXJlZCBpbiBvcmRlciB0byBwcm9wZXJcbiAgICogbWF0Y2hpbmcgY3VycmVudGx5IGFjdGl2ZSBicmVha3BvaW50IHNldHRpbmdzLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgbGV0IHBvaW50cyA9IHNvcnRCcmVha3BvaW50cyhzZXR0aW5ncy5icmVha3BvaW50cylcblxuICAvKipcbiAgICogQ2FjaGUgaW5pdGlhbCBzZXR0aW5ncyBiZWZvcmUgb3ZlcndyaXR0aW5nLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgbGV0IGRlZmF1bHRzID0gT2JqZWN0LmFzc2lnbih7fSwgc2V0dGluZ3MpXG5cbiAgY29uc3QgQnJlYWtwb2ludHMgPSB7XG4gICAgLyoqXG4gICAgICogTWF0Y2hlcyBzZXR0aW5ncyBmb3IgY3VycmVjdGx5IG1hdGNoaW5nIG1lZGlhIGJyZWFrcG9pbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcG9pbnRzXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBtYXRjaCAocG9pbnRzKSB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5tYXRjaE1lZGlhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBmb3IgKGxldCBwb2ludCBpbiBwb2ludHMpIHtcbiAgICAgICAgICBpZiAocG9pbnRzLmhhc093blByb3BlcnR5KHBvaW50KSkge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKGAobWF4LXdpZHRoOiAke3BvaW50fXB4KWApLm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHBvaW50c1twb2ludF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlZmF1bHRzXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJ3cml0ZSBpbnN0YW5jZSBzZXR0aW5ncyB3aXRoIGN1cnJlbnRseSBtYXRjaGluZyBicmVha3BvaW50IHNldHRpbmdzLlxuICAgKiBUaGlzIGhhcHBlbnMgcmlnaHQgYWZ0ZXIgY29tcG9uZW50IGluaXRpYWxpemF0aW9uLlxuICAgKi9cbiAgT2JqZWN0LmFzc2lnbihzZXR0aW5ncywgQnJlYWtwb2ludHMubWF0Y2gocG9pbnRzKSlcblxuICAvKipcbiAgICogVXBkYXRlIGdsaWRlIHdpdGggc2V0dGluZ3Mgb2YgbWF0Y2hlZCBicmVrcG9pbnQ6XG4gICAqIC0gd2luZG93IHJlc2l6ZSB0byB1cGRhdGUgc2xpZGVyXG4gICAqL1xuICBCaW5kZXIub24oJ3Jlc2l6ZScsIHdpbmRvdywgdGhyb3R0bGUoKCkgPT4ge1xuICAgIEdsaWRlLnNldHRpbmdzID0gbWVyZ2VPcHRpb25zKHNldHRpbmdzLCBCcmVha3BvaW50cy5tYXRjaChwb2ludHMpKVxuICB9LCBHbGlkZS5zZXR0aW5ncy50aHJvdHRsZSkpXG5cbiAgLyoqXG4gICAqIFJlc29ydCBhbmQgdXBkYXRlIGRlZmF1bHQgc2V0dGluZ3M6XG4gICAqIC0gb24gcmVpbml0IHZpYSBBUEksIHNvIGJyZWFrcG9pbnQgbWF0Y2hpbmcgd2lsbCBiZSBwZXJmb3JtZWQgd2l0aCBvcHRpb25zXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsICgpID0+IHtcbiAgICBwb2ludHMgPSBzb3J0QnJlYWtwb2ludHMocG9pbnRzKVxuXG4gICAgZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKHt9LCBzZXR0aW5ncylcbiAgfSlcblxuICAvKipcbiAgICogVW5iaW5kIHJlc2l6ZSBsaXN0ZW5lcjpcbiAgICogLSBvbiBkZXN0cm95aW5nLCB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBCaW5kZXIub2ZmKCdyZXNpemUnLCB3aW5kb3cpXG4gIH0pXG5cbiAgcmV0dXJuIEJyZWFrcG9pbnRzXG59XG4iLCJpbXBvcnQgQ29yZSBmcm9tICcuLi9zcmMvaW5kZXgnXG5cbi8vIFJlcXVpcmVkIGNvbXBvbmVudHNcbmltcG9ydCBSdW4gZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvcnVuJ1xuaW1wb3J0IEdhcHMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvZ2FwcydcbmltcG9ydCBIdG1sIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2h0bWwnXG5pbXBvcnQgUGVlayBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9wZWVrJ1xuaW1wb3J0IE1vdmUgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvbW92ZSdcbmltcG9ydCBTaXplcyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9zaXplcydcbmltcG9ydCBCdWlsZCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9idWlsZCdcbmltcG9ydCBDbG9uZXMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvY2xvbmVzJ1xuaW1wb3J0IFJlc2l6ZSBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9yZXNpemUnXG5pbXBvcnQgRGlyZWN0aW9uIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2RpcmVjdGlvbidcbmltcG9ydCBUcmFuc2xhdGUgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvdHJhbnNsYXRlJ1xuaW1wb3J0IFRyYW5zaXRpb24gZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvdHJhbnNpdGlvbidcblxuLy8gT3B0aW9uYWwgY29tcG9uZW50c1xuaW1wb3J0IFN3aXBlIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3N3aXBlJ1xuaW1wb3J0IEltYWdlcyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9pbWFnZXMnXG5pbXBvcnQgQW5jaG9ycyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9hbmNob3JzJ1xuaW1wb3J0IENvbnRyb2xzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2NvbnRyb2xzJ1xuaW1wb3J0IEtleWJvYXJkIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2tleWJvYXJkJ1xuaW1wb3J0IEF1dG9wbGF5IGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2F1dG9wbGF5J1xuaW1wb3J0IEJyZWFrcG9pbnRzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2JyZWFrcG9pbnRzJ1xuXG5jb25zdCBDT01QT05FTlRTID0ge1xuICAvLyBSZXF1aXJlZFxuICBIdG1sLFxuICBUcmFuc2xhdGUsXG4gIFRyYW5zaXRpb24sXG4gIERpcmVjdGlvbixcbiAgUGVlayxcbiAgU2l6ZXMsXG4gIEdhcHMsXG4gIE1vdmUsXG4gIENsb25lcyxcbiAgUmVzaXplLFxuICBCdWlsZCxcbiAgUnVuLFxuXG4gIC8vIE9wdGlvbmFsXG4gIFN3aXBlLFxuICBJbWFnZXMsXG4gIEFuY2hvcnMsXG4gIENvbnRyb2xzLFxuICBLZXlib2FyZCxcbiAgQXV0b3BsYXksXG4gIEJyZWFrcG9pbnRzXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdsaWRlIGV4dGVuZHMgQ29yZSB7XG4gIG1vdW50IChleHRlbnNpb25zID0ge30pIHtcbiAgICByZXR1cm4gc3VwZXIubW91bnQoT2JqZWN0LmFzc2lnbih7fSwgQ09NUE9ORU5UUywgZXh0ZW5zaW9ucykpXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJ0eXBlIiwic3RhcnRBdCIsInBlclZpZXciLCJmb2N1c0F0IiwiZ2FwIiwiYXV0b3BsYXkiLCJob3ZlcnBhdXNlIiwia2V5Ym9hcmQiLCJib3VuZCIsInN3aXBlVGhyZXNob2xkIiwiZHJhZ1RocmVzaG9sZCIsInBlclRvdWNoIiwidG91Y2hSYXRpbyIsInRvdWNoQW5nbGUiLCJhbmltYXRpb25EdXJhdGlvbiIsInJld2luZCIsInJld2luZER1cmF0aW9uIiwiYW5pbWF0aW9uVGltaW5nRnVuYyIsIndhaXRGb3JUcmFuc2l0aW9uIiwidGhyb3R0bGUiLCJkaXJlY3Rpb24iLCJwZWVrIiwiYnJlYWtwb2ludHMiLCJjbGFzc2VzIiwibHRyIiwicnRsIiwic2xpZGVyIiwiY2Fyb3VzZWwiLCJzd2lwZWFibGUiLCJkcmFnZ2luZyIsImNsb25lU2xpZGUiLCJhY3RpdmVOYXYiLCJhY3RpdmVTbGlkZSIsImRpc2FibGVkQXJyb3ciLCJ3YXJuIiwibXNnIiwiY29uc29sZSIsImVycm9yIiwidG9JbnQiLCJ2YWx1ZSIsInBhcnNlSW50IiwidG9GbG9hdCIsInBhcnNlRmxvYXQiLCJpc1N0cmluZyIsImlzT2JqZWN0IiwiaXNOdW1iZXIiLCJpc0Z1bmN0aW9uIiwiaXNVbmRlZmluZWQiLCJpc0FycmF5IiwiY29uc3RydWN0b3IiLCJBcnJheSIsIm1vdW50IiwiZ2xpZGUiLCJleHRlbnNpb25zIiwiZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hbWUiLCJkZWZpbmUiLCJvYmoiLCJwcm9wIiwiZGVmaW5pdGlvbiIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwic29ydEtleXMiLCJrZXlzIiwic29ydCIsInJlZHVjZSIsInIiLCJrIiwibWVyZ2VPcHRpb25zIiwiZGVmYXVsdHMiLCJzZXR0aW5ncyIsIm9wdGlvbnMiLCJiYWJlbEhlbHBlcnMuZXh0ZW5kcyIsImhhc093blByb3BlcnR5IiwiRXZlbnRzQnVzIiwiaG9wIiwiZXZlbnQiLCJoYW5kbGVyIiwiaSIsImxlbmd0aCIsIm9uIiwiY2FsbCIsImluZGV4IiwicHVzaCIsInJlbW92ZSIsImNvbnRleHQiLCJlbWl0IiwiZm9yRWFjaCIsIml0ZW0iLCJsb2ciLCJHbGlkZSIsInNlbGVjdG9yIiwiX2MiLCJfdCIsIl9lIiwiZGlzYWJsZWQiLCJ0cmFuc2Zvcm1lcnMiLCJwYXR0ZXJuIiwiUnVuIiwibWFrZSIsImRpc3RhbmNlIiwiVHJhbnNpdGlvbiIsImRpc2FibGUiLCJNb3ZlIiwiaW50ZXJ2YWwiLCJfbyIsIm8iLCJfaSIsIl9kIiwic3RhdHVzIiwiQ29tcG9uZW50cyIsIkV2ZW50cyIsIm1vdmUiLCJjYWxjdWxhdGUiLCJhZnRlciIsImlzU3RhcnQiLCJpc0VuZCIsImlzT2Zmc2V0IiwiZW5hYmxlIiwic3RlcHMiLCJ2aWV3U2l6ZSIsImNvdW50YWJsZVN0ZXBzIiwiY2FsY3VsYXRlRm9yd2FyZEluZGV4Iiwibm9ybWFsaXplRm9yd2FyZEluZGV4IiwiY2FsY3VsYXRlQmFja3dhcmRJbmRleCIsIm5vcm1hbGl6ZUJhY2t3YXJkSW5kZXgiLCJ1bmRlZmluZWQiLCJpc0JvdW5kIiwiaXNUeXBlIiwiTWF0aCIsImZsb29yIiwidmlldyIsImNlaWwiLCJnZXQiLCJfbSIsInNldCIsInN0ZXAiLCJzdWJzdHIiLCJIdG1sIiwic2xpZGVzIiwibm93IiwiRGF0ZSIsImdldFRpbWUiLCJmdW5jIiwid2FpdCIsInRpbWVvdXQiLCJhcmdzIiwicmVzdWx0IiwicHJldmlvdXMiLCJsYXRlciIsImxlYWRpbmciLCJhcHBseSIsInRocm90dGxlZCIsImF0IiwicmVtYWluaW5nIiwiYXJndW1lbnRzIiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJzZXRUaW1lb3V0IiwiY2FuY2VsIiwiTUFSR0lOX1RZUEUiLCJHYXBzIiwibGVuIiwic3R5bGUiLCJEaXJlY3Rpb24iLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJTaXplcyIsIndyYXBwZXIiLCJjaGlsZHJlbiIsInNpYmxpbmdzIiwibm9kZSIsInBhcmVudE5vZGUiLCJuIiwiZmlyc3RDaGlsZCIsIm1hdGNoZWQiLCJuZXh0U2libGluZyIsIm5vZGVUeXBlIiwiZXhpc3QiLCJ3aW5kb3ciLCJIVE1MRWxlbWVudCIsIlRSQUNLX1NFTEVDVE9SIiwicm9vdCIsInRyYWNrIiwicXVlcnlTZWxlY3RvciIsInByb3RvdHlwZSIsInNsaWNlIiwiZmlsdGVyIiwic2xpZGUiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsIl9yIiwiZG9jdW1lbnQiLCJ0IiwiUGVlayIsIl92IiwiYmVmb3JlIiwib2Zmc2V0IiwibW92ZW1lbnQiLCJzbGlkZVdpZHRoIiwidHJhbnNsYXRlIiwiaXMiLCJzZXR1cFNsaWRlcyIsIndpZHRoIiwic2V0dXBXcmFwcGVyIiwid3JhcHBlclNpemUiLCJvZmZzZXRXaWR0aCIsImdyb3ciLCJDbG9uZXMiLCJyZWR1Y3RvciIsIkJ1aWxkIiwidHlwZUNsYXNzIiwiYWN0aXZlQ2xhc3MiLCJhZGQiLCJzaWJsaW5nIiwicmVtb3ZlQ2xhc3NlcyIsIml0ZW1zIiwiY29sbGVjdCIsInBlZWtJbmNyZW1lbnRlciIsImNsb25lQ291bnQiLCJyb3VuZCIsImFwcGVuZCIsInJldmVyc2UiLCJwcmVwZW5kIiwibWF4IiwiY2xvbmUiLCJjbG9uZU5vZGUiLCJ1bnNoaWZ0IiwiaGFsZiIsImFwcGVuZENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwicmVtb3ZlQ2hpbGQiLCJFdmVudHNCaW5kZXIiLCJsaXN0ZW5lcnMiLCJlbCIsImNsb3N1cmUiLCJjYXB0dXJlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJCaW5kZXIiLCJSZXNpemUiLCJiaW5kIiwidW5iaW5kIiwib2ZmIiwiZGVzdHJveSIsIlZBTElEX0RJUkVDVElPTlMiLCJGTElQRURfTU9WRU1FTlRTIiwicmVzb2x2ZSIsInRva2VuIiwic3BsaXQiLCJqb2luIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImluZGV4T2YiLCJtb2RpZnkiLCJtdWx0aXBsaWVyIiwiVFJBTlNGT1JNRVJTIiwiR2FwIiwiR3JvdyIsIlBlZWtpbmciLCJGb2N1c2luZyIsImNvbmNhdCIsIlJ0bCIsIm11dGF0ZSIsInRyYW5zZm9ybWVyIiwiVHJhbnNsYXRlIiwidHJhbnNmb3JtIiwibXV0YXRvciIsImdldFN0YXJ0SW5kZXgiLCJnZXRUcmF2ZWxEaXN0YW5jZSIsInRyYXZlbERpc3RhbmNlIiwic3RhcnRXaWR0aCIsImNvbXBvc2UiLCJwcm9wZXJ0eSIsImR1cmF0aW9uIiwidHJhbnNpdGlvbiIsImNhbGxiYWNrIiwic3VwcG9ydHNQYXNzaXZlIiwib3B0cyIsImUiLCJTVEFSVF9FVkVOVFMiLCJNT1ZFX0VWRU5UUyIsIkVORF9FVkVOVFMiLCJNT1VTRV9FVkVOVFMiLCJzd2lwZVNpbiIsInN3aXBlU3RhcnRYIiwic3dpcGVTdGFydFkiLCJwYXNzaXZlIiwiU3dpcGUiLCJiaW5kU3dpcGVTdGFydCIsInN0YXJ0Iiwic3dpcGUiLCJ0b3VjaGVzIiwicGFnZVgiLCJwYWdlWSIsImJpbmRTd2lwZU1vdmUiLCJiaW5kU3dpcGVFbmQiLCJzdWJFeFN4Iiwic3ViRXlTeSIsInBvd0VYIiwiYWJzIiwicG93RVkiLCJzd2lwZUh5cG90ZW51c2UiLCJzcXJ0Iiwic3dpcGVDYXRoZXR1cyIsImFzaW4iLCJQSSIsInN0b3BQcm9wYWdhdGlvbiIsImVuZCIsInRocmVzaG9sZCIsInN3aXBlRGlzdGFuY2UiLCJzd2lwZURlZyIsIm1pbiIsInVuYmluZFN3aXBlTW92ZSIsInVuYmluZFN3aXBlRW5kIiwidW5iaW5kU3dpcGVTdGFydCIsImNoYW5nZWRUb3VjaGVzIiwiSW1hZ2VzIiwiZHJhZ3N0YXJ0IiwicHJldmVudERlZmF1bHQiLCJkZXRhY2hlZCIsInByZXZlbnRlZCIsIkFuY2hvcnMiLCJfYSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjbGljayIsImRldGFjaCIsImRyYWdnYWJsZSIsInNldEF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZSIsInJlbW92ZUF0dHJpYnV0ZSIsImF0dGFjaCIsIk5BVl9TRUxFQ1RPUiIsIkNPTlRST0xTX1NFTEVDVE9SIiwiQ29udHJvbHMiLCJfbiIsImFkZEJpbmRpbmdzIiwic2V0QWN0aXZlIiwicmVtb3ZlQWN0aXZlIiwiY29udHJvbHMiLCJyZW1vdmVCaW5kaW5ncyIsImVsZW1lbnRzIiwiY3VycmVudFRhcmdldCIsIktleWJvYXJkIiwicHJlc3MiLCJrZXlDb2RlIiwiQXV0b3BsYXkiLCJzZXRJbnRlcnZhbCIsInN0b3AiLCJ0aW1lIiwiY2xlYXJJbnRlcnZhbCIsInNvcnRCcmVha3BvaW50cyIsInBvaW50cyIsIkJyZWFrcG9pbnRzIiwibWF0Y2giLCJtYXRjaE1lZGlhIiwicG9pbnQiLCJtYXRjaGVzIiwiQ09NUE9ORU5UUyIsIkNvcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlCQUFlO0VBQ2I7Ozs7Ozs7OztFQVNBQSxRQUFNLFFBVk87O0VBWWI7Ozs7O0VBS0FDLFdBQVMsQ0FqQkk7O0VBbUJiOzs7OztFQUtBQyxXQUFTLENBeEJJOztFQTBCYjs7Ozs7Ozs7O0VBU0FDLFdBQVMsQ0FuQ0k7O0VBcUNiOzs7OztFQUtBQyxPQUFLLEVBMUNROztFQTRDYjs7Ozs7RUFLQUMsWUFBVSxLQWpERzs7RUFtRGI7Ozs7O0VBS0FDLGNBQVksSUF4REM7O0VBMERiOzs7OztFQUtBQyxZQUFVLElBL0RHOztFQWlFYjs7Ozs7Ozs7RUFRQUMsU0FBTyxLQXpFTTs7RUEyRWI7Ozs7O0VBS0FDLGtCQUFnQixFQWhGSDs7RUFrRmI7Ozs7O0VBS0FDLGlCQUFlLEdBdkZGOztFQXlGYjs7Ozs7RUFLQUMsWUFBVSxLQTlGRzs7RUFnR2I7Ozs7O0VBS0FDLGNBQVksR0FyR0M7O0VBdUdiOzs7OztFQUtBQyxjQUFZLEVBNUdDOztFQThHYjs7Ozs7RUFLQUMscUJBQW1CLEdBbkhOOztFQXFIYjs7Ozs7RUFLQUMsVUFBUSxJQTFISzs7RUE0SGI7Ozs7O0VBS0FDLGtCQUFnQixHQWpJSDs7RUFtSWI7Ozs7O0VBS0FDLHVCQUFxQixtQ0F4SVI7O0VBMEliOzs7OztFQUtBQyxxQkFBbUIsSUEvSU47O0VBaUpiOzs7OztFQUtBQyxZQUFVLEVBdEpHOztFQXdKYjs7Ozs7Ozs7O0VBU0FDLGFBQVcsS0FqS0U7O0VBbUti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
